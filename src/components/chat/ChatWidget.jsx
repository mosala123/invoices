// src/components/chat/ChatWidget.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "./ChatContext";
import { supabase } from "../../supabaseClient";
import {
  FaComments, FaTimes, FaPaperPlane,
  FaCircle, FaCheckDouble, FaCheck,
  FaSmile, FaEnvelope, FaWhatsapp, FaShare
} from "react-icons/fa";
import { toast } from "react-toastify";

const EMOJIS = ["😊", "😂", "❤️", "👍", "🎉", "🔥", "✨", "💯", "🤔", "😢", "👋", "🙏", "💪", "🤝", "✅", "⭐"];

const T = {
  primary: "#4f46e5",
  purple: "#7c3aed",
  green: "#10b981",
  border: "#e5e7eb",
  bg: "#f8fafc",
  text: "#1e293b",
  muted: "#94a3b8",
  whatsapp: "#25D366",
  email: "#EA4335",
};

const ChatWidget = ({
  projectId,
  projectName,
  clientName,
  freelancerId,
  clientId,
  clientEmail,
  clientPhone,
  position = "bottom-right"
}) => {
  const {
    activeConversation,
    setActiveConversation,
    messagesMap,
    loadMessages,
    sendMessage,
    startConversation,
    getUnreadCount,
    markAsRead,
    user,
    userRole,
    conversations,
  } = useChat();

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [convId, setConvId] = useState(null);
  const [initializing, setInitializing] = useState(false);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [showEmoji, setShowEmoji] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [viaWhatsApp, setViaWhatsApp] = useState(false);
  const [viaEmail, setViaEmail] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const initDoneRef = useRef(false);

  // إعادة تعيين المحادثة عندما يتغير projectId (إذا كان الشات مفتوحاً)
  useEffect(() => {
    if (open) {
      setConvId(null);
      initDoneRef.current = false;
      setInitializing(false);
    }
  }, [projectId, open]);

  // الحصول على بيانات الطرف الآخر والمحادثة الحالية
  const currentConversation = convId ? conversations.find(c => c.id === convId) : null;
  const otherParty = currentConversation
    ? (userRole === 'freelancer' ? currentConversation.client : currentConversation.freelancer)
    : null;
  const isOnline = otherParty && otherParty.last_seen && (new Date() - new Date(otherParty.last_seen)) < 5 * 60 * 1000;

  const currentMessages = convId ? (messagesMap[convId] || []) : [];

  // تهيئة المحادثة عند فتح الشات (مع التأكد من projectId الصحيح)
  useEffect(() => {
    if (!open || !projectId || convId || initializing || initDoneRef.current) return;
    
    // تحقق من وجود user
    if (!user) {
      console.log('User not logged in yet');
      toast.info('Please login to start chatting');
      return;
    }
    
    initDoneRef.current = true;

    const init = async () => {
      setInitializing(true);
      try {
        const effClientId = clientId || localStorage.getItem('client_id');
        const effFreelancerId = freelancerId || localStorage.getItem('freelancer_id');

        console.log('Initializing chat with:', { 
          projectId, 
          effClientId, 
          effFreelancerId,
          user: user?.id,
          userRole 
        });

        if (!effClientId || !effFreelancerId) {
          toast.error("Chat: missing client or freelancer ID");
          console.error('Missing IDs:', { clientId, freelancerId, effClientId, effFreelancerId });
          setInitializing(false);
          initDoneRef.current = false;
          return;
        }

        const id = await startConversation(projectId, effClientId, effFreelancerId);
        if (id) {
          setConvId(id);
          setActiveConversation(id);
          await loadMessages(id);
        }
      } catch (err) {
        console.error("Chat init error:", err);
        toast.error("Failed to start chat");
        initDoneRef.current = false;
      } finally {
        setInitializing(false);
      }
    };
    init();
  }, [open, projectId, clientId, freelancerId, startConversation, loadMessages, setActiveConversation, user]);

  // تحديد الرسائل كمقروءة عند فتح الشات
  useEffect(() => {
    if (open && convId) markAsRead(convId);
  }, [open, convId, markAsRead]);

  // التمرير لآخر رسالة
  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
    }
  }, [currentMessages.length, open]);

  // مؤشر الكتابة
  useEffect(() => {
    if (!convId || !user) return;
    const ch = supabase
      .channel(`typing_${convId}`)
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        if (payload.userId === user.id) return;
        setTypingUsers(prev => {
          const s = new Set(prev);
          payload.typing ? s.add(payload.userId) : s.delete(payload.userId);
          return s;
        });
      })
      .subscribe();
    return () => ch.unsubscribe();
  }, [convId, user]);

  const handleTyping = () => {
    if (!convId || !user) return;
    const ch = supabase.channel(`typing_${convId}`);
    ch.send({ type: 'broadcast', event: 'typing', payload: { userId: user.id, typing: true } });
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      ch.send({ type: 'broadcast', event: 'typing', payload: { userId: user.id, typing: false } });
    }, 2000);
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!text.trim() || sending || !convId) return;
    setSending(true);
    await sendMessage(convId, text.trim(), viaWhatsApp, viaEmail);
    setText("");
    setSending(false);
    setViaWhatsApp(false);
    setViaEmail(false);
    setShowShare(false);
    setShowEmoji(false);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const fmtTime = (ts) => {
    try {
      const d = new Date(ts);
      const diff = Date.now() - d;
      if (diff < 60000) return 'Just now';
      if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
      if (diff < 86400000) return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  const posStyle = position === "bottom-left" ? { bottom: 24, left: 24 } : { bottom: 24, right: 24 };
  const unreadCount = getUnreadCount();

  return (
    <div style={{ position: "fixed", zIndex: 9000, ...posStyle, fontFamily: "'Segoe UI',sans-serif" }}>
      <style>{`
        .cw-msgs::-webkit-scrollbar { width:4px; }
        .cw-msgs::-webkit-scrollbar-thumb { background:${T.primary}50; border-radius:4px; }
        .cw-textarea:focus { outline:none !important; border-color:${T.primary} !important; }
        .tdot { display:inline-block; width:7px; height:7px; border-radius:50%; background:${T.primary}; animation:tdot 1s infinite ease-in-out; }
        .tdot:nth-child(2){animation-delay:.2s} .tdot:nth-child(3){animation-delay:.4s}
        @keyframes tdot{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-7px);opacity:1}}
      `}</style>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              position: "absolute", bottom: 68, right: 0,
              width: 370, height: 510,
              background: "#fff", borderRadius: 22,
              boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
              border: `1px solid ${T.border}`,
              display: "flex", flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header مع حالة الاتصال */}
            <div style={{
              background: `linear-gradient(135deg,${T.primary},${T.purple})`,
              padding: "14px 18px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: "rgba(255,255,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: "1rem", fontWeight: 700,
                  border: "2px solid rgba(255,255,255,0.3)",
                }}>
                  {clientName?.charAt(0).toUpperCase() || 'C'}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.92rem" }}>
                      {clientName || "Client"}
                    </span>
                    {/* نقطة الحالة: أخضر إذا متصل، رمادي إذا غير متصل */}
                    <FaCircle style={{ color: isOnline ? "#4ade80" : "#9ca3af", fontSize: "0.42rem" }} />
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.68rem", margin: "2px 0 0" }}>
                    {projectName || "Project Chat"}
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{
                background: "rgba(255,255,255,0.15)", border: "none", color: "#fff",
                borderRadius: 9, width: 32, height: 32,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", fontSize: "0.85rem",
              }}>
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="cw-msgs" style={{
              flex: 1, overflowY: "auto", padding: "14px",
              display: "flex", flexDirection: "column", gap: 5,
              background: T.bg,
            }}>
              {initializing && (
                <div style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 12, padding: "40px 0"
                }}>
                  <div className="spinner-border" style={{ color: T.primary, width: 30, height: 30 }} />
                  <p style={{ color: T.muted, fontSize: "0.82rem", margin: 0 }}>Starting chat…</p>
                </div>
              )}

              {!initializing && currentMessages.length === 0 && (
                <div style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 10, padding: "30px 16px",
                  textAlign: "center"
                }}>
                  <div style={{
                    width: 68, height: 68, borderRadius: "50%",
                    background: `${T.primary}12`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "2rem",
                  }}>💬</div>
                  <p style={{ color: T.text, fontWeight: 600, margin: "0 0 4px", fontSize: "0.95rem" }}>
                    No messages yet
                  </p>
                  <p style={{ color: T.muted, fontSize: "0.8rem", margin: 0 }}>
                    Say hi to {clientName || "the client"}!
                  </p>
                </div>
              )}

              {!initializing && currentMessages.map((msg, i) => {
                const isMe = msg.sender_id === user?.id;
                const isTemp = !!msg._temp;
                const showName = i === 0 || currentMessages[i - 1]?.sender_id !== msg.sender_id;

                return (
                  <motion.div key={msg.id}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      display: "flex",
                      flexDirection: isMe ? "row-reverse" : "row",
                      alignItems: "flex-end", gap: 7,
                      marginBottom: showName ? 4 : 1,
                      opacity: isTemp ? 0.75 : 1,
                    }}
                  >
                    {/* Avatar */}
                    <div style={{
                      width: 28, height: 28, flexShrink: 0,
                      borderRadius: 8,
                      background: (!isMe && showName)
                        ? `linear-gradient(135deg,${T.primary},${T.purple})`
                        : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: "0.72rem", fontWeight: 700,
                    }}>
                      {(!isMe && showName) ? (msg.sender_name?.charAt(0).toUpperCase() || 'U') : ''}
                    </div>

                    <div style={{ maxWidth: "74%" }}>
                      {!isMe && showName && (
                        <p style={{
                          fontSize: "0.6rem", color: T.muted,
                          margin: "0 0 2px 4px", fontWeight: 600
                        }}>
                          {msg.sender_name}
                        </p>
                      )}

                      <div style={{
                        background: isMe
                          ? `linear-gradient(135deg,${T.primary},${T.purple})`
                          : "#fff",
                        color: isMe ? "#fff" : T.text,
                        padding: "9px 13px",
                        borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                        fontSize: "0.87rem", lineHeight: 1.5,
                        boxShadow: isMe
                          ? "0 3px 10px rgba(79,70,229,0.22)"
                          : "0 1px 6px rgba(0,0,0,0.07)",
                        border: isMe ? "none" : `1px solid ${T.border}`,
                        wordBreak: "break-word",
                      }}>
                        {msg.content}
                      </div>

                      <div style={{
                        display: "flex", alignItems: "center", gap: 3, marginTop: 2,
                        justifyContent: isMe ? "flex-end" : "flex-start",
                      }}>
                        {isTemp && (
                          <span style={{ fontSize: "0.58rem", color: T.muted }}>Sending…</span>
                        )}
                        {!isTemp && (
                          <>
                            <span style={{ fontSize: "0.6rem", color: T.muted }}>
                              {fmtTime(msg.created_at)}
                            </span>
                            {isMe && (
                              msg.is_read
                                ? <FaCheckDouble style={{ fontSize: "0.6rem", color: T.green }} />
                                : <FaCheck style={{ fontSize: "0.56rem", color: T.muted }} />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {typingUsers.size > 0 && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <div style={{ width: 28 }} />
                  <div style={{
                    display: "flex", gap: 4, padding: "8px 12px",
                    background: "#fff", borderRadius: "14px 14px 14px 4px",
                    border: `1px solid ${T.border}`,
                  }}>
                    <span className="tdot" /><span className="tdot" /><span className="tdot" />
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Share options */}
            <AnimatePresence>
              {showShare && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  style={{
                    padding: "10px 14px", background: "#fff",
                    borderTop: `1px solid ${T.border}`, display: "flex", gap: 8, flexShrink: 0
                  }}>
                  <button onClick={() => { setViaWhatsApp(!viaWhatsApp); setViaEmail(false); }}
                    style={{
                      flex: 1, padding: "8px 0", border: "none", borderRadius: 9, cursor: "pointer",
                      background: viaWhatsApp ? T.whatsapp : `${T.whatsapp}18`,
                      color: viaWhatsApp ? "#fff" : T.whatsapp,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      fontSize: "0.82rem", fontWeight: 600,
                    }}>
                    <FaWhatsapp size={14} /> {viaWhatsApp ? "WA ✓" : "WhatsApp"}
                  </button>
                  <button onClick={() => { setViaEmail(!viaEmail); setViaWhatsApp(false); }}
                    style={{
                      flex: 1, padding: "8px 0", border: "none", borderRadius: 9, cursor: "pointer",
                      background: viaEmail ? T.email : `${T.email}18`,
                      color: viaEmail ? "#fff" : T.email,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      fontSize: "0.82rem", fontWeight: 600,
                    }}>
                    <FaEnvelope size={13} /> {viaEmail ? "Email ✓" : "Email"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Emoji Picker */}
            <AnimatePresence>
              {showEmoji && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  style={{
                    position: "absolute", bottom: 76, left: 12,
                    background: "#fff", borderRadius: 14, padding: 10,
                    boxShadow: "0 5px 20px rgba(0,0,0,0.12)",
                    border: `1px solid ${T.border}`,
                    display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: 3, zIndex: 10,
                  }}>
                  {EMOJIS.map(e => (
                    <button key={e} onClick={() => { setText(p => p + e); setShowEmoji(false); inputRef.current?.focus(); }}
                      style={{
                        background: "none", border: "none", fontSize: "1.25rem",
                        padding: 5, borderRadius: 6, cursor: "pointer"
                      }}>
                      {e}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <form onSubmit={handleSend} style={{
              padding: "10px 12px", background: "#fff",
              borderTop: `1px solid ${T.border}`,
              display: "flex", gap: 7, alignItems: "flex-end", flexShrink: 0,
            }}>
              <button type="button" onClick={() => { setShowEmoji(!showEmoji); setShowShare(false); }}
                style={{
                  background: "none", border: "none",
                  color: showEmoji ? T.primary : T.muted,
                  padding: 7, borderRadius: 8, cursor: "pointer", fontSize: "1rem"
                }}>
                <FaSmile />
              </button>

              <button type="button" onClick={() => { setShowShare(!showShare); setShowEmoji(false); }}
                style={{
                  background: showShare ? T.primary : "none",
                  border: "none", color: showShare ? "#fff" : T.muted,
                  padding: 7, borderRadius: 8, cursor: "pointer", fontSize: "0.95rem",
                }}>
                <FaShare />
              </button>

              <textarea ref={inputRef} className="cw-textarea form-control"
                value={text}
                onChange={e => { setText(e.target.value); handleTyping(); }}
                onKeyPress={handleKeyPress}
                placeholder="Type a message…" rows={1}
                style={{
                  flex: 1, border: `1.5px solid ${T.border}`, borderRadius: 16,
                  padding: "8px 13px", fontSize: "0.87rem", fontFamily: "inherit",
                  resize: "none", maxHeight: 85, background: T.bg,
                }}
              />

              <button type="submit" disabled={sending || !text.trim()} style={{
                width: 40, height: 40, borderRadius: 11, border: "none", flexShrink: 0,
                background: text.trim()
                  ? `linear-gradient(135deg,${T.primary},${T.purple})`
                  : T.border,
                color: text.trim() ? "#fff" : T.muted,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: text.trim() ? "pointer" : "not-allowed",
                fontSize: "0.95rem", transition: "all .2s",
              }}>
                {sending
                  ? <div className="spinner-border spinner-border-sm" style={{ width: 15, height: 15 }} />
                  : <FaPaperPlane />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(o => !o)}
        style={{
          width: 54, height: 54, borderRadius: "50%", border: "none",
          background: open
            ? "linear-gradient(135deg,#ef4444,#dc2626)"
            : `linear-gradient(135deg,${T.primary},${T.purple})`,
          color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: "1.25rem",
          boxShadow: "0 8px 24px rgba(79,70,229,0.38)",
          position: "relative",
        }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: .14 }}><FaTimes /></motion.span>
            : <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: .14 }}><FaComments /></motion.span>
          }
        </AnimatePresence>

        <AnimatePresence>
          {unreadCount > 0 && !open && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              style={{
                position: "absolute", top: -4, right: -4,
                width: 21, height: 21, borderRadius: "50%",
                background: "#ef4444", border: "2.5px solid #fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.62rem", fontWeight: 700, color: "#fff",
              }}>
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatWidget;