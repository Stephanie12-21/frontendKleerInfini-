import { db } from "@/lib/db";
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
        { message: "Un administrateur avec cet email existe déjà." },
        { status: 409 }
      );
    }

    const existingadminByPhone = await db.admin.findUnique({
      where: { phone },
    });
    if (existingadminByPhone) {
      console.log("Numéro de téléphone déjà utilisé");
      return NextResponse.json(
        {
          message: "Un administrateur avec ce numéro de téléphone existe déjà.",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    console.log("Création de l'administrateur...");
    const newcompteAdmin = await db.admin.create({
      data: {
        name,
        email,
        phone,
        hashPassword: hashedPassword,
      },
    });

    const { hashPassword: _, ...rest } = newcompteAdmin;

    console.log(
      "Compte créé et Données envoyées avec succès à la base de données"
    );

    return NextResponse.json(
      {
        compteAdmin: rest,
        message: "Compte créé avec succès.",
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
