import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET || "";
import { mailSender, websiteUrl } from "../utils";
import { transporter } from "../../../mailer";

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
      const sentFrom = mailSender;

      const recipients = [user.email];

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

      const emailParams = {
        from: sentFrom,
        to: recipients,
        replyTo: sentFrom,
        subject: "Forgot Password - Reset your password",
        html: mailBody,
      };

      await transporter.sendMail(emailParams);

      return { message: "Email sent" };
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      }
      console.log(error);
      throw new AppError(error.message, 500);
    }
  }
}
