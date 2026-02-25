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
  from_email = ""   // ← إيميل المرسل عشان الـ Reply يكون عليه
) => {
  try {
    const templateParams = {
      to_email,
      to_name,
      title:        project_name,
      name:         from_name,
      message,
      email:        to_email,
      from_email,               // ← {{from_email}} في الـ template
      reply_link,
      current_date: new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      }),
    };

    const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    console.log('✅ Email sent:', res);
    return true;
  } catch (err) {
    console.error('❌ Email error:', err.text || err.message || err);
    return false;
  }
};