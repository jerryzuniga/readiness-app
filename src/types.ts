export interface Level {
  value: number;
  label: string;
  description: string;
}

export interface Subfactor {
  id: string;
  title: string;
  question: string;
  levels: Level[];
}

export interface Factor {
  id: string;
  title: string;
  description: string;
  subfactors: Subfactor[];
}

export interface AssessmentData {
  factors: Factor[];
}

export interface SubfactorWithFactor extends Subfactor {
  factorId: string;
  factorTitle: string;
}

export interface ReadinessLevel {
  label: string;
  color: string;
  textColor: string;
}

export interface FactorScore {
  title: string;
  score: number;
  max: number;
  subfactors: {
    title: string;
    id: string;
    score: number | null;
  }[];
}

export interface AssessmentResults {
  factorScores: Record<string, FactorScore>;
  overallScore: number;
}

export interface Assessment {
  id: number;
  name: string;
  date: string;
  responses: Record<string, number>;
  comments: Record<string, string>;
  results: AssessmentResults;
}

export interface Recommendation {
  factor: string;
  subfactor: string;
  score: number;
  level: string;
  priority: 'High' | 'Medium';
  action: string;
}