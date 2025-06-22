// 排盘进阶数据

// 藏干数据
export const cangganAdvancedData = {
  子: {
    zhi: "子",
    wuxing: "水",
    yinyang: "阳",
    canggan: [
      { gan: "癸", type: "本气", wuxing: "水", yinyang: "阴", strength: 100, shishen: "正印" }
    ],
    wuxingDistribution: [
      { wuxing: "水", percentage: 100 }
    ],
    yongshenAnalysis: "癸水为正印，生身助我，为用神"
  },
  丑: {
    zhi: "丑",
    wuxing: "土",
    yinyang: "阴",
    canggan: [
      { gan: "己", type: "本气", wuxing: "土", yinyang: "阴", strength: 60, shishen: "比肩" },
      { gan: "癸", type: "中气", wuxing: "水", yinyang: "阴", strength: 30, shishen: "正印" },
      { gan: "辛", type: "余气", wuxing: "金", yinyang: "阴", strength: 10, shishen: "正财" }
    ],
    wuxingDistribution: [
      { wuxing: "土", percentage: 60 },
      { wuxing: "水", percentage: 30 },
      { wuxing: "金", percentage: 10 }
    ],
    yongshenAnalysis: "己土为比肩，癸水为正印，辛金为正财，多元组合"
  },
  寅: {
    zhi: "寅",
    wuxing: "木",
    yinyang: "阳",
    canggan: [
      { gan: "甲", type: "本气", wuxing: "木", yinyang: "阳", strength: 60, shishen: "正官" },
      { gan: "丙", type: "中气", wuxing: "火", yinyang: "阳", strength: 30, shishen: "食神" },
      { gan: "戊", type: "余气", wuxing: "土", yinyang: "阳", strength: 10, shishen: "比肩" }
    ],
    wuxingDistribution: [
      { wuxing: "木", percentage: 60 },
      { wuxing: "火", percentage: 30 },
      { wuxing: "土", percentage: 10 }
    ],
    yongshenAnalysis: "甲木为正官，丙火为食神，戊土为比肩，官杀用神藏于此"
  },
  卯: {
    zhi: "卯",
    wuxing: "木",
    yinyang: "阴",
    canggan: [
      { gan: "乙", type: "本气", wuxing: "木", yinyang: "阴", strength: 100, shishen: "七杀" }
    ],
    wuxingDistribution: [
      { wuxing: "木", percentage: 100 }
    ],
    yongshenAnalysis: "乙木为七杀，克身之物，需要制化"
  },
  辰: {
    zhi: "辰",
    wuxing: "土",
    yinyang: "阳",
    canggan: [
      { gan: "戊", type: "本气", wuxing: "土", yinyang: "阳", strength: 60, shishen: "比肩" },
      { gan: "乙", type: "中气", wuxing: "木", yinyang: "阴", strength: 30, shishen: "七杀" },
      { gan: "癸", type: "余气", wuxing: "水", yinyang: "阴", strength: 10, shishen: "正印" }
    ],
    wuxingDistribution: [
      { wuxing: "土", percentage: 60 },
      { wuxing: "木", percentage: 30 },
      { wuxing: "水", percentage: 10 }
    ],
    yongshenAnalysis: "戊土为比肩，乙木为七杀，癸水为正印，复杂组合"
  },
  巳: {
    zhi: "巳",
    wuxing: "火",
    yinyang: "阴",
    canggan: [
      { gan: "丙", type: "本气", wuxing: "火", yinyang: "阳", strength: 60, shishen: "食神" },
      { gan: "戊", type: "中气", wuxing: "土", yinyang: "阳", strength: 30, shishen: "比肩" },
      { gan: "庚", type: "余气", wuxing: "金", yinyang: "阳", strength: 10, shishen: "偏财" }
    ],
    wuxingDistribution: [
      { wuxing: "火", percentage: 60 },
      { wuxing: "土", percentage: 30 },
      { wuxing: "金", percentage: 10 }
    ],
    yongshenAnalysis: "丙火为食神，戊土为比肩，庚金为偏财，食神用神藏于此"
  },
  午: {
    zhi: "午",
    wuxing: "火",
    yinyang: "阳",
    canggan: [
      { gan: "丁", type: "本气", wuxing: "火", yinyang: "阴", strength: 70, shishen: "伤官" },
      { gan: "己", type: "中气", wuxing: "土", yinyang: "阴", strength: 30, shishen: "劫财" }
    ],
    wuxingDistribution: [
      { wuxing: "火", percentage: 70 },
      { wuxing: "土", percentage: 30 }
    ],
    yongshenAnalysis: "丁火为伤官，己土为劫财，伤官用神藏于此"
  },
  未: {
    zhi: "未",
    wuxing: "土",
    yinyang: "阴",
    canggan: [
      { gan: "己", type: "本气", wuxing: "土", yinyang: "阴", strength: 60, shishen: "劫财" },
      { gan: "丁", type: "中气", wuxing: "火", yinyang: "阴", strength: 30, shishen: "伤官" },
      { gan: "乙", type: "余气", wuxing: "木", yinyang: "阴", strength: 10, shishen: "七杀" }
    ],
    wuxingDistribution: [
      { wuxing: "土", percentage: 60 },
      { wuxing: "火", percentage: 30 },
      { wuxing: "木", percentage: 10 }
    ],
    yongshenAnalysis: "己土为劫财，丁火为伤官，乙木为七杀，多元组合"
  },
  申: {
    zhi: "申",
    wuxing: "金",
    yinyang: "阳",
    canggan: [
      { gan: "庚", type: "本气", wuxing: "金", yinyang: "阳", strength: 60, shishen: "偏财" },
      { gan: "壬", type: "中气", wuxing: "水", yinyang: "阳", strength: 30, shishen: "偏印" },
      { gan: "戊", type: "余气", wuxing: "土", yinyang: "阳", strength: 10, shishen: "比肩" }
    ],
    wuxingDistribution: [
      { wuxing: "金", percentage: 60 },
      { wuxing: "水", percentage: 30 },
      { wuxing: "土", percentage: 10 }
    ],
    yongshenAnalysis: "庚金为偏财，壬水为偏印，戊土为比肩，财星用神藏于此"
  },
  酉: {
    zhi: "酉",
    wuxing: "金",
    yinyang: "阴",
    canggan: [
      { gan: "辛", type: "本气", wuxing: "金", yinyang: "阴", strength: 100, shishen: "正财" }
    ],
    wuxingDistribution: [
      { wuxing: "金", percentage: 100 }
    ],
    yongshenAnalysis: "辛金为正财，我克之物，为用神"
  },
  戌: {
    zhi: "戌",
    wuxing: "土",
    yinyang: "阳",
    canggan: [
      { gan: "戊", type: "本气", wuxing: "土", yinyang: "阳", strength: 60, shishen: "比肩" },
      { gan: "辛", type: "中气", wuxing: "金", yinyang: "阴", strength: 30, shishen: "正财" },
      { gan: "丁", type: "余气", wuxing: "火", yinyang: "阴", strength: 10, shishen: "伤官" }
    ],
    wuxingDistribution: [
      { wuxing: "土", percentage: 60 },
      { wuxing: "金", percentage: 30 },
      { wuxing: "火", percentage: 10 }
    ],
    yongshenAnalysis: "戊土为比肩，辛金为正财，丁火为伤官，多元组合"
  },
  亥: {
    zhi: "亥",
    wuxing: "水",
    yinyang: "阴",
    canggan: [
      { gan: "壬", type: "本气", wuxing: "水", yinyang: "阳", strength: 70, shishen: "偏印" },
      { gan: "甲", type: "中气", wuxing: "木", yinyang: "阳", strength: 30, shishen: "正官" }
    ],
    wuxingDistribution: [
      { wuxing: "水", percentage: 70 },
      { wuxing: "木", percentage: 30 }
    ],
    yongshenAnalysis: "壬水为偏印，甲木为正官，印星用神藏于此"
  }
}

// 副星数据
export const fuxingData = {
  天乙贵人: {
    name: "天乙贵人",
    category: "贵人类",
    judgment: "以日干查地支，如甲戊见丑未，乙己见子申等",
    effect: "主逢凶化吉，贵人扶助，化险为夷",
    symbolism: "贵人相助，逢凶化吉",
    icon: "👑",
    favorable: true,
    inChart: "命中有天乙贵人，主一生得贵人相助，逢凶化吉，遇难呈祥",
    positiveEffects: ["贵人扶助", "逢凶化吉", "名声好", "地位高"],
    negativeEffects: []
  },
  文昌星: {
    name: "文昌星",
    category: "文星类",
    judgment: "以日干查地支，如甲见巳，乙见午等",
    effect: "主聪明好学，利于考试文职",
    symbolism: "文曲星照，智慧开启",
    icon: "📚",
    favorable: true,
    inChart: "命中有文昌星，主聪明好学，文思敏捷，适合从事文化、教育、研究等工作",
    positiveEffects: ["聪明伶俐", "学业有成", "文职发展", "考试顺利"],
    negativeEffects: []
  },
  桃花: {
    name: "桃花",
    category: "桃花类",
    judgment: "以年支或日支查其他地支，如申子辰见酉，亥卯未见子等",
    effect: "主异性缘分，情感丰富，也主艺术才华",
    symbolism: "桃花朵朵，情缘绵绵",
    icon: "🌸",
    favorable: true,
    inChart: "命中有桃花星，主人缘好，异性缘佳，感情生活丰富多彩，也有艺术天赋",
    positiveEffects: ["异性缘佳", "人缘好", "艺术才华", "感情丰富"],
    negativeEffects: ["感情复杂", "易有桃花劫"],
    resolution: "注意把握分寸，不要过于沉迷感情，以免影响正常生活"
  },
  羊刃: {
    name: "羊刃",
    category: "凶煞类",
    judgment: "以日干查地支，如甲羊刃在卯，乙羊刃在寅等",
    effect: "主性格刚烈，易有血光之灾，但也主勇敢果断",
    symbolism: "利刃出鞘，刚烈无比",
    icon: "⚔️",
    favorable: false,
    inChart: "命中有羊刃，主性格刚烈，做事果断，但容易有意外伤害，需要谨慎行事",
    positiveEffects: ["勇敢果断", "执行力强"],
    negativeEffects: ["性格刚烈", "易有血光", "冲动行事"],
    resolution: "需要官杀制刃或印绶化刃，避免冲动行事，注意安全"
  },
  红鸾: {
    name: "红鸾",
    category: "桃花类",
    judgment: "以年支查其他地支，如卯年见戌，辰年见酉等",
    effect: "主婚姻喜庆，红鸾星动，姻缘将至",
    symbolism: "红鸾星动，喜事将临",
    icon: "💒",
    favorable: true,
    inChart: "命中有红鸾星，主婚姻喜庆，感情顺利，易有良缘",
    positiveEffects: ["婚姻喜庆", "姻缘将至", "感情顺利"],
    negativeEffects: []
  },
  华盖: {
    name: "华盖",
    category: "文星类",
    judgment: "以年支或日支查其他地支，如申子辰见辰，亥卯未见未等",
    effect: "主聪明好学，喜欢玄学宗教，有艺术天赋",
    symbolism: "华盖罩顶，超凡脱俗",
    icon: "🎭",
    favorable: true,
    inChart: "命中有华盖星，主聪明好学，思维独特，有艺术或宗教天赋，但也易孤芳自赏",
    positiveEffects: ["聪明好学", "艺术天赋", "玄学天分"],
    negativeEffects: ["孤芳自赏", "不合群"]
  }
}

// 三元九运数据
export const sanyuanData = {
  上元: {
    period: "第1-60年",
    characteristics: "上元主初始发展，充满活力和创新",
    stars: [
      { name: "一白", wuxing: "水", direction: "北方", years: "1-20年", description: "水行当令，智慧流通" },
      { name: "二黑", wuxing: "土", direction: "西南", years: "21-40年", description: "土行当令，稳重包容" },
      { name: "三碧", wuxing: "木", direction: "东方", years: "41-60年", description: "木行当令，生机勃发" }
    ],
    suitableAreas: ["科技创新", "教育研究", "文化传媒"],
    precautions: "注意平衡发展，不要过于激进"
  },
  中元: {
    period: "第61-120年",
    characteristics: "中元主稳定发展，注重平衡和协调",
    stars: [
      { name: "四绿", wuxing: "木", direction: "东南", years: "61-80年", description: "木行当令，稳步成长" },
      { name: "五黄", wuxing: "土", direction: "中央", years: "81-100年", description: "土行当令，中正平和" },
      { name: "六白", wuxing: "金", direction: "西北", years: "101-120年", description: "金行当令，收敛肃杀" }
    ],
    suitableAreas: ["金融地产", "制造业", "传统行业"],
    precautions: "避免保守停滞，需要适度创新"
  },
  下元: {
    period: "第121-180年",
    characteristics: "下元主转型变革，新旧交替",
    stars: [
      { name: "七赤", wuxing: "金", direction: "西方", years: "121-140年", description: "金行当令，锐意进取" },
      { name: "八白", wuxing: "土", direction: "东北", years: "141-160年", description: "土行当令，稳中求变" },
      { name: "九紫", wuxing: "火", direction: "南方", years: "161-180年", description: "火行当令，光明磊落" }
    ],
    suitableAreas: ["新兴产业", "创意设计", "国际贸易"],
    precautions: "变革中需谨慎，避免冒进"
  }
}

// 纳音五行数据
export const nayinData = {
  "海中金": {
    wuxing: "金",
    nature: "水中之金",
    characteristics: "柔和有韧性",
    symbolism: "如海中金银，柔和而有韧性",
    ganzhi: ["甲子", "乙丑"],
    personality: ["温和", "有韧性", "适应力强", "善于交际"],
    career: "适合金融、外交、服务业等需要灵活应变的行业",
    health: "体质较好，但易有肺部、呼吸系统问题",
    relationships: "人际关系良好，善于调和矛盾",
    examples: [
      { description: "海中金命例", bazi: "甲子 丙寅 戊午 癸亥" }
    ]
  },
  "炉中火": {
    wuxing: "火",
    nature: "内敛之火",
    characteristics: "内敛而有爆发力",
    symbolism: "如炉中之火，内敛而有爆发力",
    ganzhi: ["丙寅", "丁卯"],
    personality: ["内敛", "有爆发力", "创造力强", "热情"],
    career: "适合科研、技术、创意等需要专注和创新的行业",
    health: "体质偏热，易有心脏、血液循环问题",
    relationships: "人际关系较为内敛，但对亲近的人热情",
    examples: [
      { description: "炉中火命例", bazi: "丙寅 戊子 甲午 壬申" }
    ]
  },
  "大林木": {
    wuxing: "木",
    nature: "高大之木",
    characteristics: "高大挺拔，坚韧不拔",
    symbolism: "如大林之木，高大挺拔，坚韧不拔",
    ganzhi: ["戊辰", "己巳"],
    personality: ["坚韧", "有理想", "有抱负", "正直"],
    career: "适合教育、法律、管理等需要正直和坚持的行业",
    health: "体质较好，但易有肝胆问题",
    relationships: "为人正直，重视家庭和责任",
    examples: [
      { description: "大林木命例", bazi: "戊辰 甲申 丙子 庚午" }
    ]
  },
  "路旁土": {
    wuxing: "土",
    nature: "外露之土",
    characteristics: "外露而实用",
    symbolism: "如路旁之土，外露而实用",
    ganzhi: ["庚午", "辛未"],
    personality: ["实际", "务实", "勤劳", "稳重"],
    career: "适合建筑、农业、地产等实业行业",
    health: "体质偏弱，易有消化系统问题",
    relationships: "为人朴实，注重实际",
    examples: [
      { description: "路旁土命例", bazi: "庚午 丙申 壬子 甲寅" }
    ]
  },
  "剑锋金": {
    wuxing: "金",
    nature: "锐利之金",
    characteristics: "锐利而果断",
    symbolism: "如剑锋之金，锐利而果断",
    ganzhi: ["壬申", "癸酉"],
    personality: ["果断", "决断力强", "有锐气", "有进取心"],
    career: "适合军警、竞技、销售等需要决断力的行业",
    health: "体质较好，但易有肺部、皮肤问题",
    relationships: "为人直率，不善于表达感情",
    examples: [
      { description: "剑锋金命例", bazi: "壬申 戊子 丙午 甲寅" }
    ]
  }
}

// 四柱解构数据
export const sizhuData = {
  liuqinMeaning: {
    父母: {
      basic: "代表父母、长辈、上司、权威人物",
      relationship: "与日主为生我之物，如印星",
      positive: "得到长辈支持，事业有靠山",
      negative: "过于依赖他人，缺乏独立性",
      advice: "善用长辈资源，但也要培养独立能力"
    },
    兄弟: {
      basic: "代表兄弟姐妹、同事、朋友、竞争对手",
      relationship: "与日主为同类之物，如比劫",
      positive: "人缘好，合作顺利，团队精神强",
      negative: "竞争激烈，资源分散",
      advice: "注重团队合作，避免无谓竞争"
    },
    夫妻: {
      basic: "代表配偶、合作伙伴、亲密关系",
      relationship: "与日主为我克之物，如财星",
      positive: "婚姻和谐，合作共赢",
      negative: "感情复杂，财务纠纷",
      advice: "注重沟通和理解，建立互信关系"
    },
    子女: {
      basic: "代表子女、学生、下属、创意",
      relationship: "与日主为我生之物，如食伤",
      positive: "子女缘好，创意丰富，领导力强",
      negative: "管教不严，创意难以落地",
      advice: "平衡管理与自由，培养创造力"
    },
    财帛: {
      basic: "代表财富、物质、资源",
      relationship: "与日主为我克之物，如财星",
      positive: "财运亨通，物质丰富",
      negative: "财来财去，物质依赖",
      advice: "理性理财，不要过于物质化"
    }
  }
}

// 分析藏干结构
export const analyzeCangganStructure = (baziInput: any) => {
  // 简化分析，实际应该更复杂
  const dayMaster = baziInput.day[0]
  
  // 模拟分析结果
  return {
    wuxingStats: {
      木: 3,
      火: 2,
      土: 4,
      金: 1,
      水: 2
    },
    shishenStats: {
      正官: 1,
      七杀: 1,
      正印: 1,
      偏印: 1,
      食神: 1,
      比肩: 2
    },
    primaryYongshen: "正印",
    secondaryYongshen: "食神",
    jishen: "七杀",
    overallAnalysis: "藏干结构中，土行力量最强，其次是木行。从十神来看，比肩力量较强，有助于日主力量。主要用神为正印，次用神为食神，需要注意七杀的克制作用。"
  }
}

// 分析副星
export const analyzeFuxing = (baziInput: any) => {
  // 简化分析，实际应该更复杂
  
  // 模拟分析结果
  return {
    totalCount: 5,
    favorableCount: 3,
    categoryStats: {
      桃花类: 2,
      贵人类: 1,
      文星类: 1,
      凶煞类: 1
    },
    fuxingList: [
      {
        name: "天乙贵人",
        category: "贵人类",
        position: ["年柱"],
        effect: "逢凶化吉，贵人相助",
        favorable: true
      },
      {
        name: "文昌星",
        category: "文星类",
        position: ["月柱"],
        effect: "利于学业，增强才华",
        favorable: true
      },
      {
        name: "桃花",
        category: "桃花类",
        position: ["日柱"],
        effect: "增强异性缘，感情丰富",
        favorable: true
      },
      {
        name: "红鸾",
        category: "桃花类",
        position: ["时柱"],
        effect: "有利婚姻，喜事临门",
        favorable: true
      },
      {
        name: "羊刃",
        category: "凶煞类",
        position: ["日柱"],
        effect: "性格刚烈，易有意外",
        favorable: false
      }
    ]
  }
}

// 计算星运
export const calculateXingyun = (year: number) => {
  // 简化计算，实际应该更复杂
  const currentPeriod = Math.floor((year - 1864) / 20) % 9 + 1
  let currentStar = ""
  let currentYuan = ""
  let wuxing = ""
  let direction = ""
  
  if (currentPeriod <= 3) {
    currentYuan = "上元"
    if (currentPeriod === 1) {
      currentStar = "一白"
      wuxing = "水"
      direction = "北方"
    } else if (currentPeriod === 2) {
      currentStar = "二黑"
      wuxing = "土"
      direction = "西南"
    } else {
      currentStar = "三碧"
      wuxing = "木"
      direction = "东方"
    }
  } else if (currentPeriod <= 6) {
    currentYuan = "中元"
    if (currentPeriod === 4) {
      currentStar = "四绿"
      wuxing = "木"
      direction = "东南"
    } else if (currentPeriod === 5) {
      currentStar = "五黄"
      wuxing = "土"
      direction = "中央"
    } else {
      currentStar = "六白"
      wuxing = "金"
      direction = "西北"
    }
  } else {
    currentYuan = "下元"
    if (currentPeriod === 7) {
      currentStar = "七赤"
      wuxing = "金"
      direction = "西方"
    } else if (currentPeriod === 8) {
      currentStar = "八白"
      wuxing = "土"
      direction = "东北"
    } else {
      currentStar = "九紫"
      wuxing = "火"
      direction = "南方"
    }
  }
  
  // 模拟分析结果
  return {
    year,
    currentStar,
    currentYuan,
    period: `${year - (year % 20) + 1}-${year - (year % 20) + 20}`,
    wuxing,
    direction,
    characteristic: getStarCharacteristic(currentStar),
    fortune: getStarFortune(currentStar),
    influence: getStarInfluence(currentStar),
    suitableIndustries: getStarIndustries(currentStar)
  }
}

// 分析纳音结构
export const analyzeNayinStructure = (baziInput: any) => {
  // 简化分析，实际应该更复杂
  
  // 模拟分析结果
  return {
    nayinList: [
      { nayin: "海中金", wuxing: "金", ganzhi: baziInput.year },
      { nayin: "炉中火", wuxing: "火", ganzhi: baziInput.month },
      { nayin: "路旁土", wuxing: "土", ganzhi: baziInput.day },
      { nayin: "大海水", wuxing: "水", ganzhi: baziInput.hour }
    ],
    wuxingStats: {
      金: 1,
      火: 1,
      土: 1,
      水: 1,
      木: 0
    },
    nayinRelations: [
      {
        from: { nayin: "海中金", wuxing: "金" },
        to: { nayin: "炉中火", wuxing: "火" },
        type: "被克",
        effect: "金被火克，力量受损"
      },
      {
        from: { nayin: "炉中火", wuxing: "火" },
        to: { nayin: "路旁土", wuxing: "土" },
        type: "相生",
        effect: "火生土，力量增强"
      },
      {
        from: { nayin: "路旁土", wuxing: "土" },
        to: { nayin: "大海水", wuxing: "水" },
        type: "被克",
        effect: "土被水克，力量受损"
      }
    ],
    overallAnalysis: "纳音五行分布较为均衡，金火土水俱全，只缺木行。纳音间有生克关系，形成金被火克，火生土，土被水克的结构。整体上，火土力量较强，金水力量较弱。"
  }
}

// 分析四柱结构
export const analyzeSizhuStructure = (baziInput: any) => {
  // 简化分析，实际应该更复杂
  
  // 模拟分析结果
  return {
    minggong: "寅",
    shengong: "申",
    taiyuan: "癸亥",
    liuqin: {
      父母: "年柱",
      兄弟: "月柱",
      夫妻: "日柱",
      子女: "时柱",
      财帛: "日支"
    },
    liuqinAnalysis: {
      父母: "年柱甲子为父母宫，父母关系较好，得到长辈支持",
      兄弟: "月柱丙寅为兄弟宫，兄弟姐妹关系和睦，合作共赢",
      夫妻: "日柱戊午为夫妻宫，婚姻较为稳定，但有些固执",
      子女: "时柱癸亥为子女宫，子女聪明伶俐，有才华",
      财帛: "日支午为财帛宫，财运稳定，但需要努力"
    },
    gongweiAnalysis: {
      minggong: "命宫在寅，主人性格刚毅，有领导才能，事业心强",
      shengong: "身宫在申，主人体质较好，性格灵活，善于变通",
      taiyuan: "胎元癸亥，主人先天基础较好，智慧聪明，有创新精神"
    },
    chonghexinghai: [
      {
        type: "六冲",
        description: "子午相冲，主变动较大，需要适应变化",
        positions: ["年支子", "日支午"],
        color: "#ef4444"
      },
      {
        type: "三合",
        description: "寅午戌三合火局，主事业有成，创造力强",
        positions: ["月支寅", "日支午"],
        color: "#10b981"
      }
    ],
    specialStructures: [
      {
        name: "寅午拱",
        description: "寅午拱申，形成三合局，有利于事业发展"
      }
    ]
  }
}

// 辅助函数
const getStarCharacteristic = (star: string) => {
  const characteristics: { [key: string]: string } = {
    "一白": "智慧流通",
    "二黑": "稳重包容",
    "三碧": "生机勃发",
    "四绿": "稳步成长",
    "五黄": "中正平和",
    "六白": "收敛肃杀",
    "七赤": "锐意进取",
    "八白": "稳中求变",
    "九紫": "光明磊落"
  }
  return characteristics[star] || "未知特性"
}

const getStarFortune = (star: string) => {
  const fortunes: { [key: string]: string } = {
    "一白": "水行当令，利于智慧型行业，如科技、教育、传媒等",
    "二黑": "土行当令，利于稳健型行业，如房地产、农业、制造业等",
    "三碧": "木行当令，利于创新型行业，如环保、医疗、文化等",
    "四绿": "木行当令，利于成长型行业，如教育、健康、服务业等",
    "五黄": "土行当令，利于传统型行业，如建筑、餐饮、零售等",
    "六白": "金行当令，利于精密型行业，如科技、金融、法律等",
    "七赤": "金行当令，利于竞争型行业，如销售、体育、军警等",
    "八白": "土行当令，利于变革型行业，如咨询、改革、创业等",
    "九紫": "火行当令，利于热情型行业，如娱乐、艺术、公关等"
  }
  return fortunes[star] || "运势一般"
}

const getStarInfluence = (star: string) => {
  const influences: { [key: string]: string } = {
    "一白": "增强智慧和学习能力，有利于考试和研究",
    "二黑": "增强稳定性和包容力，有利于长期发展",
    "三碧": "增强创新和生机，有利于开创新局面",
    "四绿": "增强成长和发展，有利于稳步前进",
    "五黄": "增强中正和平衡，有利于协调各方",
    "六白": "增强收敛和精细，有利于完善细节",
    "七赤": "增强进取和竞争，有利于突破困境",
    "八白": "增强变革和适应，有利于转型升级",
    "九紫": "增强光明和热情，有利于展示才华"
  }
  return influences[star] || "影响一般"
}

const getStarIndustries = (star: string) => {
  const industries: { [key: string]: string[] } = {
    "一白": ["科技", "教育", "传媒", "水产"],
    "二黑": ["房地产", "农业", "制造业", "餐饮"],
    "三碧": ["环保", "医疗", "文化", "创新"],
    "四绿": ["教育", "健康", "服务业", "园艺"],
    "五黄": ["建筑", "餐饮", "零售", "传统行业"],
    "六白": ["科技", "金融", "法律", "精密制造"],
    "七赤": ["销售", "体育", "军警", "竞争行业"],
    "八白": ["咨询", "改革", "创业", "新兴产业"],
    "九紫": ["娱乐", "艺术", "公关", "时尚"]
  }
  return industries[star] || ["一般行业"]
}