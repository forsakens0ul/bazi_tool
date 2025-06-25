// 节气数据文件 - 记录1950-2050年的主要节气数据
// 数据存储在 public/data/jieqi-database.json 文件中

// 导入类型定义
export interface JieqiDataYear {
  [jieqi: string]: [number, number]; // [月, 日]
}

export interface JieqiDatabase {
  [year: string]: JieqiDataYear;
}

// 节气名称数组
export const jieqiNames = [
  "小寒",
  "大寒",
  "立春",
  "雨水",
  "惊蛰",
  "春分",
  "清明",
  "谷雨",
  "立夏",
  "小满",
  "芒种",
  "夏至",
  "小暑",
  "大暑",
  "立秋",
  "处暑",
  "白露",
  "秋分",
  "寒露",
  "霜降",
  "立冬",
  "小雪",
  "大雪",
  "冬至",
];

// 月令对应节气
export const monthJieqi: { [key: number]: [string, string] } = {
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

// 从JSON文件导入节气数据库
// 在Next.js中，我们需要动态加载数据
// 这里使用一个异步函数来加载数据
// 初始化一个默认数据，以防加载失败
let jieqiDatabase: JieqiDatabase = {
  "2023": {
    小寒: [1, 5],
    大寒: [1, 20],
    立春: [2, 4],
    雨水: [2, 19],
    惊蛰: [3, 6],
    春分: [3, 21],
    清明: [4, 5],
    谷雨: [4, 20],
    立夏: [5, 6],
    小满: [5, 21],
    芒种: [6, 6],
    夏至: [6, 21],
    小暑: [7, 7],
    大暑: [7, 23],
    立秋: [8, 8],
    处暑: [8, 23],
    白露: [9, 8],
    秋分: [9, 23],
    寒露: [10, 8],
    霜降: [10, 24],
    立冬: [11, 8],
    小雪: [11, 22],
    大雪: [12, 7],
    冬至: [12, 22],
  },
};

// 初始化函数，在应用启动时调用
export async function initJieqiDatabase(): Promise<void> {
  try {
    // 在服务器端
    if (typeof window === "undefined") {
      // 使用fs模块读取文件
      const fs = require("fs");
      const path = require("path");
      const filePath = path.join(
        process.cwd(),
        "public/data/jieqi-database.json"
      );
      const jsonData = fs.readFileSync(filePath, "utf8");
      jieqiDatabase = JSON.parse(jsonData);
    } else {
      // 在客户端
      const response = await fetch("/data/jieqi-database.json");
      jieqiDatabase = await response.json();
    }
    console.log("节气数据库加载成功");
  } catch (error) {
    console.error("加载节气数据库失败:", error);
    // 数据库已经有默认值，不需要再次设置
  }
}

// 初始化数据库（在服务器端预加载）
if (typeof window === "undefined") {
  initJieqiDatabase().catch(console.error);
}

// 获取指定年份的节气日期
export function getJieqiDate(year: number, jieqiName: string): Date | null {
  const yearStr = year.toString();

  // 如果数据库中有该年份的数据
  if (jieqiDatabase[yearStr] && jieqiDatabase[yearStr][jieqiName]) {
    const [month, day] = jieqiDatabase[yearStr][jieqiName];
    return new Date(year, month - 1, day);
  }

  // 如果没有该年份的数据，寻找最近的年份数据
  const years = Object.keys(jieqiDatabase)
    .map(Number)
    .sort((a, b) => a - b);
  let closestYear = years[0];

  for (const y of years) {
    if (Math.abs(y - year) < Math.abs(closestYear - year)) {
      closestYear = y;
    }
  }

  console.warn(`使用${closestYear}年节气数据作为${year}年${jieqiName}的近似值`);

  if (
    jieqiDatabase[closestYear.toString()] &&
    jieqiDatabase[closestYear.toString()][jieqiName]
  ) {
    const [month, day] = jieqiDatabase[closestYear.toString()][jieqiName];
    return new Date(year, month - 1, day);
  }

  console.error(`节气数据不存在: ${year}年 ${jieqiName}`);
  return null;
}

// 获取换月节气（每月的第二个节气，如雨水、春分等）
export function getMonthChangeJieqi(
  year: number,
  month: number
): { name: string; date: Date } | null {
  if (!monthJieqi[month]) return null;

  const jieqiName = monthJieqi[month][1]; // 取每月第二个节气
  const date = getJieqiDate(year, jieqiName);

  return date ? { name: jieqiName, date } : null;
}

// 获取下一个换月节气
export function getNextMonthChangeJieqi(
  birthDate: Date
): { name: string; date: Date } | null {
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;

  // 先尝试当月的换月节气
  const currentMonthJieqi = getMonthChangeJieqi(year, month);

  // 如果当月换月节气在出生日期之后，则返回当月节气
  if (currentMonthJieqi && currentMonthJieqi.date > birthDate) {
    return currentMonthJieqi;
  }

  // 否则返回下月换月节气
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  return getMonthChangeJieqi(nextYear, nextMonth);
}

// 获取上一个换月节气
export function getPrevMonthChangeJieqi(
  birthDate: Date
): { name: string; date: Date } | null {
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;

  // 先尝试当月的换月节气
  const currentMonthJieqi = getMonthChangeJieqi(year, month);

  // 如果当月换月节气在出生日期之前，则返回当月节气
  if (currentMonthJieqi && currentMonthJieqi.date < birthDate) {
    return currentMonthJieqi;
  }

  // 否则返回上月换月节气
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;

  return getMonthChangeJieqi(prevYear, prevMonth);
}

// 导出默认数据库
export default jieqiDatabase;
