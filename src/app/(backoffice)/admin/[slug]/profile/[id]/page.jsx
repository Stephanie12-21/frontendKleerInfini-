"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ProfilePage() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editMode, setEditMode] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setPhone(session.user.phone || "");
    }
  }, [session]);

  const handleSave = () => {
    console.log("Données sauvegardées :", { name, email, phone });
    setEditMode(false);
  };

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

        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-[#0C1844] font-medium"
              >
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
              <label
                htmlFor="phone"
                className="block text-[#0C1844] font-medium"
              >
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
              <label
                htmlFor="email"
                className="block text-[#0C1844] font-medium"
              >
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
        </div>
      </div>
    </>
  );
}
