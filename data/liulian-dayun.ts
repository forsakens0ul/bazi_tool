// 流年与大运推演数据

// 天干地支基础数据
export const tianganList = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
export const dizhiList = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

// 纳音五行数据
export const nayinData = [
  "海中金", "炉中火", "大林木", "路旁土", "剑锋金", "山头火",
  "涧下水", "城头土", "白蜡金", "杨柳木", "泉中水", "屋上土",
  "霹雳火", "松柏木", "长流水", "沙中金", "山下火", "平地木",
  "壁上土", "金箔金", "覆灯火", "天河水", "大驿土", "钗钏金",
  "桑柘木", "大溪水", "沙中土", "天上火", "石榴木", "大海水"
]

// 生肖数据
export const shengxiaoData = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]

// 大运数据结构
export const dayunData = {
  calculation: {
    yangMaleYinFemale: "顺排", // 阳男阴女顺排大运
    yinMaleYangFemale: "逆排", // 阴男阳女逆排大运
    startAge: "根据出生月日与节气计算",
    duration: 10, // 每运十年
  },
  analysis: {
    favorability: ["有利", "中性", "不利"],
    aspects: ["事业", "财运", "感情", "健康"],
    yongshenMatch: ["匹配", "部分匹配", "不匹配"],
  }
}

// 流年数据
export const liunianData = {
  specialMarks: {
    桃花年: "异性缘佳，感情机会多",
    冲太岁: "变动较大，需要谨慎",
    三合年: "贵人相助，合作顺利",
    六合年: "和谐稳定，关系融洽",
    三刑年: "容易有纠纷冲突",
    六冲年: "冲突变动，不宜大动作",
    红鸾年: "婚姻喜庆，感情顺利",
    天喜年: "喜事临门，心情愉悦",
  },
  analysis: {
    wuxingRelation: ["生我", "我生", "克我", "我克", "同气"],
    shishenEffect: ["正面", "负面", "中性"],
    overallTrend: ["上升", "平稳", "下降"],
  }
}

// 特殊标记判断
export const specialMarks = {
  桃花: {
    rule: "申子辰见酉，亥卯未见子，寅午戌见卯，巳酉丑见午",
    meaning: "异性缘分，情感丰富"
  },
  冲太岁: {
    rule: "流年地支与年支相冲",
    meaning: "变动较大，冲击原有格局"
  },
  三合: {
    rule: "申子辰、亥卯未、寅午戌、巳酉丑",
    meaning: "三方会合，力量增强"
  }
}

// 计算大运函数
export const calculateDayun = (birthInfo: any) => {
  const { year, month, day, gender } = birthInfo
  const dayunList = []
  
  // 简化计算，实际应该根据节气精确计算
  const startAge = 8 // 简化为8岁起运
  const isYangMale = gender === "男" // 简化判断
  
  for (let i = 0; i < 8; i++) {
    const ganIndex = isYangMale ? (month + i - 1) % 10 : (month - i - 1 + 10) % 10
    const zhiIndex = isYangMale ? (month + i - 1) % 12 : (month - i - 1 + 12) % 12
    
    const ganzhi = tianganList[ganIndex] + dizhiList[zhiIndex]
    const startYear = year + startAge + i * 10
    const endYear = startYear + 9
    
    // 简化的吉凶判断
    const favorability = i % 3 === 0 ? "有利" : i % 3 === 1 ? "中性" : "不利"
    
    dayunList.push({
      ganzhi,
      startAge: startAge + i * 10,
      endAge: startAge + i * 10 + 9,
      startYear,
      endYear,
      tianganWuxing: getTianganWuxing(tianganList[ganIndex]),
      dizhiWuxing: getDizhiWuxing(dizhiList[zhiIndex]),
      shishen: getShishen(tianganList[ganIndex]),
      favorability,
      yongshenMatch: favorability === "有利" ? "匹配" : "部分匹配",
      analysis: generateDayunAnalysis(favorability),
      canggan: getDizhiCanggan(dizhiList[zhiIndex])
    })
  }
  
  return dayunList
}

// 分析流年函数
export const analyzeLiunian = (year: number) => {
  const ganIndex = (year - 4) % 10
  const zhiIndex = (year - 4) % 12
  
  const tiangan = tianganList[ganIndex]
  const dizhi = dizhiList[zhiIndex]
  const ganzhi = tiangan + dizhi
  const nayin = nayinData[Math.floor(((year - 4) % 60) / 2)]
  const shengxiao = shengxiaoData[zhiIndex]
  
  // 特殊标记判断
  const marks = []
  if (zhiIndex === 9) marks.push("桃花年") // 简化判断
  if (year % 12 === 0) marks.push("冲太岁")
  if (zhiIndex % 4 === 0) marks.push("三合年")
  
  return {
    year,
    ganzhi,
    tiangan,
    dizhi,
    nayin,
    shengxiao,
    specialMarks: marks,
    tianganRelation: "生我", // 简化
    dizhiRelation: "同气", // 简化
    wuxingFlow: `${getTianganWuxing(tiangan)}${getDizhiWuxing(dizhi)}相配，气机流通`,
    shishenEffect: `${getShishen(tiangan)}发挥作用`,
    overallScore: Math.floor(Math.random() * 40) + 60, // 60-100分
    favorability: year % 3 === 0 ? "有利" : year % 3 === 1 ? "中性" : "谨慎",
    careerFortune: generateFortune("事业", year),
    wealthFortune: generateFortune("财运", year),
    loveFortune: generateFortune("感情", year),
    healthFortune: generateFortune("健康", year),
    positiveAdvice: generateAdvice("positive", year),
    cautionAdvice: generateAdvice("caution", year)
  }
}

// 综合分析函数
export const comprehensiveAnalysis = (query: any) => {
  const { year, focus, dayMaster } = query
  
  return {
    year,
    dayMaster,
    bodyStrength: "身强", // 简化
    pattern: "正官格", // 简化
    favorableElements: ["水", "木"],
    unfavorableElements: ["火", "土"],
    yearElementRelation: "流年与用神关系良好，有利发展",
    overallScore: Math.floor(Math.random() * 30) + 70,
    detailedScores: {
      事业: Math.floor(Math.random() * 20) + 70,
      财运: Math.floor(Math.random() * 20) + 65,
      感情: Math.floor(Math.random() * 20) + 75,
      健康: Math.floor(Math.random() * 20) + 80
    },
    overallAdvice: generateComprehensiveAdvice(focus),
    careerAdvice: ["稳步发展", "把握机会", "团队合作"],
    wealthAdvice: ["理性投资", "开源节流", "长期规划"],
    loveAdvice: ["真诚沟通", "包容理解", "共同成长"],
    healthAdvice: ["规律作息", "适度运动", "心态平和"]
  }
}

// 关键流年预测
export const keyYearsPrediction = (dayMaster: string) => {
  const currentYear = new Date().getFullYear()
  const keyYears = []
  
  for (let i = 1; i <= 10; i++) {
    const year = currentYear + i
    const type = i % 3 === 0 ? "吉年" : i % 3 === 1 ? "平年" : "注意年"
    const reason = generateKeyYearReason(type, year)
    
    keyYears.push({
      year,
      type,
      reason,
      importance: i <= 5 ? "高" : "中"
    })
  }
  
  return keyYears
}

// 辅助函数
const getTianganWuxing = (tiangan: string) => {
  const wuxingMap: { [key: string]: string } = {
    甲: "木", 乙: "木", 丙: "火", 丁: "火", 戊: "土",
    己: "土", 庚: "金", 辛: "金", 壬: "水", 癸: "水"
  }
  return wuxingMap[tiangan] || "未知"
}

const getDizhiWuxing = (dizhi: string) => {
  const wuxingMap: { [key: string]: string } = {
    子: "水", 丑: "土", 寅: "木", 卯: "木", 辰: "土", 巳: "火",
    午: "火", 未: "土", 申: "金", 酉: "金", 戌: "土", 亥: "水"
  }
  return wuxingMap[dizhi] || "未知"
}

const getShishen = (tiangan: string) => {
  const shishenMap: { [key: string]: string } = {
    甲: "比肩", 乙: "劫财", 丙: "食神", 丁: "伤官", 戊: "偏财",
    己: "正财", 庚: "七杀", 辛: "正官", 壬: "偏印", 癸: "正印"
  }
  return shishenMap[tiangan] || "未知"
}

const getDizhiCanggan = (dizhi: string) => {
  const cangganMap: { [key: string]: string[] } = {
    子: ["癸"], 丑: ["己", "癸", "辛"], 寅: ["甲", "丙", "戊"],
    卯: ["乙"], 辰: ["戊", "乙", "癸"], 巳: ["丙", "戊", "庚"],
    午: ["丁", "己"], 未: ["己", "丁", "乙"], 申: ["庚", "壬", "戊"],
    酉: ["辛"], 戌: ["戊", "辛", "丁"], 亥: ["壬", "甲"]
  }
  return cangganMap[dizhi] || []
}

const generateDayunAnalysis = (favorability: string) => {
  const analysisMap: { [key: string]: string } = {
    有利: "此运期间运势上升，各方面发展顺利，是人生的黄金期",
    中性: "此运期间运势平稳，需要稳扎稳打，积累实力",
    不利: "此运期间需要谨慎行事，避免重大决策，以守为攻"
  }
  return analysisMap[favorability] || "运势一般"
}

const generateFortune = (aspect: string, year: number) => {
  const fortunes: { [key: string]: string[] } = {
    事业: ["发展顺利，有晋升机会", "稳步前进，需要耐心", "变动较大，需要适应"],
    财运: ["财源广进，投资有利", "收入稳定，理财保守", "支出较大，需要节制"],
    感情: ["感情和谐，关系稳定", "平淡如水，需要经营", "波折较多，需要包容"],
    健康: ["身体健康，精力充沛", "注意保养，预防疾病", "容易疲劳，多休息"]
  }
  const options = fortunes[aspect] || ["运势一般"]
  return options[year % options.length]
}

const generateAdvice = (type: string, year: number) => {
  const adviceMap: { [key: string]: string[] } = {
    positive: [
      "把握机会，积极进取",
      "扩大人脉，寻求合作",
      "学习充电，提升能力",
      "投资理财，增加收入"
    ],
    caution: [
      "避免冲动决策",
      "注意身体健康",
      "谨慎投资理财",
      "处理人际关系要圆滑"
    ]
  }
  const options = adviceMap[type] || ["保持平常心"]
  return options.slice(0, 3)
}

const generateComprehensiveAdvice = (focus: string) => {
  const adviceMap: { [key: string]: string } = {
    综合: "综合来看，今年运势较为平稳，适合稳扎稳打，积累实力",
    事业: "事业方面有发展机会，建议把握时机，积极进取",
    财运: "财运方面需要理性投资，避免盲目跟风",
    感情: "感情方面需要真诚沟通，增进彼此了解",
    健康: "健康方面需要注意作息规律，适度运动"
  }
  return adviceMap[focus] || "保持积极心态，顺其自然"
}

const generateKeyYearReason = (type: string, year: number) => {
  const reasonMap: { [key: string]: string[] } = {
    吉年: ["用神得力", "贵人相助", "三合有情"],
    平年: ["运势平稳", "无大起伏", "稳中求进"],
    注意年: ["冲克较重", "变动较大", "需要谨慎"]
  }
  const options = reasonMap[type] || ["运势一般"]
  return options[year % options.length]
}