"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

export default function Header() {
  const [language, setLanguage] = useState("fr");
  const pathname = usePathname();

  const navItems = [
    { label: "ACCUEIL", href: "/" },
    { label: "A PROPOS", href: "/" },
    { label: "NOS SERVICES", href: "/services" },
    { label: "BLOG", href: "/blog" },
    { label: "CONTACT", href: "/" },
  ];

  const menuItems = [
    { name: "A propos de nous", link: "/", hasSubmenu: false },
    { name: "Nos services", link: "/services", hasSubmenu: false },
    { name: "Tous les articles", link: "/blog", hasSubmenu: false },
    { name: "Envoie-nous un message", link: "/", hasSubmenu: false },
    { name: "Contact", link: "/", hasSubmenu: false },
    { name: "Connexion", link: "/auth", hasSubmenu: false },
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
        <div className="flex justify-between items-center pl-8 pr-4 py-2">
          <Link href="/" className="flex items-start">
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="h-14 w-auto"
            />
          </Link>

          <div className="flex items-center space-x-4">
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

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Recherche"
                className="pl-10 pr-4 py-2 w-64 border-2 border-primary/20 transition-colors bg-white"
              />
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center h-20 px-4">
          <div className="absolute left-10 flex-col items-center justify-center">
            <Link
              href="/"
              className="flex flex-col items-center justify-center"
            >
              <span className="text-white text-xl font-medium">KLEER</span>
              <span className="text-white text-xs font-medium">INFINI</span>
            </Link>
          </div>

          <nav className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-10">
            {navItems.map(({ label, href }, index) => (
              <Link
                key={`${href}-${index}`}
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

          <div className="ml-auto">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="flex items-center bg-[#C80036] text-white rounded-md h-9 px-4 py-2 text-base hover:bg-[#a6002a] transition-colors">
                  <Menu className="w-5 h-5 mr-2" />
                  <span>Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="p-0 max-w-[400px] border-none"
              >
                <SheetTitle className="sr-only">Menu de navigation</SheetTitle>

                <div className="flex flex-col h-full bg-white">
                  <div className="flex justify-end p-4">
                    <SheetClose className="text-[#C80036]">
                      <X className="h-6 w-6" />
                    </SheetClose>
                  </div>

                  <div className="px-6 pb-6">
                    <div className="relative mb-6">
                      <div className="relative rounded-full border border-[#C80036] overflow-hidden">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C80036]" />
                        <Input
                          placeholder="Recherche"
                          className="border-none pl-10 py-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                    </div>

                    <nav className="flex flex-col">
                      {menuItems.map((item, index) => (
                        <div key={`${item.link}-${index}`}>
                          <Link
                            href={item.link}
                            className="flex items-center justify-between py-4 text-lg font-medium text-[#0C1844] "
                          >
                            {item.name}
                          </Link>
                          {index < menuItems.length - 1 && (
                            <div className="h-px bg-gray-200" />
                          )}
                        </div>
                      ))}
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
