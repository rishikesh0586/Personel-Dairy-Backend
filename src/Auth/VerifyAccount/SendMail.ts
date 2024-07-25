import dotenv from 'dotenv';
dotenv.config();
import nodemailer, {Transporter} from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { Response } from 'express';

  
export const sendEmailOTP=async(email:string,data:any,res:Response)=>{
    const html = await ejs.renderFile(
        path.join(__dirname, "../Mail/OTP_Mail.ejs"),
        data
      );

      await sendMail({
        email: email,
        subject: "Activate your account",
        template: "OTP_Mail.ejs",
        data,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email: ${email} to activate your account!`,
        activationToken: data.activationCode,
      });


}



  
const sendMail = async (options:any) => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        service: process.env.SMTP_SERVICE,
        auth:{
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const {email,subject,template,data} = options;

    // get the pdath to the email template file
    const templatePath = path.join(__dirname,'../Mail',template);

    // Render the email template with EJS
    const html:string = await ejs.renderFile(templatePath,data);

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html
    };

    await transporter.sendMail(mailOptions);
};