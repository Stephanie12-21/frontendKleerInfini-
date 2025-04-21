import { db } from "@/lib/db";
import stripe from "@/lib/stripe";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Début du traitement des données du formulaire");
    const body = await req.formData();

    const name = body.get("name");
    const email = body.get("email");
    const phone = body.get("phone");
    const password = body.get("password");
    const imageFile = body.get("imageFile");

    console.log("Données reçues :", {
      name,
      email,
      phone,
    });

    const existingadminByEmail = await db.admin.findUnique({
      where: { email },
    });
    if (existingadminByEmail) {
      console.log("Email déjà utilisé");
      return NextResponse.json(
        { message: "Un utilisateur avec cet email existe déjà." },
        { status: 409 }
      );
    }

    const existingadminByPhone = await db.admin.findUnique({
      where: { phone },
    });
    if (existingadminByPhone) {
      console.log("Numéro de téléphone déjà utilisé");
      return NextResponse.json(
        { message: "Un utilisateur avec ce numéro de téléphone existe déjà." },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    let imageUrl = null;

    if (imageFile) {
      console.log("Début de l'upload de l'image");
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "ko4bjtic");

      const uploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dtryutlkz/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadResult = await uploadResponse.json();
      console.log("Résultat de l'upload :", uploadResult);

      if (uploadResponse.ok && uploadResult.secure_url) {
        imageUrl = uploadResult.secure_url;
        console.log("Image uploadée avec succès, URL :", imageUrl);
      } else {
        console.error("Erreur lors de l'upload de l'image :", uploadResult);
        throw new Error("Échec de l'upload de l'image");
      }
    } else {
      console.log("Aucune image fournie pour l'upload.");
    }

    if (!role) {
      return NextResponse.json(
        { message: "Le rôle fourni est invalide." },
        { status: 400 }
      );
    }

    console.log("Création de l'utilisateur");
    const newcomptePerso = await db.admin.create({
      data: {
        name,
        email,
        phone,
        hashPassword: hashedPassword,
      },
    });

    if (imageUrl) {
      console.log("Association de l'image avec l'utilisateur");
      await db.profileImage.create({
        data: {
          path: imageUrl,
          adminId: newcomptePerso.id,
        },
      });
    }

    const { hashPassword: _, ...rest } = newcomptePerso;

    console.log(
      "Compte créé et Données envoyées avec succès à la base de données"
    );

    return NextResponse.json(
      {
        comptePerso: rest,
        message:
          "Compte créé avec succès. Les données ont été envoyées avec succès à la base de données et l'image a été bien enregistrée.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du compte :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
