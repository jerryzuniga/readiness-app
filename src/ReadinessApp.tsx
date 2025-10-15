import React, { useState } from "react";
import content from "./content/readinessText.json";

interface ViewOption {
  id: string;
  label: string;
}

const ReadinessApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("welcome");
  const [guideUrl, setGuideUrl] = useState<string>("");

  const views: ViewOption[] = [
    { id: "welcome", label: "Welcome" },
    { id: "assessment", label: "Assessment" },
    { id: "results", label: "Results" },
    { id: "dashboard", label: "Dashboard" },
    { id: "next-steps", label: "Next Steps" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-700">
          {content.app.title}
        </h1>
        <nav className="flex gap-2">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setCurrentView(view.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm ${
                currentView === view.id
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
              }`}
            >
              {view.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {currentView === "welcome" && (
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              {content.welcome.title}
            </h2>
            <p className="mb-4">{content.welcome.subtitle}</p>

            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <h3 className="text-lg font-semibold mb-2">
                {content.welcome.expectations.title}
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                {content.welcome.expectations.items.map(
                  (item: any, index: number) => (
                    <li key={index}>
                      <strong>{item.title}</strong> – {item.description}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <h3 className="text-lg font-semibold mb-2">
                {content.welcome.guide.title}
              </h3>
              <p className="mb-3">{content.welcome.guide.description}</p>
              <input
                type="text"
                placeholder="Set Assessment Guide URL"
                value={guideUrl}
                onChange={(e) => setGuideUrl(e.target.value)}
                className="border rounded p-2 w-full mb-2"
              />
              <a
                href={guideUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {content.welcome.guide.button}
              </a>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-2">
                {content.welcome.tips.title}
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                {content.welcome.tips.items.map((tip: string, index: number) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              {content.welcome.startButton}
            </button>
          </section>
        )}

        {currentView === "assessment" && (
          <section>
            <h2 className="text-2xl font-semibold">
              {content.factors[0].title}
            </h2>
            <div className="space-y-4 mt-4">
              {content.factors[0].subfactors.map((sf: any, i: number) => (
                <div
                  key={i}
                  className="border border-gray-300 rounded-lg p-4 bg-white"
                >
                  <h3 className="font-semibold">{sf.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{sf.question}</p>
                  <ul className="list-disc pl-5 text-sm">
                    {sf.levels.map((level: any, j: number) => (
                      <li key={j}>
                        <strong>{level.label}:</strong> {level.description}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ReadinessApp;
