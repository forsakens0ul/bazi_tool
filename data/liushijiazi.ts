// 天干数据
export const tianganData = {
  甲: { wuxing: "木", yinyang: "阳", direction: "东", meaning: "参天大树，栋梁之材" },
  乙: { wuxing: "木", yinyang: "阴", direction: "东", meaning: "花草藤蔓，柔韧灵活" },
  丙: { wuxing: "火", yinyang: "阳", direction: "南", meaning: "太阳之火，光明磊落" },
  丁: { wuxing: "火", yinyang: "阴", direction: "南", meaning: "灯烛之火，温和细腻" },
  戊: { wuxing: "土", yinyang: "阳", direction: "中", meaning: "高山厚土，稳重可靠" },
  己: { wuxing: "土", yinyang: "阴", direction: "中", meaning: "田园沃土，包容滋养" },
  庚: { wuxing: "金", yinyang: "阳", direction: "西", meaning: "刀剑钢铁，刚强果断" },
  辛: { wuxing: "金", yinyang: "阴", direction: "西", meaning: "珠宝首饰，精致美丽" },
  壬: { wuxing: "水", yinyang: "阳", direction: "北", meaning: "江河大海，奔腾不息" },
  癸: { wuxing: "水", yinyang: "阴", direction: "北", meaning: "雨露甘霖，润物无声" },
}

// 地支数据
export const dizhiData = {
  子: { wuxing: "水", yinyang: "阳", direction: "北", meaning: "子时水旺，主智慧流动" },
  丑: { wuxing: "土", yinyang: "阴", direction: "东北", meaning: "丑时土厚，主包容蓄藏" },
  寅: { wuxing: "木", yinyang: "阳", direction: "东北", meaning: "寅时木生，主生发向上" },
  卯: { wuxing: "木", yinyang: "阴", direction: "东", meaning: "卯时木旺，主条达舒展" },
  辰: { wuxing: "土", yinyang: "阳", direction: "东南", meaning: "辰时土湿，主化育万物" },
  巳: { wuxing: "火", yinyang: "阴", direction: "东南", meaning: "巳时火起，主文明礼智" },
  午: { wuxing: "火", yinyang: "阳", direction: "南", meaning: "午时火旺，主热情奔放" },
  未: { wuxing: "土", yinyang: "阴", direction: "西南", meaning: "未时土燥，主收藏储蓄" },
  申: { wuxing: "金", yinyang: "阳", direction: "西南", meaning: "申时金生，主肃杀收敛" },
  酉: { wuxing: "金", yinyang: "阴", direction: "西", meaning: "酉时金旺，主精细完美" },
  戌: { wuxing: "土", yinyang: "阳", direction: "西北", meaning: "戌时土燥，主守护忠诚" },
  亥: { wuxing: "水", yinyang: "阴", direction: "西北", meaning: "亥时水藏，主深沉内敛" },
}

// 纳音五行数据
export const nayinData = [
  "海中金",
  "炉中火",
  "大林木",
  "路旁土",
  "剑锋金",
  "山头火",
  "涧下水",
  "城头土",
  "白蜡金",
  "杨柳木",
  "泉中水",
  "屋上土",
  "霹雳火",
  "松柏木",
  "长流水",
  "沙中金",
  "山下火",
  "平地木",
  "壁上土",
  "金箔金",
  "覆灯火",
  "天河水",
  "大驿土",
  "钗钏金",
  "桑柘木",
  "大溪水",
  "沙中土",
  "天上火",
  "石榴木",
  "大海水",
]

// 生成六十甲子
export const generateLiushiJiazi = () => {
  const tiangan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
  const dizhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
  const jiazi = []

  for (let i = 0; i < 60; i++) {
    const gan = tiangan[i % 10]
    const zhi = dizhi[i % 12]
    const nayin = nayinData[Math.floor(i / 2)]

    // 计算年份举例（以1984年甲子为基准）
    const baseYear = 1984 - i
    const years = []
    for (let j = 0; j < 3; j++) {
      years.push(baseYear + j * 60)
    }

    jiazi.push({
      index: i + 1,
      gan,
      zhi,
      combination: `${gan}${zhi}`,
      nayin,
      years,
      ganData: tianganData[gan as keyof typeof tianganData],
      zhiData: dizhiData[zhi as keyof typeof dizhiData],
    })
  }

  return jiazi
}

// 五行颜色配置
export const wuxingColors = {
  木: { bg: "#dcfce7", border: "#16a34a", text: "#15803d" },
  火: { bg: "#fee2e2", border: "#dc2626", text: "#b91c1c" },
  土: { bg: "#fef3c7", border: "#ca8a04", text: "#a16207" },
  金: { bg: "#f3f4f6", border: "#6b7280", text: "#4b5563" },
  水: { bg: "#dbeafe", border: "#2563eb", text: "#1d4ed8" },
}
