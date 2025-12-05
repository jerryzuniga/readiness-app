import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, ChevronLeft, Check, Printer, ArrowRight, 
  BarChart3, ClipboardCheck, Home, Info, User, Menu,
  Handshake, Wrench, Users, FileText, Download, Share2,
  AlertCircle, BookOpen, Clock, Save, TrendingUp 
} from 'lucide-react';

// --- DATA MODEL (Strictly aligned with Readiness Manual v1.2) ---
const LEVELS = ["Inactive", "Aware", "Exploring", "Planning", "Preparing", "Ready"];

// Stage Definitions for the Overview Paragraph
const STAGE_DEFINITIONS = {
  "Inactive": "Your organization is at the Inactive stage. At this level, home repair is likely not yet a strategic priority. The focus is on building basic awareness among leadership and understanding why a repair program matters for your community.",
  "Aware": "Your organization is at the Aware stage. You recognize the need for home repairs but haven't formalized plans. The priority now is to educate the board, identify potential resources, and move from general interest to specific intent.",
  "Exploring": "Your organization is at the Exploring stage. You are actively investigating feasibility. The team should focus on gathering community data, assessing internal capacity, and determining if a repair program aligns with your mission.",
  "Planning": "Your organization is at the Planning stage. You have identified key gaps and are aligning around strategies. It is time to develop concrete roadmaps, draft policies, and secure initial commitments to move toward a pilot.",
  "Preparing": "Your organization is at the Preparing stage. You have a plan in place and are mobilizing resources. Focus on finalizing internal systems, training staff, and securing funding to ensure a successful launch.",
  "Ready": "Your organization is at the Ready stage. You are positioned for implementation or scale. The focus shifts to execution, sustainability, measuring impact, and deepening partnerships for long-term success."
};

// UPDATED LEVEL STYLES (Grey -> Red -> Orange -> Yellow -> Light Green -> Dark Green)
// Added 'hex' property for inline styling of dynamic elements like the score circle
const LEVEL_STYLES = [
  { header: "bg-[#94A3B8] text-white", body: "bg-slate-50 border-slate-200", label: "Inactive", hex: "#94A3B8", textClass: "text-white" },   // Grey
  { header: "bg-[#EF5350] text-white", body: "bg-red-50 border-red-200", label: "Aware", hex: "#EF5350", textClass: "text-white" },      // Red
  { header: "bg-[#FFB74D] text-gray-800", body: "bg-orange-50 border-orange-200", label: "Exploring", hex: "#FFB74D", textClass: "text-gray-800" }, // Orange
  { header: "bg-[#FFD54F] text-gray-800", body: "bg-yellow-50 border-yellow-200", label: "Planning", hex: "#FFD54F", textClass: "text-gray-800" },  // Yellow
  { header: "bg-[#AED581] text-gray-800", body: "bg-lime-50 border-lime-200", label: "Preparing", hex: "#AED581", textClass: "text-gray-800" }, // Light Green
  { header: "bg-[#4CAF50] text-white", body: "bg-green-50 border-green-200", label: "Ready", hex: "#4CAF50", textClass: "text-white" }     // Dark Green
];

// Icon colors corresponding to scores (1-6)
const SCORE_ICON_COLORS = [
  "bg-slate-100 text-slate-600",   // 1: Inactive (Grey)
  "bg-red-100 text-red-700",       // 2: Aware (Red)
  "bg-orange-100 text-orange-800", // 3: Exploring (Orange)
  "bg-yellow-100 text-yellow-800", // 4: Planning (Yellow)
  "bg-lime-100 text-lime-700",     // 5: Preparing (Light Green)
  "bg-green-100 text-green-700"    // 6: Ready (Green)
];

// Context descriptions for the 5 Factors
const FACTOR_DESCRIPTIONS = {
  "Capacity of Affiliate": "This factor looks at your internal commitment, people, and systems to support a formal home repair program, not just occasional activities. It evaluates governance, leadership alignment, and operational readiness.",
  "Repair Program Need": "This section examines the housing repair needs in your service area and your organization's internal drivers for seeking capacity support. It ensures your vision is rooted in real conditions.",
  "Soundness of Approach": "This factor evaluates the quality of your plan. It checks if you have thought through your goals, training strategy, and plans for applying what is learned.",
  "Leverage and Partnerships": "This factor measures your ability to identify, secure, and apply additional resources (financial, volunteer, technical) and build partnerships to advance readiness.",
  "Impact & Sustainability": "This final factor looks at the long-term difference this effort will make. It assesses your vision for sustained program impact and broader community benefit."
};

const SUB_FACTORS = [
  // --- FACTOR 1: CAPACITY ---
  {
    id: "f1s1", factor: "Capacity of Affiliate", name: "Leadership & Board Commitment",
    q: "How would you rate your organization’s leadership and board commitment toward developing a home repair program?",
    context: "This sub-factor looks at how clearly leadership and the board understand, prioritize, and sponsor home repair work. It reflects shared vision, strategic alignment, and willingness to authorize time, staff, and resources.",
    desc: [
      "No awareness or discussion of home repairs among the board or leadership team.",
      "Some awareness exists, but repair is not part of formal priorities.",
      "Leadership has begun discussing potential value of home repairs.",
      "Repairs are discussed regularly and basic plans are forming.",
      "Leadership is taking early steps like assigning staff or approving concepts.",
      "Housing preservation is embedded in strategy with active preparation for launch."
    ],
    tips: {
      1: "Begin by educating leadership on why repairs matter. Review local data on vulnerable populations.",
      2: "Use board meetings to introduce housing preservation. Invite a peer affiliate to present.",
      3: "Form a working group to explore feasibility. Draft a short concept paper.",
      4: "Develop a strategic roadmap. Align board around timing and goals.",
      5: "Draft a board-approved repair policy and outline staffing models.",
      6: "Finalize resource allocation and develop a Repair-focused Policies & Procedures manual."
    }
  },
  {
    id: "f1s2", factor: "Capacity of Affiliate", name: "Staff Commitment",
    q: "How prepared and committed is your staff to engage in training and apply what is learned?",
    context: "This sub-factor looks at staff ownership and enthusiasm for home repairs. It considers whether people understand the purpose, see repairs as part of their job, and are ready to adjust workflows to support a formal program.",
    desc: [
      "No staff assigned or identified to participate.",
      "General support, but limited staff enthusiasm or capacity.",
      "One or two staff named, but roles are unclear.",
      "Specific staff selected for training and planning.",
      "Staff scheduled for learning and assigned to planning steps.",
      "Team fully committed, engaged, and equipped."
    ],
    tips: {
      1: "Start internal discussions. Identify who would lead repairs.",
      2: "Present the vision to staff. Connect repairs to the mission.",
      3: "Clarify roles. Develop a simple staff readiness plan.",
      4: "Develop a training plan aligned with milestones (e.g., intake design).",
      5: "Ensure staff have time to implement learning (e.g., pilot a mock intake).",
      6: "Map people procedures like intake to better understand role clarity."
    }
  },
  {
    id: "f1s3", factor: "Capacity of Affiliate", name: "Internal Systems",
    q: "How well has your organization planned for improvements to key systems (admin, tools, etc.)?",
    context: "This sub-factor looks at the internal systems that would carry a repair program. It examines data, financial, HR, and project management tools and whether they can reliably support intake, tracking, reporting, and compliance.",
    desc: [
      "No resource needs identified or systems in place.",
      "Awareness that systems need attention, but no plan yet.",
      "Initial conversations on tracking tools and workflow started.",
      "System needs identified; early budgeting underway.",
      "Written plan in place; implementation scheduled.",
      "Fully developed, actionable system plan in place."
    ],
    tips: {
      1: "Review current systems. Identify where existing procedures fall short.",
      2: "Document known limitations. Assess gaps with finance/ops staff.",
      3: "Assign team members to explore solutions or test lightweight tools.",
      4: "Create a system readiness plan for the coming year.",
      5: "Execute key areas (intake database, procurement) and train staff.",
      6: "Align internal tools with HFHI’s Project Lifecycle and compliance."
    }
  },

  // --- FACTOR 2: NEED ---
  {
    id: "f2s1", factor: "Repair Program Need", name: "Housing Stabilization Needs",
    q: "How well has your organization determined housing repair needs within your community?",
    context: "This sub-factor looks at how well you understand repair needs in the community. It reflects use of local data, partnerships, and lived experience to identify which households, neighborhoods, and issues require the most attention.",
    desc: [
      "No data gathered on local repair needs.",
      "Anecdotal understanding only.",
      "Initial lists or feedback collected but not analyzed.",
      "Specific needs identified via early data collection.",
      "Clear understanding supported by data sources.",
      "Strong data-driven understanding (waitlists, assessments)."
    ],
    tips: {
      1: "Collect basic indicators (public health data, census data).",
      2: "Engage local partners (agencies, churches) to ask about trends.",
      3: "Start a waiting list or track inquiries to capture real data.",
      4: "Create a summary slide deck illustrating needs and costs.",
      5: "Align repair priorities (e.g., roofing, HVAC) with actual needs.",
      6: "Use this data in funding proposals and board discussions."
    }
  },
  {
    id: "f2s2", factor: "Repair Program Need", name: "Organizational Need",
    q: "How clearly has your organization identified the need for capacity building to support programming?",
    context: "This sub-factor looks at how repair work fits your affiliate's own needs and strategy. It considers mission alignment, business model implications, and how repairs can strengthen existing construction, mortgage, and community efforts.",
    desc: [
      "No connection made between gaps and capacity building.",
      "Vague understanding of internal gaps.",
      "Some gaps acknowledged but not linked to strategy.",
      "Gaps prioritized; exploration begun.",
      "Defined plan exists aligned with goals.",
      "Investments justified with data and linked to sustainability."
    ],
    tips: {
      1: "Map where the affiliate feels stretched (staff, tools, training).",
      2: "Discuss 'what is missing' to be prepared for repairs.",
      3: "Draft a working list of needs tied to program startup.",
      4: "Define how addressing gaps will strengthen service delivery.",
      5: "Document needs in a brief for leadership or funders.",
      6: "Package capacity needs into a formal funding plan."
    }
  },
  {
    id: "f2s3", factor: "Repair Program Need", name: "Urgency and Timing",
    q: "How timely is this capacity-building opportunity for your organization or community?",
    context: "This sub-factor looks at whether now is the right moment to invest in repairs. It captures external drivers like funding or disasters and internal capacity to act so that the program launches at a sustainable pace.",
    desc: [
      "No urgency recognized.",
      "Early signs of alignment surfacing.",
      "Timing aligns but no external driver.",
      "Fits within near-term planning cycles.",
      "Specific pressures (funding, disaster) make this ideal.",
      "High-urgency needs (post-disaster, policy change) documented."
    ],
    tips: {
      1: "Evaluate aging housing stock or disaster vulnerability.",
      2: "Gather testimonials suggesting services are timely.",
      3: "Confirm timing aligns with board cycles/staff availability.",
      4: "Integrate preservation into strategic discussions/budgeting.",
      5: "Request HFHI TA or monitor funding to act quickly.",
      6: "Seek partnerships and submit funding requests immediately."
    }
  },

  // --- FACTOR 3: APPROACH ---
  {
    id: "f3s1", factor: "Soundness of Approach", name: "Clarity of Goals",
    q: "How clearly defined and realistic are your goals for this capacity-building grant?",
    context: "This sub-factor looks at how clearly you have defined the purpose of a repair program. It evaluates whether goals are specific, measurable, and tied to outcomes for households, properties, and the wider community.",
    desc: [
      "No goals identified.",
      "Goals aspirational but not measurable.",
      "Goals exist but not tied to readiness.",
      "Goals include specific, measurable results.",
      "Specific, realistic goals tied to readiness elements.",
      "Highly detailed, actionable goals supported by design."
    ],
    tips: {
      1: "Identify barriers. Brainstorm goal statements.",
      2: "Refine goals using SMART criteria.",
      3: "Map each goal to a repair program need.",
      4: "Prioritize 2-3 achievable goals and outline measurement.",
      5: "Link goals to activities in the Repairs Catalog.",
      6: "Incorporate goals into a logic model showing readiness support."
    }
  },
  {
    id: "f3s2", factor: "Soundness of Approach", name: "Feasibility of Approach",
    q: "How realistic is your plan for participating in training and applying learning?",
    context: "This sub-factor looks at whether your plan for repairs is realistic. It considers scope, staffing, budget, and timelines to see if the work you hope to do matches the resources you can reliably secure.",
    desc: [
      "Expectations unclear/unrealistic.",
      "Vague plan; unclear roles.",
      "Some details emerging but lacks structure.",
      "Realistic plan; key team identified.",
      "Clear structure, responsibilities, and timing.",
      "Strong plan with accountability."
    ],
    tips: {
      1: "Clarify expectations and align with leadership.",
      2: "Sketch out a basic participation outline.",
      3: "Draft a participation strategy.",
      4: "Share the plan with team; confirm buy-in.",
      5: "Assign accountability and support structures.",
      6: "Document and track implementation progress."
    }
  },
  {
    id: "f3s3", factor: "Soundness of Approach", name: "Alignment with Outcomes",
    q: "How well does your approach align with capacity and sustainability goals?",
    context: "This sub-factor looks at how well your planned activities connect to desired outcomes. It examines whether repairs, services, and partnerships are designed to move key indicators like safety, stability, and resilience in the right direction.",
    desc: [
      "No clear connection.",
      "Limited/unclear connection.",
      "Some alignment; focus is short-term.",
      "Goals reflect capacity priorities.",
      "Approach geared toward sustainability.",
      "Fully aligned with long-term outcomes."
    ],
    tips: {
      1: "Review program logic. Re-express goals.",
      2: "Translate internal needs into aligned outcomes.",
      3: "Broaden lens to strategic outcomes.",
      4: "Add durability to plans (long-term indicators).",
      5: "Position approach for funders/partners.",
      6: "Use outcome frameworks to communicate value."
    }
  },

  // --- FACTOR 4: LEVERAGE ---
  {
    id: "f4s1", factor: "Leverage and Partnerships", name: "Resource Commitment",
    q: "How committed is your organization to seeking additional resources?",
    context: "This sub-factor looks at your ability to bring internal assets into the repair effort. It reflects how you leverage existing staff, volunteers, brand trust, land, and construction experience to support a sustainable program.",
    desc: [
      "No resources identified.",
      "Interest expressed; no plan.",
      "Few resources identified; limited plan.",
      "Moderate plan to seek resources.",
      "Resource plan partially activated.",
      "Defined, ongoing resource plan operational."
    ],
    tips: {
      1: "Initiate resource mapping (internal/external).",
      2: "Draft a simple plan for one or two sources.",
      3: "Strengthen resource connections/feasibility.",
      4: "Align resources to specific goals.",
      5: "Activate multi-channel resource development.",
      6: "Formalize strategy; create funding matrix."
    }
  },
  {
    id: "f4s2", factor: "Leverage and Partnerships", name: "Partnerships",
    q: "How well has your organization identified partnerships?",
    context: "This sub-factor looks at the strength and usefulness of external partnerships for repair work. It considers relationships with funders, governments, service providers, and grassroots groups that can extend your reach and impact.",
    desc: [
      "No partners identified.",
      "Partners discussed; no outreach.",
      "Potential partners showing interest.",
      "Partners engaged through meetings.",
      "Partnerships formalized.",
      "Well-established partnerships with mutual goals."
    ],
    tips: {
      1: "Survey local network (aging services, housing).",
      2: "Initiate informal contact to gauge interest.",
      3: "Clarify partnership roles.",
      4: "Define collaboration points and timing.",
      5: "Develop MOUs or working agreements.",
      6: "Document partnership impact goals."
    }
  },
  {
    id: "f4s3", factor: "Leverage and Partnerships", name: "Future Leverage",
    q: "How well positioned are you to sustain outcomes beyond the grant?",
    context: "This sub-factor looks at how well a repair program can unlock new opportunities. It evaluates potential for future funding, policy influence, shared infrastructure, and deepened relationships that strengthen housing preservation over time.",
    desc: [
      "No sustainability planning.",
      "Ideas exist; no plan.",
      "Strategies identified but informal.",
      "Vision extends 1-2 years.",
      "Vision extends 3-5 years.",
      "Strong sustainability plan in place."
    ],
    tips: {
      1: "Shift to long-term thinking.",
      2: "Identify key sustainability levers.",
      3: "Outline your best sustainability option.",
      4: "Link your plan to results.",
      5: "Build support for sustainability with stakeholders.",
      6: "Incorporate sustainability into all planning."
    }
  },

  // --- FACTOR 5: IMPACT ---
  {
    id: "f5s1", factor: "Impact & Sustainability", name: "Vision for Impact",
    q: "How clear is your vision for sustaining a home repair program?",
    context: "This sub-factor looks at how repairs fit into your long-term strategy. It examines whether you have a multi-year view of scale, investment, and risk and how repairs contribute to a durable housing preservation vision.",
    desc: [
      "No vision developed.",
      "Vision exists but vague.",
      "Vision weakly connected to needs.",
      "Moderately clear vision.",
      "Clear, compelling vision established.",
      "Strong strategic vision for lasting impact."
    ],
    tips: {
      1: "Start with your 'why'. Revisit mission.",
      2: "Facilitate a visioning session with board.",
      3: "Ground vision in need and data.",
      4: "Link vision to a theory of change.",
      5: "Share and test your vision with stakeholders.",
      6: "Embed vision into strategy and budgets."
    }
  },
  {
    id: "f5s2", factor: "Impact & Sustainability", name: "Post-Grant Plan",
    q: "How effectively have you planned to apply systems after funding ends?",
    context: "This sub-factor looks at how repairs connect to your other programs and operations. It considers referral pathways, shared staffing, and aligned policies so that repairs are embedded in the organization, not an isolated side project.",
    desc: [
      "No plan created.",
      "General idea; lacks steps.",
      "General plan; lacks detail.",
      "Moderately developed plan.",
      "Clear implementation plan ready.",
      "Outcomes integrated into roles/policies."
    ],
    tips: {
      1: "Identify key takeaways to keep using.",
      2: "Draft a post-grant checklist.",
      3: "Stress-test your plan against obstacles.",
      4: "Clarify timing and roles for implementation.",
      5: "Build internal accountability.",
      6: "Share post-grant strategy with funders."
    }
  },
  {
    id: "f5s3", factor: "Impact & Sustainability", name: "Community Benefit",
    q: "How well do you demonstrate broader community/sector benefit?",
    context: "This sub-factor looks at how repair work advances broader community benefit. It evaluates whether projects support equity, reduce displacement risk, and strengthen neighborhoods in ways that are visible and meaningful to residents.",
    desc: [
      "No community impact identified.",
      "Limited recognition of impact.",
      "Some potential described.",
      "Specific impacts identified.",
      "Compelling case documented.",
      "Measurable, sustained benefit demonstrated."
    ],
    tips: {
      1: "Ask 'Who else could benefit?'.",
      2: "Explore shared outcomes with external groups.",
      3: "Clarify how others are impacted.",
      4: "Gather testimonials or local feedback.",
      5: "Track ripple effects (referrals, collaboration).",
      6: "Disseminate insights through networks."
    }
  }
];

export default function HomeRepairAssessment() {
  const [view, setView] = useState('home'); // home, wizard, dashboard, plan
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, step]);

  const handleStart = () => {
    setStep(0);
    setView('wizard');
  };

  const handleContinue = () => {
    // Find the first index where the answer is undefined
    const firstUnansweredIndex = SUB_FACTORS.findIndex(sf => !answers[sf.id]);
    if (firstUnansweredIndex !== -1) {
      setStep(firstUnansweredIndex);
    } else {
      setStep(0); 
    }
    setView('wizard');
  };

  const handleGoToQuestion = (index) => {
    setStep(index);
    setView('wizard');
  };

  const handleAnswer = (score) => {
    setAnswers(prev => ({ ...prev, [SUB_FACTORS[step].id]: score }));
  };

  const handleNext = () => {
    if (step < SUB_FACTORS.length - 1) {
      setStep(step + 1);
    } else {
      setView('dashboard');
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      setView('home');
    }
  };

  const getOverallScore = () => {
    const total = Object.values(answers).reduce((a, b) => a + b, 0);
    const count = Object.keys(answers).length;
    if (count === 0) return "0.0";
    const avg = total / count;
    return avg.toFixed(1);
  };
  
  const getCountByLevel = (min, max) => {
    return SUB_FACTORS.filter(sf => {
      const score = answers[sf.id] || 0;
      return score >= min && score <= max;
    }).length;
  };

  const getCompletionPercentage = () => {
    const answeredCount = Object.keys(answers).length;
    return Math.round((answeredCount / SUB_FACTORS.length) * 100);
  };

  const currentSubFactor = SUB_FACTORS[step];
  const currentAnswer = answers[currentSubFactor.id];
  const completionPercent = getCompletionPercentage();

  // Helper to determine stage based on score (1-6 scale)
  const getStageFromScore = (scoreVal) => {
    const score = parseFloat(scoreVal);
    if (score < 1.5) return "Inactive";
    if (score < 2.5) return "Aware";
    if (score < 3.5) return "Exploring";
    if (score < 4.5) return "Planning";
    if (score < 5.5) return "Preparing";
    return "Ready";
  };

  // Helper to determine stage Index based on score (0-5)
  const getStageIndex = (scoreVal) => {
    const score = parseFloat(scoreVal);
    if (score < 1.5) return 0; // Inactive
    if (score < 2.5) return 1; // Aware
    if (score < 3.5) return 2; // Exploring
    if (score < 4.5) return 3; // Planning
    if (score < 5.5) return 4; // Preparing
    return 5; // Ready
  };

  // Helper to get critical gaps for the overview
  const getCriticalGaps = () => {
    return SUB_FACTORS
      .map(sf => ({ ...sf, score: answers[sf.id] || 0 })) // treat unscored as 0 for sorting
      .sort((a, b) => a.score - b.score)
      .slice(0, 3)
      .filter(sf => sf.score <= 3); // Only show if they are actually low
  };

  return (
    <div className="min-h-screen bg-[#F7F9FA] text-[#333] font-sans flex flex-col">
      
      {/* --- GLOBAL HEADER --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#008996] rounded-md flex items-center justify-center text-white shadow-sm">
               <Home size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#2C5697] text-lg tracking-tight leading-none">Repair Readiness Assessment</span>
              <span className="text-xs text-gray-500 font-medium mt-0.5">v1.1</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <button onClick={() => setView('home')} className="hover:text-[#008996]">Home</button>
            <button onClick={() => setView('dashboard')} className="hover:text-[#008996]">Assessment</button>
            <button onClick={() => setView('plan')} className="hover:text-[#008996]">Next Steps</button>
            <button 
              onClick={() => window.open('https://readiness-app.vercel.app/Readiness_Manual.pdf', '_blank')}
              className="flex items-center gap-2 hover:text-[#008996]"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <BookOpen size={16} />
              </div>
              Guide
            </button>
          </nav>
          <button className="md:hidden text-gray-500"><Menu size={24} /></button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8">

        {/* --- VIEW: HOME --- */}
        {view === 'home' && (
          <div className="mt-8 text-center flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#333] mb-6">Home Repair Readiness Assessment</h1>
            <p className="text-[#555] text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Assess your Habitat for Humanity affiliate's readiness to launch or scale a successful home repair program. This tool will provide a personalized roadmap to build capacity and increase your community impact.
            </p>
            
            <div className="flex justify-center gap-8 mb-12 flex-wrap">
              {[
                { icon: ClipboardCheck, label: "Capacity" },
                { icon: Home, label: "Need" },
                { icon: FileText, label: "Approach" },
                { icon: Handshake, label: "Leverage" },
                { icon: Users, label: "Impact" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3">
                  <item.icon size={40} strokeWidth={1.5} className="text-[#008996]" />
                  <span className="text-sm font-medium text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 mb-16">
              <button 
                onClick={Object.keys(answers).length > 0 ? handleContinue : handleStart}
                className="bg-[#008996] hover:bg-[#007681] text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors shadow-md"
              >
                {Object.keys(answers).length > 0 ? "Complete Assessment" : "Start Assessment"}
              </button>
              
              {Object.keys(answers).length > 0 && (
                <button 
                  onClick={() => setView('dashboard')}
                  className="border-2 border-[#008996] text-[#008996] hover:bg-[#E0F2F1] px-8 py-3 rounded-full text-lg font-semibold transition-colors"
                >
                  View Previous Results
                </button>
              )}
            </div>

            {/* --- NEW "WHAT TO EXPECT" SECTION --- */}
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-left mb-12">
              <h3 className="text-2xl font-bold text-[#2C5697] mb-8">What to Expect</h3>
              <div className="space-y-8">
                {/* Item 1 */}
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center text-[#2C5697] font-bold text-lg">
                    15
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#333]">15 Questions Across 5 Key Factors</h4>
                    <p className="text-gray-600 mt-1">Capacity, Need, Approach, Leverage and Impact</p>
                  </div>
                </div>
                
                {/* Item 2 */}
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center text-[#2C5697]">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#333]">15-20 Minutes to Complete</h4>
                    <p className="text-gray-600 mt-1">Take your time to thoughtfully assess each area</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center text-[#2C5697]">
                    <BarChart3 size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#333]">Instant Results and Recommendations</h4>
                    <p className="text-gray-600 mt-1">Get a comprehensive dashboard with prioritized action items</p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center text-[#2C5697]">
                    <Save size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#333]">Saving Your Results</h4>
                    <p className="text-gray-600 mt-1">Your inputs are not saved - Use the Print to PDF button to save your assessment results</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => window.open('https://readiness-app.vercel.app/Readiness_Manual.pdf', '_blank')}
              className="text-[#2C5697] underline text-sm hover:text-blue-800 mb-8"
            >
              Learn about the 6 readiness levels
            </button>
          </div>
        )}

        {/* --- VIEW: WIZARD (CARD LAYOUT) --- */}
        {view === 'wizard' && (
          <div className="w-full mt-6">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Section {Math.floor(step/3) + 1} of 5, Item {step + 1} of {SUB_FACTORS.length}</span>
                <div className="h-1.5 w-64 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-[#008996] transition-all duration-500 ease-out"
                    style={{ width: `${((step + 1) / SUB_FACTORS.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10 relative">
              
              {/* Top Section: Factor Header + Context Box */}
              <div className="flex flex-col md:flex-row gap-8 mb-10 border-b border-gray-100 pb-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-[#222] mb-3 leading-tight">
                    FACTOR {Math.floor(step/3) + 1}: {currentSubFactor.factor}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {FACTOR_DESCRIPTIONS[currentSubFactor.factor] || "Evaluate your affiliate's readiness in this specific area based on the HUD framework."}
                  </p>
                </div>
                <div className="md:w-1/3 bg-gray-50 border border-gray-200 rounded-lg p-5 text-sm text-gray-700 leading-relaxed shadow-sm">
                  <span className="block font-bold text-[#008996] mb-2 uppercase text-xs tracking-wider">About this Sub-factor</span>
                  {currentSubFactor.context || "Select a level to view more details."}
                </div>
              </div>

              {/* Question Section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#333] mb-3">Sub-factor: {currentSubFactor.name}</h3>
                <p className="text-gray-800 text-lg mb-4 font-medium">
                  {currentSubFactor.q}
                </p>
              </div>

              {/* Select One Label - Moved and Tightened */}
              <p className="text-sm font-bold text-[#008996] uppercase tracking-wide mb-3">Select One</p>

              {/* CARDS SCORING UI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
                {LEVELS.map((label, idx) => {
                  const score = idx + 1;
                  const isSelected = currentAnswer === score;
                  const style = LEVEL_STYLES[idx];
                  const isTextWhite = style.header.includes('text-white');

                  return (
                    <div 
                      key={score}
                      onClick={() => handleAnswer(score)}
                      className={`
                        relative rounded-lg border-2 cursor-pointer transition-all duration-200 flex flex-col overflow-hidden h-full group
                        ${isSelected 
                          ? 'border-[#2C5697] ring-4 ring-blue-50 transform scale-[1.02] shadow-lg z-10' 
                          : 'border-gray-200 hover:border-[#008996] hover:shadow-md'
                        }
                      `}
                    >
                      {/* Card Header */}
                      <div className={`py-3 px-2 text-center font-bold text-sm uppercase tracking-wide ${style.header} relative`}>
                        {label}
                      </div>
                      
                      {/* Card Body */}
                      <div className={`p-4 text-xs leading-relaxed text-gray-700 flex-grow ${style.body}`}>
                        {currentSubFactor.desc[idx]}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer Nav */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex gap-3">
                  <button 
                    onClick={handlePrev}
                    className="px-6 py-2 rounded-full border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={!currentAnswer}
                    className={`px-8 py-2 rounded-full font-bold text-white transition-colors shadow-md
                      ${currentAnswer ? 'bg-[#2C5697] hover:bg-[#1e4066]' : 'bg-gray-300 cursor-not-allowed'}
                    `}
                  >
                    {step === SUB_FACTORS.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
                <button 
                  onClick={() => setView('dashboard')}
                  className="text-[#008996] font-bold underline text-sm hover:text-teal-800"
                >
                  Save and Exit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW: DASHBOARD --- */}
        {view === 'dashboard' && (
          <div className="flex flex-col gap-8 mt-4">
            {/* Header */}
            <div className="flex justify-between items-end border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-3xl font-bold text-[#333]">Readiness Profile Summary</h2>
                <p className="text-gray-500 mt-1">Review your scores and high-level insights.</p>
              </div>
              <div className="flex gap-3">
                 {/* DYNAMIC ACTION BUTTON */}
                 {completionPercent < 100 && (
                   <button 
                     onClick={handleContinue}
                     className="px-6 py-2 bg-[#008996] hover:bg-[#007681] text-white rounded-full font-bold shadow-sm flex items-center gap-2 transition-all"
                   >
                     {completionPercent === 0 ? "Start Assessment" : "Complete Assessment"}
                     <ArrowRight size={16}/>
                   </button>
                 )}

                 <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">
                    <Download size={16}/> Export
                 </button>
              </div>
            </div>

            {/* Metrics Row (Based on Multi-Factor Dashboard Mockup) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#2C5697]">
                <div className="text-sm text-gray-500 uppercase font-bold mb-1">Overall Score</div>
                <div className="text-3xl font-bold text-[#2C5697]">{getOverallScore()} <span className="text-lg text-gray-400 font-normal">/ 6.0</span></div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#D9534F]">
                <div className="text-sm text-gray-500 uppercase font-bold mb-1">Below Planning</div>
                <div className="text-3xl font-bold text-[#D9534F]">{getCountByLevel(1, 3)}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#5CB85C]">
                <div className="text-sm text-gray-500 uppercase font-bold mb-1">Preparing/Ready</div>
                <div className="text-3xl font-bold text-[#5CB85C]">{getCountByLevel(5, 6)}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#008996]">
                <div className="text-sm text-gray-500 uppercase font-bold mb-1">Assessment Completion</div>
                <div className="text-3xl font-bold text-[#008996]">{completionPercent}%</div>
              </div>
            </div>

            {/* Summary Boxes (Based on Profile Summary Mockup) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden">
                <div className="bg-blue-50 px-4 py-3 border-b border-blue-100 flex items-center gap-2">
                  <div className="bg-[#2C5697] text-white rounded-full p-1"><Check size={14} /></div>
                  <h3 className="font-bold text-[#2C5697]">Top Strengths</h3>
                </div>
                <div className="p-4 space-y-2">
                   {/* Mock logic for display */}
                   <p className="text-sm text-gray-700">• <strong>Volunteer Engagement:</strong> Consistent high participation.</p>
                   <p className="text-sm text-gray-700">• <strong>Program Capacity:</strong> Core team in place with experience.</p>
                </div>
              </div>

              {/* Growth */}
              <div className="bg-white rounded-lg shadow-sm border border-teal-100 overflow-hidden">
                <div className="bg-teal-50 px-4 py-3 border-b border-teal-100 flex items-center gap-2">
                  <div className="bg-[#008996] text-white rounded-full p-1"><ArrowRight size={14} /></div>
                  <h3 className="font-bold text-[#008996]">Key Growth Areas</h3>
                </div>
                <div className="p-4 space-y-2">
                   <p className="text-sm text-gray-700">• <strong>Financial Stability:</strong> Need to diversify funding sources.</p>
                   <p className="text-sm text-gray-700">• <strong>Partnership Development:</strong> Expand local alliances.</p>
                </div>
              </div>
            </div>

            {/* Heatmap Matrix (Based on Multi-Factor Dashboard Mockup) */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-700">Readiness Heatmap</h3>
                <div className="flex gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-400 rounded-sm"></div> Selected Level</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-100 rounded-sm"></div> Unselected</div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-500 uppercase text-xs">
                      <th className="text-left p-3 w-1/4 border-b border-gray-200">Sub-factors</th>
                      {LEVELS.map(l => <th key={l} className="text-left p-3 w-[12%] border-b border-gray-200">{l}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {SUB_FACTORS.map((sf, idx) => {
                      const score = answers[sf.id];
                      // Check if this row starts a new factor group
                      const isNewGroup = idx === 0 || sf.factor !== SUB_FACTORS[idx - 1].factor;
                      
                      return (
                        <React.Fragment key={sf.id}>
                          {/* Factor Header Row */}
                          {isNewGroup && (
                            <tr className="bg-gray-50 border-y border-gray-200">
                              <td colSpan={7} className="px-4 py-2 text-xs font-bold text-[#2C5697] uppercase tracking-wider">
                                {sf.factor}
                              </td>
                            </tr>
                          )}
                          {/* Sub-factor Row */}
                          <tr className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-3 pl-6 font-medium text-gray-800 border-r border-gray-100">
                              {sf.name}
                            </td>
                            {[1,2,3,4,5,6].map(lvl => (
                              <td 
                                key={lvl} 
                                className="p-1 border-r border-gray-100 last:border-0 relative h-12"
                              >
                                {score === lvl ? (
                                  <div 
                                    onClick={() => {
                                      setStep(idx);
                                      setView('wizard');
                                    }}
                                    title="Click to edit answer"
                                    className={`absolute inset-1 rounded flex items-center justify-center font-bold shadow-sm cursor-pointer hover:opacity-90 transition-opacity ${LEVEL_STYLES[lvl - 1].header}`}
                                  >
                                    {score}
                                  </div>
                                ) : (
                                  <div className="absolute inset-1 bg-white"></div>
                                )}
                              </td>
                            ))}
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-center gap-4 py-8">
              {completionPercent < 100 ? (
                <button 
                  onClick={handleContinue}
                  className="px-6 py-3 bg-[#00529B] text-white font-bold rounded-full hover:bg-blue-800 shadow-md flex items-center gap-2"
                >
                  {completionPercent === 0 ? "Start Assessment" : "Complete Assessment"}
                  <ArrowRight size={16}/>
                </button>
              ) : (
                <button 
                  className="px-6 py-3 bg-gray-200 text-gray-500 font-bold rounded-full cursor-not-allowed flex items-center gap-2"
                  disabled
                >
                  Assessment Complete <Check size={16}/>
                </button>
              )}

              <button 
                onClick={() => setView('plan')}
                className="px-6 py-3 border-2 border-[#008996] text-[#008996] font-bold rounded-full hover:bg-teal-50"
              >
                Generate Next Steps Plan
              </button>
            </div>
          </div>
        )}

        {/* --- VIEW: PLAN --- */}
        {view === 'plan' && (
          <div className="mt-8">
            {/* --- NEW OVERVIEW SECTION --- */}
            <div className="bg-[#F8F9FA] rounded-xl p-8 mb-10 border border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                
                {/* Score Circle & Stage - UPDATED DYNAMIC COLOR LOGIC */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div 
                    className="w-32 h-32 rounded-full border-[6px] flex flex-col items-center justify-center bg-white shadow-sm transition-colors duration-500"
                    style={{ borderColor: LEVEL_STYLES[getStageIndex(getOverallScore())].hex }}
                  >
                    <span className="text-3xl font-extrabold text-[#333]">{getOverallScore()}</span>
                    <span className="text-xs text-gray-500 font-medium uppercase mt-1">out of 6.0</span>
                  </div>
                  <div 
                    className={`mt-4 px-4 py-1.5 text-sm font-bold rounded-full shadow-sm transition-colors duration-500 ${LEVEL_STYLES[getStageIndex(getOverallScore())].textClass}`}
                    style={{ backgroundColor: LEVEL_STYLES[getStageIndex(getOverallScore())].hex }}
                  >
                    {getStageFromScore(getOverallScore())}
                  </div>
                </div>

                {/* Narrative Text */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#333] mb-4">Overall Readiness Level</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {STAGE_DEFINITIONS[getStageFromScore(getOverallScore())]}
                  </p>
                  
                  {/* General Guidance */}
                  <div className="bg-[#F0F7FF] p-6 rounded-lg border-l-4 border-[#2C5697] shadow-sm">
                    <h3 className="text-xl font-bold text-[#333] mb-4 flex items-center gap-2">
                      <TrendingUp size={24} className="text-[#333]" /> 
                      General Guidance
                    </h3>
                    <ul className="space-y-3 text-gray-700 list-disc pl-5">
                      <li>
                        Review areas scoring below 
                        <span className="inline-block bg-[#FFD54F] text-gray-800 text-xs font-bold px-2 py-0.5 rounded mx-1">Planning</span> 
                        for immediate attention
                      </li>
                      <li>Create a 3-6 month action plan addressing your lowest-scoring factors</li>
                      <li>Engage leadership and staff in discussing assessment results</li>
                      <li>Connect with HFHI for technical assistance in priority areas</li>
                      <li>Schedule a follow-up assessment in 6 months to track progress</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Visual Spectrum Bar */}
              <div className="mt-10 relative pt-6">
                <div className="flex h-3 rounded-full overflow-hidden w-full">
                  <div className="flex-1 bg-[#94A3B8]"></div> {/* Inactive */}
                  <div className="flex-1 bg-[#EF5350]"></div> {/* Aware */}
                  <div className="flex-1 bg-[#FFB74D]"></div> {/* Exploring */}
                  <div className="flex-1 bg-[#FFD54F]"></div> {/* Planning */}
                  <div className="flex-1 bg-[#AED581]"></div> {/* Preparing */}
                  <div className="flex-1 bg-[#4CAF50]"></div> {/* Ready */}
                </div>
                {/* Pointer */}
                <div 
                  className="absolute top-0 flex flex-col items-center transform -translate-x-1/2 transition-all duration-500"
                  style={{ left: `${(parseFloat(getOverallScore()) / 6) * 100}%` }}
                >
                  <div className="bg-[#333] text-white text-xs font-bold px-2 py-1 rounded shadow-lg mb-1">
                    {getOverallScore()}
                  </div>
                  <div className="w-0.5 h-8 bg-[#333]"></div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 uppercase font-bold mt-2 px-1">
                  <span>Inactive</span>
                  <span>Aware</span>
                  <span>Exploring</span>
                  <span>Planning</span>
                  <span>Preparing</span>
                  <span>Ready</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-[#333]">Personalized Next Steps Plan</h1>
              <div className="flex gap-2">
                 <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium">Export PDF</button>
                 <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium">Export CSV</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Immediate Priorities (Red/Urgent) */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#FFEBEE] p-6 rounded-t-lg border-b-4 border-[#EF5350]">
                  <h2 className="text-xl font-bold text-[#C62828]">Immediate 3-month priorities.</h2>
                  <p className="text-[#D32F2F] text-sm mt-1">Focus on these critical areas to build a strong foundation for your home repair program.</p>
                </div>
                
                <div className="space-y-4">
                  {SUB_FACTORS
                    .filter(sf => (answers[sf.id] || 1) <= 3)
                    .sort((a, b) => {
                      const scoreA = answers[a.id] === undefined ? 0 : answers[a.id];
                      const scoreB = answers[b.id] === undefined ? 0 : answers[b.id];
                      return scoreA - scoreB;
                    })
                    .map(sf => {
                      const isScored = answers[sf.id] !== undefined;
                      // Apply dynamic icon color based on score (or default gray for unscored)
                      const scoreIndex = answers[sf.id] ? answers[sf.id] - 1 : -1;
                      const iconColorClass = scoreIndex >= 0 ? SCORE_ICON_COLORS[scoreIndex] : 'bg-gray-100 text-gray-500';

                      return (
                        <div key={sf.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6">
                          <div className="flex-shrink-0">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColorClass}`}>
                                {isScored ? <ClipboardCheck size={20}/> : <AlertCircle size={20}/>}
                             </div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-gray-800 text-lg">{sf.name}</h3>
                              {!isScored && (
                                <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded">Not Scored</span>
                              )}
                            </div>
                            
                            {isScored ? (
                              <>
                                <p className="text-sm font-semibold text-gray-500 mb-2">Practical steps:</p>
                                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                                  <li>{sf.tips[answers[sf.id] || 1]}</li>
                                  <li>Schedule review meeting with relevant staff.</li>
                                </ul>
                              </>
                            ) : (
                              <div className="flex flex-col gap-2 mt-2">
                                <p className="text-sm text-gray-500 italic">This factor was skipped during the assessment.</p>
                                <button 
                                  onClick={() => handleGoToQuestion(SUB_FACTORS.indexOf(sf))}
                                  className="text-sm text-[#008996] font-semibold flex items-center gap-1 hover:underline self-start"
                                >
                                  Complete Assessment <ArrowRight size={14}/>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  }
                  
                  {SUB_FACTORS.filter(sf => (answers[sf.id] || 1) <= 3).length === 0 && (
                    <div className="p-8 text-center text-gray-500 italic bg-gray-50 rounded-lg">No immediate priorities found. Great job!</div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                
                {/* Growth Opportunities (Yellow/Planning) */}
                <div>
                  <div className="bg-[#FFF8E1] p-5 rounded-t-lg border-b-4 border-[#FFD54F]">
                    <h2 className="text-lg font-bold text-[#F57F17]">6 to 12 month growth opportunities.</h2>
                    <p className="text-[#F9A825] text-xs mt-1">Plan ahead to expand your program's reach and impact.</p>
                  </div>
                  <div className="bg-white border-x border-b border-gray-200 p-4 space-y-4 rounded-b-lg">
                    {SUB_FACTORS.filter(sf => (answers[sf.id] || 1) > 3 && (answers[sf.id] || 1) < 6).map(sf => (
                      <div key={sf.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="mt-1 text-[#F9A825]"><ArrowRight size={16}/></div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm">{sf.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">{sf.tips[answers[sf.id] || 1]}</p>
                        </div>
                      </div>
                    ))}
                    {SUB_FACTORS.filter(sf => (answers[sf.id] || 1) > 3 && (answers[sf.id] || 1) < 6).length === 0 && (
                      <div className="text-center text-xs text-gray-400 py-4">No mid-term items.</div>
                    )}
                  </div>
                </div>

                {/* Maintaining Strengths (Green) */}
                <div>
                  <div className="bg-[#E8F5E9] p-5 rounded-t-lg border-b-4 border-[#4CAF50]">
                    <h2 className="text-lg font-bold text-[#1B5E20]">Maintaining strengths.</h2>
                    <p className="text-[#2E7D32] text-xs mt-1">Continue to leverage these areas where your affiliate excels.</p>
                  </div>
                  <div className="bg-white border-x border-b border-gray-200 p-4 space-y-4 rounded-b-lg">
                     {SUB_FACTORS.filter(sf => (answers[sf.id] || 1) === 6).map(sf => (
                      <div key={sf.id} className="flex items-center gap-3">
                        <div className="bg-green-100 p-1.5 rounded text-green-700"><Check size={14}/></div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 text-sm">{sf.name}</h4>
                        </div>
                        <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                           <Check size={10}/> Ready
                        </div>
                      </div>
                    ))}
                     {SUB_FACTORS.filter(sf => (answers[sf.id] || 1) === 6).length === 0 && (
                      <div className="text-center text-xs text-gray-400 py-4">Keep working to reach "Ready" status!</div>
                    )}
                  </div>
                </div>

              </div>
            </div>
            
            <div className="flex justify-center py-10">
               <button 
                  onClick={() => setView('dashboard')}
                  className="px-6 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 font-medium text-gray-700"
               >
                  Return to Dashboard
               </button>
            </div>

          </div>
        )}
      </main>

      {/* --- GLOBAL FOOTER --- */}
      <footer className="bg-[#00529B] text-white py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">© 2025 Habitat for Humanity International. All rights reserved.</div>
          <div className="flex gap-6 text-sm font-medium">
            <button className="hover:text-blue-200">Privacy Policy</button>
            <button className="hover:text-blue-200">Contact</button>
            <button className="hover:text-blue-200">Legal</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
