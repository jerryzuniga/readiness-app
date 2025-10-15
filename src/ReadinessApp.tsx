import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Home, CheckCircle, AlertCircle, TrendingUp, FileText, Download, MessageSquare, Printer } from 'lucide-react';

const VERSION = '1.5.2';
const CODE_RELEASE = 'CR-20250115-003'; // Code Release Number for version tracking

// ============================================
// TEXT CONFIGURATION - Easy to update all copy
// ============================================
const CONTENT = {
  version: VERSION,
  welcome: {
    title: "Home Repair Program Readiness Assessment",
    subtitle: "Evaluate your organizational readiness",
    aboutTitle: "What to Expect",
    questionCount: "15 Questions Across 5 Key Factors",
    questionDetails: "Capacity, Need, Approach, Leverage and Sustainability",
    duration: "15-20 Minutes to Complete",
    durationDetails: "Take your time to thoughtfully assess each area",
    results: "Instant Results and Recommendations",
    resultsDetails: "Get a comprehensive dashboard with prioritized action items",
    save: "Saving Your Results",
    saveDetails: "Your inputs are not saved - Use the Print to PDF button to save your assessment results",
    guideTitle: "Download the Assessment Guide",
    guideDescription: "Get detailed explanations of all factors, sub-factors, and the readiness scale. This guide will help you answer questions more accurately and understand your results.",
    guideButton: "Download Assessment Guide (PDF)",
    tipsTitle: "Tips for Best Results",
    tips: [
      "Be honest in your self-assessment - this identifies real areas for growth",
      "Review the Assessment Guide before starting for better context",
      "Involve key staff members to gather diverse perspectives",
      "Add notes to questions to capture important details",
      "You can navigate back to change answers at any time"
    ],
    startButton: "Start Assessment",
    versionNote: "Your responses are not saved automatically"
  },
  nav: {
    homeTitle: "Repair Readiness Assessment",
    assessment: "Assessment",
    results: "Results",
    dashboard: "Dashboard",
    nextSteps: "Next Steps",
    guide: "Guide",
    backToHome: "Back to Home"
  },
  assessment: {
    title: "Home Repair Program Readiness Assessment",
    subtitle: "Evaluate your organization readiness",
    progressLabel: "Progress",
    addNotes: "Add Notes",
    hideNotes: "Hide Notes",
    notesPlaceholder: "Add notes about this question...",
    previousButton: "Previous",
    nextButton: "Next",
    viewResultsButton: "View Results"
  },
  results: {
    title: "Results",
    exportButton: "Export CSV",
    printButton: "Print to PDF",
    scoreLabel: "Score:",
    notesLabel: "Notes:",
    notAnswered: "Not answered",
    viewDashboardButton: "View Dashboard",
    nextStepsButton: "Next Steps"
  },
  dashboard: {
    title: "Dashboard",
    overallScoreTitle: "Overall Readiness Score",
    distributionTitle: "Readiness Distribution",
    factorOverviewTitle: "Factor Overview",
    printButton: "Print to PDF",
    actionItemsButton: "Action Items",
    incompleteTitle: "Complete Your Assessment First",
    incompleteMessage: "Personalized dashboard will be available once you complete all assessment questions.",
    continueButton: "Continue Assessment",
    completedLabel: "completed"
  },
  nextSteps: {
    title: "Next Steps",
    guidanceTitle: "General Guidance",
    guidance: [
      "Review areas scoring below Planning (3) for immediate attention",
      "Create a 3-6 month action plan addressing your lowest-scoring factors",
      "Engage leadership and staff in discussing assessment results",
      "Connect with HFHI for technical assistance in priority areas",
      "Schedule a follow-up assessment in 6 months to track progress"
    ],
    printButton: "Print to PDF",
    highPriority: "High Priority Action Items",
    mediumPriority: "Medium Priority Action Items",
    lowPriority: "Low Priority Action Items",
    priorityLabels: {
      high: "High Priority",
      medium: "Medium Priority",
      low: "Low Priority"
    },
    scoreLabel: "Score:",
    incompleteTitle: "Complete Your Assessment First",
    incompleteMessage: "Personalized next steps will be available once you complete all assessment questions.",
    continueButton: "Continue Assessment",
    completedLabel: "completed"
  }
};

const ReadinessApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [currentView, setCurrentView] = useState('welcome');
  const guideUrl = 'https://readiness-app.vercel.app/Readiness_Manual.pdf';

  const assessmentData = {
    factors: [
      {
        id: 'capacity',
        title: 'Factor 1: Capacity of Affiliate',
        subfactors: [
          { 
            id: 'leadership', 
            title: 'Leadership and Board Commitment', 
            question: 'How would you rate your organization\'s leadership and board commitment to home repairs?',
            levels: [
              { value: 0, label: 'Inactive', description: 'No awareness or discussion of home repairs among board or leadership.' },
              { value: 1, label: 'Aware', description: 'Some vague awareness, but no structured discussions or expressed interest.' },
              { value: 2, label: 'Exploring', description: 'Informal conversations in response to one-off repair needs, no sustained planning.' },
              { value: 3, label: 'Planning', description: 'Regular discussions about preservation potential but no commitment to action yet.' },
              { value: 4, label: 'Preparing', description: 'Early steps taken: assigning staff, approving concepts, exploring funding.' },
              { value: 5, label: 'Ready', description: 'Housing preservation embedded in strategy. Leadership aligned and preparing for launch.' }
            ]
          },
          { 
            id: 'staff', 
            title: 'Staff Commitment', 
            question: 'How prepared is your staff to engage in repairs training?',
            levels: [
              { value: 0, label: 'Inactive', description: 'No staff assigned or identified. No clear strategy or timeline.' },
              { value: 1, label: 'Aware', description: 'General leadership support, but limited staff enthusiasm or participation expected.' },
              { value: 2, label: 'Exploring', description: 'One or two staff named, but responsibilities and time commitment unclear.' },
              { value: 3, label: 'Planning', description: 'Specific staff selected for training, though participation may be limited.' },
              { value: 4, label: 'Preparing', description: 'Staff identified, scheduled for learning, and assigned to apply new skills.' },
              { value: 5, label: 'Ready', description: 'Team fully committed, engaged in learning, equipped to lead program development.' }
            ]
          },
          { 
            id: 'systems', 
            title: 'Internal Systems', 
            question: 'How well has your organization planned for system improvements to support repair efforts?',
            levels: [
              { value: 0, label: 'Inactive', description: 'No resource needs identified, no tools or equipment or processes in place.' },
              { value: 1, label: 'Aware', description: 'Some awareness that systems need attention, but no action plan.' },
              { value: 2, label: 'Exploring', description: 'Initial conversations about improvements, but no action taken yet.' },
              { value: 3, label: 'Planning', description: 'System needs clearly identified. Beginning planning, piloting, or budgeting.' },
              { value: 4, label: 'Preparing', description: 'Documented plan to strengthen systems. Staff roles clearly defined.' },
              { value: 5, label: 'Ready', description: 'Fully developed, actionable system improvement plan aligned with launch timeline.' }
            ]
          }
        ]
      },
      {
        id: 'need',
        title: 'Factor 2: Repair Program Need',
        subfactors: [
          { 
            id: 'housing', 
            title: 'Housing Needs', 
            question: 'How well has your organization determined repair needs?',
            levels: [
              { value: 0, label: 'Inactive', description: 'No repair-related data gathered. No community listening or needs assessment.' },
              { value: 1, label: 'Aware', description: 'General understanding that repairs are needed, but minimal detail.' },
              { value: 2, label: 'Exploring', description: 'Community-level awareness with anecdotes or limited examples.' },
              { value: 3, label: 'Planning', description: 'Some specific needs identified through intentional efforts.' },
              { value: 4, label: 'Preparing', description: 'Clear understanding supported by specific data sources and community feedback.' },
              { value: 5, label: 'Ready', description: 'Strong, data-driven understanding with waitlists, assessments, or external reports.' }
            ]
          },
          { 
            id: 'organizational', 
            title: 'Capacity Building Need', 
            question: 'How clearly identified is the need for repairs capacity building?',
            levels: [
              { value: 0, label: 'Inactive', description: 'No connection made between existing gaps and need for capacity building.' },
              { value: 1, label: 'Aware', description: 'Limited or vague understanding of how internal gaps relate to capacity building.' },
              { value: 2, label: 'Exploring', description: 'Some internal gaps acknowledged but not clearly linked to repair readiness.' },
              { value: 3, label: 'Planning', description: 'Specific capacity gaps identified and affiliate is beginning to explore how to address them.' },
              { value: 4, label: 'Preparing', description: 'Clearly defined gaps tied to repair program readiness, such as hiring or compliance.' },
              { value: 5, label: 'Ready', description: 'Strong, detailed rationale for capacity-building investments fully aligned with repair objectives.' }
            ]
          },
          { 
            id: 'timing', 
            title: 'Urgency and Timing', 
            question: 'How timely is a repairs effort for your organization?',
            levels: [
              { value: 0, label: 'Inactive', description: 'No urgency recognized. No active initiatives prompting affiliate to prioritize repairs.' },
              { value: 1, label: 'Aware', description: 'Early signs of alignment beginning to surface, such as anecdotal needs or mild pressure from partners.' },
              { value: 2, label: 'Exploring', description: 'General alignment in timing but urgency is not yet strongly felt.' },
              { value: 3, label: 'Planning', description: 'Timing is relevant and fits within current priorities or planning cycles.' },
              { value: 4, label: 'Preparing', description: 'Strong sense of urgency. Affiliate is facing specific transitions or external pressures.' },
              { value: 5, label: 'Ready', description: 'Clearly documented high-urgency needs make this capacity-building moment critical.' }
            ]
          }
        ]
      },
      {
        id: 'approach',
        title: 'Factor 3: Soundness of Approach',
        subfactors: [
          { 
            id: 'goals', 
            title: 'Clarity of Goals', 
            question: 'How clear are your repairs capacity-building goals?',
            levels: [
              { value: 0, label: 'Inactive', description: 'No capacity-building goals identified.' },
              { value: 1, label: 'Aware', description: 'General ideas about needs, but goals unclear or unrealistic.' },
              { value: 2, label: 'Exploring', description: 'A few goals identified but loosely tied to repair readiness.' },
              { value: 3, label: 'Planning', description: 'Goals moderately clear and generally aligned, some need refinement.' },
              { value: 4, label: 'Preparing', description: 'Specific, realistic goals tied to core elements of repair readiness.' },
              { value: 5, label: 'Ready', description: 'Highly detailed, actionable goals supporting critical repair capacity components.' }
            ]
          },
          { 
            id: 'feasibility', 
            title: 'Feasibility', 
            question: 'How realistic is your repairs plan?',
            levels: [
              { value: 0, label: 'Inactive', description: 'Expectations unclear or unrealistic. No internal plan.' },
              { value: 1, label: 'Aware', description: 'Vague plan exists with no clarity on participants or application.' },
              { value: 2, label: 'Exploring', description: 'Some details emerging but plan lacks full structure.' },
              { value: 3, label: 'Planning', description: 'Realistic plan with basic strategy and key team members identified.' },
              { value: 4, label: 'Preparing', description: 'Clear structure, responsibilities, and timing with confirmed participants.' },
              { value: 5, label: 'Ready', description: 'Strong, feasible plan with clear pathways and accountability.' }
            ]
          },
          { 
            id: 'alignment', 
            title: 'Alignment with Outcomes', 
            question: 'How well does your approach align with goals?',
            levels: [
              { value: 0, label: 'Inactive', description: 'No clear connection to program outcomes.' },
              { value: 1, label: 'Aware', description: 'Limited connection to outcomes. Efforts may be ad hoc.' },
              { value: 2, label: 'Exploring', description: 'Some elements show alignment but focus remains short-term.' },
              { value: 3, label: 'Planning', description: 'Clear alignment with priorities and moderate long-term vision.' },
              { value: 4, label: 'Preparing', description: 'Strong alignment geared toward sustainability and strategic impact.' },
              { value: 5, label: 'Ready', description: 'Fully aligned with long-term outcomes and systems change.' }
            ]
          }
        ]
      },
      {
        id: 'leverage',
        title: 'Factor 4: Leverage and Impact',
        subfactors: [
          { 
            id: 'resources', 
            title: 'Additional Resources', 
            question: 'How committed are you to seeking resources?',
            levels: [
              { value: 0, label: 'Inactive', description: 'No additional resources identified. Full reliance on grant.' },
              { value: 1, label: 'Aware', description: 'Interest expressed but no plan or actions taken.' },
              { value: 2, label: 'Exploring', description: 'Few resources identified but plan for using them is limited.' },
              { value: 3, label: 'Planning', description: 'Moderate plan to seek new or complementary resources.' },
              { value: 4, label: 'Preparing', description: 'Clear mix of current and potential resources showing diversity.' },
              { value: 5, label: 'Ready', description: 'Strong, actionable resource development plan leveraging diverse assets.' }
            ]
          },
          { 
            id: 'partnerships', 
            title: 'Partnerships', 
            question: 'How well have you identified partnerships?',
            levels: [
              { value: 0, label: 'Inactive', description: 'No partners or collaborators identified. Working in isolation.' },
              { value: 1, label: 'Aware', description: 'Potential partners discussed internally but no outreach.' },
              { value: 2, label: 'Exploring', description: 'Partnerships named with general support but not formalized.' },
              { value: 3, label: 'Planning', description: 'Active partners involved moderately in planning meetings.' },
              { value: 4, label: 'Preparing', description: 'Partnerships clearly defined and providing consistent support.' },
              { value: 5, label: 'Ready', description: 'Well-established partnerships with aligned goals and clear roles.' }
            ]
          },
          { 
            id: 'postgrant', 
            title: 'Beyond Grant Term', 
            question: 'How positioned are you for sustainability beyond the grant?',
            levels: [
              { value: 0, label: 'Inactive', description: 'No sustainability planning. Grant seen as one-time opportunity.' },
              { value: 1, label: 'Aware', description: 'Few ideas for sustaining efforts but no clarity or plan.' },
              { value: 2, label: 'Exploring', description: 'Some sustainability strategies identified but informal.' },
              { value: 3, label: 'Planning', description: 'Moderate sustainability plan with partial clarity on resources.' },
              { value: 4, label: 'Preparing', description: 'Clear, realistic plan for maintaining or expanding components.' },
              { value: 5, label: 'Ready', description: 'Strong, actionable sustainability plan with specific follow-up steps.' }
            ]
          }
        ]
      },
      {
        id: 'sustainability',
        title: 'Factor 5: Impact and Sustainability',
        subfactors: [
          { 
            id: 'vision', 
            title: 'Vision for Impact', 
            question: 'How clear is your vision for sustaining a program?',
            levels: [
              { value: 0, label: 'Inactive', description: 'No vision developed or articulated.' },
              { value: 1, label: 'Aware', description: 'Vision may exist but is vague or disconnected from planning.' },
              { value: 2, label: 'Exploring', description: 'Vision exists but weakly connected to community needs.' },
              { value: 3, label: 'Planning', description: 'Moderately clear vision partially tied to participation goals.' },
              { value: 4, label: 'Preparing', description: 'Clear, compelling vision aligned with identified community needs.' },
              { value: 5, label: 'Ready', description: 'Strong, strategic vision for lasting impact. Organization fully aligned.' }
            ]
          },
          { 
            id: 'application', 
            title: 'Post-Grant Plan', 
            question: 'How effectively have you planned to apply knowledge?',
            levels: [
              { value: 0, label: 'Inactive', description: 'No plan to apply capacity after grant. Work may stop.' },
              { value: 1, label: 'Aware', description: 'General idea exists but plan is vague.' },
              { value: 2, label: 'Exploring', description: 'General plan in place but lacks detail or feasibility.' },
              { value: 3, label: 'Planning', description: 'Moderately developed plan outlines carrying forward some activities.' },
              { value: 4, label: 'Preparing', description: 'Clear, realistic implementation plan ready for transition.' },
              { value: 5, label: 'Ready', description: 'Strong, actionable post-grant plan with defined actions and accountability.' }
            ]
          },
          { 
            id: 'community', 
            title: 'Community Benefit', 
            question: 'How well do you demonstrate broader benefit?',
            levels: [
              { value: 0, label: 'Inactive', description: 'No consideration of broader impact beyond internal goals.' },
              { value: 1, label: 'Aware', description: 'Limited understanding of connection to community outcomes.' },
              { value: 2, label: 'Exploring', description: 'Some broader benefit described but loosely defined.' },
              { value: 3, label: 'Planning', description: 'Clear connection to broader impact outlined.' },
              { value: 4, label: 'Preparing', description: 'Strong case made with examples, partnerships, or systemic change.' },
              { value: 5, label: 'Ready', description: 'Measurable, well-documented community or sector-wide benefits demonstrated.' }
            ]
          }
        ]
      }
    ]
  };

  const allSubfactors = assessmentData.factors.flatMap(f => 
    f.subfactors.map(sf => ({ ...sf, factorTitle: f.title }))
  );

  const getReadinessLevel = (score) => {
    if (score === undefined || score === null) return { label: 'N/A', color: 'bg-gray-400' };
    if (score < 1) return { label: 'Inactive', color: 'bg-gray-400' };
    if (score < 2) return { label: 'Aware', color: 'bg-red-400' };
    if (score < 3) return { label: 'Exploring', color: 'bg-orange-400' };
    if (score < 4) return { label: 'Planning', color: 'bg-yellow-400' };
    if (score < 5) return { label: 'Preparing', color: 'bg-blue-400' };
    return { label: 'Ready', color: 'bg-green-400' };
  };

  const calculateResults = () => {
    const factorScores = {};
    assessmentData.factors.forEach(factor => {
      const scores = factor.subfactors
        .map(sf => responses[sf.id])
        .filter(s => s !== undefined);
      
      if (scores.length > 0) {
        factorScores[factor.id] = {
          title: factor.title,
          score: scores.reduce((a, b) => a + b, 0) / scores.length,
          subfactors: factor.subfactors.map(sf => ({
            title: sf.title,
            id: sf.id,
            score: responses[sf.id]
          }))
        };
      }
    });

    const overallScore = Object.values(factorScores).length > 0 
      ? Object.values(factorScores).reduce((sum, f) => sum + f.score, 0) / Object.values(factorScores).length
      : 0;

    return { factorScores, overallScore };
  };

  const exportToCSV = () => {
    const results = calculateResults();
    let csv = 'Factor,Subfactor,Score,Level,Comments\n';
    Object.entries(results.factorScores).forEach(([, data]) => {
      data.subfactors.forEach(sf => {
        const level = sf.score !== undefined ? getReadinessLevel(sf.score).label : 'N/A';
        const comment = (comments[sf.id] || '').replace(/"/g, '""');
        csv += `"${data.title}","${sf.title}",${sf.score ?? 'N/A'},"${level}","${comment}"\n`;
      });
    });
    csv += `\nOverall Score,${results.overallScore.toFixed(1)},"${getReadinessLevel(results.overallScore).label}"\n`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `repair-readiness-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getDetailedNextSteps = (subfactorId, currentScore) => {
    const nextSteps = {
      leadership: {
        0: "Schedule a board presentation to introduce housing preservation as a strategic opportunity. Share peer affiliate examples and local data on vulnerable homeowner populations. Use resources like the Housing Preservation Playbook to illustrate why repairs matter for your community.",
        1: "Move from informal awareness to structured exploration by forming a board and staff working group. Review Policy 33 together and invite HFHI staff or successful peer affiliates to present at a board meeting about housing preservation strategies.",
        2: "Develop a concept paper or case statement that frames housing preservation as a strategic priority. Schedule regular leadership discussions (quarterly minimum) about repair program feasibility, timeline, and resource requirements.",
        3: "Create a strategic roadmap with clear milestones for moving from planning to implementation. Establish board-level commitment by incorporating housing preservation goals into your strategic plan and identifying a board champion.",
        4: "Finalize board approval of repair program policy and concept. Assign executive-level accountability for program launch, establish success metrics, and begin communicating the vision internally and to stakeholders."
      },
      staff: {
        0: "Identify 1-2 staff members who could explore repair program feasibility. Create protected time for them to research peer affiliates, attend HFHI webinars, and gather preliminary information about what launching a program would require.",
        1: "Develop a participation strategy that outlines which staff will be involved in capacity building, their time commitment, and how learnings will be shared across the organization. Begin informal conversations about staff interest and capacity.",
        2: "Create a detailed learning plan that identifies specific training opportunities, assigns staff to participate, and establishes how they will apply new knowledge. Consider job descriptions or role adjustments to formalize repair program responsibilities.",
        3: "Confirm staff participation in comprehensive training and establish clear expectations for applying skills. Schedule regular team meetings to share learnings and begin drafting operational procedures based on training content.",
        4: "Complete all planned training with full staff engagement. Assign specific operational roles (intake coordinator, project manager, volunteer coordinator) and ensure staff have the tools and authority needed to move toward launch."
      },
      systems: {
        0: "Begin identifying what systems, tools, and equipment would be needed for repair operations. Research what other affiliates use for project tracking, intake management, and quality control. Make a preliminary list of gaps.",
        1: "Turn general awareness into specific planning by documenting current systems and identifying gaps. Create a prioritized list of improvements needed (intake process, project tracking, equipment inventory, contractor management).",
        2: "Test lightweight solutions for priority system needs. For example, pilot a simple intake form, try a project tracking spreadsheet, or conduct a tool inventory. Gather feedback from staff about what would make operations manageable.",
        3: "Develop a written system readiness plan that outlines which tools and procedures will be adopted, tested timeline, responsible parties, and budget requirements. Begin piloting key systems like intake databases or project management tools.",
        4: "Execute your system improvement plan by implementing intake databases, procurement procedures, contractor tracking, and quality control processes. Train all relevant staff on new systems and establish regular review cycles for continuous improvement."
      },
      housing: {
        0: "Start gathering basic information about housing conditions in your service area. Review census data, public health reports, or housing quality studies. Talk to local agencies serving vulnerable homeowners to understand what repair needs they observe.",
        1: "Move beyond anecdotes by initiating systematic data collection. Create a simple tracking system for repair inquiries, start a waiting list, or partner with agencies to document referrals. Attend community meetings to listen for housing concerns.",
        2: "Conduct targeted outreach to gather qualitative data about repair needs. Interview homeowners, survey community partners, or host listening sessions. Document specific examples of housing challenges and their impact on residents.",
        3: "Compile your findings into a needs assessment document with both quantitative data (number of inquiries, demographic information) and qualitative evidence (stories, examples, partner observations). Identify priority repair types and populations.",
        4: "Create a comprehensive community needs profile that demonstrates clear demand for repair services. Use multiple data sources (waitlists, assessments, partner referrals, external reports) to make a compelling case for program launch."
      },
      organizational: {
        0: "Begin identifying internal capacity gaps that would need to be addressed before launching a repair program. Consider staffing, systems, equipment, policies, and expertise. Document what's missing without judgment.",
        1: "Facilitate honest conversations with staff and leadership about organizational readiness. Use a simple self-assessment tool to identify gaps in policies, systems, technical knowledge, staffing, or equipment that relate to repair capacity.",
        2: "Connect identified capacity gaps to specific capacity-building needs. For each gap, articulate what support or investment would help address it (training, hiring, equipment purchase, system development, technical assistance).",
        3: "Develop a capacity-building plan that prioritizes gaps and outlines strategies for addressing them. Clearly link each capacity-building goal to repair program readiness. Begin implementing priority improvements.",
        4: "Execute your capacity-building plan with clear documentation of how investments support repair program launch. Track progress, adjust strategies as needed, and prepare to demonstrate organizational readiness to funders and partners."
      },
      timing: {
        0: "Explore whether housing preservation aligns with current organizational priorities and external trends. Consider whether there are emerging opportunities (new funding, partner interest, community demand) that create favorable timing.",
        1: "Document early indicators that suggest repairs could be timely: growing community requests, partner inquiries, staff interest, board curiosity, or alignment with strategic planning cycles. Build the case for exploring feasibility now.",
        2: "Assess whether current organizational conditions support moving forward with planning. Consider leadership transitions, strategic planning processes, funding opportunities, or community partnerships that create momentum.",
        3: "Establish clear rationale for pursuing capacity building now by linking timing to organizational priorities, community needs, and external opportunities. Set realistic timeline expectations with leadership and board.",
        4: "Communicate urgency effectively to internal and external stakeholders. Document time-sensitive factors (transitions, funding deadlines, community crises, strategic windows) that make immediate capacity building critical."
      },
      goals: {
        0: "Begin articulating what you hope to achieve through capacity building. Even if goals are preliminary, start capturing ideas about what repair program readiness would mean for your organization.",
        1: "Move from vague ideas to specific statements about capacity-building goals. What skills, systems, policies, or resources do you need to develop? Write these down even if they need refinement.",
        2: "Refine your goals to ensure they clearly connect to repair program readiness. For each goal, articulate how achieving it moves you closer to being able to serve homeowners. Prioritize goals based on importance.",
        3: "Develop SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) for capacity building. Ensure goals address core readiness elements: policy development, staff training, system improvements, partnership building.",
        4: "Finalize highly detailed, actionable goals that clearly support critical repair capacity components. Assign ownership, establish metrics for success, and integrate goals into project planning and accountability systems."
      },
      feasibility: {
        0: "Acknowledge that developing a feasible plan requires exploration. Begin researching what other affiliates did to build repair capacity. Identify 2-3 peer organizations you could learn from about realistic pathways to program launch.",
        1: "Draft a preliminary plan outline that addresses who will participate in capacity building, what activities are needed, when they will occur, and how learning will be applied. Expect this to be rough and incomplete.",
        2: "Develop your plan with more structure by identifying specific training opportunities, assigning tentative participants, outlining application steps, and establishing a general timeline. Fill in gaps through conversations with HFHI or peers.",
        3: "Create a realistic plan with clear strategy, confirmed participants, defined responsibilities, and feasible timeline. Ensure resources (time, budget, staff capacity) align with planned activities. Get leadership sign-off.",
        4: "Finalize a strong, detailed plan with clear pathways, backup strategies, and accountability mechanisms. Document how capacity-building activities connect to specific operational readiness milestones like policy approval or intake system implementation."
      },
      alignment: {
        0: "Begin thinking about how capacity-building activities would connect to actual program outcomes. What would success look like? How would capacity building help you serve homeowners effectively?",
        1: "Articulate the connection between capacity building and your desired impact. Move beyond ad hoc thinking to consider how training, systems, and partnerships position you to achieve housing preservation outcomes.",
        2: "Strengthen alignment by ensuring capacity-building activities address both immediate readiness needs and longer-term sustainability. Consider how what you build now will support ongoing program operations.",
        3: "Demonstrate clear alignment between capacity-building priorities and program goals. Show how planned activities support key outcomes: serving vulnerable homeowners, building sustainable operations, achieving quality standards.",
        4: "Achieve full alignment between capacity building and long-term outcomes including systems change, community impact, and organizational sustainability. Articulate theory of change connecting capacity investments to housing preservation impact."
      },
      resources: {
        0: "Begin identifying what resources beyond grant funding might support repair program development. Consider existing assets: staff expertise, volunteer networks, equipment, partner relationships, or in-kind support.",
        1: "Create a preliminary resource inventory that includes current assets and potential sources of additional support. Research funding opportunities, partnership possibilities, and creative resource-sharing arrangements.",
        2: "Develop a resource development strategy that identifies specific opportunities to leverage additional support. Reach out to potential partners, research grants, or explore volunteer recruitment strategies.",
        3: "Implement your resource development plan by actively pursuing complementary funding, formalizing partnerships, recruiting volunteers, or securing in-kind donations. Document resource diversity to demonstrate leverage.",
        4: "Execute a comprehensive resource development strategy that demonstrates strong leverage through diverse funding sources, active partnerships, volunteer engagement, and creative use of existing assets. Show clear plan for sustaining resource mobilization."
      },
      partnerships: {
        0: "Begin identifying potential partners who share interest in housing preservation. Consider local agencies, government programs, faith communities, healthcare organizations, or other nonprofits serving vulnerable homeowners.",
        1: "Reach out to potential partners for exploratory conversations. Share your interest in developing repair capacity and learn about their work. Identify mutual interests and potential collaboration opportunities.",
        2: "Move from informal discussions to more structured partnership conversations. Discuss specific ways partners could support capacity building or future program operations. Begin documenting partner commitments or expressions of support.",
        3: "Formalize key partnerships through MOUs, letters of support, or partnership agreements. Invite partners to participate in planning activities, training sessions, or advisory roles. Clarify mutual expectations and benefits.",
        4: "Activate well-established partnerships through joint activities like referral systems, co-training events, shared resources, or collaborative program design. Demonstrate how partnerships strengthen program capacity and community impact."
      },
      postgrant: {
        0: "Begin thinking about what happens after capacity-building support ends. Even if details are unclear, acknowledge that sustainability requires planning. Research how other affiliates sustained repair programs.",
        1: "Identify preliminary ideas for sustaining repair capacity beyond the grant period. Consider potential funding sources, fee structures, volunteer models, or partnership arrangements that could support ongoing operations.",
        2: "Develop informal sustainability strategies by exploring specific options: grant opportunities, program fees, volunteer coordination, partnership cost-sharing, or integration with existing programs. Test assumptions with peers.",
        3: "Create a moderate sustainability plan that outlines strategies for maintaining core program components after grant support ends. Identify likely funding sources, partnership roles, and operational efficiencies that enable continuation.",
        4: "Finalize a clear, realistic sustainability plan with specific funding strategies, partnership commitments, operational models, and contingency approaches. Assign responsibility for sustainability planning and establish metrics for tracking progress."
      },
      vision: {
        0: "Begin articulating why housing preservation matters for your community and organization. What impact do you hope to achieve? Who would benefit? How would repair services advance your mission?",
        1: "Develop your vision by connecting housing preservation to community needs and organizational purpose. Write a vision statement that describes what success would look like even if implementation details remain unclear.",
        2: "Strengthen your vision by grounding it in community needs data and organizational values. Engage staff and board in refining the vision to ensure broad ownership and connection to strategic priorities.",
        3: "Develop a moderately clear, compelling vision that articulates who you will serve, what types of repairs you will provide, how the program aligns with mission, and what community impact you seek to achieve.",
        4: "Finalize a strong, strategic vision for housing preservation that inspires internal alignment and external support. Articulate how repair services create lasting community impact, advance equity, and position your organization for sustainable growth."
      },
      application: {
        0: "Acknowledge that capacity-building investments should lead to actual program implementation. Begin thinking about what you would need to do after training and planning to actually serve homeowners.",
        1: "Develop preliminary ideas about how you will apply capacity-building learning. Will you launch a pilot? Integrate repairs into existing programs? Partner with others? Begin exploring options even if direction is unclear.",
        2: "Create a general plan for applying new capacity that outlines basic implementation steps, timeline, and resource requirements. Identify major milestones like completing policy, hiring staff, or conducting first projects.",
        3: "Develop a moderately detailed implementation plan that describes how you will transition from capacity building to program operations. Outline pilot activities, staffing models, partnership roles, and quality standards.",
        4: "Finalize a clear, realistic post-grant implementation plan with specific activities, responsible parties, timeline, and success metrics. Demonstrate that capacity-building investments will translate directly into serving homeowners."
      },
      community: {
        0: "Begin thinking about how repair program development connects to broader community benefit beyond your organization's internal goals. Who benefits? How does this advance community well-being?",
        1: "Articulate preliminary connections between repair capacity building and community outcomes. Consider impacts on homeowner health, safety, stability, and dignity. Think about neighborhood-level effects.",
        2: "Strengthen the case for community benefit by connecting repair services to documented needs, vulnerable populations, and community development goals. Begin describing both individual and systemic impacts.",
        3: "Clearly articulate how repair program development creates broader community benefit. Document connections to health outcomes, aging in place, neighborhood stability, equity, and community development priorities.",
        4: "Demonstrate measurable, well-documented community benefits through data, examples, and projected outcomes. Show how repair capacity building advances sector-wide goals, systemic change, and meaningful impact for vulnerable populations."
      }
    };

    return nextSteps[subfactorId]?.[currentScore] || "Continue building capacity in this area by implementing the recommendations from your assessment guide.";
  };

  const getRecommendations = (factorScores) => {
    const recs = [];
    Object.entries(factorScores).forEach(([, data]) => {
      data.subfactors.forEach(sf => {
        if (sf.score !== undefined) {
          let priority = 'Low';
          if (sf.score === 5) priority = 'Ready';
          else if (sf.score < 2) priority = 'High';
          else if (sf.score < 3) priority = 'Medium';
          
          const subfactorId = allSubfactors.find(s => s.title === sf.title)?.id;
          const detailedNextSteps = subfactorId ? getDetailedNextSteps(subfactorId, sf.score) : '';
          
          recs.push({
            factor: data.title,
            subfactor: sf.title,
            score: sf.score,
            priority,
            nextSteps: detailedNextSteps
          });
        }
      });
    });
    return recs.sort((a, b) => a.score - b.score);
  };

  const currentSubfactor = allSubfactors[currentStep];
  const totalQuestions = allSubfactors.length;
  const answeredQuestions = Object.keys(responses).length;
  const completionPercentage = (answeredQuestions / totalQuestions) * 100;
  const isAssessmentComplete = answeredQuestions === totalQuestions;

  const TopNav = () => (
    <div className="bg-white border-b shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('welcome')}
              className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors"
              title={CONTENT.nav.backToHome}
            >
              <Home className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-800">{CONTENT.nav.homeTitle}</h1>
              <p className="text-xs text-gray-500">v{CONTENT.version}</p>
            </div>
          </div>
          <nav className="flex gap-2">
            {[
              { key: 'assessment', label: CONTENT.nav.assessment },
              { key: 'results', label: CONTENT.nav.results },
              { key: 'dashboard', label: CONTENT.nav.dashboard },
              { key: 'next-steps', label: CONTENT.nav.nextSteps }
            ].map(view => (
              <button
                key={view.key}
                onClick={() => setCurrentView(view.key)}
                className={`px-4 py-2 rounded-lg font-medium text-sm ${
                  currentView === view.key
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                }`}
              >
                {view.label}
              </button>
            ))}
            <button
              onClick={() => window.open(guideUrl, '_blank')}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm"
              title={CONTENT.welcome.guideButton}
            >
              <Download className="w-4 h-4" />
              {CONTENT.nav.guide}
            </button>
          </nav>
        </div>
      </div>
    </div>
  );

  if (currentView === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {CONTENT.welcome.title}
              </h1>
              <p className="text-blue-100 text-lg">
                {CONTENT.welcome.subtitle}
              </p>
            </div>

            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{CONTENT.welcome.aboutTitle}</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold">15</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{CONTENT.welcome.questionCount}</h3>
                      <p className="text-gray-600 text-sm">{CONTENT.welcome.questionDetails}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold">⏱️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{CONTENT.welcome.duration}</h3>
                      <p className="text-gray-600 text-sm">{CONTENT.welcome.durationDetails}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold">📊</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{CONTENT.welcome.results}</h3>
                      <p className="text-gray-600 text-sm">{CONTENT.welcome.resultsDetails}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold">💾</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{CONTENT.welcome.save}</h3>
                      <p className="text-gray-600 text-sm">{CONTENT.welcome.saveDetails}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{CONTENT.welcome.guideTitle}</h3>
                    <p className="text-gray-700 text-sm mb-4">{CONTENT.welcome.guideDescription}</p>
                    <button
                      onClick={() => window.open(guideUrl, '_blank')}
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md hover:shadow-lg"
                    >
                      <Download className="w-5 h-5" />
                      {CONTENT.welcome.guideButton}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  {CONTENT.welcome.tipsTitle}
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  {CONTENT.welcome.tips.map((tip, idx) => (
                    <li key={idx}>• {tip}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setCurrentView('assessment')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg hover:shadow-xl"
                >
                  {CONTENT.welcome.startButton}
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-6">
                Version {CONTENT.version} - {CONTENT.welcome.versionNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'assessment') {
    return (
      <>
        <TopNav />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                    <Home className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Home Repair Program Readiness Assessment</h1>
                    <p className="text-blue-100 text-sm">Evaluate your organization readiness</p>
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold">Progress</span>
                    <span className="text-sm font-semibold">{answeredQuestions} / {totalQuestions}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full transition-all" style={{ width: `${completionPercentage}%` }} />
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">
                    {currentSubfactor.factorTitle}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{currentSubfactor.title}</h2>
                  <p className="text-gray-600 text-lg">{currentSubfactor.question}</p>
                </div>

                <div className="space-y-3">
                  {currentSubfactor.levels.map(level => (
                    <button
                      key={level.value}
                      onClick={() => setResponses({ ...responses, [currentSubfactor.id]: level.value })}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        responses[currentSubfactor.id] === level.value
                          ? 'border-blue-600 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          responses[currentSubfactor.id] === level.value
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-gray-300'
                        }`}>
                          {responses[currentSubfactor.id] === level.value && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 mb-1">{level.label}</div>
                          <div className="text-sm text-gray-600">{level.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {showComments ? 'Hide' : 'Add'} Notes
                  </button>
                  {showComments && (
                    <textarea
                      value={comments[currentSubfactor.id] || ''}
                      onChange={(e) => setComments({ ...comments, [currentSubfactor.id]: e.target.value })}
                      placeholder="Add notes about this question..."
                      className="w-full mt-3 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                      rows="3"
                    />
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-6 flex justify-between border-t">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 font-semibold"
                >
                  <ChevronLeft className="w-5 h-5" /> Previous
                </button>

                {currentStep === allSubfactors.length - 1 ? (
                  <button
                    onClick={() => setCurrentView('results')}
                    className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                  >
                    <FileText className="w-5 h-5" /> View Results
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={responses[currentSubfactor.id] === undefined}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold"
                  >
                    Next <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (currentView === 'results') {
    return (
      <>
        <TopNav />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <div className="mb-6 flex flex-wrap justify-between items-start gap-4">
              <h2 className="text-3xl font-bold">Results</h2>
              <div className="flex gap-2">
                <button onClick={exportToCSV} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
                  <Download className="w-4 h-4" /> Export CSV
                </button>
                <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 font-semibold">
                  <Printer className="w-4 h-4" /> Print to PDF
                </button>
              </div>
            </div>
            {assessmentData.factors.map(factor => (
              <div key={factor.id} className="mb-8">
                <div className="bg-blue-600 rounded-t-lg p-4 text-white">
                  <h3 className="text-xl font-bold">{factor.title}</h3>
                </div>
                <div className="border rounded-b-lg">
                  {factor.subfactors.map((sf, idx) => {
                    const resp = responses[sf.id];
                    const selectedLevel = resp !== undefined ? sf.levels.find(l => l.value === resp) : null;
                    const rl = getReadinessLevel(resp);
                    return (
                      <div key={sf.id} className={`p-6 ${idx < factor.subfactors.length - 1 ? 'border-b' : ''}`}>
                        <h4 className="font-semibold text-lg mb-3">{sf.title}</h4>
                        {selectedLevel ? (
                          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${rl.color} text-white`}>
                                {rl.label}
                              </span>
                              <span className="text-sm text-gray-600">Score: {resp}/5</span>
                            </div>
                            <p className="text-gray-700 mb-2">{selectedLevel.description}</p>
                            {comments[sf.id] && (
                              <div className="mt-3 pt-3 border-t flex items-start gap-2">
                                <MessageSquare className="w-4 h-4 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-xs font-semibold text-blue-800">Notes:</p>
                                  <p className="text-sm text-gray-700 italic">{comments[sf.id]}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="bg-gray-100 border p-4 rounded">
                            <p className="text-gray-500 italic">Not answered</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {isAssessmentComplete && (
              <div className="flex justify-center gap-4">
                <button onClick={() => setCurrentView('dashboard')} className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                  View Dashboard
                </button>
                <button onClick={() => setCurrentView('next-steps')} className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
                  Next Steps
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  if (currentView === 'dashboard') {
    const results = isAssessmentComplete ? calculateResults() : null;
    const getDist = () => {
      const d = { Inactive: 0, Aware: 0, Exploring: 0, Planning: 0, Preparing: 0, Ready: 0 };
      allSubfactors.forEach(sf => {
        const score = responses[sf.id];
        if (score !== undefined) d[getReadinessLevel(score).label]++;
      });
      return d;
    };
    const dist = getDist();

    const getReadinessDescription = (score) => {
      if (score < 1) return {
        stage: 'Inactive',
        description: 'Your organization is at the **Inactive** stage of readiness with an overall score of **' + score.toFixed(1) + ' out of 5.0**. At this stage, there is limited awareness or discussion of home repairs among board or leadership, and no clear connection has been made between existing organizational gaps and the need for capacity building. Home repair programming is not yet seen as a relevant or strategic topic for your affiliate. Leadership may not have initiated formal conversations about housing preservation, and there is minimal understanding of how repair services could fit into your mission or strategic priorities. Staff have not been assigned to explore this work, and internal systems for managing repair operations are not in place. To advance readiness, begin by educating leadership on why repairs matter through peer affiliate examples, local data on vulnerable populations, or resources like the Housing Preservation Playbook. Consider scheduling a board presentation to introduce housing preservation as a strategic growth area, and start informal discussions about whether repair services align with your community needs and organizational capacity. Focus on building awareness and exploring whether this work could serve your mission before moving to more structured planning.'
      };
      if (score < 2) return {
        stage: 'Aware',
        description: 'Your organization is at the **Aware** stage of readiness with an overall score of **' + score.toFixed(1) + ' out of 5.0**. At this stage, there is general recognition that something is missing or that repairs could be valuable, but the connection to repair readiness remains vague. Leadership may have expressed informal interest in home repairs, but no formal conversations or strategic plans have been developed. Staff may be aware of repair needs in the community through anecdotal evidence or one-off requests, but no systematic data gathering has occurred. The organization lacks clarity on internal capacity gaps, and there is limited understanding of what resources, systems, or staffing would be needed to launch a repair program. Goals remain unclear or unrealistic, and no concrete steps have been taken toward planning or capacity building. To advance readiness, use board meetings or staff retreats to introduce housing preservation more formally through presentations from HFHI staff or peer affiliates who have launched successful programs. Begin conversations about "what\'s missing" by framing discussions around what would make your organization more prepared to run a repair program. Start collecting basic local indicators such as public health data, housing quality reports, or census information showing homeowner challenges in your service area. Engage local partners—agencies, churches, or nonprofits serving vulnerable homeowners—to gather insights about repair needs they are observing. The goal is to move from general awareness to intentional exploration.'
      };
      if (score < 3) return {
        stage: 'Exploring',
        description: 'Your organization is at the **Exploring** stage of readiness with an overall score of **' + score.toFixed(1) + ' out of 5.0**. Your team has begun to identify some internal needs or challenges and is starting to tie them to potential repair program goals or capacity strategies. Leadership has initiated exploratory conversations and shown interest in small-scale repair activities, though these discussions remain informal. One or two staff members may have been named to explore feasibility, but their responsibilities, time commitments, and roles in future program development remain unclear. The organization has community-level awareness of repair needs supported by anecdotes or limited examples, but lacks detailed quantitative data or systematic needs assessment. Internal capacity gaps have been acknowledged—such as staffing shortages, tool limitations, or system deficiencies—but are not clearly linked to a capacity-building strategy. A few goals may have been identified, but they remain loosely tied to repair readiness. Initial conversations about system improvements (tracking tools, project workflow, equipment) have started, but no action has been taken yet. At this stage, you\'re moving beyond awareness into early exploration. To advance readiness, form a board and staff working group to explore feasibility more systematically. Draft a participation strategy identifying key roles and how learnings will be shared across the organization. Begin capturing real data on community repair needs by tracking inquiries, starting a waiting list, or conducting interviews and surveys with homeowners. Turn discussions about system improvements into early planning by testing lightweight tools or gathering stakeholder feedback. Review Policy 33 together as a team and start developing a short concept paper that outlines your vision. The goal is to move from informal conversations to structured exploration with defined next steps.'
      };
      if (score < 4) return {
        stage: 'Planning',
        description: 'Your organization is at the **Planning** stage of readiness with an overall score of **' + score.toFixed(1) + ' out of 5.0**. You have identified key gaps and are beginning to explore how to address them, with the team aligning around next steps and early strategies. Leadership and board have moved beyond exploration to regular discussions about repair programming, and home repairs are now part of formal strategic conversations. Specific staff have been selected for training and planning activities, though their participation may still be limited to select sessions or informal involvement. The organization has identified some specific housing stabilization needs through intentional efforts such as partner referrals, qualitative feedback, or early data gathering. Capacity-building needs are being explored, with the affiliate beginning to understand how internal gaps relate to repair readiness. Goals are moderately clear and generally aligned with repair capacity building, though some may need refinement or prioritization. A realistic plan exists with basic strategy and key team members identified, and system and equipment needs have been clearly identified with early-stage planning, piloting, or budgeting underway. Partnerships have been named with general support, though not yet formalized, and there is moderate planning for sustainability with partial clarity around resources and future direction. To advance readiness, develop a strategic roadmap or case statement that aligns the board around timing, goals, and what launching a pilot would require. Build momentum by developing a detailed training and learning plan that aligns staff participation with key development milestones such as policy creation or intake design. Document repair needs in a simple format—create a summary or slide deck illustrating examples, costs, and populations affected. Create a system readiness plan outlining which tools or procedures will be adopted, tested, or adapted. Begin formalizing partnerships with MOUs or partnership agreements that clarify roles and responsibilities. The goal is to move from early planning to concrete preparation with documented plans and assigned accountability.'
      };
      if (score < 5) return {
        stage: 'Preparing',
        description: 'Your organization is at the **Preparing** stage of readiness with an overall score of **' + score.toFixed(1) + ' out of 5.0**. You have clearly defined needs directly tied to repair program readiness, with drafts, outlines, or initial frameworks in place to seek support or implement improvements. Housing preservation has been integrated into strategic planning, and leadership and board have taken early steps such as assigning staff, approving concept drafts, including repairs in strategic planning, or exploring funding opportunities. Staff have been identified, scheduled for learning, and assigned to apply new skills to planning or early implementation steps, demonstrating organizational commitment to capacity building. The affiliate has a clear understanding of housing repair needs supported by specific data sources, community feedback, or observable trends, and capacity-building goals are specific and realistic, tied directly to core elements of repair readiness such as staffing, systems development, or training. A written, resourced plan exists with clear structure, responsibilities, and timing, and participants are confirmed with internal processes in place to support engagement. A documented and organized plan exists to strengthen administrative, operational, and equipment-related systems, with staff roles clearly defined and implementation timelines established. Partnerships are clearly defined and providing consistent support, and there is a clear, realistic plan for maintaining or expanding program components after grant support ends. The organization demonstrates strong alignment with capacity-building goals, clearly geared toward sustainability and strategic impact. To move to full readiness, begin developing operational components such as drafting or revising a board-approved repair policy and outlining a staffing or volunteer model. Finalize operational procedures and quality standards, complete staff training and role assignments, and prepare for internal systems development. Use community needs data to shape your program design by aligning repair priorities (accessibility, roofing, HVAC) with actual needs. Begin executing on key system areas such as implementing an intake database, procurement tools, and contractor tracking, ensuring staff are trained and resourced. Activate partnerships through joint activities like referral systems, co-training events, or shared resource pools. The goal is to move from preparation to operational readiness with all systems, staff, and partnerships in place for launch.'
      };
      return {
        stage: 'Ready',
        description: 'Your organization is **Ready** to launch a home repair program with an exceptional overall score of **' + score.toFixed(1) + ' out of 5.0**. Congratulations! Housing preservation is fully embedded in your affiliate\'s strategic vision, and you are well-positioned to pursue funding, technical assistance, or pilot implementation. Leadership is aligned, engaged, and actively preparing for launch with a clear commitment from board and executive team. A dedicated team or cross-functional staff group is fully committed, engaged in learning, and equipped with a plan to lead development of the affiliate\'s repair program. The organization has a strong, data-driven understanding of housing repair needs, supported by waitlists, formal assessments, external reports, or comprehensive community feedback, demonstrating clear demand for services. Capacity-building investments are justified with data and directly linked to repair program implementation or sustainability. Goals are highly detailed, actionable, and directly support critical components of home repair capacity such as program design, systems development, staffing, and equity considerations. The plan is strong and feasible with clear pathways for participation, structured application of learning, and accountability for follow-through. Your approach is fully aligned with long-term outcomes including sustainability, systems change, and the affiliate\'s ability to deliver home repair services over time. A fully developed and actionable system improvement plan is in place, integrated across your organization and aligned with your repair launch timeline, including tools for tracking, project management, and compliance. Well-established partnerships exist with aligned goals, clear roles, and active engagement, positioning the organization to leverage external support effectively. A strong, actionable sustainability plan with specific follow-up steps, responsible parties, and transition supports is in place, ensuring the program can continue and potentially scale beyond initial funding. Your organization should now focus on operational readiness by moving into the execution phase. Finalize resource allocation, assign staff to operational roles, establish quality control mechanisms, and begin pilot activities or soft launches. Continue building your case for ongoing funding by documenting early successes and demonstrating community impact. Use outcome frameworks or the Quality of Life Framework to communicate the full value of your approach to funders and community partners. Prepare for continuous improvement through regular evaluation and adaptation as you learn from implementation experience. Your readiness positions you not just to launch, but to build a sustainable, impactful repair program that serves your community for years to come.'
      };
    };

    return (
      <>
        <TopNav />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <div className="mb-6 flex flex-wrap justify-between items-start gap-4">
              <h2 className="text-3xl font-bold">Assessment Results</h2>
              <div className="flex gap-2">
                <button onClick={exportToCSV} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
                  <Download className="w-4 h-4" /> Export CSV
                </button>
                <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 font-semibold">
                  <Printer className="w-4 h-4" /> Print to PDF
                </button>
              </div>
            </div>
            {!isAssessmentComplete ? (
              <div className="bg-amber-50 border-l-4 border-orange-500 p-8 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{CONTENT.dashboard.incompleteTitle}</h3>
                    <p className="text-gray-700 mb-6">
                      {CONTENT.dashboard.incompleteMessage}
                    </p>
                    <button
                      onClick={() => setCurrentView('assessment')}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                    >
                      {CONTENT.dashboard.continueButton} ({answeredQuestions}/{totalQuestions} {CONTENT.dashboard.completedLabel})
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white border rounded-lg p-8 mb-6">
                  <h3 className="text-2xl font-bold text-center mb-6">Overall Readiness Level</h3>
                  <div className="flex items-center gap-8 mb-6">
                    <div className="flex-1">
                      <div className="relative h-16 rounded-full overflow-visible mb-2" style={{
                        background: 'linear-gradient(to right, #9ca3af 0%, #9ca3af 20%, #f87171 20%, #f87171 40%, #fb923c 40%, #fb923c 60%, #fbbf24 60%, #fbbf24 80%, #60a5fa 80%, #60a5fa 100%)'
                      }}>
                        <div 
                          className="absolute top-0 h-full w-1 bg-gray-900 shadow-lg z-10"
                          style={{ left: `${(results.overallScore / 5) * 100}%` }}
                        >
                          <div className="absolute -top-12 left-0 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-base font-bold whitespace-nowrap shadow-md">
                            {results.overallScore.toFixed(1)}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                          </div>
                          <div className="absolute -bottom-12 left-0 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded text-xs font-semibold whitespace-nowrap shadow-md">
                            Your Score
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-900"></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-12 text-xs text-gray-600">
                        <span>0.0</span>
                        <span>1.0</span>
                        <span>2.0</span>
                        <span>3.0</span>
                        <span>4.0</span>
                        <span>5.0</span>
                      </div>
                      <div className="flex justify-between mt-1 text-xs font-semibold">
                        <span className="text-gray-500">Inactive</span>
                        <span className="text-red-500">Aware</span>
                        <span className="text-orange-500">Exploring</span>
                        <span className="text-yellow-500">Planning</span>
                        <span className="text-blue-500">Preparing</span>
                        <span className="text-green-500">Ready</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-center">
                      <p className="text-gray-600 text-sm mb-2">Your Score</p>
                      <div className="w-32 h-32 rounded-full border-8 flex items-center justify-center" style={{
                        borderColor: results.overallScore < 1 ? '#9ca3af' : 
                                    results.overallScore < 2 ? '#f87171' : 
                                    results.overallScore < 3 ? '#fb923c' : 
                                    results.overallScore < 4 ? '#fbbf24' : 
                                    results.overallScore < 5 ? '#60a5fa' : '#34d399'
                      }}>
                        <div>
                          <div className="text-4xl font-bold">{results.overallScore.toFixed(1)}</div>
                          <div className="text-sm text-gray-600">out of 5.0</div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold text-white`} style={{
                          backgroundColor: results.overallScore < 1 ? '#9ca3af' : 
                                         results.overallScore < 2 ? '#f87171' : 
                                         results.overallScore < 3 ? '#fb923c' : 
                                         results.overallScore < 4 ? '#fbbf24' : 
                                         results.overallScore < 5 ? '#60a5fa' : '#34d399'
                        }}>
                          {getReadinessLevel(results.overallScore).label}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{
                      __html: getReadinessDescription(results.overallScore).description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }} />
                  </div>
                </div>

                <div className="flex gap-3 mb-8">
                  <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 font-semibold">
                    <Printer className="w-5 h-5" /> {CONTENT.dashboard.printButton}
                  </button>
                  <button onClick={() => setCurrentView('next-steps')} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                    <TrendingUp className="w-5 h-5" /> {CONTENT.dashboard.actionItemsButton}
                  </button>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">{CONTENT.dashboard.distributionTitle}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                      { label: 'Inactive', color: 'bg-gray-400', borderColor: 'border-gray-300', bgColor: 'bg-gray-50' },
                      { label: 'Aware', color: 'bg-red-400', borderColor: 'border-red-300', bgColor: 'bg-red-50' },
                      { label: 'Exploring', color: 'bg-orange-400', borderColor: 'border-orange-300', bgColor: 'bg-orange-50' },
                      { label: 'Planning', color: 'bg-yellow-400', borderColor: 'border-yellow-300', bgColor: 'bg-yellow-50' },
                      { label: 'Preparing', color: 'bg-blue-400', borderColor: 'border-blue-300', bgColor: 'bg-blue-50' },
                      { label: 'Ready', color: 'bg-green-400', borderColor: 'border-green-300', bgColor: 'bg-green-50' }
                    ].map(item => (
                      <div key={item.label} className={`${item.bgColor} ${item.borderColor} border-2 rounded-lg p-4 text-center`}>
                        <div className={`w-16 h-16 ${item.color} rounded-full mx-auto mb-3 flex items-center justify-center shadow-md`}>
                          <span className="text-white font-bold text-2xl">{dist[item.label]}</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-700">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-6">{CONTENT.dashboard.factorOverviewTitle}</h3>
                {assessmentData.factors.map(factor => {
                  const factorData = results.factorScores[factor.id];
                  if (!factorData) return null;
                  const level = getReadinessLevel(factorData.score);
                  const percentage = (factorData.score / 5) * 100;
                  return (
                    <div key={factor.id} className="bg-white rounded-lg border mb-4 overflow-hidden">
                      <div className="p-4 bg-gray-50 flex justify-between items-center">
                        <h4 className="font-bold">{factor.title}</h4>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold">{factorData.score.toFixed(1)}</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${level.color} text-white`}>
                            {level.label}
                          </span>
                        </div>
                      </div>
                      <div className="px-4 pt-2">
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div className={`h-4 rounded-full ${level.color} transition-all duration-500`} style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        {factor.subfactors.map(sf => {
                          const sfScore = responses[sf.id];
                          const sfLevel = getReadinessLevel(sfScore);
                          return (
                            <div key={sf.id} className="flex justify-between text-sm">
                              <span className="text-gray-700">{sf.title}</span>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${sfLevel.color} text-white`}>
                                {sfLevel.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  if (currentView === 'next-steps') {
    const results = isAssessmentComplete ? calculateResults() : null;
    const recs = results ? getRecommendations(results.factorScores) : [];
    const high = recs.filter(r => r.priority === 'High');
    const med = recs.filter(r => r.priority === 'Medium');
    const low = recs.filter(r => r.priority === 'Low');
    const ready = recs.filter(r => r.priority === 'Ready');

    return (
      <>
        <TopNav />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <div className="mb-6 flex flex-wrap justify-between items-start gap-4">
              <h2 className="text-3xl font-bold">Next Steps</h2>
              <div className="flex gap-2">
                <button onClick={exportToCSV} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
                  <Download className="w-4 h-4" /> Export CSV
                </button>
                <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 font-semibold">
                  <Printer className="w-4 h-4" /> Print to PDF
                </button>
              </div>
            </div>
            {!isAssessmentComplete ? (
              <div className="bg-amber-50 border-l-4 border-orange-500 p-8 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Assessment First</h3>
                    <p className="text-gray-700 mb-6">
                      Personalized next steps will be available once you complete all assessment questions.
                    </p>
                    <button
                      onClick={() => setCurrentView('assessment')}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                    >
                      Continue Assessment ({answeredQuestions}/{totalQuestions} completed)
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    General Guidance
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Review areas scoring below <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-yellow-400 text-white">Planning (3)</span> for immediate attention</li>
                    <li>• Create a 3-6 month action plan addressing your lowest-scoring factors</li>
                    <li>• Engage leadership and staff in discussing assessment results</li>
                    <li>• Connect with HFHI for technical assistance in priority areas</li>
                    <li>• Schedule a follow-up assessment in 6 months to track progress</li>
                  </ul>
                </div>

                {high.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                      High Priority Action Items
                    </h3>
                    <div className="space-y-4">
                      {high.map((rec, idx) => (
                        <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-6">
                          <div className="mb-3">
                            <div className="inline-block px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold mb-3">
                              High Priority
                            </div>
                            <h4 className="font-bold text-gray-800 text-lg">{rec.subfactor} - Score: {rec.score}</h4>
                            <p className="text-sm text-gray-600 mt-1">{rec.factor}</p>
                          </div>
                          {rec.nextSteps && (
                            <div className="mt-4 p-4 bg-white rounded border border-red-100">
                              <p className="text-sm font-semibold text-gray-700 mb-2">Recommended Next Steps:</p>
                              <p className="text-sm text-gray-700 leading-relaxed">{rec.nextSteps}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {med.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-yellow-600" />
                      Medium Priority Action Items
                    </h3>
                    <div className="space-y-4">
                      {med.map((rec, idx) => (
                        <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                          <div className="mb-3">
                            <div className="inline-block px-3 py-1 rounded bg-yellow-600 text-white text-xs font-semibold mb-3">
                              Medium Priority
                            </div>
                            <h4 className="font-bold text-gray-800 text-lg">{rec.subfactor} - Score: {rec.score}</h4>
                            <p className="text-sm text-gray-600 mt-1">{rec.factor}</p>
                          </div>
                          {rec.nextSteps && (
                            <div className="mt-4 p-4 bg-white rounded border border-yellow-100">
                              <p className="text-sm font-semibold text-gray-700 mb-2">Recommended Next Steps:</p>
                              <p className="text-sm text-gray-700 leading-relaxed">{rec.nextSteps}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {low.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-gray-600" />
                      Low Priority Action Items
                    </h3>
                    <div className="space-y-4">
                      {low.map((rec, idx) => (
                        <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                          <div className="mb-3">
                            <div className="inline-block px-3 py-1 rounded bg-gray-500 text-white text-xs font-semibold mb-3">
                              Low Priority
                            </div>
                            <h4 className="font-bold text-gray-800 text-lg">{rec.subfactor} - Score: {rec.score}</h4>
                            <p className="text-sm text-gray-600 mt-1">{rec.factor}</p>
                          </div>
                          {rec.nextSteps && (
                            <div className="mt-4 p-4 bg-white rounded border border-gray-100">
                              <p className="text-sm font-semibold text-gray-700 mb-2">Recommended Next Steps:</p>
                              <p className="text-sm text-gray-700 leading-relaxed">{rec.nextSteps}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {ready.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      Ready - Maintain Excellence
                    </h3>
                    <div className="space-y-4">
                      {ready.map((rec, idx) => (
                        <div key={idx} className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <div className="mb-3">
                            <div className="inline-block px-3 py-1 rounded bg-green-600 text-white text-xs font-semibold mb-3">
                              Ready
                            </div>
                            <h4 className="font-bold text-gray-800 text-lg">{rec.subfactor} - Score: {rec.score}</h4>
                            <p className="text-sm text-gray-600 mt-1">{rec.factor}</p>
                          </div>
                          <div className="mt-4 p-4 bg-white rounded border border-green-100">
                            <p className="text-sm font-semibold text-green-700 mb-2">✓ Excellent Progress!</p>
                            <p className="text-sm text-gray-700 leading-relaxed">You have achieved readiness in this area. Continue maintaining excellence and share your success strategies with other areas that need development.</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  return <div>Loading...</div>;
};

export default ReadinessApp;