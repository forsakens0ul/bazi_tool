// 大运计算核心逻辑
import { tianganList, dizhiList } from "./liulian-dayun";
import jieqiDatabase, {
  getJieqiDate,
  getMonthChangeJieqi,
  getNextMonthChangeJieqi,
  getPrevMonthChangeJieqi,
  JieqiDataYear,
} from "./jieqi-data";

// 类型定义
export interface BirthInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute?: number;
  gender: "男" | "女";
  location?: string; // 用于真太阳时校正
}

export interface Jieqi {
  name: string;
  date: Date;
}

export interface DayunInfo {
  ganzhi: string;
  startAge: number;
  endAge: number;
  startYear: number;
  endYear: number;
  tianganWuxing: string;
  dizhiWuxing: string;
  shishen: string;
  favorability: string;
  yongshenMatch: string;
  analysis: string;
  canggan?: string[];
  bazi?: string;
  direction: "forward" | "reverse"; // 顺排或逆排
  targetJieqi?: Jieqi | null; // 参考节气
  startingMonths?: number; // 起运月数
  startingDays?: number; // 起运天数
}

// 判断大运顺逆
export function getDayunDirection(
  gender: string,
  yearGan: string
): "forward" | "reverse" {
  // 年干阴阳：甲丙戊庚壬为阳，乙丁己辛癸为阴
  const yangGan = "甲丙戊庚壬";
  const isYangYear = yangGan.includes(yearGan);

  // 阳年男逆排，阴年男顺排，阳年女顺排，阴年女逆排
  if ((isYangYear && gender === "男") || (!isYangYear && gender === "女")) {
    return "reverse"; // 逆排
  } else {
    return "forward"; // 顺排
  }
}

// 计算起运时间
export function calculateStartingAge(
  birthDate: Date,
  direction: "forward" | "reverse"
): {
  years: number;
  months: number;
  days: number;
  targetJieqi: Jieqi | null;
} {
  // 获取相邻节气
  const targetJieqi =
    direction === "forward"
      ? getNextMonthChangeJieqi(birthDate)
      : getPrevMonthChangeJieqi(birthDate);

  if (!targetJieqi) {
    return { years: 0, months: 0, days: 0, targetJieqi: null };
  }

  // 计算天数差（含时辰折算）
  const daysDiff = Math.abs(
    (targetJieqi.date.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // 3天=1岁，1天=4个月，1时辰=10天
  const years = Math.floor(daysDiff / 3);
  const remainingDays = daysDiff % 3;
  const months = Math.floor(remainingDays * 4);
  const days = Math.floor((remainingDays * 4 - months) * 30);

  return { years, months, days, targetJieqi };
}

// 生成正确的60甲子表
function generate60Jiazi(): string[] {
  const jiazi60 = [];
  // 60甲子顺序：甲子、乙丑、丙寅...
  for (let i = 0; i < 60; i++) {
    const ganIndex = i % 10;
    const zhiIndex = i % 12;
    jiazi60.push(tianganList[ganIndex] + dizhiList[zhiIndex]);
  }
  return jiazi60;
}

// 生成大运干支序列
export function generateDayunColumns(
  monthColumn: string,
  direction: "forward" | "reverse",
  count: number = 8
): string[] {
  // 创建正确的60甲子表
  const jiazi60 = generate60Jiazi();

  // 找到月柱在60甲子中的索引
  const currentIdx = jiazi60.indexOf(monthColumn);
  if (currentIdx === -1) {
    console.error(`月柱 ${monthColumn} 不在60甲子表中`);
    return [];
  }

  // 生成大运序列
  const dayunColumns = [];
  for (let i = 1; i <= count; i++) {
    let nextIdx;
    if (direction === "forward") {
      nextIdx = (currentIdx + i) % 60;
    } else {
      nextIdx = (currentIdx - i + 60) % 60;
    }
    dayunColumns.push(jiazi60[nextIdx]);
  }

  return dayunColumns;
}

// 计算大运信息
export function calculateDayunInfo(
  birthInfo: BirthInfo,
  bazi: string,
  dayMaster: string,
  monthColumn: string
): DayunInfo[] {
  const { year, month, day, hour, gender } = birthInfo;
  const yearGan = bazi.substring(0, 1);

  // 判断大运顺逆
  const direction = getDayunDirection(gender, yearGan);

  // 计算起运年龄
  const birthDate = new Date(year, month - 1, day, hour);
  const { years, months, days, targetJieqi } = calculateStartingAge(
    birthDate,
    direction
  );

  // 生成大运干支序列
  const dayunColumns = generateDayunColumns(monthColumn, direction);

  // 生成大运信息
  const dayunInfo: DayunInfo[] = [];

  for (let i = 0; i < dayunColumns.length; i++) {
    const ganzhi = dayunColumns[i];
    const startAge = years + i * 10;
    const endAge = startAge + 9;
    const startYear = year + Math.floor(years + months / 12) + i * 10;
    const endYear = startYear + 9;

    dayunInfo.push({
      ganzhi,
      startAge,
      endAge,
      startYear,
      endYear,
      tianganWuxing: getTianganWuxing(ganzhi[0]),
      dizhiWuxing: getDizhiWuxing(ganzhi[1]),
      shishen: getShishen(dayMaster, ganzhi[0]),
      favorability: i % 3 === 0 ? "有利" : i % 3 === 1 ? "中性" : "不利",
      yongshenMatch: i % 3 === 0 ? "匹配" : "部分匹配",
      analysis: generateDayunAnalysis(
        i % 3 === 0 ? "有利" : i % 3 === 1 ? "中性" : "不利"
      ),
      canggan: getDizhiCanggan(ganzhi[1]),
      bazi,
      direction,
      targetJieqi,
      startingMonths: months,
      startingDays: days,
    });
  }

  return dayunInfo;
}

// 辅助函数 - 获取天干五行
function getTianganWuxing(tiangan: string): string {
  const wuxingMap: { [key: string]: string } = {
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
  return wuxingMap[tiangan] || "未知";
}

// 辅助函数 - 获取地支五行
function getDizhiWuxing(dizhi: string): string {
  const wuxingMap: { [key: string]: string } = {
    子: "水",
    丑: "土",
    寅: "木",
    卯: "木",
    辰: "土",
    巳: "火",
    午: "火",
    未: "土",
    申: "金",
    酉: "金",
    戌: "土",
    亥: "水",
  };
  return wuxingMap[dizhi] || "未知";
}

// 辅助函数 - 获取十神
function getShishen(dayMaster: string, tiangan: string): string {
  const shishenMap: { [key: string]: { [key: string]: string } } = {
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

  return (shishenMap[dayMaster] && shishenMap[dayMaster][tiangan]) || "未知";
}

// 辅助函数 - 获取地支藏干
function getDizhiCanggan(dizhi: string): string[] {
  const cangganMap: { [key: string]: string[] } = {
    子: ["癸"],
    丑: ["己", "癸", "辛"],
    寅: ["甲", "丙", "戊"],
    卯: ["乙"],
    辰: ["戊", "乙", "癸"],
    巳: ["丙", "戊", "庚"],
    午: ["丁", "己"],
    未: ["己", "丁", "乙"],
    申: ["庚", "壬", "戊"],
    酉: ["辛"],
    戌: ["戊", "辛", "丁"],
    亥: ["壬", "甲"],
  };
  return cangganMap[dizhi] || [];
}

// 辅助函数 - 生成大运分析
function generateDayunAnalysis(favorability: string): string {
  const analysisMap: { [key: string]: string } = {
    有利: "此运期间运势上升，各方面发展顺利，是人生的黄金期",
    中性: "此运期间运势平稳，需要稳扎稳打，积累实力",
    不利: "此运期间需要谨慎行事，避免重大决策，以守为攻",
  };
  return analysisMap[favorability] || "运势一般";
}

// 流年与大运叠加分析
export function analyzeLiunianWithDayun(
  dayunInfo: DayunInfo,
  liunianGanzhi: string
): {
  tianganRelation: string;
  dizhiRelation: string;
  overallEffect: string;
} {
  const dayunGan = dayunInfo.ganzhi[0];
  const dayunZhi = dayunInfo.ganzhi[1];
  const liunianGan = liunianGanzhi[0];
  const liunianZhi = liunianGanzhi[1];

  // 简化的天干关系判断
  let tianganRelation = "普通";
  if (dayunGan === liunianGan) {
    tianganRelation = "比和";
  } else if (getTianganWuxing(dayunGan) === getTianganWuxing(liunianGan)) {
    tianganRelation = "同气";
  }

  // 简化的地支关系判断
  let dizhiRelation = "普通";
  if (dayunZhi === liunianZhi) {
    dizhiRelation = "比和";
  } else if (isThreeHarmony(dayunZhi, liunianZhi)) {
    dizhiRelation = "三合";
  } else if (isSixHarmony(dayunZhi, liunianZhi)) {
    dizhiRelation = "六合";
  } else if (isSixConflict(dayunZhi, liunianZhi)) {
    dizhiRelation = "六冲";
  }

  // 综合效应
  let overallEffect = "平稳";
  if (
    tianganRelation === "比和" ||
    dizhiRelation === "三合" ||
    dizhiRelation === "六合"
  ) {
    overallEffect = "有利";
  } else if (dizhiRelation === "六冲") {
    overallEffect = "不利";
  }

  return {
    tianganRelation,
    dizhiRelation,
    overallEffect,
  };
}

// 辅助函数 - 判断三合
function isThreeHarmony(zhi1: string, zhi2: string): boolean {
  const threeHarmonyGroups = [
    ["申", "子", "辰"],
    ["亥", "卯", "未"],
    ["寅", "午", "戌"],
    ["巳", "酉", "丑"],
  ];

  return threeHarmonyGroups.some(
    (group) => group.includes(zhi1) && group.includes(zhi2) && zhi1 !== zhi2
  );
}

// 辅助函数 - 判断六合
function isSixHarmony(zhi1: string, zhi2: string): boolean {
  const sixHarmonyPairs = [
    ["子", "丑"],
    ["寅", "亥"],
    ["卯", "戌"],
    ["辰", "酉"],
    ["巳", "申"],
    ["午", "未"],
  ];

  return sixHarmonyPairs.some(
    (pair) =>
      (pair[0] === zhi1 && pair[1] === zhi2) ||
      (pair[0] === zhi2 && pair[1] === zhi1)
  );
}

// 辅助函数 - 判断六冲
function isSixConflict(zhi1: string, zhi2: string): boolean {
  const sixConflictPairs = [
    ["子", "午"],
    ["丑", "未"],
    ["寅", "申"],
    ["卯", "酉"],
    ["辰", "戌"],
    ["巳", "亥"],
  ];

  return sixConflictPairs.some(
    (pair) =>
      (pair[0] === zhi1 && pair[1] === zhi2) ||
      (pair[0] === zhi2 && pair[1] === zhi1)
  );
}

// 测试函数 - 验证大运计算
export function testDayunCalculation(customCase?: {
  year: number;
  month: number;
  day: number;
  hour: number;
  gender: "男" | "女";
}) {
  // 测试案例1: 1990年6月15日，男性，子时
  const test1 = customCase || {
    year: 1990,
    month: 6,
    day: 15,
    hour: 0,
    gender: "男" as "男" | "女",
  };

  // 正确的八字应该是：庚午 己巳 壬午 壬子
  // 注意：这里简化处理，实际应该通过八字计算模块获取
  const yearGan = "庚";
  const yearZhi = "午";
  const monthGan = "己";
  const monthZhi = "巳";
  const dayGan = "壬";
  const dayZhi = "午";
  const timeGan = "壬";
  const timeZhi = "子";

  const bazi = `${yearGan}${yearZhi} ${monthGan}${monthZhi} ${dayGan}${dayZhi} ${timeGan}${timeZhi}`;

  // 手动测试大运方向和序列
  const direction = getDayunDirection(test1.gender, yearGan);
  console.log("大运方向:", direction);

  // 手动测试大运序列生成
  const dayunColumns = generateDayunColumns(monthGan + monthZhi, direction);
  console.log("大运序列:", dayunColumns.join(", "));

  // 测试起运年龄计算
  const birthDate = new Date(
    test1.year,
    test1.month - 1,
    test1.day,
    test1.hour
  );
  const startingAge = calculateStartingAge(birthDate, direction);
  console.log("起运年龄:", startingAge);

  // 计算大运
  const dayunBirthInfo: BirthInfo = test1 as BirthInfo;
  const monthColumn = monthGan + monthZhi;
  const dayunInfo = calculateDayunInfo(
    dayunBirthInfo,
    bazi,
    dayGan,
    monthColumn
  );

  console.log(
    `测试案例: ${test1.year}-${test1.month}-${test1.day} ${test1.gender}:`
  );
  console.log("八字:", bazi);
  console.log("大运顺逆:", dayunInfo[0].direction);
  console.log(
    "起运年龄:",
    `${dayunInfo[0].startAge}岁${dayunInfo[0].startingMonths}个月${dayunInfo[0].startingDays}天`
  );
  console.log("大运序列:", dayunInfo.map((d) => d.ganzhi).join(", "));

  return dayunInfo;
}
