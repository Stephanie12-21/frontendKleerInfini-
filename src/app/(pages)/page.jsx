"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("MISSION");
  const [message, setMessage] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");

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

  return (
    <div className="flex flex-col items-center justify-center ">
      <section
        className="w-full flex items-center justify-center h-[600px] text-center px-10 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/heroimage.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#1E3CAA3B]/80 z-10"></div>

        <div className="flex w-full max-w-7xl items-center justify-between rounded-xl p-6 relative z-20">
          <div className="w-2/3 flex flex-col items-center justify-center space-y-20">
            <div className="flex flex-col items-center justify-center space-y-5">
              <h1 className="text-white text-5xl font-bold">
                A PROPOS DE KLEER INFINI
              </h1>
              <p className="text-white text-2xl">Découvrez notre historique</p>
            </div>
            <Button className="h-12 px-8 py-4 bg-[#1E3CAABF] hover:bg-[#1E3CAABF] rounded-lg cursor-pointer">
              EN SAVOIR PLUS
            </Button>
          </div>

          <div className="w-1/6 flex items-center justify-center">
            <Button className="bg-[#C80036] hover:bg-[#C80036] text-white font-extrabold rounded-md w-16 h-16 p-0">
              <Image src="/icone.png" alt="play" width={35} height={35} />
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full mt-3 mb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {isMobile ? (
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full p-3 mb-4 border rounded-lg"
            >
              {tabItems.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
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
              <div className="w-full md:w-3/6 relative">
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
              <div className="w-full md:w-3/6 relative">
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
              <div className="w-full md:w-3/6 relative">
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
              <div className="w-full md:w-3/6 relative">
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
              <div className="w-full md:w-3/6 relative">
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
            className="px-8 py-6 text-[#0C1844] text-center flex flex-col gap-10"
          >
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-28">
              <div className="w-full md:w-3/6 relative">
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
                <div className="text-lg leading-relaxed text-[#0C1844] space-y-10">
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

            <div className="flex flex-col md:flex-row items-stretch bg-[#0C1844] p-5 rounded-md justify-center gap-28">
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
              <div className="w-full md:w-3/6 relative">
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
        className="w-full flex items-center justify-center  h-screen text-center px-10 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/temImage.jfif')",
        }}
      >
        <div className="flex w-full max-w-7xl items-center justify-between rounded-xl p-6 relative z-20">
          <div className="w-2/3 flex flex-col items-center justify-center space-y-20">
            <div className="flex flex-col items-center justify-center space-y-5">
              <h1 className="text-white text-5xl font-bold">
                NOS REALISATIONS
              </h1>
              <p className="text-[#C80036] text-3xl font-bold">
                Témoignage Client{" "}
              </p>
            </div>
          </div>

          <div className="w-1/3 flex items-center justify-center">
            <div className="bg-white/80 rounded-[40px] w-full p-6">
              <div className="flex items-start justify-start space-x-5">
                <div className="w-1/8">
                  <Image
                    src="/message.svg"
                    alt="message"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="w-3/4">
                  <p className="text-[#0C1844] text-base text-left">
                    Grâce à KLEER INFINI, nous avons pu développer notre marché
                    à l'international avec succès. Leur expertise en logistique,
                    conformité douanière et négociations internationales a été
                    essentielle à notre expansion.
                  </p>
                  <div className="flex items-center justify-between space-x-5 mt-4">
                    <span className="text-[#1E3CAA] text-base hover:underline hover:cursor-pointer">
                      Mme MAHLEB Kenza
                    </span>
                    <Image
                      src="/chevron.svg"
                      alt="chevron"
                      width={35}
                      height={35}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-5xl text-[#C80036] mt-10 font-bold">
          NOS PARTENARIATS
        </h1>
        <div className="flex justify-center items-center gap-32 mt-12">
          <div className="flex flex-col justify-center items-center">
            <Image
              src="/Group 6.png"
              alt="partenaire"
              width={120}
              height={120}
            />
            <span className="text-[#0C1844] text-2xl font-bold pt-9">
              ExportHUB
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image
              src="/Group 7.png"
              alt="partenaire"
              width={120}
              height={120}
            />
            <span className="text-[#0C1844] text-2xl font-bold pt-9">
              MCS Tech
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image
              src="/Group 11.svg"
              alt="partenaire"
              width={240}
              height={240}
            />
            <span className="text-[#0C1844] text-2xl font-bold pt-5">
              ALGEX
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image
              src="/Group 10.png"
              alt="partenaire"
              width={120}
              height={120}
            />
            <span className="text-[#0C1844] text-2xl font-bold pt-9">
              Alibaba
            </span>
          </div>
        </div>
      </section>
      <section className="text-white bg-[#0C1844] mt-20 mb-16 p-6 w-full flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-stretch justify-center w-full max-w-7xl gap-8">
          {/* IMAGE */}
          <div className="w-full md:w-1/2 h-full">
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
            <h2 className="text-4xl font-extrabold mb-8">
              ENVOIE-NOUS UN MESSAGE
            </h2>
            <form className="space-y-6 w-full">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  id="nom"
                  placeholder="Nom"
                  value={nom}
                  required
                  onChange={(e) => setNom(e.target.value)}
                  className="bg-[#edf2f7]  font-medium w-full"
                />
                <Input
                  id="prenom"
                  placeholder="Prénom"
                  value={prenom}
                  required
                  onChange={(e) => setPrenom(e.target.value)}
                  className="bg-[#edf2f7]  font-medium w-full"
                />
              </div>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#edf2f7]  font-medium w-full"
              />
              <Input
                id="phone"
                placeholder="Téléphone"
                value={phone}
                required
                onChange={(e) => setphone(e.target.value)}
                className="bg-[#edf2f7] font-medium w-full"
              />
              <div className="relative w-full">
                <textarea
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  required
                  className="w-full h-[250px] rounded-md bg-[#edf2f7] text-[#0C1844D9]/85 font-medium p-3 pr-12"
                ></textarea>

                <button
                  type="submit"
                  className="absolute bottom-3 cursor-pointer right-3 bg-[#C80036] hover:bg-[#C80036] text-white font-extrabold rounded-md w-9 h-9 p-2 flex items-center justify-center"
                >
                  <Image src="/envoi.png" alt="play" width={20} height={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
