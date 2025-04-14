import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import History from "@/components/sections/History";
import Partenaires from "@/components/sections/Partenaires";
import Temoignages from "@/components/sections/Temoignages";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <Hero />
      <History />
      <Temoignages />
      <Partenaires />
      <Contact />
    </div>
  );
}
