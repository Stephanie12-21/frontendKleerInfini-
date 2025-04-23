import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function PUT(request, { params }) {
  try {
    const { adminId } = await params;
    const { newPassword } = await request.json();

   

    if (!adminId) {
      console.log("Erreur : ID utilisateur manquant.");
      return new NextResponse(JSON.stringify({ message: "ID manquant" }), {
        status: 400,
      });
    }

    if (!newPassword) {
      console.log("Erreur : Nouveau mot de passe non fourni.");
      return new NextResponse(
        JSON.stringify({ message: "Le nouveau mot de passe est requis." }),
        { status: 400 }
      );
    }

    const admin = await db.admin.findUnique({
      where: { id: parseInt(adminId, 10) },
    });

    console.log("Utilisateur trouvé :", admin ? "Oui" : "Non");

    if (!admin) {
      console.log("Erreur : Utilisateur non trouvé.");
      return new NextResponse(
        JSON.stringify({ message: "Utilisateur non trouvé." }),
        { status: 404 }
      );
    }

    const isSamePassword = await bcrypt.compare(newPassword, admin.hashPassword);
    console.log(
      "Le nouveau mot de passe est identique à l'ancien :",
      isSamePassword
    );

    if (isSamePassword) {
      console.log("Erreur : Le nouveau mot de passe est identique à l'ancien.");
      return new NextResponse(
        JSON.stringify({
          message:
            "Le nouveau mot de passe ne peut pas être identique à l'ancien.",
        }),
        { status: 400 }
      );
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    console.log("Nouveau mot de passe hashé avec succès.");

    await db.admin.update({
      where: { id: parseInt(adminId, 10) },
      data: { hashPassword: hashedNewPassword },
    });

    console.log(
      "Mot de passe mis à jour avec succès pour l'utilisateur :",
      adminId
    );

    return new NextResponse(
      JSON.stringify({ message: "Mot de passe mis à jour avec succès!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe :", error);
    return new NextResponse(
      JSON.stringify({
        message: "Erreur lors de la mise à jour du mot de passe.",
      }),
      { status: 500 }
    );
  }
}
