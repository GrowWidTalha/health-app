"use server"
import { parseStringify } from '@/lib/utils';
import { Resend } from 'resend';

export const sendEmail = async (to: string, from: string, subject: string,html: string ) => {
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!);
    try {
        const email = await resend.emails.send({
            to: ["mail.healthsync@gmail.com"],
            from: "Acme <onboarding@resend.dev>",
            subject: subject,
            html: html,
          });
          console.log("email send successfully")
          console.log(email);

          return parseStringify(email)
    } catch (error) {
        console.log("error sending email: ", error)
    }

}
