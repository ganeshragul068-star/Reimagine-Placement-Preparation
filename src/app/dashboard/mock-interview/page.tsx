"use client";

import React, { useState } from "react";
import {
  Mic,
  MicOff,
  Send,
  HelpCircle,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Brain,
  Building2,
  Copy,
  Check,
  UserCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useApp } from "@/context/AppContext";
import { MockInterviewExchange } from "@/types";

export default function MockInterviewPage() {
  const { user, addMockInterviewExchange, mockInterviewHistory } = useApp();

  const roleName = user.targetRole ? user.targetRole.replace("_", " ").toUpperCase() : "FULLSTACK";
  const claimedProject = user.claimedProjects?.[0] || "Campus Canteen Billing Form";

  // Initial Question tailored to role and project
  const initialQuestions: Record<string, string> = {
    fullstack: `In your claimed project "${claimedProject}", why did you choose your database structure, and how would you defend choosing SQL over MongoDB if an interviewer asked you?`,
    backend: `In your project "${claimedProject}", walk me through how your backend handles data validation before modifying database records to prevent SQL injection or corruption.`,
    data_analyst: `Looking at your coursework in "${claimedProject}", how would you write an aggregate query to find the top 5 highest transactions while filtering out null entries?`,
    qa_automation: `If a developer hands you "${claimedProject}" right before release, what are the top 3 boundary test cases you would write to catch hidden regression bugs?`,
    general_sde: `Walk me through the time complexity trade-offs you considered when implementing "${claimedProject}", and how you would optimize nested loops.`,
  };

  const initialQuestion = initialQuestions[user.targetRole || "fullstack"] || initialQuestions.fullstack;

  const [currentQuestion, setCurrentQuestion] = useState<string>(initialQuestion);
  const [candidateResponse, setCandidateResponse] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [latestExchange, setLatestExchange] = useState<MockInterviewExchange | null>(null);
  const [mode, setMode] = useState<"interviewer" | "mentor">("interviewer");
  const [copiedPivot, setCopiedPivot] = useState<boolean>(false);

  // Toggle mock voice mic
  const handleToggleVoice = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingSeconds(0);
      const timer = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 12) {
            clearInterval(timer);
            setIsRecording(false);
            if (!candidateResponse.trim()) {
              setCandidateResponse(
                `In my project, I picked MySQL because our data was strictly tabular with fixed fields like student ID, item price, and timestamp. I wanted strict foreign key constraints so an invalid transaction could never occur.`
              );
            }
            return 12;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setIsRecording(false);
      if (!candidateResponse.trim()) {
        setCandidateResponse(
          `I chose SQL because the relationship between students and bills was relational and required ACID transaction safety.`
        );
      }
    }
  };

  const handleSendResponse = async (isStuckOverride = false) => {
    const textToSend = isStuckOverride ? "I'm stuck / I don't know the exact answer to this." : candidateResponse.trim();
    if (!textToSend) return;

    setIsEvaluating(true);

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: roleName,
          question: currentQuestion,
          candidateAnswer: textToSend,
          isStuck: isStuckOverride,
        }),
      });

      const data = await res.json();

      const exchange: MockInterviewExchange = {
        questionNumber: (mockInterviewHistory?.length || 0) + 1,
        question: currentQuestion,
        role: roleName,
        candidateAnswer: textToSend,
        status: data.status,
        interviewerReply: data.interviewerReply,
        mentorFeedback: data.mentorFeedback,
        scoreDelta: data.scoreDelta || 10,
        timestamp: new Date().toLocaleTimeString(),
      };

      setLatestExchange(exchange);
      addMockInterviewExchange(exchange);

      if (data.status === "needs_mentorship") {
        setMode("mentor");
      } else {
        setMode("interviewer");
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#10b981", "#6366f1"],
        });
      }

      if (data.nextQuestion) {
        setCurrentQuestion(data.nextQuestion);
      }
      setCandidateResponse("");
    } catch (err) {
      console.error("Interview API error:", err);
      // Fallback
      setMode(isStuckOverride ? "mentor" : "interviewer");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleCopyPivot = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPivot(true);
    setTimeout(() => setCopiedPivot(false), 2000);
  };

  const handleTryAgainWithPivot = (pivotText: string) => {
    setCandidateResponse(pivotText);
    setMode("interviewer");
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner with Dual-Mode Indicator */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border shadow-sm transition-all duration-300 ${
          mode === "mentor"
            ? "bg-amber-50/90 border-amber-300 shadow-xs"
            : "bg-white border-slate-200 shadow-xs"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full uppercase border flex items-center gap-1.5 ${
                  mode === "mentor"
                    ? "bg-amber-100 text-amber-800 border-amber-300 animate-pulse"
                    : "bg-indigo-50 text-indigo-700 border-indigo-200"
                }`}
              >
                <Brain className="w-3.5 h-3.5" />
                <span>{mode === "mentor" ? "Safe Recovery Mode (Empathetic Coach)" : "Technical Interviewer Mode"}</span>
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                Track: {roleName}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Adaptive Defense &amp; Safe Recovery Mock Interview
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Cross-examines your claimed project (<strong className="text-indigo-700 font-bold">{claimedProject}</strong>). If you freeze or make an error, the agent instantly transitions into Coach Mode to give you the corporate pivot script.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSendResponse(true)}
              disabled={isEvaluating}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 text-xs font-bold transition-all shadow-xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>I&apos;m Stuck / Don&apos;t Know (Mentor Mode)</span>
            </button>
          </div>
        </div>
      </div>

      {/* CORE INTERACTION STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Live Question & Answering Box (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Question Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>Interviewer Question:</span>
              </span>
              <span className="text-[11px] text-slate-500 font-semibold">
                Exchange #{(mockInterviewHistory?.length || 0) + 1}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              &ldquo;{currentQuestion}&rdquo;
            </h3>
            <p className="text-xs text-slate-500 italic">
              Project Context: Probing claimed implementation details of {claimedProject}.
            </p>
          </div>

          {/* Voice / Mic Recording Bar */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all shadow-md ${
                  isRecording
                    ? "bg-rose-600 text-white animate-pulse shadow-rose-500/30 ring-4 ring-rose-500/20"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"
                }`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <div>
                <div className="text-xs font-bold text-slate-800">
                  {isRecording ? `Recording Voice (${recordingSeconds}s)...` : "Answer via Voice / Mic"}
                </div>
                <p className="text-[11px] text-slate-500">
                  {isRecording ? "Transcribing your spoken articulation..." : "Click to speak or type in the box below"}
                </p>
              </div>
            </div>

            {isRecording && (
              <div className="flex items-center gap-1.5 h-8">
                {[14, 28, 16, 32, 22, 36, 12, 26, 18].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-emerald-600 rounded-full animate-pulse"
                    style={{ height: `${h}px`, animationDelay: `${i * 110}ms` }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Response Box */}
          <div className="space-y-3">
            <textarea
              rows={5}
              value={candidateResponse}
              onChange={(e) => setCandidateResponse(e.target.value)}
              placeholder="Explain your thought process or defense here (conversational English or Tanglish is accepted)..."
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:outline-none text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 leading-relaxed resize-none font-sans"
            />

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() =>
                  setCandidateResponse(
                    "In our canteen billing system, I chose MySQL because every order has a defined structure (orderId, amount, studentId). We needed ACID guarantees so money balances wouldn't get corrupted."
                  )
                }
                className="text-xs text-indigo-700 hover:text-indigo-900 font-bold"
              >
                Autofill Sample Student Answer
              </button>

              <button
                onClick={() => handleSendResponse(false)}
                disabled={!candidateResponse.trim() || isEvaluating}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 disabled:opacity-50 transition-all"
              >
                {isEvaluating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Evaluating Response...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Answer</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Agent Feedback (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {latestExchange ? (
            <div
              className={`p-6 rounded-3xl border shadow-sm space-y-5 transition-all ${
                latestExchange.status === "needs_mentorship"
                  ? "bg-amber-50/60 border-amber-300"
                  : "bg-white border-emerald-300"
              }`}
            >
              {/* Header Status */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  {latestExchange.status === "needs_mentorship" ? (
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {latestExchange.status === "needs_mentorship"
                        ? "Mentor Safe Recovery Feedback"
                        : "Technical Cross-Examination Passed"}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Delta: +{latestExchange.scoreDelta}% Readiness Boost
                    </span>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-800">
                  +2% Velocity
                </div>
              </div>

              {/* Interviewer Reply */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 leading-relaxed shadow-xs">
                <strong className="text-indigo-700 block mb-1">Interviewer Observation:</strong>
                {latestExchange.interviewerReply}
              </div>

              {/* MENTOR COACHING MODE PANEL */}
              {latestExchange.mentorFeedback && (
                <div className="space-y-3 pt-1">
                  {/* Why this was tricky */}
                  <div className="p-3.5 rounded-2xl bg-amber-100/70 border border-amber-300 space-y-1">
                    <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                      <span>Why This Question Was Tricky (ELI5)</span>
                    </span>
                    <p className="text-xs text-amber-950 leading-relaxed font-medium">
                      {latestExchange.mentorFeedback.eli5Concept}
                    </p>
                  </div>

                  {/* THE SAFE CORPORATE PIVOT SCRIPT */}
                  <div className="p-4 rounded-2xl bg-white border border-indigo-200 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                        <span>The Safe Corporate Pivot Script</span>
                      </span>
                      <button
                        onClick={() => handleCopyPivot(latestExchange.mentorFeedback!.corporatePivotPhrase)}
                        className="text-[11px] font-semibold text-slate-500 hover:text-indigo-700 flex items-center gap-1"
                      >
                        {copiedPivot ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedPivot ? "Copied!" : "Copy"}</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-900 italic leading-relaxed bg-indigo-50/70 p-3 rounded-xl border border-indigo-200 font-bold">
                      &ldquo;{latestExchange.mentorFeedback.corporatePivotPhrase}&rdquo;
                    </p>
                    <button
                      onClick={() => handleTryAgainWithPivot(latestExchange.mentorFeedback!.corporatePivotPhrase)}
                      className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Load Script into Answering Box &amp; Recover</span>
                    </button>
                  </div>

                  {/* Tanglish / Vernacular Tip */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <strong className="text-amber-800 text-[11px] block mb-0.5 font-bold">Regional / Tanglish Intuition:</strong>
                    {latestExchange.mentorFeedback.vernacularTip}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Empty state placeholder */
            <div className="h-full min-h-[350px] p-6 rounded-3xl bg-white border border-dashed border-slate-300 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <Brain className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">
                Awaiting Your Verbal Response
              </h4>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Answer the question on the left using mic or text. If you are unsure, click &ldquo;I&apos;m Stuck&rdquo; to experience how the agent teaches you corporate recovery scripts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
