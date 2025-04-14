"use client";
import Link from "next/link";
import { Search, ChevronDown, Menu, MenuIcon } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

export default function Header() {
  const [language, setLanguage] = useState("fr");

  const handleChange = (e) => {
    e.preventDefault();
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
  };
  return (
    <header
      className="w-full justify-between "
      style={{
        background:
          "linear-gradient(90deg, #0C1844 0%, #182F86 50%, #1E3CAA 100%)",
      }}
    >
      <div className="relative">
        {/* top header avec logo + langue + recherche */}
        <div className="flex justify-between items-center pl-8 pr-4">
          {/* Logo */}

          <div>
            <Link href="/" className=" relative left-0  flex items-start">
              <Image
                src="/logo.png"
                alt="Logo"
                width={50}
                height={50}
                className="h-14 w-auto"
              />
            </Link>
          </div>

          {/* Langue + recherche */}
          <div className="flex items-center space-x-4">
            {/* Sélecteur de langue */}
            <div className="relative">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="unite" className="w-36">
                  <SelectValue placeholder="Langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Recherche"
                className="pl-10 pr-4 py-2 w-64 border-2 border-primary/20 transition-colors bg-white"
              />
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="relative flex items-center justify-center h-20 px-4">
          {/* Logo */}
          <div className="absolute flex-col items-center justify-center left-10 ">
            <Link
              href="/"
              className="flex flex-col items-center justify-center"
            >
              <span className="text-white text-xl font-medium">KLEER</span>
              <span className="text-white text-xs font-medium"> INFINI</span>
            </Link>
          </div>

          {/* Navbar items (centré au milieu du header) */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-10">
            <Link
              href="/accueil"
              className=" text-white hover:text-[#C80036] font-medium text-base uppercase"
            >
              ACCUEIL
            </Link>
            <Link
              href="/a-propos"
              className=" text-white hover:text-[#C80036] font-medium text-base uppercase"
            >
              A PROPOS
            </Link>
            <Link
              href="/nos-services"
              className=" text-white hover:text-[#C80036] font-medium text-base uppercase"
            >
              NOS SERVICES
            </Link>
            <Link
              href="/contact"
              className=" text-white hover:text-[#C80036]font-medium text-base uppercase"
            >
              CONTACT
            </Link>
          </nav>

          {/* Menu button (à droite) */}
          <div className="ml-auto">
            <Button className="flex items-center bg-[#C80036] text-white rounded-md h-9 px-4 py-2  text-base hover:bg-[#C80036]">
              <MenuIcon className="w-5 h-5 mr-2" />
              <span>Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
