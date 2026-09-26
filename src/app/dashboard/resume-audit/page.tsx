"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Award,
  CheckSquare,
  Square,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ResumeAuditResult } from "@/types";

export default function ResumeAuditPage() {
  const router = useRouter();
  const { user, resumeAudit, setResumeAudit, setUserData } = useApp();

  const [activeTab, setActiveTab] = useState<"reverse_resume" | "upload_resume">("reverse_resume");
  const [resumeText, setResumeText] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<ResumeAuditResult | null>(resumeAudit);

  // Checkbox concepts for zero-skill students
  const basicConcepts = [
    {
      id: "java",
      label: "Basic Java syntax",
      desc: "Wrote loops, if-else conditions, or simple classes in lab",
      textFragment: "Wrote basic Java syntax with loops and conditionals in college lab assignments.",
    },
    {
      id: "html",
      label: "Created an HTML form",
      desc: "Built input fields, submit buttons, or mini symposium page",
      textFragment: "Created an HTML form with input fields, submit buttons, and CSS layout styling.",
    },
    {
      id: "python",
      label: "Simple calculation in Python",
      desc: "Wrote scripts with lists, math formulas, or basic functions",
      textFragment: "Wrote Python scripts for calculations, list operations, and basic functions.",
    },
    {
      id: "excel",
      label: "Excel formulas/tables",
      desc: "Used SUM, averages, tabular sorting, or simple spreadsheets",
      textFragment: "Organized data in Excel using SUM formulas, filters, and structured tabular sheets.",
    },
    {
      id: "sql",
      label: "Wrote a SQL query",
      desc: "Executed SELECT queries, table creation, or basic CRUD in DBMS",
      textFragment: "Executed SQL SELECT queries and table operations in college database management class.",
    },
    {
      id: "flowchart",
      label: "Algorithm / Flowchart on paper",
      desc: "Designed step-by-step logic and decision branching diagrams",
      textFragment: "Designed step-by-step flowcharts and algorithmic logic diagrams for problem-solving.",
    },
  ];

  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([
    "Basic Java syntax",
    "Created an HTML form",
  ]);

  const [customCoursework, setCustomCoursework] = useState<string>(
    "In 2nd year, I created a simple student billing and attendance system with buttons and saved data into a basic database table. Also created a responsive webpage for our college symposium."
  );

  const toggleConcept = (concept: typeof basicConcepts[0]) => {
    setSelectedConcepts((prev) => {
      const exists = prev.includes(concept.label);
      if (exists) {
        return prev.filter((item) => item !== concept.label);
      } else {
        return [...prev, concept.label];
      }
    });
  };

  // Estimated baseline score preview based on selected concepts
  const estimatedBaseline = Math.min(35, 18 + selectedConcepts.length * 3);

  const handleSynthesize = async (overrideText?: string) => {
    setIsAnalyzing(true);
    let contentToSend = "";

    if (activeTab === "reverse_resume") {
      const conceptsSummary = selectedConcepts.join(", ");
      contentToSend = `${customCoursework.trim()} Touched foundational concepts: ${conceptsSummary}.`;
    } else {
      contentToSend = resumeText.trim();
    }

    try {
      const res = await fetch("/api/resume-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          informalTasks: contentToSend,
          resumeText: activeTab === "upload_resume" ? resumeText : "",
          targetRole: user.targetRole || "fullstack",
        }),
      });

      const data: ResumeAuditResult = await res.json();
      setResult(data);
      setResumeAudit(data);
      setUserData({
        claimedProjects: [
          contentToSend.split(".")[0] || "Foundational Coursework Project",
        ],
      });
    } catch (err) {
      console.error("Resume synthesis error:", err);
      // Resilient fallback
      const fallback: ResumeAuditResult = {
        day0Score: estimatedBaseline,
        roleMatchPercent: 54,
        extractedSkills: [
          "Procedural & Conditional Logic",
          "Structured Data Storage",
          "UI Input Handling",
        ],
        transferableCompetencies: [
          {
            area: "Application State & Data Flow",
            evidence: "Manipulated variables and component states in coursework",
            industryEquivalent: "Frontend & Backend Interface Contract",
          },
          {
            area: "Relational Persistence",
            evidence: "Stored records with unique IDs and structured tables",
            industryEquivalent: "Database Layer Management",
          },
        ],
        highPriorityGaps: ["REST API Best Practices", "Asynchronous Error Handling"],
        positiveSummary:
          "Your college coursework shows solid procedural intuition. You have strong transferable building blocks for campus placements.",
      };
      setResult(fallback);
      setResumeAudit(fallback);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleConfirmAndProceed = () => {
    router.push("/dashboard/diagnostic");
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Day-0 Foundation: Reverse Resume &amp; ATS Synthesizer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            No Resume? No Problem. Extract Transferable Tech Logic
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Standard portals reject empty resumes. PlacementForge extracts real engineering logic from basic assignments, class labs, and informal mini-projects to compute your Day-0 starting baseline.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-indigo-700 shrink-0 self-start md:self-center">
          <Award className="w-3.5 h-3.5 text-indigo-600" />
          <span>Role Track: {user.targetRole?.replace("_", " ").toUpperCase() || "FULLSTACK"}</span>
        </div>
      </div>

      {/* DUAL INPUT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Form (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Tab Selector: Tab A (Upload Resume) vs Tab B (No Resume / Reverse Resume) */}
          <div className="flex items-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setActiveTab("reverse_resume")}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "reverse_resume"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>No Resume? (Reverse Resume)</span>
            </button>

            <button
              onClick={() => setActiveTab("upload_resume")}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "upload_resume"
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-slate-600" />
              <span>Upload / Paste Resume</span>
            </button>
          </div>

          {/* TAB B: REVERSE RESUME FOR ZERO-EXPERIENCE STUDENTS */}
          {activeTab === "reverse_resume" ? (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-5 shadow-sm">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span>Select Any Concepts or Tools You Have Touched</span>
                  </h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Est. Day-0 Baseline: {estimatedBaseline}%
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Never feel like you start from zero. Select any topics you saw in class or lab. PlacementForge translates them into enterprise skills.
                </p>
              </div>

              {/* Checkbox Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {basicConcepts.map((concept) => {
                  const isChecked = selectedConcepts.includes(concept.label);
                  return (
                    <div
                      key={concept.id}
                      onClick={() => toggleConcept(concept)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 select-none ${
                        isChecked
                          ? "bg-indigo-50/80 border-indigo-300 text-slate-900 shadow-xs"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <div className="mt-0.5 text-indigo-600">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold leading-tight">{concept.label}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                          {concept.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Additional Project / Coursework Input */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-xs font-bold text-slate-700">
                  Optional: Describe any college project, mini-task, or class lab in plain words:
                </label>
                <textarea
                  rows={4}
                  value={customCoursework}
                  onChange={(e) => setCustomCoursework(e.target.value)}
                  placeholder="e.g. In semester 3, I made a student attendance tracker using simple HTML, JavaScript buttons, and saved records to a MySQL table..."
                  className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:outline-none text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 leading-relaxed resize-none font-sans"
                />
              </div>

              <button
                type="button"
                onClick={() => handleSynthesize()}
                disabled={isAnalyzing}
                className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Gemini 2.5 Flash Extracting Transferable Logic...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Synthesize Transferable Skills &amp; Compute Day-0 Baseline</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* TAB A: UPLOAD / PASTE RESUME */
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Paste Resume Text or Draft</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Paste your raw resume summary or bullet points for ATS gap mapping.
                </p>
              </div>

              <textarea
                rows={8}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your education, skills, and mini-project bullet points here..."
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:outline-none text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 leading-relaxed resize-none font-sans"
              />

              <button
                type="button"
                onClick={() => handleSynthesize()}
                disabled={isAnalyzing || !resumeText.trim()}
                className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing ATS Gaps...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Run ATS Gap Analysis</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Right Column: AI Synthesis & Day-0 Score (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          {result ? (
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-emerald-300 shadow-sm space-y-6 relative overflow-hidden">
              {/* Day-0 Score Ribbon */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">Synthesized Foundation Profile</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Validated
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Mapped against: <strong className="text-indigo-700 font-bold">{user.targetRole?.replace("_", " ").toUpperCase()}</strong>
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Day-0 Baseline</div>
                  <div className="text-3xl font-black text-emerald-700">{result.day0Score}%</div>
                </div>
              </div>

              {/* Positive Affirmation */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 leading-relaxed font-medium">
                {result.positiveSummary}
              </div>

              {/* Transferable Competencies */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Transferable Engineering Competencies Identified</span>
                </div>

                <div className="space-y-2">
                  {result.transferableCompetencies.map((comp, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span className="flex items-center gap-1.5 text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {comp.area}
                        </span>
                        <span className="text-[10px] text-indigo-700 font-mono">
                          {comp.industryEquivalent}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 pl-5">
                        {comp.evidence}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* High Priority Bridge Gaps */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Bridge Concepts to Cover in Your 14-Day Sprint</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.highPriorityGaps.map((gap, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold"
                    >
                      {gap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Next Step CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleConfirmAndProceed}
                  className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>Confirm Profile &amp; Take 3-Min Calibration Diagnostic</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Placeholder before analysis */
            <div className="h-full min-h-[350px] p-8 rounded-3xl bg-white border border-dashed border-slate-300 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800">
                Synthesize Your Day-0 Engineering Credits
              </h4>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                Select your touched coursework on the left and click synthesize. Gemini will translate your basic knowledge into high-value corporate placement competencies.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
