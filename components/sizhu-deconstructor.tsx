"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { sizhuData, analyzeSizhuStructure } from "@/data/paipan-advanced"
import { User, Users, Heart, Baby, Sparkles } from "lucide-react"

interface BaziInput {
  year: string
  month: string
  day: string
  hour: string
}

export default function SizhuDeconstructor() {
  const [baziInput, setBaziInput] = useState<BaziInput>({
    year: "甲子",
    month: "丙寅",
    day: "戊午",
    hour: "癸亥"
  })
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [selectedRelation, setSelectedRelation] = useState<string | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleAnalyze = () => {
    const result = analyzeSizhuStructure(baziInput)
    setAnalysisResult(result)
  }

  const getRelationIcon = (relation: string) => {
    const icons = {
      父母: <User className="w-4 h-4" />,
      兄弟: <Users className="w-4 h-4" />,
      夫妻: <Heart className="w-4 h-4" />,
      子女: <Baby className="w-4 h-4" />,
      财帛: <Sparkles className="w-4 h-4" />
    }
    return icons[relation as keyof typeof icons] || <User className="w-4 h-4" />
  }

  const getRelationColor = (relation: string) => {
    const colors = {
      父母: "#3b82f6",
      兄弟: "#10b981",
      夫妻: "#ec4899",
      子女: "#f59e0b",
      财帛: "#8b5cf6"
    }
    return colors[relation as keyof typeof colors] || "#6b7280"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>智能四柱解构系统</span>
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
                  解构分析
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center space-x-1"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{showAdvanced ? "简化" : "高级"}模式</span>
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
                    六亲齐全例
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBaziInput({ year: "乙酉", month: "戊子", day: "甲卯", hour: "丙寅" })}
                  >
                    宫位特殊例
                  </Button>
                </div>
              </div>
            </div>

            {/* 右侧：宫位概览 */}
            <div className="space-y-4">
              <h4 className="font-semibold">宫位概览</h4>
              {analysisResult ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <div className="text-xs text-blue-700 mb-1">命宫</div>
                      <div className="font-bold">{analysisResult.minggong}</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="text-xs text-green-700 mb-1">身宫</div>
                      <div className="font-bold">{analysisResult.shengong}</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded">
                      <div className="text-xs text-purple-700 mb-1">胎元</div>
                      <div className="font-bold">{analysisResult.taiyuan}</div>
                    </div>
                  </div>

                  {/* 六亲分布 */}
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="font-medium text-yellow-800 mb-2">六亲分布</div>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(analysisResult.liuqin).map(([relation, position]) => (
                        <div key={relation} className="flex items-center justify-between p-2 bg-white rounded">
                          <div className="flex items-center space-x-2">
                            {getRelationIcon(relation)}
                            <span className="text-sm font-medium">{relation}</span>
                          </div>
                          <Badge style={{ backgroundColor: `${getRelationColor(relation)}20`, color: getRelationColor(relation) }}>
                            {position}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>请输入八字并进行解构分析</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 六亲关系图 */}
      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle>六亲关系图</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* 中心日主 */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-yellow-100 border-4 border-yellow-400 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold">{baziInput.day[0]}</div>
                      <div className="text-xs text-gray-600">日主</div>
                    </div>
                  </div>
                  
                  {/* 连接线 */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full h-16 w-0.5 bg-blue-300"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full h-16 w-0.5 bg-green-300"></div>
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full w-16 h-0.5 bg-pink-300"></div>
                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full w-16 h-0.5 bg-purple-300"></div>
                </div>
              </div>
              
              {/* 六亲关系图 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {Object.entries(analysisResult.liuqin).map(([relation, position]) => (
                  <div 
                    key={relation}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedRelation === relation ? "shadow-lg scale-105" : "hover:shadow-md"
                    }`}
                    style={{ borderColor: getRelationColor(relation) }}
                    onClick={() => setSelectedRelation(selectedRelation === relation ? null : relation)}
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${getRelationColor(relation)}20` }}>
                        {getRelationIcon(relation)}
                      </div>
                      <div>
                        <div className="font-semibold" style={{ color: getRelationColor(relation) }}>
                          {relation}宫
                        </div>
                        <div className="text-xs text-gray-600">{position}</div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-700">
                      {analysisResult.liuqinAnalysis[relation]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 高级分析面板 */}
      {showAdvanced && analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>高级结构分析</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 左侧：宫位解析 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">宫位解析</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-800 mb-2">命宫解析</div>
                      <div className="text-sm text-blue-700">
                        {analysisResult.gongweiAnalysis.minggong}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800 mb-2">身宫解析</div>
                      <div className="text-sm text-green-700">
                        {analysisResult.gongweiAnalysis.shengong}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="font-medium text-purple-800 mb-2">胎元解析</div>
                      <div className="text-sm text-purple-700">
                        {analysisResult.gongweiAnalysis.taiyuan}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧：冲合刑害 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">冲合刑害关系</h4>
                  
                  {/* 冲合关系 */}
                  <div className="space-y-3">
                    {analysisResult.chonghexinghai.map((relation: any, index: number) => (
                      <div key={index} className="p-3 rounded" style={{ backgroundColor: `${relation.color}20` }}>
                        <div className="font-medium mb-1" style={{ color: relation.color }}>
                          {relation.type}关系
                        </div>
                        <div className="text-sm text-gray-700">
                          {relation.description}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {relation.positions.map((pos: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {pos}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 特殊结构 */}
                {analysisResult.specialStructures && analysisResult.specialStructures.length > 0 && (
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="font-medium text-yellow-800 mb-2">特殊结构</div>
                    <div className="space-y-2">
                      {analysisResult.specialStructures.map((structure: any, index: number) => (
                        <div key={index} className="p-2 bg-white rounded">
                          <div className="font-medium">{structure.name}</div>
                          <div className="text-sm text-gray-700">{structure.description}</div>
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

      {/* 详细解释面板 */}
      {selectedRelation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: getRelationColor(selectedRelation) }}>
                {getRelationIcon(selectedRelation)}
              </div>
              <span style={{ color: getRelationColor(selectedRelation) }}>{selectedRelation}宫详解</span>
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
                      <div className="font-medium text-blue-800 mb-1">所在位置</div>
                      <div className="text-sm text-blue-700">
                        {analysisResult.liuqin[selectedRelation]}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded">
                      <div className="font-medium text-green-800 mb-1">基本含义</div>
                      <div className="text-sm text-green-700">
                        {sizhuData.liuqinMeaning[selectedRelation as keyof typeof sizhuData.liuqinMeaning].basic}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-purple-50 rounded">
                      <div className="font-medium text-purple-800 mb-1">与日主关系</div>
                      <div className="text-sm text-purple-700">
                        {sizhuData.liuqinMeaning[selectedRelation as keyof typeof sizhuData.liuqinMeaning].relationship}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧：应用分析 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">应用分析</h4>
                  
                  {/* 吉凶判断 */}
                  <div className="p-4 bg-yellow-50 rounded-lg mb-4">
                    <div className="font-medium text-yellow-800 mb-2">吉凶判断</div>
                    <div className="text-sm text-yellow-700">
                      {analysisResult.liuqinAnalysis[selectedRelation]}
                    </div>
                  </div>

                  {/* 实际影响 */}
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded">
                      <div className="font-medium text-green-800 mb-1">有利方面</div>
                      <div className="text-sm text-green-700">
                        {sizhuData.liuqinMeaning[selectedRelation as keyof typeof sizhuData.liuqinMeaning].positive}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-red-50 rounded">
                      <div className="font-medium text-red-800 mb-1">不利方面</div>
                      <div className="text-sm text-red-700">
                        {sizhuData.liuqinMeaning[selectedRelation as keyof typeof sizhuData.liuqinMeaning].negative}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 实战建议 */}
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <div className="font-medium text-indigo-800 mb-2">实战建议</div>
                  <div className="text-sm text-indigo-700">
                    {sizhuData.liuqinMeaning[selectedRelation as keyof typeof sizhuData.liuqinMeaning].advice}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 学习要点 */}
      <Card>
        <CardHeader>
          <CardTitle>宫位六亲学习要点</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <User className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-800">宫位体系</h4>
              </div>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• 命宫代表人生整体走向</li>
                <li>• 身宫代表身体和性格</li>
                <li>• 胎元代表先天和根基</li>
                <li>• 各宫位相互影响制约</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Users className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-800">六亲关系</h4>
              </div>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• 父母宫影响长辈关系</li>
                <li>• 兄弟宫影响平辈关系</li>
                <li>• 夫妻宫影响婚姻状况</li>
                <li>• 子女宫影响后代缘分</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-purple-800">实战应用</h4>
              </div>
              <ul className="space-y-1 text-sm text-purple-700">
                <li>• 结合十神看六亲关系</li>
                <li>• 分析宫位五行强弱</li>
                <li>• 注意冲合刑害影响</li>
                <li>• 大运流年对宫位影响</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}