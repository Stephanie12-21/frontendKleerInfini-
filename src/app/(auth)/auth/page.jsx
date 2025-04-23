"use client";

import Image from "next/image";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import { ErrorModal } from "@/app/(modal)/erreurs/page";
import { getSession, signIn } from "next-auth/react";
import { SuccessModal } from "@/app/(modal)/success/page";
import { InfoModal } from "@/app/(modal)/info/page";
import slugify from "slugify";

const Connexion = () => {
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailConnexion, setEmailConnexion] = useState("");
  const [Phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordConnexion, setPasswordConnexion] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    const telephone = `+${Phone}`;

    const formData = new FormData();
    formData.append("name", nom);
    formData.append("email", email);
    formData.append("phone", telephone);
    formData.append("password", password);

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch("/api/compte/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setIsErrorModalOpen(true);
        throw new Error(data.message || "Erreur lors de l'envoi des données.");
      } else {
        setIsSuccessModalOpen(true);
        router.push(`/auth`);
      }
    } catch (error) {
      setIsErrorModalOpen(true);
      console.error("Erreur lors de l'envoi des données :", error);
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    setError("");
    try {
      const loginData = await signIn("credentials", {
        email: emailConnexion,
        password: passwordConnexion,
        redirect: false,
      });

      if (loginData?.error) {
        setError(loginData.error);
        setLoading(false);
        return;
      }

      const updatedSession = await getSession();

      if (!updatedSession?.user) {
        setError("Utilisateur introuvable ou session invalide.");
        setLoading(false);
        return;
      }

      const firstName = updatedSession.user.name || "utilisateur";
      const slug = `${slugify(firstName)}`;

      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push(`/admin/${slug}/profile/${updatedSession.user.id}`);
    } catch (error) {
      console.error("Login error:", error);
      setError("Une erreur s'est produite, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div
        className="w-full h-20 flex items-center text-white text-2xl font-semibold pl-6"
        style={{
          backgroundImage: "url('/bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        CONNEXION
      </div>

      <div className=" mx-auto">
        <section className="px-8 py-6 text-[#0C1844] text-center flex flex-col mb-10">
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-28">
            <div className="w-full md:w-4/5 relative">
              <div className="w-full  h-full relative min-h-[500px]">
                <Image
                  src="/authImage (1).svg"
                  alt="Mission"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="w-full md:w-4/5 text-left flex flex-col items-center justify-center">
              <h2 className="text-4xl font-extrabold mb-8 text-[#C80036]">
                Avez-vous déja un compte ?
              </h2>
              <form
                onSubmit={handleLogIn}
                className="w-full  mx-auto flex flex-col px-28  gap-4"
              >
                <div className="space-y-2">
                  <label className="text-lg text-[#0C1844]">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={emailConnexion}
                    onChange={(e) => setEmailConnexion(e.target.value)}
                    className="w-full p-3 bg-[#D3D6DE]  text-lg text-[##0C1844] font-medium"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-lg text-[#0C1844]">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    value={passwordConnexion}
                    onChange={(e) => setPasswordConnexion(e.target.value)}
                    className="w-full p-3 bg-[#D3D6DE]  text-lg text-[##0C1844] font-medium"
                    required
                  />
                </div>

                <div className="flex justify-center w-full  mt-4">
                  <button
                    type="submit"
                    className="bg-[#0C1844] text-white w-full text-lg py-2  px-4 rounded "
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-stretch mt-20 ml-10 justify-center gap-20">
            <div className="w-full md:w-4/5 text-left flex flex-col items-center justify-center">
              <h2 className="text-4xl font-extrabold mb-8 text-[#C80036]">
                Créer un compte
              </h2>
              <form
                onSubmit={handleCreateAccount}
                className="w-full  mx-auto flex flex-col px-28  gap-4"
              >
                <div className="space-y-2">
                  <label className="text-lg text-[#0C1844]">Nom</label>
                  <input
                    type="name"
                    name="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full p-3 bg-[#D3D6DE]  text-lg text-[##0C1844] font-medium"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-lg text-[#0C1844]">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-[#D3D6DE]  text-lg text-[##0C1844] font-medium"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-lg text-[#0C1844]">Téléphone</label>
                  <PhoneInput
                    country="dz"
                    value={Phone}
                    required
                    onChange={setPhone}
                    placeholder="Entrez votre numéro de téléphone"
                    inputStyle={{
                      width: "100%",
                      height: "50px",
                      color: "#0C1844D9",
                      backgroundColor: "#D3D6DE",
                    }}
                    buttonClass="custom-flag-style"
                    inputClass="col-span-3 items-start w-full h-18 text-lg font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-lg text-[#0C1844]">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-[#D3D6DE]  text-lg text-[##0C1844] font-medium"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-lg text-[#0C1844]">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 bg-[#D3D6DE]  text-lg text-[##0C1844] font-medium"
                    required
                  />
                </div>

                <div className="flex justify-center  mt-4">
                  <button
                    type="submit"
                    className="bg-[#0C1844] text-white text-lg py-2 w-full px-4 rounded "
                  >
                    Créer
                  </button>
                </div>
              </form>
            </div>

            <div className="w-full md:w-4/5 relative">
              <div className="w-full h-full relative min-h-[500px]">
                <Image
                  src="/authImage (2).svg"
                  alt="Mission"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        message={infoMessage}
      />
    </div>
  );
};

export default Connexion;
