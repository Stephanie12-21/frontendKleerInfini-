import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Provider from "../context/Provider";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";

export const metadata = {
  title: "Kleernet Infini",
  description: "Kleernet Infini",
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <NextIntlClientProvider>
        <Provider>
          <body>{children}</body>
        </Provider>
      </NextIntlClientProvider>
    </html>
  );
}
