import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/context/Provider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Juego de rol",
  description: "Juego de rol",

  icons: {
    icon: {
      url: "/icon.png",
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <QueryProvider>
          <body className="grid grid-cols-5 grid-rows-12">
            <header className="col-start-1 col-end-6 row-start-1 row-end-2 flex justify-start items-center shadow-md shadow-gray-800">
              <h1 className="text-3xl font-bold text-cyan-500 pl-6">Juego de rol</h1>
            </header>
            <Navbar />
            <main className="mt-5 flex min-h-screen flex-col items-center gap-5 col-start-2 col-end-6 row-start-2 row-end-13 w-full">
              {children}
            </main>
          </body>
        </QueryProvider>
    </html>
  );
}
