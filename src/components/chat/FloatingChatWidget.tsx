"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bot, X, ArrowRight, Send } from "lucide-react";

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [quickAnswer, setQuickAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAskQuick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setQuickAnswer(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: query }],
        }),
      });

      const data = await res.json();
      setQuickAnswer(data.reply);
    } catch {
      setQuickAnswer("Focus on zero-error aptitude speed and structured STAR intro. Open full chat for complete blueprints!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {isOpen ? (
        <div className="w-80 sm:w-96 rounded-3xl bg-white border border-slate-200 shadow-xl p-5 space-y-3 animate-scaleUp">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">ForgeBot Assistant</h4>
                <span className="text-[10px] text-emerald-700 font-bold">Quick Q&amp;A</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {quickAnswer ? (
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 max-h-48 overflow-y-auto leading-relaxed">
              {quickAnswer}
            </div>
          ) : (
            <div className="text-[11px] text-slate-500">
              Ask about eligibility criteria, TCS NQT rounds, handling gaps, or fixed vs variable CTC.
            </div>
          )}

          <form onSubmit={handleAskQuick} className="flex items-center gap-1.5 pt-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask placement question..."
              className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 focus:outline-none text-slate-900 text-xs"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-1 text-center">
            <Link
              href="/dashboard/chat"
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1"
            >
              <span>Open Full Dedicated Chat Screen</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all"
        >
          <Bot className="w-4 h-4 text-white" />
          <span className="text-white font-black">Ask ForgeBot</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      )}
    </div>
  );
}
