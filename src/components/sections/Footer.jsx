"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="relative bg-[#0a2680] text-white overflow-hidden py-2 sm:py-4">
      <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6 sm:gap-10 md:gap-20">
        {/* Section image avec drapeau au-dessus */}
        <div className="w-full sm:w-2/5 md:w-3/6 flex flex-col gap-y-8 md:gap-y-16">
          {/* Drapeau en haut */}
          <div className="relative w-fit h-fit left-4 sm:left-8 md:left-10 top-2 sm:top-3 md:top-5">
            <Image
              src="/drapeau.svg"
              alt="Drapeau"
              width={60}
              height={60}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain"
            />
          </div>

          {/* Image triangle - masquée sur mobile */}
          <div className="hidden sm:block w-full px-4 sm:px-0">
            <Image
              src="/imgfooter.jpg"
              alt="Triangle décoratif"
              width={300}
              height={400}
              className="max-w-full h-auto"
            />
          </div>
        </div>

        {/* Section texte */}
        <div className="w-full sm:w-3/5 md:w-4/5 text-left flex flex-col items-start justify-center px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-3 sm:mt-5">
            {t("contactezNous")}
          </h2>

          <div className="space-y-5 sm:space-y-8 md:space-y-10 w-full max-w-md mt-5 sm:mt-8 md:mt-10">
            <div className="flex items-center">
              <Image
                src="/Group.svg"
                className="mr-3 sm:mr-4 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6"
                width={24}
                height={24}
                alt="localisation"
              />
              <span className="text-base sm:text-lg font-semibold">
                Ouled Yaich,Blida,Algerie
              </span>
            </div>

            <div className="flex items-center">
              <Image
                src="/Group (1).svg"
                className="mr-3 sm:mr-4 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6"
                width={28}
                height={28}
                alt="phone"
              />
              <div className="flex flex-col">
                <Link
                  href="tel:+213654982835"
                  className="text-base sm:text-lg font-semibold hover:underline"
                >
                  +213 654 98 28 35
                </Link>
                <Link
                  href="tel:+213540836321"
                  className="text-base sm:text-lg font-semibold hover:underline"
                >
                  +213 540 83 63 21
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              <Image
                src="/Group (2).svg"
                className="mr-3 sm:mr-4 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6"
                width={28}
                height={28}
                alt="message"
              />
              <div className="flex flex-col">
                <Link
                  href="mailto:mahlebkenza1@gmail.com"
                  className="text-base sm:text-lg font-semibold hover:underline"
                >
                  mahlebkenza1@gmail.com
                </Link>
                <Link
                  href="mailto:kleernetinfini@gmail.com"
                  className="text-base sm:text-lg font-semibold hover:underline"
                >
                  kleernetinfini@gmail.com
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              <Image
                src="/Group (3).svg"
                className="mr-3 sm:mr-4 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6"
                width={28}
                height={28}
                alt="linkedin"
              />
              <Link
                href="https://www.linkedin.com/in/kenza-mahleb-9860b5"
                className="hover:underline text-base sm:text-lg font-semibold truncate"
              >
                www.linkedin.com/in/kenza-mahleb-9860b5
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-6 sm:mt-8 mb-2 text-xs sm:text-sm md:text-base text-gray-300">
        © 2025 Kleer Infini. {t("concuPar")}{" "}
        <Link
          href="https://stephanie-maminiaina.vercel.app/"
          className="text-[#C80036] hover:underline"
        >
          Stéphanie MAMINIAINA
        </Link>
      </div>
    </footer>
  );
}
