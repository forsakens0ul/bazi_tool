"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cangganAdvancedData, analyzeCangganStructure } from "@/data/paipan-advanced"
import { Eye, Zap, Target, Search } from "lucide-react"

interface BaziInput {
  year: string
  month: string
  day: string
  hour: string
}

export default function CangganDemonstrator() {
  const [baziInput, setBaziInput] = useState<BaziInput>({
    year: "甲子",
    month: "丙寅",
    day: "戊午",
    hour: "癸亥"
  })
  const [selectedZhi, setSelectedZhi] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [showYongshen, setShowYongshen] = useState(false)

  const handleAnalyze = () => {
    const result = analyzeCangganStructure(baziInput)
    setAnalysisResult(result)
  }

  const handleZhiClick = (zhi: string, position: string) => {
    setSelectedZhi(zhi)
    const zhiData = cangganAdvancedData[zhi as keyof typeof cangganAdvancedData]
    if (zhiData) {
      // 分析该地支的藏干与日主关系
      const dayMaster = baziInput.day[0]
      // 这里可以添加更详细的分析逻辑
    }
  }

  const getCangganColor = (type: string) => {
    const colors = {
      本气: "#10b981",
      中气: "#3b82f6", 
      余气: "#8b5cf6"
    }
    return colors[type as keyof typeof colors] || "#6b7280"
  }

  const getShishenColor = (shishen: string) => {
    const colors = {
      比肩: "#3b82f6", 劫财: "#ef4444", 食神: "#10b981", 伤官: "#f59e0b",
      偏财: "#8b5cf6", 正财: "#059669", 七杀: "#dc2626", 正官: "#1d4ed8",
      偏印: "#7c3aed", 正印: "#16a34a"
    }
    return colors[shishen as keyof typeof colors] || "#6b7280"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>藏干演示系统</span>
          </CardTitle>
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
                    onChange={(e) => setBaziInput({ ...baziInput, year: e.target.value })}
                    className="text-center"
                    placeholder="甲子"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">月柱</label>
                  <Input
                    value={baziInput.month}
                    onChange={(e) => setBaziInput({ ...baziInput, month: e.target.value })}
                    className="text-center"
                    placeholder="丙寅"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">日柱</label>
                  <Input
                    value={baziInput.day}
                    onChange={(e) => setBaziInput({ ...baziInput, day: e.target.value })}
                    className="text-center font-bold"
                    placeholder="戊午"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">时柱</label>
                  <Input
                    value={baziInput.hour}
                    onChange={(e) => setBaziInput({ ...baziInput, hour: e.target.value })}
                    className="text-center"
                    placeholder="癸亥"
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleAnalyze} className="flex-1">
                  分析藏干结构
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowYongshen(!showYongshen)}
                  className="flex items-center space-x-1"
                >
                  <Target className="w-4 h-4" />
                  <span>{showYongshen ? "隐藏" : "显示"}用神</span>
                </Button>
              </div>

              {/* 预设命例 */}
              <div className="space-y-2">
                <h5 className="font-medium text-sm">预设命例</h5>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBaziInput({ year: "甲子", month: "丙寅", day: "戊午", hour: "癸亥" })}
                  >
                    藏干丰富例
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBaziInput({ year: "乙酉", month: "戊子", day: "甲卯", hour: "丙寅" })}
                  >
                    用神藏支例
                  </Button>
                </div>
              </div>
            </div>

            {/* 右侧：四柱展示 */}
            <div className="space-y-4">
              <h4 className="font-semibold">四柱藏干结构</h4>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { key: "year", label: "年柱", value: baziInput.year },
                  { key: "month", label: "月柱", value: baziInput.month },
                  { key: "day", label: "日柱", value: baziInput.day },
                  { key: "hour", label: "时柱", value: baziInput.hour }
                ].map((column) => {
                  const zhi = column.value[1]
                  const zhiData = cangganAdvancedData[zhi as keyof typeof cangganAdvancedData]
                  
                  return (
                    <div key={column.key} className="text-center">
                      <div className="text-xs text-gray-500 mb-1">{column.label}</div>
                      <div 
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedZhi === zhi 
                            ? "border-emerald-400 bg-emerald-50 shadow-md" 
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleZhiClick(zhi, column.key)}
                      >
                        <div className="font-bold text-lg mb-2">{column.value}</div>
                        {zhiData && (
                          <div className="space-y-1">
                            {zhiData.canggan.map((canggan, index) => (
                              <div key={index} className="text-xs">
                                <Badge 
                                  style={{ 
                                    backgroundColor: `${getCangganColor(canggan.type)}20`,
                                    color: getCangganColor(canggan.type),
                                    fontSize: "10px"
                                  }}
                                >
                                  {canggan.gan}({canggan.type})
                                </Badge>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 日主信息 */}
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl font-bold">{baziInput.day[0]}</span>
                  <Badge className="bg-yellow-500 text-white">日主</Badge>
                </div>
                <div className="text-sm text-gray-700">
                  以此为基准分析各地支藏干的十神关系
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 藏干详细分析 */}
      {selectedZhi && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <span className="text-3xl font-bold">{selectedZhi}</span>
              <span>藏干详解</span>
              <Badge className="bg-emerald-500 text-white">地支</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 左侧：藏干结构 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">藏干结构</h4>
                  {cangganAdvancedData[selectedZhi as keyof typeof cangganAdvancedData]?.canggan.map((canggan, index) => (
                    <div key={index} className="p-4 mb-3 rounded-lg border-2" style={{ borderColor: getCangganColor(canggan.type) }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold">{canggan.gan}</span>
                          <Badge style={{ backgroundColor: getCangganColor(canggan.type), color: "white" }}>
                            {canggan.type}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">{canggan.strength}%</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">五行：</span>
                          <span className="font-medium">{canggan.wuxing}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">阴阳：</span>
                          <span className="font-medium">{canggan.yinyang}</span>
                        </div>
                      </div>

                      {/* 与日主关系 */}
                      <div className="mt-3 p-2 bg-gray-50 rounded">
                        <div className="text-xs text-gray-600 mb-1">与日主{baziInput.day[0]}的关系：</div>
                        <Badge style={{ backgroundColor: `${getShishenColor(canggan.shishen)}20`, color: getShishenColor(canggan.shishen) }}>
                          {canggan.shishen}
                        </Badge>
                      </div>

                      {/* 力量条 */}
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${canggan.strength}%`,
                              backgroundColor: getCangganColor(canggan.type)
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 右侧：作用分析 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">作用分析</h4>
                  
                  {/* 十神分布 */}
                  <div className="p-4 bg-blue-50 rounded-lg mb-4">
                    <div className="font-medium text-blue-800 mb-2">十神分布</div>
                    <div className="flex flex-wrap gap-2">
                      {cangganAdvancedData[selectedZhi as keyof typeof cangganAdvancedData]?.canggan.map((canggan, index) => (
                        <Badge 
                          key={index}
                          style={{ 
                            backgroundColor: `${getShishenColor(canggan.shishen)}20`,
                            color: getShishenColor(canggan.shishen)
                          }}
                        >
                          {canggan.shishen} {canggan.strength}%
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* 五行力量 */}
                  <div className="p-4 bg-green-50 rounded-lg mb-4">
                    <div className="font-medium text-green-800 mb-2">五行力量</div>
                    <div className="space-y-2">
                      {cangganAdvancedData[selectedZhi as keyof typeof cangganAdvancedData]?.wuxingDistribution.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{item.wuxing}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full bg-green-500"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600">{item.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 用神标注 */}
                  {showYongshen && (
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="font-medium text-yellow-800 mb-2">用神标注</div>
                      <div className="text-sm text-yellow-700">
                        {cangganAdvancedData[selectedZhi as keyof typeof cangganAdvancedData]?.yongshenAnalysis || "此地支中暂无明显用神"}
                      </div>
                    </div>
                  )}
                </div>

                {/* 实战要点 */}
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="font-medium text-purple-800 mb-3">实战要点</div>
                  <div className="space-y-2 text-sm text-purple-700">
                    <div>• 本气力量最强，主导该地支的基本属性</div>
                    <div>• 中气次之，在特定条件下可以发挥作用</div>
                    <div>• 余气最弱，但在透干时仍有影响</div>
                    <div>• 藏干透出天干时力量大增</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 整体分析结果 */}
      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>整体藏干分析</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 五行统计 */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">五行统计</h4>
                <div className="space-y-2">
                  {Object.entries(analysisResult.wuxingStats).map(([wuxing, count]) => (
                    <div key={wuxing} className="flex items-center justify-between">
                      <span className="text-sm">{wuxing}</span>
                      <Badge className="bg-blue-100 text-blue-800">{count}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* 十神统计 */}
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">十神统计</h4>
                <div className="space-y-2">
                  {Object.entries(analysisResult.shishenStats).map(([shishen, count]) => (
                    <div key={shishen} className="flex items-center justify-between">
                      <span className="text-sm">{shishen}</span>
                      <Badge style={{ backgroundColor: `${getShishenColor(shishen)}20`, color: getShishenColor(shishen) }}>
                        {count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* 用神分析 */}
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-3">用神分析</h4>
                <div className="text-sm text-yellow-700 space-y-2">
                  <div>主要用神：{analysisResult.primaryYongshen}</div>
                  <div>次要用神：{analysisResult.secondaryYongshen}</div>
                  <div>忌神：{analysisResult.jishen}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">综合评价</h4>
              <div className="text-sm text-gray-700">{analysisResult.overallAnalysis}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}