// 古籍经典数据主入口
import {
  ClassicTextItem,
  TermMappingItem,
  ClassicAnalysisItem,
} from "./guji-types";
import {
  searchClassicTextsSanming,
  classicAnalysesSanming,
  termMappingsSanming,
} from "./guji-sanmingtonghui";

// 按书籍分组的古籍数据
export const classicTexts: Record<string, ClassicTextItem[]> = {
  三命通会: searchClassicTextsSanming,
  // 未来可追加其他古籍数据
};

// 所有古籍数据合并
const allClassicTexts: ClassicTextItem[] = [
  ...searchClassicTextsSanming,
  // 未来可追加其他古籍数据
];

// 搜索函数
export const searchClassicTexts = (
  searchTerm: string,
  selectedBook: string = "all"
): ClassicTextItem[] => {
  const term = searchTerm.toLowerCase().trim();

  // 如果没有搜索词，返回空数组
  if (!term) return [];

  // 确定要搜索的数据源
  const dataToSearch =
    selectedBook === "all" ? allClassicTexts : classicTexts[selectedBook] || [];

  // 执行搜索
  return dataToSearch.filter(
    (item) =>
      item.originalText.toLowerCase().includes(term) ||
      item.modernExplanation.toLowerCase().includes(term) ||
      item.modernTerms.some((t) => t.toLowerCase().includes(term)) ||
      item.structureAnalysis.toLowerCase().includes(term) ||
      (item.example && item.example.analysis.toLowerCase().includes(term)) ||
      item.relatedTerms.some((t) => t.toLowerCase().includes(term))
  );
};

export const termMappings: Record<string, TermMappingItem> = {
  ...termMappingsSanming,
  // 未来可追加其他古籍术语
};

export const classicAnalyses: Record<string, ClassicAnalysisItem> = {
  ...classicAnalysesSanming,
  // 未来可追加其他古籍分析
};

// 兼容原有API
export const searchClassicTextsApi = allClassicTexts;
export const termMappingsApi = termMappings;
export const classicAnalysesApi = classicAnalyses;

export const getTermMapping = (ancient: string) =>
  termMappings[ancient] || null;
export const getClassicAnalysis = (key: string) => classicAnalyses[key] || null;
