import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";

import "./[locale]/globals.css";
import PreloaderWrapper from "@/components/preloader/PreloaderWrapper";

export const metadata: Metadata = {
  title: "Starthub",
  description: "",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="h-full antialiased">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className="min-h-full overflow-x-hidden">
        <NextIntlClientProvider>
          <PreloaderWrapper>
            {children}
          </PreloaderWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}