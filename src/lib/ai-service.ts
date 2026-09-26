import { GoogleGenAI } from "@google/genai";
import { EvaluationResult } from "@/types";

export interface EvaluationInput {
  concept: string;
  userResponse: string;
  skillLevel?: string;
  expectedKeywords?: string[];
  dayId?: number;
}

export async function evaluateConceptResponse(input: EvaluationInput): Promise<EvaluationResult> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  // If no API key is provided, use our intelligent deterministic fallback
  if (!apiKey) {
    return generateDeterministicFallback(input);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are Placement Forge, an empathetic, top-tier campus placement interviewer and mentor.
Your mission is to boost the confidence of zero-skill college students, celebrate their authentic thinking, pinpoint subtle conceptual blindspots gently, and model professional software engineering articulation.

Evaluate the student's explanation of the concept: "${input.concept}".
Target Student Skill Level: "${input.skillLevel || 'beginner'}".
Expected Technical Keywords/Concepts: ${JSON.stringify(input.expectedKeywords || [])}.

Return ONLY valid JSON matching this exact schema:
{
  "scoreDelta": number (integer between 8 and 15 representing readiness velocity boost earned),
  "conceptualScore": number (integer between 65 and 95 based on technical clarity and intuition),
  "strengths": string[] (2-3 concrete bullet points praising what the student got right or intuitive thinking shown),
  "missingGaps": string[] (1-2 constructive points highlighting edge cases, formal terminology, or trade-offs they omitted),
  "polishedAnswer": string (How a Tech Lead / Senior Interviewer would phrase this exact answer crisply in 2-3 sentences),
  "encouragement": string (An uplifting, empathetic sentence motivating them to keep their velocity high)
}`;

    const prompt = `Student's Response:
"""
${input.userResponse}
"""

Evaluate this response constructively as instructed. Provide the structured JSON output.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text?.trim() || "";
    const parsed = JSON.parse(responseText) as EvaluationResult;

    // Validate structure
    return {
      scoreDelta: typeof parsed.scoreDelta === "number" ? parsed.scoreDelta : 10,
      conceptualScore: typeof parsed.conceptualScore === "number" ? parsed.conceptualScore : 82,
      strengths: Array.isArray(parsed.strengths) && parsed.strengths.length > 0 ? parsed.strengths : [
        "Identified the core decision logic accurately.",
        "Clear intent and step-by-step thinking shown."
      ],
      missingGaps: Array.isArray(parsed.missingGaps) && parsed.missingGaps.length > 0 ? parsed.missingGaps : [
        "Could mention boundary/edge cases more explicitly (e.g. 0 or negative limits)."
      ],
      polishedAnswer: parsed.polishedAnswer || "When validating transaction limits, verify all invariant checks before state mutation.",
      encouragement: parsed.encouragement || "Great intuition! You're thinking like an engineer already. Keep this momentum!"
    };
  } catch (error) {
    console.warn("Gemini API call failed or encountered error, switching to deterministic fallback:", error);
    return generateDeterministicFallback(input);
  }
}

/**
 * High-fidelity deterministic fallback engine for offline or mock scenarios
 */
export function generateDeterministicFallback(input: EvaluationInput): EvaluationResult {
  const text = input.userResponse.toLowerCase().trim();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const concept = input.concept || "Variables, Flow & Real-World Logic";

  // Check keyword matches if available
  const keywords = input.expectedKeywords || ["condition", "check", "limit", "edge", "balance", "negative", "loop", "time"];
  const matchedKeywords = keywords.filter(k => text.includes(k.toLowerCase()));

  // Calculate realistic score delta and conceptual score
  let scoreDelta = 10;
  let conceptualScore = 78;

  if (wordCount > 25 && matchedKeywords.length >= 2) {
    scoreDelta = 12;
    conceptualScore = 88;
  } else if (wordCount > 12) {
    scoreDelta = 10;
    conceptualScore = 80;
  } else {
    scoreDelta = 8;
    conceptualScore = 72;
  }

  // Generate topic-tailored feedback
  if (concept.toLowerCase().includes("atm") || concept.toLowerCase().includes("flow") || concept.toLowerCase().includes("variable")) {
    return {
      scoreDelta,
      conceptualScore,
      strengths: [
        "Understood the necessity of defensive guards before money or state is modified.",
        `Grasped how boundary limits prevent unintended system overdraws${matchedKeywords.length > 0 ? ` (mentioned ${matchedKeywords.join(", ")})` : ""}.`
      ],
      missingGaps: [
        "Could explicitly articulate the difference between strict inequality ('>') and boundary equality ('>=').",
        "Consider mentioning atomic transaction rollback in case of hardware or network timeouts."
      ],
      polishedAnswer: `In an enterprise banking system, defensive validation prevents exploits: we verify invariant conditions (non-negative amount, account balance ceiling, and daily regulatory limit) before executing the withdrawal transaction. This guarantees data integrity and eliminates race conditions.`,
      encouragement: "Terrific job! You've grasped how real banking systems guard against edge cases. Your velocity is accelerating!"
    };
  } else if (concept.toLowerCase().includes("loop") || concept.toLowerCase().includes("infinite")) {
    return {
      scoreDelta,
      conceptualScore,
      strengths: [
        "Clear recognition that every repetitive engine requires an unreachable exit condition.",
        "Demonstrated intuitive understanding of counter mutation and termination checks."
      ],
      missingGaps: [
        "Make sure to highlight that CPU usage spikes to 100% on a hung single-threaded event loop.",
        "Mention unit test timeouts or liveness watchdog timers as secondary safety nets."
      ],
      polishedAnswer: `An infinite loop occurs when the loop invariant fails to progress toward its termination boundary, causing thread starvation and high CPU utilization. We safeguard against this via strict bounds checking, counter increment assertions, and watchdog timeout limits.`,
      encouragement: "Superb analytical reasoning! Zero-skill students often fear loops, but you just articulated the termination mechanics with total clarity."
    };
  } else if (concept.toLowerCase().includes("array") || concept.toLowerCase().includes("memory")) {
    return {
      scoreDelta,
      conceptualScore,
      strengths: [
        "Understood the physical intuition of numbered slots and contiguous memory layout.",
        "Accurately recognized why 0-indexed memory offsets yield instant O(1) random access."
      ],
      missingGaps: [
        "Explain that arrays require pre-allocated contiguous memory blocks, making mid-array insertions O(N).",
        "Differentiate between physical memory addresses and zero-based index offsets."
      ],
      polishedAnswer: `Arrays provide O(1) random access because elements are stored contiguously in memory; the memory address of index 'i' is computed directly via the formula: Base Address + (i * elementSize). No pointer traversal is necessary.`,
      encouragement: "Outstanding! You explained contiguous memory using pure logic rather than memorized jargon. Interviewers at TCS and Cognizant love this!"
    };
  } else if (concept.toLowerCase().includes("time") || concept.toLowerCase().includes("complexity") || concept.toLowerCase().includes("two sum")) {
    return {
      scoreDelta,
      conceptualScore,
      strengths: [
        "Correctly contrasted the quadratic growth O(N^2) against the linear lookup performance O(N).",
        "Understood the classic computer science trade-off: trading auxiliary space (Hash Map) for speed."
      ],
      missingGaps: [
        "Specify the hash collision worst-case behavior (which degrades O(1) to O(N) if unhandled).",
        "Remember to discuss auxiliary memory consumption constraints in memory-restricted embedded environments."
      ],
      polishedAnswer: `The O(N) Hash Map approach reduces quadratic nested-loop time to linear by storing visited elements as keys with their indices as values. We make a deliberate space-time trade-off: allocating O(N) additional memory to achieve sub-millisecond lookups.`,
      encouragement: "Top tier articulation! You just defended a core algorithmic trade-off like a senior engineer. Take pride in this velocity!"
    };
  }

  // Universal fallback for communication/STAR or general questions
  return {
    scoreDelta,
    conceptualScore,
    strengths: [
      "Natural and authentic tone without robotic textbook recitation.",
      "Clear articulation of the primary cause and practical outcome."
    ],
    missingGaps: [
      "Could incorporate one specific metric or numerical improvement (e.g. 'reduced time by 20%').",
      "Adopt the STAR structure (Situation, Task, Action, Result) for even tighter clarity."
    ],
    polishedAnswer: `When communicating this in a placement drive: State the core objective directly, articulate the specific technical action you took, and conclude with the measurable positive impact on the team or system.`,
    encouragement: "You spoke with genuine clarity and confidence! That is exactly what placement interviewers look for. Keep building your daily streak!"
  };
}
