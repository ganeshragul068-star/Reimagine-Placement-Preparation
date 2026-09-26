"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ChatMessage } from "@/types";

export default function ChatPage() {
  const { user } = useApp();

  const promptChips = [
    "What should I prepare for TCS NQT Round 1?",
    "How do I explain an academic gap in HR interview?",
    "Tips for cracking technical interviews as a non-CS student",
    "Explain Fixed CTC vs Variable Pay in offer letters",
    "What are the most common questions in Cognizant GenC technical round?",
  ];

  const initialMessage: ChatMessage = {
    id: "init-1",
    role: "assistant",
    content: `Hello **${user.name}**! I am **ForgeBot**, your dedicated Placement AI Mentor at PlacementForge.

I can guide you on:
* **Company Exam Blueprints** (TCS NQT, Cognizant GenC/Next, Infosys, Zoho, Accenture)
* **Demystifying CTC** (Fixed Base Salary vs. Performance Variable vs. PF deductions)
* **Interview Articulation** (Handling academic gaps, backlogs, and non-CS career transitions)
* **STAR Framework Scripts** for behavioral HR rounds

Select a prompt chip below or type any question to get started!`,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (contentToSend?: string) => {
    const text = contentToSend || inputText.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: "assistant-" + Date.now(),
        role: "assistant",
        content: data.reply || "I am here to guide your placement sprint. Let me know what you'd like to dive into.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const fallbackMsg: ChatMessage = {
        id: "assistant-" + Date.now(),
        role: "assistant",
        content: "Here is the key takeaway: Focus on **zero-error accuracy on Aptitude Section 1** and articulate your mini-project using the **Present-Past-Future formula**. Keep your weekly velocity high!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 flex flex-col h-[calc(100vh-8rem)]">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">ForgeBot Placement Mentor</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Live Advisor
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Grounded placement intelligence on Indian IT mass recruiters, eligibility, gaps &amp; offer letters
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([initialMessage])}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold"
          title="Reset Conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Chat</span>
        </button>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-white text-indigo-700 border border-slate-200 shadow-xs"
              }`}
            >
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`p-4 rounded-2xl max-w-2xl text-xs sm:text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-tr-xs shadow-xs"
                  : "bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-xs"
              }`}
            >
              <div className="whitespace-pre-line prose prose-sm max-w-none text-inherit">
                {msg.content}
              </div>
              <div
                className={`text-[10px] mt-2 font-mono ${
                  msg.role === "user" ? "text-indigo-200 text-right" : "text-slate-400 text-left"
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-2 text-xs text-slate-500">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span>ForgeBot is analyzing placement blueprint...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 shrink-0 scrollbar-none">
        <span className="text-[11px] font-bold text-slate-500 uppercase shrink-0 mr-1">
          Suggestions:
        </span>
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(chip)}
            className="px-3 py-1 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-[11px] text-slate-700 whitespace-nowrap transition-colors shadow-xs"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask anything about TCS NQT, Cognizant, HR rounds, or CTC..."
          className="flex-1 px-4 py-3 rounded-2xl bg-white border border-slate-300 focus:border-indigo-500 focus:outline-none text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 shadow-xs"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 disabled:opacity-50 transition-all flex items-center gap-1.5"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
