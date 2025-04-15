import { Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#0a2680] text-white overflow-hidden ">
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-20">
        {/* Section image avec drapeau au-dessus */}
        <div className="w-full md:w-3/6 flex flex-col gap-y-16">
          {/* Drapeau en haut */}
          <div className="relative w-fit h-fit left-10 top-5">
            <Image
              src="/drapeau.svg"
              alt="Drapeau"
              width={60}
              height={60}
              className=" w-16 h-16 object-contain"
            />
          </div>

          {/* Image triangle */}
          <div className=" w-full">
            <Image
              src="/imgfooter.jpg"
              alt="Triangle décoratif"
              width={300}
              height={400}
            />
          </div>
        </div>

        {/* Section texte */}
        <div className="w-full md:w-4/5 text-left flex flex-col items-start justify-center">
          <h2 className="text-4xl font-semibold mt-5">CONTACTEZ-NOUS</h2>

          <div className="space-y-10 w-full max-w-md mt-10">
            <div className="flex items-center">
              <Image
                src="/Group.svg"
                className="mr-4 flex-shrink-0"
                width={24}
                height={24}
                alt="localisation"
              />
              <span className="text-lg font-semibold">
                Ouled Yaich,Blida,Algerie
              </span>
            </div>

            <div className="flex items-center">
              <Image
                src="/Group (1).svg"
                className="mr-4 flex-shrink-0"
                width={28}
                height={28}
                alt="phone"
              />
              <div className="flex flex-col">
                <Link
                  href="tel:+213654982835"
                  className=" text-lg font-semibold hover:underline"
                >
                  +213 654 98 28 35
                </Link>
                <Link
                  href="tel:+213540836321"
                  className="text-lg font-semibold hover:underline"
                >
                  +213 540 83 63 21
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              <Image
                src="/Group (2).svg"
                className="mr-4 flex-shrink-0"
                width={28}
                height={28}
                alt="message"
              />
              <div className="flex flex-col">
                <Link
                  href="mailto:mahlebkenza1@gmail.com"
                  className=" text-lg font-semibold hover:underline"
                >
                  mahlebkenza1@gmail.com
                </Link>
                <Link
                  href="mailto:kleernetinfini@gmail.com"
                  className="text-lg font-semibold hover:underline"
                >
                  kleernetinfini@gmail.com
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              <Image
                src="/Group (3).svg"
                className="mr-4 flex-shrink-0"
                width={28}
                height={28}
                alt="linkedin"
              />
              <Link
                href="https://www.linkedin.com/in/kenza-mahleb-9860b5"
                className="hover:underline text-lg font-semibold"
              >
                www.linkedin.com/in/kenza-mahleb-9860b5 27
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mb-2 text-base text-gray-300">
        © 2025 Kleer Infini. Conçu par{" "}
        <Link
          href="https://stephanie-maminiaina.vercel.app/"
          className="text-[#C80036] hover:underline"
        >
          {" "}
          Stéphanie MAMINIAINA
        </Link>
        .
      </div>
    </footer>
  );
}
