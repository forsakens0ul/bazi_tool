// 排盘基础数据
export const tianganList = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
export const dizhiList = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

// 天干地支属性
export const ganzhiProperties = {
  天干: {
    甲: { wuxing: "木", yinyang: "阳", nayin: "海中金" },
    乙: { wuxing: "木", yinyang: "阴", nayin: "海中金" },
    丙: { wuxing: "火", yinyang: "阳", nayin: "炉中火" },
    丁: { wuxing: "火", yinyang: "阴", nayin: "炉中火" },
    戊: { wuxing: "土", yinyang: "阳", nayin: "大林木" },
    己: { wuxing: "土", yinyang: "阴", nayin: "大林木" },
    庚: { wuxing: "金", yinyang: "阳", nayin: "路旁土" },
    辛: { wuxing: "金", yinyang: "阴", nayin: "路旁土" },
    壬: { wuxing: "水", yinyang: "阳", nayin: "剑锋金" },
    癸: { wuxing: "水", yinyang: "阴", nayin: "剑锋金" },
  },
  地支: {
    子: { wuxing: "水", yinyang: "阳", canggan: ["癸"], season: "冬", time: "23-1" },
    丑: { wuxing: "土", yinyang: "阴", canggan: ["己", "癸", "辛"], season: "冬", time: "1-3" },
    寅: { wuxing: "木", yinyang: "阳", canggan: ["甲", "丙", "戊"], season: "春", time: "3-5" },
    卯: { wuxing: "木", yinyang: "阴", canggan: ["乙"], season: "春", time: "5-7" },
    辰: { wuxing: "土", yinyang: "阳", canggan: ["戊", "乙", "癸"], season: "春", time: "7-9" },
    巳: { wuxing: "火", yinyang: "阴", canggan: ["丙", "戊", "庚"], season: "夏", time: "9-11" },
    午: { wuxing: "火", yinyang: "阳", canggan: ["丁", "己"], season: "夏", time: "11-13" },
    未: { wuxing: "土", yinyang: "阴", canggan: ["己", "丁", "乙"], season: "夏", time: "13-15" },
    申: { wuxing: "金", yinyang: "阳", canggan: ["庚", "壬", "戊"], season: "秋", time: "15-17" },
    酉: { wuxing: "金", yinyang: "阴", canggan: ["辛"], season: "秋", time: "17-19" },
    戌: { wuxing: "土", yinyang: "阳", canggan: ["戊", "辛", "丁"], season: "秋", time: "19-21" },
    亥: { wuxing: "水", yinyang: "阴", canggan: ["壬", "甲"], season: "冬", time: "21-23" },
  },
}

// 十神推算
export const getShishen = (dayGan: string, targetGan: string): string => {
  const dayWuxing = ganzhiProperties.天干[dayGan as keyof typeof ganzhiProperties.天干].wuxing
  const dayYinyang = ganzhiProperties.天干[dayGan as keyof typeof ganzhiProperties.天干].yinyang
  const targetWuxing = ganzhiProperties.天干[targetGan as keyof typeof ganzhiProperties.天干].wuxing
  const targetYinyang = ganzhiProperties.天干[targetGan as keyof typeof ganzhiProperties.天干].yinyang

  // 同五行
  if (dayWuxing === targetWuxing) {
    return dayYinyang === targetYinyang ? "比肩" : "劫财"
  }

  // 我生
  const shengMap: { [key: string]: string } = {
    木: "火",
    火: "土",
    土: "金",
    金: "水",
    水: "木",
  }
  if (shengMap[dayWuxing] === targetWuxing) {
    return dayYinyang === targetYinyang ? "食神" : "伤官"
  }

  // 我克
  const keMap: { [key: string]: string } = {
    木: "土",
    火: "金",
    土: "水",
    金: "木",
    水: "火",
  }
  if (keMap[dayWuxing] === targetWuxing) {
    return dayYinyang === targetYinyang ? "偏财" : "正财"
  }

  // 克我
  if (keMap[targetWuxing] === dayWuxing) {
    return dayYinyang === targetYinyang ? "七杀" : "正官"
  }

  // 生我
  if (shengMap[targetWuxing] === dayWuxing) {
    return dayYinyang === targetYinyang ? "偏印" : "正印"
  }

  return "未知"
}

// 五行颜色配置
export const wuxingColors = {
  木: { bg: "#dcfce7", border: "#16a34a", text: "#15803d" },
  火: { bg: "#fee2e2", border: "#dc2626", text: "#b91c1c" },
  土: { bg: "#fef3c7", border: "#ca8a04", text: "#a16207" },
  金: { bg: "#f3f4f6", border: "#6b7280", text: "#4b5563" },
  水: { bg: "#dbeafe", border: "#2563eb", text: "#1d4ed8" },
}

// 十神颜色配置
export const shishenColors = {
  比肩: "#3b82f6",
  劫财: "#ef4444",
  食神: "#10b981",
  伤官: "#f59e0b",
  偏财: "#8b5cf6",
  正财: "#059669",
  七杀: "#dc2626",
  正官: "#1d4ed8",
  偏印: "#7c3aed",
  正印: "#16a34a",
}

// 预设命例
export const presetExamples = {
  富贵命例: {
    year: "甲子",
    month: "丙寅",
    day: "戊午",
    hour: "癸亥",
    description: "财官印俱全，富贵双全之命",
    analysis: "戊土生于寅月，木旺土弱，喜火生土，忌水木。财官印三奇俱全，格局清纯。",
  },
  从格命例: {
    year: "庚申",
    month: "戊子",
    day: "乙巳",
    hour: "丁亥",
    description: "从财格，顺势而为",
    analysis: "乙木生于子月，身弱财旺，构成从财格。用神取财星和食伤。",
  },
  普通命例: {
    year: "乙卯",
    month: "戊午",
    day: "庚子",
    hour: "丙辰",
    description: "五行较为平衡的普通命格",
    analysis: "庚金生于午月，火旺金弱，需要土金相助。格局一般，平凡之命。",
  },
}

// 格局判断规则
export const gejuRules = {
  正官格: {
    condition: "月令或月干透正官，且不见七杀混杂",
    yongshen: ["印绶", "比劫"],
    description: "贵格，主名声地位",
  },
  七杀格: {
    condition: "月令或月干透七杀，有印制杀或食制杀",
    yongshen: ["印绶", "食伤"],
    description: "权威格，主权力威严",
  },
  正财格: {
    condition: "月令或月干透正财，身强财旺",
    yongshen: ["官杀", "食伤"],
    description: "富格，主财富稳定",
  },
  从财格: {
    condition: "身极弱，财星极旺，全局财星当令",
    yongshen: ["财星", "食伤"],
    description: "特殊格局，顺从财势",
  },
}
