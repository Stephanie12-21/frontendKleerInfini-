import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Image from "next/image";

import { routing } from "@/i18n/routing";
import Provider from "@/app/context/Provider";
import LayoutComponent from "@/components/layoutComponent";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <div className="min-h-screen" lang={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Provider>
          <Header />
          <div className="flex container min-h-screen mx-auto bg-gray-100">
            <LayoutComponent />
            <main className="flex-1 p-8">{children}</main>
          </div>
          <Footer />
        </Provider>
      </NextIntlClientProvider>
    </div>
  );
}
