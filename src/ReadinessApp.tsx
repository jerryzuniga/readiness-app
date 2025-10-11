import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Home, CheckCircle, AlertCircle, TrendingUp, FileText, Download, MessageSquare, Printer } from 'lucide-react';

const VERSION = '1.4.3';

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
            question: 'How would you rate your organization leadership and board commitment?',
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
            question: 'How prepared is your staff to engage in training?',
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
            question: 'How well has your organization planned for system improvements?',
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
            question: 'How clearly identified is the need for capacity building?',
            levels: [
              { value: 0, label: 'Inactive', description: 'No connection between gaps and need for capacity building.' },
              { value: 1, label: 'Aware', description: 'Limited understanding of how internal gaps relate to capacity building.' },
              { value: 2, label: 'Exploring', description: 'Some gaps acknowledged but not linked to repair readiness.' },
              { value: 3, label: 'Planning', description: 'Specific capacity gaps identified and exploring how to address them.' },
              { value: 4, label: 'Preparing', description: 'Clearly defined gaps directly tied to repair program readiness.' },
              { value: 5, label: 'Ready', description: 'Strong, detailed rationale for capacity-building fully aligned with objectives.' }
            ]
          },
          { 
            id: 'timing', 
            title: 'Urgency and Timing', 
            question: 'How timely is this opportunity?',
            levels: [
              { value: 0, label: 'Inactive', description: 'No urgency recognized. No active initiatives or external pressures.' },
              { value: 1, label: 'Aware', description: 'Early signs of alignment from anecdotal needs or mild partner pressure.' },
              { value: 2, label: 'Exploring', description: 'General alignment in timing with no major obstacles to participation.' },
              { value: 3, label: 'Planning', description: 'Timing is relevant and fits within current priorities or planning cycles.' },
              { value: 4, label: 'Preparing', description: 'Strong sense of urgency from specific transitions, challenges, or pressures.' },
              { value: 5, label: 'Ready', description: 'Clearly documented, high-urgency needs make this moment critical.' }
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
            question: 'How clearly defined are your capacity-building goals?',
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
            question: 'How realistic is your plan?',
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
            question: 'How positioned are you for sustainability?',
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
      ? Object.values(factorScores).reduce((sum, f) => sum + f.score, 0) / Object.keys(factorScores).length 
      : 0;
    
    return { factorScores, overallScore };
  };

  const getReadinessLevel = (score) => {
    if (score === undefined || score === null) return { label: 'N/A', color: 'bg-gray-300' };
    if (score < 0.8) return { label: 'Inactive', color: 'bg-gray-400' };
    if (score < 1.8) return { label: 'Aware', color: 'bg-red-400' };
    if (score < 2.8) return { label: 'Exploring', color: 'bg-orange-400' };
    if (score < 3.8) return { label: 'Planning', color: 'bg-yellow-400' };
    if (score < 4.8) return { label: 'Preparing', color: 'bg-blue-400' };
    return { label: 'Ready', color: 'bg-green-500' };
  };

  const exportToCSV = () => {
    const results = calculateResults();
    let csv = 'Factor,Sub-factor,Score,Level,Comments\n';
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

  const getRecommendations = (factorScores) => {
    const recs = [];
    Object.entries(factorScores).forEach(([, data]) => {
      data.subfactors.forEach(sf => {
        if (sf.score !== undefined) {
          let priority = 'Low';
          if (sf.score < 2) priority = 'High';
          else if (sf.score < 3) priority = 'Medium';
          recs.push({
            factor: data.title,
            subfactor: sf.title,
            score: sf.score,
            priority
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
              title="Back to Home"
            >
              <Home className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Repair Readiness Assessment</h1>
              <p className="text-xs text-gray-500">v{VERSION}</p>
            </div>
          </div>
          <nav className="flex gap-2">
            {['assessment', 'results', 'dashboard', 'next-steps'].map(view => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`px-4 py-2 rounded-lg font-medium text-sm ${
                  currentView === view
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                }`}
              >
                {view.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
            <button
              onClick={() => window.open(guideUrl, '_blank')}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm"
              title="Download Assessment Guide"
            >
              <Download className="w-4 h-4" />
              Guide
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
                Home Repair Program Readiness Assessment
              </h1>
              <p className="text-blue-100 text-lg">
                Evaluate your organizational capacity to launch a home repair program
              </p>
            </div>

            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">What to Expect</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold">15</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">15 Questions Across 5 Key Factors</h3>
                      <p className="text-gray-600 text-sm">
                        Capacity, Need, Approach, Leverage and Sustainability
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold">⏱️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">15-20 Minutes to Complete</h3>
                      <p className="text-gray-600 text-sm">
                        Take your time to thoughtfully assess each area
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold">📊</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Instant Results and Recommendations</h3>
                      <p className="text-gray-600 text-sm">
                        Get a comprehensive dashboard with prioritized action items
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold">💾</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Save Your Results</h3>
                      <p className="text-gray-600 text-sm">
                        Results are not saved automatically - use the Print to PDF button to save your assessment
                      </p>
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
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Download the Assessment Guide
                    </h3>
                    <p className="text-gray-700 text-sm mb-4">
                      Get detailed explanations of all factors, sub-factors, and the readiness scale. 
                      This guide will help you answer questions more accurately and understand your results.
                    </p>
                    <button
                      onClick={() => window.open(guideUrl, '_blank')}
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md hover:shadow-lg"
                    >
                      <Download className="w-5 h-5" />
                      Download Assessment Guide (PDF)
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  Tips for Best Results
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Be honest in your self-assessment - this identifies real areas for growth</li>
                  <li>Review the Assessment Guide before starting for better context</li>
                  <li>Involve key staff members to gather diverse perspectives</li>
                  <li>Add notes to questions to capture important details</li>
                  <li>You can navigate back to change answers at any time</li>
                </ul>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setCurrentView('assessment')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg hover:shadow-xl"
                >
                  Start Assessment
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-6">
                Version {VERSION} - Your responses are not saved automatically
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
                      placeholder="Add notes..."
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

    return (
      <>
        <TopNav />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
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
                      className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Continue Assessment
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white mb-6">
                  <h3 className="text-xl font-semibold mb-2">Overall Readiness Score</h3>
                  <div className="flex items-end gap-4">
                    <div className="text-5xl font-bold">{results.overallScore.toFixed(1)}</div>
                    <div className="text-2xl mb-2">/ 5.0</div>
                  </div>
                  <span className={`inline-block px-4 py-2 rounded-full mt-3 ${getReadinessLevel(results.overallScore).color} text-white font-semibold`}>
                    {getReadinessLevel(results.overallScore).label}
                  </span>
                </div>

                <div className="flex gap-3 mb-8">
                  <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 font-semibold">
                    <Printer className="w-5 h-5" /> Print to PDF
                  </button>
                  <button onClick={() => setCurrentView('next-steps')} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                    <TrendingUp className="w-5 h-5" /> Action Items
                  </button>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Assessment Results</h3>
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
                      <div className="flex-1 w-full max-w-2xl">
                        <div className="text-center mb-6">
                          <h4 className="text-lg font-semibold text-gray-700">Overall Readiness Level</h4>
                        </div>
                        
                        <div className="relative">
                          <div className="h-12 bg-gradient-to-r from-gray-400 via-red-400 via-orange-400 via-yellow-400 via-blue-400 to-green-500 rounded-full overflow-hidden">
                            <div 
                              className="absolute top-0 bottom-0 w-1 bg-gray-800"
                              style={{ left: `${(results.overallScore / 5) * 100}%` }}
                            >
                              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-sm font-bold whitespace-nowrap">
                                {results.overallScore.toFixed(1)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between mt-2 text-xs font-medium">
                            <span className="text-gray-600">0.0</span>
                            <span className="text-gray-600">1.0</span>
                            <span className="text-gray-600">2.0</span>
                            <span className="text-gray-600">3.0</span>
                            <span className="text-gray-600">4.0</span>
                            <span className="text-gray-600">5.0</span>
                          </div>
                          
                          <div className="flex justify-between mt-3 text-xs font-semibold">
                            <span className="text-gray-600">Inactive</span>
                            <span className="text-red-600">Aware</span>
                            <span className="text-orange-600">Exploring</span>
                            <span className="text-yellow-600">Planning</span>
                            <span className="text-blue-600">Preparing</span>
                            <span className="text-green-600">Ready</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <div className="w-48 h-48 rounded-full border-8 border-gray-200 flex flex-col items-center justify-center bg-white shadow-lg">
                          <div className="text-center">
                            <div className="text-sm text-gray-500 mb-1">Your Score</div>
                            <div className="text-5xl font-bold text-gray-800">{results.overallScore.toFixed(1)}</div>
                            <div className="text-sm text-gray-500 mt-1">out of 5.0</div>
                            <div className={`mt-3 px-4 py-1 rounded-full text-sm font-semibold ${getReadinessLevel(results.overallScore).color} text-white`}>
                              {getReadinessLevel(results.overallScore).label}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="prose max-w-none mt-6 pt-6 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">
                        {results.overallScore < 0.8 && (
                          <>Your organization is at the <strong>Inactive</strong> stage of readiness, with an overall score of <strong>{results.overallScore.toFixed(1)} out of 5.0</strong>. At this stage, there is currently no clear connection between existing organizational gaps and the need for capacity building to support a home repair program. It may not be clear how housing repair fits into your affiliate's strategy. This is a starting point for exploration—begin by educating leadership on why repairs matter, reviewing local data on vulnerable populations, and using storytelling or peer affiliate examples to spark interest. Focus on building awareness across your team about the potential role of housing preservation in advancing your mission.</>
                        )}
                        {results.overallScore >= 0.8 && results.overallScore < 1.8 && (
                          <>Your organization is at the <strong>Aware</strong> stage of readiness, with an overall score of <strong>{results.overallScore.toFixed(1)} out of 5.0</strong>. At this stage, there is general recognition that something is missing or that home repairs could be valuable, but the connection to repair readiness remains vague and undeveloped. Leadership may have some awareness, but there have been no structured discussions or expressed interest in developing a formal program. Your next steps should focus on introducing housing preservation as a strategic growth area in board meetings, increasing internal engagement by presenting the vision to staff, and beginning to document emerging needs that suggest repair services are becoming more timely or relevant.</>
                        )}
                        {results.overallScore >= 1.8 && results.overallScore < 2.8 && (
                          <>Your organization is at the <strong>Exploring</strong> stage of readiness, with an overall score of <strong>{results.overallScore.toFixed(1)} out of 5.0</strong>. Your team has begun to identify some internal needs or challenges and is starting to tie them to potential repair program goals or capacity strategies. There have been informal conversations about home repairs, perhaps in response to one-off repair requests, though no sustained planning or formal resource discussions have occurred. You have some community-level awareness supported by anecdotes or limited examples, but lack detailed or quantitative information. To advance, form a board/staff working group to explore feasibility, begin capturing real data through tracking inquiries or surveys, and draft a working list of organizational needs tied directly to the program startup journey.</>
                        )}
                        {results.overallScore >= 2.8 && results.overallScore < 3.8 && (
                          <>Your organization is at the <strong>Planning</strong> stage of readiness, with an overall score of <strong>{results.overallScore.toFixed(1)} out of 5.0</strong>. You have identified key gaps and are beginning to explore how to address them, with the team aligning around next steps and early strategies. Leadership is talking about preservation regularly and exploring its potential, though you have not yet committed to action or implementation steps. You have some specific housing stabilization needs identified through intentional efforts, and capacity gaps have been recognized. Your goals are moderately clear and generally aligned with repair capacity building, though some may still need refinement. Focus now on developing a strategic roadmap or case statement, creating a system readiness plan outlining which tools will be adopted, and prioritizing 2-3 achievable goals with clear measurement approaches.</>
                        )}
                        {results.overallScore >= 3.8 && results.overallScore < 4.8 && (
                          <>Your organization is at the <strong>Preparing</strong> stage of readiness, with an overall score of <strong>{results.overallScore.toFixed(1)} out of 5.0</strong>. You have clearly defined needs directly tied to repair program readiness, with drafts, outlines, or initial frameworks in place to seek support or implement improvements. Leadership and board have taken early steps such as assigning staff, approving concept drafts, or exploring funding. You have a clear understanding of housing repair needs supported by specific data sources and community feedback, and a documented plan exists to strengthen administrative, operational, and equipment-related systems. Your approach shows strong alignment with capacity-building goals and is clearly geared toward sustainability and strategic impact. Begin developing operational components, advance into implementation of key systems, and position your approach to demonstrate to funders how today's investments lead to future resilience and growth.</>
                        )}
                        {results.overallScore >= 4.8 && (
                          <>Your organization is at the <strong>Ready</strong> stage of readiness, with an outstanding overall score of <strong>{results.overallScore.toFixed(1)} out of 5.0</strong>. Congratulations! Housing preservation is embedded in your affiliate's strategy, leadership is aligned and actively preparing for launch, and your team is fully committed and equipped to lead program development. You have a strong, data-driven understanding of repair needs with compelling urgency and justification for program development. Your affiliate has a fully developed and actionable system improvement plan, highly detailed goals supporting critical repair capacity components, and well-established partnerships with aligned goals and clear roles. You are operationally ready to move into implementation—finalize resource allocation, align internal tools with best practices, begin tracking metrics, and integrate administrative systems with compliance, finance, and evaluation processes. Your strong, actionable plan positions you excellently to pursue funding, technical assistance, or pilot implementation.</>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4">Readiness Distribution</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                  {['Inactive', 'Aware', 'Exploring', 'Planning', 'Preparing', 'Ready'].map(label => {
                    const colors = { Inactive: 'bg-gray-400', Aware: 'bg-red-400', Exploring: 'bg-orange-400', Planning: 'bg-yellow-400', Preparing: 'bg-blue-400', Ready: 'bg-green-500' };
                    const borderColors = { Inactive: 'border-gray-300', Aware: 'border-red-300', Exploring: 'border-orange-300', Planning: 'border-yellow-300', Preparing: 'border-blue-300', Ready: 'border-green-300' };
                    const bgColors = { Inactive: 'bg-gray-50', Aware: 'bg-red-50', Exploring: 'bg-orange-50', Planning: 'bg-yellow-50', Preparing: 'bg-blue-50', Ready: 'bg-green-50' };
                    return (
                      <div key={label} className={`${bgColors[label]} rounded-lg p-4 border-2 ${borderColors[label]} text-center`}>
                        <div className={`w-12 h-12 rounded-full ${colors[label]} mx-auto mb-2 flex items-center justify-center`}>
                          <span className="text-white font-bold text-xl">{dist[label]}</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-700">{label}</div>
                      </div>
                    );
                  })}
                </div>

                <h3 className="text-xl font-bold mb-4">Factor Overview</h3>
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

  const getActionGuidance = (subfactorId, score) => {
    const guidance = {
      leadership: {
        0: "Begin by educating leadership on why repairs matter. Review local data on vulnerable populations and use storytelling or peer affiliate examples to spark interest.",
        1: "Use board meetings to introduce housing preservation as a strategic growth area. Consider inviting a peer affiliate to present on program impact.",
        2: "Form a board/staff working group to explore feasibility. Draft a short concept paper and start a light community needs scan.",
        3: "Develop a strategic roadmap or case statement. Align the board around timing, goals, and what launching a pilot would require.",
        4: "Begin developing operational components. Draft or revise a board-approved repair policy and outline a staffing or volunteer model."
      },
      staff: {
        0: "Start with internal discussions about program potential. Identify who would likely lead or support repair efforts through a staff interest survey.",
        1: "Increase internal engagement by presenting the vision and value of repairs to staff. Help them understand how repair aligns with mission.",
        2: "Clarify roles and expectations. Develop a simple staff readiness plan identifying who will participate in capacity building efforts.",
        3: "Build on momentum by developing a training and learning plan. Align participation with key development milestones.",
        4: "Begin integrating learning into program design. Ensure staff have time and support to implement what they learn."
      },
      systems: {
        0: "Begin by reviewing your current systems through a preservation lens. Identify where existing procedures may fall short for managing repairs.",
        1: "Document known limitations and start prioritizing system areas for development. Bring together staff to assess gaps collaboratively.",
        2: "Turn discussion into early planning. Assign team members to explore solutions, gather feedback, or test lightweight tools.",
        3: "Create a system readiness plan. Outline which tools or procedures will be adopted, tested, or adapted for a home repair program.",
        4: "Advance into implementation. Begin executing on key areas like intake database, procurement tools, and contractor tracking."
      },
      housing: {
        0: "Start by collecting basic local indicators. Look for public health data, local housing quality reports, or census data showing homeowner challenges.",
        1: "Engage local partners. Reach out to agencies, churches, or nonprofits that serve vulnerable homeowners about trends they're seeing.",
        2: "Begin capturing real data. Track inquiries or past one-off repair requests. Start a waiting list and use interviews or surveys.",
        3: "Document needs in a simple format. Create a short summary or slide deck illustrating examples, costs, and populations affected.",
        4: "Use this data to shape your program design. Align repair priorities (e.g., accessibility, roofing, HVAC) with actual community needs."
      },
      organizational: {
        0: "Start mapping where your affiliate feels stretched or under-resourced. Consider operations, staff roles, training needs, and tools required.",
        1: "Hold a team conversation focused on what's missing. Try framing it around what would make us more prepared to run a repair program.",
        2: "Draft a working list of needs and tie them directly to the program startup journey. For example, lack of project manager could delay pilot efforts.",
        3: "Begin shaping your case for support. Define how addressing these gaps will strengthen your affiliate's ability to deliver repair services.",
        4: "Document these needs in a brief or capacity-building request. Consider using templates to organize them for leadership or funder review."
      },
      timing: {
        0: "Evaluate community and organizational factors. Consider aging housing stock, disaster vulnerability, or equity gaps that could justify a stronger repair focus.",
        1: "Begin documenting emerging needs. Gather evidence or testimonials that suggest repair services are becoming more timely or relevant.",
        2: "Assess internal capacity for engagement. Confirm that timing aligns with other strategic priorities, board cycles, or staff availability.",
        3: "Integrate preservation into upcoming planning efforts. Flag this opportunity in strategic discussions, budgeting, or staff development calendars.",
        4: "Accelerate decision-making. Prepare leadership and staff for active engagement and monitor funding opportunities to act quickly."
      },
      goals: {
        0: "Start by identifying your biggest barriers to readiness. Use those as a foundation to brainstorm goal statements.",
        1: "Refine your goals using SMART criteria. Focus on outcomes that are Specific, Measurable, Achievable, Relevant, and Time-bound.",
        2: "Map each goal to a repair program need. Ask, 'How does this help us get closer to launch?' and revise or consolidate where necessary.",
        3: "Prioritize your goals. Choose 2-3 that are most achievable and impactful, and begin outlining how progress will be measured.",
        4: "Link your goals to actionable activities. This helps demonstrate that your goals are grounded in best practices."
      },
      feasibility: {
        0: "Clarify expectations and align with leadership. Begin discussing what staff time, support, and resources will be needed to fully engage.",
        1: "Sketch out a basic participation outline. Define who should attend, how time will be allocated, and what outcomes you hope to achieve.",
        2: "Draft a participation strategy. Identify roles and develop a rough schedule for training engagement and post-training application.",
        3: "Share the plan with your team. Confirm buy-in and explore how to embed training into regular workflows or strategic goals.",
        4: "Assign accountability. Ensure participants know what they're responsible for and how they'll be supported in applying what they learn."
      },
      alignment: {
        0: "Review the program's capacity-building goals and logic. Re-express your own needs and goals using the language of sustainability, scale, and repair impact.",
        1: "Translate your internal needs into aligned outcomes. Ask: 'How does this activity help us sustain or expand our capacity over time?'",
        2: "Broaden the lens. Begin linking tactical efforts (e.g., training, policy development) to strategic outcomes like program longevity or service equity.",
        3: "Add durability to your plans. Incorporate long-term indicators like staff retention, system sustainability, or expanded service pipelines.",
        4: "Position your approach for funders and partners. Show how today's investments lead to future resilience, efficiency, and growth."
      },
      resources: {
        0: "Initiate resource mapping. Brainstorm internal and external sources of support, such as unrestricted funds, board engagement, or in-kind donations.",
        1: "Draft a simple plan. Identify one or two target sources (e.g., local foundation, donor base) and outline basic next steps for engagement.",
        2: "Strengthen resource connections. Assess the feasibility of each source and begin coordinating outreach or proposal planning.",
        3: "Align resources to specific goals. Map each funding or support opportunity to a tangible program milestone.",
        4: "Activate multi-channel resource development. Engage board, development staff, or partners to help secure the identified resources."
      },
      partnerships: {
        0: "Survey your local network. Identify who is already working in housing, health, or aging services and explore shared interests.",
        1: "Initiate informal contact. Reach out to one or two potential partners to gauge interest in supporting your efforts.",
        2: "Clarify partnership roles. Consider a partner kickoff meeting or letter of support that outlines alignment and intentions.",
        3: "Define collaboration points. Establish when and how partners will be engaged and what roles they will play as your program grows.",
        4: "Develop MOUs or working agreements. Solidify terms, expectations, and contributions to demonstrate aligned investment."
      },
      postgrant: {
        0: "Shift to long-term thinking. Ask, 'What would we need to keep this going?' Start a basic sustainability conversation with your team.",
        1: "Identify key sustainability levers. These could include policy changes, new staffing models, fee structures, or ongoing partner support.",
        2: "Outline your best option. Choose one or two strategies (e.g., volunteer pipeline, shared equipment) and begin building out details.",
        3: "Link your plan to results. Ensure your sustainability strategies are tied to outcomes that the grant helped achieve.",
        4: "Build support for sustainability. Communicate the plan to stakeholders and explore funding, training, or partnership supports."
      },
      vision: {
        0: "Start with your 'why.' Revisit your mission and community data. Ask how repair work advances long-term impact for your population.",
        1: "Facilitate a visioning session. Engage staff and board in crafting a shared vision for a sustainable, strategic repair program.",
        2: "Ground your vision in need. Use data, testimonials, or trends (aging in place, health equity, disaster recovery) to sharpen your purpose.",
        3: "Link your vision to a theory of change. Clarify what short-, medium-, and long-term impacts your repair work will generate.",
        4: "Share and test your vision. Include it in presentations, grant proposals, or conversations with stakeholders to build momentum."
      },
      application: {
        0: "Identify key takeaways. Ask, 'What do we want to keep using?' Consider tools, systems, roles, or relationships that should continue.",
        1: "Draft a post-grant checklist. Outline what actions, resources, or follow-up steps will be needed to sustain momentum.",
        2: "Stress-test your plan. Evaluate potential obstacles and begin addressing how to manage them once grant support ends.",
        3: "Clarify timing and roles. Assign who is responsible for implementing post-grant actions and create a light project timeline.",
        4: "Build internal accountability. Ensure follow-up actions are baked into your team's workplans or dashboard systems."
      },
      community: {
        0: "Start by asking, 'Who else could benefit?' Consider local coalitions, municipal leaders, or community groups aligned with your work.",
        1: "Explore shared outcomes. Identify overlap between your goals and those of external groups (e.g., aging in place, blight reduction).",
        2: "Clarify how others are impacted. Use examples of indirect beneficiaries (e.g., neighbors, public health) or shared systems.",
        3: "Gather testimonials or local feedback. Use data or quotes to reinforce your broader value proposition.",
        4: "Track ripple effects. Begin measuring indirect impacts like increased referrals, cross-sector collaboration, or civic engagement."
      }
    };
    
    return guidance[subfactorId]?.[score] || "Continue building capacity in this area through targeted planning and stakeholder engagement.";
  };

  if (currentView === 'next-steps') {
    const results = isAssessmentComplete ? calculateResults() : null;
    const recs = results ? getRecommendations(results.factorScores) : [];
    const high = recs.filter(r => r.priority === 'High');
    const med = recs.filter(r => r.priority === 'Medium');
    const low = recs.filter(r => r.priority === 'Low');

    return (
      <>
        <TopNav />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6">Next Steps</h2>
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
                      className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Continue Assessment
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
                    <li>• Review areas scoring below Planning for immediate attention</li>
                    <li>• Create a 3-6 month action plan addressing your lowest-scoring factors</li>
                    <li>• Engage leadership and staff in discussing assessment results</li>
                    <li>• Connect with HFHI for technical assistance in priority areas</li>
                    <li>• Schedule a follow-up assessment in 6 months to track progress</li>
                  </ul>
                </div>

                <div className="flex justify-end mb-8">
                  <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 font-semibold">
                    <Printer className="w-5 h-5" /> Print to PDF
                  </button>
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
                          <p className="text-sm text-gray-700">{getActionGuidance(rec.subfactor.toLowerCase().replace(/ /g, '').replace(/&/g, ''), rec.score)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {med.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-orange-600" />
                      Medium Priority Action Items
                    </h3>
                    <div className="space-y-4">
                      {med.map((rec, idx) => (
                        <div key={idx} className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                          <div className="mb-3">
                            <div className="inline-block px-3 py-1 rounded bg-orange-500 text-white text-xs font-semibold mb-3">
                              Medium Priority
                            </div>
                            <h4 className="font-bold text-gray-800 text-lg">{rec.subfactor} - Score: {rec.score}</h4>
                            <p className="text-sm text-gray-600 mt-1">{rec.factor}</p>
                          </div>
                          <p className="text-sm text-gray-700">{getActionGuidance(rec.subfactor.toLowerCase().replace(/ /g, '').replace(/&/g, ''), rec.score)}</p>
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
                          <p className="text-sm text-gray-700">{getActionGuidance(rec.subfactor.toLowerCase().replace(/ /g, '').replace(/&/g, ''), rec.score)}</p>
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