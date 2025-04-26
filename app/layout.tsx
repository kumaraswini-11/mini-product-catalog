import type {Metadata} from "next";
import {Geist, Geist_Mono, Inter} from "next/font/google";

import Footer from "@/components/footer";
import {Header} from "@/components/header/header";
import {ThemeProvider} from "@/components/theme-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({variable: "--font-inter", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "ShopCatalog - Modern Product Catalog",
  description: "A modern product catalog built with Next.js 15 and the FakeStore API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 px-4">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
