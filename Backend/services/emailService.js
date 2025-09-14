const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send booking notification email
const sendBookingNotification = async (bookingData) => {
  try {
    const transporter = createTransporter();
    
    const serviceTypeLabels = {
      'drilling': '🏗️ Bore Drilling',
      'pressing': '🔧 Pressing Service',
      'rebore': '🔄 Rebore Service',
      'testing': '🧪 Water Testing',
      'maintenance': '🔧 Maintenance',
      'consultation': '📞 Consultation'
    };

    const serviceLabel = serviceTypeLabels[bookingData.serviceType] || '🏗️ Borewell Service';

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `${serviceLabel} Request - ${bookingData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🏗️ ProDrill - New Booking</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Booking Details</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #555; width: 30%;">👤 Name:</td>
                  <td style="padding: 10px; color: #333;">${bookingData.name}</td>
                </tr>
                <tr style="background: #f8f9fa;">
                  <td style="padding: 10px; font-weight: bold; color: #555;">🏘️ Village:</td>
                  <td style="padding: 10px; color: #333;">${bookingData.villageName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #555;">🏛️ District:</td>
                  <td style="padding: 10px; color: #333;">${bookingData.districtName}</td>
                </tr>
                <tr style="background: #f8f9fa;">
                  <td style="padding: 10px; font-weight: bold; color: #555;">📱 Mobile:</td>
                  <td style="padding: 10px; color: #333;">
                    <a href="tel:${bookingData.mobileNumber}" style="color: #667eea; text-decoration: none;">
                      ${bookingData.mobileNumber}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #555;">📧 Email:</td>
                  <td style="padding: 10px; color: #333;">
                    <a href="mailto:${bookingData.email}" style="color: #667eea; text-decoration: none;">
                      ${bookingData.email}
                    </a>
                  </td>
                </tr>
                <tr style="background: #f8f9fa;">
                  <td style="padding: 10px; font-weight: bold; color: #555;">📏 Depth Required:</td>
                  <td style="padding: 10px; color: #333; font-weight: bold; color: #e74c3c;">${bookingData.feet} feet</td>
                </tr>
                ${bookingData.oldBoreFeet ? `
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #555;">🔧 Current Bore Depth:</td>
                  <td style="padding: 10px; color: #333; font-weight: bold; color: #f39c12;">${bookingData.oldBoreFeet} feet</td>
                </tr>
                ` : ''}
                <tr style="background: #f8f9fa;">
                  <td style="padding: 10px; font-weight: bold; color: #555;">📅 Date:</td>
                  <td style="padding: 10px; color: #333;">${new Date(bookingData.createdAt).toLocaleString('en-IN')}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745;">
              <p style="margin: 0; color: #155724; font-weight: bold;">
                ⚡ Action Required: Please contact the customer within 24 hours
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <a href="tel:${bookingData.mobileNumber}" 
                 style="background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-right: 10px;">
                📞 Call Now
              </a>
              <a href="https://wa.me/${bookingData.mobileNumber}" 
                 style="background: #25d366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendBookingNotification
};
