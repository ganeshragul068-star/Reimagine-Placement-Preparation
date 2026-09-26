"use client";

import React from "react";
import Link from "next/link";
import { Zap, Flame, Clock, Target, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function Topbar() {
  const { user, baselineStats, streak, totalMinutesSpent, activeDay } = useApp();

  return (
    <header className="h-16 border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between shadow-xs">
      {/* Left: Greeting & Current Active Context */}
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-slate-800">
              Welcome, {user.name}
            </h1>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {user.skillLevel === "beginner" ? "Zero Tech Foundation" : "Intermediate"}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Targeting: <span className="text-indigo-600 font-semibold">{user.targetCompany === "mass_service" ? "Mass Campus Drives (TCS, CTS, Infosys)" : "Tier-1 Product / Startups"}</span>
          </p>
        </div>
      </div>

      {/* Right: Key Micro-Metrics & CTA */}
      <div className="flex items-center gap-3">
        {/* Weekly Velocity Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs shadow-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-emerald-800 font-medium">Velocity:</span>
          <span className="font-extrabold text-emerald-700">+{baselineStats.weeklyVelocity}% this week</span>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
          <span className="font-bold text-slate-900">{streak}</span>
          <span className="text-slate-500 hidden md:inline">Day Streak</span>
        </div>

        {/* Minutes Spent */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
          <Clock className="w-4 h-4 text-indigo-600" />
          <span className="font-bold text-slate-900">{totalMinutesSpent}m</span>
          <span className="text-slate-500">invested</span>
        </div>

        {/* Quick Action Sprint Room CTA */}
        <Link
          href={`/dashboard/practice/${activeDay}`}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <span>Day {activeDay} Sprint</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  );
}
