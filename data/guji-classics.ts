// 古籍经典数据

// 经典古籍文本数据
export const classicTexts = {
  "三命通会": {
    name: "三命通会",
    author: "万民英",
    description: "明代命理学集大成之作",
    chapters: ["论五行", "论十神", "论格局", "论大运"],
  },
  "滴天髓": {
    name: "滴天髓",
    author: "京图",
    description: "命理学经典，格局精髓",
    chapters: ["天道", "地道", "人道", "知命"],
  },
  "穷通宝鉴": {
    name: "穷通宝鉴",
    author: "余春台",
    description: "调候用神专著",
    chapters: ["春月", "夏月", "秋月", "冬月"],
  },
  "子平真诠": {
    name: "子平真诠",
    author: "沈孝瞻",
    description: "子平命理正宗理论",
    chapters: ["论十神", "论格局", "论用神", "论行运"],
  },
  "五行精纪": {
    name: "五行精纪",
    author: "廖中",
    description: "五行理论专著",
    chapters: ["五行生克", "干支配合", "纳音论命"],
  }
}

// 术语映射数据
export const termMappings = {
  "伤官见官": {
    modern: "十神冲克结构破格",
    explanation: "伤官与官星同现，主是非、官灾",
    modernExplanation: "伤官克制正官，破坏格局清纯，容易引起权威冲突和法律纠纷",
    category: "十神类",
    relatedTerms: ["伤官配印", "官杀混杂", "食神制杀"],
    sources: [
      {
        book: "滴天髓",
        quote: "伤官见官，为祸百端"
      }
    ],
    examples: [
      {
        bazi: "壬子 庚午 辛酉 乙卯",
        analysis: "辛金日主，庚为伤官，乙为正官透出，伤官见官，虽身强但易有官司是非"
      }
    ]
  },
  "财多身弱": {
    modern: "日主不敌财星，需印助或从财",
    explanation: "身弱而财旺，主破耗",
    modernExplanation: "日主力量不足以驾驭财星，容易因财致祸，需要印绶生身或从财格",
    category: "格局类",
    relatedTerms: ["身强财旺", "从财格", "印绶护身"],
    sources: [
      {
        book: "三命通会",
        quote: "财多身弱，富屋贫人"
      }
    ],
    examples: [
      {
        bazi: "甲子 丙子 戊午 癸亥",
        analysis: "戊土日主，水旺财多，身弱不胜财，易因财生灾，需要火土帮身"
      }
    ]
  },
  "枭印夺食": {
    modern: "偏印制食神，需食神制印",
    explanation: "偏印克食神",
    modernExplanation: "偏印克制食神，影响才华发挥和子女运，需要食神有力或财星制印",
    category: "十神类",
    relatedTerms: ["食神制杀", "印绶生身", "偏印格"],
    sources: [
      {
        book: "子平真诠",
        quote: "枭神夺食，子息艰难"
      }
    ],
    examples: [
      {
        bazi: "甲寅 丙寅 戊午 壬子",
        analysis: "戊土日主，壬水偏印克制丙火食神，影响才华发挥，子女缘薄"
      }
    ]
  },
  "柱中见鬼": {
    modern: "七杀透干",
    explanation: "八字中见七杀",
    modernExplanation: "命局中七杀透出天干，需要制化得当，否则易有压力和小人",
    category: "十神类",
    relatedTerms: ["七杀格", "食神制杀", "印绶化杀"],
    sources: [
      {
        book: "三命通会",
        quote: "柱中见鬼，须要制伏"
      }
    ],
    examples: [
      {
        bazi: "乙酉 戊子 己巳 庚午",
        analysis: "己土日主，乙木七杀透出，需要庚金食神制杀或火土印绶化杀"
      }
    ]
  },
  "三刑相见": {
    modern: "地支三刑，主是非病灾",
    explanation: "丑未戌、寅巳申、子卯自刑结构",
    modernExplanation: "地支形成三刑格局，容易有法律纠纷、意外伤害和人际冲突",
    category: "神煞类",
    relatedTerms: ["六冲", "六害", "三合"],
    sources: [
      {
        book: "五行精纪",
        quote: "三刑相见，必主刑伤"
      }
    ],
    examples: [
      {
        bazi: "甲寅 丁巳 庚申 戊子",
        analysis: "寅巳申三刑，容易有意外伤害和法律纠纷，需要谨慎行事"
      }
    ]
  },
  "身强财旺": {
    modern: "日主有力能胜财，富贵可期",
    explanation: "身强能胜财，主富贵",
    modernExplanation: "日主力量强旺，能够驾驭财星，是富贵的基本条件之一",
    category: "格局类",
    relatedTerms: ["财多身弱", "正财格", "偏财格"],
    sources: [
      {
        book: "滴天髓",
        quote: "财旺生官，富贵双全"
      }
    ],
    examples: [
      {
        bazi: "庚申 戊子 甲寅 乙亥",
        analysis: "甲木日主得寅亥生助，身强能胜戊土财星，主富贵"
      }
    ]
  }
}

// 搜索古籍文本
export const searchClassicTexts = (keyword: string, bookFilter: string = "all") => {
  const results = []
  
  // 模拟搜索结果
  const searchData = [
    {
      book: "滴天髓",
      chapter: "论格局",
      originalText: "伤官见官，为祸百端。",
      modernExplanation: "八字中如果伤官透干，且官星也透出，无印星化解或食神调和，会导致权威冲突、易惹官司、性格刚烈易犯上。",
      modernTerms: ["十神冲克", "破格", "官司是非"],
      structureAnalysis: "此格为伤官克官，若日主强则可担，弱则反受害，构成伤官见官之破格。",
      example: {
        bazi: "壬子 庚午 辛酉 乙卯",
        analysis: "辛金日主，庚为伤官，乙为正官透出，庚乙并见，伤官见官，虽身强，但伤官旺盛克官，为破格。需大运调候。"
      },
      relatedTerms: ["伤官配印", "官杀混杂", "食神制杀"]
    },
    {
      book: "三命通会",
      chapter: "论十神",
      originalText: "若身轻，官杀混杂，而又逢伤官露出，则必主口舌是非。",
      modernExplanation: "如果日主身弱，命局中官星和七杀同时出现，再加上伤官透出，必然会有口舌是非和法律纠纷。",
      modernTerms: ["身弱", "官杀混杂", "伤官透干", "口舌是非"],
      structureAnalysis: "身弱不能胜官杀，官杀混杂本已不清，再见伤官克官，必然是非不断。",
      example: {
        bazi: "癸亥 甲子 乙卯 丁巳",
        analysis: "乙木日主身弱，癸水正官，甲木七杀，丁火伤官，官杀混杂又见伤官，主口舌是非。"
      },
      relatedTerms: ["身弱", "官杀混杂", "伤官见官"]
    },
    {
      book: "子平真诠",
      chapter: "论伤官",
      originalText: "伤官者，吐秀之神也，最怕官星同透。",
      modernExplanation: "伤官代表才华的展现，是吐露秀气的十神，但最怕与官星同时透出天干。",
      modernTerms: ["伤官", "吐秀", "才华展现", "官星"],
      structureAnalysis: "伤官主才华聪明，但与官星相克，同透则破格，需要印星化解。",
      example: {
        bazi: "甲午 丙寅 甲子 丙寅",
        analysis: "甲木日主，丙火伤官透出，若再见辛金正官，则伤官见官，需要印星化解。"
      },
      relatedTerms: ["伤官配印", "才华", "破格"]
    }
  ]
  
  // 根据关键词过滤
  return searchData.filter(item => {
    const matchesKeyword = keyword === "" || 
      item.originalText.includes(keyword) ||
      item.modernExplanation.includes(keyword) ||
      item.modernTerms.some(term => term.includes(keyword))
    
    const matchesBook = bookFilter === "all" || item.book === bookFilter
    
    return matchesKeyword && matchesBook
  })
}

// 获取术语映射
export const getTermMapping = (ancient: string) => {
  const mapping = termMappings[ancient as keyof typeof termMappings]
  if (!mapping) return null
  
  return {
    ancient,
    ...mapping
  }
}

// 经典条文分析数据
export const classicAnalyses = {
  "shangguanjianguan": {
    book: "滴天髓",
    chapter: "论格局",
    title: "伤官见官",
    originalText: "伤官见官，为祸百端。",
    modernExplanation: "八字中如果伤官透干，且官星也透出，无印星化解或食神调和，会导致权威冲突、易惹官司、性格刚烈易犯上。",
    modernTermExplanation: "这是典型的十神冲克破格现象。伤官代表叛逆和创新，正官代表权威和规范，两者相克会产生激烈冲突。",
    structure: {
      bazi: "壬子 庚午 辛酉 乙卯",
      shishen: ["偏印", "伤官", "日主", "正官"],
      keyElements: ["伤官庚金透出", "正官乙木透出", "伤官克正官"],
      problems: ["格局破损", "权威冲突", "易有官司"]
    },
    examples: [
      {
        title: "伤官见官破格例",
        bazi: "壬子 庚午 辛酉 乙卯",
        analysis: "辛金日主，庚金伤官透出，乙木正官透出，伤官见官，格局破损",
        demonstration: "体现了伤官见官为祸百端的古训"
      },
      {
        title: "伤官配印化解例",
        bazi: "壬子 庚午 辛酉 己卯",
        analysis: "同样伤官见官，但有己土印星化解，可以减轻破格之害",
        demonstration: "说明伤官见官需要印星化解的道理"
      }
    ],
    learningPoints: {
      understanding: [
        "理解伤官与正官的五行生克关系",
        "掌握破格的概念和危害",
        "认识印星化解的重要作用"
      ],
      application: [
        "遇到伤官见官格局要谨慎判断",
        "寻找化解方法如印星、食神等",
        "注意大运流年的影响变化"
      ]
    }
  },
  "caiduoshenjuo": {
    book: "三命通会",
    chapter: "论财格",
    title: "财多身弱",
    originalText: "财多身弱，富屋贫人。",
    modernExplanation: "财星过多而日主身弱，虽然有财但无力享用，反而会因财致祸，如富人家的穷亲戚。",
    modernTermExplanation: "这反映了命理中力量平衡的重要性。财星代表财富和欲望，日主代表自身能力，两者失衡必然出问题。",
    structure: {
      bazi: "甲子 丙子 戊午 癸亥",
      shishen: ["正财", "正财", "日主", "正财"],
      keyElements: ["财星过多", "日主身弱", "力量失衡"],
      problems: ["无力胜财", "易因财生灾", "需要帮身"]
    },
    examples: [
      {
        title: "财多身弱破财例",
        bazi: "甲子 丙子 戊午 癸亥",
        analysis: "戊土日主，水旺财多，身弱不胜财，易因财生灾",
        demonstration: "体现了财多身弱富屋贫人的道理"
      },
      {
        title: "印绶帮身化解例",
        bazi: "甲子 丙子 戊午 丁巳",
        analysis: "同样财多身弱，但有丁火印星帮身，可以化解",
        demonstration: "说明印绶生身的重要作用"
      }
    ],
    learningPoints: {
      understanding: [
        "理解身财平衡的重要性",
        "掌握富屋贫人的含义",
        "认识帮身的必要性"
      ],
      application: [
        "遇到财多身弱要寻找帮身之神",
        "可以考虑从财格的可能性",
        "注意大运对身财平衡的影响"
      ]
    }
  }
}

// 获取经典分析
export const getClassicAnalysis = (key: string) => {
  return classicAnalyses[key as keyof typeof classicAnalyses] || null
}