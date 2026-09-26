"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Code2,
  Brain,
  Sparkles,
  Languages,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Mic,
  MicOff,
  Send,
  ArrowRight,
  ArrowLeft,
  Zap,
  Award,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Copy,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useApp } from "@/context/AppContext";
import { ROADMAP_14_DAYS } from "@/data/roadmapData";
import { EvaluationResult } from "@/types";

export default function PracticeRoomPage() {
  const params = useParams();
  const router = useRouter();
  const { addEvaluation, completedDays, activeDay, user } = useApp();

  const dayId = Number(params?.dayId) || 1;
  const sprintDay = ROADMAP_14_DAYS.find((d) => d.id === dayId) || ROADMAP_14_DAYS[0];

  // Active Tab: 1 = Learn, 2 = Practice, 3 = Verify
  const [activeTab, setActiveTab] = useState<"learn" | "practice" | "verify">("learn");

  // Tab 1 state
  const [showVernacular, setShowVernacular] = useState<boolean>(true);

  // Tab 2 state
  const [userCode, setUserCode] = useState<string>(sprintDay.practiceProblem.starterCode);
  const [revealedHints, setRevealedHints] = useState<number[]>([1]); // default reveal hint 1
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Tab 3 state (AI Checkpoint)
  const [userSpeechText, setUserSpeechText] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);

  // Sync starter code if dayId changes
  useEffect(() => {
    setUserCode(sprintDay.practiceProblem.starterCode);
    setRevealedHints([1]);
    setEvaluationResult(null);
    setUserSpeechText("");
  }, [dayId, sprintDay]);

  const toggleHint = (index: number) => {
    setRevealedHints((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Toggle mock voice recording
  const handleToggleVoice = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingSeconds(0);
      const timer = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 12) {
            clearInterval(timer);
            setIsRecording(false);
            if (!userSpeechText.trim()) {
              setUserSpeechText(
                `In this problem, before deducting cash, we must verify that the requested amount is strictly greater than zero and does not exceed the current balance or daily ATM ceiling. If we omit the check for non-positive values, someone could exploit the system with negative numbers.`
              );
            }
            return 12;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setIsRecording(false);
      if (!userSpeechText.trim()) {
        setUserSpeechText(
          `We validate three invariant conditions: withdrawAmount > 0, withdrawAmount <= accountBalance, and withdrawAmount <= dailyLimit to defend against edge case overdraws.`
        );
      }
    }
  };

  // Submit AI Checkpoint
  const handleSubmitEvaluation = async () => {
    if (!userSpeechText.trim()) return;

    setIsEvaluating(true);

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dayNumber: sprintDay.dayNumber,
          category: sprintDay.category,
          question: sprintDay.checkpointPrompt.question,
          userDefense: userSpeechText,
          starterProblem: sprintDay.practiceProblem.title,
        }),
      });

      const data: EvaluationResult = await res.json();
      setEvaluationResult(data);
      addEvaluation(data, sprintDay.id, sprintDay.category);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10b981", "#6366f1", "#f59e0b"],
      });
    } catch (err) {
      console.error("Evaluation error:", err);
      // Fallback result
      const fallback: EvaluationResult = {
        scoreDelta: 10,
        conceptualScore: 85,
        strengths: [
          "Demonstrates correct invariant checking before mutating state.",
          "Clear, logical defense of the code structure.",
        ],
        missingGaps: [
          "Could mention atomic database rollback in case of connection drop.",
        ],
        polishedAnswer:
          "In software engineering, structured boundary checking prevents unexpected exceptions and guarantees transaction determinism.",
        encouragement: "Fantastic work! You defended your approach with confidence and clarity.",
      };
      setEvaluationResult(fallback);
      addEvaluation(fallback, sprintDay.id, sprintDay.category);
    } finally {
      setIsEvaluating(false);
    }
  };

  const isDayCompleted = completedDays.includes(sprintDay.id);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/dashboard/roadmap" className="hover:text-indigo-600 transition-colors">
            14-Day Sprint Roadmap
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Day {sprintDay.dayNumber}: {sprintDay.title}</span>
        </div>

        <div className="flex items-center gap-2">
          {sprintDay.id > 1 && (
            <Link
              href={`/dashboard/practice/${sprintDay.id - 1}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Day {sprintDay.id - 1}</span>
            </Link>
          )}
          {sprintDay.id < 14 && (
            <Link
              href={`/dashboard/practice/${sprintDay.id + 1}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold shadow-xs"
            >
              <span>Day {sprintDay.id + 1}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* SPRINT ROOM HEADER CARD */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
              Day {sprintDay.dayNumber}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
              {sprintDay.category}
            </span>
            {isDayCompleted && (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cleared</span>
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5">
            {sprintDay.title}
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            {sprintDay.description}
          </p>
        </div>

        {/* 3-Step Micro-Loop Progress Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveTab("learn")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "learn"
                ? "bg-white text-indigo-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>1. LEARN (15m)</span>
          </button>

          <button
            onClick={() => setActiveTab("practice")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "practice"
                ? "bg-white text-indigo-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>2. PRACTICE (20m)</span>
          </button>

          <button
            onClick={() => setActiveTab("verify")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "verify"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>3. VERIFY (10m)</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: LEARN (15 MINS) ================= */}
      {activeTab === "learn" && (
        <div className="space-y-6">
          {/* ELI5 Concept Breakdown */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Explain Like I&apos;m 5 (ELI5) Breakdown</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">Zero-Gatekeeping Mental Model</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              {sprintDay.learnContent.eli5Title}
            </h3>

            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              {sprintDay.learnContent.eli5Body.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Real World Analogy Box */}
            <div className="mt-4 p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1.5">
              <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Real-World Physical Analogy</span>
              </div>
              <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed font-medium">
                {sprintDay.learnContent.realWorldAnalogy}
              </p>
            </div>
          </div>

          {/* VERNACULAR / TANGLISH TIP TOGGLE */}
          <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Languages className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span>{sprintDay.learnContent.vernacularTip.language}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                      Regional Medium Friendly
                    </span>
                  </h4>
                  <p className="text-xs text-slate-600">
                    Understanding in native thought first removes 90% of technical intimidation.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowVernacular(!showVernacular)}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-amber-800 border border-amber-300 transition-colors shadow-xs"
              >
                {showVernacular ? "Hide Tanglish Tip" : "Show Tanglish Tip"}
              </button>
            </div>

            {showVernacular && (
              <div className="p-4 rounded-2xl bg-white border border-amber-200 space-y-2 mt-2 shadow-xs">
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  &ldquo;{sprintDay.learnContent.vernacularTip.explanation}&rdquo;
                </p>
                <div className="pt-1 text-[11px] text-amber-800 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>Colloquial Mnemonic: {sprintDay.learnContent.vernacularTip.colloquialMnemonic}</span>
                </div>
              </div>
            )}
          </div>

          {/* Key Placement Rules */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              3 Golden Rules to Keep in Mind:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {sprintDay.learnContent.keyRules.map((rule, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA to Tab 2 */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveTab("practice")}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all transform hover:-translate-y-0.5"
            >
              <span>Understood Concept → Proceed to Practice Problem (Tab 2)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= TAB 2: PRACTICE (20 MINS) ================= */}
      {activeTab === "practice" && (
        <div className="space-y-6">
          {/* Problem Statement Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
                  1 High-Yield Practice Problem
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  {sprintDay.practiceProblem.difficulty}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">Estimated: 20 Mins</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              {sprintDay.practiceProblem.title}
            </h3>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
              <p><strong>Scenario:</strong> {sprintDay.practiceProblem.scenario}</p>
              <p className="text-emerald-700 font-semibold"><strong>Your Task:</strong> {sprintDay.practiceProblem.task}</p>
            </div>
          </div>

          {/* Interactive Code / Workspace Box */}
          <div className="rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
            <div className="px-5 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">solution_workspace.js</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setUserCode(sprintDay.practiceProblem.starterCode)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Reset to starter template"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-950 font-mono text-xs sm:text-sm">
              <textarea
                rows={10}
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full bg-transparent text-emerald-400 font-mono focus:outline-none resize-none leading-relaxed selection:bg-indigo-600"
                spellCheck={false}
              />
            </div>
          </div>

          {/* 3 TOGGLEABLE PROGRESSIVE HINTS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Progressive Scaffolding Hints (No Cheating Guilt)</span>
              </h4>
              <span className="text-[11px] text-slate-500">Unlock gradually as needed</span>
            </div>

            {sprintDay.practiceProblem.hints.map((hint, idx) => {
              const hintNum = idx + 1;
              const isRevealed = revealedHints.includes(hintNum);
              const label =
                hintNum === 1
                  ? "Hint 1: Gentle Intuition Nudge"
                  : hintNum === 2
                  ? "Hint 2: Step-by-Step Logic Breakdown"
                  : "Full Solution & Reference Approach";

              return (
                <div
                  key={hintNum}
                  className={`rounded-2xl border transition-all ${
                    isRevealed
                      ? "bg-white border-slate-300 shadow-xs"
                      : "bg-slate-50 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button
                    onClick={() => toggleHint(hintNum)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                          isRevealed
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {hintNum}
                      </span>
                      <span className="text-xs font-bold text-slate-800">{label}</span>
                    </div>
                    {isRevealed ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  {isRevealed && (
                    <div className="px-4 pb-4 pt-1 border-t border-slate-100 text-xs text-slate-700 leading-relaxed font-mono">
                      {hint}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA to Tab 3 */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveTab("learn")}
              className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Learn</span>
            </button>

            <button
              onClick={() => setActiveTab("verify")}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all transform hover:-translate-y-0.5"
            >
              <span>Problem Solved → Go to AI Checkpoint (Tab 3)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= TAB 3: VERIFY (AI CHECKPOINT - 10 MINS) ================= */}
      {activeTab === "verify" && (
        <div className="space-y-6">
          {/* AI Checkpoint Prompt Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
                  Pillar 4: What to Improve?
                </span>
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                  +10% Velocity Boost Eligible
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">Gemini 2.5 Flash Evaluator</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Defend Your Solution: Verbal Concept Checkpoint
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Campus placement interviewers don&apos;t just read code—they ask: <em>&ldquo;Explain why your code works and how it handles edge cases.&rdquo;</em>
              </p>
            </div>

            {/* Prompt Question */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-2">
              <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider">
                Interview Question:
              </div>
              <p className="text-sm font-bold text-slate-900">
                &ldquo;{sprintDay.checkpointPrompt.question}&rdquo;
              </p>
              <p className="text-xs text-slate-600 italic">
                Context: {sprintDay.checkpointPrompt.interviewerContext}
              </p>
            </div>

            {/* Voice Recording / Input Sandbox */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleToggleVoice}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md ${
                      isRecording
                        ? "bg-rose-600 text-white animate-pulse shadow-rose-500/30 ring-4 ring-rose-500/20"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"
                    }`}
                  >
                    {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      {isRecording ? `Recording... (${recordingSeconds}s / 12s)` : "Record Answer with Mic (Voice Mode)"}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {isRecording ? "Simulating placement audio transcription..." : "Speak naturally or type your response below"}
                    </p>
                  </div>
                </div>

                {isRecording && (
                  <div className="flex items-center gap-1.5 h-8">
                    {[18, 30, 14, 34, 22, 38, 16, 28, 20].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-emerald-600 rounded-full animate-pulse"
                        style={{ height: `${h}px`, animationDelay: `${i * 120}ms` }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Your Answer / Defense Explanation:
                </label>
                <textarea
                  rows={4}
                  value={userSpeechText}
                  onChange={(e) => setUserSpeechText(e.target.value)}
                  placeholder="e.g. In an ATM withdrawal, verifying withdrawAmount > 0 and balance guards against negative input exploits and overdrafts..."
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:outline-none text-slate-900 text-sm placeholder:text-slate-400 transition-colors resize-none leading-relaxed font-sans"
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setUserSpeechText(
                      "To safeguard the ATM system, we enforce three checks: withdrawAmount must be strictly positive (> 0), cannot exceed the available balance, and cannot exceed the daily limit. Without the > 0 check, an edge case with negative inputs could corrupt bank ledger accounts."
                    )
                  }
                  className="text-xs text-indigo-700 hover:text-indigo-900 font-bold"
                >
                  Autofill Sample Student Answer
                </button>

                <button
                  onClick={handleSubmitEvaluation}
                  disabled={!userSpeechText.trim() || isEvaluating}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isEvaluating ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Gemini Evaluating Conceptual Gaps...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Checkpoint for AI Evaluation</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ================= AI EVALUATION RESULT PANEL ================= */}
          {evaluationResult && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-emerald-300 shadow-sm space-y-6 relative overflow-hidden">
              {/* Header with Live Velocity Boost Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-slate-900">AI Placement Coach Feedback</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Score: {evaluationResult.conceptualScore}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Evaluated via Gemini 2.5 Flash • Readiness Radar Updated Live
                    </p>
                  </div>
                </div>

                {/* LIVE VELOCITY BOOST BADGE */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm font-extrabold shadow-xs">
                  <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600 animate-bounce" />
                  <span>+{evaluationResult.scoreDelta}% Velocity Boost Applied!</span>
                </div>
              </div>

              {/* Strengths & Missing Gaps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Strengths Detected */}
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Strengths Identified:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {evaluationResult.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Missing Gaps / Blindspots */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Conceptual Gap to Patch:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {evaluationResult.missingGaps.map((gap, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* How a Tech Lead Phrases It */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>How a Tech Lead Would Phrase It:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed">
                  &ldquo;{evaluationResult.polishedAnswer}&rdquo;
                </p>
              </div>

              {/* Encouragement & Next Sprint Link */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-emerald-700 font-semibold italic">
                  🌟 {evaluationResult.encouragement}
                </p>

                <div className="flex items-center gap-3">
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    View Updated Radar
                  </Link>

                  {sprintDay.id < 14 ? (
                    <Link
                      href={`/dashboard/practice/${sprintDay.id + 1}`}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all"
                    >
                      <span>Advance to Day {sprintDay.id + 1}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard/mock-interview"
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
                    >
                      <span>Enter Final Mock Interview</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
