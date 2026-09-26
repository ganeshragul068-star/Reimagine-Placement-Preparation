"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Compass,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Brain,
  Layers,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function HomePage() {
  const router = useRouter();
  const { loginAsGuest } = useApp();

  const handleInstantDemo = (target: "mass_service" | "product_tier1") => {
    loginAsGuest("Demo Candidate", target, "beginner");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden flex flex-col justify-between">
      {/* Navigation */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/25">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight text-slate-900">Placement<span className="text-indigo-600">Forge</span></span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">The Zero-to-Offer Placement OS</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Sign In / Onboard
          </Link>
          <Link
            href="/dashboard"
            className="text-xs font-bold px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all"
          >
            Open Dashboard
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16 flex-1 flex flex-col items-center text-center">
        {/* Anti-gatekeeping badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-8 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>No 500-MCQ Dumps. Zero Gatekeeping. Pure Velocity.</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 max-w-4xl leading-[1.15]">
          Placement Prep Built for Students Starting with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-600">
            Zero Skills
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
          Most platforms assume you already know what to do and dump hundreds of questions.
          <strong className="text-slate-900 font-bold"> PlacementForge</strong> acts as your empathetic GPS: calibrated diagnostics, noise-filtered 14-day sprints, vernacular mental models, and real-time Gemini evaluation.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/login"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/25 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>Start 3-Minute Diagnostic Calibration</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => handleInstantDemo("mass_service")}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm transition-all duration-200 shadow-xs"
          >
            <Zap className="w-4 h-4 text-emerald-600 fill-emerald-500" />
            <span>Instant Guest Demo (TCS/CTS Drive)</span>
          </button>
        </div>

        {/* 4 Critical Pillars */}
        <div className="mt-20 w-full text-left">
          <div className="text-center mb-10">
            <h2 className="text-xs uppercase tracking-widest font-black text-indigo-600">The 4 Critical Pillars</h2>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Everything a zero-background student needs to get placed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pillar 1 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-700">
                <Target className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Pillar 1</div>
              <h3 className="text-base font-bold text-slate-900 mb-2">&quot;Where do I stand?&quot;</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                3-minute baseline diagnostic and interactive Readiness Radar. We celebrate velocity delta, never discouraging zero scores.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center mb-4 text-indigo-700">
                <Layers className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">Pillar 2</div>
              <h3 className="text-base font-bold text-slate-900 mb-2">&quot;What to prepare?&quot;</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Noise-filter 14-day sprint tailored to target tiers: Mass Campus (TCS, CTS, Infosys) vs Tier-1 Startups.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-amber-300 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 text-amber-700">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Pillar 3</div>
              <h3 className="text-base font-bold text-slate-900 mb-2">&quot;How to prepare?&quot;</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                3-step micro-loop: Learn ELI5 with vernacular Tanglish toggle, practice 1 problem with progressive hints, verify checkpoint.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-violet-300 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center mb-4 text-violet-700">
                <Brain className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-violet-700 uppercase tracking-wider mb-1">Pillar 4</div>
              <h3 className="text-base font-bold text-slate-900 mb-2">&quot;What to improve?&quot;</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Continuous gap analysis powered by Gemini 2.5 Flash evaluating answers and immediately boosting your readiness velocity.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p><strong className="text-slate-900 font-bold">PlacementForge</strong> • Empathetic Placement Preparation for Zero-Skill Engineers • Powered by Next.js 15 &amp; Gemini 2.5 Flash</p>
      </footer>
    </div>
  );
}
