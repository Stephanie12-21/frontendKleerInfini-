// import React from "react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// const Services = () => {
//   return (
//     <div className="flex flex-col items-center justify-center">
// <section
//   className="flex flex-col items-center  justify-center h-[600px] text-center px-10 bg-cover bg-center relative space-y-10"
//   style={{
//     backgroundImage: "url('/serviceImage.jfif')",
//   }}
// >
//   <div className=" max-w-7xl">
//     <h1 className="text-white text-5xl font-bold">
//       EXPORTATION & COMMERCE INTERNATIONAL
//     </h1>

//     <div className="w-full flex justify-end pt-5">
//       <Button className="bg-[#C80036] hover:bg-[#C80036] text-white font-extrabold rounded-md w-16 h-16 p-0">
//         <Image src="/icone.png" alt="play" width={35} height={35} />
//       </Button>
//     </div>
//     <div className="w-full flex justify-start pt-5">
//       <Button className="h-12 px-8 py-4 bg-[#C80036BF]/80 hover:bg-[#C80036BF] rounded-lg cursor-pointer">
//         EN SAVOIR PLUS
//       </Button>
//     </div>
//   </div>
// </section>

//       <section></section>
//     </div>
//   );
// };

// export default Services;
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
        className=" w-full flex flex-col items-center  justify-center h-[600px] text-center px-10 bg-cover bg-center relative space-y-10"
        style={{
          backgroundImage: "url('/serviceImage.jfif')",
        }}
      >
        <div className=" max-w-7xl">
          <h1 className="text-white text-5xl font-bold">
            EXPORTATION & COMMERCE INTERNATIONAL
          </h1>

          <div className="w-full flex justify-end pt-5">
            <Button className="bg-[#C80036] hover:bg-[#C80036] text-white font-extrabold rounded-md w-16 h-16 p-0">
              <Image src="/icone.png" alt="play" width={35} height={35} />
            </Button>
          </div>
          <div className="w-full flex justify-start pt-5">
            <Button className="h-12 px-8 py-4 bg-[#C80036BF]/80 hover:bg-[#C80036BF] rounded-lg cursor-pointer">
              EN SAVOIR PLUS
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full mt-3 mb-20">
        <h1 className="text-[#C80036] text-5xl font-bold">KLEER INFINI</h1>
      </section>
    </div>
  );
}
