"use client";

import Image from "next/image";
import React, { useState } from "react";

const Connexion = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis:", formData);
    // Ici vous pouvez ajouter la logique pour envoyer les données à votre backend
    alert("Formulaire envoyé avec succès!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
                onSubmit={handleSubmit}
                className="w-full  mx-auto flex flex-col px-28  gap-4"
              >
                <div className="space-y-2">
                  <label className="text-lg text-[#0C1844]">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#D3D6DE]  text-lg text-[##0C1844] font-medium"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-lg text-[#0C1844]">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#D3D6DE]  text-lg text-[##0C1844] font-medium"
                    required
                  />
                </div>

                <div className="flex justify-center  mt-4">
                  <button
                    type="submit"
                    className="bg-[#0C1844] text-white text-lg py-2  px-4 rounded "
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
                onSubmit={handleSubmit}
                className="w-full  mx-auto flex flex-col px-28  gap-4"
              >
                <div className="space-y-2">
                  <label className="text-lg text-[#0C1844]">Nom</label>
                  <input
                    type="name"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
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
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#D3D6DE]  text-lg text-[##0C1844] font-medium"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-lg text-[#0C1844]">Téléphone</label>
                  <input
                    type="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#D3D6DE]  text-lg text-[##0C1844] font-medium"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-lg text-[#0C1844]">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#D3D6DE]  text-lg text-[##0C1844] font-medium"
                    required
                  />
                </div>

                <div className="flex justify-center  mt-4">
                  <button
                    type="submit"
                    className="bg-[#0C1844] text-white text-lg py-2  px-4 rounded "
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
    </div>
  );
};

export default Connexion;
