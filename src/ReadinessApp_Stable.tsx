import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Home, CheckCircle, AlertCircle, TrendingUp, FileText, Download, MessageSquare, Printer } from 'lucide-react';

const VERSION = '1.3.7';

const ReadinessApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [currentView, setCurrentView] = useState('welcome');
  const [showWelcome, setShowWelcome] = useState(true);
  const [guideUrl, setGuideUrl] = useState('');

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
              onClick={() => {
                if (guideUrl) {
                  window.open(guideUrl, '_blank');
                } else {
                  alert('Please set the Assessment Guide URL first!');
                }
              }}
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
                Evaluate your organization capacity to launch a home repair program
              </p>
            </div>

            <div className="p-8 md:p-12">
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Set Assessment Guide URL (Admin):
                </label>
                <input
                  type="text"
                  value={guideUrl}
                  onChange={(e) => setGuideUrl(e.target.value)}
                  placeholder="https://example.com/assessment-guide.pdf"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <p className="text-xs text-gray-600 mt-2">
                  Enter the URL to your Assessment Guide PDF. This will enable the download buttons throughout the app.
                </p>
              </div>

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
                        Capacity, Need, Approach, Leverage and Impact, and Sustainability
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
                      onClick={() => {
                        if (guideUrl) {
                          window.open(guideUrl, '_blank');
                        } else {
                          alert('Please set the Assessment Guide URL in the yellow box above first!');
                        }
                      }}
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
                  onClick={() => {
                    setShowWelcome(false);
                    setCurrentView('assessment');
                  }}
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
            {isAssessmentComplete && results ? (
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

                <div className="flex flex-wrap gap-3 mb-8">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                  >
                    <Printer className="w-5 h-5" />
                    Print to PDF
                  </button>
                  <button
                    onClick={() => setCurrentView('next-steps')}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    <TrendingUp className="w-5 h-5" />
                    Action Items
                  </button>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Assessment Results</h3>
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
                      <div className="flex-1 w-full max-w-2xl">
                        <div className="text-center mb-3">
                          <h4 className="text-lg font-semibold text-gray-700">Overall Readiness Level</h4>
                        </div>
                        
                        <div className="relative">
                          <div className="h-12 bg-gradient-to-r from-gray-400 via-red-400 via-orange-400 via-yellow-400 via-blue-400 to-green-500 rounded-full overflow-hidden">
                            <div 
                              className="absolute top-0 bottom-0 w-1 bg-gray-800"
                              style={{ left: `${(results.overallScore / 5) * 100}%` }}
                            >
                              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-sm font-bold whitespace-nowrap">
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
                          <>Your organization is at the <strong>Inactive</strong> stage of readiness, with an overall score of <strong>{results.overallScore.toFixed(1)} out of 5.0</strong>. This indicates that there is currently no clear connection between existing organizational gaps and the need for capacity building to support a home repair program. At this stage, there may be little to no awareness or discussion of home repairs among board or leadership, and housing repair has not been recognized as a relevant or strategic priority. The organization has not yet identified resource needs, tools, equipment, or processes to support home repair work. To advance from this stage, begin by educating leadership on why repairs matter, mapping where your affiliate feels stretched or under-resourced, and initiating internal conversations about how housing preservation could align with your mission and serve your community.</>
                        )}
                        {results.overallScore >= 0.8 && results.overallScore < 1.8 && (
                          <>Your organization is at the <strong>Aware</strong> stage of readiness, with an overall score of <strong>{results.overallScore.toFixed(1)} out of 5.0</strong>. At this stage, there is general recognition that something is missing or that home repairs could be valuable, but the connection to repair readiness remains vague and undeveloped. Some leaders may be vaguely aware of housing repair needs, but there have been no structured discussions or expressed interest in developing a formal program. While there may be limited understanding of how internal gaps relate to capacity building, no formal effort has been made to define these needs or create action plans. Your organization is beginning to recognize the potential value of repairs but has not yet moved toward concrete planning or resource allocation. To progress, focus on using board meetings to introduce housing preservation as a strategic growth area, hold team conversations about what's missing, and begin documenting emerging needs through community engagement or informal data gathering.</>
                        )}
                        {results.overallScore >= 1.8 && results.overallScore < 2.8 && (
                          <>Your organization is at the <strong>Exploring</strong> stage of readiness, with an overall score of <strong>{results.overallScore.toFixed(1)} out of 5.0</strong>. Your team has begun to identify some internal needs or challenges and is starting to tie them to potential repair program goals or capacity strategies. There have been informal conversations about home repairs, perhaps in response to one-off repair requests, though no sustained planning or formal resource discussions have occurred. Some staff may have been named to participate in planning, but their responsibilities and time commitments remain unclear. The organization has community-level awareness of repair needs, supported by anecdotes or limited examples, but lacks detailed quantitative information. At this stage, you're moving beyond awareness into early exploration. To advance readiness, form a board/staff working group to explore feasibility, draft a participation strategy identifying key roles, begin capturing real data on community repair needs, and turn discussions about system improvements into early planning by testing lightweight tools or gathering stakeholder feedback.</>
                        )}
                        {results.overallScore >= 2.8 && results.overallScore < 3.8 && (
                          <>Your organization is at the <strong>Planning</strong> stage of readiness, with an overall score of <strong>{results.overallScore.toFixed(1)} out of 5.0</strong>. You have identified key gaps and are beginning to explore how to address them, with the team aligning around next steps and early strategies. Leadership is talking about housing preservation regularly and exploring its potential, though formal commitment to action or implementation has not yet been made. Specific staff have been selected to engage in training and planning, and some capacity-building goals have been identified, though they may still need refinement. Your organization has gathered some specific housing stabilization needs and organizational capacity gaps through intentional efforts, and system and equipment needs have been clearly identified with early-stage planning, piloting, or budgeting underway. A moderate plan exists for seeking new or complementary resources, and active partners are involved at a moderate level. To move toward implementation readiness, develop a strategic roadmap or case statement, create a training and learning plan for staff, document your needs in a simple format for stakeholders, prioritize 2-3 achievable goals, and define clear collaboration points with partners.</>
                        )}
                        {results.overallScore >= 3.8 && results.overallScore < 4.8 && (
                          <>Your organization is at the <strong>Preparing</strong> stage of readiness, with an overall score of <strong>{results.overallScore.toFixed(1)} out of 5.0</strong>. You have clearly defined needs directly tied to repair program readiness, with drafts, outlines, or initial frameworks in place to seek support or implement improvements. Leadership and board have taken early steps such as assigning staff, approving concept drafts, including repair in strategic planning, or exploring funding opportunities. Staff have been identified, scheduled for learning, and assigned to apply new skills to planning or early implementation steps. There is a documented and organized plan to strengthen administrative, operational, and equipment-related systems with staff roles clearly defined. Your affiliate has a clear understanding of housing repair needs supported by specific data sources, community feedback, or observable trends, and capacity gaps are directly linked to program readiness. A clear mix of current and potential resources has been identified showing diversity in type and source, and partnerships are clearly defined, active, and providing consistent support. To achieve full readiness, begin developing operational components, integrate learning into program design, advance into implementation of key systems, use community data to shape program design, document capacity needs formally, develop MOUs with partners, and build support for your sustainability plan.</>
                        )}
                        {results.overallScore >= 4.8 && (
                          <>Your organization is at the <strong>Ready</strong> stage of readiness, with an outstanding overall score of <strong>{results.overallScore.toFixed(1)} out of 5.0</strong>. Congratulations! Your affiliate has a strong, actionable plan fully aligned with your repair program vision and is well-positioned to pursue funding, technical assistance, or pilot implementation. Housing preservation is embedded in your affiliate's strategy with leadership aligned, engaged, and actively preparing for launch. A team or cross-functional staff group is fully committed, engaged in learning, and equipped with a plan to lead development of your repair program. A fully developed and actionable system improvement plan is in place, aligned with your repair launch timeline and clearly integrated across departments. Your organization has a strong, data-driven understanding of repair needs including waitlists, home assessments, or external reports, demonstrating compelling urgency and justification for program development. Goals are highly detailed and actionable, directly supporting critical repair capacity components, with a strong feasible plan that includes clear pathways for participation and accountability. Your affiliate has well-established partnerships with aligned goals and clear roles, a strong actionable resource development plan leveraging diverse assets, and a comprehensive sustainability plan with specific follow-up steps and responsible parties identified. You are now ready to move into operational readiness, finalize resource allocation, formalize your program build-out, use data in funding proposals, pursue funding or technical assistance, and begin implementation while documenting partnership impacts and post-grant strategies.</>
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

                <div className="flex justify-center mt-8">
                  <button onClick={() => setCurrentView('next-steps')} className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg">
                    <TrendingUp className="w-6 h-6" /> View Next Steps
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded">
                <AlertCircle className="w-6 h-6 text-amber-600 inline mr-2" />
                <span className="font-semibold">Complete all {totalQuestions} questions to see your dashboard.</span>
              </div>
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
    const ready = recs.filter(r => r.score >= 3);

    return (
      <>
        <TopNav />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6">Next Steps</h2>

            {!isAssessmentComplete && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded mb-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Complete Your Assessment First</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Personalized next steps will be available once you complete all assessment questions.
                    </p>
                    <button
                      onClick={() => setCurrentView('assessment')}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
                    >
                      Continue Assessment
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                General Guidance
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Review areas scoring below <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-yellow-400 text-white">Planning</span> for immediate attention</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Create a 3-6 month action plan addressing your lowest-scoring factors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Engage leadership and staff in discussing assessment results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Connect with HFHI for technical assistance in priority areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Schedule a follow-up assessment in 6 months to track progress</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-end mb-8 print:hidden">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
              >
                <Printer className="w-5 h-5" />
                Print to PDF
              </button>
            </div>

            {isAssessmentComplete && recs.length > 0 && (
              <>
                {high.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                      High Priority Action Items
                    </h3>
                    <div className="space-y-4">
                      {high.map((rec, idx) => (
                        <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="inline-block px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold mb-3">
                                High Priority
                              </div>
                              <h4 className="font-bold text-gray-800 text-lg">{rec.subfactor}</h4>
                              <p className="text-sm text-gray-600 mt-1">{rec.factor}</p>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-3xl font-bold text-red-600">{rec.score}</div>
                              <div className="text-xs text-gray-500 mt-1">{rec.level}</div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{rec.action}</p>
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
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="inline-block px-3 py-1 rounded bg-orange-500 text-white text-xs font-semibold mb-3">
                                Medium Priority
                              </div>
                              <h4 className="font-bold text-gray-800 text-lg">{rec.subfactor}</h4>
                              <p className="text-sm text-gray-600 mt-1">{rec.factor}</p>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-3xl font-bold text-orange-600">{rec.score}</div>
                              <div className="text-xs text-gray-500 mt-1">{rec.level}</div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{rec.action}</p>
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
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="inline-block px-3 py-1 rounded bg-gray-500 text-white text-xs font-semibold mb-3">
                                Low Priority
                              </div>
                              <h4 className="font-bold text-gray-800 text-lg">{rec.subfactor}</h4>
                              <p className="text-sm text-gray-600 mt-1">{rec.factor}</p>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-3xl font-bold text-gray-600">{rec.score}</div>
                              <div className="text-xs text-gray-500 mt-1">{rec.level}</div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{rec.action}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {ready.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      Ready - Areas of Strength
                    </h3>
                    <div className="space-y-4">
                      {ready.map((rec, idx) => (
                        <div key={idx} className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="inline-block px-3 py-1 rounded bg-green-600 text-white text-xs font-semibold mb-3">
                                Ready
                              </div>
                              <h4 className="font-bold text-gray-800 text-lg">{rec.subfactor}</h4>
                              <p className="text-sm text-gray-600 mt-1">{rec.factor}</p>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-3xl font-bold text-green-600">{rec.score}</div>
                              <div className="text-xs text-gray-500 mt-1">{rec.level}</div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">Maintain this strong foundation and leverage it to support other areas of development.</p>
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
};

export default ReadinessApp;