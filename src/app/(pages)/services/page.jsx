"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { SuccessModal } from "@/app/(modal)/success/page";
import { ErrorModal } from "@/app/(modal)/erreurs/page";
import { InfoModal } from "@/app/(modal)/info/page";
import { z } from "zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Label } from "@/components/ui/label";

const emailSchema = z.object({
  email: z.string().email("Adresse email invalide"),
});
const requeteServiceSchema = z.object({
  nom: z.string().min(2, "Le nom est requis."),
  email: z.string().email("Email invalide."),
  telephone: z.string().min(6, "Téléphone invalide."),
  details: z.string().min(5, "Les détails sont requis."),
  reseauSecurite: z.boolean(),
  cloudComputing: z.boolean(),
  devOps: z.boolean(),
  developpementWeb: z.boolean(),
  solutionsDigitales: z.boolean(),
});

export default function Home() {
  const [showSecondDiv, setShowSecondDiv] = useState(false);
  const [telephone, setTelephone] = useState("");
  const kleerSectionRef = useRef();
  const kleerSectionDevRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [acceptedEmails, setAcceptedEmails] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const [formData, setFormData] = useState({
    nom: "",
    email: "",

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const dataToValidateAndSend = {
      nom: formData.nom,
      email: formData.email,
      telephone: `+${telephone}`,
      details: formData.details,
      ...formData.services,
    };

    const result = requeteServiceSchema.safeParse(dataToValidateAndSend);

    console.log(result);

    if (!result.success) {
      const message = result.error.errors[0].message;
      setInfoMessage(message);

      return;
    }

    try {
      const response = await fetch("/api/requeteService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      if (response.ok) {
        setInfoMessage(
          "Votre demande a bien été envoyée  et vous recevrez une notification par email!"
        );
        setIsInfoModalOpen(true);

        setFormData({
          nom: "",
          email: "",
          telephone: "",
          details: "",
          services: {
            reseauSecurite: false,
            cloudComputing: false,
            devOps: false,
            developpementWeb: false,
            solutionsDigitales: false,
          },
        });
      } else {
        setIsErrorModalOpen(true);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setIsErrorModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    setShowSecondDiv(true);
  };

  const handleBack = () => {
    setShowSecondDiv(false);
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

  const handleScrollDown = () => {
    kleerSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollDevDown = () => {
    kleerSectionDevRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNewsletter = async () => {
    const result = emailSchema.safeParse({ email });

    if (!result.success) {
      setInfoMessage(result.error.errors[0].message);
      setIsInfoModalOpen(true);
      return;
    }

    try {
      const response = await fetch("/api/renseignerEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          acceptedEmails, // <-- ajouté ici
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccessModalOpen(true);
        setEmail("");
        setAcceptedEmails(false);
      } else if (response.status === 409) {
        setInfoMessage("Vous avez déjà soumis cette adresse email !");
        setIsInfoModalOpen(true);
        setEmail("");
      } else {
        setIsErrorModalOpen(true);
        setEmail("");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setIsErrorModalOpen(true);
    }
  };

  const services = [
    {
      icon: "/service (5).svg",
      alt: "Sécurité",
      title: "Administration réseau & sécurité informatique",
      width: 80,
      height: 80,
    },
    {
      icon: "/service (4).svg",
      alt: "Cloud",
      title: "Cloud computing & infrastructures digitales.",
      width: 80,
      height: 80,
    },
    {
      icon: "/service (3).svg",
      alt: "Développement",
      title: "Développement web & mobile",
      width: 70,
      height: 70,
    },
    {
      icon: "/service (2).svg",
      alt: "DevOps",
      title: "DevOps & automatisation des systèmes",
      width: 80,
      height: 80,
    },
  ];

  const serviceFret = [
    {
      image: "/image2.svg",
      alt: "Fret Routier",
      title: "Fret Routier",
    },
    {
      image: "/image3.jfif",
      alt: "Fret Maritime",
      title: "Fret Maritime",
    },
    {
      image: "/image4.jfif",
      alt: "Fret Aérien",
      title: "Fret Aérien",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <div
        className={`flex transition-transform duration-700 ease-in-out min-h-screen ${
          showSecondDiv ? "-translate-x-1/2" : "translate-x-0"
        }`}
        style={{ width: "200%" }}
      >
        {/* Premier écran */}
        <div className="w-1/2 flex-grow">
          <section
            className="relative flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px] text-center px-4 sm:px-6 md:px-10 bg-cover bg-center w-full py-8 md:py-10 lg:py-12"
            style={{
              backgroundImage: "url('/serviceImage.jfif')",
            }}
          >
            <div className="max-w-7xl mx-auto w-full">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                EXPORTATION & COMMERCE INTERNATIONAL
              </h1>

              <div className="w-full flex justify-end pt-3 md:pt-5">
                <button
                  onClick={handleContinue}
                  className="bg-[#C80036] hover:bg-opacity-90 text-white font-extrabold rounded-md w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 p-0 flex items-center justify-center"
                  aria-label="Continuer"
                >
                  {/* Image remplacée par un placeholder pour l'exemple */}
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 relative">
                    <img src="icone.png" alt="play" className="w-full h-full" />
                  </div>
                </button>
              </div>

              <div className="w-full flex justify-start pt-3 md:pt-5">
                <button
                  onClick={handleScrollDown}
                  className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-[#C80036] hover:bg-[#A80030] transition-colors duration-200 rounded-lg cursor-pointer text-white text-sm sm:text-base md:text-lg font-medium"
                >
                  EN SAVOIR PLUS
                </button>
              </div>
            </div>
          </section>

          <section
            ref={kleerSectionRef}
            className="w-full px-8 py-6 text-[#0C1844] flex flex-col mb-10 gap-10"
          >
            <div className="flex items-center justify-center">
              <h2 className="text-4xl font-bold my-5 text-[#C80036]">
                KLEER INFINI
              </h2>
            </div>
            <div className="w-full relative flex flex-col md:flex-row justify-between gap-20">
              {/* IMAGE : cachée sur petits écrans */}
              <div className="hidden md:block w-full md:w-2/5">
                <div className="w-full h-full relative min-h-[300px]">
                  <Image
                    src="/serviceImage.jfif"
                    alt="imageservice"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* TEXTE */}
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
          <section className="w-full mt-20 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 bg-[#0C1844] text-white flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-full max-w-7xl">
              <h1 className="text-[#C80036] text-xl sm:text-2xl md:text-3xl font-bold text-center">
                NOS SERVICES LOGISTIQUES SPÉCIALISÉS
              </h1>
            </div>

            {/* Disposition responsive - une colonne sur mobile, deux sur tablette, trois sur grand écran */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 pt-6 sm:pt-8 md:pt-10 w-full max-w-7xl">
              {serviceFret.map((service, index) => (
                <div
                  key={index}
                  className="relative w-full sm:w-[280px] md:w-[320px] lg:w-[400px] h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-lg overflow-hidden mb-6 sm:mb-0"
                >
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10 w-full h-full flex items-end justify-center px-4 sm:px-6 md:px-8 py-4">
                    <div className="relative w-full h-[60px]">
                      <div className="absolute top-0 right-0 w-full h-[45px] bg-[#C80036] rounded-sm z-0"></div>
                      <div className="absolute bottom-1 right-3 w-full bg-white rounded-sm shadow-md z-10 flex justify-between items-center px-3 sm:px-4 py-2">
                        <span className="text-[#0C1844] font-medium text-base sm:text-lg">
                          {service.title}
                        </span>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#C80036] rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* suivie et traçabilité */}
          <section className="w-full px-3 mt-20 sm:px-5 md:px-10 lg:px-20 xl:px-40">
            <div className="flex flex-col items-start justify-start px-3 sm:px-5 md:px-8 lg:px-10 my-6 sm:my-8 md:my-10 bg-[#0C1844] text-center bg-cover bg-center relative py-6 sm:py-8 md:py-10 rounded-lg">
              <div className="w-full space-y-4 sm:space-y-5 md:space-y-6">
                <h1 className="text-[#C80036] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-left">
                  SUIVI & TRAÇABILITÉ
                </h1>

                <div className="w-full bg-white rounded-sm shadow-md flex flex-col sm:flex-row justify-between items-stretch sm:items-center p-3 sm:p-4 space-y-3 sm:space-y-0 sm:space-x-4">
                  <input
                    type="text"
                    placeholder="Numéro de recherche"
                    className="flex-1 text-[#0C1844] font-medium text-sm sm:text-base md:text-lg outline-none bg-transparent px-1 py-2 sm:py-0"
                  />

                  <button className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-[#C80036E5] text-sm sm:text-base md:text-lg text-white rounded-sm transition-colors hover:bg-[#C80036]">
                    Trouver
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/*type de produits */}
          <section className="px-4 mt-20 sm:px-6 md:px-8 py-6 text-[#0C1844] text-center flex flex-col gap-10">
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-10">
              {/* Image - visible uniquement à partir de md */}
              <div className="hidden md:block w-full md:w-1/2 relative min-h-[300px] sm:min-h-[400px]">
                <div className="relative z-10 w-full h-full flex items-start justify-center px-4 py-4">
                  <div className="relative w-full h-full">
                    <div className="absolute left-3 w-full h-full bg-[#0C1844] z-0 "></div>

                    <div className="absolute top-5 right-3 w-full h-full shadow-md z-10  overflow-hidden">
                      <Image
                        src="/image5.svg"
                        alt="Fret Aérien"
                        fill
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Texte */}
              <div className="w-full md:w-1/2 text-left flex flex-col items-start justify-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 text-[#C80036]">
                  TYPE PRODUIT
                </h2>
                <div className="text-base sm:text-lg leading-relaxed text-[#0C1844] space-y-4">
                  <p>
                    Notre entreprise est spécialisée dans l&apos;exportation et
                    le commerce international de tous types de produits (y
                    compris alimentaires, cosmétiques, pharmaceutiques et
                    parapharmaceutiques), à l&apos;exception des carburants.
                  </p>
                  <p>
                    Nous garantissons des produits conformes aux normes
                    internationales et assurons une livraison rapide et
                    sécurisée grâce à notre réseau logistique performant.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* saisir l'adresse mail*/}
          <section className="w-full px-4 mt-20 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-[#0C1844] text-center flex flex-col gap-6 sm:gap-8 md:gap-10">
            <div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-6 sm:gap-8 md:gap-10">
              <div className="hidden md:block w-full md:w-1/2 relative min-h-[250px] lg:min-h-[300px] xl:min-h-[400px]">
                <div className="relative z-10 w-full h-full flex items-start justify-center px-3 sm:px-4 py-3 sm:py-4">
                  <div className="relative w-full h-full">
                    <div className="absolute left-2 sm:left-3 w-full h-full bg-[#0C1844] z-0"></div>

                    <div className="absolute top-4 sm:top-5 right-2 sm:right-3 w-full h-full shadow-md z-10">
                      <Image
                        src="/image7.jfif"
                        alt="Fret Aérien"
                        fill
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulaire */}
              <div className="w-full md:w-1/2 text-left flex flex-col items-start justify-center pr-0 sm:pr-4 md:pr-6 lg:pr-16 xl:pr-32">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-5 md:mb-6 text-[#C80036]">
                  Merci de renseigner votre adresse e-mail
                </h2>
                <div className="text-sm sm:text-base md:text-lg leading-relaxed text-[#0C1844] mt-3 sm:mt-4 md:mt-5 space-y-4 sm:space-y-5 md:space-y-6 w-full">
                  <Input
                    className="w-full"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse e-mail professionnelle"
                  />
                  <div className="flex items-start sm:items-center space-x-2 sm:space-x-3">
                    <input
                      type="checkbox"
                      id="acceptEmails"
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#C80036] accent-[#C80036] rounded-sm mt-1 sm:mt-0"
                      checked={acceptedEmails}
                      onChange={(e) => setAcceptedEmails(e.target.checked)}
                    />
                    <label
                      htmlFor="acceptEmails"
                      className="text-sm sm:text-base md:text-lg text-[#0C1844]"
                    >
                      J&apos;accepte de recevoir des e-mails promotionnels et
                      des informations de la part de Kleer Infini
                    </label>
                  </div>
                  <button
                    onClick={handleNewsletter}
                    className="px-3 sm:px-4 py-2 w-full  bg-[#0C1844] text-sm sm:text-base md:text-lg text-white rounded-sm hover:bg-opacity-90 transition-colors"
                  >
                    Continuer
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* liste des documents */}
          <section className="w-full py-8 mt-20 sm:py-12 md:py-16 text-[#0C1844] text-center flex flex-col px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3 text-[#C80036]">
              LISTE DES DOCUMENTS
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#C80036] mb-6 sm:mb-8 md:mb-10">
              Nécessaires pour l&apos;Exportation vers l&apos;Europe/France
            </p>

            <div className="w-full flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-6 lg:gap-10">
              {/* Image - masquée sur mobile, visible sur grands écrans */}
              <div className="hidden lg:block w-full lg:w-2/5 relative min-h-[350px]">
                <div className="relative w-full h-full">
                  <Image
                    src="/image.svg"
                    alt="Fret Aérien"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Image affichée uniquement sur mobile */}
              <div className="hidden w-full relative h-48 sm:h-64 mb-6">
                <Image
                  src="/image.svg"
                  alt="Fret Aérien"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Liste de documents */}
              <div className="w-full lg:w-3/5 text-left flex flex-col justify-center bg-white/50 p-4 sm:p-6 rounded-lg">
                <ul className="list-decimal list-inside text-base sm:text-lg text-[#0C1844] space-y-3 sm:space-y-4 md:space-y-6">
                  <li className="pl-2">Documents Commerciaux</li>
                  <li className="pl-2">Documents d&apos;Origine</li>
                  <li className="pl-2">
                    Documents Sanitaires et Phytosanitaires (pour les produits
                    alimentaires et agricoles)
                  </li>
                  <li className="pl-2">
                    Documents Spécifiques selon le Produit
                  </li>
                  <li className="pl-2">Documents de Transport et Logistique</li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center justify-center mt-6 sm:mt-8 md:mt-10">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0C1844] text-center">
                Cliquez ici pour découvrir tous les détails !
              </p>
              <button
                onClick={toggleExpand}
                className="mt-4 p-2 rounded-md border border-[#0C1844] hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#C80036]"
                aria-label="Afficher plus de détails"
              >
                <Image
                  src="/Vector.svg"
                  alt="Dossiers"
                  width={50}
                  height={50}
                />
              </button>
            </div>
          </section>

          {/* Étapes Clés */}
          <section className="w-full px-4 py-10 mb-5 bg-[#0C1844] text-white flex flex-col items-center justify-start">
            <h1 className="text-[#C80036] text-2xl sm:text-3xl md:text-4xl font-bold text-center w-full mb-6">
              Étapes Clés pour une Exportation Réussie
            </h1>

            <div className="flex flex-col items-center justify-center mt-4 max-w-screen-lg w-full px-2 sm:px-6">
              <ul className="list-disc list-inside space-y-4 sm:space-y-5 text-base sm:text-lg md:text-xl text-left w-full max-w-3xl">
                <li className="p-2 rounded hover:bg-[#162456] transition-colors">
                  Vérifier les certifications des fournisseurs
                </li>
                <li className="p-2 rounded hover:bg-[#162456] transition-colors">
                  Obtenir tous les certificats nécessaires (sanitaires,
                  phytosanitaires, d&apos;origine, etc.)
                </li>
                <li className="p-2 rounded hover:bg-[#162456] transition-colors">
                  S&apos;assurer que l&apos;étiquetage est conforme aux normes
                  européennes et préparer tous les documents commerciaux et
                  logistiques
                </li>
                <li className="p-2 rounded hover:bg-[#162456] transition-colors">
                  Vérifier la conformité avec les douanes et les réglementations
                  européennes
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* Second écran */}
        <div className="w-1/2 flex-grow">
          <section
            className="relative flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px] text-center px-4 sm:px-6 md:px-10 bg-cover bg-center w-full py-8 md:py-10 lg:py-12"
            style={{
              backgroundImage: "url('/image6.jfif')",
            }}
          >
            <div className="max-w-7xl mx-auto w-full">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                EXPORTATION DE TECHNOLOGIES & SERVICES NUMERIQUES
              </h1>
              <div className="w-full flex justify-start pt-3 md:pt-5">
                <Button
                  onClick={handleBack}
                  className="bg-[#C80036] hover:bg-opacity-90 text-white font-extrabold rounded-md w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 p-0 flex items-center justify-center"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 relative">
                    <img
                      src="/chevron.png"
                      alt="play"
                      className="w-full h-full"
                    />
                  </div>
                </Button>
              </div>
              <div className="w-full flex justify-end pt-5">
                <Button
                  onClick={handleScrollDevDown}
                  className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-[#C80036] hover:bg-[#A80030] transition-colors duration-200 rounded-lg cursor-pointer text-white text-sm sm:text-base md:text-lg font-medium"
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

              <div className="hidden md:block w-full md:w-2/5">
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
          <section className="w-full px-3 mt-20 sm:px-4 md:px-6  lg:px-8 py-10 sm:py-12 md:py-14 bg-[#0C1844] text-white flex flex-col items-center justify-center mb-10 sm:mb-14 md:mb-16 lg:mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 md:gap-16 lg:gap-20 mb-6 sm:mb-10 md:mb-12 w-full max-w-7xl">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-[#1E3CAA3B] p-4 sm:p-6 md:p-8 rounded-md flex flex-col items-center text-center h-full"
                >
                  <div className="mb-3 sm:mb-4">
                    <Image
                      src={service.icon}
                      alt={service.alt}
                      width={service.width}
                      height={service.height}
                    />
                  </div>
                  <h3 className="text-white text-lg sm:text-xl font-medium">
                    {service.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* Service 5 - Carte plus large */}
            <div className="bg-[#1E3CAA3B] p-4 sm:p-6 md:p-8 rounded-md mt-6 sm:mb-10 md:mb-12 flex flex-col items-center text-center w-full max-w-7xl">
              <div className="mb-5 sm:mb-6">
                <Image
                  src="/service (1).svg"
                  alt="Solutions digitales"
                  width={80}
                  height={80}
                />
              </div>
              <h3 className="text-white text-lg sm:text-xl font-medium">
                Solutions digitales pour l'exportation & la présentation des
                produits algériens
              </h3>
            </div>
          </section>

          {/* Services développement web et mobile */}
          <section className="py-8 sm:py-10 md:py-16 mt-20 px-4 sm:px-6 md:px-8 text-white bg-[#0C1844] text-center flex flex-col">
            {/* Section Développement Web */}
            <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-6 sm:gap-10 lg:gap-16 mb-16">
              {/* Image Web Dev - Visible uniquement sur les écrans moyens et grands */}
              <div className="hidden md:block w-full md:w-4/5 lg:w-2/5 relative min-h-[350px] md:min-h-[400px] mb-0 order-1 lg:order-1">
                <div className="w-full h-full relative">
                  <Image
                    src="/dev2.svg"
                    alt="Développement Web"
                    fill
                    className="object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* Contenu Web Dev */}
              <div className="w-full lg:w-3/5 text-left flex flex-col items-start justify-center order-1 lg:order-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-8 md:mb-10 text-[#C80036] w-full text-center lg:text-left">
                  LE DÉVELOPPEMENT WEB
                </h2>
                <div className="text-base sm:text-lg leading-relaxed space-y-4 sm:space-y-6 md:space-y-8">
                  <p>
                    Le développement web consiste à créer des sites internet et
                    applications web accessibles via un navigateur (Chrome,
                    Firefox, etc.).
                  </p>
                  <p>Il se divise en deux parties principales :</p>
                  <ul className="list-disc list-inside pl-2 sm:pl-4 space-y-3 sm:space-y-4 md:space-y-6">
                    <li className="p-2 hover:bg-[#162456] rounded transition-colors">
                      Front-end : Interface utilisateur (HTML, CSS, JavaScript,
                      React, Angular).
                    </li>
                    <li className="p-2 hover:bg-[#162456] rounded transition-colors">
                      Back-end : Logique métier, bases de données (Node.js, PHP,
                      Python, SQL).
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section Développement Mobile */}
            <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-6 sm:gap-10 lg:gap-16">
              {/* Contenu Mobile Dev */}
              <div className="w-full lg:w-3/5 text-left flex flex-col items-start justify-center order-1 lg:order-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-8 md:mb-10 text-[#C80036] w-full text-center lg:text-left">
                  LE DÉVELOPPEMENT MOBILE
                </h2>
                <div className="text-base sm:text-lg leading-relaxed space-y-4 sm:space-y-6 md:space-y-8">
                  <p>
                    Le développement mobile consiste à créer des applications
                    pour smartphones (iOS, Android) disponibles sur des stores
                    (App Store, Google Play).
                  </p>
                  <p>Deux approches existent :</p>
                  <ul className="list-disc list-inside pl-2 sm:pl-4 space-y-3 sm:space-y-4 md:space-y-6">
                    <li className="p-2 hover:bg-[#162456] rounded transition-colors">
                      Natifs : Développés spécifiquement pour un OS (Swift pour
                      iOS, Kotlin pour Android).
                    </li>
                    <li className="p-2 hover:bg-[#162456] rounded transition-colors">
                      Cross-platform : Une seule base de code pour plusieurs OS
                      (Flutter, React Native).
                    </li>
                  </ul>
                </div>
              </div>

              {/* Image Mobile Dev - Visible uniquement sur les écrans moyens et grands */}
              <div className="hidden md:block w-full md:w-4/5 lg:w-2/5 relative min-h-[350px] md:min-h-[400px] mt-0 order-1 lg:order-2">
                <div className="w-full h-full relative">
                  <Image
                    src="/dev1.svg"
                    alt="Développement Mobile"
                    fill
                    className="object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* requête de service */}
          <section className="w-full py-8 md:py-10 mt-10 text-center flex flex-col">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-3xl mx-auto flex flex-col px-4 sm:px-6 md:px-8 gap-4 sm:gap-5"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#C41E3A] mb-4 md:mb-6">
                REQUETE DE SERVICE
              </h1>

              {/* Nom complet */}
              <div className="w-full">
                <Label
                  htmlFor="nom"
                  className="block text-base sm:text-lg text-[#0C1844] font-medium mb-1 sm:mb-2 text-left"
                >
                  Nom complet
                </Label>
                <Input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Nom"
                  className="w-full p-2 sm:p-3 bg-[#D3D6DE] rounded text-base sm:text-lg text-[#0C1844] font-medium"
                  required
                />
              </div>

              {/* Email */}
              <div className="w-full">
                <Label
                  htmlFor="email"
                  className="block text-base sm:text-lg text-[#0C1844] font-medium mb-1 sm:mb-2 text-left"
                >
                  Adresse e-mail
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-2 sm:p-3 bg-[#D3D6DE] rounded text-base sm:text-lg text-[#0C1844] font-medium"
                  required
                />
              </div>

              {/* Téléphone */}
              <div className="w-full">
                <Label
                  htmlFor="telephone"
                  className="block text-base sm:text-lg text-[#0C1844] font-medium mb-1 sm:mb-2 text-left"
                >
                  Numéro de téléphone
                </Label>
                <PhoneInput
                  country="dz"
                  value={telephone}
                  required
                  onChange={setTelephone}
                  placeholder="Entrez votre numéro de téléphone"
                  inputStyle={{
                    width: "100%",
                    height: "40px",
                    color: "#0C1844D9",
                  }}
                  buttonClass="custom-flag-style"
                  inputClass="col-span-3 items-start w-full bg-[#edf2f7] h-11 text-base font-medium"
                />
              </div>

              {/* Services */}
              <div className="flex flex-col gap-8 text-left mt-2">
                <h2 className="text-base sm:text-lg text-[#0C1844] font-medium mb-2 sm:mb-4">
                  Services sollicités
                </h2>

                <div className="flex flex-col gap-6 sm:gap-6 mb-4">
                  {/* Option 1 */}
                  <div className="flex items-start gap-2 hover:bg-[#F5F5F7] p-2 rounded transition-colors">
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
                      className="text-left text-base sm:text-lg text-[#0C1844] cursor-pointer"
                    >
                      Administration réseau & sécurité informatique
                    </label>
                  </div>

                  {/* Option 2 */}
                  <div className="flex items-start gap-2 hover:bg-[#F5F5F7] p-2 rounded transition-colors">
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
                      className="text-left text-base sm:text-lg text-[#0C1844] cursor-pointer"
                    >
                      Cloud computing & infrastructures digitales
                    </label>
                  </div>

                  {/* Option 3 */}
                  <div className="flex items-start gap-2 hover:bg-[#F5F5F7] p-2 rounded transition-colors">
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
                      className="text-left text-base sm:text-lg text-[#0C1844] cursor-pointer"
                    >
                      DevOps & automatisation des systèmes
                    </label>
                  </div>

                  {/* Option 4 */}
                  <div className="flex items-start gap-2 hover:bg-[#F5F5F7] p-2 rounded transition-colors">
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
                      className="text-left text-base sm:text-lg text-[#0C1844] cursor-pointer"
                    >
                      Développement web & mobile
                    </label>
                  </div>

                  {/* Option 5 */}
                  <div className="flex items-start gap-2 hover:bg-[#F5F5F7] p-2 rounded transition-colors">
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
                      className="text-left text-base sm:text-lg text-[#0C1844] cursor-pointer"
                    >
                      Solutions digitales pour l'exportation & la présentation
                      des produits algériens
                    </label>
                  </div>
                </div>
              </div>

              {/* Détails */}
              <div className="w-full space-y-3 sm:space-y-4 md:space-y-5">
                <Label
                  htmlFor="details"
                  className="block text-base sm:text-lg text-[#0C1844] font-medium mb-1 sm:mb-2 text-left"
                >
                  Détails pertinents
                </Label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Détails"
                  className="w-full p-2 sm:p-3 bg-[#D3D6DE] rounded text-base sm:text-lg text-[#0C1844] font-medium min-h-[400px] sm:min-h-[350px] md:min-h-[300px] resize-y transition-all duration-300"
                />
              </div>

              {/* Bouton d'envoi */}
              <div className="flex justify-center w-full mt-4 sm:mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#C80036E5] hover:bg-[#A8002D] w-full  text-white cursor-pointer text-base sm:text-lg py-2 sm:py-3 px-4 rounded-md flex justify-center items-center gap-2 transition-colors shadow-md"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 sm:h-6 sm:w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  ) : (
                    <span className="flex items-center">
                      Envoyer la requête
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
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
}
