import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Home, CheckCircle, AlertCircle, TrendingUp, FileText, Download, Save, MessageSquare, History, Printer } from 'lucide-react';

const VERSION = '1.3.1';

const ReadinessApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [comments, setComments] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [assessmentHistory, setAssessmentHistory] = useState([]);
  const [assessmentName, setAssessmentName] = useState('');
  const [currentView, setCurrentView] = useState('assessment');

  const assessmentData = {
    factors: [
      {
        id: 'capacity',
        title: 'Factor 1: Capacity of Affiliate',
        description: 'Evaluates your organizational infrastructure, leadership, and staffing readiness.',
        subfactors: [
          {
            id: 'leadership',
            title: 'Leadership and Board Commitment',
            question: 'How would you rate your organization leadership and board commitment toward developing a home repair program?',
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
            title: 'Staff Commitment to Learn and Implement',
            question: 'How prepared and committed is your staff to engage in training and apply what is learned?',
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
            title: 'Internal Systems Development',
            question: 'How well has your organization identified and planned for improvements to key systems?',
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
        description: 'Examines community housing needs and organizational capacity-building requirements.',
        subfactors: [
          {
            id: 'housing',
            title: 'Housing Stabilization Needs',
            question: 'How well has your organization determined housing repair needs within your community?',
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
            title: 'Organizational Need for Capacity Building',
            question: 'How clearly has your organization identified the need for capacity building?',
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
            question: 'How timely is this capacity-building opportunity for your organization?',
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
        description: 'Evaluates the quality and feasibility of your capacity-building plan.',
        subfactors: [
          {
            id: 'goals',
            title: 'Clarity of Capacity-Building Goals',
            question: 'How clearly defined and realistic are your capacity-building goals?',
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
            title: 'Feasibility of Approach',
            question: 'How realistic and well-structured is your plan for participating in training?',
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
            title: 'Alignment with Program Outcomes',
            question: 'How well does your approach align with capacity building and sustainability goals?',
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
        description: 'Considers your ability to build on opportunities through resources and partnerships.',
        subfactors: [
          {
            id: 'resources',
            title: 'Commitment to Additional Resources',
            question: 'How committed is your organization to seeking additional resources?',
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
            title: 'Partnerships and Collaborations',
            question: 'How well has your organization identified partnerships to strengthen capacity building?',
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
            title: 'Potential Beyond Grant Term',
            question: 'How well positioned are you to sustain or grow outcomes beyond the grant?',
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
        description: 'Examines your vision for long-term community impact and program sustainability.',
        subfactors: [
          {
            id: 'vision',
            title: 'Vision for Sustained Impact',
            question: 'How clear is your vision for sustaining a home repair program?',
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
            title: 'Plan for Applying Capacity Post-Grant',
            question: 'How effectively have you planned to apply knowledge after funding ends?',
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
            title: 'Broader Community Benefit',
            question: 'How well does your organization demonstrate broader community or sector benefit?',
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
    f.subfactors.map(sf => ({ ...sf, factorId: f.id, factorTitle: f.title }))
  );

  const handleResponse = (subfactorId, value) => {
    setResponses({ ...responses, [subfactorId]: value });
  };

  const handleComment = (subfactorId, comment) => {
    setComments({ ...comments, [subfactorId]: comment });
  };

  const calculateResults = () => {
    const factorScores = {};
    assessmentData.factors.forEach(factor => {
      const scores = factor.subfactors
        .map(sf => responses[sf.id] !== undefined ? responses[sf.id] : null)
        .filter(s => s !== null);
      
      if (scores.length > 0) {
        factorScores[factor.id] = {
          title: factor.title,
          score: scores.reduce((a, b) => a + b, 0) / scores.length,
          max: 5,
          subfactors: factor.subfactors.map(sf => ({
            title: sf.title,
            id: sf.id,
            score: responses[sf.id] !== undefined ? responses[sf.id] : null
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
    if (score < 0.8) return { label: 'Inactive', color: 'bg-gray-400', textColor: 'text-gray-700' };
    if (score < 1.8) return { label: 'Aware', color: 'bg-red-400', textColor: 'text-red-700' };
    if (score < 2.8) return { label: 'Exploring', color: 'bg-orange-400', textColor: 'text-orange-700' };
    if (score < 3.8) return { label: 'Planning', color: 'bg-yellow-400', textColor: 'text-yellow-700' };
    if (score < 4.8) return { label: 'Preparing', color: 'bg-blue-400', textColor: 'text-blue-700' };
    return { label: 'Ready', color: 'bg-green-500', textColor: 'text-green-700' };
  };

  const saveToHistory = () => {
    const name = assessmentName || `Assessment ${new Date().toLocaleDateString()}`;
    const newAssessment = {
      id: Date.now(),
      name,
      date: new Date().toISOString(),
      responses: { ...responses },
      comments: { ...comments },
      results: calculateResults()
    };
    const updated = [newAssessment, ...assessmentHistory];
    setAssessmentHistory(updated);
    alert('Assessment saved successfully!');
  };

  const loadFromHistory = (assessment) => {
    setResponses(assessment.responses);
    setComments(assessment.comments);
    setAssessmentName(assessment.name);
    setCurrentStep(0);
    setShowResults(false);
  };

  const exportToCSV = () => {
    const results = calculateResults();
    const factorScores = results.factorScores;
    const overallScore = results.overallScore;
    let csv = 'Factor,Sub-factor,Score,Level,Comments\n';
    
    Object.entries(factorScores).forEach(([factorId, data]) => {
      data.subfactors.forEach(sf => {
        const level = sf.score !== null ? getReadinessLevel(sf.score).label : 'N/A';
        const comment = comments[sf.id] || '';
        const cleanComment = comment.replace(/"/g, '""');
        csv += `"${data.title}","${sf.title}",${sf.score || 'N/A'},"${level}","${cleanComment}"\n`;
      });
    });
    
    csv += `\nOverall Score,${overallScore.toFixed(1)},"${getReadinessLevel(overallScore).label}"\n`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const dateStr = new Date().toISOString().split('T')[0];
    a.download = `repair-readiness-${dateStr}.csv`;
    a.click();
  };

  const printResults = () => {
    window.print();
  };

  const getRecommendations = (factorScores) => {
    const recommendations = [];
    
    Object.entries(factorScores).forEach(([factorId, data]) => {
      const factor = assessmentData.factors.find(f => f.id === factorId);
      
      data.subfactors.forEach((sf, idx) => {
        if (sf.score !== null) {
          const subfactor = factor.subfactors[idx];
          const level = subfactor.levels.find(l => l.value === sf.score);
          
          let priority = 'Low';
          if (sf.score < 2) priority = 'High';
          else if (sf.score < 3) priority = 'Medium';
          
          recommendations.push({
            factor: data.title,
            subfactor: sf.title,
            score: sf.score,
            level: level.label,
            priority: priority,
            action: 'Continue developing this area with focused planning and resource allocation.'
          });
        }
      });
    });
    
    return recommendations.sort((a, b) => a.score - b.score);
  };

  const currentSubfactor = allSubfactors[currentStep];
  const progress = ((currentStep + 1) / allSubfactors.length) * 100;
  
  const totalQuestions = allSubfactors.length;
  const answeredQuestions = Object.keys(responses).length;
  const completionPercentage = (answeredQuestions / totalQuestions) * 100;
  const isAssessmentComplete = answeredQuestions === totalQuestions;

  const TopNav = () => (
    <div className="bg-white border-b border-gray-200 shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-800">Repair Readiness Assessment</h1>
              <p className="text-xs text-gray-500">Version {VERSION}</p>
            </div>
          </div>
          
          <nav className="flex gap-1 md:gap-2">
            <button
              onClick={() => {
                setCurrentView('assessment');
                setShowResults(false);
              }}
              className={`px-3 md:px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                currentView === 'assessment'
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
              }`}
            >
              Assessment
            </button>
            <button
              onClick={() => setCurrentView('results')}
              className={`px-3 md:px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                currentView === 'results'
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
              }`}
            >
              Results
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-3 md:px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView('next-steps')}
              className={`px-3 md:px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                currentView === 'next-steps'
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
              }`}
            >
              Next Steps
            </button>
          </nav>
        </div>
      </div>
    </div>
  );

  const ResultsView = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6 print:bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Assessment Results</h2>
              <button
                onClick={printResults}
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold print:hidden"
              >
                <Printer className="w-5 h-5" />
                Print to PDF
              </button>
            </div>

            {!isAssessmentComplete && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded mb-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Assessment In Progress</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      You have answered {answeredQuestions} of {totalQuestions} questions. Complete all questions to see full results.
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

            {assessmentData.factors.map((factor) => (
              <div key={factor.id} className="mb-8 print:break-inside-avoid">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-lg p-4 text-white">
                  <h3 className="text-xl font-bold">{factor.title}</h3>
                  <p className="text-blue-100 text-sm mt-1">{factor.description}</p>
                </div>
                
                <div className="border border-gray-200 rounded-b-lg">
                  {factor.subfactors.map((subfactor, idx) => {
                    const response = responses[subfactor.id];
                    const comment = comments[subfactor.id];
                    const selectedLevel = response !== undefined ? subfactor.levels.find(l => l.value === response) : null;
                    const readinessLevel = response !== undefined ? getReadinessLevel(response) : null;
                    
                    return (
                      <div 
                        key={subfactor.id} 
                        className={`p-6 ${idx !== factor.subfactors.length - 1 ? 'border-b border-gray-200' : ''} ${response === undefined ? 'bg-gray-50' : 'bg-white'}`}
                      >
                        <div className="mb-3">
                          <h4 className="font-semibold text-gray-800 text-lg mb-2">{subfactor.title}</h4>
                          <p className="text-gray-600 text-sm">{subfactor.question}</p>
                        </div>
                        
                        {response !== undefined && selectedLevel ? (
                          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${readinessLevel.color} text-white`}>
                                    {selectedLevel.label}
                                  </span>
                                  <span className="text-sm text-gray-600">Score: {response}/5</span>
                                </div>
                                <p className="text-gray-700">{selectedLevel.description}</p>
                              </div>
                            </div>
                            
                            {comment && (
                              <div className="mt-3 pt-3 border-t border-blue-200">
                                <div className="flex items-start gap-2">
                                  <MessageSquare className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-xs font-semibold text-blue-800 mb-1">Your Notes:</p>
                                    <p className="text-sm text-gray-700 italic">{comment}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="bg-gray-100 border border-gray-300 p-4 rounded">
                            <p className="text-gray-500 italic">Not yet answered</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {isAssessmentComplete && (
              <div className="flex justify-center gap-4 mt-8 print:hidden">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  View Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('next-steps')}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  View Next Steps
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const DashboardView = () => {
    const results = isAssessmentComplete ? calculateResults() : null;
    const factorScores = results?.factorScores || {};
    const overallScore = results?.overallScore || 0;

    const getReadinessDistribution = () => {
      const distribution = {
        'Inactive': 0,
        'Aware': 0,
        'Exploring': 0,
        'Planning': 0,
        'Preparing': 0,
        'Ready': 0
      };

      allSubfactors.forEach(sf => {
        const score = responses[sf.id];
        if (score !== undefined) {
          const level = getReadinessLevel(score).label;
          distribution[level]++;
        }
      });

      return distribution;
    };

    const distribution = getReadinessDistribution();

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

            {isAssessmentComplete && results && (
              <>
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white mb-6">
                  <h3 className="text-xl font-semibold mb-2">Overall Readiness Score</h3>
                  <div className="flex items-end gap-4">
                    <div className="text-5xl font-bold">{overallScore.toFixed(1)}</div>
                    <div className="text-2xl mb-2">/ 5.0</div>
                  </div>
                  <div className={`inline-block px-4 py-2 rounded-full mt-3 ${getReadinessLevel(overallScore).color} text-white font-semibold`}>
                    {getReadinessLevel(overallScore).label}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-8">
                  <button
                    onClick={printResults}
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
                              style={{ left: `${(overallScore / 5) * 100}%` }}
                            >
                              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-sm font-bold whitespace-nowrap">
                                {overallScore.toFixed(1)}
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
                            <div className="text-5xl font-bold text-gray-800">{overallScore.toFixed(1)}</div>
                            <div className="text-sm text-gray-500 mt-1">out of 5.0</div>
                            <div className={`mt-3 px-4 py-1 rounded-full text-sm font-semibold ${getReadinessLevel(overallScore).color} text-white`}>
                              {getReadinessLevel(overallScore).label}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="prose max-w-none mt-6 pt-6 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {overallScore < 0.8 && (
                          <>Your organization is at the <strong>Inactive</strong> stage of readiness, with an overall score of <strong>{overallScore.toFixed(1)} out of 5.0</strong>. This indicates that foundational awareness and initial planning steps are needed across multiple capacity areas.</>
                        )}
                        {overallScore >= 0.8 && overallScore < 1.8 && (
                          <>Your organization is at the <strong>Aware</strong> stage of readiness, with an overall score of <strong>{overallScore.toFixed(1)} out of 5.0</strong>. You have some recognition of repair needs and general awareness among leadership or staff.</>
                        )}
                        {overallScore >= 1.8 && overallScore < 2.8 && (
                          <>Your organization is at the <strong>Exploring</strong> stage of readiness, with an overall score of <strong>{overallScore.toFixed(1)} out of 5.0</strong>. You have begun initial conversations and planning efforts.</>
                        )}
                        {overallScore >= 2.8 && overallScore < 3.8 && (
                          <>Your organization is at the <strong>Planning</strong> stage of readiness, with an overall score of <strong>{overallScore.toFixed(1)} out of 5.0</strong>. You have moderate clarity and alignment across key capacity areas.</>
                        )}
                        {overallScore >= 3.8 && overallScore < 4.8 && (
                          <>Your organization is at the <strong>Preparing</strong> stage of readiness, with an overall score of <strong>{overallScore.toFixed(1)} out of 5.0</strong>. You have strong foundations in place and are actively working toward launch.</>
                        )}
                        {overallScore >= 4.8 && (
                          <>Your organization is at the <strong>Ready</strong> stage of readiness, with an outstanding overall score of <strong>{overallScore.toFixed(1)} out of 5.0</strong>. Congratulations! You have comprehensive systems and strong leadership alignment.</>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!isAssessmentComplete && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded mb-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Complete Your Assessment</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      You need to complete all {totalQuestions} questions to see your full readiness dashboard.
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

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Readiness Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-300 text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-400 mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{distribution.Inactive}</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-700">Inactive</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border-2 border-red-300 text-center">
                  <div className="w-12 h-12 rounded-full bg-red-400 mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{distribution.Aware}</span>
                  </div>
                  <div className="text-sm font-semibold text-red-700">Aware</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-300 text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-400 mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{distribution.Exploring}</span>
                  </div>
                  <div className="text-sm font-semibold text-orange-700">Exploring</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-300 text-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-400 mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{distribution.Planning}</span>
                  </div>
                  <div className="text-sm font-semibold text-yellow-700">Planning</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300 text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-400 mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{distribution.Preparing}</span>
                  </div>
                  <div className="text-sm font-semibold text-blue-700">Preparing</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border-2 border-green-300 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500 mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{distribution.Ready}</span>
                  </div>
                  <div className="text-sm font-semibold text-green-700">Ready</div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">Factor Overview</h3>
            <div className="space-y-6 mb-8">
              {assessmentData.factors.map(factor => {
                const factorData = factorScores[factor.id];
                const score = factorData?.score || 0;
                const level = getReadinessLevel(score);
                const percentage = (score / 5) * 100;
                
                return (
                  <div key={factor.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="p-4 bg-gray-50 flex items-center justify-between">
                      <h4 className="font-bold text-gray-800">{factor.title}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-700">{score.toFixed(1)}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${level.color} text-white`}>
                          {level.label}
                        </span>
                      </div>
                    </div>
                    
                    <div className="px-4 pt-2">
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className={`h-4 rounded-full ${level.color} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-2">
                      {factor.subfactors.map(sf => {
                        const sfScore = responses[sf.id];
                        const sfLevel = sfScore !== undefined ? getReadinessLevel(sfScore) : null;
                        
                        return (
                          <div key={sf.id} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">{sf.title}</span>
                            {sfLevel ? (
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${sfLevel.color} text-white`}>
                                {sfLevel.label}
                              </span>
                            ) : (
                              <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-300 text-gray-600">
                                Not Answered
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setCurrentView('next-steps')}
                className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                <TrendingUp className="w-6 h-6" />
                View Next Steps
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NextStepsView = () => {
    const results = isAssessmentComplete ? calculateResults() : null;
    const recommendations = results ? getRecommendations(results.factorScores) : [];
    const highPriorityRecs = recommendations.filter(r => r.priority === 'High');
    const mediumPriorityRecs = recommendations.filter(r => r.priority === 'Medium');
    const lowPriorityRecs = recommendations.filter(r => r.priority === 'Low');

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Next Steps</h2>

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
                <li>• Review areas scoring below <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-yellow-400 text-white">Planning</span> for immediate attention</li>
                <li>• Create a 3-6 month action plan addressing your lowest-scoring factors</li>
                <li>• Engage leadership and staff in discussing assessment results</li>
                <li>• Connect with HFHI for technical assistance in priority areas</li>
                <li>• Schedule a follow-up assessment in 6 months to track progress</li>
              </ul>
            </div>

            <div className="flex justify-end mb-8 print:hidden">
              <button
                onClick={printResults}
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
              >
                <Printer className="w-5 h-5" />
                Print to PDF
              </button>
            </div>

            {isAssessmentComplete && recommendations.length > 0 && (
              <>
                {highPriorityRecs.length > 0 && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                      High Priority Action Items
                    </h3>
                    <div className="space-y-4">
                      {highPriorityRecs.map((rec, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg border-2 border-red-200 shadow-sm">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                            <div className="flex-1">
                              <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">
                                {rec.priority} Priority
                              </span>
                              <h4 className="font-semibold text-gray-800 mt-2">{rec.subfactor}</h4>
                              <p className="text-sm text-gray-600">{rec.factor}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-red-600">{rec.score}</div>
                              <div className="text-xs text-gray-500">{rec.level}</div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mt-2">{rec.action}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {mediumPriorityRecs.length > 0 && (
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-orange-600" />
                      Medium Priority Action Items
                    </h3>
                    <div className="space-y-4">
                      {mediumPriorityRecs.map((rec, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg border-2 border-orange-200 shadow-sm">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                            <div className="flex-1">
                              <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-orange-100 text-orange-700">
                                {rec.priority} Priority
                              </span>
                              <h4 className="font-semibold text-gray-800 mt-2">{rec.subfactor}</h4>
                              <p className="text-sm text-gray-600">{rec.factor}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-orange-600">{rec.score}</div>
                              <div className="text-xs text-gray-500">{rec.level}</div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mt-2">{rec.action}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {lowPriorityRecs.length > 0 && (
                  <div className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-gray-600" />
                      Low Priority Action Items
                    </h3>
                    <div className="space-y-4">
                      {lowPriorityRecs.map((rec, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                            <div className="flex-1">
                              <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700">
                                {rec.priority} Priority
                              </span>
                              <h4 className="font-semibold text-gray-800 mt-2">{rec.subfactor}</h4>
                              <p className="text-sm text-gray-600">{rec.factor}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-600">{rec.score}</div>
                              <div className="text-xs text-gray-500">{rec.level}</div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mt-2">{rec.action}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (currentView === 'results') {
    return (
      <>
        <TopNav />
        <ResultsView />
      </>
    );
  }

  if (currentView === 'dashboard') {
    return (
      <>
        <TopNav />
        <DashboardView />
      </>
    );
  }

  if (currentView === 'next-steps') {
    return (
      <>
        <TopNav />
        <NextStepsView />
      </>
    );
  }

  return (
    <>
      <TopNav />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {assessmentHistory.length > 0 && (
              <div className="lg:col-span-1 bg-white rounded-lg shadow-xl p-4 h-fit">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <History className="w-5 h-5" />
                  History
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {assessmentHistory.slice(0, 5).map((assessment) => (
                    <button
                      key={assessment.id}
                      onClick={() => loadFromHistory(assessment)}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-sm"
                    >
                      <div className="font-semibold text-gray-800 truncate">{assessment.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(assessment.date).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-blue-600 mt-1">
                        Score: {assessment.results.overallScore.toFixed(1)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={`${assessmentHistory.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 md:p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                      <Home className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-xl md:text-2xl font-bold">Home Repair Program Readiness Assessment</h1>
                      <p className="text-blue-100 text-sm md:text-base mt-1">Evaluate your organization readiness to launch a formal home repair program</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Assessment Progress</span>
                      <span className="text-sm font-semibold">{answeredQuestions} / {totalQuestions} Questions</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 mb-1">
                      <div 
                        className="bg-white h-2 rounded-full transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                    <p className="text-blue-100 text-xs text-right">{completionPercentage.toFixed(0)}% Complete</p>
                  </div>
                </div>

                <div className="p-4 md:p-8">
                  <div className="mb-6">
                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">
                      {currentSubfactor.factorTitle}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                      {currentSubfactor.title}
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg">{currentSubfactor.question}</p>
                  </div>

                  <div className="space-y-3">
                    {currentSubfactor.levels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => handleResponse(currentSubfactor.id, level.value)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          responses[currentSubfactor.id] === level.value
                            ? 'border-indigo-600 bg-indigo-50 shadow-md'
                            : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            responses[currentSubfactor.id] === level.value
                              ? 'border-indigo-600 bg-indigo-600'
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
                      {showComments ? 'Hide' : 'Add'} Notes or Comments
                    </button>
                    
                    {showComments && (
                      <div className="mt-3">
                        <textarea
                          value={comments[currentSubfactor.id] || ''}
                          onChange={(e) => handleComment(currentSubfactor.id, e.target.value)}
                          placeholder="Add any notes or context for this question..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows="3"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 md:p-6 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 border-t">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>

                  {currentStep === allSubfactors.length - 1 ? (
                    <button
                      onClick={() => {
                        setCurrentView('results');
                      }}
                      disabled={responses[currentSubfactor.id] === undefined}
                      className="flex items-center justify-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                    >
                      <FileText className="w-5 h-5" />
                      View Results
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={responses[currentSubfactor.id] === undefined}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6 bg-white rounded-lg shadow p-4 md:p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Assessment Guidance</h3>
                    <p className="text-sm text-gray-600">
                      Select the response that best describes your organization current state. 
                      Be honest in your assessment. This tool is designed to help identify both strengths and areas for growth. 
                      You can navigate back to review or change previous answers at any time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadinessApp;
                