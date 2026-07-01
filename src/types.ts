export interface Metric {
  label: string;
  before: string;
  after: string;
  improved: boolean;
}

export interface Decision {
  situation: string;
  tradeoff: string;
  choice: string;
  why: string;
}

export interface QualityCheck {
  method: string;
  tools: string[];
  outcome: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  period: string;
  metrics: Metric[];
  summary: string;
  ownership: string[];
  decisions: Decision[];
  qualityChecks: QualityCheck[];
  techStack: string[];
  impactSummary: string;
}

export interface TechNote {
  id: string;
  category: 'architecture' | 'performance' | 'accessibility' | 'testing';
  title: string;
  description: string;
  problem: string;
  solution: string;
  codeSnippet: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  productArea: string;
  scope: string;
  stack: string[];
  bulletPoints: string[];
}

export interface TrailPoint {
  id: string;
  name: string;
  elevation: number; // in feet
  distance: number; // in miles from start
  landmark: string;
  majorFlora: string;
  lesson: string;
  techAnalogy: string;
}

export interface VirtualPlant {
  id: string;
  name: string;
  type: string;
  moisture: number; // 0-100
  sunlight: 'low' | 'medium' | 'high';
  status: 'thirsty' | 'healthy' | 'overwatered';
  lastWatered: string;
}
