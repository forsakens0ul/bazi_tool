// bazi-calculator.ts
import { getJieqiDate } from "./jieqi-data";

// 天干地支数据
const tianganList = [
  "甲",
  "乙",
  "丙",
  "丁",
  "戊",
  "己",
  "庚",
  "辛",
  "壬",
  "癸",
];
const dizhiList = [
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥",
];
const jiazi60 = generateJiazi60();

// 生成六十甲子
function generateJiazi60(): string[] {
  const result = [];
  for (let i = 0; i < 60; i++) {
    result.push(tianganList[i % 10] + dizhiList[i % 12]);
  }
  return result;
}

// 计算年柱 - 以立春为界
export function getYearColumn(
  year: number,
  month: number,
  day: number
): string {
  // 获取当年立春日期
  const lichunDate = getJieqiDate(year, "立春");
  if (!lichunDate) return getGanzhiByYear(year); // 数据缺失时使用简化算法

  const birthDate = new Date(year, month - 1, day);

  // 如果在立春前，使用上一年干支
  if (birthDate < lichunDate) {
    return getGanzhiByYear(year - 1);
  } else {
    return getGanzhiByYear(year);
  }
}

// 根据年份获取干支（不考虑节气）
function getGanzhiByYear(year: number): string {
  const ganIndex = (year - 4) % 10;
  const zhiIndex = (year - 4) % 12;
  return tianganList[ganIndex] + dizhiList[zhiIndex];
}

// 计算月柱 - 以节气为界
export function getMonthColumn(
  year: number,
  month: number,
  day: number
): string {
  // 获取当月第一个节气和第二个节气
  const monthJieqiMap: { [key: number]: [string, string] } = {
    1: ["小寒", "大寒"],
    2: ["立春", "雨水"],
    3: ["惊蛰", "春分"],
    4: ["清明", "谷雨"],
    5: ["立夏", "小满"],
    6: ["芒种", "夏至"],
    7: ["小暑", "大暑"],
    8: ["立秋", "处暑"],
    9: ["白露", "秋分"],
    10: ["寒露", "霜降"],
    11: ["立冬", "小雪"],
    12: ["大雪", "冬至"],
  };

  const jieqi1 = getJieqiDate(year, monthJieqiMap[month][0]);
  const jieqi2 = getJieqiDate(year, monthJieqiMap[month][1]);
  const nextMonthJieqi1 =
    month === 12
      ? getJieqiDate(year + 1, monthJieqiMap[1][0])
      : getJieqiDate(year, monthJieqiMap[month + 1][0]);

  const birthDate = new Date(year, month - 1, day);

  // 节气月份对应表（以节气为界）
  const jieqiToMonthIndex = {
    立春: 1,
    惊蛰: 2,
    清明: 3,
    立夏: 4,
    芒种: 5,
    小暑: 6,
    立秋: 7,
    白露: 8,
    寒露: 9,
    立冬: 10,
    大雪: 11,
    小寒: 12,
  };

  // 确定月份索引
  let monthIndex = 0;
  if (!jieqi1 || !jieqi2 || !nextMonthJieqi1) {
    // 数据缺失时使用简化算法
    monthIndex = (month + 1) % 12; // 寅月为1月
  } else if (birthDate < jieqi1) {
    // 在本月第一个节气前，使用上个月对应节气
    const prevMonth = month === 1 ? 12 : month - 1;
    monthIndex = jieqiToMonthIndex[monthJieqiMap[prevMonth][0]];
  } else if (birthDate < jieqi2) {
    // 在本月第一个节气后，第二个节气前
    monthIndex = jieqiToMonthIndex[monthJieqiMap[month][0]];
  } else if (birthDate < nextMonthJieqi1) {
    // 在本月第二个节气后，下月第一个节气前
    monthIndex = jieqiToMonthIndex[monthJieqiMap[month][1]];
  }

  // 确定月干
  const yearGan = getYearColumn(year, month, day)[0];
  const baseMonthGan = (tianganList.indexOf(yearGan) % 5) * 2;
  const monthGanIndex = (baseMonthGan + monthIndex - 1) % 10;

  return tianganList[monthGanIndex] + dizhiList[monthIndex];
}

// 计算日柱 - 基姆拉尔森计算公式
export function getDayColumn(year: number, month: number, day: number): string {
  // 基姆拉尔森计算公式
  if (month < 3) {
    month += 12;
    year -= 1;
  }

  const k = year % 100;
  const j = Math.floor(year / 100);

  const h =
    (day +
      Math.floor((13 * (month + 1)) / 5) +
      k +
      Math.floor(k / 4) +
      Math.floor(j / 4) +
      5 * j) %
    60;

  return jiazi60[h];
}

// 计算时柱 - 以日干五鼠遁
export function getHourColumn(dayGan: string, hour: number): string {
  // 五鼠遁口诀映射
  const wushuDun: { [key: string]: string[] } = {
    甲己: tianganList,
    乙庚: [...tianganList.slice(2), ...tianganList.slice(0, 2)],
    丙辛: [...tianganList.slice(4), ...tianganList.slice(0, 4)],
    丁壬: [...tianganList.slice(6), ...tianganList.slice(0, 6)],
    戊癸: [...tianganList.slice(8), ...tianganList.slice(0, 8)],
  };

  // 确定时干
  let timeGan = "";
  for (const key in wushuDun) {
    if (key.includes(dayGan)) {
      timeGan = wushuDun[key][Math.floor((hour + 1) / 2) % 12];
      break;
    }
  }

  // 确定时支
  const timeZhi = dizhiList[Math.floor((hour + 1) / 2) % 12];

  return timeGan + timeZhi;
}

// 计算完整八字
export function calculateBazi(
  year: number,
  month: number,
  day: number,
  hour: number
): string {
  const yearColumn = getYearColumn(year, month, day);
  const monthColumn = getMonthColumn(year, month, day);
  const dayColumn = getDayColumn(year, month, day);
  const hourColumn = getHourColumn(dayColumn[0], hour);

  return `${yearColumn} ${monthColumn} ${dayColumn} ${hourColumn}`;
}
