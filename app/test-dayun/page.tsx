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
import { calculateDayun, tianganList } from "@/data/liulian-dayun";
import { testDayunCalculation } from "@/data/dayun-calculator";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface TestCase {
  year: number;
  month: number;
  day: number;
  hour: number;
  gender: "男" | "女";
  description?: string;
}

export default function TestDayunPage() {
  const [birthInfo, setBirthInfo] = useState({
    year: 1990,
    month: 6,
    day: 15,
    hour: 0, // 默认子时
    gender: "男",
  });
  const [dayunList, setDayunList] = useState<any[]>([]);
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [customCase, setCustomCase] = useState<TestCase>({
    year: 1990,
    month: 6,
    day: 15,
    hour: 0,
    gender: "男",
  });

  const predefinedCases: TestCase[] = [
    {
      year: 1990,
      month: 6,
      day: 15,
      hour: 0,
      gender: "男",
      description: "1990年6月15日，男，子时",
    },
    {
      year: 1980,
      month: 3,
      day: 5,
      hour: 12,
      gender: "女",
      description: "1980年3月5日，女，午时",
    },
    {
      year: 2000,
      month: 10,
      day: 10,
      hour: 8,
      gender: "男",
      description: "2000年10月10日，男，辰时",
    },
  ];

  const calculateTest = () => {
    const { year, month, day, hour, gender } = birthInfo;

    // 计算年干索引和天干
    const yearGanIndex = (year - 4) % 10;
    const yearGan = tianganList[yearGanIndex];
    const isYangYear = yearGanIndex % 2 === 0;
    const direction =
      (isYangYear && gender === "男") || (!isYangYear && gender === "女")
        ? "顺排"
        : "逆排";

    // 计算大运
    const result = calculateDayun(birthInfo);

    setDayunList(result);
    setDebugInfo({
      yearGanIndex,
      yearGan,
      isYangYear,
      direction,
    });
  };

  const runTest = () => {
    setLoading(true);
    try {
      const results = testDayunCalculation(customCase);
      console.log("测试结果:", results);
      setTestResults(results);
    } catch (error) {
      console.error("测试出错:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof TestCase, value: any) => {
    setCustomCase((prev) => ({
      ...prev,
      [field]: field === "gender" ? value : Number(value),
    }));
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold mb-4">大运计算测试</h1>

      <Card>
        <CardHeader>
          <CardTitle>输入信息</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-600">年份</label>
              <Input
                type="number"
                value={birthInfo.year}
                onChange={(e) =>
                  setBirthInfo({ ...birthInfo, year: parseInt(e.target.value) })
                }
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
                  setBirthInfo({ ...birthInfo, day: parseInt(e.target.value) })
                }
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
                    <SelectItem key={time.value} value={time.value.toString()}>
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
                  variant={birthInfo.gender === "男" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBirthInfo({ ...birthInfo, gender: "男" })}
                >
                  男
                </Button>
                <Button
                  variant={birthInfo.gender === "女" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBirthInfo({ ...birthInfo, gender: "女" })}
                >
                  女
                </Button>
              </div>
            </div>
          </div>

          <Button onClick={calculateTest} className="w-full">
            计算大运
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>调试信息</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div>
              年干索引: {debugInfo.yearGanIndex} ({debugInfo.yearGan})
            </div>
            <div>是否阳年: {debugInfo.isYangYear ? "是" : "否"}</div>
            <div>排盘方向: {debugInfo.direction}</div>
            <div>
              时辰:{" "}
              {timeMap.find((t) => t.value === birthInfo.hour)?.label || "未知"}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>大运结果</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dayunList.map((dayun, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold">
                    {dayun.startAge}-{dayun.endAge}岁
                  </div>
                  <div className="text-xl">{dayun.ganzhi}</div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {dayun.startYear}-{dayun.endYear}年
                </div>
                {dayun.bazi && (
                  <div className="mt-2 text-sm text-blue-600">
                    八字: {dayun.bazi}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2025年6月25日子时男性预期结果</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>八字: 乙巳 壬午 丙申 戊子</div>
            <div>排盘方向: 逆排（阴年男命）</div>
            <div>起运时间: 1岁4个月</div>
            <div>大运顺序:</div>
            <div>1-11岁: 辛巳（金火）</div>
            <div>11-21岁: 庚辰（金土）</div>
            <div>21-31岁: 己卯（土木）</div>
            <div>31-41岁: 戊寅（土木）</div>
            <div>41-51岁: 丁丑（火土）</div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <Button onClick={runTest} disabled={loading}>
          {loading ? "测试中..." : "运行测试"}
        </Button>
      </div>

      <Tabs defaultValue="predefined" className="mb-6">
        <TabsList>
          <TabsTrigger value="predefined">预设案例</TabsTrigger>
          <TabsTrigger value="custom">自定义案例</TabsTrigger>
        </TabsList>

        <TabsContent value="predefined">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {predefinedCases.map((testCase, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-lg">
                    {testCase.description}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">出生日期：</span>
                      {testCase.year}年{testCase.month}月{testCase.day}日
                    </div>
                    <div>
                      <span className="font-medium">出生时辰：</span>
                      {testCase.hour}时
                    </div>
                    <div>
                      <span className="font-medium">性别：</span>
                      {testCase.gender}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCustomCase(testCase);
                        // 自动运行测试
                        setTimeout(() => {
                          const results = testDayunCalculation(testCase);
                          setTestResults(results);
                        }, 100);
                      }}
                    >
                      使用此案例
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>自定义测试案例</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">年份</Label>
                  <Input
                    id="year"
                    value={customCase.year}
                    onChange={(e) => handleInputChange("year", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="month">月份</Label>
                  <Input
                    id="month"
                    value={customCase.month}
                    onChange={(e) => handleInputChange("month", e.target.value)}
                    max="12"
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="day">日期</Label>
                  <Input
                    id="day"
                    value={customCase.day}
                    onChange={(e) => handleInputChange("day", e.target.value)}
                    max="31"
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hour">时辰（小时）</Label>
                  <Input
                    id="hour"
                    value={customCase.hour}
                    onChange={(e) => handleInputChange("hour", e.target.value)}
                    max="23"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">性别</Label>
                  <Select
                    value={customCase.gender}
                    onValueChange={(value) =>
                      handleInputChange("gender", value as "男" | "女")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择性别" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="男">男</SelectItem>
                      <SelectItem value="女">女</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4">
                <Button onClick={runTest} disabled={loading}>
                  {loading ? "计算中..." : "计算大运"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {testResults && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">测试结果</h2>

          <div className="overflow-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">大运</th>
                  <th className="py-2 px-4 border-b">年龄范围</th>
                  <th className="py-2 px-4 border-b">年份范围</th>
                  <th className="py-2 px-4 border-b">天干五行</th>
                  <th className="py-2 px-4 border-b">地支五行</th>
                  <th className="py-2 px-4 border-b">十神</th>
                  <th className="py-2 px-4 border-b">吉凶</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map((dayun: any, index: number) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="py-2 px-4 border-b font-medium">
                      {dayun.ganzhi}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {dayun.startAge}岁-{dayun.endAge}岁
                    </td>
                    <td className="py-2 px-4 border-b">
                      {dayun.startYear}年-{dayun.endYear}年
                    </td>
                    <td className="py-2 px-4 border-b">
                      {dayun.tianganWuxing}
                    </td>
                    <td className="py-2 px-4 border-b">{dayun.dizhiWuxing}</td>
                    <td className="py-2 px-4 border-b">{dayun.shishen}</td>
                    <td className="py-2 px-4 border-b">
                      <Badge
                        variant={
                          dayun.favorability === "有利"
                            ? "default"
                            : dayun.favorability === "中性"
                            ? "outline"
                            : "destructive"
                        }
                      >
                        {dayun.favorability}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-md">
            <h3 className="font-bold mb-2">大运信息</h3>
            <div className="space-y-2">
              <div>
                <span className="font-medium">八字：</span>
                {testResults[0].bazi}
              </div>
              <div>
                <span className="font-medium">大运方向：</span>
                {testResults[0].direction === "forward" ? "顺排" : "逆排"}
              </div>
              <div>
                <span className="font-medium">起运年龄：</span>
                {testResults[0].startAge}岁{testResults[0].startingMonths}个月
                {testResults[0].startingDays}天
              </div>
              <div>
                <span className="font-medium">大运序列：</span>
                {testResults.map((d: any) => d.ganzhi).join("、")}
              </div>
              {testResults[0].targetJieqi && (
                <div>
                  <span className="font-medium">参考节气：</span>
                  {testResults[0].targetJieqi.name} (
                  {new Date(
                    testResults[0].targetJieqi.date
                  ).toLocaleDateString()}
                  )
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
