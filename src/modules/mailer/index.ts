import { MailerSend } from "mailersend";

export const mailer = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || "",
});
