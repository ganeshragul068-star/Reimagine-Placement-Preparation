import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { role = "Full-Stack Web Dev", question = "", candidateAnswer = "", isStuck = false } = body;

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are a dual-mode AI Campus Placement Interviewer & Coach for "Placement Forge".
Target Engineering Role: ${role}

BEHAVIOR:
Case 1: If isStuck is true OR the candidate answer indicates confusion ("I don't know", "freeze", blank, fundamentally incorrect logic):
- Set status = "needs_mentorship"
- Act as an empathetic mentor.
- Fill "mentorFeedback" with:
  * mistakeAnalysis: Why this question often trips up students.
  * eli5Concept: Everyday physical analogy explaining the concept clearly.
  * corporatePivotPhrase: The exact polite, professional phrase a candidate can say to an interviewer when stuck (e.g., "While I haven't implemented distributed caching directly, my mental model is...").
  * vernacularTip: An intuitive Tanglish / regional colloquial tip.
- Award scoreDelta: 5 (rewarding self-awareness).
- Provide an accessible next retry question or bridge question.

Case 2: If the candidate gives a reasonably sound or accurate answer:
- Set status = "correct"
- Act as a sharp corporate technical interviewer praising their logic.
- Ask a deeper architectural follow-up question.
- Award scoreDelta: 10 or 15.

Return ONLY JSON matching this schema:
{
  "status": "correct" | "needs_mentorship",
  "interviewerReply": string,
  "mentorFeedback": {
    "mistakeAnalysis": string,
    "eli5Concept": string,
    "corporatePivotPhrase": string,
    "vernacularTip": string
  },
  "scoreDelta": number,
  "nextQuestion": string
}`;

        const prompt = `Question asked: "${question}"
Candidate Answer: """${candidateAnswer}"""
Is candidate stuck / requested mentor mode: ${isStuck}`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
          },
        });

        const parsed = JSON.parse(response.text?.trim() || "");
        return NextResponse.json(parsed);
      } catch (geminiError) {
        console.warn("Gemini call in interview API failed, switching to deterministic fallback:", geminiError);
      }
    }

    // Deterministic High-Fidelity Fallback
    const fallback = generateInterviewFallback(question, candidateAnswer, isStuck, role);
    return NextResponse.json(fallback);
  } catch (error) {
    console.error("Interview API error:", error);
    return NextResponse.json(
      {
        status: "needs_mentorship",
        interviewerReply: "Let's take a breath and step back. In campus placements, pausing to clarify is always respected.",
        mentorFeedback: {
          mistakeAnalysis: "Interviewers look for structural intuition rather than memorized code syntax.",
          eli5Concept: "Think of an API as a waiter taking food orders from a restaurant table to the kitchen.",
          corporatePivotPhrase: "I haven't encountered that exact scenario yet, but based on the core principles of stateless systems, I would structure it by...",
          vernacularTip: "Bayappadatheenga: Logic theriyala na, 'Intuition ithu thaan sir' nu direct ah solla kathukonga!"
        },
        scoreDelta: 5,
        nextQuestion: "Can you explain how a client sends data to a server using a simple HTTP POST request?"
      },
      { status: 200 }
    );
  }
}

function generateInterviewFallback(
  question: string,
  answer: string,
  isStuck: boolean,
  role: string
) {
  const lower = answer.toLowerCase().trim();
  const isConfused = isStuck || lower.includes("don't know") || lower.includes("dont know") || lower.includes("freeze") || lower.length < 15;

  if (isConfused) {
    if (question.toLowerCase().includes("sql") || question.toLowerCase().includes("database") || question.toLowerCase().includes("mongo")) {
      return {
        status: "needs_mentorship",
        interviewerReply: "No worries at all! Freezing on database comparisons is very common. Let's switch to Coach Mode and build your mental model right now.",
        mentorFeedback: {
          mistakeAnalysis: "Students often memorize 'SQL is relational, NoSQL is not' without understanding the physical trade-off.",
          eli5Concept: "SQL is an Excel ledger with strict columns. If you try putting an address in a phone number column, it blocks you. MongoDB is a box of handwritten receipts where each slip can have different fields.",
          corporatePivotPhrase: "In my college project, I chose SQL because the data schema was highly structured with relationships. If we anticipate unpredictable, document-heavy JSON payloads with rapid iterations, I would pivot toward a NoSQL document store.",
          vernacularTip: "SQL na Excel table maathiri, schema strict. NoSQL na flexi notepad maathiri. Interviewer keta structured data vs unstructured data difference ah focus pannunga!"
        },
        scoreDelta: 6,
        nextQuestion: "Now that you have the mental model, what is one reason why an e-commerce bank payment ledger MUST use a relational SQL database?"
      };
    }

    if (question.toLowerCase().includes("rest") || question.toLowerCase().includes("api") || question.toLowerCase().includes("http")) {
      return {
        status: "needs_mentorship",
        interviewerReply: "That's completely fine. Recognizing a knowledge boundary with composure is a leadership trait. Let's break it down together.",
        mentorFeedback: {
          mistakeAnalysis: "Students often confuse the HTTP protocol with the application logic itself.",
          eli5Concept: "An API is like Swiggy delivery. You (client) make an order, the delivery app transports it over HTTP, the restaurant (server) cooks the food, and sends it back in a package (JSON).",
          corporatePivotPhrase: "While I haven't tuned high-throughput production microservices, I understand REST as a stateless client-server contract using standard HTTP methods like GET for fetching and POST for state mutations.",
          vernacularTip: "REST API na client-server communication bridge. Swiggy delivery boy maathiri data va eduthutu poi tharum!"
        },
        scoreDelta: 6,
        nextQuestion: "Based on that, which HTTP method would you use if a user fills out a registration form to create a new student account?"
      };
    }

    return {
      status: "needs_mentorship",
      interviewerReply: "Great self-awareness! Saying 'I need a moment to formulate this' beats guessing random buzzwords 100% of the time.",
      mentorFeedback: {
        mistakeAnalysis: "Pressure causes candidates to rush into code instead of repeating the core requirements.",
        eli5Concept: "Always break technical problems into 3 boxes: 1. Input format -> 2. Transformation step -> 3. Expected output.",
        corporatePivotPhrase: "I haven't implemented that exact pattern in production yet, but if I were designing it from first principles, I would start by validating the invariants and measuring the space-time trade-off.",
        vernacularTip: "Question puriyala na, 'Can I take 30 seconds to think?' nu permission kelunga. Interviewer definitely appreciate pannuvaanga!"
      },
      scoreDelta: 5,
      nextQuestion: "Let's reset with a foundational check: How would you explain what an edge case is to a junior teammate?"
    };
  }

  // Answer is sound -> Sharp Interviewer Mode
  return {
    status: "correct",
    interviewerReply: `Strong technical reasoning! You articulated the core architectural constraints cleanly without getting bogged down in superficial syntax.`,
    mentorFeedback: {
      mistakeAnalysis: "None—your baseline logic was sound and confident.",
      eli5Concept: "You successfully defended the engineering trade-off.",
      corporatePivotPhrase: "To optimize this further under high concurrency, we could introduce a Redis caching layer or database read replicas.",
      vernacularTip: "Superb articulation! Intha confidence thaan TCS Digital and Product interviews la selection vaangi tharum."
    },
    scoreDelta: 12,
    nextQuestion: `Building on your answer: How would your system handle sudden 10x traffic spikes during campus drive registration hours?`
  };
}
