// src/components/services/emailService.js
import emailjs from '@emailjs/browser';

const SERVICE_ID  = 'service_r125spp';
const TEMPLATE_ID = 'template_qpvpw2j';
const PUBLIC_KEY  = 'bnUyzrFs3ckfOL59_';

emailjs.init(PUBLIC_KEY);

export const sendEmailNotification = async (
  to_email,
  to_name,
  from_name,
  message,
  project_name,
  reply_link,
  from_email = "",
  time = ""
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
      title: project_name,
      name: from_name,
      message: message,
      email: from_email || from_name,  // مهم: عشان الـ Reply يروح للمرسل الصح
      reply_link: reply_link,
      current_date: currentTime
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