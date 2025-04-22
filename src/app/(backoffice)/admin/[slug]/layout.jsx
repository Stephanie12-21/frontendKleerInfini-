"use client";

import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  MessageCircleMore,
  Newspaper,
  UserCircle,
  adminCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Provider from "../../../context/Provider";

export default function RootLayout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();

  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen ">
      <Header />
      <div className="w-full mt-5 px-6 flex items-center gap-6">
        <Image
          src="/compteimage.svg"
          alt="Image"
          width={120}
          height={120}
          className="w-[120px] h-[120px] object-contain"
        />
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#C80036]">
          Paramètres du Compte
        </h2>
      </div>
      <div className="flex container min-h-screen mb-20 mx-auto bg-gray-100">
        <div className="w-64 bg-[#ced1da] min-h-screen p-4 flex flex-col">
          <div className="mb-8">
            <div className="bg-blue-900 rounded-lg w-36 h-36 mx-auto overflow-hidden">
              <Image
                src="/profile.png"
                alt="Photo de profil"
                width={144}
                height={144}
                className="object-cover"
              />
            </div>
          </div>

          <nav className="space-y-4">
            <Link
              href="/admin"
              className={`flex items-center gap-3 p-2 rounded-md ${
                isActive("/admin") ? "text-[#C80036]" : "text-[#0C1844]"
              }`}
            >
              <UserCircle className="h-10 w-10" />
              <span className="text-lg font-bold">PROFILE</span>
            </Link>

            <Link
              href="/admin/notifications"
              className={`flex items-center gap-3 p-2 rounded-md ${
                isActive("/admin/notifications")
                  ? "text-[#C80036]"
                  : "text-[#0C1844]"
              }`}
            >
              <Bell className="h-10 w-10" />
              <span className="text-lg font-bold">NOTIFICATIONS</span>
            </Link>

            <Link
              href="/admin/blog"
              className={`flex items-center gap-3 p-2 rounded-md ${
                isActive("/admin/blog") ? "text-[#C80036]" : "text-[#0C1844]"
              }`}
            >
              <Newspaper className="h-10 w-10" />
              <span className="text-lg font-bold">BLOG & ARTICLES</span>
            </Link>

            <Link
              href="/admin/chat"
              className={`flex items-center gap-3 p-2 rounded-md ${
                isActive("/admin/chat") ? "text-[#C80036]" : "text-[#0C1844]"
              }`}
            >
              <MessageCircleMore className="h-10 w-10" />
              <div className="flex flex-col">
                <span className="text-lg font-bold">CHAT</span>
                <span className="text-lg font-bold">KLEER INFINI</span>
              </div>
            </Link>
          </nav>
        </div>
        <main className="flex-1 p-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
