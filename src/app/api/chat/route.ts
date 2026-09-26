import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages = [] } = body;

    const lastMessage = messages[messages.length - 1]?.content || "";
    if (!lastMessage.trim()) {
      return NextResponse.json({ reply: "Hello! How can I help guide your campus placement prep today?" });
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are "PlacementGPT", an empathetic, hyper-knowledgeable campus placement director and veteran career mentor at Placement Forge.
Your audience: Indian engineering students preparing for mass campus recruitment drives (TCS NQT, Cognizant GenC/Next, Infosys, Wipro, Accenture) and Tier-1 product startups (Zoho, Thoughtworks, Zeta).

Provide realistic, structured, and encouraging guidance formatted in clean markdown:
- Bold key terms
- Concrete bullet-point checklists
- Exact script templates candidates can memorize for tricky HR/Technical questions
- Clarify common placement ambiguities: Fixed vs Variable CTC, 60% vs 65% criteria, 0 standing backlogs vs dead backlogs, handling 1-year education gaps.
Keep responses concise, actionable, and zero-gatekeeping.`;

        const conversationHistory = messages.map((m: any) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: conversationHistory.length > 0 ? conversationHistory : lastMessage,
          config: {
            systemInstruction: systemPrompt,
          },
        });

        const reply = response.text || "I am here to guide your placement journey. Ask me any question!";
        return NextResponse.json({ reply });
      } catch (geminiError) {
        console.warn("Gemini chat API error, switching to grounded fallback:", geminiError);
      }
    }

    // Grounded deterministic responses for popular queries
    const fallbackReply = generateChatFallback(lastMessage);
    return NextResponse.json({ reply: fallbackReply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      reply: "Here are the top 3 priorities for your placement sprint:\n- **1. Clear Aptitude Speed**: Master percentages and relative speed tricks.\n- **2. Master 1 Language**: Speak through loop conditions and arrays clearly.\n- **3. Perfect Your STAR Introduction**: Present -> Past Project -> Future Value."
    });
  }
}

function generateChatFallback(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("gap") || q.includes("year gap") || q.includes("academic gap")) {
    return `### How to Confidently Explain an Academic Gap in Campus Drives

Placement interviewers (TCS, Infosys, Cognizant) don't penalize genuine gaps if you frame them with **growth, maturity, and active skill-building**.

#### 🎯 The 3-Step "Honesty + Pivot" Formula:
1. **Acknowledge honestly without over-explaining**:
   > *"After completing my higher secondary education, I took a gap year due to personal health recovery / family responsibilities."*
2. **Highlight the active self-learning system you built**:
   > *"During this period, I didn't remain idle. I used the time to systematically teach myself foundational programming in Python, completed structured projects, and discovered my passion for computer science."*
3. **Connect to your present college momentum**:
   > *"This experience taught me extreme self-discipline and resilience, which is reflected in my current academic consistency and placement sprint velocity."*

#### 💡 Golden Rules:
* **Never fabricate medical certificates**—companies run strict background verification (BGV).
* Most mass recruiters permit **up to a 1 to 2-year education gap** provided you have **zero standing active arrears** at the time of joining.`;
  }

  if (q.includes("tcs") || q.includes("nqt") || q.includes("round 1") || q.includes("tcs digital")) {
    return `### TCS NQT Campus Drive Master Blueprint

TCS NQT filters out nearly 65% of candidates in the **Cognitive Assessment** before evaluating code. Here is the exact strategy:

#### 1. Foundation Section (Elimination Filter):
* **Numerical Ability (20 mins)**: High-yield focus on *Percentages, Profit & Loss, Time-Speed-Distance (Train problems), and Work & Time (L.C.M method)*.
* **Verbal Ability (25 mins)**: Sentence rearrangement, reading comprehension, and error spotting.
* **Reasoning Ability (25 mins)**: Blood relations, seating arrangement puzzles, and data sufficiency.

#### 2. Advanced Coding Section (Determines Ninja vs. Digital Offer):
* **Question 1 (Ninja Band ~3.5 LPA)**: Basic array traversal, string reversal/palindrome, or frequency count.
* **Question 2 (Digital Band ~7.5 LPA - 9 LPA)**: Hash Map lookup (Two Sum variation), matrix rotation, or greedy schedule simulation.

#### 🚀 Immediate Action Item:
Focus on **zero syntax errors** on Question 1. Passing all hidden test cases on Problem 1 guarantees your interview shortlist!`;
  }

  if (q.includes("ctc") || q.includes("fixed") || q.includes("variable") || q.includes("in hand") || q.includes("salary")) {
    return `### Demystifying Campus Offer Letters: Fixed CTC vs. Variable Pay

Many freshers expect a 6 LPA package to mean ₹50,000/month in their bank account. Here is how corporate CTC is actually structured:

| Component | What It Means | Typical Share |
|---|---|---|
| **Base / Fixed Pay** | Guaranteed monthly pre-tax salary | 65% - 75% of CTC |
| **Performance Variable Pay (PB)** | Paid quarterly/annually based on company & individual rating | 10% - 15% of CTC |
| **Joining Bonus** | One-time payment (often has a 1-year clawback clause) | 5% - 10% |
| **Gratuity & PF (Employer contribution)** | Retirement benefits deducted before payout | ~5% of CTC |

#### 💰 Real-World Example (6 LPA Package):
* **Annual Fixed**: ₹4,20,000 (~₹35,000/month)
* **Less PF & Professional Tax**: -₹2,800/month
* **Estimated In-Hand Take Home**: **₹31,500 – ₹33,000 / month**

#### 🔑 Mentor Tip:
Always ask the HR politely: *"Could you share the approximate percentage of Fixed Base Salary versus Performance Incentive in this offer band?"*`;
  }

  if (q.includes("non-cs") || q.includes("mechanical") || q.includes("civil") || q.includes("ece") || q.includes("electrical")) {
    return `### Cracking IT Placements as a Non-CS / Core Student

IT giants (TCS, Infosys, Cognizant, Accenture) hire thousands of non-CS engineers every year because **analytical curiosity and trainability** trump memorized textbooks.

#### 🎙️ Sample Introduction Script for Non-CS Students:
> *"Hello! Although my degree is in Mechanical / Electrical Engineering, I have always been fascinated by how automation and software power modern industrial systems. Over the past 8 months, I have committed daily hours to mastering core programming in Java, relational databases, and algorithmic logic. I built a practical web project that solved real-world scheduling, and I am excited to bring my analytical discipline and rapid learning velocity to [Company]."*

#### 3 Things Interviewers Love About Non-CS Candidates:
1. **Mathematical Rigor**: Core engineers often excel in aptitude and logical puzzles.
2. **High Trainability**: Proving you learned coding on your own shows unmatched self-motivation.
3. **Cross-Domain Perspective**: Understanding physical systems, sensors, or mechanics is huge for IoT, automotive, and industrial enterprise clients!`;
  }

  // Universal Default Placement Guidance
  return `### Essential Campus Placement Strategy for Zero-Skill Engineers

Placement success is driven by **daily velocity delta** rather than natural genius. Here is your 3-pillar blueprint:

1. **Aptitude First (Noise Filter)**:
   * Dedicate 30 minutes daily to *Time & Distance, Percentages, and Syllogisms*.
   * Campus portals disqualify candidates before reading a single line of your code if aptitude cutoffs aren't met.

2. **Core CS Fundamentals**:
   * Master the **4 Pillars of OOP** (Abstraction, Encapsulation, Inheritance, Polymorphism) using everyday physical analogies (like a smartphone or car).
   * Understand **SQL Primary Keys & JOINs** using spreadsheet table mental models.

3. **Interview Articulation & Composure**:
   * Speak your thought process aloud while solving a problem.
   * If you don't know a concept, use our **Safe Corporate Pivot**: *"I haven't encountered that specific tool in production, but my understanding of the underlying principle is..."*

What specific company or topic would you like to prepare for next?`;
}
