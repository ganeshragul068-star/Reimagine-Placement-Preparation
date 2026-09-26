"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Map,
  Clock,
  CheckCircle2,
  ArrowRight,
  Filter,
  Sparkles,
  Layers,
  Zap,
  Code2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import {
  ROADMAP_14_DAYS,
  ROADMAP_30_DAYS_SUMMARY,
  TARGETED_DSA_ROADMAP,
} from "@/data/roadmapData";

export default function RoadmapPage() {
  const { completedDays, activeDay, user } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<"14_day" | "dsa_track" | "30_day">("14_day");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const roleName = user.targetRole ? user.targetRole.replace("_", " ").toUpperCase() : "FULLSTACK";

  const categories = [
    "All",
    "Logic & Flow",
    "Core Tech",
    "Aptitude Intuition",
    "Problem Solving",
    "HR & Communication",
  ];

  const filteredDays = ROADMAP_14_DAYS.filter((day) => {
    if (categoryFilter === "All") return true;
    return day.category === categoryFilter;
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            <Map className="w-3.5 h-3.5 text-indigo-600" />
            <span>Pillar 2: &quot;What to Prepare?&quot; • {roleName} Track</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Noise-Filtered Placement Curriculum
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Eliminating 500-question clutter. Tailored for <strong className="text-emerald-700 font-bold">{roleName}</strong> and your chosen campus tier.
          </p>
        </div>

        {/* Track Switcher Tabs (3 Tracks) */}
        <div className="flex flex-wrap items-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shrink-0 self-start md:self-center gap-1">
          <button
            onClick={() => setSelectedPlan("14_day")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedPlan === "14_day"
                ? "bg-white text-indigo-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>14-Day Sprint</span>
          </button>

          <button
            onClick={() => setSelectedPlan("dsa_track")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedPlan === "dsa_track"
                ? "bg-white text-indigo-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Targeted Visual DSA</span>
          </button>

          <button
            onClick={() => setSelectedPlan("30_day")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedPlan === "30_day"
                ? "bg-white text-indigo-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-violet-600" />
            <span>30-Day Deep Dive</span>
          </button>
        </div>
      </div>

      {/* ================= TRACK 1: 14-DAY ROLE SPRINT ================= */}
      {selectedPlan === "14_day" && (
        <div className="space-y-6">
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-bold mr-1 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Filter Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  categoryFilter === cat
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold shadow-xs"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Timeline Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDays.map((day) => {
              const isCompleted = completedDays.includes(day.id);
              const isActive = day.id === activeDay;

              return (
                <div
                  key={day.id}
                  className={`p-5 rounded-2xl border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                    isCompleted
                      ? "bg-emerald-50/40 border-emerald-300 hover:border-emerald-400"
                      : isActive
                      ? "bg-indigo-50/50 border-indigo-400 ring-2 ring-indigo-400/20 shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-black px-2.5 py-0.5 rounded-lg uppercase ${
                            isCompleted
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : isActive
                              ? "bg-indigo-600 text-white shadow-xs"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          Day {day.dayNumber}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {day.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{day.durationMins} mins</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {day.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                      {day.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      {isCompleted ? (
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Sprint Cleared</span>
                        </span>
                      ) : isActive ? (
                        <span className="text-xs font-bold text-indigo-700 flex items-center gap-1.5 animate-pulse">
                          <Zap className="w-3.5 h-3.5 fill-indigo-600 text-indigo-600" />
                          <span>Current Active Sprint</span>
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500">Available to Study</span>
                      )}
                    </div>

                    <Link
                      href={`/dashboard/practice/${day.id}`}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs"
                          : isCompleted
                          ? "bg-white border border-slate-200 hover:bg-slate-50 text-emerald-700 font-bold"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      <span>{isCompleted ? "Review Sprint" : "Enter Sprint"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TRACK 2: TARGETED VISUAL DSA ROADMAP ================= */}
      {selectedPlan === "dsa_track" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Targeted Visual DSA Track: Zero Complex Math Gatekeeping</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              From Arrays to Trees via Physical Mental Models
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed max-w-3xl">
              No 500-question leetcode grinding. Every data structure is taught through everyday intuition (classroom benches, coat-check tokens, cafeteria trays) to ace product &amp; service technical interviews.
            </p>
          </div>

          <div className="space-y-4">
            {TARGETED_DSA_ROADMAP.map((mod) => (
              <div
                key={mod.id}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xs"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
                      {mod.stage}
                    </span>
                    <span className="text-xs font-mono text-emerald-700 font-bold">
                      {mod.complexity}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">{mod.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{mod.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800">
                      <strong className="text-indigo-700 block text-[11px] mb-0.5 font-bold">Physical Analogy:</strong>
                      {mod.visualAnalogy}
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                      <strong className="text-amber-800 block text-[11px] mb-0.5 font-bold">Mental Model Rule:</strong>
                      {mod.mentalModel}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Core Problems:</span>
                    {mod.keyProblems.map((prob, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-[11px] text-slate-700 font-medium"
                      >
                        {prob}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 self-end md:self-center">
                  <Link
                    href={`/dashboard/practice/${mod.dayShortcutId}`}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all"
                  >
                    <span>Practice Stage Concept</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TRACK 3: 30-DAY TECH DEEP DIVE ================= */}
      {selectedPlan === "30_day" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                30-Day Comprehensive Product &amp; Startup Track
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Extended roadmap adding Data Structures, Algorithm Patterns (Two-Pointer, Sliding Window, Trees), and System Design basics.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {ROADMAP_30_DAYS_SUMMARY.map((phase, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white transition-all shadow-xs"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center font-bold text-xs text-indigo-700 shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-700">{phase.day}</span>
                        <h4 className="text-sm font-bold text-slate-900">{phase.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{phase.focus}</p>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/practice/${idx * 3 + 1}`}
                    className="self-end sm:self-center text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                  >
                    Explore Module
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
