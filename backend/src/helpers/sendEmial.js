
import nodeMailer from 'nodemailer'; 
import path from 'path';  
import dotenv from 'dotenv';
import hbs from 'nodemailer-express-handlebars';
import { fileURLToPath } from 'node:url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail = async ({ 
  subject,
  send_to,
  reply_to, 
  template,
  context
}) => {
  // 1. Create transporter
  const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  });

  // 2. Configure Handlebars
  const handlebarsOptions = {
    viewEngine: {
      extName: ".hbs",
      partialsDir: path.resolve(__dirname, "../views"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "../views"),
    extName: ".hbs",
  };
  transporter.use("compile", hbs(handlebarsOptions));

  // 3. Define mailOptions FIRST
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    template: template,
    context: {
      // name,
      // resetLink: link,
      companyName: "Your App",
      ...context
      // Default values
  
    
      
       // Keep for backward compatibility
  
    }
  
  };

  console.log("Sending email to:", send_to);

  // 4. Send email AFTER mailOptions is defined
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email send failed:", error);
    throw error;
  }
};

export default sendEmail;