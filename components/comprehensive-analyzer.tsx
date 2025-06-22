"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { comprehensiveAnalysis, keyYearsPrediction } from "@/data/liulian-dayun"
import { TrendingUp, Target, Calendar, Zap } from "lucide-react"

interface AnalysisQuery {
  year: number
  focus: string
  dayMaster: string
}

export default function ComprehensiveAnalyzer() {
  const [query, setQuery] = useState<AnalysisQuery>({
    year: 2024,
    focus: "综合",
    dayMaster: "戊土"
  })
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [keyYears, setKeyYears] = useState<any[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const performAnalysis = () => {
    setIsAnalyzing(true)
    
    setTimeout(() => {
      const result = comprehensiveAnalysis(query)
      const keyYearsResult = keyYearsPrediction(query.dayMaster)
      
      setAnalysisResult(result)
      setKeyYears(keyYearsResult)
      setIsAnalyzing(false)
    }, 1500)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981"
    if (score >= 60) return "#f59e0b"
    return "#ef4444"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="w-4 h-4" />
    if (score >= 60) return <Target className="w-4 h-4" />
    return <Zap className="w-4 h-4" />
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>综合推演分析</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 左侧：查询设置 */}
            <div className="space-y-4">
              <h4 className="font-semibold">分析设置</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">分析年份</label>
                  <Input
                    type="number"
                    value={query.year}
                    onChange={(e) => setQuery({ ...query, year: parseInt(e.target.value) })}
                    placeholder="2024"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">日主</label>
                  <Select value={query.dayMaster} onValueChange={(value) => setQuery({ ...query, dayMaster: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="甲木">甲木</SelectItem>
                      <SelectItem value="乙木">乙木</SelectItem>
                      <SelectItem value="丙火">丙火</SelectItem>
                      <SelectItem value="丁火">丁火</SelectItem>
                      <SelectItem value="戊土">戊土</SelectItem>
                      <SelectItem value="己土">己土</SelectItem>
                      <SelectItem value="庚金">庚金</SelectItem>
                      <SelectItem value="辛金">辛金</SelectItem>
                      <SelectItem value="壬水">壬水</SelectItem>
                      <SelectItem value="癸水">癸水</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">分析重点</label>
                <Select value={query.focus} onValueChange={(value) => setQuery({ ...query, focus: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="综合">综合分析</SelectItem>
                    <SelectItem value="事业">事业发展</SelectItem>
                    <SelectItem value="财运">财运分析</SelectItem>
                    <SelectItem value="感情">感情婚姻</SelectItem>
                    <SelectItem value="健康">健康运势</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={performAnalysis} disabled={isAnalyzing} className="w-full">
                {isAnalyzing ? "分析中..." : "开始综合分析"}
              </Button>
            </div>

            {/* 右侧：快速预览 */}
            <div className="space-y-4">
              <h4 className="font-semibold">未来五年关键流年</h4>
              {keyYears.length > 0 ? (
                <div className="space-y-2">
                  {keyYears.slice(0, 5).map((year, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{year.year}年</span>
                        <Badge 
                          style={{ 
                            backgroundColor: year.type === "吉年" ? "#10b981" : year.type === "凶年" ? "#ef4444" : "#f59e0b",
                            color: "white"
                          }}
                        >
                          {year.type}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-600">{year.reason}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>点击分析按钮查看关键流年</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 综合分析结果 */}
      {analysisResult && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 五行喜忌分析 */}
          <Card>
            <CardHeader>
              <CardTitle>五行喜忌分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-800 mb-2">命盘结构</div>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>日主：{analysisResult.dayMaster}</div>
                    <div>身强弱：{analysisResult.bodyStrength}</div>
                    <div>格局：{analysisResult.pattern}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-green-50 rounded">
                    <div className="font-medium text-green-800 mb-1">喜用神</div>
                    <div className="flex flex-wrap gap-1">
                      {analysisResult.favorableElements?.map((element: string, index: number) => (
                        <Badge key={index} className="bg-green-100 text-green-800 text-xs">
                          {element}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-red-50 rounded">
                    <div className="font-medium text-red-800 mb-1">忌神</div>
                    <div className="flex flex-wrap gap-1">
                      {analysisResult.unfavorableElements?.map((element: string, index: number) => (
                        <Badge key={index} className="bg-red-100 text-red-800 text-xs">
                          {element}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="font-medium text-yellow-800 mb-2">流年与用神关系</div>
                  <div className="text-sm text-yellow-700">
                    {analysisResult.yearElementRelation}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 综合评分 */}
          <Card>
            <CardHeader>
              <CardTitle>综合评分</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className="text-3xl font-bold mb-2" style={{ color: getScoreColor(analysisResult.overallScore) }}>
                    {analysisResult.overallScore}分
                  </div>
                  <div className="text-sm text-gray-600">综合运势评分</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(analysisResult.detailedScores || {}).map(([aspect, score]: [string, any]) => (
                    <div key={aspect} className="p-3 bg-gray-50 rounded text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        {getScoreIcon(score)}
                        <span className="font-bold" style={{ color: getScoreColor(score) }}>
                          {score}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">{aspect}</div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg">
                  <div className="font-medium text-indigo-800 mb-2">综合建议</div>
                  <div className="text-sm text-indigo-700">
                    {analysisResult.overallAdvice}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 详细建议 */}
      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle>详细建议与指导</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="font-medium text-yellow-800 mb-3 flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>事业发展</span>
                </div>
                <div className="space-y-2 text-sm text-yellow-700">
                  {analysisResult.careerAdvice?.map((advice: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-yellow-500 rounded-full mt-2"></div>
                      <span>{advice}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-medium text-green-800 mb-3 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>财运理财</span>
                </div>
                <div className="space-y-2 text-sm text-green-700">
                  {analysisResult.wealthAdvice?.map((advice: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full mt-2"></div>
                      <span>{advice}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-pink-50 rounded-lg">
                <div className="font-medium text-pink-800 mb-3 flex items-center space-x-2">
                  <span>💕</span>
                  <span>感情婚姻</span>
                </div>
                <div className="space-y-2 text-sm text-pink-700">
                  {analysisResult.loveAdvice?.map((advice: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-pink-500 rounded-full mt-2"></div>
                      <span>{advice}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-indigo-50 rounded-lg">
                <div className="font-medium text-indigo-800 mb-3 flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>健康养生</span>
                </div>
                <div className="space-y-2 text-sm text-indigo-700">
                  {analysisResult.healthAdvice?.map((advice: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-indigo-500 rounded-full mt-2"></div>
                      <span>{advice}</span>
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