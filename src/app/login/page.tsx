"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  ArrowRight,
  Sparkles,
  Building2,
  Rocket,
  Baby,
  BrainCircuit,
  Zap,
  CheckCircle,
  ShieldCheck,
  Globe,
  Server,
  BarChart3,
  CheckSquare,
  Code2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { TargetCompany, SkillLevel, TargetTechnicalRole } from "@/types";

export default function LoginPage() {
  const router = useRouter();
  const { setUserData, user } = useApp();

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [targetCompany, setTargetCompany] = useState<TargetCompany>(user.targetCompany || "mass_service");
  const [targetRole, setTargetRole] = useState<TargetTechnicalRole>(user.targetRole || "fullstack");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(user.skillLevel || "beginner");

  const handleInstantDemo = () => {
    setName("Karthik Raman");
    setEmail("karthik.campus@student.edu");
    setTargetCompany("mass_service");
    setTargetRole("fullstack");
    setSkillLevel("beginner");
    setUserData({
      name: "Karthik Raman",
      email: "karthik.campus@student.edu",
      targetCompany: "mass_service",
      targetRole: "fullstack",
      skillLevel: "beginner",
      isGuest: true,
      claimedProjects: ["Hostel Attendance Portal", "Student Marksheet Database"],
    });
    router.push("/dashboard/resume-audit");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || "Candidate";
    const finalEmail = email.trim() || "candidate@campus.edu";

    setUserData({
      name: finalName,
      email: finalEmail,
      targetCompany,
      targetRole,
      skillLevel,
      isGuest: false,
    });

    router.push("/dashboard/resume-audit");
  };

  const technicalRoles: {
    id: TargetTechnicalRole;
    title: string;
    description: string;
    icon: any;
    badge: string;
  }[] = [
    {
      id: "fullstack",
      title: "Full-Stack Web Dev",
      description: "React, APIs, database integration & UI logic",
      icon: Globe,
      badge: "High Demand",
    },
    {
      id: "backend",
      title: "Backend Engineer",
      description: "Java/Python, OOP architecture & DB indexing",
      icon: Server,
      badge: "Enterprise",
    },
    {
      id: "data_analyst",
      title: "Data Analyst / SQL",
      description: "Complex queries, window functions & dashboards",
      icon: BarChart3,
      badge: "Logic Focus",
    },
    {
      id: "qa_automation",
      title: "QA / Test Automation",
      description: "Edge case testing, Selenium & quality pipelines",
      icon: CheckSquare,
      badge: "Zero-Dev Entry",
    },
    {
      id: "general_sde",
      title: "General Campus SDE",
      description: "TCS Ninja/Digital & mass drive core readiness",
      icon: Code2,
      badge: "Campus Pick",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl">
        {/* Left Column: Mission & Social Proof */}
        <div className="lg:col-span-5 p-8 sm:p-10 bg-gradient-to-br from-indigo-50/70 via-slate-50 to-white border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between relative">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/25">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-2xl text-slate-900 tracking-tight">Placement <span className="text-indigo-600">Forge</span></span>
                </div>
                <p className="text-xs text-slate-500 font-semibold">The Zero-to-Offer Placement OS</p>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Gatekeeping Guarantee</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                No complex DSA barrier. Tailored to your exact target role.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                If you have never written a line of code or struggle with aptitude anxiety, <strong className="text-slate-900 font-black">Placement Forge</strong> synthesizes your transferable skills and guides you to an offer in 14 focused days.
              </p>
            </div>

            {/* Testimonial / Social proof */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <p className="text-xs text-slate-700 italic leading-relaxed">
                &ldquo;Every other site gave me 500 hard dynamic programming MCQs. Placement Forge started with ATM analogies in Tanglish and built my confidence. Cleared TCS Digital in 2 weeks.&rdquo;
              </p>
              <div className="flex items-center gap-2.5 pt-1">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  S
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Sanjay B.</div>
                  <div className="text-[10px] text-slate-500">CIT Alum • Placed @ Thoughtworks (7.5 LPA)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Powered by Gemini 2.5 Flash</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Free for Students
            </span>
          </div>
        </div>

        {/* Right Column: Intake & Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Role Intake &amp; Goal Setup</h3>
              <p className="text-xs text-slate-500 mt-0.5">Calibrating your customized placement coordinates</p>
            </div>

            {/* One-Click Instant Demo Button */}
            <button
              type="button"
              onClick={handleInstantDemo}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold transition-all shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>One-Click Instant Demo</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name & Email inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name / Preferred Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 focus:outline-none text-slate-900 text-sm placeholder:text-slate-400 transition-colors shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  College Email / Personal Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. priya@campus.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 focus:outline-none text-slate-900 text-sm placeholder:text-slate-400 transition-colors shadow-xs"
                />
              </div>
            </div>

            {/* Target Campus Tier */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Select Your Target Placement Drive Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setTargetCompany("mass_service")}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    targetCompany === "mass_service"
                      ? "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs"
                      : "bg-slate-50 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">
                      <Building2 className="w-4 h-4" />
                    </div>
                    {targetCompany === "mass_service" && (
                      <CheckCircle className="w-4 h-4 text-indigo-600" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Mass Campus Drives</h4>
                  <p className="text-[11px] text-indigo-700 font-semibold">TCS, CTS, Infosys, Wipro</p>
                </div>

                <div
                  onClick={() => setTargetCompany("product_tier1")}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    targetCompany === "product_tier1"
                      ? "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs"
                      : "bg-slate-50 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                      <Rocket className="w-4 h-4" />
                    </div>
                    {targetCompany === "product_tier1" && (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Tier-1 Product / Startups</h4>
                  <p className="text-[11px] text-emerald-700 font-semibold">Zeta, Zoho, Thoughtworks</p>
                </div>
              </div>
            </div>

            {/* TARGET TECHNICAL ROLE SELECTOR */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Target Technical Role Track (Personalizes Your Curriculum)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {technicalRoles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = targetRole === role.id;

                  return (
                    <div
                      key={role.id}
                      onClick={() => setTargetRole(role.id)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all text-left flex flex-col justify-between ${
                        isSelected
                          ? "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                          {role.badge}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{role.title}</div>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                          {role.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Experience Level Toggle */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Your Current Starting Skill Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSkillLevel("beginner")}
                  className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                    skillLevel === "beginner"
                      ? "bg-emerald-50 border-emerald-400 ring-2 ring-emerald-400/20 shadow-xs"
                      : "bg-slate-50 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                    <Baby className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Absolute Beginner</div>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Zero coding knowledge. Teach me with physical analogies.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSkillLevel("intermediate")}
                  className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                    skillLevel === "intermediate"
                      ? "bg-indigo-50 border-indigo-400 ring-2 ring-indigo-400/20 shadow-xs"
                      : "bg-slate-50 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 shrink-0 mt-0.5">
                    <BrainCircuit className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Intermediate</div>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Know basic syntax, need speed and interview confidence.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Continue to Reverse Resume Synthesizer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
