"use client";

import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { RadarScores } from "@/types";

interface ReadinessRadarProps {
  currentScores: RadarScores;
  targetBenchmark: RadarScores;
  targetName?: string;
}

export function ReadinessRadar({
  currentScores,
  targetBenchmark,
  targetName = "Target Benchmark",
}: ReadinessRadarProps) {
  const chartData = [
    {
      subject: "Aptitude & Logic",
      current: currentScores.logicAptitude,
      target: targetBenchmark.logicAptitude,
      fullMark: 100,
    },
    {
      subject: "Core CS Concepts",
      current: currentScores.coreTech,
      target: targetBenchmark.coreTech,
      fullMark: 100,
    },
    {
      subject: "Target Role Tech",
      current: currentScores.problemSolving,
      target: targetBenchmark.problemSolving,
      fullMark: 100,
    },
    {
      subject: "Articulation & HR",
      current: currentScores.articulation,
      target: targetBenchmark.articulation,
      fullMark: 100,
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const subject = payload[0]?.payload?.subject;
      const current = payload[0]?.value;
      const target = payload[1]?.value;
      const delta = target - current;

      return (
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xl text-xs space-y-1.5 min-w-[180px]">
          <p className="font-bold text-slate-800 border-b border-slate-100 pb-1">{subject}</p>
          <div className="flex items-center justify-between text-emerald-700">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Current Skill:
            </span>
            <span className="font-bold">{current}%</span>
          </div>
          <div className="flex items-center justify-between text-indigo-700">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              Target Requirement:
            </span>
            <span className="font-bold">{target}%</span>
          </div>
          <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Remaining Gap:</span>
            <span className={delta > 0 ? "text-amber-600 font-semibold" : "text-emerald-600 font-semibold"}>
              {delta > 0 ? `+${delta}% to target` : "Target Cleared! 🎉"}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center relative">
      <ResponsiveContainer width="100%" height={320}>
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#334155", fontSize: 11, fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={45}
            domain={[0, 100]}
            tick={{ fill: "#64748b", fontSize: 10 }}
            stroke="#cbd5e1"
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Target Benchmark overlay (dashed line) */}
          <Radar
            name={targetName}
            dataKey="target"
            stroke="#6366f1"
            strokeWidth={2}
            strokeDasharray="4 4"
            fill="#6366f1"
            fillOpacity={0.1}
          />

          {/* Current Student Skill (emerald fill) */}
          <Radar
            name="Your Current Skills"
            dataKey="current"
            stroke="#059669"
            strokeWidth={2.5}
            fill="#10b981"
            fillOpacity={0.35}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Legend below */}
      <div className="flex items-center gap-5 mt-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs"></span>
          <span className="text-slate-700 font-semibold">Your Readiness</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 rounded bg-indigo-500"></span>
          <span className="text-slate-500 font-medium">{targetName}</span>
        </div>
      </div>
    </div>
  );
}
