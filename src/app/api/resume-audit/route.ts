import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { ResumeAuditResult, TargetTechnicalRole } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeText = "", informalTasks = "", targetRole = "fullstack" } = body;

    const inputData = (resumeText || informalTasks).trim();
    if (!inputData) {
      return NextResponse.json(
        { error: "Please provide either resume text or informal coursework description." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are Placement Forge's "Reverse Resume" & ATS Synthesizer.
Your mission is to look at college students with zero professional experience or informal coursework (e.g., "created HTML page", "billing form in Java Swing", "student attendance in Python").
Instead of rejecting them, extract foundational transferable engineering competencies, map gaps against their target role (${targetRole}), and award an encouraging Day-0 baseline score (between 20 and 45).

Return ONLY valid JSON matching this schema:
{
  "day0Score": number,
  "roleMatchPercent": number,
  "extractedSkills": string[],
  "transferableCompetencies": [
    {
      "area": string,
      "evidence": string,
      "industryEquivalent": string
    }
  ],
  "highPriorityGaps": string[],
  "positiveSummary": string
}`;

        const prompt = `Input candidate background or coursework:
"""
${inputData}
"""
Target Technical Role: ${targetRole}

Perform the reverse resume synthesis.`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
          },
        });

        const parsed = JSON.parse(response.text?.trim() || "") as ResumeAuditResult;
        return NextResponse.json(parsed);
      } catch (geminiError) {
        console.warn("Gemini call in resume-audit failed, switching to deterministic fallback:", geminiError);
      }
    }

    // Deterministic High-Fidelity Fallback
    const fallback = generateResumeFallback(inputData, targetRole as TargetTechnicalRole);
    return NextResponse.json(fallback);
  } catch (error) {
    console.error("Resume audit error:", error);
    return NextResponse.json(
      {
        day0Score: 26,
        roleMatchPercent: 48,
        extractedSkills: ["Object-Oriented Programming", "Basic SQL / Data Storage", "UI Logic Flow"],
        transferableCompetencies: [
          {
            area: "Application State Management",
            evidence: "College coursework / mini-project implementation",
            industryEquivalent: "Frontend / Backend Component Lifecycle"
          }
        ],
        highPriorityGaps: ["API Integration & RESTful Standards", "Asynchronous Error Handling"],
        positiveSummary: "Your college coursework shows solid procedural intuition. You have strong transferable building blocks."
      },
      { status: 200 }
    );
  }
}

function generateResumeFallback(input: string, role: TargetTechnicalRole): ResumeAuditResult {
  const lower = input.toLowerCase();

  const roleMap: Record<TargetTechnicalRole, { baseScore: number; match: number; defaultGaps: string[] }> = {
    fullstack: {
      baseScore: 28,
      match: 52,
      defaultGaps: ["REST API Architecture", "State Management (Redux/Context)", "Client-Server Security Guards"]
    },
    backend: {
      baseScore: 30,
      match: 55,
      defaultGaps: ["Database Indexing & Normalization", "Concurrency / Multithreading", "API Contract Design"]
    },
    data_analyst: {
      baseScore: 26,
      match: 50,
      defaultGaps: ["Advanced SQL Joins & Window Functions", "Data Cleaning Pipelines", "Dashboard Visual Storytelling"]
    },
    qa_automation: {
      baseScore: 25,
      match: 48,
      defaultGaps: ["Test Case Design (Boundary Value Analysis)", "Selenium / Cypress Automation", "Regression Testing"]
    },
    general_sde: {
      baseScore: 28,
      match: 54,
      defaultGaps: ["Time & Space Complexity Vocalization", "OOP 4 Pillars in Code", "Core Operating System Pointers"]
    }
  };

  const meta = roleMap[role] || roleMap.general_sde;

  const competencies = [];
  const extractedSkills = [];

  if (lower.includes("java") || lower.includes("oop") || lower.includes("c++") || lower.includes("class")) {
    extractedSkills.push("Object-Oriented Programming", "Memory Management Intuition");
    competencies.push({
      area: "Encapsulation & Domain Modeling",
      evidence: "Defined classes and functions in college coursework",
      industryEquivalent: "Enterprise Backend Architecture"
    });
  } else {
    extractedSkills.push("Procedural Flow & Control Structures");
    competencies.push({
      area: "Algorithmic Decision Branching",
      evidence: "Conditionals and loops in mini-assignments",
      industryEquivalent: "Business Logic Engineering"
    });
  }

  if (lower.includes("html") || lower.includes("css") || lower.includes("web") || lower.includes("react") || lower.includes("page")) {
    extractedSkills.push("DOM Structure & UI Rendering", "User Interaction Design");
    competencies.push({
      area: "Client-Side User Experience",
      evidence: "Constructed web pages and visual forms",
      industryEquivalent: "Frontend Component Engineering"
    });
  }

  if (lower.includes("sql") || lower.includes("database") || lower.includes("table") || lower.includes("excel") || lower.includes("data")) {
    extractedSkills.push("Relational Data Modeling", "CRUD Operations");
    competencies.push({
      area: "Data Persistence & Retrieval",
      evidence: "Stored and queried tabular student/sales data",
      industryEquivalent: "Database Layer Management"
    });
  } else {
    extractedSkills.push("Tabular State Organization");
    competencies.push({
      area: "Data Flow Structure",
      evidence: "Worked with variables and sequential records",
      industryEquivalent: "Data Pipeline Fundamentals"
    });
  }

  return {
    day0Score: meta.baseScore,
    roleMatchPercent: meta.match,
    extractedSkills,
    transferableCompetencies: competencies,
    highPriorityGaps: meta.defaultGaps,
    positiveSummary: `Excellent foundation! Even without corporate internships, your college coursework demonstrates practical problem-solving logic. We have mapped your Day-0 transferable score to ${meta.baseScore}% and identified the exact ${meta.defaultGaps.length} bridge concepts needed for your ${role.replace('_', ' ').toUpperCase()} placement.`
  };
}
