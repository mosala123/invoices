// src/components/chat/ChatContext.jsx
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../../supabaseClient';
import { toast } from 'react-toastify';
import { sendEmailNotification as sendEmail } from '../services/emailService';

const ChatContext = createContext();

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
};

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messagesMap, setMessagesMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const channelsRef = useRef({});
  const convChannelRef = useRef(null);

  // تحديث آخر ظهور
  const updateLastSeen = useCallback(async () => {
    if (!user || !userRole) return;
    const table = userRole === 'freelancer' ? 'freelancers' : 'clients';
    try {
      await supabase
        .from(table)
        .update({ last_seen: new Date().toISOString() })
        .eq('id', user.id);
    } catch (err) {
      console.error('updateLastSeen error:', err);
    }
  }, [user, userRole]);

  useEffect(() => {
    if (!user) return;
    updateLastSeen();
    const interval = setInterval(updateLastSeen, 60000);
    return () => {
      clearInterval(interval);
      updateLastSeen();
    };
  }, [user, updateLastSeen]);

  // جلب المستخدم الحالي
  useEffect(() => {
    const init = async () => {
      try {
        const { data: { user: u } } = await supabase.auth.getUser();
        if (!u) return;
        setUser(u);

        const { data: fl } = await supabase
          .from('freelancers')
          .select('id, email, name, phone, last_seen')
          .eq('id', u.id)
          .maybeSingle();

        const role = fl ? 'freelancer' : 'client';
        setUserRole(role);

        localStorage.setItem('user_id', u.id);
        localStorage.setItem('user_role', role);
        localStorage.setItem('user_email', u.email);
        localStorage.setItem('user_name', u.user_metadata?.name || u.email?.split('@')[0] || '');

        if (role === 'freelancer') {
          localStorage.setItem('freelancer_id', u.id);
          localStorage.setItem('freelancer_email', fl?.email || u.email);
          localStorage.setItem('freelancer_name', fl?.name || '');
          localStorage.setItem('freelancer_phone', fl?.phone || '');
        } else {
          localStorage.setItem('client_id', u.id);
          const { data: cl } = await supabase
            .from('clients')
            .select('email, name, phone, last_seen')
            .eq('id', u.id)
            .maybeSingle();
          localStorage.setItem('client_email', cl?.email || u.email);
          localStorage.setItem('client_name', cl?.name || '');
          localStorage.setItem('client_phone', cl?.phone || '');
        }
      } catch (err) {
        console.error('ChatProvider init error:', err);
      }
    };
    init();
  }, []);

  // تحميل قائمة المحادثات (نسخة معدلة بدون nested objects)
  useEffect(() => {
    if (!user || !userRole) return;

    const fetchConversations = async () => {
      setLoading(true);
      try {
        // جلب المحادثات فقط
        const { data, error } = await supabase
          .from('conversations')
          .select('*')
          .or(`freelancer_id.eq.${user.id},client_id.eq.${user.id}`)
          .order('last_message_time', { ascending: false });

        if (error) throw error;

        // جلب البيانات الإضافية بشكل منفصل
        const conversationsWithDetails = await Promise.all((data || []).map(async (conv) => {
          const [projectRes, freelancerRes, clientRes] = await Promise.all([
            supabase.from('projects').select('id, project_name, client_email, client_name, client_phone').eq('id', conv.project_id).maybeSingle(),
            supabase.from('freelancers').select('id, name, email, phone, last_seen').eq('id', conv.freelancer_id).maybeSingle(),
            supabase.from('clients').select('id, name, email, phone, last_seen').eq('id', conv.client_id).maybeSingle()
          ]);

          return {
            ...conv,
            project: projectRes.data || null,
            freelancer: freelancerRes.data || null,
            client: clientRes.data || null
          };
        }));

        setConversations(conversationsWithDetails);
      } catch (err) {
        console.error('fetchConversations error:', err);
      }
      setLoading(false);
    };

    fetchConversations();

    if (convChannelRef.current) convChannelRef.current.unsubscribe();
    convChannelRef.current = supabase
      .channel(`conv_list_${user.id}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'conversations' },
        (payload) => {
          setConversations(prev =>
            prev.map(c => c.id === payload.new.id ? { ...c, ...payload.new } : c)
          );
        }
      )
      .subscribe();

    return () => { convChannelRef.current?.unsubscribe(); };
  }, [user, userRole]);

  // تحميل الرسائل
  const loadMessages = useCallback(async (conversationId) => {
    if (!conversationId) return;

    if (!channelsRef.current[conversationId]) {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true });

        if (!error) {
          setMessagesMap(prev => ({ ...prev, [conversationId]: data || [] }));
        }
      } catch (err) {
        console.error('loadMessages fetch error:', err);
      }

      const ch = supabase
        .channel(`msgs_rt_${conversationId}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        }, (payload) => {
          setMessagesMap(prev => {
            const list = prev[conversationId] || [];
            const exists = list.some(m =>
              m.id === payload.new.id ||
              (m._temp && m.content === payload.new.content && m.sender_id === payload.new.sender_id)
            );
            const updated = exists
              ? list.map(m => (m._temp && m.content === payload.new.content) ? payload.new : m)
              : [...list, payload.new];
            return { ...prev, [conversationId]: updated };
          });

          setConversations(prev => prev.map(c =>
            c.id === conversationId
              ? { ...c, last_message: payload.new.content, last_message_time: payload.new.created_at }
              : c
          ));

          if (payload.new.sender_id !== user?.id) {
            const field = userRole === 'freelancer' ? 'freelancer_unread' : 'client_unread';
            setConversations(prev => prev.map(c =>
              c.id === conversationId
                ? { ...c, [field]: (c[field] || 0) + 1 }
                : c
            ));
            toast.info(`💬 ${payload.new.sender_name}: ${payload.new.content.slice(0, 40)}`);
          }
        })
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        }, (payload) => {
          setMessagesMap(prev => ({
            ...prev,
            [conversationId]: (prev[conversationId] || []).map(m => m.id === payload.new.id ? payload.new : m)
          }));
        })
        .subscribe();

      channelsRef.current[conversationId] = ch;
    }
  }, [user, userRole]);

  // إرسال رسالة
  const sendMessage = useCallback(async (conversationId, content, sendViaWhatsApp = false, sendViaEmail = false) => {
    if (!content.trim() || !user || !conversationId) return;

    const tempId = `_temp_${Date.now()}`;
    const optimistic = {
      id: tempId,
      _temp: true,
      conversation_id: conversationId,
      sender_id: user.id,
      sender_type: userRole,
      sender_name: user.user_metadata?.name || user.email?.split('@')[0] || 'Me',
      content: content.trim(),
      is_read: false,
      created_at: new Date().toISOString(),
    };

    setMessagesMap(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), optimistic],
    }));

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          conversation_id: conversationId,
          sender_id: user.id,
          sender_type: userRole,
          sender_name: optimistic.sender_name,
          content: content.trim(),
          is_read: false,
        }])
        .select()
        .single();

      if (error) throw error;

      setMessagesMap(prev => ({
        ...prev,
        [conversationId]: (prev[conversationId] || []).map(m =>
          m.id === tempId ? { ...data, _temp: false } : m
        ),
      }));

      await supabase
        .from('conversations')
        .update({ last_message: content.trim(), last_message_time: new Date().toISOString() })
        .eq('id', conversationId);

      return data;
    } catch (err) {
      console.error('sendMessage error:', err);
      setMessagesMap(prev => ({
        ...prev,
        [conversationId]: (prev[conversationId] || []).filter(m => m.id !== tempId),
      }));
      toast.error('Failed to send message');
    }
  }, [user, userRole]);

  // بدء محادثة جديدة (نسخة معدلة)
  const startConversation = useCallback(async (projectId, clientId, freelancerId) => {
    if (!user) {
      toast.error('You must be logged in to start a conversation');
      return null;
    }
    if (!projectId || !clientId || !freelancerId) {
      toast.error('Cannot start conversation: missing project, client, or freelancer ID');
      return null;
    }

    if (user.id !== freelancerId && user.id !== clientId) {
      toast.error('You are not authorized to start this conversation');
      return null;
    }

    try {
      const { data: existing, error: searchError } = await supabase
        .from('conversations')
        .select('id')
        .eq('project_id', projectId)
        .maybeSingle();

      if (searchError) throw searchError;

      if (existing) {
        setActiveConversation(existing.id);
        await loadMessages(existing.id);
        return existing.id;
      }

      const { data, error } = await supabase
        .from('conversations')
        .insert([{
          project_id: projectId,
          freelancer_id: freelancerId,
          client_id: clientId,
          freelancer_unread: 0,
          client_unread: 0,
          last_message_time: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) throw error;

      // جلب البيانات الكاملة للمحادثة الجديدة
      const [projectRes, freelancerRes, clientRes] = await Promise.all([
        supabase.from('projects').select('id, project_name, client_email, client_name, client_phone').eq('id', projectId).single(),
        supabase.from('freelancers').select('id, name, email, phone, last_seen').eq('id', freelancerId).single(),
        supabase.from('clients').select('id, name, email, phone, last_seen').eq('id', clientId).single()
      ]);

      const fullData = {
        ...data,
        project: projectRes.data || null,
        freelancer: freelancerRes.data || null,
        client: clientRes.data || null
      };

      setConversations(prev => [fullData, ...prev]);
      setActiveConversation(fullData.id);
      await loadMessages(fullData.id);
      return fullData.id;
    } catch (err) {
      console.error('startConversation error:', err);
      toast.error(`Failed to start conversation: ${err.message || 'Unknown error'}`);
      return null;
    }
  }, [user, loadMessages]);

  // تحديد الرسائل كمقروءة
  const markAsRead = useCallback(async (conversationId) => {
    if (!user || !userRole || !conversationId) return;
    try {
      await supabase
        .from('messages')
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq('conversation_id', conversationId)
        .neq('sender_id', user.id)
        .eq('is_read', false);

      const field = userRole === 'freelancer' ? 'freelancer_unread' : 'client_unread';
      await supabase
        .from('conversations')
        .update({ [field]: 0 })
        .eq('id', conversationId);

      setConversations(prev =>
        prev.map(c => c.id === conversationId ? { ...c, [field]: 0 } : c)
      );

      setMessagesMap(prev => ({
        ...prev,
        [conversationId]: (prev[conversationId] || []).map(m =>
          m.sender_id !== user.id ? { ...m, is_read: true } : m
        ),
      }));
    } catch (err) {
      console.error('markAsRead error:', err);
    }
  }, [user, userRole]);

  const getUnreadCount = useCallback(() =>
    conversations.reduce((t, c) =>
      t + (userRole === 'freelancer' ? (c.freelancer_unread || 0) : (c.client_unread || 0)), 0
    ), [conversations, userRole]);

  const messages = activeConversation ? (messagesMap[activeConversation] || []) : [];

  useEffect(() => {
    return () => {
      Object.values(channelsRef.current).forEach(ch => ch?.unsubscribe());
      convChannelRef.current?.unsubscribe();
    };
  }, []);

  return (
    <ChatContext.Provider value={{
      conversations,
      activeConversation,
      setActiveConversation,
      messages,
      messagesMap,
      loading,
      loadMessages,
      sendMessage,
      startConversation,
      getUnreadCount,
      markAsRead,
      userRole,
      user,
    }}>
      {children}
    </ChatContext.Provider>
  );
};