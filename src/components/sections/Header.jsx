"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu } from "lucide-react";
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
  const pathname = usePathname();

  const navItems = [
    { label: "ACCUEIL", href: "/" },
    { label: "A PROPOS", href: "/a-propos" },
    { label: "NOS SERVICES", href: "/services" },
    { label: "BLOG", href: "/blog" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <header
      className="w-full"
      style={{
        background:
          "linear-gradient(90deg, #0C1844 0%, #182F86 50%, #1E3CAA 100%)",
      }}
    >
      <div className="relative">
        {/* Top header */}
        <div className="flex justify-between items-center pl-8 pr-4 py-2">
          {/* Logo */}
          <Link href="/" className="flex items-start">
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="h-14 w-auto"
            />
          </Link>

          {/* Langue + Recherche */}
          <div className="flex items-center space-x-4">
            {/* Select Langue */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="langue" className="w-36">
                <SelectValue placeholder="Langue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>

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
          {/* Logo centré (KLEER INFINI) */}
          <div className="absolute left-10 flex-col items-center justify-center">
            <Link
              href="/"
              className="flex flex-col items-center justify-center"
            >
              <span className="text-white text-xl font-medium">KLEER</span>
              <span className="text-white text-xs font-medium">INFINI</span>
            </Link>
          </div>

          {/* Navbar */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-10">
            {navItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`uppercase text-base font-medium transition-colors duration-200 ${
                  pathname === href
                    ? "text-[#C80036]"
                    : "text-white hover:text-[#C80036]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Bouton menu (à droite) */}
          <div className="ml-auto">
            <Button className="flex items-center bg-[#C80036] text-white rounded-md h-9 px-4 py-2 text-base hover:bg-[#a6002a] transition-colors">
              <Menu className="w-5 h-5 mr-2" />
              <span>Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
