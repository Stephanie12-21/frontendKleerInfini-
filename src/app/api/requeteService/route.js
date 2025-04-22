import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

async function sendRequeteServiceEmail(data) {
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
    from: data.email,
    to: `"Kleer Infini" <${process.env.SMTP_USER}>`,
    subject: "Requête de service de Kleer Infini",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
      <div style="background-color: #C80036; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Nouvelle requête reçue depuis le site Kleer Infini</h1>
      </div>

      <div style="padding: 20px; line-height: 1.5; color: #333333;">
        <p style="font-size: 16px; margin-bottom: 15px;">Bonjour cher Administrateur,</p>
        <p style="font-size: 16px; margin-bottom: 15px;">Vous  avez  reçu une nouvelle demande pour le service suivant :</p>

        <ul style="font-size: 16px; margin-bottom: 15px;">
          <li><strong>Nom :</strong> ${data.nom}</li>
          <li><strong>Email :</strong> ${data.email}</li>
          <li><strong>Téléphone :</strong> ${data.telephone}</li>
          <li><strong>Détails :</strong> ${data.details}</li>
          <li><strong>Services demandés :</strong></li>
          <ul>
            ${
              data.reseauSecurite
                ? `<li>Administration réseau & sécurité informatique</li>`
                : ""
            }
            ${
              data.cloudComputing
                ? `<li>Cloud computing & infrastructures digitales</li>`
                : ""
            }
            ${
              data.devOps ? `<li>DevOps & automatisation des systèmes</li>` : ""
            }
            ${
              data.developpementWeb ? `<li>Développement web & mobile</li>` : ""
            }
            ${
              data.solutionsDigitales
                ? `<li>Solutions digitales pour l'exportation & la présentation des produits algériens</li>`
                : ""
            }
          </ul>
        </ul>


        <p style="font-size: 16px; font-weight: bold;">L'équipe de Kleer Infini</p>
      </div>
    </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email de confirmation envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw new Error("Erreur lors de l'envoi de l'email de confirmation");
  }
}

async function sendRequeteServiceEmailConfirmation(data) {
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
    from: `"Kleer Infini" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: "Confirmation de réception de la requête de service",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
      <div style="background-color: #C80036; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Confirmation de réception de requête de service</h1>
      </div>

      <div style="padding: 20px; line-height: 1.5; color: #333333;">
        <p style="font-size: 16px; margin-bottom: 15px;">Bonjour ${
          data.nom
        },</p>
        <p style="font-size: 16px; margin-bottom: 15px;">Nous avons bien  reçu votre demande pour le service dont les informations sont marquées ci-dessous :</p>

        <ul style="font-size: 16px; margin-bottom: 15px;">
          <li><strong>Nom :</strong> ${data.nom}</li>
          <li><strong>Email :</strong> ${data.email}</li>
          <li><strong>Téléphone :</strong> ${data.telephone}</li>
          <li><strong>Détails :</strong> ${data.details}</li>
          <li><strong>Services demandés :</strong></li>
          <ul>
            ${
              data.reseauSecurite
                ? `<li>Administration réseau & sécurité informatique</li>`
                : ""
            }
            ${
              data.cloudComputing
                ? `<li>Cloud computing & infrastructures digitales</li>`
                : ""
            }
            ${
              data.devOps ? `<li>DevOps & automatisation des systèmes</li>` : ""
            }
            ${
              data.developpementWeb ? `<li>Développement web & mobile</li>` : ""
            }
            ${
              data.solutionsDigitales
                ? `<li>Solutions digitales pour l'exportation & la présentation des produits algériens</li>`
                : ""
            }
          </ul>
        </ul>

        <p style="font-size: 16px; margin-bottom: 15px;">Nous traiterons votre demande dans les plus brefs délais.</p>

        <p style="font-size: 16px; font-weight: bold;">L'équipe de Kleer Infini</p>
      </div>
    </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email de confirmation envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw new Error("Erreur lors de l'envoi de l'email de confirmation");
  }
}

export async function POST(request) {
  try {
    const {
      nom,
      email,
      telephone,
      details,
      reseauSecurite,
      cloudComputing,
      devOps,
      developpementWeb,
      solutionsDigitales,
    } = await request.json();

    if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      return new NextResponse(JSON.stringify({ message: "Email invalide." }), {
        status: 400,
      });
    }

    await sendRequeteServiceEmail({
      nom,
      email,
      telephone,
      details,
      reseauSecurite,
      cloudComputing,
      devOps,
      developpementWeb,
      solutionsDigitales,
    });

    await sendRequeteServiceEmailConfirmation({
      nom,
      email,
      telephone,
      details,
      reseauSecurite,
      cloudComputing,
      devOps,
      developpementWeb,
      solutionsDigitales,
    });

    return new NextResponse(
      JSON.stringify({
        message: "Votre requête de service a été envoyée avec succès.",
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
