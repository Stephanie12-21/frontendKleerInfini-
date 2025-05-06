"use client";

import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  // Charger les données depuis la session
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setPhone(session.user.phone || "");
    }
  }, [session]);

  // Recharger les données utilisateur après modification (optionnel selon API)
  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/compte/${session.user.id}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      const data = await response.json();
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  // Sauvegarder les modifications
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);

    try {
      const response = await fetch(`/api/compte/${session.user.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Échec de la mise à jour du profil utilisateur");
      }

      await fetchUserData();
      setEditMode(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      setIsErrorModalOpen(true);
    }
  };

  if (status === "loading") {
    return <p className="p-10 text-center">Chargement...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <p className="p-10 text-center text-red-600">
        Veuillez vous connecter pour accéder à cette page.
      </p>
    );
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Admin - Paramètres du Compte</title>
      </Head>

      <div className="mx-auto p-6 rounded-lg">
        <div className="flex justify-end gap-4 mb-4">
          {editMode && (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Enregistrer les modifications
            </button>
          )}
          <button
            onClick={() => setEditMode(!editMode)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {editMode ? "Annuler" : "Modifier le profil"}
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-[#0C1844] font-medium">
              Nom
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!editMode}
              className="w-full p-3 h-13 bg-[#D3D6DE] rounded-md text-lg text-[#0C1844]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-[#0C1844] font-medium">
              Téléphone
            </label>
            <PhoneInput
              country="dz"
              value={phone}
              disabled={!editMode}
              onChange={setPhone}
              placeholder="Entrez votre numéro de téléphone"
              inputStyle={{
                width: "100%",
                height: "40px",
                color: "#0C1844D9",
                backgroundColor: editMode ? "#edf2f7" : "#e2e8f0",
              }}
              buttonClass="custom-flag-style"
              inputClass="col-span-3 items-start w-full h-11 text-base font-medium"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-[#0C1844] font-medium">
              Email
            </label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!editMode}
              className="w-full p-3 h-13 bg-[#D3D6DE] rounded-md text-lg text-[#0C1844]"
            />
          </div>
        </div>

        {isSuccessModalOpen && (
          <div className="mt-4 text-green-600 font-semibold">
            Profil mis à jour avec succès.
          </div>
        )}
        {isErrorModalOpen && (
          <div className="mt-4 text-red-600 font-semibold">
            Une erreur est survenue lors de la mise à jour.
          </div>
        )}
      </div>
    </>
  );
}
