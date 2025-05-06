import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import Provider from "@/app/context/Provider";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <div lang={locale}>
      <div>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Provider>
            <Header />
            {children}
            <Footer />
          </Provider>
        </NextIntlClientProvider>
      </div>
    </div>
  );
}
