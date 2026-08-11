const nodemailer = require('nodemailer');
const Inquiry = require('../models/Inquiry');

exports.sendContactEmail = async (req, res) => {
  try {
    const { name, email, phone, company, projectType, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and Email are required fields.' });
    }

    // 1. Save Inquiry to MongoDB Database
    const newInquiry = new Inquiry({ name, email, phone, company, projectType, message });
    await newInquiry.save();

    // 2. Configure Nodemailer Transporter with Gmail App Password
    const cleanPass = (process.env.EMAIL_PASS || '').replace(/\s+/g, '');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'contactbotmate@gmail.com',
        pass: cleanPass,
      },
    });

    // 3. Construct HTML Email
    const mailOptions = {
      from: `"BotMate Platform" <${process.env.EMAIL_USER || 'contactbotmate@gmail.com'}>`,
      to: process.env.EMAIL_USER || 'contactbotmate@gmail.com',
      replyTo: email,
      subject: `🚀 New Contact Inquiry from ${name} (${projectType || 'General'})`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; background-color: #060a0f; color: #ffffff; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(0, 229, 255, 0.2);">
          <h2 style="color: #00e5ff; border-bottom: 2px solid #00e5ff; padding-bottom: 10px; margin-top: 0;">New Website Inquiry Received</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #888;">Full Name:</td><td style="padding: 8px 0; font-weight: bold; color: #fff;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Email Address:</td><td style="padding: 8px 0; font-weight: bold; color: #00e5ff;"><a href="mailto:${email}" style="color: #00e5ff; text-decoration: none;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Phone Number:</td><td style="padding: 8px 0; font-weight: bold; color: #fff;">${phone || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Company / Website:</td><td style="padding: 8px 0; font-weight: bold; color: #fff;">${company || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Project Interest:</td><td style="padding: 8px 0; font-weight: bold; color: #00e5ff;">${projectType || 'N/A'}</td></tr>
          </table>
          ${message ? `
            <div style="background-color: rgba(0, 229, 255, 0.05); padding: 16px; border-left: 4px solid #00e5ff; border-radius: 6px; margin-top: 20px;">
              <p style="margin: 0; color: #e0e0e0; font-size: 14px; white-space: pre-wrap;"><strong>Message:</strong><br/>${message}</p>
            </div>
          ` : ''}
          <p style="font-size: 11px; color: #666; margin-top: 24px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 12px;">
            BotMate Neural Cloud v1.0 • Form Transmission Protocol
          </p>
        </div>
      `,
    };

    // 4. Dispatch Email via Gmail SMTP
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Inquiry received and notification email dispatched!' });
  } catch (error) {
    console.error('❌ Contact Controller Error:', error);
    res.status(500).json({ error: error.message || 'Failed to submit inquiry or send email.' });
  }
};
