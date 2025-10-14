import React, { useState, useMemo } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Home,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  FileText,
  Download,
  MessageSquare,
  Printer
} from 'lucide-react';
import content from './content/readinessText.json';

const VERSION = '1.3.7';

const ReadinessApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [currentView, setCurrentView] = useState('welcome');
  const [guideUrl, setGuideUrl] = useState('');

  const allSubfactors = content.factors.flatMap(f =>
    f.subfactors.map(sf => ({ ...sf, factorTitle: f.title }))
  );

  const calculateResults = () => {
    const factorScores = {};
    content.factors.forEach(factor => {
      const scores = factor.subfactors.map(sf => responses[sf.id]).filter(s => s !== undefined);
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
    const overallScore =
      Object.values(factorScores).length > 0
        ? Object.values(factorScores).reduce((sum, f) => sum + f.score, 0) / Object.keys(factorScores).length
        : 0;
    return { factorScores, overallScore };
  };

  const getReadinessLevel = score => {
    if (score === undefined || score === null) return { label: 'N/A', color: 'bg-gray-300' };
    if (score < 0.8) return { label: 'Inactive', color: 'bg-gray-400' };
    if (score < 1.8) return { label: 'Aware', color: 'bg-red-400' };
    if (score < 2.8) return { label: 'Exploring', color: 'bg-orange-400' };
    if (score < 3.8) return { label: 'Planning', color: 'bg-yellow-400' };
    if (score < 4.8) return { label: 'Preparing', color: 'bg-blue-400' };
    return { label: 'Ready', color: 'bg-green-500' };
  };

  const results = useMemo(() => calculateResults(), [responses]);
  const totalQuestions = allSubfactors.length;
  const answeredQuestions = Object.keys(responses).length;
  const completionPercentage = (answeredQuestions / totalQuestions) * 100;
  const isAssessmentComplete = answeredQuestions === totalQuestions;
  const currentSubfactor = allSubfactors[currentStep];

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
              <h1 className="text-lg font-bold text-gray-800">{content.app.title}</h1>
              <p className="text-xs text-gray-500">v{VERSION}</p>
            </div>
          </div>
          <nav className="flex gap-2">
            {content.app.nav.map(view => (
              <button
                key={view.id}
                onClick={() => setCurrentView(view.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm ${
  currentView === view.id
    ? 'bg-blue-600 text-white'
    : 'text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
}`}

              >
                {view.label}
              </button>
            ))}
            <button
              onClick={() => {
                if (guideUrl) window.open(guideUrl, '_blank');
                else alert(content.messages.noGuideUrl);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm"
              title="Download Assessment Guide"
            >
              <Download className="w-4 h-4" />
              {content.app.guideButton}
            </button>
          </nav>
        </div>
      </div>
    </div>
  );

  if (currentView === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{content.welcome.title}</h1>
            <p className="text-blue-100 text-lg">{content.welcome.subtitle}</p>
          </div>

          <div className="p-8 md:p-12">
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {content.welcome.adminPrompt}
              </label>
              <input
                type="text"
                value={guideUrl}
                onChange={e => setGuideUrl(e.target.value)}
                placeholder="https://example.com/assessment-guide.pdf"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <p className="text-xs text-gray-600 mt-2">{content.welcome.adminHint}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {content.welcome.expectations.title}
              </h2>
              <div className="space-y-4">
                {content.welcome.expectations.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 font-bold">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {content.welcome.guide.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-4">{content.welcome.guide.description}</p>
                  <button
                    onClick={() =>
                      guideUrl ? window.open(guideUrl, '_blank') : alert(content.messages.noGuideUrl)
                    }
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md hover:shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                    {content.welcome.guide.button}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                {content.welcome.tips.title}
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                {content.welcome.tips.items.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setCurrentView('assessment')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg hover:shadow-xl"
              >
                {content.welcome.startButton} <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              {content.welcome.versionNote} v{VERSION}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <div>Other views implemented with content JSON</div>;
};

export default ReadinessApp;
