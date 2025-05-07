"use client";

import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslations } from "next-intl";
import { Save, Edit3, X } from "lucide-react";

export default function ProfilePage() {
  const t = useTranslations();
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
    return <p className="p-10 text-center">{t("LOADING")}</p>;
  }

  if (status === "unauthenticated") {
    return (
      <p className="p-10 text-center text-red-600">
        {t("UNAUTHENTICATED_MESSAGE")}
      </p>
    );
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>{t("ACCOUNT_SETTINGS_TITLE")}</title>
      </Head>

      <div className="mx-auto p-6 rounded-lg">
        <div className="flex justify-end gap-4 mb-4">
          {editMode && (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              <Save className="w-5 h-5" />
              {t("SAVE_CHANGES")}
            </button>
          )}
          <button
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {editMode ? (
              <>
                <X className="w-5 h-5" />
                {t("CANCEL")}
              </>
            ) : (
              <>
                <Edit3 className="w-5 h-5" />
                {t("EDIT_PROFILE")}
              </>
            )}
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-[#0C1844] font-medium">
              {t("NAME")}
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
              {t("PHONE")}
            </label>
            <PhoneInput
              country="dz"
              value={phone}
              disabled={!editMode}
              onChange={setPhone}
              placeholder={t("PHONE_PLACEHOLDER")}
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
              {t("EMAIL")}
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
            {t("PROFILE_UPDATED_SUCCESS")}
          </div>
        )}
        {isErrorModalOpen && (
          <div className="mt-4 text-red-600 font-semibold">
            {t("PROFILE_UPDATE_ERROR")}
          </div>
        )}
      </div>
    </>
  );
}
