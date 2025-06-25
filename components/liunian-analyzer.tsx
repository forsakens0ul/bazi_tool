"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { liunianData, analyzeLiunian, specialMarks } from "@/data/liulian-dayun"
import { Calendar, Search, AlertTriangle, Heart, Star } from "lucide-react"

export default function LiunianAnalyzer() {
  const [selectedYear, setSelectedYear] = useState<number>(2024)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [quickYears, setQuickYears] = useState<number[]>([])

  const analyzeYear = () => {
    const result = analyzeLiunian(selectedYear)
    setAnalysisResult(result)
  }

  const generateQuickYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = -2; i <= 5; i++) {
      years.push(currentYear + i)
    }
    setQuickYears(years)
  }

  const getSpecialMarkIcon = (mark: string) => {
    switch (mark) {
      case "桃花年": return <Heart className="w-4 h-4 text-pink-500" />
      case "冲太岁": return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "三合年": return <Star className="w-4 h-4 text-yellow-500" />
      default: return <Star className="w-4 h-4 text-blue-500" />
    }
  }

  useState(() => {
    generateQuickYears()
    analyzeYear()
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>流年影响分析</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 左侧：年份选择 */}
            <div className="space-y-4">
              <h4 className="font-semibold">年份选择</h4>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  placeholder="输入年份"
                  className="flex-1"
                />
                <Button onClick={analyzeYear}>
                  分析
                </Button>
              </div>

              <div>
                <h5 className="font-medium mb-2 text-sm">快速选择</h5>
                <div className="grid grid-cols-4 gap-2">
                  {quickYears.map((year) => (
                    <Button
                      key={year}
                      variant={selectedYear === year ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedYear(year)
                        const result = analyzeLiunian(year)
                        setAnalysisResult(result)
                      }}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* 右侧：基本信息 */}
            <div className="space-y-4">
              <h4 className="font-semibold">流年基本信息</h4>
              {analysisResult && (
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold">{analysisResult.ganzhi}</span>
                      <Badge className="bg-blue-500 text-white">
                        {selectedYear}年
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>天干：{analysisResult.tiangan}</div>
                      <div>地支：{analysisResult.dizhi}</div>
                      <div>纳音：{analysisResult.nayin}</div>
                      <div>生肖：{analysisResult.shengxiao}</div>
                    </div>
                  </div>

                  {/* 特殊标记 */}
                  {analysisResult.specialMarks && analysisResult.specialMarks.length > 0 && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-medium text-yellow-800 mb-2">特殊标记</div>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.specialMarks.map((mark: string, index: number) => (
                          <div key={index} className="flex items-center space-x-1">
                            {getSpecialMarkIcon(mark)}
                            <Badge variant="outline" className="text-xs">
                              {mark}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 详细分析结果 */}
      {analysisResult && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 五行分析 */}
          <Card>
            <CardHeader>
              <CardTitle>五行流通分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-800 mb-2">与日主关系</div>
                  <div className="text-sm text-green-700">
                    天干：{analysisResult.tianganRelation}
                  </div>
                  <div className="text-sm text-green-700">
                    地支：{analysisResult.dizhiRelation}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-800 mb-2">五行流通</div>
                  <div className="text-sm text-blue-700">
                    {analysisResult.wuxingFlow}
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="font-medium text-purple-800 mb-2">十神作用</div>
                  <div className="text-sm text-purple-700">
                    {analysisResult.shishenEffect}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 运势分析 */}
          <Card>
            <CardHeader>
              <CardTitle>运势影响分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-green-50 rounded text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {analysisResult.overallScore}
                    </div>
                    <div className="text-xs text-green-700">综合评分</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {analysisResult.favorability}
                    </div>
                    <div className="text-xs text-blue-700">总体趋势</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded">
                    <div className="font-medium text-yellow-800 mb-1">事业运势</div>
                    <div className="text-sm text-yellow-700">
                      {analysisResult.careerFortune}
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded">
                    <div className="font-medium text-green-800 mb-1">财运分析</div>
                    <div className="text-sm text-green-700">
                      {analysisResult.wealthFortune}
                    </div>
                  </div>
                  <div className="p-3 bg-pink-50 rounded">
                    <div className="font-medium text-pink-800 mb-1">感情运势</div>
                    <div className="text-sm text-pink-700">
                      {analysisResult.loveFortune}
                    </div>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded">
                    <div className="font-medium text-indigo-800 mb-1">健康运势</div>
                    <div className="text-sm text-indigo-700">
                      {analysisResult.healthFortune}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 建议与提醒 */}
      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle>年度建议与提醒</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-green-800">有利方面</h4>
                <div className="space-y-2">
                  {analysisResult.positiveAdvice?.map((advice: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-sm text-gray-700">{advice}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-red-800">注意事项</h4>
                <div className="space-y-2">
                  {analysisResult.cautionAdvice?.map((advice: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span className="text-sm text-gray-700">{advice}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}