"use client";

import React from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Topbar } from "@/components/navigation/Topbar";
import { FloatingChatWidget } from "@/components/chat/FloatingChatWidget";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex relative">
      {/* Desktop / Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Persistent ForgeBot Floating Assistant */}
      <FloatingChatWidget />
    </div>
  );
}
