"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useEffect, useState } from "react";

const History = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("MISSION");

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
    <div className="w-full mt-3 mb-20">
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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>{" "}
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Delectus.
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga
                  facere dolore quia.
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
                  nombreux emplois pour les ingénieurs informatiques algériens,
                  qui travaillent sur des projets intemationaux tout en
                  contribuant au développement du commerce.
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
                  cum!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid debitis repellendus quod quam soluta doloribus.
                </p>{" "}
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
                  blanditiis possimus est maiores doloremque deleniti cum
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
                  nombreux emplois pour les ingénieurs informatiques algériens,
                  qui travaillent sur des projets intemationaux tout en
                  contribuant au développement du commerce.
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
    </div>
  );
};

export default History;
