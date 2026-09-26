"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Award,
  Zap,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Compass,
  Calendar,
  ChevronRight,
  UserCheck,
  Bot,
  Code2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ReadinessRadar } from "@/components/charts/ReadinessRadar";
import { VelocityProgression } from "@/components/charts/VelocityProgression";
import { ROADMAP_14_DAYS } from "@/data/roadmapData";

export default function DashboardPage() {
  const {
    user,
    baselineStats,
    radarScores,
    targetBenchmark,
    blindspots,
    activeDay,
    completedDays,
  } = useApp();

  const roleName = user.targetRole ? user.targetRole.replace("_", " ").toUpperCase() : "FULLSTACK";

  const targetTierLabel =
    user.targetCompany === "mass_service"
      ? "Mass Service (TCS, CTS, Infosys)"
      : "Tier-1 Product / Startups";

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Welcome Banner with Fast Sprint CTA */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-50 via-white to-emerald-50 border border-slate-200 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <Zap className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                <span>Personal Velocity Engine: +{baselineStats.weeklyVelocity}% This Week</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold uppercase">
                Track: {roleName}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Placement <span className="text-indigo-600">Forge</span> Command Center
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Tracking personal learning velocity and skill delta. Your profile is tailored for{" "}
              <strong className="text-emerald-700 font-bold">{roleName}</strong> in{" "}
              <strong className="text-indigo-700 font-bold">{targetTierLabel}</strong>.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href={`/dashboard/practice/${activeDay}`}
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>Continue Day {activeDay} Sprint</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* QUICK ACCESS HUB: 4 CORE ACTION LAUNCHPADS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Hub 1: Today's Recommended Sprint */}
        <Link
          href={`/dashboard/practice/${activeDay}`}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/60 hover:shadow-md transition-all group flex items-center justify-between shadow-xs"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-emerald-500 text-emerald-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                Today&apos;s Recommended Sprint
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1">
                Day {activeDay}: {ROADMAP_14_DAYS[activeDay - 1]?.title || "Mental Models & Flow"}
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
        </Link>

        {/* Hub 2: Dedicated DSA Problem Track */}
        <Link
          href="/dashboard/roadmap"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500/60 hover:shadow-md transition-all group flex items-center justify-between shadow-xs"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                Dedicated DSA Problem Track
              </div>
              <p className="text-[11px] text-slate-500">Visual Zero-Gatekeeping</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
        </Link>

        {/* Hub 3: Enter Mock Interview Room */}
        <Link
          href="/dashboard/mock-interview"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/60 hover:shadow-md transition-all group flex items-center justify-between shadow-xs"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700">
                Enter Mock Interview Room
              </div>
              <p className="text-[11px] text-slate-500">Adaptive Safe Recovery</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
        </Link>

        {/* Hub 4: Ask Placement Mentor AI */}
        <Link
          href="/dashboard/chat"
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-violet-500/60 hover:shadow-md transition-all group flex items-center justify-between shadow-xs"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-600 group-hover:scale-105 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-violet-700">
                Ask Placement Mentor AI
              </div>
              <p className="text-[11px] text-slate-500">ForgeBot 24/7 Advisor</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
        </Link>
      </div>

      {/* TOP 3 CRITICAL METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Metric 1: Starting Baseline */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span>Starting Baseline</span>
              {baselineStats.day0Score && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                  Day-0 Validated
                </span>
              )}
            </span>
            <div className="text-3xl font-black text-slate-900 mt-1">
              {baselineStats.startingScore}%
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Transferable entry foundation
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-lg">
            0-1
          </div>
        </div>

        {/* Metric 2: Current Readiness Score */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Current Readiness
            </span>
            <div className="text-3xl font-black text-slate-900 mt-1 flex items-baseline gap-2">
              <span>{baselineStats.currentScore}%</span>
              <span className="text-xs font-bold text-emerald-700">
                (+{baselineStats.currentScore - baselineStats.startingScore}% delta)
              </span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">
              Dynamic multi-skill index
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3: Personal Velocity */}
        <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" /> Personal Velocity
            </span>
            <div className="text-3xl font-black text-emerald-700 mt-1">
              +{baselineStats.weeklyVelocity}%
            </div>
            <p className="text-[11px] text-slate-600 mt-1 font-medium">
              Accelerating learning trajectory
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* CORE 2-COLUMN SECTION: READINESS RADAR & ROLE-SPECIFIC BLINDSPOTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Visual Readiness Radar (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-indigo-600" />
                  <span>Readiness Radar ({roleName} Track)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Visualizing multi-dimensional skills against target role benchmarks
                </p>
              </div>

              {/* Target Company Match Badge */}
              <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-right">
                <span className="text-[10px] text-slate-500 block uppercase font-medium">Target Match</span>
                <span className="font-black text-emerald-700 text-sm">
                  {baselineStats.targetMatch}%
                </span>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="py-2">
              <ReadinessRadar
                currentScores={radarScores}
                targetBenchmark={targetBenchmark}
                targetName={`${roleName} Benchmark`}
              />
            </div>
          </div>

          {/* Radar axis breakdowns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-slate-100 mt-4">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-[10px] text-slate-500 font-semibold">Aptitude &amp; Logic</div>
              <div className="text-sm font-bold text-emerald-700 mt-0.5">{radarScores.logicAptitude}%</div>
              <div className="text-[9px] text-slate-500">Target: {targetBenchmark.logicAptitude}%</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-[10px] text-slate-500 font-semibold">Core CS Concepts</div>
              <div className="text-sm font-bold text-emerald-700 mt-0.5">{radarScores.coreTech}%</div>
              <div className="text-[9px] text-slate-500">Target: {targetBenchmark.coreTech}%</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-[10px] text-slate-500 font-semibold">Target Role Tech</div>
              <div className="text-sm font-bold text-emerald-700 mt-0.5">{radarScores.problemSolving}%</div>
              <div className="text-[9px] text-slate-500">Target: {targetBenchmark.problemSolving}%</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-[10px] text-slate-500 font-semibold">Articulation &amp; HR</div>
              <div className="text-sm font-bold text-emerald-700 mt-0.5">{radarScores.articulation}%</div>
              <div className="text-[9px] text-slate-500">Target: {targetBenchmark.articulation}%</div>
            </div>
          </div>
        </div>

        {/* Right Column: Role-Specific Blindspots & Velocity Engine (5 cols) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          {/* Velocity Progression bar */}
          <VelocityProgression
            startingScore={baselineStats.startingScore}
            currentScore={baselineStats.currentScore}
            weeklyVelocity={baselineStats.weeklyVelocity}
            targetMatch={baselineStats.targetMatch}
            targetTierLabel={`${roleName} - ${targetTierLabel}`}
          />

          {/* Role-Specific Blindspots */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Role-Specific Blindspots ({roleName})
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                Top Priority Focus
              </span>
            </div>

            <div className="space-y-3">
              {blindspots.slice(0, 2).map((b) => (
                <div
                  key={b.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    b.status === "resolved"
                      ? "bg-slate-50 border-slate-200 opacity-75"
                      : "bg-amber-50/50 border-amber-200 hover:border-amber-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      {b.status === "resolved" ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      )}
                      {b.title}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        b.status === "resolved"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {b.status === "resolved" ? "Resolved" : `${b.impact} Impact`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {b.recommendation}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">Category: {b.category}</span>
                    <Link
                      href={`/dashboard/practice/${b.targetDayId}`}
                      className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                    >
                      <span>Fix in Day {b.targetDayId}</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ROADMAP PROGRESS & SPRINT STATUS */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              14-Day Sprint Path Status
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Targeting: {roleName} ({targetTierLabel}) • {completedDays.length} of 14 Sprints Cleared
            </p>
          </div>
          <Link
            href="/dashboard/roadmap"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>View Full 14-Day &amp; DSA Tracks</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 14 Day Dots Bar */}
        <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 pt-2">
          {ROADMAP_14_DAYS.map((day) => {
            const isCompleted = completedDays.includes(day.id);
            const isActive = day.id === activeDay;

            return (
              <Link
                key={day.id}
                href={`/dashboard/practice/${day.id}`}
                className={`p-2.5 rounded-xl border text-center transition-all group ${
                  isCompleted
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold"
                    : isActive
                    ? "bg-indigo-600 border-indigo-600 text-white font-bold shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <div className="text-[10px] font-bold">D{day.dayNumber}</div>
                <div className="text-[11px] mt-1 flex justify-center">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : isActive ? (
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
