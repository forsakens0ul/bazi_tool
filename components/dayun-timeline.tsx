"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  dayunData,
  calculateDayun,
  dizhiList,
  tianganList,
  analyzeLiunian,
} from "@/data/liulian-dayun";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Calendar as CalendarIcon,
  Activity,
} from "lucide-react";
import { analyzeLiunianWithDayun, DayunInfo } from "@/data/dayun-calculator";

interface BirthInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  gender: "男" | "女";
}

// 流年分析结果接口
interface LiunianAnalysisResult {
  tianganRelation: string;
  dizhiRelation: string;
  overallEffect: string;
  ganzhi: string;
  year: number;
  basicInfo?: any;
}

// 时辰映射表
const timeMap = [
  { value: 0, label: "子时 (23:00-01:00)" },
  { value: 1, label: "丑时 (01:00-03:00)" },
  { value: 2, label: "寅时 (03:00-05:00)" },
  { value: 3, label: "卯时 (05:00-07:00)" },
  { value: 4, label: "辰时 (07:00-09:00)" },
  { value: 5, label: "巳时 (09:00-11:00)" },
  { value: 6, label: "午时 (11:00-13:00)" },
  { value: 7, label: "未时 (13:00-15:00)" },
  { value: 8, label: "申时 (15:00-17:00)" },
  { value: 9, label: "酉时 (17:00-19:00)" },
  { value: 10, label: "戌时 (19:00-21:00)" },
  { value: 11, label: "亥时 (21:00-23:00)" },
];

// 新增流年分析组件
const LiunianAnalyzer = ({
  dayunInfo,
  currentYear = new Date().getFullYear(),
}: {
  dayunInfo: DayunInfo;
  currentYear?: number;
}) => {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [liunianAnalysis, setLiunianAnalysis] =
    useState<LiunianAnalysisResult | null>(null);

  // 计算干支
  const calculateGanzhi = (year: number): string => {
    const ganIndex = (year - 4) % 10;
    const zhiIndex = (year - 4) % 12;
    return tianganList[ganIndex] + dizhiList[zhiIndex];
  };

  const analyzeLiunianForYear = () => {
    const liunianGanzhi = calculateGanzhi(selectedYear);
    const analysis = analyzeLiunianWithDayun(dayunInfo, liunianGanzhi);

    // 获取流年基本信息
    const liunianBasic = analyzeLiunian(selectedYear);

    setLiunianAnalysis({
      ...analysis,
      ganzhi: liunianGanzhi,
      year: selectedYear,
      basicInfo: liunianBasic,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="w-24"
        />
        <span>年</span>
        <Button onClick={analyzeLiunianForYear} size="sm">
          分析流年
        </Button>
      </div>

      {liunianAnalysis && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="text-lg font-semibold">
              {liunianAnalysis.year}年 · {liunianAnalysis.ganzhi}
            </div>
            <Badge
              className={
                liunianAnalysis.overallEffect === "有利"
                  ? "bg-green-100 text-green-800"
                  : liunianAnalysis.overallEffect === "不利"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }
            >
              {liunianAnalysis.overallEffect}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="p-2 bg-white rounded border">
              <div className="text-sm text-gray-600">天干关系</div>
              <div className="font-medium">
                {liunianAnalysis.tianganRelation}
              </div>
            </div>
            <div className="p-2 bg-white rounded border">
              <div className="text-sm text-gray-600">地支关系</div>
              <div className="font-medium">{liunianAnalysis.dizhiRelation}</div>
            </div>
          </div>

          {liunianAnalysis.basicInfo && (
            <div className="text-sm space-y-1">
              <div>
                <span className="text-gray-600">五行:</span>{" "}
                {liunianAnalysis.basicInfo.tianganWuxing}
                {liunianAnalysis.basicInfo.dizhiWuxing}
              </div>
              {liunianAnalysis.basicInfo.specialMarks?.length > 0 && (
                <div>
                  <span className="text-gray-600">特殊标记:</span>{" "}
                  {liunianAnalysis.basicInfo.specialMarks.join(", ")}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function DayunTimeline() {
  const [birthInfo, setBirthInfo] = useState<BirthInfo>({
    year: 1990,
    month: 6,
    day: 15,
    hour: 0, // 默认子时
    gender: "男",
  });
  const [selectedDayun, setSelectedDayun] = useState<
    (DayunInfo & { index?: number }) | null
  >(null);
  const [dayunList, setDayunList] = useState<DayunInfo[]>([]);
  const [isCalculated, setIsCalculated] = useState(false);
  const [showLiunianAnalysis, setShowLiunianAnalysis] = useState(false);

  const calculateDayunList = () => {
    const result = calculateDayun(birthInfo);
    setDayunList(result);
    setIsCalculated(true);
  };

  const getDayunColor = (dayun: any) => {
    if (dayun.favorability === "有利") return "#10b981";
    if (dayun.favorability === "不利") return "#ef4444";
    return "#6b7280";
  };

  const getDayunIcon = (dayun: any) => {
    if (dayun.favorability === "有利")
      return <TrendingUp className="w-4 h-4" />;
    if (dayun.favorability === "不利")
      return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>大运排布图</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 左侧：出生信息输入 */}
            <div className="space-y-4">
              <h4 className="font-semibold">出生信息</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">年份</label>
                  <Input
                    type="number"
                    value={birthInfo.year}
                    onChange={(e) =>
                      setBirthInfo({
                        ...birthInfo,
                        year: parseInt(e.target.value),
                      })
                    }
                    placeholder="1990"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">月份</label>
                  <Input
                    type="number"
                    value={birthInfo.month}
                    onChange={(e) =>
                      setBirthInfo({
                        ...birthInfo,
                        month: parseInt(e.target.value),
                      })
                    }
                    placeholder="6"
                    min="1"
                    max="12"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">日期</label>
                  <Input
                    type="number"
                    value={birthInfo.day}
                    onChange={(e) =>
                      setBirthInfo({
                        ...birthInfo,
                        day: parseInt(e.target.value),
                      })
                    }
                    placeholder="15"
                    min="1"
                    max="31"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">时辰</label>
                  <Select
                    value={birthInfo.hour.toString()}
                    onValueChange={(value) =>
                      setBirthInfo({ ...birthInfo, hour: parseInt(value) })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="选择时辰" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeMap.map((time) => (
                        <SelectItem
                          key={time.value}
                          value={time.value.toString()}
                        >
                          {time.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-600">性别</label>
                  <div className="flex space-x-2">
                    <Button
                      variant={
                        birthInfo.gender === "男" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setBirthInfo({ ...birthInfo, gender: "男" })
                      }
                    >
                      男
                    </Button>
                    <Button
                      variant={
                        birthInfo.gender === "女" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setBirthInfo({ ...birthInfo, gender: "女" })
                      }
                    >
                      女
                    </Button>
                  </div>
                </div>
              </div>

              <Button onClick={calculateDayunList} className="w-full">
                计算大运
              </Button>
            </div>

            {/* 右侧：大运概览 */}
            <div className="space-y-4">
              <h4 className="font-semibold">大运概览</h4>
              {isCalculated ? (
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    起运年龄：{dayunList[0]?.startAge}岁
                  </div>
                  <div className="text-sm text-gray-600">
                    八字：{dayunList[0]?.bazi || "未计算"}
                  </div>
                  <div className="text-sm text-gray-600">
                    排盘方式：
                    {dayunList[0]?.direction === "forward" ? "顺排" : "逆排"}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="text-lg font-bold text-green-600">
                        {
                          dayunList.filter((d) => d.favorability === "有利")
                            .length
                        }
                      </div>
                      <div className="text-xs text-green-700">有利大运</div>
                    </div>
                    <div className="text-center p-2 bg-red-50 rounded">
                      <div className="text-lg font-bold text-red-600">
                        {
                          dayunList.filter((d) => d.favorability === "不利")
                            .length
                        }
                      </div>
                      <div className="text-xs text-red-700">不利大运</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>请输入出生信息并计算大运</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 大运时间轴 */}
      {isCalculated && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>大运时间轴</span>
              </div>
              {dayunList[0]?.targetJieqi && (
                <Badge
                  variant="outline"
                  className="flex items-center space-x-1"
                >
                  <CalendarIcon className="w-3 h-3" />
                  <span>起运参考节气: {dayunList[0].targetJieqi.name}</span>
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* 起运信息 */}
            {dayunList[0] && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">起运信息</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">起运年龄:</span>{" "}
                    <span className="font-medium">
                      {dayunList[0].startAge}岁
                      {dayunList[0].startingMonths &&
                        dayunList[0].startingMonths > 0 &&
                        `${dayunList[0].startingMonths}个月`}
                      {dayunList[0].startingDays &&
                        dayunList[0].startingDays > 0 &&
                        `${dayunList[0].startingDays}天`}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">大运排序:</span>{" "}
                    <span className="font-medium">
                      {dayunList[0].direction === "forward" ? "顺排" : "逆排"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">起运公历:</span>{" "}
                    <span className="font-medium">
                      {birthInfo.year + Math.floor(dayunList[0].startAge)}年
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="relative">
              {/* 时间轴线 */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

              <div className="space-y-6">
                {dayunList.map((dayun, index) => (
                  <div
                    key={index}
                    className="relative flex items-start space-x-4"
                  >
                    {/* 时间节点 */}
                    <div
                      className="w-4 h-4 rounded-full border-4 bg-white z-10 cursor-pointer hover:scale-110 transition-transform"
                      style={{ borderColor: getDayunColor(dayun) }}
                      onClick={() =>
                        setSelectedDayun(
                          selectedDayun?.index === index
                            ? null
                            : { ...dayun, index }
                        )
                      }
                    />

                    {/* 大运信息卡片 */}
                    <div
                      className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedDayun?.index === index
                          ? "shadow-lg scale-105"
                          : "hover:shadow-md"
                      }`}
                      style={{
                        borderColor: getDayunColor(dayun),
                        backgroundColor: `${getDayunColor(dayun)}10`,
                      }}
                      onClick={() =>
                        setSelectedDayun(
                          selectedDayun?.index === index
                            ? null
                            : { ...dayun, index }
                        )
                      }
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold">
                            {dayun.ganzhi}
                          </span>
                          <Badge
                            style={{
                              backgroundColor: getDayunColor(dayun),
                              color: "white",
                            }}
                          >
                            {dayun.favorability}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          {getDayunIcon(dayun)}
                          <span>
                            {dayun.startAge} - {dayun.endAge}岁
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">天干：</span>
                          <span className="font-medium">
                            {dayun.tianganWuxing}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">地支：</span>
                          <span className="font-medium">
                            {dayun.dizhiWuxing}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">十神：</span>
                          <span className="font-medium">{dayun.shishen}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">用神：</span>
                          <span className="font-medium">
                            {dayun.yongshenMatch}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 详细分析面板 */}
      {selectedDayun && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold">
                  {selectedDayun.ganzhi}
                </span>
                <span>大运详解</span>
                <Badge
                  style={{
                    backgroundColor: getDayunColor(selectedDayun),
                    color: "white",
                  }}
                >
                  {selectedDayun.favorability}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLiunianAnalysis(!showLiunianAnalysis)}
              >
                <Activity className="w-4 h-4 mr-1" />
                {showLiunianAnalysis ? "隐藏流年分析" : "流年分析"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 左侧：大运分析 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">大运分析</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-800 mb-2">
                        运程时间
                      </div>
                      <div className="text-sm text-blue-700">
                        {selectedDayun.startAge}岁 - {selectedDayun.endAge}岁 (
                        {selectedDayun.startYear} - {selectedDayun.endYear})
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800 mb-2">
                        五行配置
                      </div>
                      <div className="text-sm text-green-700 space-y-1">
                        <div>天干：{selectedDayun.tianganWuxing}</div>
                        <div>地支：{selectedDayun.dizhiWuxing}</div>
                        <div>
                          藏干：{selectedDayun.canggan?.join("、") || "无"}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="font-medium text-purple-800 mb-2">
                        十神关系
                      </div>
                      <div className="text-sm text-purple-700">
                        与日主关系：{selectedDayun.shishen}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 流年分析区域 */}
                {showLiunianAnalysis && (
                  <div>
                    <h4 className="font-semibold mb-4 text-lg flex items-center">
                      <Activity className="w-4 h-4 mr-2" />
                      流年分析
                    </h4>
                    <LiunianAnalyzer dayunInfo={selectedDayun} />
                  </div>
                )}
              </div>

              {/* 右侧：运势预测 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">运势预测</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="font-medium text-yellow-800 mb-2">
                        总体运势
                      </div>
                      <div className="text-sm text-yellow-700">
                        {selectedDayun.analysis}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-green-50 rounded">
                        <div className="font-medium text-green-800 mb-1">
                          事业运
                        </div>
                        <div className="text-sm text-green-700">
                          {selectedDayun.favorability === "有利"
                            ? "发展顺利"
                            : "需要谨慎"}
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded">
                        <div className="font-medium text-blue-800 mb-1">
                          财运
                        </div>
                        <div className="text-sm text-blue-700">
                          {selectedDayun.favorability === "有利"
                            ? "财源广进"
                            : "理财保守"}
                        </div>
                      </div>
                      <div className="p-3 bg-pink-50 rounded">
                        <div className="font-medium text-pink-800 mb-1">
                          感情运
                        </div>
                        <div className="text-sm text-pink-700">
                          {selectedDayun.favorability === "有利"
                            ? "感情和谐"
                            : "需要包容"}
                        </div>
                      </div>
                      <div className="p-3 bg-indigo-50 rounded">
                        <div className="font-medium text-indigo-800 mb-1">
                          健康运
                        </div>
                        <div className="text-sm text-indigo-700">
                          {selectedDayun.favorability === "有利"
                            ? "身体健康"
                            : "注意保养"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
