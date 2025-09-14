const nodemailer = require('nodemailer');
require('dotenv').config({ path: './config.env' });

const testEmail = async () => {
  try {
    console.log('🔧 Testing email configuration...');
    console.log('📧 Email User:', process.env.EMAIL_USER);
    console.log('📧 Owner Email:', process.env.OWNER_EMAIL);
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    console.log('⏳ Verifying email credentials...');
    
    await transporter.verify();
    console.log('✅ Email configuration is valid!');
    
    // Send test email
    console.log('📤 Sending test email...');
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: '🧪 Test Email - BoreWell System',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 10px;">
            <h1 style="color: white; margin: 0;">🧪 Test Email</h1>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2>Email system is working! 🎉</h2>
            <p>This is a test email from your BoreWell booking system.</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Status:</strong> ✅ Email notifications are ready!</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', result.messageId);
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    
    if (error.message.includes('Invalid login')) {
      console.log('\n🔧 SOLUTION:');
      console.log('1. Go to https://myaccount.google.com/');
      console.log('2. Security → 2-Step Verification → App passwords');
      console.log('3. Generate a new app password for "Mail"');
      console.log('4. Update EMAIL_PASS in config.env with the new app password');
    }
  }
};

testEmail();
