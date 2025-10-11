import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Home, CheckCircle, AlertCircle, BarChart3, Target, ListChecks, FileText } from 'lucide-react';

const ReadinessApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [activeView, setActiveView] = useState('assessment');

  const subfactors = [
    { 
      id: 'leadership', 
      title: 'Leadership and Board Commitment', 
      question: 'How would you rate your organization leadership and board commitment toward developing a home repair program?', 
      factor: 'Factor 1: Capacity of Affiliate',
      levels: [
        { value: 0, label: 'Inactive', description: 'No awareness or discussion of home repairs among board or leadership.', nextSteps: 'Begin by educating leadership on why repairs matter. Review the Housing Preservation Playbook and local data on vulnerable populations.' },
        { value: 1, label: 'Aware', description: 'Some vague awareness, but no structured discussions or expressed interest.', nextSteps: 'Use board meetings to introduce housing preservation as a strategic growth area. Consider inviting an HFHI staffer or peer affiliate to present.' },
        { value: 2, label: 'Exploring', description: 'Informal conversations in response to one-off repair needs, no sustained planning.', nextSteps: 'Form a board/staff working group to explore feasibility. Draft a short concept paper or start a light community needs scan.' },
        { value: 3, label: 'Planning', description: 'Regular discussions about preservation potential but no commitment to action yet.', nextSteps: 'Develop a strategic roadmap or case statement. Align the board around timing, goals, and what launching a pilot would require.' },
        { value: 4, label: 'Preparing', description: 'Early steps taken: assigning staff, approving concepts, exploring funding.', nextSteps: 'Begin developing operational components. Draft or revise a board-approved repair policy and outline a staffing model.' },
        { value: 5, label: 'Ready', description: 'Housing preservation embedded in strategy. Leadership aligned and preparing for launch.', nextSteps: 'Move into operational readiness phase. Finalize resource allocation and develop a Repair-focused Policies and Procedures manual.' }
      ]
    },
    { 
      id: 'staff', 
      title: 'Staff Commitment to Learn and Implement', 
      question: 'How prepared and committed is your staff to engage in training and apply what is learned?', 
      factor: 'Factor 1: Capacity of Affiliate',
      levels: [
        { value: 0, label: 'Inactive', description: 'No staff assigned or identified. No clear strategy or timeline.', nextSteps: 'Start with internal discussions about program potential. Identify who would likely lead or support repair efforts.' },
        { value: 1, label: 'Aware', description: 'General leadership support, but limited staff enthusiasm or participation expected.', nextSteps: 'Increase internal engagement by presenting the vision and value of repairs to staff. Help them understand how repair aligns with mission.' },
        { value: 2, label: 'Exploring', description: 'One or two staff named, but responsibilities and time commitment unclear.', nextSteps: 'Clarify roles and expectations. Develop a simple staff readiness plan identifying who will participate in capacity building efforts.' },
        { value: 3, label: 'Planning', description: 'Specific staff selected for training, though participation may be limited.', nextSteps: 'Build on momentum by developing a training and learning plan. Align participation with key development milestones.' },
        { value: 4, label: 'Preparing', description: 'Staff identified, scheduled for learning, and assigned to apply new skills.', nextSteps: 'Begin integrating learning into program design. Ensure staff have time and support to implement what they learn.' },
        { value: 5, label: 'Ready', description: 'Team fully committed, engaged in learning, equipped to lead program development.', nextSteps: 'Formalize your program buildout. Begin mapping procedures such as intake and construction project management steps.' }
      ]
    },
    { 
      id: 'systems', 
      title: 'Internal Systems Development', 
      question: 'How well has your organization identified and planned for improvements to key systems?', 
      factor: 'Factor 1: Capacity of Affiliate',
      levels: [
        { value: 0, label: 'Inactive', description: 'No resource needs identified, no tools or equipment or processes in place.', nextSteps: 'Begin by reviewing your current systems through a preservation lens. Identify where existing procedures may fall short.' },
        { value: 1, label: 'Aware', description: 'Some awareness that systems need attention, but no action plan.', nextSteps: 'Document known limitations and start prioritizing system areas for development. Bring together staff to assess gaps collaboratively.' },
        { value: 2, label: 'Exploring', description: 'Initial conversations about improvements, but no action taken yet.', nextSteps: 'Turn discussion into early planning. Assign team members to explore solutions or test lightweight tools that could support future repairs.' },
        { value: 3, label: 'Planning', description: 'System needs clearly identified. Beginning planning, piloting, or budgeting.', nextSteps: 'Create a system readiness plan. Outline which tools or procedures will be adopted, tested, or adapted for home repair.' },
        { value: 4, label: 'Preparing', description: 'Documented plan to strengthen systems. Staff roles clearly defined.', nextSteps: 'Advance into implementation. Begin executing on key areas like intake database, procurement tools, and contractor tracking.' },
        { value: 5, label: 'Ready', description: 'Fully developed, actionable system improvement plan aligned with launch timeline.', nextSteps: 'You are operationally ready. Begin aligning internal tools with project lifecycle and tracking metrics.' }
      ]
    },
    { 
      id: 'housing', 
      title: 'Housing Stabilization Needs', 
      question: 'How well has your organization determined housing repair needs within your community?', 
      factor: 'Factor 2: Repair Program Need',
      levels: [
        { value: 0, label: 'Inactive', description: 'No repair-related data gathered. No community listening or needs assessment.', nextSteps: 'Start by collecting basic local indicators. Look for public health data, local housing quality reports, or census data.' },
        { value: 1, label: 'Aware', description: 'General understanding that repairs are needed, but minimal detail.', nextSteps: 'Engage local partners. Reach out to agencies, churches, or nonprofits that serve vulnerable homeowners. Ask about trends.' },
        { value: 2, label: 'Exploring', description: 'Community-level awareness with anecdotes or limited examples.', nextSteps: 'Begin capturing real data. Track inquiries or past one-off repair requests. Start a waiting list. Use interviews to understand key repair themes.' },
        { value: 3, label: 'Planning', description: 'Some specific needs identified through intentional efforts.', nextSteps: 'Document needs in a simple format. Create a short summary illustrating examples, costs, and populations affected.' },
        { value: 4, label: 'Preparing', description: 'Clear understanding supported by specific data sources and community feedback.', nextSteps: 'Use this data to shape your program design. Align repair priorities with actual community needs.' },
        { value: 5, label: 'Ready', description: 'Strong, data-driven understanding with waitlists, assessments, or external reports.', nextSteps: 'Frame your case for support. Use this data in funding proposals, board discussions, and early program strategy documents.' }
      ]
    },
    { 
      id: 'organizational', 
      title: 'Organizational Need for Capacity Building', 
      question: 'How clearly has your organization identified the need for capacity building?', 
      factor: 'Factor 2: Repair Program Need',
      levels: [
        { value: 0, label: 'Inactive', description: 'No connection between gaps and need for capacity building.', nextSteps: 'Start mapping where your affiliate feels stretched or under-resourced. Consider operations, staff roles, and training needs.' },
        { value: 1, label: 'Aware', description: 'Limited understanding of how internal gaps relate to capacity building.', nextSteps: 'Hold a team conversation focused on what is missing. Try framing it around what would make you more prepared to run a repair program.' },
        { value: 2, label: 'Exploring', description: 'Some gaps acknowledged but not linked to repair readiness.', nextSteps: 'Draft a working list of needs and tie them directly to the program startup journey. Connect gaps to specific delays or challenges.' },
        { value: 3, label: 'Planning', description: 'Specific capacity gaps identified and exploring how to address them.', nextSteps: 'Begin shaping your case for support. Define how addressing these gaps will strengthen your ability to deliver repair services.' },
        { value: 4, label: 'Preparing', description: 'Clearly defined gaps directly tied to repair program readiness.', nextSteps: 'Document these needs in a brief or capacity-building request. Consider using HFHI templates to organize them for leadership review.' },
        { value: 5, label: 'Ready', description: 'Strong, detailed rationale for capacity-building fully aligned with objectives.', nextSteps: 'Pursue funding or technical assistance. Package your capacity needs into a formal plan showing expected impact on repair readiness.' }
      ]
    },
    { 
      id: 'timing', 
      title: 'Urgency and Timing', 
      question: 'How timely is this capacity-building opportunity for your organization?', 
      factor: 'Factor 2: Repair Program Need',
      levels: [
        { value: 0, label: 'Inactive', description: 'No urgency recognized. No active initiatives or external pressures.', nextSteps: 'Evaluate community and organizational factors. Consider aging housing stock, disaster vulnerability, or equity gaps.' },
        { value: 1, label: 'Aware', description: 'Early signs of alignment from anecdotal needs or mild partner pressure.', nextSteps: 'Begin documenting emerging needs. Gather evidence or testimonials that suggest repair services are becoming more relevant.' },
        { value: 2, label: 'Exploring', description: 'General alignment in timing with no major obstacles to participation.', nextSteps: 'Assess internal capacity for engagement. Confirm that timing aligns with other strategic priorities and staff availability.' },
        { value: 3, label: 'Planning', description: 'Timing is relevant and fits within current priorities or planning cycles.', nextSteps: 'Integrate preservation into upcoming planning efforts. Flag this opportunity in strategic discussions or budgeting.' },
        { value: 4, label: 'Preparing', description: 'Strong sense of urgency from specific transitions, challenges, or pressures.', nextSteps: 'Accelerate decision-making. Prepare leadership and staff for active engagement. Request HFHI technical assistance.' },
        { value: 5, label: 'Ready', description: 'Clearly documented, high-urgency needs make this moment critical.', nextSteps: 'Prioritize immediate action. Seek partnerships, submit funding requests, or draft an implementation timeline while urgency remains high.' }
      ]
    },
    { 
      id: 'goals', 
      title: 'Clarity of Capacity-Building Goals', 
      question: 'How clearly defined and realistic are your capacity-building goals?', 
      factor: 'Factor 3: Soundness of Approach',
      levels: [
        { value: 0, label: 'Inactive', description: 'No capacity-building goals identified.', nextSteps: 'Start by identifying your biggest barriers to readiness. Use those as a foundation to brainstorm goal statements.' },
        { value: 1, label: 'Aware', description: 'General ideas about needs, but goals unclear or unrealistic.', nextSteps: 'Refine your goals using SMART criteria. Focus on outcomes that are Specific, Measurable, Achievable, Relevant, and Time-bound.' },
        { value: 2, label: 'Exploring', description: 'A few goals identified but loosely tied to repair readiness.', nextSteps: 'Map each goal to a repair program need. Ask how this helps you get closer to launch and revise where necessary.' },
        { value: 3, label: 'Planning', description: 'Goals moderately clear and generally aligned, some need refinement.', nextSteps: 'Prioritize your goals. Choose 2-3 that are most achievable and impactful, and begin outlining how progress will be measured.' },
        { value: 4, label: 'Preparing', description: 'Specific, realistic goals tied to core elements of repair readiness.', nextSteps: 'Link your goals to actionable activities. This helps demonstrate that your goals are grounded in best practices.' },
        { value: 5, label: 'Ready', description: 'Highly detailed, actionable goals supporting critical repair capacity components.', nextSteps: 'Submit a compelling funding proposal. Incorporate your goals into a capacity-building plan or logic model.' }
      ]
    },
    { 
      id: 'feasibility', 
      title: 'Feasibility of Approach', 
      question: 'How realistic and well-structured is your plan for participating in training?', 
      factor: 'Factor 3: Soundness of Approach',
      levels: [
        { value: 0, label: 'Inactive', description: 'Expectations unclear or unrealistic. No internal plan.', nextSteps: 'Clarify expectations and align with leadership. Begin discussing what staff time, support, and resources will be needed.' },
        { value: 1, label: 'Aware', description: 'Vague plan exists with no clarity on participants or application.', nextSteps: 'Sketch out a basic participation outline. Define who should attend, how time will be allocated, and what outcomes you hope to achieve.' },
        { value: 2, label: 'Exploring', description: 'Some details emerging but plan lacks full structure.', nextSteps: 'Draft a participation strategy. Identify roles and develop a rough schedule for training engagement and post-training application.' },
        { value: 3, label: 'Planning', description: 'Realistic plan with basic strategy and key team members identified.', nextSteps: 'Share the plan with your team. Confirm buy-in and explore how to embed training into regular workflows or strategic goals.' },
        { value: 4, label: 'Preparing', description: 'Clear structure, responsibilities, and timing with confirmed participants.', nextSteps: 'Assign accountability. Ensure participants know what they are responsible for and how they will be supported in applying what they learn.' },
        { value: 5, label: 'Ready', description: 'Strong, feasible plan with clear pathways and accountability.', nextSteps: 'Document and track implementation progress. Use post-training check-ins to sustain momentum after capacity-building support ends.' }
      ]
    },
    { 
      id: 'alignment', 
      title: 'Alignment with Program Outcomes', 
      question: 'How well does your approach align with capacity building and sustainability goals?', 
      factor: 'Factor 3: Soundness of Approach',
      levels: [
        { value: 0, label: 'Inactive', description: 'No clear connection to program outcomes.', nextSteps: 'Review the program capacity-building goals. Re-express your own needs and goals using the language of sustainability and scale.' },
        { value: 1, label: 'Aware', description: 'Limited connection to outcomes. Efforts may be ad hoc.', nextSteps: 'Translate your internal needs into aligned outcomes. Ask how this activity helps you sustain or expand your capacity over time.' },
        { value: 2, label: 'Exploring', description: 'Some elements show alignment but focus remains short-term.', nextSteps: 'Broaden the lens. Begin linking tactical efforts to strategic outcomes like program longevity or service equity.' },
        { value: 3, label: 'Planning', description: 'Clear alignment with priorities and moderate long-term vision.', nextSteps: 'Add durability to your plans. Incorporate long-term indicators like staff retention, system sustainability, or expanded service pipelines.' },
        { value: 4, label: 'Preparing', description: 'Strong alignment geared toward sustainability and strategic impact.', nextSteps: 'Position your approach for funders and partners. Show how today investments lead to future resilience and growth.' },
        { value: 5, label: 'Ready', description: 'Fully aligned with long-term outcomes and systems change.', nextSteps: 'You are positioned for scalable impact. Use outcome frameworks to communicate the full value of your approach.' }
      ]
    },
    { 
      id: 'resources', 
      title: 'Commitment to Additional Resources', 
      question: 'How committed is your organization to seeking additional resources?', 
      factor: 'Factor 4: Leverage and Impact',
      levels: [
        { value: 0, label: 'Inactive', description: 'No additional resources identified. Full reliance on grant.', nextSteps: 'Initiate resource mapping. Brainstorm internal and external sources of support, such as unrestricted funds or in-kind donations.' },
        { value: 1, label: 'Aware', description: 'Interest expressed but no plan or actions taken.', nextSteps: 'Draft a simple plan. Identify one or two target sources and outline basic next steps for engagement.' },
        { value: 2, label: 'Exploring', description: 'Few resources identified but plan for using them is limited.', nextSteps: 'Strengthen resource connections. Assess the feasibility of each source and begin coordinating outreach or proposal planning.' },
        { value: 3, label: 'Planning', description: 'Moderate plan to seek new or complementary resources.', nextSteps: 'Align resources to specific goals. Map each funding or support opportunity to a tangible program milestone.' },
        { value: 4, label: 'Preparing', description: 'Clear mix of current and potential resources showing diversity.', nextSteps: 'Activate multi-channel resource development. Engage board, development staff, or partners to help secure identified resources.' },
        { value: 5, label: 'Ready', description: 'Strong, actionable resource development plan leveraging diverse assets.', nextSteps: 'Formalize your strategy. Create a resourcing timeline or funding matrix to guide your team and demonstrate readiness to funders.' }
      ]
    },
    { 
      id: 'partnerships', 
      title: 'Partnerships and Collaborations', 
      question: 'How well has your organization identified partnerships to strengthen capacity building?', 
      factor: 'Factor 4: Leverage and Impact',
      levels: [
        { value: 0, label: 'Inactive', description: 'No partners or collaborators identified. Working in isolation.', nextSteps: 'Survey your local network. Identify who is already working in housing, health, or aging services and explore shared interests.' },
        { value: 1, label: 'Aware', description: 'Potential partners discussed internally but no outreach.', nextSteps: 'Initiate informal contact. Reach out to one or two potential partners to gauge interest in supporting your efforts.' },
        { value: 2, label: 'Exploring', description: 'Partnerships named with general support but not formalized.', nextSteps: 'Clarify partnership roles. Consider a partner kickoff meeting or letter of support that outlines alignment and intentions.' },
        { value: 3, label: 'Planning', description: 'Active partners involved moderately in planning meetings.', nextSteps: 'Define collaboration points. Establish when and how partners will be engaged and what roles they will play as your program grows.' },
        { value: 4, label: 'Preparing', description: 'Partnerships clearly defined and providing consistent support.', nextSteps: 'Develop MOUs or working agreements. Solidify terms, expectations, and contributions to demonstrate aligned investment.' },
        { value: 5, label: 'Ready', description: 'Well-established partnerships with aligned goals and clear roles.', nextSteps: 'Document partnership impact goals. Map how collaboration advances shared goals and strengthens repair program development.' }
      ]
    },
    { 
      id: 'postgrant', 
      title: 'Potential Beyond Grant Term', 
      question: 'How well positioned are you to sustain or grow outcomes beyond the grant?', 
      factor: 'Factor 4: Leverage and Impact',
      levels: [
        { value: 0, label: 'Inactive', description: 'No sustainability planning. Grant seen as one-time opportunity.', nextSteps: 'Shift to long-term thinking. Ask what would we need to keep this going. Start a basic sustainability conversation with your team.' },
        { value: 1, label: 'Aware', description: 'Few ideas for sustaining efforts but no clarity or plan.', nextSteps: 'Identify key sustainability levers. These could include policy changes, new staffing models, or ongoing partner support.' },
        { value: 2, label: 'Exploring', description: 'Some sustainability strategies identified but informal.', nextSteps: 'Outline your best option. Choose one or two strategies and begin building out details.' },
        { value: 3, label: 'Planning', description: 'Moderate sustainability plan with partial clarity on resources.', nextSteps: 'Link your plan to results. Ensure your sustainability strategies are tied to outcomes that the grant helped achieve.' },
        { value: 4, label: 'Preparing', description: 'Clear, realistic plan for maintaining or expanding components.', nextSteps: 'Build support for sustainability. Communicate the plan to stakeholders and explore funding, training, or partnership supports.' },
        { value: 5, label: 'Ready', description: 'Strong, actionable sustainability plan with specific follow-up steps.', nextSteps: 'Incorporate sustainability into all aspects of planning. This includes data tracking, communications, and partner development strategies.' }
      ]
    },
    { 
      id: 'vision', 
      title: 'Vision for Sustained Impact', 
      question: 'How clear is your vision for sustaining a home repair program?', 
      factor: 'Factor 5: Impact and Sustainability',
      levels: [
        { value: 0, label: 'Inactive', description: 'No vision developed or articulated.', nextSteps: 'Start with your why. Revisit your mission and community data. Ask how repair work advances long-term impact for your population.' },
        { value: 1, label: 'Aware', description: 'Vision may exist but is vague or disconnected from planning.', nextSteps: 'Facilitate a visioning session. Engage staff and board in crafting a shared vision for a sustainable, strategic repair program.' },
        { value: 2, label: 'Exploring', description: 'Vision exists but weakly connected to community needs.', nextSteps: 'Ground your vision in need. Use data, testimonials, or trends to sharpen your purpose.' },
        { value: 3, label: 'Planning', description: 'Moderately clear vision partially tied to participation goals.', nextSteps: 'Link your vision to a theory of change. Clarify what short, medium, and long-term impacts your repair work will generate.' },
        { value: 4, label: 'Preparing', description: 'Clear, compelling vision aligned with identified community needs.', nextSteps: 'Share and test your vision. Include it in presentations, grant proposals, or conversations with stakeholders to build momentum.' },
        { value: 5, label: 'Ready', description: 'Strong, strategic vision for lasting impact. Organization fully aligned.', nextSteps: 'Embed the vision into strategy. Use it to guide operational plans, budgets, partnerships, and staffing for long-term sustainability.' }
      ]
    },
    { 
      id: 'application', 
      title: 'Plan for Applying Capacity Post-Grant', 
      question: 'How effectively have you planned to apply knowledge after funding ends?', 
      factor: 'Factor 5: Impact and Sustainability',
      levels: [
        { value: 0, label: 'Inactive', description: 'No plan to apply capacity after grant. Work may stop.', nextSteps: 'Identify key takeaways. Ask what do we want to keep using. Consider tools, systems, roles, or relationships that should continue.' },
        { value: 1, label: 'Aware', description: 'General idea exists but plan is vague.', nextSteps: 'Draft a post-grant checklist. Outline what actions, resources, or follow-up steps will be needed to sustain momentum.' },
        { value: 2, label: 'Exploring', description: 'General plan in place but lacks detail or feasibility.', nextSteps: 'Stress-test your plan. Evaluate potential obstacles and begin addressing how to manage them once grant support ends.' },
        { value: 3, label: 'Planning', description: 'Moderately developed plan outlines carrying forward some activities.', nextSteps: 'Clarify timing and roles. Assign who is responsible for implementing post-grant actions and create a light project timeline.' },
        { value: 4, label: 'Preparing', description: 'Clear, realistic implementation plan ready for transition.', nextSteps: 'Build internal accountability. Ensure follow-up actions are baked into your team workplans or dashboard systems.' },
        { value: 5, label: 'Ready', description: 'Strong, actionable post-grant plan with defined actions and accountability.', nextSteps: 'Share your post-grant strategy. Communicate to stakeholders how investments made now will generate long-term value.' }
      ]
    },
    { 
      id: 'community', 
      title: 'Broader Community Benefit', 
      question: 'How well does your organization demonstrate broader community or sector benefit?', 
      factor: 'Factor 5: Impact and Sustainability',
      levels: [
        { value: 0, label: 'Inactive', description: 'No consideration of broader impact beyond internal goals.', nextSteps: 'Start by asking who else could benefit. Consider local coalitions, municipal leaders, or community groups aligned with your work.' },
        { value: 1, label: 'Aware', description: 'Limited understanding of connection to community outcomes.', nextSteps: 'Explore shared outcomes. Identify overlap between your goals and those of external groups.' },
        { value: 2, label: 'Exploring', description: 'Some broader benefit described but loosely defined.', nextSteps: 'Clarify how others are impacted. Use examples of indirect beneficiaries or shared systems.' },
        { value: 3, label: 'Planning', description: 'Clear connection to broader impact outlined.', nextSteps: 'Gather testimonials or local feedback. Use data or quotes to reinforce your broader value proposition.' },
        { value: 4, label: 'Preparing', description: 'Strong case made with examples, partnerships, or systemic change.', nextSteps: 'Track ripple effects. Begin measuring indirect impacts like increased referrals or cross-sector collaboration.' },
        { value: 5, label: 'Ready', description: 'Measurable, well-documented community or sector-wide benefits demonstrated.', nextSteps: 'Disseminate your insights. Share your impact through networks, reports, or peer learning groups to lift the field.' }
      ]
    }
  ];

  const getDefaults = () => {
    const defaults = {};
    subfactors.forEach(sf => { defaults[sf.id] = 0; });
    return { ...defaults, ...responses };
  };

  const getLevel = (score) => {
    if (score < 0.8) return { label: 'Inactive', color: 'bg-gray-400' };
    if (score < 1.8) return { label: 'Aware', color: 'bg-red-400' };
    if (score < 2.8) return { label: 'Exploring', color: 'bg-orange-400' };
    if (score < 3.8) return { label: 'Planning', color: 'bg-yellow-400' };
    if (score < 4.8) return { label: 'Preparing', color: 'bg-blue-400' };
    return { label: 'Ready', color: 'bg-green-500' };
  };

  const calcScores = () => {
    const withDefaults = getDefaults();
    const vals = Object.values(withDefaults);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    
    // Calculate scores by factor
    const factorScores = {};
    const factorNames = [
      'Factor 1: Capacity of Affiliate',
      'Factor 2: Repair Program Need',
      'Factor 3: Soundness of Approach',
      'Factor 4: Leverage and Impact',
      'Factor 5: Impact and Sustainability'
    ];
    
    factorNames.forEach(factorName => {
      const factorSubfactors = subfactors.filter(sf => sf.factor === factorName);
      const factorValues = factorSubfactors.map(sf => withDefaults[sf.id]);
      const factorAvg = factorValues.reduce((a, b) => a + b, 0) / factorValues.length;
      factorScores[factorName] = {
        score: factorAvg,
        subfactors: factorSubfactors.map(sf => ({
          title: sf.title,
          score: withDefaults[sf.id]
        }))
      };
    });
    
    return { overall: avg, responses: withDefaults, factorScores };
  };

  const getActions = () => {
    const withDefaults = getDefaults();
    return subfactors.map(sf => {
      const val = withDefaults[sf.id];
      const level = sf.levels[val];
      return {
        subfactor: sf.title,
        factor: sf.factor,
        level: level.label,
        steps: level.nextSteps,
        priority: val < 3 ? 'high' : val < 4 ? 'medium' : 'low'
      };
    }).sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2 };
      return order[a.priority] - order[b.priority];
    });
  };

  const { overall, factorScores } = calcScores();
  const overallLevel = getLevel(overall);
  const actions = getActions();
  const high = actions.filter(a => a.priority === 'high');
  const medium = actions.filter(a => a.priority === 'medium');
  const low = actions.filter(a => a.priority === 'low');
  const withDefaults = getDefaults();

  const Menu = () => (
    <div className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex border-b">
        {[
          { key: 'assessment', icon: FileText, label: 'Assessment' },
          { key: 'dashboard', icon: BarChart3, label: 'Dashboard' },
          { key: 'actionplan', icon: ListChecks, label: 'Action Plan' }
        ].map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => setActiveView(item.key)}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeView === item.key
                  ? 'text-indigo-600 bg-indigo-50 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Icon className="w-5 h-5" />
                {item.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  if (activeView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Menu />
        <div className="p-6 max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-6 text-white mb-8">
              <div className="text-sm font-semibold mb-2">Overall Score</div>
              <div className="text-5xl font-bold">{overall.toFixed(1)}</div>
              <div className={`inline-block px-4 py-2 rounded-full mt-3 ${overallLevel.color} text-white font-semibold`}>
                {overallLevel.label}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Factor Scores</h2>
            <div className="space-y-4 mb-8">
              {Object.entries(factorScores).map(([factorName, data]) => {
                const level = getLevel(data.score);
                return (
                  <div key={factorName} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-gray-800">{factorName}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-gray-700">{data.score.toFixed(1)}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${level.color} text-white`}>
                          {level.label}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
                      <div className={`h-4 rounded-full ${level.color} transition-all`} style={{ width: `${(data.score / 5) * 100}%` }} />
                    </div>
                    <div className="space-y-1">
                      {data.subfactors.map(sf => {
                        const sfLevel = getLevel(sf.score);
                        return (
                          <div key={sf.title} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">{sf.title}</span>
                            <span className={`px-2 py-0.5 rounded ${sfLevel.color} text-white font-medium text-xs`}>
                              {sfLevel.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Readiness Distribution</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {['Inactive', 'Aware', 'Exploring', 'Planning', 'Preparing', 'Ready'].map((lbl, i) => {
                const count = Object.values(withDefaults).filter(v => getLevel(v).label === lbl).length;
                const colors = ['bg-gray-400', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500'];
                return (
                  <div key={lbl} className="text-center">
                    <div className={`${colors[i]} text-white rounded-lg p-4 mb-2`}>
                      <div className="text-3xl font-bold">{count}</div>
                    </div>
                    <div className="text-xs font-semibold text-gray-600">{lbl}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'actionplan') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Menu />
        <div className="p-6 max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">Action Plan</h1>
            </div>

            {high.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-red-600 mb-4">High Priority ({high.length})</h2>
                <div className="space-y-4">
                  {high.map((item, i) => (
                    <div key={i} className="bg-red-50 border-l-4 border-red-500 p-5 rounded">
                      <h3 className="font-bold text-gray-800">{item.subfactor}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.factor} - {item.level}</p>
                      <p className="text-gray-700">Next: {item.steps}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {medium.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-yellow-600 mb-4">Medium Priority ({medium.length})</h2>
                <div className="space-y-4">
                  {medium.map((item, i) => (
                    <div key={i} className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded">
                      <h3 className="font-bold text-gray-800">{item.subfactor}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.factor} - {item.level}</p>
                      <p className="text-gray-700">Next: {item.steps}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {low.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Maintain ({low.length})</h2>
                <div className="space-y-4">
                  {low.map((item, i) => (
                    <div key={i} className="bg-green-50 border-l-4 border-green-500 p-5 rounded">
                      <h3 className="font-bold text-gray-800">{item.subfactor}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.factor} - {item.level}</p>
                      <p className="text-gray-700">Next: {item.steps}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const current = subfactors[currentStep];
  const progress = ((currentStep + 1) / subfactors.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Menu />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Home className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Readiness Assessment</h1>
            </div>
            <p className="text-indigo-100">Evaluate your organization readiness to launch a home repair program</p>
          </div>

          <div className="bg-gray-100 p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600">Question {currentStep + 1} of {subfactors.length}</span>
              <span className="text-sm font-semibold text-gray-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="p-8">
            <div className="mb-6">
              <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-3">
                {current.factor}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{current.title}</h2>
              <p className="text-gray-600 text-lg">{current.question}</p>
            </div>

            <div className="space-y-3">
              {current.levels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setResponses({ ...responses, [current.id]: level.value })}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    withDefaults[current.id] === level.value
                      ? 'border-indigo-600 bg-indigo-50 shadow-md'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      withDefaults[current.id] === level.value ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                    }`}>
                      {withDefaults[current.id] === level.value && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 mb-1">{level.label}</div>
                      <div className="text-sm text-gray-600">{level.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-6 flex justify-between border-t">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 font-semibold"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            {currentStep === subfactors.length - 1 ? (
              <button
                onClick={() => setActiveView('dashboard')}
                className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
              >
                <CheckCircle className="w-5 h-5" />
                View Results
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Assessment Guidance</h3>
              <p className="text-sm text-gray-600">
                Select the response that best describes your organization. 
                Navigate between tabs anytime - your responses update Dashboard and Action Plan in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadinessApp;