// bazi-geju.ts - 八字格局与喜忌神分析

// 八字结构定义
export interface Bazi {
  dayGan: string; // 日干
  monthBranch: string; // 月令
  heavenlyStems: string[]; // 年、月、日、时天干
  earthlyBranches: string[]; // 年、月、日、时地支
}

// 天干五行映射
const ganElement: Record<string, string> = {
  甲: "木",
  乙: "木",
  丙: "火",
  丁: "火",
  戊: "土",
  己: "土",
  庚: "金",
  辛: "金",
  壬: "水",
  癸: "水",
};

// 地支藏干表
const branchHiddenStems: Record<string, string[]> = {
  子: ["癸"],
  丑: ["己", "癸", "辛"],
  寅: ["甲", "丙", "戊"],
  卯: ["乙"],
  辰: ["戊", "乙", "癸"],
  巳: ["丙", "庚", "戊"],
  午: ["丁", "己"],
  未: ["己", "丁", "乙"],
  申: ["庚", "壬", "戊"],
  酉: ["辛"],
  戌: ["戊", "辛", "丁"],
  亥: ["壬", "甲"],
};

// 五行生克表
// 生我
const generating: Record<string, string> = {
  金: "土",
  木: "水",
  水: "金",
  火: "木",
  土: "火",
};

// 我生
const generated: Record<string, string> = {
  金: "水",
  木: "火",
  水: "木",
  火: "土",
  土: "金",
};

// 我克
const overcoming: Record<string, string> = {
  金: "木",
  木: "土",
  水: "火",
  火: "金",
  土: "水",
};

// 评分规则：获取日干五行
function getDayElement(dayGan: string): string {
  return ganElement[dayGan];
}

// 评分规则：判断两干是否同五行
function isSameElement(g1: string, g2: string): boolean {
  return ganElement[g1] === ganElement[g2];
}

// 评分规则：判断是否为帮扶
function isHelper(dayGan: string, otherGan: string): boolean {
  const dayEle = ganElement[dayGan];
  const otherEle = ganElement[otherGan];
  return (
    otherEle === dayEle || otherEle === generating[dayEle] // 生我者
  );
}

// 评分规则：判断地支是否有根
function hasRoot(dayGan: string, branch: string): boolean {
  const dayEle = ganElement[dayGan];
  return branchHiddenStems[branch].some((stem) => ganElement[stem] === dayEle);
}

// 八字强弱评分判定
export function isStrongBazi(bazi: Bazi): boolean {
  const { dayGan, monthBranch, heavenlyStems, earthlyBranches } = bazi;
  let score = 0;

  // 1. 得令：月令藏干中是否含有同类五行（权重3）
  if (hasRoot(dayGan, monthBranch)) {
    score += 3;
  }

  // 2. 得地：其他地支藏干是否有日主同类（每个地支+1分）
  for (const branch of earthlyBranches) {
    if (hasRoot(dayGan, branch)) {
      score += 1;
    }
  }

  // 3. 得势：天干中透出日主或生我五行（每个+1分）
  for (const gan of heavenlyStems) {
    if (isHelper(dayGan, gan)) {
      score += 1;
    }
  }

  // 判定阈值：6分及以上为"身强"，否则"身弱"
  return score >= 6;
}

// 喜用神/忌神推导
export function determineYongJi(
  dayGan: string,
  shenqiang: boolean
): {
  yongShen: string[];
  jiShen: string[];
} {
  const me = ganElement[dayGan];

  if (shenqiang) {
    // 身强 → 喜克我/泄我（官杀、财、食伤）
    return {
      yongShen: [overcoming[me], generated[me]], // 官杀 + 食伤
      jiShen: [me, generating[me]], // 比劫 + 印
    };
  } else {
    // 身弱 → 喜帮我/生我（印、比劫）
    return {
      yongShen: [me, generating[me]], // 比劫 + 印
      jiShen: [overcoming[me], generated[me]], // 官杀 + 食伤
    };
  }
}

// 十神映射表
const shiShenMap: Record<string, Record<string, string>> = {
  甲: {
    甲: "比肩",
    乙: "劫财",
    丙: "食神",
    丁: "伤官",
    戊: "偏财",
    己: "正财",
    庚: "七杀",
    辛: "正官",
    壬: "偏印",
    癸: "正印",
  },
  乙: {
    甲: "劫财",
    乙: "比肩",
    丙: "伤官",
    丁: "食神",
    戊: "正财",
    己: "偏财",
    庚: "正官",
    辛: "七杀",
    壬: "正印",
    癸: "偏印",
  },
  丙: {
    甲: "偏印",
    乙: "正印",
    丙: "比肩",
    丁: "劫财",
    戊: "食神",
    己: "伤官",
    庚: "偏财",
    辛: "正财",
    壬: "七杀",
    癸: "正官",
  },
  丁: {
    甲: "正印",
    乙: "偏印",
    丙: "劫财",
    丁: "比肩",
    戊: "伤官",
    己: "食神",
    庚: "正财",
    辛: "偏财",
    壬: "正官",
    癸: "七杀",
  },
  戊: {
    甲: "七杀",
    乙: "正官",
    丙: "偏印",
    丁: "正印",
    戊: "比肩",
    己: "劫财",
    庚: "食神",
    辛: "伤官",
    壬: "偏财",
    癸: "正财",
  },
  己: {
    甲: "正官",
    乙: "七杀",
    丙: "正印",
    丁: "偏印",
    戊: "劫财",
    己: "比肩",
    庚: "伤官",
    辛: "食神",
    壬: "正财",
    癸: "偏财",
  },
  庚: {
    甲: "偏财",
    乙: "正财",
    丙: "七杀",
    丁: "正官",
    戊: "偏印",
    己: "正印",
    庚: "比肩",
    辛: "劫财",
    壬: "食神",
    癸: "伤官",
  },
  辛: {
    甲: "正财",
    乙: "偏财",
    丙: "正官",
    丁: "七杀",
    戊: "正印",
    己: "偏印",
    庚: "劫财",
    辛: "比肩",
    壬: "伤官",
    癸: "食神",
  },
  壬: {
    甲: "食神",
    乙: "伤官",
    丙: "偏财",
    丁: "正财",
    戊: "七杀",
    己: "正官",
    庚: "偏印",
    辛: "正印",
    壬: "比肩",
    癸: "劫财",
  },
  癸: {
    甲: "伤官",
    乙: "食神",
    丙: "正财",
    丁: "偏财",
    戊: "正官",
    己: "七杀",
    庚: "正印",
    辛: "偏印",
    壬: "劫财",
    癸: "比肩",
  },
};

// 获取十神
export function getShiShen(dayGan: string, otherGan: string): string {
  return shiShenMap[dayGan][otherGan] || "未知";
}

// 完整八字分析
export function analyzeBazi(bazi: Bazi): {
  shenqiang: boolean;
  yongShen: string[];
  jiShen: string[];
  score: number;
  detailedAnalysis: string;
  shiShenList: string[];
} {
  const { dayGan, monthBranch, heavenlyStems, earthlyBranches } = bazi;
  let score = 0;
  let detailedScore = [];

  // 1. 得令：月令藏干中是否含有同类五行（权重3）
  if (hasRoot(dayGan, monthBranch)) {
    score += 3;
    detailedScore.push("月令得地+3");
  }

  // 2. 得地：其他地支藏干是否有日主同类（每个地支+1分）
  for (const branch of earthlyBranches) {
    if (hasRoot(dayGan, branch)) {
      score += 1;
      detailedScore.push(`${branch}支藏同类+1`);
    }
  }

  // 3. 得势：天干中透出日主或生我五行（每个+1分）
  for (const gan of heavenlyStems) {
    if (isHelper(dayGan, gan)) {
      score += 1;
      detailedScore.push(`${gan}干帮扶+1`);
    }
  }

  // 身强身弱判定
  const shenqiang = score >= 6;

  // 喜忌神推导
  const { yongShen, jiShen } = determineYongJi(dayGan, shenqiang);

  // 生成十神列表
  const shiShenList = heavenlyStems.map((gan) => getShiShen(dayGan, gan));

  // 详细分析
  const detailedAnalysis = `
      日主：${dayGan}${ganElement[dayGan]}
      总分：${score}分（${shenqiang ? "身强" : "身弱"}）
      评分详情：${detailedScore.join("，")}
      喜用神：${yongShen.join("、")}
      忌神：${jiShen.join("、")}
    `.trim();

  return {
    shenqiang,
    yongShen,
    jiShen,
    score,
    detailedAnalysis,
    shiShenList,
  };
}

// 转换从八字字符串到Bazi对象
export function parseBazi(baziString: string): Bazi {
  const columns = baziString.split(" ");
  if (columns.length !== 4) {
    throw new Error("八字格式错误，应为'年柱 月柱 日柱 时柱'");
  }

  const heavenlyStems = columns.map((col) => col[0]);
  const earthlyBranches = columns.map((col) => col[1]);

  return {
    dayGan: heavenlyStems[2],
    monthBranch: earthlyBranches[1],
    heavenlyStems,
    earthlyBranches,
  };
}

// 使用示例
// const baziString = "乙巳 丙午 壬申 戊子";
// const bazi = parseBazi(baziString);
// const analysis = analyzeBazi(bazi);
// console.log(analysis);
