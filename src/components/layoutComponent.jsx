"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  LogOut,
  MessageCircleMore,
  Newspaper,
  Settings,
  UserCircle,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "use-intl";

const LayoutComponent = () => {
  const locale = useLocale();
  const t = useTranslations();
  const { data: session, status } = useSession();
  const { slug } = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => pathname === path;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/auth");
  };

  if (status === "loading" || !slug) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  const [nom] = slug.split("-");

  if (!nom) {
    return <div>Erreur : données du slug invalides</div>;
  }

  return (
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
          href={`/${locale}/admin/${slug}/profile/${session?.user?.id}`}
          label={t("PROFILE")}
          icon={<UserCircle className="h-10 w-10" />}
          active={isActive(
            `/${locale}/admin/${slug}/profile/${session?.user?.id}`
          )}
        />
        <SidebarLink
          href={`/${locale}/admin/${slug}/notifications/`}
          label={t("NOTIFICATIONS")}
          icon={<Bell className="h-10 w-10" />}
          active={isActive(`/${locale}/admin/${slug}/notifications/`)}
        />
        <SidebarLink
          href={`/${locale}/admin/${slug}/blog/`}
          label={t("BLOG_ARTICLES")}
          icon={<Newspaper className="h-10 w-10" />}
          active={isActive(`/${locale}/admin/${slug}/blog/`)}
        />
        <SidebarLink
          href={`/${locale}/admin/${slug}/chat/`}
          label={t("CHAT")}
          icon={<MessageCircleMore className="h-10 w-10" />}
          active={isActive(`/${locale}/admin/${slug}/chat/`)}
        />
        <SidebarLink
          href={`/${locale}/admin/${slug}/parameters/${session?.user?.id}`}
          label={t("PARAMETERS")}
          icon={<Settings className="h-10 w-10" />}
          active={isActive(
            `/${locale}/admin/${slug}/parameters/${session?.user?.id}`
          )}
        />
        <button
          onClick={handleSignOut}
          className="mt-4 flex items-center gap-3 text-left"
        >
          <LogOut className="ml-4 h-10 w-10 text-[#0C1844]" />
          <span className="text-lg font-bold text-[#0C1844]">
            {t("LOGOUT")}
          </span>
        </button>
      </nav>
    </div>
  );
};

export default LayoutComponent;

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
