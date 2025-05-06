"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { SuccessModal } from "../(modal)/success/page";
import { ErrorModal } from "../(modal)/erreurs/page";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("MISSION");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const kleerSectionRef = useRef();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      nom,
      prenom,
      email,
      phone: `+${phone}`,
      message,
    };

    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          "Une erreur s'est produite lors de l'envoi du message."
        );
      }

      setIsSuccessModalOpen(true);
      handleResetForm();
    } catch (error) {
      setIsErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setNom("");
    setPrenom("");
    setEmail("");
    setphone("");
    setMessage("");
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tabItems = [
    { value: "HISTORIQUE", label: "HISTORIQUE" },
    { value: "MISSION", label: "MISSION" },
    { value: "VISION", label: "VISION" },
    { value: "ATOUTS", label: "NOS ATOUTS" },
    { value: "IMPACT", label: "IMPACT ECONOMIQUE ET SOCIETAL" },
  ];

  const handleScrollDown = () => {
    kleerSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const partners = [
    {
      name: "ExportHUB",
      image: "/Group 6.png",
      width: 100,
      height: 100,
      maxWidth: "150px",
      paddingTop: "pt-6",
    },
    {
      name: "MCS Tech",
      image: "/Group 7.png",
      width: 100,
      height: 100,
      maxWidth: "150px",
      paddingTop: "pt-6",
    },
    {
      name: "ALGEX",
      image: "/Group 11.svg",
      width: 180,
      height: 180,
      maxWidth: "200px",
      paddingTop: "pt-4",
    },
    {
      name: "Alibaba",
      image: "/Group 10.png",
      width: 100,
      height: 100,
      maxWidth: "150px",
      paddingTop: "pt-6",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <section
        className="relative flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px] text-center px-4 sm:px-6 md:px-10 bg-cover bg-center w-full py-8 md:py-10 lg:py-12"
        style={{
          backgroundImage: "url('/heroimage.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#1E3CAA3B]/80 z-10"></div>
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            A PROPOS DE KLEER INFINI
          </h1>

          <div className="w-full flex justify-end pt-3 md:pt-5">
            <button
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

      <section ref={kleerSectionRef} className="w-full mt-3 mb-20">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full "
        >
          {isMobile ? (
            <div className="w-full flex justify-center px-4 mb-4">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full max-w-2xl p-3 border rounded-lg"
              >
                {tabItems.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <TabsList className="flex flex-wrap justify-center gap-4 px-5 py-2">
              {tabItems.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="relative text-[#0C1844] hover:text-[#C80036] py-2 px-4 text-base font-bold"
                >
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          )}

          {/* HISTORIQUE */}
          <TabsContent
            value="HISTORIQUE"
            className="px-8 py-6 text-white bg-[#0C1844] text-center flex flex-col gap-10"
          >
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-28">
              <div className="w-full hidden md:block md:w-3/6 relative">
                <div className="w-full h-full relative min-h-[500px]">
                  <Image
                    src="/atoutImage.svg"
                    alt="Mission"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              <div className="w-full md:w-4/5 text-left flex flex-col items-start justify-start">
                <h2 className="text-4xl font-extrabold mb-16 mt-10 text-[#C80036]">
                  HISTORIQUE DE L&apos;ENTREPRISE
                </h2>
                <div className="text-lg leading-relaxed  space-y-10">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repudiandae, ipsam!
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>{" "}
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Delectus.
                  </p>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Fuga facere dolore quia.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* MISSION */}
          <TabsContent
            value="MISSION"
            className="px-8 py-6 text-white bg-[#0C1844] p-5  text-center flex flex-col gap-10"
          >
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-28">
              <div className="w-full hidden md:block  md:w-3/6 relative">
                <div className="w-full h-full relative min-h-[500px]">
                  <Image
                    src="/missionImage.jfif"
                    alt="Mission"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              <div className="w-full md:w-4/5 text-left flex flex-col items-start justify-start">
                <h2 className="text-4xl font-extrabold mb-8 text-[#C80036]">
                  KLEER INFINI
                </h2>
                <div className="text-lg leading-relaxed  space-y-10">
                  <p>
                    Kleer Infini est une entreprise spécialisée dans
                    l'intermédiation commerciale entre les producteurs algériens
                    et les clients étrangers.{" "}
                  </p>
                  <p>
                    Nous facilitons l'exportation des produits algériens en
                    collaborant avec des fabricants et des producteurs locaux,
                    tout en veillant à respecter les standards internationaux de
                    qualité et de certification.
                  </p>{" "}
                  <p>
                    Dans ce cadre, nous travaillons exclusivement avec des
                    entreprises et des marques disposant de certifications
                    internationales reconnues, garantissant ainsi la conformité
                    des produits aux exigences des marchés étrangers.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch  justify-center gap-28">
              <div className="w-full md:w-4/5 text-left flex flex-col items-start justify-start">
                <div className="text-lg leading-relaxed text-white space-y-10">
                  <p>
                    En parallèle, nous accompagnons également les producteurs
                    algériens qui ne sont pas encore certifiés afin de leur
                    permettre d'obtenir les certifications nécessaires et ainsi
                    accéder aux opportunités d'exportation.
                  </p>
                  <p>
                    Par ailleurs, nous nous appuyons sur des solutions
                    technologiques innovantes pour valoriser les produits
                    algériens sur la scène internationale.
                  </p>{" "}
                  <p>
                    Nous préparons nos producteurs à présenter leurs produits de
                    manière professionnelle à travers des sites web et des
                    applications dédiées, renforçant ainsi leur attractivité et
                    leur compétitivité.
                  </p>{" "}
                  <p>
                    De plus, nos services numériques permettent la création de
                    nombreux emplois pour les ingénieurs informatiques
                    algériens, qui travaillent sur des projets intemationaux
                    tout en contribuant au développement du commerce.
                  </p>
                </div>
              </div>
              {/* Image : prend la même hauteur que le texte */}
              <div className="w-full hidden md:block  md:w-3/6 relative">
                <div className="w-full h-full relative min-h-[500px]">
                  <Image
                    src="/missionImage2.jfif"
                    alt="Mission"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* VISION */}
          <TabsContent
            value="VISION"
            className="px-8 py-6 text-white bg-[#0C1844] text-center flex flex-col gap-10"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-28">
              <div className="w-full md:w-4/5 text-left flex flex-col items-start justify-start">
                <h2 className="text-4xl font-extrabold mb-16 mt-10 text-[#C80036]">
                  VISION DE KLEER INFINI
                </h2>
                <div className="text-lg leading-relaxed  space-y-10">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Est, cum!
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquid debitis repellendus quod quam soluta doloribus.
                  </p>{" "}
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Odio blanditiis possimus est maiores doloremque deleniti cum
                    suscipit!
                  </p>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Explicabo esse consequatur fugiat sequi iste quod modi at
                    consectetur?
                  </p>
                </div>
              </div>
              <div className="w-full hidden md:block  md:w-3/6 relative">
                <div className="w-full h-full relative min-h-[500px]">
                  <Image
                    src="/atoutImage.svg"
                    alt="Mission"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ATOUTS */}
          <TabsContent
            value="ATOUTS"
            className="px-8 py-6 text-white bg-[#0C1844] text-center flex flex-col gap-10"
          >
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-28">
              <div className="w-full hidden md:block  md:w-3/6 relative">
                <div className="w-full h-full relative min-h-[500px]">
                  <Image
                    src="/atoutImage.svg"
                    alt="Mission"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              <div className="w-full md:w-4/5 text-left flex flex-col items-start justify-start">
                <h2 className="text-4xl font-extrabold mb-16 mt-10 text-[#C80036]">
                  NOS ATOUTS
                </h2>
                <div className="text-lg leading-relaxed  space-y-10">
                  <p>
                    Une expertise en mise en relation avec les marchés étrangers
                  </p>
                  <p>
                    Des solutions digitales innovantes pour renforcer la
                    visibilitedes produits exportés
                  </p>{" "}
                  <p>
                    Une équipe d'experts en commerce international et en
                    technologies numériques
                  </p>
                  <p>
                    Un accompagnement personnalisé pour chaque client et
                    partenaire
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* IMPACT */}
          <TabsContent
            value="IMPACT"
            className="px-8 py-6 bg-[#0C1844] text-center flex flex-col gap-10"
          >
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-28">
              <div className="w-full hidden md:block  md:w-3/6 relative">
                <div className="w-full h-full relative min-h-[500px]">
                  <Image
                    src="/missionImage.jfif"
                    alt="Mission"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              <div className="w-full md:w-4/5 text-left flex flex-col items-start justify-start">
                <h2 className="text-4xl font-extrabold mb-8 text-[#C80036]">
                  KLEER INFINI
                </h2>
                <div className="text-lg leading-relaxed text-white space-y-10">
                  <p>
                    Kleer Infini est une entreprise spécialisée dans
                    l'intermédiation commerciale entre les producteurs algériens
                    et les clients étrangers.{" "}
                  </p>
                  <p>
                    Nous facilitons l'exportation des produits algériens en
                    collaborant avec des fabricants et des producteurs locaux,
                    tout en veillant à respecter les standards internationaux de
                    qualité et de certification.
                  </p>{" "}
                  <p>
                    Dans ce cadre, nous travaillons exclusivement avec des
                    entreprises et des marques disposant de certifications
                    internationales reconnues, garantissant ainsi la conformité
                    des produits aux exigences des marchés étrangers.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row   rounded-md  gap-28">
              <div className="w-full md:w-4/5 text-left flex flex-col items-start justify-start">
                <div className="text-lg leading-relaxed text-white space-y-10">
                  <p>
                    En parallèle, nous accompagnons également les producteurs
                    algériens qui ne sont pas encore certifiés afin de leur
                    permettre d'obtenir les certifications nécessaires et ainsi
                    accéder aux opportunités d'exportation.
                  </p>
                  <p>
                    Par ailleurs, nous nous appuyons sur des solutions
                    technologiques innovantes pour valoriser les produits
                    algériens sur la scène internationale.
                  </p>{" "}
                  <p>
                    Nous préparons nos producteurs à présenter leurs produits de
                    manière professionnelle à travers des sites web et des
                    applications dédiées, renforçant ainsi leur attractivité et
                    leur compétitivité.
                  </p>{" "}
                  <p>
                    De plus, nos services numériques permettent la création de
                    nombreux emplois pour les ingénieurs informatiques
                    algériens, qui travaillent sur des projets intemationaux
                    tout en contribuant au développement du commerce.
                  </p>
                </div>
              </div>
              {/* Image : prend la même hauteur que le texte */}
              <div className="w-full hidden md:block  md:w-3/6 relative">
                <div className="w-full h-full relative min-h-[500px]">
                  <Image
                    src="/missionImage2.jfif"
                    alt="Mission"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section
        className="w-full flex items-center justify-center h-screen text-center px-4 md:px-10 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/temImage.jfif')",
        }}
      >
        <div className="flex flex-col md:flex-row w-full max-w-7xl items-center justify-between rounded-xl p-4 md:p-6 relative z-20 space-y-6 md:space-y-0">
          {/* Texte gauche */}
          <div className="w-full md:w-2/3 flex flex-col items-center justify-center space-y-10 md:space-y-20">
            <div className="flex flex-col items-center justify-center space-y-3 md:space-y-5">
              <h1 className="text-white text-3xl md:text-5xl font-bold">
                NOS REALISATIONS
              </h1>
              <p className="text-[#C80036] text-xl md:text-3xl font-bold">
                Témoignage Client
              </p>
            </div>
          </div>

          {/* Bloc témoignage droite */}
          <div className="w-full md:w-1/3 flex items-center justify-center">
            <div className="bg-white/80 rounded-[30px] md:rounded-[40px] w-full p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-start md:items-start justify-start space-y-4 md:space-y-0 md:space-x-5">
                {/* Icône */}
                <div className="w-12 md:w-1/6">
                  <Image
                    src="/message.svg"
                    alt="message"
                    width={50}
                    height={50}
                  />
                </div>

                {/* Texte du témoignage */}
                <div className="w-full md:w-5/6">
                  <p className="text-[#0C1844] text-sm md:text-base text-left">
                    Grâce à KLEER INFINI, nous avons pu développer notre marché
                    à l'international avec succès. Leur expertise en logistique,
                    conformité douanière et négociations internationales a été
                    essentielle à notre expansion.
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[#1E3CAA] text-sm md:text-base hover:underline hover:cursor-pointer">
                      Mme MAHLEB Kenza
                    </span>
                    <Image
                      src="/chevron.svg"
                      alt="chevron"
                      width={30}
                      height={30}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center px-4 py-10">
        <h1 className="text-3xl md:text-5xl text-[#C80036] mt-6 md:mt-10 font-bold text-center">
          NOS PARTENARIATS
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 mt-10 md:mt-12">
          {/* Partenaire 1 */}
          <div className="flex flex-col justify-center items-center max-w-[150px]">
            <Image
              src="/Group 6.png"
              alt="ExportHUB"
              width={100}
              height={100}
              className="object-contain"
            />
            <span className="text-[#0C1844] text-lg md:text-2xl font-bold pt-6 text-center">
              ExportHUB
            </span>
          </div>

          {/* Partenaire 2 */}
          <div className="flex flex-col justify-center items-center max-w-[150px]">
            <Image
              src="/Group 10.png"
              alt="MCS Tech"
              width={100}
              height={100}
              className="object-contain"
            />
            <span className="text-[#0C1844] text-lg md:text-2xl font-bold pt-6 text-center">
              MCS Tech
            </span>
          </div>

          {/* Partenaire 3 */}
          <div className="flex flex-col justify-center items-center max-w-[150px]">
            <div className="relative w-[100px] h-[100px]">
              <div className="absolute inset-0 rounded-full bg-[#C80036] flex items-center justify-center">
                <div className="w-3/4 h-3/4 flex items-center justify-center">
                  <Image
                    src="/algex.png"
                    alt="ALGEX"
                    width={75}
                    height={30}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Texte du partenaire exactement comme dans l'exemple */}
            <span className="text-[#0C1844] text-lg md:text-2xl font-bold pt-6 text-center">
              ExportHUB
            </span>
          </div>

          {/* Partenaire 4 */}
          <div className="flex flex-col justify-center items-center max-w-[150px]">
            <Image
              src="/Group 7.png"
              alt="Alibaba"
              width={100}
              height={100}
              className="object-contain"
            />
            <span className="text-[#0C1844] text-lg md:text-2xl font-bold pt-6 text-center">
              Alibaba
            </span>
          </div>
        </div>
      </section>

      <section className="bg-[#0C1844] mt-20 mb-16 p-6 w-full flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-stretch justify-center w-full max-w-7xl gap-8">
          {/* IMAGE */}
          <div className="hidden md:block w-full md:w-1/2 h-full">
            <div className="relative w-full h-full min-h-[500px]">
              <Image
                src="/contactimage.svg"
                alt="Contact"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          {/* FORMULAIRE */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-4xl text-white font-extrabold mb-8">
              ENVOIE-NOUS UN MESSAGE
            </h2>
            <form onSubmit={handleSendMessage} className="space-y-6 w-full">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  id="nom"
                  placeholder="Nom"
                  value={nom}
                  required
                  onChange={(e) => setNom(e.target.value)}
                  className="bg-[#edf2f7] text-[#0C1844D9] font-medium w-full"
                />
                <Input
                  id="prenom"
                  placeholder="Prénom"
                  value={prenom}
                  required
                  onChange={(e) => setPrenom(e.target.value)}
                  className="bg-[#edf2f7] text-[#0C1844D9] font-medium w-full"
                />
              </div>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#edf2f7] text-[#0C1844D9] font-medium w-full"
              />
              <PhoneInput
                country="dz"
                value={phone}
                required
                onChange={setphone}
                placeholder="Entrez votre numéro de téléphone"
                inputStyle={{
                  width: "100%",
                  height: "40px",
                  color: "#0C1844D9",
                }}
                buttonClass="custom-flag-style"
                inputClass="col-span-3 items-start w-full bg-[#edf2f7] h-11 text-base font-medium"
              />
              <div className="relative w-full">
                <textarea
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  required
                  className="w-full h-[250px] rounded-md bg-[#edf2f7] text-[#0C1844D9] font-medium p-3 pr-12"
                ></textarea>

                <button
                  type="submit"
                  disabled={loading}
                  className="absolute bottom-3 cursor-pointer right-3 bg-[#C80036] hover:bg-[#C80036] text-white font-extrabold rounded-md w-9 h-9 p-2 flex items-center justify-center"
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                    <Image src="/envoi.png" alt="play" width={20} height={20} />
                  )}
                </button>
              </div>
            </form>
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
      </section>
    </div>
  );
}
