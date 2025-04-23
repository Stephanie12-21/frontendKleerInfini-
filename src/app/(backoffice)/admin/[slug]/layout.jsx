"use client";

import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  MessageCircleMore,
  Newspaper,
  Settings,
  UserCircle,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { data: session, status } = useSession();
  const { slug } = useParams();
  
  if (!slug) {
    return <div>Chargement...</div>;
  }

  const [nom] = slug.split("-");

  if (!nom) {
    return <div>Erreur : données du slug invalides</div>;
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/auth");
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setPhone(session.user.phone || "");
    }
  }, [session, status]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-red-600">
          Une connexion est requise pour accéder à cette page.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
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
            <SidebarLink
              href={`/admin/${slug}/profile/${session?.user.id}`}
              label="PROFILE"
              icon={<UserCircle className="h-10 w-10" />}
              active={isActive(`/admin/${slug}/profile/${session?.user?.id}`)}
            />
            <SidebarLink
              href={`/admin/${slug}/notifications/`}
              label="NOTIFICATIONS"
              icon={<Bell className="h-10 w-10" />}
              active={isActive(`/admin/${slug}/notifications/`)}
            />
            <SidebarLink
              href={`/admin/${slug}/blog/`}
              label="BLOG & ARTICLES"
              icon={<Newspaper className="h-10 w-10" />}
              active={isActive(`/admin/${slug}/blog/`)}
            />
            <SidebarLink
              href={`/admin/${slug}/chat/`}
              label="CHAT KLEER INFINI"
              icon={<MessageCircleMore className="h-10 w-10" />}
              active={isActive(`/admin/${slug}/chat/`)}
            />
            <SidebarLink
              href={`/admin/${slug}/parameters/${session?.user.id}`}
              label="PARAMETRES"
              icon={<Settings className="h-10 w-10" />}
              active={isActive(
                `/admin/${slug}/paramaters/${session?.user?.id}`
              )}
            />
            <button>
              <span className="text-lg font-bold text-[#0C1844]">
                <Link href="/auth" onClick={handleSignOut}>
                  Se déconnecter
                </Link>
              </span>
            </button>
          </nav>
        </div>
        <main className="flex-1 p-8">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

function SidebarLink({ href, icon, label, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-2 rounded-md ${
        active ? "text-[#C80036]" : "text-[#0C1844]"
      }`}
    >
      {icon}
      <span className="text-lg font-bold">{label}</span>
    </Link>
  );
}
