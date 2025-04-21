"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Head from "next/head";
import { Input } from "@/components/ui/input";

// Exemple de sécurité (à remplacer par ton vrai système d'authentification)
const mockUser = {
  isLoggedIn: true,
  role: "admin", // Change pour tester : "user" ou "guest"
};

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    if (!mockUser.isLoggedIn || mockUser.role !== "admin") {
      router.push("/auth");
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Admin - Paramètres du Compte</title>
      </Head>

      <div className="mx-auto p-6 rounded-lg">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-[#0C1844] font-medium"
              >
                Nom
              </label>
              <Input
                id="name"
                defaultValue="MAHLEB Kenza"
                className="w-full p-3 h-13 bg-[#D3D6DE] rounded-md text-lg text-[#0C1844]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-[#0C1844] font-medium"
              >
                Téléphone
              </label>
              <Input
                id="phone"
                defaultValue="06 65 78 90 22"
                className="w-full p-3 h-13 bg-[#D3D6DE] rounded-md text-lg text-[#0C1844]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-[#0C1844] font-medium"
              >
                Email
              </label>
              <Input
                id="email"
                defaultValue="kenzakenza1@gmail.com"
                className="w-full p-3 h-13 bg-[#D3D6DE] rounded-md text-lg text-[#0C1844]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-[#0C1844] font-medium"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                defaultValue="1234"
                className="w-full p-3 h-13 bg-[#D3D6DE] rounded-md text-lg text-[#0C1844]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
