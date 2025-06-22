"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { nayinData, analyzeNayinStructure } from "@/data/paipan-advanced"
import { Sparkles, Search, Eye, Target } from "lucide-react"

interface BaziInput {
  year: string
  month: string
  day: string
  hour: string
}

export default function NayinAnalyzer() {
  const [baziInput, setBaziInput] = useState<BaziInput>({
    year: "甲子",
    month: "丙寅",
    day: "戊午", 
    hour: "癸亥"
  })
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [selectedNayin, setSelectedNayin] = useState<string | null>(null)
  const [filterWuxing, setFilterWuxing] = useState<string>("all")

  const handleAnalyze = () => {
    const result = analyzeNayinStructure(baziInput)
    setAnalysisResult(result)
  }

  const handleNayinClick = (nayin: string) => {
    setSelectedNayin(nayin)
  }

  const getNayinColor = (wuxing: string) => {
    const colors = {
      金: "#f59e0b",
      木: "#10b981", 
      水: "#3b82f6",
      火: "#ef4444",
      土: "#a16207"
    }
    return colors[wuxing as keyof typeof colors] || "#6b7280"
  }

  // 过滤纳音数据
  const filteredNayin = Object.entries(nayinData).filter(([nayin, data]) => {
    return filterWuxing === "all" || data.wuxing === filterWuxing
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5" />
            <span>纳音五行全图解</span>
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

              <Button onClick={handleAnalyze} className="w-full">
                分析纳音结构
              </Button>

              {/* 五行筛选 */}
              <div>
                <h5 className="font-medium mb-2 text-sm">按五行筛选</h5>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={filterWuxing === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterWuxing("all")}
                  >
                    全部
                  </Button>
                  {["金", "木", "水", "火", "土"].map((wuxing) => (
                    <Button
                      key={wuxing}
                      variant={filterWuxing === wuxing ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterWuxing(wuxing)}
                      style={{
                        backgroundColor: filterWuxing === wuxing ? getNayinColor(wuxing) : undefined,
                        borderColor: getNayinColor(wuxing)
                      }}
                    >
                      {wuxing}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* 右侧：纳音分析结果 */}
            <div className="space-y-4">
              <h4 className="font-semibold">纳音分析</h4>
              {analysisResult ? (
                <div className="space-y-4">
                  {/* 四柱纳音 */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { key: "year", label: "年柱", value: baziInput.year },
                      { key: "month", label: "月柱", value: baziInput.month },
                      { key: "day", label: "日柱", value: baziInput.day },
                      { key: "hour", label: "时柱", value: baziInput.hour }
                    ].map((column, index)=> (
                      <div key={column.key} className="text-center">
                        <div className="text-xs text-gray-500 mb-1">{column.label}</div>
                        <div className="p-3 border rounded-lg">
                          <div className="font-bold mb-1">{column.value}</div>
                          <Badge 
                            style={{ 
                              backgroundColor: getNayinColor(analysisResult.nayinList[index].wuxing),
                              color: "white"
                            }}
                          >
                            {analysisResult.nayinList[index].nayin}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 纳音五行统计 */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-800 mb-2">纳音五行统计</div>
                    <div className="grid grid-cols-5 gap-2">
                      {Object.entries(analysisResult.wuxingStats).map(([wuxing, count]) => (
                        <div key={wuxing} className="text-center p-2 rounded" style={{ backgroundColor: `${getNayinColor(wuxing)}20` }}>
                          <div className="font-bold" style={{ color: getNayinColor(wuxing) }}>
                            {wuxing}
                          </div>
                          <div className="text-lg font-bold">{count}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 纳音冲合 */}
                  {analysisResult.nayinRelations.length > 0 && (
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="font-medium text-yellow-800 mb-2">纳音冲合关系</div>
                      <div className="space-y-2">
                        {analysisResult.nayinRelations.map((relation: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                            <div className="flex items-center space-x-2">
                              <Badge style={{ backgroundColor: getNayinColor(relation.from.wuxing), color: "white" }}>
                                {relation.from.nayin}
                              </Badge>
                              <span className="text-sm">{relation.type}</span>
                              <Badge style={{ backgroundColor: getNayinColor(relation.to.wuxing), color: "white" }}>
                                {relation.to.nayin}
                              </Badge>
                            </div>
                            <span className="text-xs text-gray-600">{relation.effect}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Sparkles className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>请输入八字并分析纳音结构</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 纳音五行表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>纳音五行表</span>
            <div className="text-sm text-gray-500">共30种纳音五行</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredNayin.map(([nayin, data]) => (
              <div
                key={nayin}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedNayin === nayin ? "border-emerald-400 bg-emerald-50 shadow-md" : "border-gray-200 hover:shadow-md"
                }`}
                onClick={() => handleNayinClick(nayin)}
              >
                <div className="text-center mb-3">
                  <h3 className="text-lg font-bold" style={{ color: getNayinColor(data.wuxing) }}>
                    {nayin}
                  </h3>
                  <Badge style={{ backgroundColor: getNayinColor(data.wuxing), color: "white" }}>
                    {data.wuxing}
                  </Badge>
                </div>
                
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">干支：</span>
                    <span>{data.ganzhi.join("、")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">性质：</span>
                    <span>{data.nature}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 详细解释面板 */}
      {selectedNayin && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <span className="text-2xl font-bold" style={{ color: getNayinColor(nayinData[selectedNayin as keyof typeof nayinData].wuxing) }}>
                {selectedNayin}
              </span>
              <Badge style={{ backgroundColor: getNayinColor(nayinData[selectedNayin as keyof typeof nayinData].wuxing), color: "white" }}>
                {nayinData[selectedNayin as keyof typeof nayinData].wuxing}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 左侧：基本信息 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">基本信息</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded">
                      <div className="font-medium text-blue-800 mb-1">干支组合</div>
                      <div className="grid grid-cols-3 gap-2">
                        {nayinData[selectedNayin as keyof typeof nayinData].ganzhi.map((ganzhi, index) => (
                          <div key={index} className="text-center p-2 bg-white rounded border">
                            <div className="font-bold">{ganzhi}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded">
                      <div className="font-medium text-green-800 mb-1">五行特性</div>
                      <div className="text-sm text-green-700">
                        <div>五行：{nayinData[selectedNayin as keyof typeof nayinData].wuxing}</div>
                        <div>性质：{nayinData[selectedNayin as keyof typeof nayinData].nature}</div>
                        <div>特点：{nayinData[selectedNayin as keyof typeof nayinData].characteristics}</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-purple-50 rounded">
                      <div className="font-medium text-purple-800 mb-1">象义解释</div>
                      <div className="text-sm text-purple-700">
                        {nayinData[selectedNayin as keyof typeof nayinData].symbolism}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧：应用分析 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">应用分析</h4>
                  
                  {/* 性格特征 */}
                  <div className="p-4 bg-yellow-50 rounded-lg mb-4">
                    <div className="font-medium text-yellow-800 mb-2">性格特征</div>
                    <div className="flex flex-wrap gap-2">
                      {nayinData[selectedNayin as keyof typeof nayinData].personality.map((trait, index) => (
                        <Badge key={index} className="bg-yellow-100 text-yellow-800 text-xs">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* 命理应用 */}
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded">
                      <div className="font-medium text-green-800 mb-1">事业方向</div>
                      <div className="text-sm text-green-700">
                        {nayinData[selectedNayin as keyof typeof nayinData].career}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded">
                      <div className="font-medium text-blue-800 mb-1">健康特点</div>
                      <div className="text-sm text-blue-700">
                        {nayinData[selectedNayin as keyof typeof nayinData].health}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-pink-50 rounded">
                      <div className="font-medium text-pink-800 mb-1">人际关系</div>
                      <div className="text-sm text-pink-700">
                        {nayinData[selectedNayin as keyof typeof nayinData].relationships}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 案例展示 */}
                {nayinData[selectedNayin as keyof typeof nayinData].examples && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium mb-3">案例展示</div>
                    <div className="space-y-3">
                      {nayinData[selectedNayin as keyof typeof nayinData].examples?.map((example, index) => (
                        <div key={index} className="p-3 bg-white rounded border">
                          <div className="font-medium mb-1">{example.description}</div>
                          <div className="text-sm text-gray-700">{example.bazi}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 纳音学习指南 */}
      <Card>
        <CardHeader>
          <CardTitle>纳音学习指南</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Search className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-800">基本概念</h4>
              </div>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• 纳音是干支组合的隐含五行</li>
                <li>• 每两组干支共用一个纳音</li>
                <li>• 共30种纳音五行组合</li>
                <li>• 纳音比天干地支更深层</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Eye className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-800">判断方法</h4>
              </div>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• 根据干支组合查表确定</li>
                <li>• 注意纳音五行与干支五行区别</li>
                <li>• 分析纳音间的生克关系</li>
                <li>• 结合命局整体看纳音作用</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-purple-800">实战应用</h4>
              </div>
              <ul className="space-y-1 text-sm text-purple-700">
                <li>• 纳音可作为辅助用神参考</li>
                <li>• 纳音相同的人性格相近</li>
                <li>• 纳音冲克需要特别注意</li>
                <li>• 大运流年纳音影响运势</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}