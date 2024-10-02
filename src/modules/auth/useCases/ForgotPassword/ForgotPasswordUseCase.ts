import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET || "";
import { EmailParams, Recipient, Sender } from "mailersend";
import { mailSender, mailSenderName, websiteUrl } from "../utils";
import { mailer } from "../../../mailer";

export class ForgotPasswordUseCase {
  async execute(email: string) {
    if (!email) {
      throw new AppError("Email is required", 400);
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new AppError("User not found", 404);
      }

      // send email with link to reset password
      const sentFrom = new Sender(mailSender, mailSenderName);

      const recipients = [new Recipient(user.email, user.name)];

      const mailBody = `
        <p>Click the link below to reset your password</p>
        <a href="${websiteUrl}/reset-password?token=${jwt.sign(
        { userId: user.id },
        secret,
        {
          expiresIn: "1h",
        }
      )}">Reset Password</a>
      `;

      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject("Forgot Password - Reset your password")
        .setHtml(mailBody);

      await mailer.email.send(emailParams);

      return { message: "Email sent" };
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(error.message, 500);
    }
  }
}
