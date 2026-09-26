# Placement Forge 🚀
> **The Zero-to-Offer Placement Operating System**

Placement Forge is an intelligent, high-velocity placement preparation platform built to take engineering students from absolute zero to cracking high-tier campus placements and product engineering interviews.

Featuring an ultra-clean, accessible **Light Theme** UI/UX with visual metric progress, interactive radars, AI-driven diagnostics, and realistic mock interview simulations.

---

## 🌟 Key Features

### 1. 🎯 Dynamic Target Role & Track Selection
- Tailor preparation specifically for distinct engineering tracks:
  - **Full-Stack Development**
  - **Data Analytics & Engineering**
  - **QA & Automation Testing**
  - **Cloud & DevOps Engineering**
  - **Core Java & Backend Systems**
- Automatically adjusts diagnostic baselines, interview questions, and roadmap milestones.

### 2. 📄 Reverse Resume & ATS Gap Analyzer
- Upload raw project notes, informal college coursework, or unstructured bullets.
- Transforms informal experience into high-impact, ATS-optimized STAR bullet points.
- Instant score comparison, gap detection, and one-click bullet replacement.

### 3. 🗺️ 14-Day Micro-Sprint & 30-Day Adaptive Roadmap
- 14-day bite-sized, high-yield action roadmap.
- Comprehensive 30-day deep dive covering Foundations, DSA, System Design, and Behavioral Masterclasses.
- Live readiness radar chart and velocity progression tracking.

### 4. ⚡ 3-Step Micro-Loop Practice Arena
- **Learn:** Colloquial mnemonics, visual concept breakdowns, and core rules.
- **Practice:** Interactive code workspace with starter code and progressive multi-tier hints.
- **Verify:** Placement checkpoint questions with keyword-based evaluation and AI review.

### 5. 🎙️ Realistic Adaptive Mock Interview & Mentor Pivot
- Real-time technical interview simulator with adaptive difficulty.
- Soft amber mentor recovery mode triggers if a student gets stuck, offering gentle scaffolding instead of brutal failure.
- Multi-dimensional scoring across Technical Accuracy, Communication, and Problem Decomposition.

### 6. 🎥 Curated Video Vault & Masterclass Library
- Embedded high-yield tutorials, alumni breakdowns, and HR interview masterclasses.
- Filter by category: Zero-Skill Foundation, Cracking HR & STAR Method, Alumni Placement Breakdowns.
- Modal to submit and curate new masterclass videos.

### 7. 🤖 ForgeBot 24/7 AI Placement Coach
- Integrated floating widget and full-page chat.
- Quick prompts for mock interview questions, resume critiques, and DSA explanations.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Visualizations:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript
- **AI Integration:** Google Gemini API (Mock interview, resume audit, and intelligent chat)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ganeshragul068-star/Reimagine-Placement-Preparation.git
   cd Reimagine-Placement-Preparation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Visit [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied).

---

## 🎨 Design Philosophy: Clean & Accessible Light Theme

- **Backgrounds:** Crisp slate-50 canvas with white elevated cards (`bg-white border-slate-200 shadow-sm`).
- **Accents:** Trustworthy Indigo (`bg-indigo-600`, `text-indigo-600`) for primary actions.
- **Velocity Indicator:** Crisp Emerald (`text-emerald-700`, `bg-emerald-50`) for wins and forward momentum.
- **Mentor Alerts:** Warm Amber (`bg-amber-50`, `border-amber-200`) for guidance and safe recovery.
- **Typography:** High-contrast slate typography (`text-slate-900`, `text-slate-600`) with clear hierarchy.

---

## 📂 Project Structure

```
src/
├── app/
│   ├── api/                 # API routes (chat, evaluate, interview, resume-audit)
│   ├── dashboard/           # Main application dashboard
│   │   ├── chat/            # ForgeBot full-page chat
│   │   ├── diagnostic/      # 3-step baseline diagnostic
│   │   ├── mock-interview/  # Real-time adaptive interview arena
│   │   ├── practice/        # 3-step micro-loop practice problems
│   │   ├── resume-audit/    # ATS & reverse resume builder
│   │   ├── roadmap/         # 14-day sprint & 30-day curriculum
│   │   └── video-vault/     # Alumni masterclass library
│   ├── login/               # Student intake & onboarding
│   ├── globals.css          # Theme variables & design utilities
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/
│   ├── charts/              # Recharts radar & velocity progression
│   ├── chat/                # Floating ForgeBot assistant widget
│   └── navigation/          # Sidebar & Topbar components
└── types/                   # Unified TypeScript definitions
```

---

## 📄 License
MIT License. Built for aspiring engineers aiming to conquer campus placement drives.
