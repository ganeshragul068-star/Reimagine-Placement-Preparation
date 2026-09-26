"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  LayoutDashboard,
  Map,
  Code2,
  Video,
  Target,
  Sparkles,
  RotateCcw,
  FileText,
  UserCheck,
  Bot,
  ChevronRight,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export function Sidebar() {
  const pathname = usePathname();
  const { user, activeDay, completedDays, resetProgress } = useApp();

  const navItems = [
    {
      label: "Command Center",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: null,
      exact: true,
    },
    {
      label: "Resume Synthesizer",
      href: "/dashboard/resume-audit",
      icon: FileText,
      badge: "Day-0 AI",
    },
    {
      label: "14-Day & DSA Tracks",
      href: "/dashboard/roadmap",
      icon: Map,
      badge: `${completedDays.length}/14 Done`,
    },
    {
      label: "Sprint Practice Room",
      href: `/dashboard/practice/${activeDay}`,
      icon: Code2,
      badge: `Day ${activeDay}`,
    },
    {
      label: "Adaptive Mock Interview",
      href: "/dashboard/mock-interview",
      icon: UserCheck,
      badge: "Dual-Mode",
      highlight: true,
    },
    {
      label: "ForgeBot Mentor AI",
      href: "/dashboard/chat",
      icon: Bot,
      badge: "Advisor",
    },
    {
      label: "Video Masterclasses",
      href: "/dashboard/video-vault",
      icon: Video,
      badge: "Library",
    },
    {
      label: "Baseline Diagnostic",
      href: "/dashboard/diagnostic",
      icon: Compass,
      badge: "Calibrate",
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 select-none shadow-sm">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg tracking-tight text-slate-900">
                Placement<span className="text-indigo-600">Forge</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">The Zero-to-Offer OS</p>
          </div>
        </Link>

        {/* Selected Tier & Role Banner */}
        <div className="mt-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Target className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <div className="truncate">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Target Track</div>
              <div className="font-bold text-slate-800 truncate max-w-[125px]">
                {user.targetRole ? user.targetRole.replace("_", " ").toUpperCase() : "FULLSTACK"}
              </div>
            </div>
          </div>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-100 text-indigo-700 border border-indigo-200 uppercase">
            {user.targetCompany === "mass_service" ? "Service" : "Product"}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-3 space-y-1 overflow-y-auto flex-1">
        <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Core OS Modules
        </div>
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-600"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
                    isActive
                      ? "bg-white/20 text-white"
                      : item.highlight
                      ? "bg-amber-100 text-amber-800 border border-amber-300"
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* Safe Recovery Philosophy Banner */}
        <div className="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-amber-800 font-bold text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Dual-Mode AI Guarantee</span>
          </div>
          <p className="text-[10px] text-amber-900/80 leading-normal">
            Never freeze in interviews. If stuck, our agent switches from Interviewer to Empathetic Coach with corporate pivot scripts.
          </p>
        </div>
      </nav>

      {/* User Footer / Reset Demo */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50 space-y-2">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center justify-center font-bold text-xs shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">{user.name}</p>
              <p className="text-[10px] text-emerald-600 font-medium">
                {user.skillLevel === "beginner" ? "Zero Baseline Pace" : "Intermediate"}
              </p>
            </div>
          </div>
          <Link
            href="/login"
            title="Switch Goal or Demo"
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
          >
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <button
          onClick={resetProgress}
          className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-[11px] font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Demo to Zero Baseline</span>
        </button>
      </div>
    </aside>
  );
}
