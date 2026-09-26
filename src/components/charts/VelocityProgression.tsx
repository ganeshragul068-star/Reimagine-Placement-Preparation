"use client";

import React from "react";
import { TrendingUp, Award, Zap, ArrowUpRight } from "lucide-react";

interface VelocityProgressionProps {
  startingScore: number;
  currentScore: number;
  weeklyVelocity: number;
  targetMatch: number;
  targetTierLabel?: string;
}

export function VelocityProgression({
  startingScore,
  currentScore,
  weeklyVelocity,
  targetMatch,
  targetTierLabel = "Mass Service (TCS/CTS)",
}: VelocityProgressionProps) {
  const delta = Math.max(0, currentScore - startingScore);
  const targetThreshold = 70; // 70% threshold for mass drive clearance

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            Velocity & Delta Engine
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Focusing on learning speed and skill delta—never discouraging zero baselines.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
          <Zap className="w-3.5 h-3.5 fill-emerald-500" />
          <span>+{weeklyVelocity}% This Week</span>
        </div>
      </div>

      {/* Progress Path */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-slate-500">Zero Baseline: <strong className="text-slate-800">{startingScore}%</strong></span>
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            Current: {currentScore}%
            {delta > 0 && <span className="text-[11px] bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-800">+{delta}% delta</span>}
          </span>
          <span className="text-indigo-600">Benchmark: <strong className="text-indigo-700">{targetThreshold}%</strong></span>
        </div>

        {/* Visual Multi-step Bar */}
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden relative p-0.5 border border-slate-200">
          {/* Target marker indicator */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-indigo-600 z-10"
            style={{ left: `${targetThreshold}%` }}
            title="Interview Shortlist Threshold (70%)"
          />
          {/* Active progress */}
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-700 ease-out shadow-xs"
            style={{ width: `${Math.min(100, Math.max(8, currentScore))}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
          <span>Starting Point</span>
          <span className="text-slate-600">Target Match: <strong className="text-emerald-700 font-bold">{targetMatch}%</strong> for {targetTierLabel}</span>
          <span className="text-indigo-600 font-semibold">Drive Clearance</span>
        </div>
      </div>

      {/* Growth Highlights Cards */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
            <ArrowUpRight className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">Skill Velocity</div>
            <div className="text-base font-black text-slate-900">+{weeklyVelocity}% / wk</div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Top 5% learning pace</div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0">
            <Award className="w-4 h-4 text-indigo-700" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">Target Tier Match</div>
            <div className="text-base font-black text-slate-900">{targetMatch}%</div>
            <div className="text-[10px] text-indigo-700 font-semibold mt-0.5">Ready for Mock Drives</div>
          </div>
        </div>
      </div>
    </div>
  );
}
