"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { Search } from "lucide-react";

const Blog = () => {
  const [activeTab, setActiveTab] = useState("Tous");
  const [isMobile, setIsMobile] = useState(false);
  const kleerSectionRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");

  const handleScrollDown = () => {
    kleerSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const tabItems = [
    { value: "Tous", label: "Tous" },
    { value: "Technologie", label: "Technologie" },
    { value: "Exportation", label: "Exportation" },
    { value: "Commerce", label: "Commerce international" },
  ];

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <section
        className="w-full flex items-center justify-center h-[600px] text-center px-10 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/heroimage.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#1E3CAA3B]/80 z-10"></div>

        <div className="flex w-full max-w-7xl items-center justify-between rounded-xl p-6 relative z-20">
          <div className="w-2/3 flex flex-col items-center justify-center space-y-20">
            <div className="flex flex-col items-center justify-center space-y-5">
              <h1 className="text-white text-5xl font-bold">
                Toutes les articles de Kleer Infini
              </h1>
              <p className="text-white text-2xl">
                Explorez notre sélection d'articles sur le commerce
                international
              </p>
            </div>
            <Button
              onClick={handleScrollDown}
              className="h-12 px-8 py-4 bg-[#1E3CAABF] hover:bg-[#1E3CAABF] rounded-lg"
            >
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

      <section ref={kleerSectionRef} className="w-full mt-10 mb-20">
        <div className="w-full max-w-[850px] mx-auto mb-4 sm:mb-6 px-4 sm:px-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 sm:py-3 pl-10 sm:pl-14 pr-4 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-lg"
            />
            <Search className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-gray-700 h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {isMobile ? (
            <div className="px-4 mb-6">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full p-3 border-2 rounded-full border-[#0C1844] text-[#0C1844] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {tabItems.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-2 sm:px-5 py-2 mb-4 sm:mb-6 overflow-x-auto">
              {tabItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setActiveTab(item.value)}
                  className={`relative py-2 sm:py-3 px-4 sm:px-8 text-sm sm:text-base font-medium rounded-full border-2 transition-colors whitespace-nowrap ${
                    activeTab === item.value
                      ? "bg-[#C80036] text-white border-[#C80036]"
                      : "bg-white text-[#0C1844] border-[#0C1844] "
                  }`}
                  style={{
                    minWidth:
                      item.value === "Tous" && !isMobile ? "180px" : "auto",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-0">
            <div className="border border-blue-200 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Bitcoin image"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="border border-blue-200 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Smartphone image"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="hidden">
            {tabItems.map((item) => (
              <TabsContent
                key={item.value}
                value={item.value}
                className="px-8 py-6 text-white bg-[#0C1844] text-center flex flex-col gap-10"
              >
                {/* Contenu préservé mais caché */}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </section>
    </div>
  );
};

export default Blog;
