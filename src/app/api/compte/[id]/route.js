import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req, { params }) {
  const adminId = params.id;

  if (!adminId) {
    return NextResponse.json(
      { message: "ID de l'utilisateur manquant." },
      { status: 400 }
    );
  }

  try {
    const admin = await db.admin.findUnique({
      where: { id: parseInt(adminId, 10) },
    });

    if (!admin) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé." },
        { status: 404 }
      );
    }

    const { hashPassword, ...adminData } = admin;

    return NextResponse.json(
      {
        admin: adminData,
        message: "Informations de l'utilisateur récupérées avec succès.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.formData();

    if (!id) {
      return new NextResponse(JSON.stringify({ message: "ID manquant" }), {
        status: 400,
      });
    }

    const name = body.get("name");
    const email = body.get("email");
    const phone = body.get("phone");

    if (!name || !email || !phone) {
      return new NextResponse(
        JSON.stringify({ message: "Tous les champs doivent être renseignés." }),
        { status: 400 }
      );
    }

    const updatedadmin = await db.admin.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        email,
        phone,
      },
    });
    if (!updatedadmin) {
      return new NextResponse(
        JSON.stringify({ message: "Utilisateur non trouvé." }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Utilisateur mis à jour avec succès!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        message: "Erreur lors de la mise à jour de l'utilisateur",
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const adminId = params.id;

  if (!adminId) {
    return NextResponse.json(
      { message: "ID de l'utilisateur manquant." },
      { status: 400 }
    );
  }

  try {
    const admin = await db.admin.findUnique({
      where: { id: parseInt(adminId, 10) },
    });

    if (!admin) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé." },
        { status: 404 }
      );
    }

    await db.profileImage.deleteMany({
      where: { adminId: admin.id },
    });

    await db.admin.delete({
      where: { id: parseInt(adminId, 10) },
    });

    return NextResponse.json(
      { message: "Utilisateur et images supprimés avec succès." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
