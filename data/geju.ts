// 格局基础数据
export const gejuData = {
  正官格: {
    name: "正官格",
    category: "正格",
    condition: "官星清透，不见七杀",
    suitableDayMaster: ["阳日干"],
    yongshenDirection: ["印绶", "比劫"],
    description: "贵格，怕伤官",
    detailedCondition: "月令本气为正官，或月干透出正官，且不见七杀混杂",
    characteristics: {
      positive: ["贵气十足", "名声显赫", "事业有成", "品德高尚"],
      negative: ["过于保守", "缺乏变通", "怕伤官破格"],
    },
    yongshen: {
      primary: "印绶",
      secondary: "比劫",
      reason: "印绶护官，比劫帮身",
    },
    jishen: ["伤官", "食神"],
    example: {
      bazi: "甲子 丙寅 戊午 癸亥",
      analysis: "戊土生于寅月，月令藏甲木正官，甲木透于年干，构成正官格。用神取丙火印绶生身护官。",
    },
    color: "#1d4ed8",
    icon: "👑",
  },
  七杀格: {
    name: "七杀格",
    category: "正格",
    condition: "杀星得地，有印制杀",
    suitableDayMaster: ["阴日干"],
    yongshenDirection: ["印绶", "食伤"],
    description: "杀印相生为贵",
    detailedCondition: "月令本气为七杀，或月干透出七杀，且有印绶制杀或食伤制杀",
    characteristics: {
      positive: ["权威性强", "执行力佳", "能承受压力", "有领导才能"],
      negative: ["性格急躁", "容易树敌", "压力较大"],
    },
    yongshen: {
      primary: "印绶",
      secondary: "食伤",
      reason: "印绶化杀生身，食伤制杀护身",
    },
    jishen: ["财星"],
    example: {
      bazi: "乙酉 戊子 己巳 庚午",
      analysis: "己土生于子月，月令藏癸水七杀，构成七杀格。用神取戊土印绶化杀生身。",
    },
    color: "#dc2626",
    icon: "⚔️",
  },
  正财格: {
    name: "正财格",
    category: "正格",
    condition: "财星清透，身强财旺",
    suitableDayMaster: ["身强日干"],
    yongshenDirection: ["官杀", "食伤"],
    description: "财旺生官，富贵双全",
    detailedCondition: "月令本气为正财，或月干透出正财，且日主身强能胜财",
    characteristics: {
      positive: ["财运亨通", "理财有方", "家庭和睦", "事业稳定"],
      negative: ["过于保守", "缺乏冒险精神", "怕比劫夺财"],
    },
    yongshen: {
      primary: "官杀",
      secondary: "食伤",
      reason: "官杀护财，食伤生财",
    },
    jishen: ["比劫"],
    example: {
      bazi: "庚申 戊子 甲寅 乙亥",
      analysis: "甲木生于子月，月令藏癸水，年干庚金正财透出，构成正财格。身强财旺，用神取戊土官星护财。",
    },
    color: "#059669",
    icon: "💰",
  },
  偏财格: {
    name: "偏财格",
    category: "正格",
    condition: "偏财透干，身强财旺",
    suitableDayMaster: ["身强日干"],
    yongshenDirection: ["官杀", "食伤"],
    description: "偏财生官，富而且贵",
    detailedCondition: "月令本气为偏财，或月干透出偏财，且日主身强能胜财",
    characteristics: {
      positive: ["财源广进", "投资眼光", "异性缘佳", "机会敏感"],
      negative: ["财来财去", "感情复杂", "投机心重"],
    },
    yongshen: {
      primary: "官杀",
      secondary: "食伤",
      reason: "官杀护财，食伤生财",
    },
    jishen: ["比劫"],
    example: {
      bazi: "辛酉 庚子 乙卯 丁亥",
      analysis: "乙木生于子月，年干辛金偏财透出，构成偏财格。用神取庚金官星护财。",
    },
    color: "#8b5cf6",
    icon: "💎",
  },
  食神格: {
    name: "食神格",
    category: "正格",
    condition: "食神透干，身强食旺",
    suitableDayMaster: ["身强日干"],
    yongshenDirection: ["财星", "比劫"],
    description: "食神生财，衣食无忧",
    detailedCondition: "月令本气为食神，或月干透出食神，且日主身强能生食神",
    characteristics: {
      positive: ["才华横溢", "口才出众", "享受生活", "子女缘佳"],
      negative: ["过于享乐", "缺乏进取", "怕偏印夺食"],
    },
    yongshen: {
      primary: "财星",
      secondary: "比劫",
      reason: "财星泄食神秀气，比劫帮身生食",
    },
    jishen: ["偏印"],
    example: {
      bazi: "甲午 丙寅 甲子 丙寅",
      analysis: "甲木生于寅月，月干丙火食神透出，构成食神格。用神取财星泄食神秀气。",
    },
    color: "#10b981",
    icon: "🎨",
  },
  伤官格: {
    name: "伤官格",
    category: "正格",
    condition: "伤官透干，配印或财",
    suitableDayMaster: ["身强日干"],
    yongshenDirection: ["印绶", "财星"],
    description: "伤官配印，聪明贵显",
    detailedCondition: "月令本气为伤官，或月干透出伤官，需要印绶制伤或财星泄伤",
    characteristics: {
      positive: ["聪明机智", "创新能力", "技术天赋", "艺术才华"],
      negative: ["叛逆不羁", "情绪不稳", "容易得罪人", "克夫克子"],
    },
    yongshen: {
      primary: "印绶",
      secondary: "财星",
      reason: "印绶制伤护身，财星泄伤生官",
    },
    jishen: ["官杀"],
    example: {
      bazi: "乙未 丁亥 甲申 丙寅",
      analysis: "甲木生于亥月，时干丁火伤官透出，构成伤官格。用神取印绶制伤。",
    },
    color: "#f59e0b",
    icon: "⚡",
  },
  正印格: {
    name: "正印格",
    category: "正格",
    condition: "印星透干，身弱印旺",
    suitableDayMaster: ["身弱日干"],
    yongshenDirection: ["官杀", "比劫"],
    description: "印绶生身，学问名声",
    detailedCondition: "月令本气为正印，或月干透出正印，且日主身弱需要印绶生身",
    characteristics: {
      positive: ["学习能力强", "有名誉", "受人保护", "慈爱心重"],
      negative: ["依赖性强", "缺乏主见", "怕财星坏印"],
    },
    yongshen: {
      primary: "官杀",
      secondary: "比劫",
      reason: "官杀生印，比劫帮身",
    },
    jishen: ["财星"],
    example: {
      bazi: "癸亥 甲子 丙申 己亥",
      analysis: "丙火生于子月，月干甲木正印透出，构成正印格。用神取官杀生印。",
    },
    color: "#16a34a",
    icon: "📚",
  },
  偏印格: {
    name: "偏印格",
    category: "正格",
    condition: "偏印透干，配食制印",
    suitableDayMaster: ["身弱日干"],
    yongshenDirection: ["官杀", "食神"],
    description: "偏印夺食，需要制化",
    detailedCondition: "月令本气为偏印，或月干透出偏印，需要食神制印或官杀生印",
    characteristics: {
      positive: ["直觉敏锐", "有神秘感", "学习能力强", "独特见解"],
      negative: ["孤独感重", "思维偏激", "不合群", "克子女"],
    },
    yongshen: {
      primary: "食神",
      secondary: "官杀",
      reason: "食神制印，官杀生印",
    },
    jishen: ["比劫"],
    example: {
      bazi: "壬申 癸丑 戊午 甲寅",
      analysis: "戊土生于丑月，月干癸水偏印透出，构成偏印格。用神取甲木食神制印。",
    },
    color: "#7c3aed",
    icon: "🔮",
  },
}

// 特殊格局 - 完整数据结构
export const specialGejuData = {
  从财格: {
    name: "从财格",
    category: "从格",
    condition: "身极弱，财星极旺，全局财星当令",
    suitableDayMaster: ["身极弱日干"],
    yongshenDirection: ["财星", "食伤"],
    description: "从财而不抗，富贵可期",
    detailedCondition: "日主极弱无根，财星极旺得令，全局不见比劫印绶，或虽见而被制化",
    characteristics: {
      positive: ["财运极佳", "善于经营", "富贵双全", "眼光独到"],
      negative: ["身体较弱", "压力较大", "怕比劫运", "易因财生灾"],
    },
    yongshen: {
      primary: "财星",
      secondary: "食伤",
      reason: "顺从财星之势，食伤生财助势",
    },
    jishen: ["比劫", "印绶"],
    example: {
      bazi: "戊申 甲子 乙巳 丁亥",
      analysis: "乙木生于子月，财星当令，日主无根极弱，全局财星包围，构成从财格。用神取财星和食伤。",
    },
    color: "#f97316",
    icon: "💸",
    formation: {
      key: "身极弱财极旺",
      avoid: "比劫印绶来助身",
      enhance: "食伤生财，官杀护财",
    },
  },
  从杀格: {
    name: "从杀格",
    category: "从格",
    condition: "身极弱，杀星极旺，全局杀星当令",
    suitableDayMaster: ["身极弱日干"],
    yongshenDirection: ["七杀", "财星"],
    description: "从杀不抗，权贵可得",
    detailedCondition: "日主极弱无根，七杀极旺得令，全局不见比劫印绶，或虽见而被制化",
    characteristics: {
      positive: ["权威性强", "执行力佳", "能成大事", "有领导才能"],
      negative: ["压力极大", "身体不佳", "怕食伤制杀", "易遭小人"],
    },
    yongshen: {
      primary: "七杀",
      secondary: "财星",
      reason: "顺从杀星之势，财星生杀助威",
    },
    jishen: ["比劫", "印绶", "食伤"],
    example: {
      bazi: "庚申 戊子 甲午 丙寅",
      analysis: "甲木生于子月，杀星当令，日主无根极弱，全局杀星包围，构成从杀格。用神取杀星和财星。",
    },
    color: "#ef4444",
    icon: "🗡️",
    formation: {
      key: "身极弱杀极旺",
      avoid: "比劫印绶来助身，食伤制杀",
      enhance: "财星生杀，顺势而为",
    },
  },
  从儿格: {
    name: "从儿格",
    category: "从格",
    condition: "身极弱，食伤极旺，全局食伤当令",
    suitableDayMaster: ["身极弱日干"],
    yongshenDirection: ["食伤", "财星"],
    description: "从儿不抗，才华横溢",
    detailedCondition: "日主极弱无根，食伤极旺得令，全局不见比劫印绶，或虽见而被制化",
    characteristics: {
      positive: ["才华出众", "艺术天赋", "口才极佳", "享受人生"],
      negative: ["体质较弱", "缺乏毅力", "怕印绶夺食", "子女缘薄"],
    },
    yongshen: {
      primary: "食伤",
      secondary: "财星",
      reason: "顺从食伤之势，财星泄食伤秀气",
    },
    jishen: ["比劫", "印绶"],
    example: {
      bazi: "甲午 丙寅 戊申 癸亥",
      analysis: "戊土生于寅月，食伤当令，日主无根极弱，全局食伤包围，构成从儿格。用神取食伤和财星。",
    },
    color: "#06b6d4",
    icon: "🎭",
    formation: {
      key: "身极弱食伤极旺",
      avoid: "比劫印绶来助身",
      enhance: "财星泄秀，顺势而为",
    },
  },
}

// 专业术语解释
export const terminology = {
  清透: "天干透出，不被其他干支冲克合化",
  得地: "在地支中有根，力量强旺",
  印制杀: "用印绶化解七杀的克身之力",
  伤官佩印: "用印绶制伤官，化解伤官的负面作用",
  食神制杀: "用食神克制七杀，减轻杀星的压力",
  财星护官: "财星生官星，增强官星的力量",
  比劫夺财: "比肩劫财克制财星，破坏财格",
  偏印夺食: "偏印克制食神，破坏食神格",
  从财而不抗: "日主极弱，顺从财星之势，不与之对抗",
  从杀不抗: "日主极弱，顺从杀星之势，不与之对抗",
  从儿不抗: "日主极弱，顺从食伤之势，不与之对抗",
}

// 五行流通数据
export const wuxingFlow = {
  生: {
    木: { target: "火", color: "#10b981", description: "木生火，文明之象" },
    火: { target: "土", color: "#ef4444", description: "火生土，温厚包容" },
    土: { target: "金", color: "#f59e0b", description: "土生金，收敛肃杀" },
    金: { target: "水", color: "#6b7280", description: "金生水，智慧流动" },
    水: { target: "木", color: "#3b82f6", description: "水生木，生发条达" },
  },
  克: {
    木: { target: "土", color: "#10b981", description: "木克土，疏通阻滞" },
    火: { target: "金", color: "#ef4444", description: "火克金，炼化精纯" },
    土: { target: "水", color: "#f59e0b", description: "土克水，止水归库" },
    金: { target: "木", color: "#6b7280", description: "金克木，修剪成材" },
    水: { target: "火", color: "#3b82f6", description: "水克火，调节过旺" },
  },
}
