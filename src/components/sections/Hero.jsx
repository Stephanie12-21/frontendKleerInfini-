import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <div
      className="w-full flex items-center justify-center h-[600px] text-center px-10 bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/heroimage.jpg')",
      }}
    >
      {/* Overlay semi-transparent */}
      <div className="absolute inset-0 bg-[#1E3CAA3B]/80 z-10"></div>

      <div className="flex w-full max-w-7xl items-center justify-between rounded-xl p-6 relative z-20">
        {/* Partie gauche : Texte */}
        <div className="w-2/3 flex flex-col items-center justify-center space-y-20">
          <div className="flex flex-col items-center justify-center space-y-5">
            <h1 className="text-white text-5xl font-bold">
              A PROPOS DE KLEER INFINI
            </h1>
            <p className="text-white text-2xl">Découvrez notre historique</p>
          </div>
          <Button className="h-12 px-8 py-4 bg-[#1E3CAABF] hover:bg-[#1E3CAABF] rounded-lg">
            EN SAVOIR PLUS
          </Button>
        </div>

        {/* Partie droite : Bouton avec icône */}
        <div className="w-1/6 flex items-center justify-center">
          <Button className="bg-[#C80036] hover:bg-[#C80036] text-white font-extrabold rounded-md w-16 h-16 p-0">
            <Image src="/icone.png" alt="play" width={25} height={25} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
