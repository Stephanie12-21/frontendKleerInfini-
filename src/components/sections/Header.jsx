"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { useId, useState } from "react";
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
import { useLocale, useTranslations } from "next-intl";

export default function Header() {
  const id = useId();
  const t = useTranslations();
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const handleLocaleChange = (locale) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };

  const navItems = [
    { label: t("ACCUEIL"), href: `/${locale}` },
    { label: t("A-PROPOS"), href: `/${locale}#about` },
    { label: t("NOS-SERVICES"), href: `/${locale}/services` },
    { label: t("BLOG"), href: `/${locale}/blog` },
    { label: t("CONTACT"), href: `/${locale}#contact` },
  ];
  const menuItems = [
    { name: t("about"), link: `/${locale}` },
    { name: t("services"), link: `/${locale}/services` },
    { name: t("articles"), link: `/${locale}/blog` },
    { name: t("sendMessage"), link: `/${locale}#contact` },
    { name: t("contact"), link: `/${locale}#contact` },
    { name: t("login"), link: `/${locale}/auth` },
  ];

  return (
    <header
      className="w-full"
      style={{
        background:
          "linear-gradient(90deg, #0C1844 0%, #182F86 50%, #1E3CAA 100%)",
      }}
    >
      <div className="flex flex-col md:block">
        {/* --- Top bar --- */}
        <div className="hidden md:flex justify-between items-center px-8 py-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo Kleer Infini"
              width={50}
              height={50}
              className="h-14 w-auto"
            />
          </Link>

          <div className="flex items-center gap-4">
            <Select
              defaultValue={currentLocale}
              onValueChange={handleLocaleChange}
            >
              <SelectTrigger id={id} className="w-36">
                <SelectValue placeholder="Langue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t("searchPlaceholder")}
                className="pl-10 pr-4 py-2 w-64 border-2 border-primary/20 bg-white"
              />
            </div>
          </div>
        </div>

        {/* --- Main nav + menu --- */}
        <div className="flex items-center justify-between h-16 md:h-20 px-4">
          <Link href="/" className="flex flex-col items-center ml-2 md:ml-10">
            <span className="text-white text-lg md:text-xl font-medium">
              KLEER
            </span>
            <span className="text-white text-xs font-medium">INFINI</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-4 lg:space-x-10">
            {navItems.map(({ label, href }, i) => (
              <Link
                key={i}
                href={href}
                className={`uppercase text-sm lg:text-base font-medium transition-colors duration-200 ${
                  pathname === href
                    ? "text-[#C80036]"
                    : "text-white hover:text-[#C80036]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Burger menu */}
          <div className="block">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="flex items-center bg-[#C80036] text-white rounded-md h-9 px-4 py-2 text-sm md:text-base hover:bg-[#a6002a]">
                  <Menu className="w-5 h-5 md:mr-2" />
                  <span className="hidden md:inline">{t("Menu")}</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="p-0 max-w-full sm:max-w-sm border-none"
              >
                <SheetTitle className="sr-only"> {t("Menu")}</SheetTitle>

                <div className="flex flex-col h-full bg-white">
                  <div className="flex justify-end p-4">
                    <SheetClose className="text-[#C80036]">
                      <X className="h-6 w-6" />
                    </SheetClose>
                  </div>

                  <div className="px-6 pb-6">
                    {/* Search */}
                    <div className="relative mb-6">
                      <div className="relative rounded-full border border-[#C80036]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C80036]" />
                        <Input
                          placeholder={t("searchPlaceholder")}
                          className="pl-10 py-2 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                    </div>

                    {/* Language select (mobile only) */}
                    <div className="mb-6 w-full md:hidden">
                      <Select
                        defaultValue={currentLocale}
                        onValueChange={handleLocaleChange}
                      >
                        <SelectTrigger id={id} className="w-full">
                          <SelectValue placeholder="Langue" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ar">العربية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Mobile nav links */}
                    <nav className="flex flex-col">
                      {menuItems.map((item, index) => (
                        <div key={index}>
                          <Link
                            href={item.link}
                            className="flex items-center justify-between py-4 text-lg font-medium text-[#0C1844]"
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
