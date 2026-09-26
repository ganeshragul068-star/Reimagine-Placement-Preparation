"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Mic,
  MicOff,
  Clock,
  Zap,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function DiagnosticPage() {
  const router = useRouter();
  const { completeDiagnostic } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [q1Answer, setQ1Answer] = useState<string>("");
  const [q2Answer, setQ2Answer] = useState<string>("");
  const [q3Text, setQ3Text] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);

  // Toggle mock microphone
  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingSeconds(0);
      const timer = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 15) {
            clearInterval(timer);
            setIsRecording(false);
            setQ3Text((prevText) =>
              prevText.trim()
                ? prevText
                : "Hello, my name is Priya. I am a final-year student interested in software engineering because I love using logical thinking to solve real-world problems. In my college mini-project, I built an automated attendance tracker and I'm eager to contribute to large-scale enterprise systems."
            );
            return 15;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setIsRecording(false);
      if (!q3Text.trim()) {
        setQ3Text(
          "I am a passionate computer science student eager to learn how software impacts daily lives. I enjoy breaking down complex problems into step-by-step logic."
        );
      }
    }
  };

  const handleSkipZeroBaseline = () => {
    completeDiagnostic(
      {
        logicAptitude: 22,
        coreTech: 18,
        problemSolving: 20,
        articulation: 25,
      },
      true
    );
    router.push("/dashboard");
  };

  const handleCompleteCalibration = () => {
    // Score based on answers
    let logicScore = 25;
    let coreTechScore = 20;
    let problemSolvingScore = 22;
    let articulationScore = 30;

    // Q1 correct is 'B' (1.2 hours / 72 mins)
    if (q1Answer === "B") {
      logicScore += 25;
      problemSolvingScore += 15;
    } else if (q1Answer) {
      logicScore += 10;
    }

    // Q2 correct is '400' (wallet 500 - (120 - 20) = 400)
    if (q2Answer === "400") {
      coreTechScore += 30;
      problemSolvingScore += 20;
    } else if (q2Answer) {
      coreTechScore += 10;
    }

    // Q3 text evaluation
    if (q3Text.trim().length > 40) {
      articulationScore += 30;
    } else if (q3Text.trim().length > 10) {
      articulationScore += 15;
    }

    completeDiagnostic({
      logicAptitude: Math.min(85, logicScore),
      coreTech: Math.min(85, coreTechScore),
      problemSolving: Math.min(85, problemSolvingScore),
      articulation: Math.min(85, articulationScore),
    });

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="max-w-3xl w-full space-y-6">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">3-Minute Baseline Calibration</h2>
              <p className="text-xs text-slate-500">
                Pillar 1: &quot;Where do I stand?&quot; • No pressure, zero discouragement
              </p>
            </div>
          </div>

          {/* Skip Button */}
          <button
            onClick={handleSkipZeroBaseline}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-all shadow-xs"
            title="Skip questions and start with an entry-level zero baseline"
          >
            <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
            <span>Skip directly with Zero Baseline</span>
          </button>
        </div>

        {/* Clean Step Progression Bar */}
        <div className="space-y-2 px-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-emerald-700">Step {currentStep} of 3</span>
            <span className="text-slate-500 font-medium">
              {currentStep === 1
                ? "Visual Logic & Pattern"
                : currentStep === 2
                ? "Everyday Decision Flow"
                : "Articulation & Voice"}
            </span>
          </div>
          {/* Progress bar line */}
          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-indigo-600 transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Panel */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative">
          {/* QUESTION 1: Aptitude & Visual Pattern Intuition */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Question 1 of 3: Logic &amp; Aptitude Intuition
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> ~45 seconds
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  College Cafeteria Tap Flow Intuition
                </h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Two water dispensers fill a 60-liter hostel water dispenser:
                </p>
                <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2 text-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                    <span><strong>Tap A:</strong> Fills the entire 60L container alone in <strong>2 hours</strong> (Rate: 30L/hr).</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                    <span><strong>Tap B:</strong> Fills the entire 60L container alone in <strong>3 hours</strong> (Rate: 20L/hr).</span>
                  </div>
                  <div className="pt-2 text-emerald-700 font-bold">
                    If both Tap A and Tap B are turned on at the exact same moment, how long will it take to fill the container?
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { id: "A", label: "2.5 hours (Average of 2 and 3)", hint: "Common trap: Rates add up, time decreases!" },
                  { id: "B", label: "1.2 hours (72 minutes)", hint: "Combined rate: 30 + 20 = 50L/hr. 60/50 = 1.2 hrs." },
                  { id: "C", label: "5 hours (2 + 3 hours)", hint: "Two taps working together are faster, not slower." },
                  { id: "D", label: "I am not sure / Never learned this", hint: "Totally fine! That is why Placement Forge exists." },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setQ1Answer(opt.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      q1Answer === opt.id
                        ? "bg-indigo-50/80 border-indigo-500 text-slate-900 ring-2 ring-indigo-500/20 shadow-xs"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 font-bold text-sm">
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                          q1Answer === opt.id
                            ? "bg-indigo-600 text-white"
                            : "bg-white border border-slate-300 text-slate-700"
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span>{opt.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION 2: Pseudocode / Flowchart Readability Check */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Question 2 of 3: Core Reasoning &amp; Flow
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> ~45 seconds
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Tracing Decision Flow (No Coding Syntax Needed)
                </h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Read this simple real-world recipe like instructions in an English manual:
                </p>

                {/* Code / Logic box */}
                <div className="mt-3 p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-1">
                  <p className="text-slate-400">// Campus Canteen Payment Logic</p>
                  <p><span className="text-emerald-400">walletBalance</span> = 500;</p>
                  <p><span className="text-emerald-400">coffeePrice</span> = 120;</p>
                  <p><span className="text-emerald-400">isStudentDiscount</span> = true;</p>
                  <p className="pt-2 text-slate-400">// Apply discount check</p>
                  <p className="text-amber-300 font-semibold">IF (isStudentDiscount == true) THEN</p>
                  <p className="pl-4 text-white">finalPrice = coffeePrice - 20;</p>
                  <p className="text-amber-300 font-semibold">ELSE</p>
                  <p className="pl-4 text-white">finalPrice = coffeePrice;</p>
                  <p className="pt-2"><span className="text-emerald-400">remainingMoney</span> = walletBalance - finalPrice;</p>
                </div>

                <p className="mt-4 text-sm font-bold text-slate-800">
                  What will be the final value stored in <code className="text-indigo-600 font-mono font-bold">remainingMoney</code>?
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { val: "380", desc: "500 - 120 (no discount applied)" },
                  { val: "400", desc: "500 - (120 - 20 = 100)" },
                  { val: "500", desc: "Money unchanged" },
                  { val: "Not sure", desc: "Prefer to learn step-by-step" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setQ2Answer(opt.val)}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      q2Answer === opt.val
                        ? "bg-indigo-50 border-indigo-500 text-slate-900 ring-2 ring-indigo-500/20 shadow-xs"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <div className="text-lg font-black text-slate-900">{opt.val}</div>
                    <div className="text-[10px] text-slate-500 mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION 3: Communication & Articulation Self-Intro */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200">
                  Question 3 of 3: Communication &amp; Articulation
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> ~60 seconds
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Briefly Introduce Yourself &amp; Why You Want to be an Engineer
                </h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  In mass campus drives, interviewers evaluate your natural confidence and passion over rehearsed bookish jargon. You can speak or type.
                </p>
              </div>

              {/* Voice / Mic Mock Simulation */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleRecording}
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
                      {isRecording ? `Recording... (${recordingSeconds}s / 15s)` : "Record with Voice / Mic"}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {isRecording ? "Listening to your articulation rhythm..." : "Click to speak your introduction"}
                    </p>
                  </div>
                </div>

                {isRecording && (
                  <div className="flex items-center gap-1.5 h-8">
                    {[16, 28, 12, 32, 20, 36, 14, 26, 18].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-emerald-600 rounded-full animate-pulse"
                        style={{ height: `${h}px`, animationDelay: `${i * 120}ms` }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Text Input Option */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Or Type Your Introduction (2-3 sentences):
                </label>
                <textarea
                  rows={4}
                  value={q3Text}
                  onChange={(e) => setQ3Text(e.target.value)}
                  placeholder="e.g. Hi, I am an enthusiastic engineering student who loves understanding how software applications solve daily problems. During my college project, I discovered that building practical tools is where my passion lies..."
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:outline-none text-slate-900 text-sm placeholder:text-slate-400 transition-colors resize-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCompleteCalibration}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
              >
                <span>Calculate My Readiness Baseline</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
