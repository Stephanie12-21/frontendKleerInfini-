import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

async function sendNewsletterEmail(email) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const unsubscribeToken = jwt.sign({ email }, process.env.JWT_SECRET);

  const mailOptions = {
    from: `"Kleer Infini" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Bienvenue à la newsletter Kleer Infini",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
      

      <div style="background-color: #C80036; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Bienvenue chez Kleer Infini!</h1>
      </div>

      <div style="padding: 20px; line-height: 1.5; color: #333333;">
        <p style="font-size: 16px; margin-bottom: 15px;">Bonjour,</p>

        <p style="font-size: 16px; margin-bottom: 15px;">
           Vous recevrez désormais des e-mails promotionnels et des informations de la part de Kleen Infini.
        </p>

        <p style="font-size: 16px; margin-bottom: 15px;">À bientôt,</p>
        <p style="font-size: 16px; font-weight: bold;">L'équipe de Kleer Infini</p>
      </div>

      
    </div>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw new Error("Erreur lors de l'envoi de l'email de confirmation");
  }
}

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      return new NextResponse(JSON.stringify({ message: "Email invalide." }), {
        status: 400,
      });
    }

    const existingEmail = await db.newsletter.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return new NextResponse(
        JSON.stringify({ message: "Cet email est déjà abonné." }),
        { status: 409 }
      );
    }

    await db.newsletter.create({
      data: { email },
    });

    await sendNewsletterEmail(email);

    return new NextResponse(
      JSON.stringify({
        message: "Vous êtes maintenant abonné à la newsletter.",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur dans l'API :", error);
    return new NextResponse(
      JSON.stringify({ message: "Erreur interne du serveur." }),
      { status: 500 }
    );
  }
}
