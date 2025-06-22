"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fuxingData, analyzeFuxing } from "@/data/paipan-advanced"
import { Star, Heart, BookOpen, Crown, AlertTriangle } from "lucide-react"

interface BaziInput {
  year: string
  month: string
  day: string
  hour: string
}

export default function FuxingRelationMap() {
  const [baziInput, setBaziInput] = useState<BaziInput>({
    year: "甲子",
    month: "丙寅", 
    day: "戊午",
    hour: "癸亥"
  })
  const [fuxingResult, setFuxingResult] = useState<any>(null)
  const [selectedFuxing, setSelectedFuxing] = useState<string | null>(null)

  const handleAnalyze = () => {
    const result = analyzeFuxing(baziInput)
    setFuxingResult(result)
  }

  const getFuxingIcon = (category: string) => {
    const icons = {
      桃花类: <Heart className="w-4 h-4" />,
      贵人类: <Crown className="w-4 h-4" />,
      文星类: <BookOpen className="w-4 h-4" />,
      凶煞类: <AlertTriangle className="w-4 h-4" />,
      其他: <Star className="w-4 h-4" />
    }
    return icons[category as keyof typeof icons] || <Star className="w-4 h-4" />
  }

  const getFuxingColor = (category: string) => {
    const colors = {
      桃花类: "#ec4899",
      贵人类: "#f59e0b", 
      文星类: "#3b82f6",
      凶煞类: "#ef4444",
      其他: "#8b5cf6"
    }
    return colors[category as keyof typeof colors] || "#6b7280"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5" />
            <span>副星关系图谱</span>
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
                分析副星分布
              </Button>

              {/* 副星说明 */}
              <div className="p-4 bg-emerald-50 rounded-lg">
                <h5 className="font-medium mb-2 text-emerald-800">副星说明</h5>
                <div className="text-sm text-emerald-700 space-y-1">
                  <div>• 桃花类：影响感情和人缘</div>
                  <div>• 贵人类：带来帮助和机遇</div>
                  <div>• 文星类：影响学业和智慧</div>
                  <div>• 凶煞类：需要注意化解</div>
                </div>
              </div>
            </div>

            {/* 右侧：副星概览 */}
            <div className="space-y-4">
              <h4 className="font-semibold">副星概览</h4>
              {fuxingResult ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="text-2xl font-bold text-green-600">{fuxingResult.totalCount}</div>
                      <div className="text-xs text-green-700">总副星数</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <div className="text-2xl font-bold text-blue-600">{fuxingResult.favorableCount}</div>
                      <div className="text-xs text-blue-700">吉星数量</div>
                    </div>
                  </div>

                  {/* 分类统计 */}
                  <div className="space-y-2">
                    {Object.entries(fuxingResult.categoryStats).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          {getFuxingIcon(category)}
                          <span className="text-sm font-medium">{category}</span>
                        </div>
                        <Badge style={{ backgroundColor: `${getFuxingColor(category)}20`, color: getFuxingColor(category) }}>
                          {count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Star className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>请输入八字并分析副星分布</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 副星分布图 */}
      {fuxingResult && (
        <Card>
          <CardHeader>
            <CardTitle>副星分布图</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* 四柱副星展示 */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { key: "year", label: "年柱", value: baziInput.year },
                  { key: "month", label: "月柱", value: baziInput.month },
                  { key: "day", label: "日柱", value: baziInput.day },
                  { key: "hour", label: "时柱", value: baziInput.hour }
                ].map((column) => {
                  const columnFuxing = fuxingResult.fuxingList.filter((fx: any) => fx.position.includes(column.label))
                  
                  return (
                    <div key={column.key} className="text-center">
                      <div className="text-sm text-gray-500 mb-2">{column.label}</div>
                      <div className="p-4 border-2 border-gray-200 rounded-lg min-h-[120px]">
                        <div className="font-bold text-lg mb-3">{column.value}</div>
                        <div className="space-y-2">
                          {columnFuxing.map((fx: any, index: number) => (
                            <div
                              key={index}
                              className="cursor-pointer"
                              onClick={() => setSelectedFuxing(fx.name)}
                            >
                              <Badge 
                                style={{ 
                                  backgroundColor: `${getFuxingColor(fx.category)}20`,
                                  color: getFuxingColor(fx.category),
                                  fontSize: "10px"
                                }}
                                className="mb-1"
                              >
                                {fx.name}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 副星列表 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fuxingResult.fuxingList.map((fx: any, index: number) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedFuxing === fx.name ? "border-emerald-400 bg-emerald-50 shadow-md" : "border-gray-200 hover:shadow-md"
                    }`}
                    onClick={() => setSelectedFuxing(selectedFuxing === fx.name ? null : fx.name)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getFuxingIcon(fx.category)}
                        <span className="font-semibold" style={{ color: getFuxingColor(fx.category) }}>
                          {fx.name}
                        </span>
                      </div>
                      <Badge 
                        style={{ 
                          backgroundColor: fx.favorable ? "#10b981" : "#ef4444",
                          color: "white"
                        }}
                      >
                        {fx.favorable ? "吉" : "凶"}
                      </Badge>
                    </div>
                    
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="text-gray-600">位置：</span>
                        <span>{fx.position.join("、")}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">作用：</span>
                        <span>{fx.effect}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 详细解释面板 */}
      {selectedFuxing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <span className="text-2xl">{fuxingData[selectedFuxing as keyof typeof fuxingData]?.icon}</span>
              <span>{selectedFuxing} 详解</span>
              <Badge style={{ backgroundColor: getFuxingColor(fuxingData[selectedFuxing as keyof typeof fuxingData]?.category || "其他"), color: "white" }}>
                {fuxingData[selectedFuxing as keyof typeof fuxingData]?.category}
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
                      <div className="font-medium text-blue-800 mb-1">判断方法</div>
                      <div className="text-sm text-blue-700">
                        {fuxingData[selectedFuxing as keyof typeof fuxingData]?.judgment}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded">
                      <div className="font-medium text-green-800 mb-1">主要作用</div>
                      <div className="text-sm text-green-700">
                        {fuxingData[selectedFuxing as keyof typeof fuxingData]?.effect}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-purple-50 rounded">
                      <div className="font-medium text-purple-800 mb-1">象义解释</div>
                      <div className="text-sm text-purple-700">
                        {fuxingData[selectedFuxing as keyof typeof fuxingData]?.symbolism}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧：应用分析 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">应用分析</h4>
                  
                  {/* 在命局中的作用 */}
                  <div className="p-4 bg-yellow-50 rounded-lg mb-4">
                    <div className="font-medium text-yellow-800 mb-2">在命局中的作用</div>
                    <div className="text-sm text-yellow-700">
                      {fuxingData[selectedFuxing as keyof typeof fuxingData]?.inChart}
                    </div>
                  </div>

                  {/* 实际影响 */}
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded">
                      <div className="font-medium text-green-800 mb-1">正面影响</div>
                      <div className="flex flex-wrap gap-1">
                        {fuxingData[selectedFuxing as keyof typeof fuxingData]?.positiveEffects.map((effect, index) => (
                          <Badge key={index} className="bg-green-100 text-green-800 text-xs">
                            {effect}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {fuxingData[selectedFuxing as keyof typeof fuxingData]?.negativeEffects && (
                      <div className="p-3 bg-red-50 rounded">
                        <div className="font-medium text-red-800 mb-1">注意事项</div>
                        <div className="flex flex-wrap gap-1">
                          {fuxingData[selectedFuxing as keyof typeof fuxingData]?.negativeEffects.map((effect, index) => (
                            <Badge key={index} className="bg-red-100 text-red-800 text-xs">
                              {effect}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 化解方法 */}
                  {fuxingData[selectedFuxing as keyof typeof fuxingData]?.resolution && (
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <div className="font-medium text-indigo-800 mb-2">化解方法</div>
                      <div className="text-sm text-indigo-700">
                        {fuxingData[selectedFuxing as keyof typeof fuxingData]?.resolution}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 副星学习指南 */}
      <Card>
        <CardHeader>
          <CardTitle>副星学习指南</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-pink-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Heart className="w-5 h-5 text-pink-600" />
                <h4 className="font-semibold text-pink-800">桃花类</h4>
              </div>
              <ul className="space-y-1 text-sm text-pink-700">
                <li>• 影响异性缘分和人际关系</li>
                <li>• 与艺术才华密切相关</li>
                <li>• 需要注意感情纠纷</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Crown className="w-5 h-5 text-yellow-600" />
                <h4 className="font-semibold text-yellow-800">贵人类</h4>
              </div>
              <ul className="space-y-1 text-sm text-yellow-700">
                <li>• 带来帮助和扶持</li>
                <li>• 化解困难和危机</li>
                <li>• 提升社会地位</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-800">文星类</h4>
              </div>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• 提升学习和考试运</li>
                <li>• 增强文学艺术天赋</li>
                <li>• 有利于学术发展</li>
              </ul>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h4 className="font-semibold text-red-800">凶煞类</h4>
              </div>
              <ul className="space-y-1 text-sm text-red-700">
                <li>• 需要特别注意化解</li>
                <li>• 可能带来挑战和考验</li>
                <li>• 配合得当也能转化为助力</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}