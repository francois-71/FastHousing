import type { Metadata } from "next";
import "../global.css";
import Header from "@/components/ui/Header";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const myFont = localFont({
  src: "../../public/fonts/Inter-3.19/InterDesktop/Inter-V.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to DFHousing",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" className={myFont.className}>
        <body>
          <Header session={session}/>
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
