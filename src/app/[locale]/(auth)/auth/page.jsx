"use client";

import Image from "next/image";
import React, { use, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import { ErrorModal } from "@/app/[locale]/(modal)/erreurs/page";
import { getSession, signIn } from "next-auth/react";
import { SuccessModal } from "@/app/[locale]/(modal)/success/page";
import { InfoModal } from "@/app/[locale]/(modal)/info/page";
import slugify from "slugify";
import { useLocale, useTranslations } from "next-intl";

const Connexion = () => {
  const router = useRouter();
  const locale = useLocale();
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
  const t = useTranslations();

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
      router.push(`/${locale}/admin/${slug}/profile/${updatedSession.user.id}`);
    } catch (error) {
      console.error("Login error:", error);
      setError("Une erreur s'est produite, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="w-full h-20 flex items-center text-white text-2xl font-semibold pl-6 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg.svg')",
        }}
      >
        {t("CONNEXION")}
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-6 text-[#0C1844] text-left flex flex-col mb-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
            <div className="w-full md:w-1/2  justify-center hidden md:block">
              <div className="w-full h-72 md:h-full relative min-h-[400px]">
                <Image
                  src="/authImage (1).svg"
                  alt="Mission"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
              <h2 className="text-4xl font-extrabold mb-8 text-[#C80036]">
                {t("Login.title")}
              </h2>
              <form
                onSubmit={handleLogIn}
                className="w-full flex flex-col items-center gap-4 px-6 sm:px-16 lg:px-28"
              >
                <div className="space-y-2 w-full">
                  <label className="text-lg text-[#0C1844]">
                    {t("Login.emailLabel")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder={t("Login.emailPlaceholder")}
                    value={emailConnexion}
                    onChange={(e) => setEmailConnexion(e.target.value)}
                    className="w-full p-3 bg-[#D3D6DE] text-lg text-[#0C1844] font-medium rounded"
                    required
                  />
                </div>

                <div className="space-y-2 w-full">
                  <label className="text-lg text-[#0C1844]">
                    {t("Login.passwordLabel")}
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder={t("Login.passwordPlaceholder")}
                    value={passwordConnexion}
                    onChange={(e) => setPasswordConnexion(e.target.value)}
                    className="w-full p-3 bg-[#D3D6DE] text-lg text-[#0C1844] font-medium rounded"
                    required
                  />
                </div>

                <div className="flex justify-center w-full mt-4">
                  <button
                    type="submit"
                    className="bg-[#0C1844] text-white w-full text-lg py-2 px-4 rounded"
                  >
                    {t("Login.submitButton")}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center mt-20 gap-10 md:gap-20">
            <div className="w-full md:w-1/2 text-left flex flex-col items-center justify-center">
              <h2 className="text-4xl font-extrabold mb-8 text-[#C80036]">
                {t("register-title")}
              </h2>
              <form
                onSubmit={handleCreateAccount}
                className="w-full flex flex-col items-center gap-4 px-6 sm:px-16 lg:px-28"
              >
                <div className="space-y-2 w-full">
                  <label className="text-lg text-[#0C1844]">
                    {t("register-name-label")}
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder={t("register-name-placeholder")}
                    className="w-full p-3 bg-[#D3D6DE] text-lg text-[#0C1844] font-medium rounded"
                    required
                  />
                </div>

                <div className="space-y-2 w-full">
                  <label className="text-lg text-[#0C1844]">
                    {t("register-email-label")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("register-email-placeholder")}
                    className="w-full p-3 bg-[#D3D6DE] text-lg text-[#0C1844] font-medium rounded"
                    required
                  />
                </div>

                <div className="space-y-2 w-full">
                  <label className="text-lg text-[#0C1844]">
                    {t("register-phone-label")}
                  </label>
                  <PhoneInput
                    country="dz"
                    value={Phone}
                    onChange={setPhone}
                    placeholder={t("register-phone-placeholder")}
                    required
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

                <div className="space-y-2 w-full">
                  <label className="text-lg text-[#0C1844]">
                    {t("register-password-label")}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("register-password-placeholder")}
                    className="w-full p-3 bg-[#D3D6DE] text-lg text-[#0C1844] font-medium rounded"
                    required
                  />
                </div>

                <div className="space-y-2 w-full">
                  <label className="text-lg text-[#0C1844]">
                    {t("register-confirm-password-label")}
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t("register-confirm-password-placeholder")}
                    className="w-full p-3 bg-[#D3D6DE] text-lg text-[#0C1844] font-medium rounded"
                    required
                  />
                </div>

                <div className="flex justify-center mt-4 w-full">
                  <button
                    type="submit"
                    className="bg-[#0C1844] text-white text-lg py-2 px-4 rounded w-full"
                  >
                    {t("register-submit-button")}
                  </button>
                </div>
              </form>
            </div>

            <div className="w-full md:w-1/2 hidden md:block relative">
              <div className="w-full h-full relative min-h-[400px]">
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
