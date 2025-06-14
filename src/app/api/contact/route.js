import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

async function sendMessageContact(nom, prenom, email, phone, message) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.SMTP_USER,
    subject: "Message de contact depuis le site Kleer Infini",

    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ced1da;">
  
  <div style="background-color: #0C1844; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Un nouveau message depuis votre site Kleer Infini.</h1>
  </div>

  <div style="padding: 20px; line-height: 1.5; color: #333333;">
    <p style="font-size: 16px; margin-bottom: 15px;">Bonjour,</p>

    <p style="font-size: 16px; margin-bottom: 15px;">
     Vous avez reçu un nouveau message  de la part de ${prenom} ${nom}.
    </p>

    <p style="font-size: 16px; margin-bottom: 15px;">
      <strong>Voici le message envoyé :</strong><br>
      ${message}
    </p>

    <hr style="border: 1px solid #0C1844; margin: 30px 0;">

    <h2 style="font-size: 18px; font-weight: bold; color: #333333;">Informations de l'envoyeur :</h2>
    
    <p style="font-size: 16px; margin-bottom: 15px;">
      <strong>Nom :</strong> ${nom}<br>
      <strong>Prénom :</strong> ${prenom}<br>
      <strong>Email :</strong> ${email}<br>
      <strong>Téléphone :</strong> ${phone}
    </p>

    <p style="font-size: 16px; margin-bottom: 15px;">
      Merci,<br>
      L'équipe de Kleer Infini.
    </p>
  </div>

  
</div>

  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Message envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi du message :", error);
    throw new Error("Erreur lors de l'envoi de l'e-mail");
  }
}

export async function POST(req) {
  const { nom, prenom, email, phone, message } = await req.json();

  if (!nom || !prenom || !email || !phone || !message) {
    return NextResponse.json(
      { error: "Tous les champs sont requis." },
      { status: 400 }
    );
  }

  try {
    await sendMessageContact(nom, prenom, email, phone, message);
    return NextResponse.json(
      { message: "Message envoyé à l'administrateur avec succès" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
