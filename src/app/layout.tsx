import type { Metadata } from "next";
import "./globals.css";
import { AppStateProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "PlacementForge | Placement Prep Navigation for Zero-Skill Students",
  description: "Every platform dumps 500 MCQs. PlacementForge acts as the empathetic navigation layer for college students starting with ZERO skills. Master logic, core tech, and articulation with Gemini 2.5 Flash.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen selection:bg-indigo-600 selection:text-white">
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
