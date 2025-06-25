"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { shenshaData, shenshaLevels, jieshaMethods } from "@/data/shensha"
import { AlertTriangle, CheckCircle, Info, Zap } from "lucide-react"

interface BaziInput {
  year: string
  month: string
  day: string
  hour: string
}

interface ShenshaResult {
  name: string
  found: boolean
  position: string[]
  analysis: string
  suggestion: string
}

type ShenshaName = keyof typeof shenshaData

export default function MingpanShenshaAnalyzer() {
  const [baziInput, setBaziInput] = useState<BaziInput>({
    year: "甲子",
    month: "丙寅",
    day: "戊午",
    hour: "癸亥",
  })
  const [analysisResult, setAnalysisResult] = useState<ShenshaResult[]>([])
  const [selectedShensha, setSelectedShensha] = useState<ShenshaName | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // 分析神煞
  const analyzeShensha = () => {
    setIsAnalyzing(true)

    // 模拟分析过程
    setTimeout(() => {
      const results: ShenshaResult[] = []
      const dayGan = baziInput.day[0]
      const allZhi = [baziInput.year[1], baziInput.month[1], baziInput.day[1], baziInput.hour[1]]

      Object.entries(shenshaData).forEach(([name, data]) => {
        let found = false
        const positions: string[] = []

        // 检查是否命中神煞
        if (data.judgment.details[dayGan as keyof typeof data.judgment.details]) {
          const targetZhi = data.judgment.details[dayGan as keyof typeof data.judgment.details] as string[]
          allZhi.forEach((zhi, index) => {
            if (targetZhi.includes(zhi)) {
              found = true
              positions.push(["年支", "月支", "日支", "时支"][index])
            }
          })
        }

        // 特殊处理一些神煞（如桃花、劫煞等）
        if (name === "桃花") {
          const yearZhi = baziInput.year[1]
          if (["申", "子", "辰"].includes(yearZhi) && allZhi.includes("酉")) {
            found = true
            positions.push("桃花位")
          }
        }

        results.push({
          name,
          found,
          position: positions,
          analysis: found
            ? `${dayGan}日干在${positions.join("、")}见${name}，${data.description}`
            : `${dayGan}日干未见${name}`,
          suggestion: found ? (data.level.includes("凶") ? "需要注意化解" : "可以善加利用") : "此神煞不在命中",
        })
      })

      setAnalysisResult(results)
      setIsAnalyzing(false)
    }, 1500)
  }

  // 获取命中的神煞
  const foundShensha = analysisResult.filter((result: ShenshaResult) => result.found)
  const notFoundShensha = analysisResult.filter((result: ShenshaResult) => !result.found)

  // 按类型分类命中的神煞
  const categorizedShensha = {
    贵人: foundShensha.filter((s: ShenshaResult) => shenshaData[s.name as ShenshaName].category === "贵人类"),
    学业: foundShensha.filter((s: ShenshaResult) => shenshaData[s.name as ShenshaName].category === "学业类"),
    情感: foundShensha.filter((s: ShenshaResult) => shenshaData[s.name as ShenshaName].category === "情感类"),
    凶煞: foundShensha.filter((s: ShenshaResult) => shenshaData[s.name as ShenshaName].category === "凶煞类"),
    孤独: foundShensha.filter((s: ShenshaResult) => shenshaData[s.name as ShenshaName].category === "孤独类"),
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>命盘神煞自动标注器</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 左侧：八字输入 */}
            <div className="space-y-4">
              <h4 className="font-semibold">八字输入</h4>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="text-xs text-gray-600">年柱</label>
                  <Input
                    value={baziInput.year}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBaziInput({ ...baziInput, year: e.target.value })}
                    className="text-center"
                    placeholder="甲子"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">月柱</label>
                  <Input
                    value={baziInput.month}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBaziInput({ ...baziInput, month: e.target.value })}
                    className="text-center"
                    placeholder="丙寅"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">日柱</label>
                  <Input
                    value={baziInput.day}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBaziInput({ ...baziInput, day: e.target.value })}
                    className="text-center font-bold"
                    placeholder="戊午"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">时柱</label>
                  <Input
                    value={baziInput.hour}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBaziInput({ ...baziInput, hour: e.target.value })}
                    className="text-center"
                    placeholder="癸亥"
                  />
                </div>
              </div>

              <Button onClick={analyzeShensha} disabled={isAnalyzing} className="w-full">
                {isAnalyzing ? "分析中..." : "开始分析神煞"}
              </Button>

              {/* 预设命例 */}
              <div className="space-y-2">
                <h5 className="font-medium text-sm">预设命例</h5>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBaziInput({ year: "甲子", month: "丙寅", day: "戊午", hour: "癸亥" })}
                  >
                    贵人多例
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBaziInput({ year: "乙酉", month: "戊子", day: "甲卯", hour: "丙寅" })}
                  >
                    桃花羊刃例
                  </Button>
                </div>
              </div>
            </div>

            {/* 右侧：分析统计 */}
            <div className="space-y-4">
              <h4 className="font-semibold">神煞统计</h4>
              {analysisResult.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{foundShensha.length}</div>
                    <div className="text-sm text-green-700">命中神煞</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-600">{notFoundShensha.length}</div>
                    <div className="text-sm text-gray-700">未中神煞</div>
                  </div>
                </div>
              )}

              {/* 神煞分布 */}
              {foundShensha.length > 0 && (
                <div className="space-y-3">
                  <h5 className="font-medium text-sm">神煞分布</h5>
                  {Object.entries(categorizedShensha).map(
                    ([category, shenshalist]) =>
                      shenshalist.length > 0 && (
                        <div key={category} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium">{category}类：</span>
                          <div className="flex space-x-1">
                            {shenshalist.map((s: ShenshaResult) => (
                              <span key={s.name} className="text-lg">
                                {shenshaData[s.name as ShenshaName].icon}
                              </span>
                            ))}
                          </div>
                        </div>
                      ),
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 分析结果 */}
      {analysisResult.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 命中神煞 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>命中神煞 ({foundShensha.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {foundShensha.map((result: ShenshaResult) => {
                  const data = shenshaData[result.name as ShenshaName]
                  const levelStyle = shenshaLevels[data.level as keyof typeof shenshaLevels]

                  return (
                    <div
                      key={result.name}
                      className="p-3 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedShensha(selectedShensha === result.name ? null : result.name as ShenshaName)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{data.icon}</span>
                          <span className="font-medium">{result.name}</span>
                        </div>
                        <Badge
                          className="text-xs"
                          style={{
                            backgroundColor: levelStyle.bgColor,
                            color: levelStyle.textColor,
                          }}
                        >
                          {data.level}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">位置：{result.position.join("、")}</div>
                      <div className="text-xs text-gray-500">{result.suggestion}</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* 未中神煞 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-gray-600" />
                <span>未中神煞 ({notFoundShensha.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {notFoundShensha.map((result: ShenshaResult) => {
                  const data = shenshaData[result.name as ShenshaName]

                  return (
                    <div key={result.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg opacity-50">{data.icon}</span>
                        <span className="text-sm text-gray-600">{result.name}</span>
                      </div>
                      <Badge className="text-xs">
                        {data.category}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 详细分析卡片 */}
      {selectedShensha && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <span className="text-3xl">{shenshaData[selectedShensha as ShenshaName].icon}</span>
              <span>{selectedShensha} · 详细分析</span>
              <Badge
                className="text-xs"
                style={{
                  backgroundColor:
                    shenshaLevels[shenshaData[selectedShensha as ShenshaName].level as keyof typeof shenshaLevels].bgColor,
                  color: shenshaLevels[shenshaData[selectedShensha as ShenshaName].level as keyof typeof shenshaLevels].textColor,
                }}
              >
                {shenshaData[selectedShensha as ShenshaName].level}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 判断过程 */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">判断过程</h4>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-800 mb-2">分析步骤</div>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>1. 日干为：{baziInput.day[0]}</div>
                    <div>2. 查找规则：{shenshaData[selectedShensha as ShenshaName].judgment.rule}</div>
                    <div>
                      {"3. 对照地支："}
                      {(() => {
                        const dayGan = baziInput.day[0] as keyof typeof shenshaData[typeof selectedShensha]['judgment']['details']
                        const targetZhi = shenshaData[selectedShensha as ShenshaName].judgment.details[dayGan]
                        return Array.isArray(targetZhi) ? targetZhi.join("、") : "无"
                      })()}
                    </div>
                    <div>4. 结果：{analysisResult.find((r: ShenshaResult) => r.name === selectedShensha)?.analysis}</div>
                  </div>
                </div>

                {/* 与命局关系 */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-800 mb-2">与命局关系</div>
                  <div className="text-sm text-green-700">
                    {analysisResult.find((r: ShenshaResult) => r.name === selectedShensha)?.suggestion}
                  </div>
                </div>
              </div>

              {/* 解煞建议 */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">应对建议</h4>

                {shenshaData[selectedShensha as ShenshaName].level.includes("凶") &&
                  jieshaMethods[selectedShensha as keyof typeof jieshaMethods] && (
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-3">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <div className="font-medium text-red-800">解煞方法</div>
                      </div>
                      <div className="space-y-2">
                        {jieshaMethods[selectedShensha as keyof typeof jieshaMethods].methods.map((method: string) => (
                          <div key={method} className="text-sm">
                            <div className="font-medium text-red-700">{method}</div>
                            <div className="text-red-600 text-xs">
                              {jieshaMethods[selectedShensha as keyof typeof jieshaMethods].details[method as keyof typeof jieshaMethods[typeof selectedShensha]['details']]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {!shenshaData[selectedShensha as ShenshaName].level.includes("凶") && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <Zap className="w-4 h-4 text-green-600" />
                      <div className="font-medium text-green-800">发挥建议</div>
                    </div>
                    <div className="text-sm text-green-700 space-y-1">
                      {shenshaData[selectedShensha as ShenshaName].effects.positive.map((effect: string) => (
                        <div key={effect}>• {effect}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 注意事项 */}
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="font-medium text-yellow-800 mb-2">注意事项</div>
                  <div className="text-sm text-yellow-700 space-y-1">
                    {shenshaData[selectedShensha as ShenshaName].effects.neutral.map((note: string) => (
                      <div key={note}>• {note}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
