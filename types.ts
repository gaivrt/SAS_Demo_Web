export enum SlideType {
  INTRO = 'INTRO',
  PROBLEM = 'PROBLEM',
  BACKGROUND = 'BACKGROUND',
  SOLUTION = 'SOLUTION',
  RESULTS = 'RESULTS',
  FUTURE_WORK = 'FUTURE_WORK',
  CONCLUSION = 'CONCLUSION',
  REFERENCES = 'REFERENCES'
}

export interface SlideData {
  id: SlideType;
  title: string;
  subtitle?: string;
  sectionNumber: string;
}

export const SLIDES: SlideData[] = [
  { id: SlideType.INTRO, title: "Introduction", subtitle: "Research Context & Motivation", sectionNumber: "01" },
  { id: SlideType.PROBLEM, title: "Problem Formulation", subtitle: "Semantic Drift in Digital Subcultures", sectionNumber: "02" },
  { id: SlideType.BACKGROUND, title: "Related Work", subtitle: "Baseline Architectures & Gaps", sectionNumber: "03" },
  { id: SlideType.SOLUTION, title: "Methodology", subtitle: "The SAS Framework Architecture", sectionNumber: "04" },
  { id: SlideType.RESULTS, title: "Evaluation", subtitle: "Performance on JiraiBench", sectionNumber: "05" },
  { id: SlideType.FUTURE_WORK, title: "Future Work", subtitle: "Research Roadmap", sectionNumber: "06" },
  { id: SlideType.CONCLUSION, title: "Conclusion", subtitle: "Summary & Resources", sectionNumber: "07" },
  { id: SlideType.REFERENCES, title: "References", subtitle: "Bibliography", sectionNumber: "08" }
];