// 十神基础数据
export const shishenData = {
  比肩: {
    name: "比肩",
    category: "同我",
    yinyang: "同性",
    wuxingRelation: "同五行",
    essence: "自我镜像",
    description: "代表自我、同辈竞争、独立精神",
    keywords: ["自我", "独立", "兄弟", "平等", "竞争", "自立"],
    color: "#3b82f6",
    icon: "👥",
    characteristics: {
      positive: ["独立自主", "自力更生", "意志坚定", "不依赖他人"],
      negative: ["固执己见", "不善合作", "孤立无援", "缺乏变通"],
    },
    lifeAspects: {
      personality: "性格独立，有主见，不轻易妥协",
      career: "适合独立创业，不喜欢受人管束",
      relationship: "重视平等关系，不喜欢依附他人",
      wealth: "靠自己努力赚钱，不善于合作理财",
    },
    genderDifference: {
      male: {
        meaning: "兄弟、朋友、同事、竞争对手",
        influence: "影响事业发展和人际关系",
      },
      female: {
        meaning: "姐妹、闺蜜、同性朋友、竞争者",
        influence: "影响社交圈子和自我认知",
      },
    },
  },
  劫财: {
    name: "劫财",
    category: "同我",
    yinyang: "异性",
    wuxingRelation: "同五行",
    essence: "财富劫夺",
    description: "代表破财、合作、异性兄弟姐妹",
    keywords: ["破财", "合作", "异性", "兄弟", "投资", "风险"],
    color: "#ef4444",
    icon: "💰",
    characteristics: {
      positive: ["善于合作", "敢于冒险", "投资眼光", "人缘较好"],
      negative: ["容易破财", "投资失利", "被人拖累", "财来财去"],
    },
    lifeAspects: {
      personality: "性格外向，善于交际，但容易冲动",
      career: "适合合作事业，但需注意财务风险",
      relationship: "异性缘较好，但容易因财产产生纠纷",
      wealth: "财运起伏较大，容易因他人而破财",
    },
    genderDifference: {
      male: {
        meaning: "异性兄弟、合作伙伴、投资对象",
        influence: "影响财运和合作关系",
      },
      female: {
        meaning: "异性姐妹、合作伙伴、财务顾问",
        influence: "影响理财观念和投资决策",
      },
    },
  },
  食神: {
    name: "食神",
    category: "我生",
    yinyang: "同性",
    wuxingRelation: "我生之物",
    essence: "才华展现",
    description: "代表才华、口才、子女、享受",
    keywords: ["才华", "口才", "子女", "享受", "艺术", "表达"],
    color: "#10b981",
    icon: "🎨",
    characteristics: {
      positive: ["才华横溢", "口才出众", "享受生活", "有艺术天赋"],
      negative: ["过于享乐", "缺乏进取", "好逸恶劳", "挥霍无度"],
    },
    lifeAspects: {
      personality: "性格温和，有艺术气质，善于表达",
      career: "适合文艺、教育、餐饮等行业",
      relationship: "人缘好，善于沟通，容易获得他人喜爱",
      wealth: "通过才华和技能获得财富",
    },
    genderDifference: {
      male: {
        meaning: "儿子、学生、下属、才华展现",
        influence: "影响子女运和才华发挥",
      },
      female: {
        meaning: "女儿、学生、才艺、口才表达",
        influence: "影响子女缘分和艺术天赋",
      },
    },
  },
  伤官: {
    name: "伤官",
    category: "我生",
    yinyang: "异性",
    wuxingRelation: "我生之物",
    essence: "叛逆创新",
    description: "代表叛逆、创新、技术、变化",
    keywords: ["叛逆", "创新", "技术", "变化", "聪明", "不安"],
    color: "#f59e0b",
    icon: "⚡",
    characteristics: {
      positive: ["聪明机智", "创新能力", "技术天赋", "敢于突破"],
      negative: ["叛逆不羁", "情绪不稳", "容易得罪人", "变化无常"],
    },
    lifeAspects: {
      personality: "聪明但叛逆，有创新精神但情绪化",
      career: "适合技术、创新、艺术等需要突破的行业",
      relationship: "容易与权威产生冲突，人际关系复杂",
      wealth: "通过技术和创新获得财富，但不稳定",
    },
    genderDifference: {
      male: {
        meaning: "女儿、技术、创新、叛逆精神",
        influence: "影响创新能力和与权威的关系",
      },
      female: {
        meaning: "儿子、技术才能、叛逆性格",
        influence: "影响子女教育和个人发展",
      },
    },
  },
  偏财: {
    name: "偏财",
    category: "我克",
    yinyang: "同性",
    wuxingRelation: "我克之物",
    essence: "意外之财",
    description: "代表意外财、投资、父亲、异性缘",
    keywords: ["意外财", "投资", "父亲", "异性缘", "机遇", "灵活"],
    color: "#8b5cf6",
    icon: "💎",
    characteristics: {
      positive: ["财运较好", "投资眼光", "异性缘佳", "机会敏感"],
      negative: ["财来财去", "投机心重", "感情复杂", "不够专一"],
    },
    lifeAspects: {
      personality: "性格灵活，善于抓住机会，但不够专一",
      career: "适合投资、贸易、服务等灵活性强的行业",
      relationship: "异性缘好，但容易感情复杂",
      wealth: "偏财运较好，但需要把握时机",
    },
    genderDifference: {
      male: {
        meaning: "父亲、情人、投资、偏财运",
        influence: "影响财运和感情生活",
      },
      female: {
        meaning: "父亲、异性朋友、投资机会",
        influence: "影响理财观念和异性关系",
      },
    },
  },
  正财: {
    name: "正财",
    category: "我克",
    yinyang: "异性",
    wuxingRelation: "我克之物",
    essence: "正当收入",
    description: "代表正当收入、妻子、稳定财源",
    keywords: ["正当收入", "妻子", "稳定", "财源", "勤劳", "节俭"],
    color: "#059669",
    icon: "💰",
    characteristics: {
      positive: ["财运稳定", "勤劳节俭", "理财有方", "家庭责任感"],
      negative: ["过于保守", "缺乏冒险", "固守成规", "发展缓慢"],
    },
    lifeAspects: {
      personality: "性格稳重，有责任感，重视家庭",
      career: "适合稳定的工作，通过勤劳获得成功",
      relationship: "重视家庭，对配偶忠诚",
      wealth: "财运稳定，通过正当途径获得财富",
    },
    genderDifference: {
      male: {
        meaning: "妻子、正当收入、稳定财源",
        influence: "影响婚姻和财运稳定性",
      },
      female: {
        meaning: "理财能力、稳定收入、家庭财务",
        influence: "影响家庭理财和经济稳定",
      },
    },
  },
  七杀: {
    name: "七杀",
    category: "克我",
    yinyang: "同性",
    wuxingRelation: "克我之物",
    essence: "权威压力",
    description: "代表权威、压力、小人、挑战",
    keywords: ["权威", "压力", "小人", "挑战", "竞争", "危机"],
    color: "#dc2626",
    icon: "⚔️",
    characteristics: {
      positive: ["有权威性", "能承受压力", "竞争力强", "危机意识"],
      negative: ["压力过大", "容易树敌", "性格急躁", "健康问题"],
    },
    lifeAspects: {
      personality: "性��刚强，有领导力，但容易与人冲突",
      career: "适合需要权威和竞争的行业",
      relationship: "容易与同性产生竞争和冲突",
      wealth: "通过竞争和挑战获得成功",
    },
    genderDifference: {
      male: {
        meaning: "竞争对手、上司、权威人物",
        influence: "影响事业发展和权力斗争",
      },
      female: {
        meaning: "情人、上司、权威压力",
        influence: "影响感情选择和职场发展",
      },
    },
  },
  正官: {
    name: "正官",
    category: "克我",
    yinyang: "异性",
    wuxingRelation: "克我之物",
    essence: "正当权威",
    description: "代表官职、丈夫、名声、责任",
    keywords: ["官职", "丈夫", "名声", "责任", "规范", "稳重"],
    color: "#1d4ed8",
    icon: "👑",
    characteristics: {
      positive: ["有责任感", "遵纪守法", "名声较好", "稳重可靠"],
      negative: ["过于保守", "缺乏创新", "压力较大", "束缚较多"],
    },
    lifeAspects: {
      personality: "性格稳重，有责任感，重视名声",
      career: "适合公职或需要权威的正当职业",
      relationship: "重视婚姻和家庭责任",
      wealth: "通过正当途径获得稳定收入",
    },
    genderDifference: {
      male: {
        meaning: "官职、上司、社会地位",
        influence: "影响事业发展和社会声望",
      },
      female: {
        meaning: "丈夫、官职、社会地位",
        influence: "影响婚姻质量和社会地位",
      },
    },
  },
  偏印: {
    name: "偏印",
    category: "生我",
    yinyang: "同性",
    wuxingRelation: "生我之物",
    essence: "非正统学习",
    description: "代表偏门学问、继母、宗教、直觉",
    keywords: ["偏门学问", "继母", "宗教", "直觉", "神秘", "孤独"],
    color: "#7c3aed",
    icon: "🔮",
    characteristics: {
      positive: ["直觉敏锐", "有神秘感", "学习能力强", "独特见解"],
      negative: ["孤独感重", "思维偏激", "不合群", "健康问题"],
    },
    lifeAspects: {
      personality: "性格内向，有神秘感，思维独特",
      career: "适合研究、宗教、艺术等偏门行业",
      relationship: "人际关系较为复杂，容易孤独",
      wealth: "通过特殊技能或知识获得收入",
    },
    genderDifference: {
      male: {
        meaning: "继母、偏门学问、宗教信仰",
        influence: "影响学习方向和精神追求",
      },
      female: {
        meaning: "继母、神秘学问、直觉能力",
        influence: "影响直觉判断和精神世界",
      },
    },
  },
  正印: {
    name: "正印",
    category: "生我",
    yinyang: "异性",
    wuxingRelation: "生我之物",
    essence: "正统教育",
    description: "代表母亲、学问、名誉、保护",
    keywords: ["母亲", "学问", "名誉", "保护", "教育", "慈爱"],
    color: "#16a34a",
    icon: "📚",
    characteristics: {
      positive: ["学习能力强", "有名誉", "受人保护", "慈爱心重"],
      negative: ["依赖性强", "缺乏主见", "过于保守", "发展缓慢"],
    },
    lifeAspects: {
      personality: "性格温和，有学者气质，重视名誉",
      career: "适合教育、文化、学术等正统行业",
      relationship: "重视亲情，容易获得长辈关爱",
      wealth: "通过学问和名誉获得稳定收入",
    },
    genderDifference: {
      male: {
        meaning: "母亲、学问、名誉、保护者",
        influence: "影响学业发展和社会声望",
      },
      female: {
        meaning: "母亲、学问、教育、慈爱",
        influence: "影响教育观念和母性表现",
      },
    },
  },
}

// 十神分类
export const shishenCategories = {
  同我: ["比肩", "劫财"],
  我生: ["食神", "伤官"],
  我克: ["偏财", "正财"],
  克我: ["七杀", "正官"],
  生我: ["偏印", "正印"],
}

// 搜索关键词映射
export const searchKeywords = {
  口才: ["食神", "伤官"],
  子女: ["食神", "伤官"],
  财运: ["偏财", "正财", "劫财"],
  事业: ["正官", "七杀"],
  学习: ["正印", "偏印"],
  婚姻: ["正官", "正财", "七杀", "偏财"],
  母亲: ["正印"],
  父亲: ["偏财"],
  兄弟: ["比肩", "劫财"],
  竞争: ["比肩", "七杀"],
  创新: ["伤官"],
  权威: ["正官", "七杀"],
  艺术: ["食神", "伤官"],
  投资: ["偏财", "劫财"],
}
