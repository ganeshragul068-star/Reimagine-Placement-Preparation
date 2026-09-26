"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  UserProfile,
  RadarScores,
  BaselineStats,
  Blindspot,
  EvaluationResult,
  TargetCompany,
  SkillLevel,
  TargetTechnicalRole,
  ResumeAuditResult,
  MockInterviewExchange,
} from "@/types";

interface AppContextType {
  user: UserProfile;
  baselineStats: BaselineStats;
  radarScores: RadarScores;
  targetBenchmark: RadarScores;
  blindspots: Blindspot[];
  completedDays: number[];
  activeDay: number;
  streak: number;
  totalMinutesSpent: number;
  evaluationHistory: EvaluationResult[];
  resumeAudit: ResumeAuditResult | null;
  mockInterviewHistory: MockInterviewExchange[];
  
  // Actions
  setUserData: (data: Partial<UserProfile>) => void;
  setTargetRole: (role: TargetTechnicalRole) => void;
  setResumeAudit: (audit: ResumeAuditResult) => void;
  addMockInterviewExchange: (exchange: MockInterviewExchange) => void;
  loginAsGuest: (name?: string, targetCompany?: TargetCompany, skillLevel?: SkillLevel, targetRole?: TargetTechnicalRole) => void;
  completeDiagnostic: (scores: { logicAptitude: number; coreTech: number; problemSolving: number; articulation: number }, isZeroBaseline?: boolean) => void;
  addEvaluation: (evalResult: EvaluationResult, dayId: number, category?: string) => void;
  markDayCompleted: (dayId: number) => void;
  setActiveDay: (dayId: number) => void;
  resolveBlindspot: (id: string) => void;
  resetProgress: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: "guest-user-1",
  name: "Priya Sharma",
  email: "priya.sharma@campus.edu",
  targetCompany: "mass_service",
  targetRole: "fullstack",
  skillLevel: "beginner",
  isGuest: true,
  avatarSeed: "priya",
  claimedProjects: ["Campus Canteen Billing Form", "Student Course Attendance Sheet"],
};

const DEFAULT_BASELINE: BaselineStats = {
  startingScore: 20,
  currentScore: 28,
  weeklyVelocity: 14, // +14% this week
  targetMatch: 64,    // 64% match with TCS/CTS/Infosys baseline
  completedDiagnostic: false,
  day0Score: 24,
};

const DEFAULT_RADAR: RadarScores = {
  logicAptitude: 28,
  coreTech: 20,
  problemSolving: 24,
  articulation: 32,
};

const ROLE_BENCHMARKS: Record<TargetTechnicalRole, RadarScores> = {
  fullstack: {
    logicAptitude: 70,
    coreTech: 75,
    problemSolving: 65,
    articulation: 75,
  },
  backend: {
    logicAptitude: 75,
    coreTech: 85,
    problemSolving: 75,
    articulation: 70,
  },
  data_analyst: {
    logicAptitude: 85,
    coreTech: 65,
    problemSolving: 75,
    articulation: 75,
  },
  qa_automation: {
    logicAptitude: 70,
    coreTech: 70,
    problemSolving: 65,
    articulation: 80,
  },
  general_sde: {
    logicAptitude: 75,
    coreTech: 70,
    problemSolving: 70,
    articulation: 75,
  },
};

const ROLE_BLINDSPOTS: Record<TargetTechnicalRole, Blindspot[]> = {
  fullstack: [
    {
      id: "blindspot-fs-1",
      title: "Client-Server State Invalidation",
      category: "Target Role Tech",
      impact: "Critical",
      recommendation: "Review how stateless REST APIs sync with frontend client forms.",
      targetDayId: 8,
      status: "pending",
    },
    {
      id: "blindspot-fs-2",
      title: "Defensive Boundary & Input Checks",
      category: "Logic & Flow",
      impact: "High",
      recommendation: "Practice Day 1 ATM withdrawal <= 0 guards to prevent test-case leaks.",
      targetDayId: 1,
      status: "pending",
    },
  ],
  backend: [
    {
      id: "blindspot-be-1",
      title: "SQL Indexing vs Full Table Scans",
      category: "Target Role Tech",
      impact: "Critical",
      recommendation: "Understand primary keys and B-Tree indexing on Day 8 database sprint.",
      targetDayId: 8,
      status: "pending",
    },
    {
      id: "blindspot-be-2",
      title: "Space-Time Tradeoff Vocalization (Big-O)",
      category: "Problem Solving",
      impact: "High",
      recommendation: "Master the 'Study Desk vs Shelf' analogy on Day 6.",
      targetDayId: 6,
      status: "pending",
    },
  ],
  data_analyst: [
    {
      id: "blindspot-da-1",
      title: "Multi-Table JOINs & NULL Value Traps",
      category: "Target Role Tech",
      impact: "Critical",
      recommendation: "Practice INNER vs LEFT JOIN behavior with missing student records.",
      targetDayId: 8,
      status: "pending",
    },
    {
      id: "blindspot-da-2",
      title: "Mental Percentage & Ratio Estimation",
      category: "Aptitude & Logic",
      impact: "High",
      recommendation: "Review the 10% / 1% mental math cheat sheet on Day 4.",
      targetDayId: 4,
      status: "pending",
    },
  ],
  qa_automation: [
    {
      id: "blindspot-qa-1",
      title: "Boundary Value Analysis (Off-by-One)",
      category: "Target Role Tech",
      impact: "Critical",
      recommendation: "Ensure loop counter boundaries check < vs <= conditions on Day 2.",
      targetDayId: 2,
      status: "pending",
    },
    {
      id: "blindspot-qa-2",
      title: "Defending Quality Bugs in STAR Format",
      category: "Articulation & HR",
      impact: "High",
      recommendation: "Adopt the Situation-Task-Action-Result format on Day 12.",
      targetDayId: 12,
      status: "pending",
    },
  ],
  general_sde: [
    {
      id: "blindspot-sde-1",
      title: "Defensive Boundary Validation",
      category: "Logic & Flow",
      impact: "Critical",
      recommendation: "Review Day 1 ATM logic on <= 0 guards to prevent test-case failures.",
      targetDayId: 1,
      status: "pending",
    },
    {
      id: "blindspot-sde-2",
      title: "Space-Time Tradeoff Vocalization (Big-O)",
      category: "Problem Solving",
      impact: "High",
      recommendation: "Master the 'Study Desk vs Shelf' analogy on Day 6.",
      targetDayId: 6,
      status: "pending",
    },
  ],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = "placement_forge_state_v2";

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [baselineStats, setBaselineStats] = useState<BaselineStats>(DEFAULT_BASELINE);
  const [radarScores, setRadarScores] = useState<RadarScores>(DEFAULT_RADAR);
  const [blindspots, setBlindspots] = useState<Blindspot[]>(ROLE_BLINDSPOTS.fullstack);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [activeDay, setActiveDay] = useState<number>(1);
  const [streak, setStreak] = useState<number>(3);
  const [totalMinutesSpent, setTotalMinutesSpent] = useState<number>(85);
  const [evaluationHistory, setEvaluationHistory] = useState<EvaluationResult[]>([]);
  const [resumeAudit, setResumeAudit] = useState<ResumeAuditResult | null>(null);
  const [mockInterviewHistory, setMockInterviewHistory] = useState<MockInterviewExchange[]>([]);

  // Hydrate from localStorage on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.user) setUser(parsed.user);
        if (parsed.baselineStats) setBaselineStats(parsed.baselineStats);
        if (parsed.radarScores) setRadarScores(parsed.radarScores);
        if (parsed.blindspots) setBlindspots(parsed.blindspots);
        if (parsed.completedDays) setCompletedDays(parsed.completedDays);
        if (parsed.activeDay) setActiveDay(parsed.activeDay);
        if (typeof parsed.streak === "number") setStreak(parsed.streak);
        if (typeof parsed.totalMinutesSpent === "number") setTotalMinutesSpent(parsed.totalMinutesSpent);
        if (parsed.evaluationHistory) setEvaluationHistory(parsed.evaluationHistory);
        if (parsed.resumeAudit) setResumeAudit(parsed.resumeAudit);
        if (parsed.mockInterviewHistory) setMockInterviewHistory(parsed.mockInterviewHistory);
      }
    } catch (e) {
      console.warn("Could not read local storage state:", e);
    }
    setMounted(true);
  }, []);

  // Save to localStorage on state changes
  useEffect(() => {
    if (!mounted) return;
    try {
      const stateToSave = {
        user,
        baselineStats,
        radarScores,
        blindspots,
        completedDays,
        activeDay,
        streak,
        totalMinutesSpent,
        evaluationHistory,
        resumeAudit,
        mockInterviewHistory,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn("Could not save to local storage:", e);
    }
  }, [
    user,
    baselineStats,
    radarScores,
    blindspots,
    completedDays,
    activeDay,
    streak,
    totalMinutesSpent,
    evaluationHistory,
    resumeAudit,
    mockInterviewHistory,
    mounted,
  ]);

  const targetBenchmark = ROLE_BENCHMARKS[user.targetRole] || ROLE_BENCHMARKS.fullstack;

  const setUserData = (data: Partial<UserProfile>) => {
    setUser((prev) => {
      const updated = { ...prev, ...data };
      if (data.targetRole && data.targetRole !== prev.targetRole) {
        setBlindspots(ROLE_BLINDSPOTS[data.targetRole] || ROLE_BLINDSPOTS.general_sde);
      }
      return updated;
    });
  };

  const setTargetRole = (role: TargetTechnicalRole) => {
    setUser((prev) => ({ ...prev, targetRole: role }));
    setBlindspots(ROLE_BLINDSPOTS[role] || ROLE_BLINDSPOTS.general_sde);
  };

  const loginAsGuest = (
    name = "Karthik Raman",
    targetCompany: TargetCompany = "mass_service",
    skillLevel: SkillLevel = "beginner",
    targetRole: TargetTechnicalRole = "fullstack"
  ) => {
    setUser({
      id: "guest-" + Date.now(),
      name: name || "Guest Candidate",
      email: "guest@placementforge.io",
      targetCompany,
      targetRole,
      skillLevel,
      isGuest: true,
      avatarSeed: "guest",
      claimedProjects: ["Hostel Attendance Portal", "Student Marksheet Database"],
    });
    setBlindspots(ROLE_BLINDSPOTS[targetRole] || ROLE_BLINDSPOTS.general_sde);
  };

  const completeDiagnostic = (
    scores: { logicAptitude: number; coreTech: number; problemSolving: number; articulation: number },
    isZeroBaseline = false
  ) => {
    const calculatedRadar: RadarScores = isZeroBaseline
      ? { logicAptitude: 24, coreTech: 20, problemSolving: 22, articulation: 26 }
      : {
          logicAptitude: Math.max(15, Math.min(85, scores.logicAptitude)),
          coreTech: Math.max(15, Math.min(85, scores.coreTech)),
          problemSolving: Math.max(15, Math.min(85, scores.problemSolving)),
          articulation: Math.max(15, Math.min(85, scores.articulation)),
        };

    const avgBaseline = Math.round(
      (calculatedRadar.logicAptitude +
        calculatedRadar.coreTech +
        calculatedRadar.problemSolving +
        calculatedRadar.articulation) / 4
    );

    const matchTarget = Math.round((avgBaseline / 70) * 100);

    setRadarScores(calculatedRadar);
    setBaselineStats({
      startingScore: avgBaseline,
      currentScore: avgBaseline,
      weeklyVelocity: 14, // starting positive velocity
      targetMatch: Math.min(95, Math.max(30, matchTarget)),
      completedDiagnostic: true,
      day0Score: resumeAudit?.day0Score || 24,
    });
  };

  const markDayCompleted = (dayId: number) => {
    if (!completedDays.includes(dayId)) {
      setCompletedDays((prev) => [...prev, dayId]);
    }
    if (dayId >= activeDay && dayId < 14) {
      setActiveDay(dayId + 1);
    }
  };

  const resolveBlindspot = (id: string) => {
    setBlindspots((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "resolved" } : b))
    );
  };

  const addEvaluation = (evalResult: EvaluationResult, dayId: number, category?: string) => {
    setEvaluationHistory((prev) => [evalResult, ...prev]);

    // Boost score & velocity
    const boost = evalResult.scoreDelta || 10;
    
    setBaselineStats((prev) => {
      const newCurrent = Math.min(98, prev.currentScore + Math.round(boost * 0.7));
      const newVelocity = prev.weeklyVelocity + 3;
      const targetBase = user.targetCompany === "mass_service" ? 70 : 85;
      const newMatch = Math.min(98, Math.round((newCurrent / targetBase) * 100));

      return {
        ...prev,
        currentScore: newCurrent,
        weeklyVelocity: newVelocity,
        targetMatch: newMatch,
      };
    });

    // Update Radar axis
    setRadarScores((prev) => {
      const copy = { ...prev };
      if (category === "Logic & Flow" || dayId === 1 || dayId === 2) {
        copy.logicAptitude = Math.min(95, copy.logicAptitude + 10);
        copy.problemSolving = Math.min(95, copy.problemSolving + 6);
      } else if (category === "Core Tech" || category === "Target Role Tech") {
        copy.coreTech = Math.min(95, copy.coreTech + 12);
        copy.problemSolving = Math.min(95, copy.problemSolving + 5);
      } else if (category === "HR & Communication" || dayId === 12 || dayId === 13) {
        copy.articulation = Math.min(95, copy.articulation + 14);
      } else {
        copy.problemSolving = Math.min(95, copy.problemSolving + 10);
        copy.logicAptitude = Math.min(95, copy.logicAptitude + 8);
      }
      return copy;
    });

    // Mark day as completed
    markDayCompleted(dayId);

    // Increase total time & streak
    setTotalMinutesSpent((prev) => prev + 35);
  };

  const addMockInterviewExchange = (exchange: MockInterviewExchange) => {
    setMockInterviewHistory((prev) => [exchange, ...prev]);
    if (exchange.scoreDelta) {
      setBaselineStats((prev) => ({
        ...prev,
        weeklyVelocity: prev.weeklyVelocity + 2,
        currentScore: Math.min(98, prev.currentScore + Math.round(exchange.scoreDelta! * 0.4)),
      }));
    }
  };

  const resetProgress = () => {
    setUser(DEFAULT_USER);
    setBaselineStats(DEFAULT_BASELINE);
    setRadarScores(DEFAULT_RADAR);
    setBlindspots(ROLE_BLINDSPOTS.fullstack);
    setCompletedDays([]);
    setActiveDay(1);
    setStreak(1);
    setTotalMinutesSpent(15);
    setEvaluationHistory([]);
    setResumeAudit(null);
    setMockInterviewHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <AppContext.Provider
      value={{
        user,
        baselineStats,
        radarScores,
        targetBenchmark,
        blindspots,
        completedDays,
        activeDay,
        streak,
        totalMinutesSpent,
        evaluationHistory,
        resumeAudit,
        mockInterviewHistory,
        setUserData,
        setTargetRole,
        setResumeAudit,
        addMockInterviewExchange,
        loginAsGuest,
        completeDiagnostic,
        addEvaluation,
        markDayCompleted,
        setActiveDay,
        resolveBlindspot,
        resetProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppStateProvider");
  }
  return context;
}
