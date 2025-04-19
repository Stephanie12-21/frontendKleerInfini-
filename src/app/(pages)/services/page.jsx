"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Cloud, Code, Infinity, Lightbulb, Lock } from "lucide-react";

export default function Home() {
  const [showSecondDiv, setShowSecondDiv] = useState(false);
  const kleerSectionRef = useRef();
  const kleerSectionDevRef = useRef();
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    services: {
      reseauSecurite: false,
      cloudComputing: false,
      devOps: false,
      developpementWeb: false,
      solutionsDigitales: false,
    },
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis:", formData);
    // Ici vous pouvez ajouter la logique pour envoyer les données à votre backend
    alert("Formulaire envoyé avec succès!");
  };

  const handleContinue = () => {
    setShowSecondDiv(true);
  };

  const handleBack = () => {
    setShowSecondDiv(false);
  };

  const handleScrollDown = () => {
    kleerSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollDevDown = () => {
    kleerSectionDevRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full overflow-hidden">
      <div
        className={`flex transition-transform duration-700 ease-in-out min-h-screen ${
          showSecondDiv ? "-translate-x-1/2" : "translate-x-0"
        }`}
        style={{ width: "200%" }}
      >
        {/* Premier écran */}
        <div className="w-1/2 flex-shrink-0">
          <section
            className="relative flex flex-col items-center justify-center h-[600px] text-center px-10 bg-cover bg-center space-y-10 w-full"
            style={{
              backgroundImage: "url('/serviceImage.jfif')",
            }}
          >
            <div className="max-w-7xl">
              <h1 className="text-white text-5xl font-bold">
                EXPORTATION & COMMERCE INTERNATIONAL
              </h1>
              <div className="w-full flex justify-end pt-5">
                <Button
                  onClick={handleContinue}
                  className="bg-[#C80036] hover:bg-[#C80036] text-white font-extrabold rounded-md w-16 h-16 p-0"
                >
                  <Image src="/icone.png" alt="play" width={35} height={35} />
                </Button>
              </div>
              <div className="w-full flex justify-start pt-5">
                <Button
                  onClick={handleScrollDown}
                  className="h-12 px-8 py-4 bg-[#C80036BF]/80 hover:bg-[#C80036BF] rounded-lg cursor-pointer"
                >
                  EN SAVOIR PLUS
                </Button>
              </div>
            </div>
          </section>

          {/* Section cible du scroll */}
          <section
            ref={kleerSectionRef}
            className="w-full px-8 py-6 text-[#0C1844] flex flex-col mb-10 gap-10"
          >
            <div className="flex items-center justify-center">
              <h2 className="text-4xl font-bold my-5 text-[#C80036]">
                KLEER INFINI
              </h2>
            </div>
            <div className="w-full relative flex justify-between gap-20">
              <div className="w-full md:w-2/5">
                <div className="w-full h-full relative min-h-[300px]">
                  <Image
                    src="/serviceImage.jfif"
                    alt="imageservice"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full md:w-3/5 flex flex-col gap-y-5">
                <p className="text-lg">
                  Kleernet Infini prend en charge l'ensemble du processus
                  logistique et douanier pour garantir une exportation fluide et
                  sécurisée.
                </p>
                <p className="text-lg">
                  De la recherche de fournisseurs à l'expédition, nous gérons le
                  transport, les formalités douanières et la conformité
                  réglementaire pour assurer une livraison efficace à
                  l'international.
                </p>
                <p className="text-lg">
                  Facilitation des exportations et mise en relation entre
                  producteurs algériens et marchés internationaux.
                </p>
                <p className="text-lg">
                  Collaboration avec des fabricants certifiés. Accompagnement
                  des entreprises pour l'obtention des certifications.
                </p>
                <p className="text-lg">
                  Suivi des normes de qualité et conformité aux standards
                  internationaux.
                </p>
              </div>
            </div>
          </section>

          {/* services logistiques personnalisés */}
          <section className="w-full px-8 py-10 bg-[#0C1844] text-white flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <h1 className="text-[#C80036] text-3xl font-bold">
                NOS SERVICES LOGISTIQUES SPECIALISES
              </h1>
            </div>
            <div className="flex items-center justify-center gap-10 pt-10">
              <div className="relative w-[400px] h-[500px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/image2.svg"
                    alt="Fret Routier"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="relative z-10 w-full h-full flex items-end justify-center px-8 py-4">
                  <div className="relative w-full h-[60px]">
                    <div className="absolute top-0 right-0 w-full h-[45px] bg-[#C80036] rounded-sm z-0"></div>

                    <div className="absolute bottom-1 right-3 w-full bg-white rounded-sm shadow-md z-10 flex justify-between items-center px-4 py-2">
                      <span className="text-[#0C1844] font-medium text-lg">
                        Fret Routier
                      </span>
                      <div className="w-6 h-6 bg-[#C80036] rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative w-[400px] h-[500px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/image3.jfif"
                    alt="Fret Maritime"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="relative z-10 w-full h-full flex items-end justify-center px-8 py-4">
                  <div className="relative w-full h-[60px]">
                    <div className="absolute top-0 right-0 w-full h-[45px] bg-[#C80036] rounded-sm z-0"></div>

                    <div className="absolute bottom-1 right-3 w-full bg-white rounded-sm shadow-md z-10 flex justify-between items-center px-4 py-2">
                      <span className="text-[#0C1844] font-medium text-lg">
                        Fret Maritime
                      </span>
                      <div className="w-6 h-6 bg-[#C80036] rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative w-[400px] h-[500px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/image4.jfif"
                    alt="Fret Aérien"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="relative z-10 w-full h-full flex items-end justify-center px-8 py-4">
                  <div className="relative w-full h-[60px]">
                    <div className="absolute top-0 right-0 w-full h-[45px] bg-[#C80036] rounded-sm z-0"></div>

                    <div className="absolute bottom-1 right-3 w-full bg-white rounded-sm shadow-md z-10 flex justify-between items-center px-4 py-2">
                      <span className="text-[#0C1844] font-medium text-lg">
                        Fret Aérien
                      </span>
                      <div className="w-6 h-6 bg-[#C80036] rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* suivie et traçabilité */}
          <section className="w-full px-40">
            <div className=" flex flex-col items-start justify-start px-10 my-10 bg-[#0C1844] text-center bg-cover bg-center relative space-y-10 py-10 rounded-lg ">
              <div className="w-full space-y-6">
                <h1 className="text-[#C80036] text-4xl font-bold text-left">
                  SUIVI & TRAÇABILITÉ
                </h1>

                <div className="w-full bg-white rounded-sm shadow-md flex justify-between items-center px-4 py-2">
                  <input
                    type="text"
                    placeholder="Numéro de recherche"
                    className="flex-1 text-[#0C1844] font-medium text-lg outline-none bg-transparent"
                  />

                  <button className=" px-4 py-2 bg-[#C80036E5] text-lg text-white rounded-sm ml-4">
                    {" "}
                    Trouver
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/*type de produits */}
          <section className="px-8 py-6 text-[#0C1844] text-center flex flex-col gap-10">
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-10">
              <div className="w-full md:w-3/6 relative min-h-[400px]">
                <div className="relative z-10 w-full h-full flex items-start justify-center px-8 py-4">
                  <div className="relative w-full h-full">
                    <div className="relative  left-3 w-full h-full bg-[#0C1844]  z-0"></div>

                    <div className="absolute top-5 right-3 w-full h-full   shadow-md z-10 flex justify-between items-center px-4 py-2">
                      <Image
                        src="/image5.svg"
                        alt="Fret Aérien"
                        fill
                        className="w-full h-full object-cover "
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/5 text-left flex flex-col items-start justify-center">
                <h2 className="text-4xl font-extrabold mb-8 text-[#C80036]">
                  TYPE PRODUIT
                </h2>
                <div className="text-lg leading-relaxed text-[#0C1844] mt-5 space-y-15">
                  <p>
                    Notre entreprise est spécialisée dans l&apos;exportation et
                    le commerce international de tous types de produits (y
                    compris alimentaires, cosmétiques, pharmaceutiques et
                    parapharmaceutiques), à l&apos;exception des carburants.
                  </p>
                  <p>
                    {" "}
                    Nous garantissons des produits conformes aux normes
                    internationales et assurons une livraison rapide et
                    sécurisée grâce à notre réseau logistique performant.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* saisir l'adresse mail*/}
          <section className="w-full px-8 py-6 text-[#0C1844] text-center flex flex-col gap-10">
            <div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-10">
              <div className="w-full md:w-3/6 relative min-h-[400px]">
                <div className="relative z-10 w-full h-full flex items-start justify-center px-8 py-4">
                  <div className="relative w-full h-full">
                    <div className="relative  left-3 w-full h-full bg-[#0C1844]  z-0"></div>

                    <div className="absolute top-5 right-3 w-full h-full   shadow-md z-10 flex justify-between items-center px-4 py-2">
                      <Image
                        src="/image7.jfif"
                        alt="Fret Aérien"
                        fill
                        className="w-full h-full object-cover "
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/5 text-left flex flex-col items-start justify-center pr-32">
                <h2 className="text-4xl font-extrabold mb-8 text-[#C80036]">
                  Merci de renseigner votre adresse e-mail
                </h2>
                <div className="text-lg flex flex-col text-[#0C1844] mt-5 space-y-8">
                  <Input
                    className="w-full"
                    placeholder="Votre adresse e-mail professionnelle "
                  />
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="acceptEmails"
                      className="w-5 h-5 text-[#C80036] accent-[#C80036] rounded-sm"
                    />
                    <label
                      htmlFor="acceptEmails"
                      className="text-lg text-[#0C1844]"
                    >
                      J&apos;accepte de recevoir des e-mails promotionnels et
                      des informations de la part de Kleer Infini
                    </label>
                  </div>
                  <button className=" px-4 py-2 bg-[#0C1844] text-lg text-white rounded-sm ">
                    Continuer
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* liste des documents */}
          <section className="w-full my-10  text-[#0C1844] text-center flex flex-col ">
            <h2 className="text-4xl font-extrabold mb-3 text-[#C80036]">
              LISTE DES DOCUMENTS
            </h2>
            <p className="text-3xl font-bold  text-[#C80036]">
              {" "}
              Nécessaires pour l&apos;Exportation vers l&apos;Europe/France
            </p>
            <div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-10">
              <div className="w-full md:w-3/6 relative min-h-[400px]">
                <div className="relative z-10 w-full h-full flex items-start justify-center px-8 py-4">
                  <div className="relative w-full h-full">
                    <div className="absolute top-5 right-3 w-full h-full    z-10 flex justify-between items-center px-4 py-2">
                      <Image
                        src="/image.svg"
                        alt="Fret Aérien"
                        fill
                        className="w-full h-full object-cover "
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/5 text-left flex flex-col items-start justify-center pr-32">
                <div className="text-lg flex flex-col text-[#0C1844] mt-5 space-y-8">
                  <ul className="list-decimal list-inside text-lg text-[#0C1844] mt-5 space-y-8">
                    <li> Documents Commerciaux </li>
                    <li> Documents d&apos;Origine </li>
                    <li>
                      Documents Sanitaires et Phytosanitaires (pour les produits
                      alimentaires et agricoles)
                    </li>
                    <li>Documents Spécifiques selon le Produit </li>
                    <li>Documents de Transport et Logistique</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center ">
              <p className="text-3xl font-bold  text-[#0C1844]">
                Cliquez ici pour découvrir tous les détails !
              </p>
              <div className="mt-5 p-2 rounded-md border border-[#0C1844]">
                <Image
                  src="/Vector.svg"
                  alt="Dossiers"
                  width={50}
                  height={50}
                />
              </div>
            </div>
          </section>

          {/* liste des étapes */}
          <section className=" mb-20 w-full px-8 py-10 bg-[#0C1844] text-white flex flex-col items-center justify-center">
            {" "}
            <h1 className="text-[#C80036] text-4xl font-bold text-left">
              Étapes Clés pour une Exportation Réussie{" "}
            </h1>
            <div className="flex flex-col text-lg md:flex-row items-center justify-center gap-10 mt-10">
              <ul className="list-disc list-inside space-y-5">
                <li>Vérifier les certifications des fournisseurs</li>
                <li>
                  Obtenir tous les certificats nécessaires (sanitaires,
                  phytosanitaires, d&apos;origine, etc.)
                </li>
                <li>
                  S&apos;assurer que l&apos;étiquetage est conforme aux
                  normeseuropéennes Préparer tous les documents commerciaux et
                  logistiques
                </li>
                <li>
                  Vérifier la conformité avec les douanes et les réglementations
                  européennes
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* Second écran */}
        <div className="w-1/2 flex-shrink-0 ">
          <section
            className="relative flex flex-col items-center justify-center h-[600px] mb-10 text-center px-10 bg-cover bg-center space-y-10 w-full"
            style={{
              backgroundImage: "url('/image6.jfif')",
            }}
          >
            <div className="max-w-7xl">
              <h1 className="text-white text-5xl font-bold">
                EXPORTATION DE TECHNOLOGIES & SERVICES NUMERIQUES
              </h1>
              <div className="w-full flex justify-start pt-5">
                <Button
                  onClick={handleBack}
                  className="bg-[#C80036] hover:bg-[#A0002B] text-white font-extrabold rounded-md w-16 h-16 p-0"
                >
                  <Image
                    src="/chevron.png"
                    alt="retour"
                    width={30}
                    height={30}
                  />
                </Button>
              </div>
              <div className="w-full flex justify-end pt-5">
                <Button
                  onClick={handleScrollDevDown}
                  className="h-12 px-8 py-4 bg-[#C80036BF]/80 hover:bg-[#C80036BF] rounded-lg cursor-pointer"
                >
                  EN SAVOIR PLUS
                </Button>
              </div>
            </div>
          </section>

          {/* présentation kleer infini  */}
          <section
            ref={kleerSectionDevRef}
            className="w-full px-8 py-6 text-[#0C1844] flex mb-10 gap-10"
          >
            <div className="w-full relative flex justify-between gap-20">
              <div className="w-full md:w-3/5 flex flex-col gap-y-5">
                <div className="flex items-center justify-center">
                  <h2 className="text-4xl font-bold my-5 text-[#C80036]">
                    KLEER INFINI
                  </h2>
                </div>

                <p className="text-lg">
                  En plus du développement web, mobile et des solutions cloud,
                  Kleernet Infini propose également :
                </p>

                <ul className="list-disc pl-6 text-lg space-y-2">
                  <li>
                    Des systèmes de sécurité avancés pour la protection des
                    entreprises.
                  </li>
                  <li>
                    Des solutions de cybersécurité pour sécuriser les données
                    sensibles.
                  </li>
                  <li>
                    Des systèmes de vidéo surveillance modernes et intégrés.
                  </li>
                  <li>
                    Des dispositifs de contrôle d'accès performants pour les
                    infrastructures.
                  </li>
                </ul>
              </div>

              <div className="w-full md:w-2/5">
                <div className="w-full h-full relative min-h-[400px]">
                  <Image
                    src="/serviceImage.jfif"
                    alt="imageservice"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* présentaton des services numériques */}
          <section className="mb-20 w-full px-4 py-10 bg-[#0C1844] text-white flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-20 mb-4">
              {/* Service 1 */}
              <div className="bg-[#1E3CAA3B] p-10 rounded-md flex flex-col items-center text-center">
                <div className="mb-4">
                  <Image
                    src="/service (5).svg"
                    alt="Sécurité"
                    width={80}
                    height={80}
                  />
                </div>
                <h3 className="text-white text-xl font-medium">
                  Administration réseau &<br />
                  sécurité informatique
                </h3>
              </div>

              {/* Service 2 */}
              <div className="bg-[#1E3CAA3B] p-10 rounded-md flex flex-col items-center text-center">
                <div className="mb-4">
                  <Image
                    src="/service (4).svg"
                    alt="Cloud"
                    width={80}
                    height={80}
                  />
                </div>
                <h3 className="text-white text-xl font-medium">
                  Cloud computing &<br />
                  infrastructures digitales.
                </h3>
              </div>

              {/* Service 3 */}
              <div className="bg-[#1E3CAA3B] p-10 rounded-md flex flex-col items-center text-center">
                <div className="mb-4">
                  <Image
                    src="/service (3).svg"
                    alt="Développement"
                    width={70}
                    height={70}
                  />
                </div>
                <h3 className="text-white text-xl font-medium">
                  Développement web & mobile
                </h3>
              </div>

              {/* Service 4 */}
              <div className="bg-[#1E3CAA3B] p-10 rounded-md flex flex-col items-center text-center">
                <div className="mb-4 relative">
                  <Image
                    src="/service (2).svg"
                    alt="DevOps"
                    width={80}
                    height={80}
                  />
                </div>
                <h3 className="text-white text-xl font-medium">
                  DevOps & automatisation
                  <br />
                  des systèmes
                </h3>
              </div>
            </div>

            {/* Service 5 - Wider card */}
            <div className="bg-[#1E3CAA3B] p-10 mt-10 rounded-md flex flex-col items-center text-center">
              <div className="mb-4">
                <Image
                  src="/service (1).svg"
                  alt="Solutions digitales"
                  width={80}
                  height={80}
                />
              </div>
              <h3 className="text-white text-xl font-medium">
                Solutions digitales pour l'exportation &<br />
                la présentation des produits algériens
              </h3>
            </div>
          </section>

          {/* Services développement web et mobile */}
          <section className="px-8 py-6 text-white bg-[#0C1844] text-center flex flex-col ">
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-28">
              <div className="w-full md:w-3/6 relative">
                <div className="w-full h-full relative min-h-[500px]">
                  <Image
                    src="/dev2.svg"
                    alt="Mission"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              <div className="w-full md:w-4/5 text-left flex flex-col items-start justify-center">
                <h2 className="text-4xl font-extrabold mb-8 text-[#C80036]">
                  LE DEVELOPEMENT WEB
                </h2>
                <div className="text-lg leading-relaxed  space-y-10">
                  <p>
                    Le développement web consiste à créer des sites internet et
                    applications web accessibles via un navigateur (Chrome,
                    Firefox, etc.).
                  </p>
                  <p>Il se divise en deux parties principales :</p>
                  <ul className="list-disc list-inside pl-4 space-y-6">
                    <li>
                      Front-end : Interface utilisateur (HTML, CSS, JavaScript,
                      React, Angular).
                    </li>
                    <li>
                      Back-end : Logique métier, bases de données (Node.js, PHP,
                      Python, SQL).
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch mt-10 ml-10 justify-center gap-20">
              <div className="w-full md:w-4/5 text-left flex flex-col items-start justify-center">
                <h2 className="text-4xl font-extrabold mb-8 text-[#C80036]">
                  LE DEVELOPEMENT MOBILE
                </h2>
                <div className="text-lg leading-relaxed  space-y-10">
                  <p>
                    Le développement mobile consiste à créer des applications
                    pour smartphones (iOS, Android) disponibles sur des stores
                    (App Store, Google Play).
                  </p>
                  <p>Deux approches existent :</p>
                  <ul className="list-disc list-inside pl-4 space-y-6">
                    <li>
                      Natifs : Développés spécifiquement pour un OS (Swift pour
                      iOS, Kotlin pour Android).
                    </li>
                    <li>
                      Cross-platform : Une seule base de code pour plusieurs OS
                      (Flutter, React Native).
                    </li>
                  </ul>
                </div>
              </div>

              <div className="w-full md:w-3/6 relative">
                <div className="w-full h-full relative min-h-[500px]">
                  <Image
                    src="/dev1.svg"
                    alt="Mission"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* requête de service */}
          <section className="px-8 py-6 p-5 w-full text-center flex flex-col gap-10">
            <form
              onSubmit={handleSubmit}
              className="w-full  mx-auto flex flex-col px-28  gap-4"
            >
              <h1 className="text-4xl font-bold text-[#C41E3A] mb-4">
                REQUETE DE SERVICE
              </h1>

              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Nom"
                className="w-full p-3 bg-[#D3D6DE] rounded text-lg text-[##0C1844] font-medium"
                required
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 bg-[#D3D6DE] rounded text-lg text-[##0C1844] font-medium"
                required
              />

              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="Téléphone"
                className="w-full p-3 bg-[#D3D6DE] rounded text-lg text-[##0C1844] font-medium"
                required
              />

              <div className="flex flex-col gap-2 text-left">
                <h2 className="text-left text-xl text-[#0C1844] my-4">
                  Service sollicité
                </h2>

                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="reseauSecurite"
                      name="reseauSecurite"
                      checked={formData.services.reseauSecurite}
                      onChange={handleCheckboxChange}
                      className="mt-1 w-4 h-4"
                    />
                    <label
                      htmlFor="reseauSecurite"
                      className="text-left text-lg text-[#0C1844] "
                    >
                      Administration réseau & sécurité informatique
                    </label>
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="cloudComputing"
                      name="cloudComputing"
                      checked={formData.services.cloudComputing}
                      onChange={handleCheckboxChange}
                      className="mt-1 w-4 h-4"
                    />
                    <label
                      htmlFor="cloudComputing"
                      className="text-left text-lg text-[#0C1844] "
                    >
                      Cloud computing & infrastructures digitales
                    </label>
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="devOps"
                      name="devOps"
                      checked={formData.services.devOps}
                      onChange={handleCheckboxChange}
                      className="mt-1 w-4 h-4"
                    />
                    <label
                      htmlFor="devOps"
                      className="text-left text-lg text-[#0C1844] "
                    >
                      DevOps & automatisation des systèmes
                    </label>
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="developpementWeb"
                      name="developpementWeb"
                      checked={formData.services.developpementWeb}
                      onChange={handleCheckboxChange}
                      className="mt-1 w-4 h-4"
                    />
                    <label
                      htmlFor="developpementWeb"
                      className="text-left text-lg text-[#0C1844] "
                    >
                      Développement web & mobile
                    </label>
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="solutionsDigitales"
                      name="solutionsDigitales"
                      checked={formData.services.solutionsDigitales}
                      onChange={handleCheckboxChange}
                      className="mt-1 w-4 h-4"
                    />
                    <label
                      htmlFor="solutionsDigitales"
                      className="text-left text-lg text-[#0C1844] "
                    >
                      Solutions digitales pour l'exportation & la présentation
                      des produits algériens
                    </label>
                  </div>
                </div>
              </div>

              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Détails"
                className="w-full p-3 bg-[#D3D6DE] rounded text-lg text-[#0C1844] font-medium min-h-[200px] resize-y"
              />

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-[#C80036E5] text-white text-lg py-2 px-4 rounded "
                >
                  Envoyer
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
