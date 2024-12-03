import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/map.css";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: "Smart Container",
  description: "Saiba para onde o lixo vai com o projeto Smart Container",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen">{children}</body>
    </html>
  )
}
