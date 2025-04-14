import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const Temoignages = () => {
  return (
    <div
      className="w-full flex items-center justify-center  h-screen text-center px-10 bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/temImage.jfif')",
      }}
    >
      <div className="flex w-full max-w-7xl items-center justify-between rounded-xl p-6 relative z-20">
        <div className="w-2/3 flex flex-col items-center justify-center space-y-20">
          <div className="flex flex-col items-center justify-center space-y-5">
            <h1 className="text-white text-5xl font-bold">NOS REALISATIONS</h1>
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
                  Grâce à KLEER INFINI, nous avons pu développer notre marché à
                  l'international avec succès. Leur expertise en logistique,
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
    </div>
  );
};

export default Temoignages;
