export type TargetCompany = 'mass_service' | 'product_tier1';
export type SkillLevel = 'beginner' | 'intermediate';
export type TargetTechnicalRole =
  | 'fullstack'
  | 'backend'
  | 'data_analyst'
  | 'qa_automation'
  | 'general_sde';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  targetCompany: TargetCompany;
  targetRole: TargetTechnicalRole;
  skillLevel: SkillLevel;
  isGuest: boolean;
  avatarSeed?: string;
  claimedProjects?: string[];
}

export interface RadarScores {
  logicAptitude: number;
  coreTech: number;
  problemSolving: number;
  articulation: number;
}

export interface BaselineStats {
  startingScore: number; // e.g. 20%
  currentScore: number;  // e.g. 34%
  weeklyVelocity: number; // e.g. +14%
  targetMatch: number;   // e.g. 68%
  completedDiagnostic: boolean;
  day0Score?: number;
}

export interface Blindspot {
  id: string;
  title: string;
  category: string;
  impact: 'High' | 'Critical' | 'Medium';
  recommendation: string;
  targetDayId: number;
  status: 'pending' | 'resolved';
}

export interface EvaluationResult {
  scoreDelta: number;
  conceptualScore: number;
  strengths: string[];
  missingGaps: string[];
  polishedAnswer: string;
  encouragement: string;
  timestamp?: string;
  conceptEvaluated?: string;
}

export interface ResumeAuditResult {
  day0Score: number;
  roleMatchPercent: number;
  extractedSkills: string[];
  transferableCompetencies: {
    area: string;
    evidence: string;
    industryEquivalent: string;
  }[];
  highPriorityGaps: string[];
  positiveSummary: string;
}

export interface MockInterviewExchange {
  questionNumber: number;
  question: string;
  role: string;
  candidateAnswer?: string;
  status?: 'correct' | 'needs_mentorship';
  interviewerReply?: string;
  mentorFeedback?: {
    mistakeAnalysis: string;
    eli5Concept: string;
    corporatePivotPhrase: string;
    vernacularTip: string;
  };
  scoreDelta?: number;
  timestamp?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  quickChips?: string[];
}

export interface RoadmapDay {
  id: number;
  dayNumber: number;
  title: string;
  category: 'Logic & Flow' | 'Core Tech' | 'Aptitude Intuition' | 'Problem Solving' | 'HR & Communication' | 'Target Role Tech';
  durationMins: number;
  description: string;
  status: 'completed' | 'active' | 'locked';
  learnContent: {
    eli5Title: string;
    eli5Body: string[];
    realWorldAnalogy: string;
    vernacularTip: {
      language: string;
      explanation: string;
      colloquialMnemonic: string;
    };
    keyRules: string[];
  };
  practiceProblem: {
    title: string;
    difficulty: 'Absolute Beginner' | 'Zero Gatekeeping' | 'Foundation' | 'Service Essential';
    scenario: string;
    task: string;
    starterCode: string;
    hints: [string, string, string]; // Hint 1, Hint 2, Full Solution
  };
  checkpointPrompt: {
    question: string;
    interviewerContext: string;
    expectedKeywords: string[];
  };
}

export interface VideoMasterclass {
  id: string;
  title: string;
  speaker: string;
  role: string;
  category: 'Zero-Skill Foundation' | 'Cracking HR & STAR Method' | 'CIT Alumni Placement Breakdown';
  duration: string;
  embedUrl: string;
  watchUrl?: string;
  youtubeId?: string;
  thumbnailGradient: string;
  takeaways: string[];
  timestamps: { time: string; label: string }[];
}
