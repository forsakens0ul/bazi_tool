// 古籍数据类型定义

export interface ClassicTextItem {
  book: string;
  chapter: string;
  originalText: string;
  modernExplanation: string;
  modernTerms: string[];
  structureAnalysis: string;
  example: {
    bazi: string;
    analysis: string;
  };
  relatedTerms: string[];
}

export interface TermMappingItem {
  modern: string;
  explanation: string;
  modernExplanation: string;
  category: string;
  relatedTerms: string[];
  sources: { book: string; quote: string }[];
  examples: { bazi: string; analysis: string }[];
}

export interface ClassicAnalysisItem {
  book: string;
  chapter: string;
  title: string;
  originalText: string;
  modernExplanation: string;
  modernTermExplanation: string;
  structure: {
    bazi: string;
    shishen: string[];
    keyElements: string[];
    problems: string[];
  };
  examples: {
    title: string;
    bazi: string;
    analysis: string;
    demonstration: string;
  }[];
  learningPoints: {
    understanding: string[];
    application: string[];
  };
}
