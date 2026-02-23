// src/components/services/emailService.js
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_r125spp';
const TEMPLATE_ID = 'template_qpvpw2j';
const PUBLIC_KEY = 'bnUyzrFs3ckfOL59_';

emailjs.init(PUBLIC_KEY);

/*
  الـ template الجديد بيستخدم المتغيرات دي:
    {{to_email}}   → إيميل المستلم
    {{to_name}}    → اسم المستلم
    {{from_name}}  → اسم المرسل
    {{message}}    → محتوى الرسالة
    {{title}}      → عنوان المشروع
    {{reply_link}} → رابط الرد
    {{time}}       → وقت الإرسال
*/
export const sendEmailNotification = async (
  to_email,        // إيميل المستلم (الـ freelancer)
  to_name,         // اسم المستلم
  from_name,       // اسم المرسل (الـ customer)
  message,         // نص الرسالة
  title,           // عنوان المشروع
  reply_link,      // رابط الرد
  time             // وقت الإرسال (اختياري)
) => {
  try {
    // لو الوقت مش موجود، نعمله دلوقتي
    const currentTime = time || new Date().toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const templateParams = {
      to_email: to_email,
      to_name: to_name,
      from_name: from_name,
      message: message,
      title: title,
      reply_link: reply_link,
      time: currentTime
    };

    console.log('📧 Sending email with params:', templateParams);

    const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    console.log('✅ Email sent successfully:', res);
    return true;
  } catch (err) {
    console.error('❌ Email sending failed:', err.text || err.message || err);
    return false;
  }
};