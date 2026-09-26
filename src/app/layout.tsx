import type { Metadata } from "next";
import "./globals.css";
import { AppStateProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "Placement Forge | The Zero-to-Offer Placement Operating System",
  description: "Placement Forge is the empathetic zero-to-offer placement preparation operating system for engineering students. Master logic, core tech, reverse resumes, and AI mock interviews.",
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
