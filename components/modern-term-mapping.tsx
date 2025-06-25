"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { termMappings, getTermMapping } from "@/data/guji-classics"
import { ArrowRight, BookOpen, Lightbulb, Search } from "lucide-react"

export default function ModernTermMapping() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedMapping, setSelectedMapping] = useState<any>(null)

  const categories = ["all", "格局类", "十神类", "五行类", "神煞类", "大运类"]

  // 过滤术语映射
  const filteredMappings = Object.entries(termMappings).filter(([ancient, data]) => {
    const matchesSearch = searchTerm === "" || 
      ancient.includes(searchTerm) || 
      data.modern.includes(searchTerm) ||
      data.explanation.includes(searchTerm)
    
    const matchesCategory = selectedCategory === "all" || data.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const handleMappingClick = (ancient: string) => {
    const mapping = getTermMapping(ancient)
    setSelectedMapping(mapping)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowRight className="w-5 h-5" />
            <span>古今术语对照系统</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索古籍词汇或现代术语"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === "all" ? "全部" : category}
                </Button>
              ))}
            </div>
          </div>

          {/* 术语对照表格 */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 font-semibold">古籍词汇</th>
                  <th className="text-left p-4 font-semibold">白话释义</th>
                  <th className="text-left p-4 font-semibold">现代术语</th>
                  <th className="text-left p-4 font-semibold">分类</th>
                  <th className="text-left p-4 font-semibold">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredMappings.map(([ancient, data]) => (
                  <tr key={ancient} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-semibold text-amber-700">{ancient}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-700">{data.explanation}</div>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-blue-100 text-blue-800">
                        {data.modern}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{data.category}</Badge>
                    </td>
                    <td className="p-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMappingClick(ancient)}
                        className="flex items-center space-x-1"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>详情</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 详细解释面板 */}
      {selectedMapping && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-amber-600">{selectedMapping.ancient}</span>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <span className="text-xl text-blue-600">{selectedMapping.modern}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 左侧：词汇解析 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">词汇解析</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <div className="font-medium text-amber-800 mb-2">古籍原意</div>
                      <div className="text-sm text-amber-700">{selectedMapping.explanation}</div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-800 mb-2">现代理解</div>
                      <div className="text-sm text-blue-700">{selectedMapping.modernExplanation}</div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800 mb-2">术语分类</div>
                      <Badge className="bg-green-100 text-green-800">
                        {selectedMapping.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* 相关术语 */}
                {selectedMapping.relatedTerms && (
                  <div>
                    <h4 className="font-semibold mb-3">相关术语</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMapping.relatedTerms.map((term: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            const mapping = getTermMapping(term)
                            if (mapping) setSelectedMapping(mapping)
                          }}
                        >
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 右侧：应用示例 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">应用示例</h4>
                  
                  {/* 古籍出处 */}
                  {selectedMapping.sources && (
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-800">古籍出处</h5>
                      {selectedMapping.sources.map((source: any, index: number) => (
                        <div key={index} className="p-3 bg-gray-50 rounded border-l-4 border-amber-400">
                          <div className="font-medium text-amber-700 mb-1">{source.book}</div>
                          <div className="text-sm text-gray-700 italic">"{source.quote}"</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 实际案例 */}
                  {selectedMapping.examples && (
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-800">实际案例</h5>
                      {selectedMapping.examples.map((example: any, index: number) => (
                        <div key={index} className="p-4 bg-yellow-50 rounded-lg">
                          <div className="font-medium mb-2">八字：{example.bazi}</div>
                          <div className="text-sm text-gray-700 mb-2">{example.analysis}</div>
                          <div className="text-xs text-gray-600">
                            体现：{selectedMapping.ancient} → {selectedMapping.modern}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 学习要点 */}
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-purple-600" />
                    <div className="font-medium text-purple-800">学习要点</div>
                  </div>
                  <div className="space-y-2 text-sm text-purple-700">
                    <div>• 理解古人表达方式与现代术语的对应关系</div>
                    <div>• 掌握词汇在不同语境下的具体含义</div>
                    <div>• 结合实际八字案例加深理解</div>
                    <div>• 注意古今命理思维的差异与联系</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 学习指南 */}
      <Card>
        <CardHeader>
          <CardTitle>古今术语学习指南</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-amber-50 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-3">古籍特点</h4>
              <ul className="space-y-1 text-sm text-amber-700">
                <li>• 文言文表达简洁精炼</li>
                <li>• 多用比喻和象征手法</li>
                <li>• 术语含义丰富多层</li>
                <li>• 需要结合语境理解</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">现代优势</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• 术语定义明确统一</li>
                <li>• 逻辑体系更加完整</li>
                <li>• 便于系统化学习</li>
                <li>• 易于实际应用操作</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">学习建议</h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• 古今对照加深理解</li>
                <li>• 多读原文培养语感</li>
                <li>• 结合案例实践应用</li>
                <li>• 建立个人术语词典</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}