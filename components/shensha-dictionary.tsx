"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { shenshaData, shenshaCategories, shenshaLevels, jieshaMethods } from "@/data/shensha"
import { Search, Eye, Calculator, HelpCircle } from "lucide-react"

export default function ShenshaDictionary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedShensha, setSelectedShensha] = useState<string | null>(null)
  const [showVisualization, setShowVisualization] = useState(false)

  // 搜索过滤
  const filteredShensha = Object.entries(shenshaData).filter(([name, data]) => {
    const matchesSearch =
      searchTerm === "" ||
      name.includes(searchTerm) ||
      data.description.includes(searchTerm) ||
      data.symbolism.includes(searchTerm)

    const matchesCategory =
      selectedCategory === "all" ||
      Object.entries(shenshaCategories).some(
        ([category, shenshalist]) => category === selectedCategory && shenshalist.includes(name),
      )

    return matchesSearch && matchesCategory
  })

  const handleShenshaClick = (name: string) => {
    setSelectedShensha(selectedShensha === name ? null : name)
    setShowVisualization(false)
  }

  const getJudgmentExample = (shensha: any, dayGan = "甲") => {
    if (shensha.judgment.details[dayGan]) {
      return `${dayGan}日干见${shensha.judgment.details[dayGan].join("、")}为${shensha.name}`
    }
    return "请选择具体日干查看判断方法"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-4">
            <span>神煞词典</span>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <HelpCircle className="w-4 h-4" />
              <span>按功能分类，聚焦实用神煞</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索神煞名称或含义（如：贵人、桃花、学业）"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                全部
              </Button>
              {Object.keys(shenshaCategories).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* 神煞表格 */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 font-semibold">神煞名</th>
                  <th className="text-left p-4 font-semibold">分类</th>
                  <th className="text-left p-4 font-semibold">吉凶</th>
                  <th className="text-left p-4 font-semibold">判断规则</th>
                  <th className="text-left p-4 font-semibold">象义简述</th>
                  <th className="text-left p-4 font-semibold">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredShensha.map(([name, data]) => {
                  const levelStyle = shenshaLevels[data.level as keyof typeof shenshaLevels]

                  return (
                    <tr key={name} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{data.icon}</span>
                          <div>
                            <div className="font-semibold text-lg">{name}</div>
                            <div className="text-sm text-gray-600">{data.symbolism}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{data.category}</Badge>
                      </td>
                      <td className="p-4">
                        <Badge
                          style={{
                            backgroundColor: levelStyle.bgColor,
                            color: levelStyle.textColor,
                            borderColor: levelStyle.color,
                          }}
                        >
                          {data.level}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div className="font-medium mb-1">{data.judgment.rule}</div>
                          <div className="text-gray-600 text-xs bg-gray-50 p-2 rounded">{data.judgment.formula}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-700">{data.description}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShenshaClick(name)}
                            className="flex items-center space-x-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>详情</span>
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center space-x-1">
                            <Calculator className="w-3 h-3" />
                            <span>查询</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 详细解释面板 */}
      {selectedShensha && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <span className="text-3xl">{shenshaData[selectedShensha].icon}</span>
              <span>{selectedShensha} · 详细解析</span>
              <Badge
                style={{
                  backgroundColor:
                    shenshaLevels[shenshaData[selectedShensha].level as keyof typeof shenshaLevels].bgColor,
                  color: shenshaLevels[shenshaData[selectedShensha].level as keyof typeof shenshaLevels].textColor,
                }}
              >
                {shenshaData[selectedShensha].level}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 左侧：判断方法 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">判断方法</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-800 mb-2">判断规则</div>
                      <div className="text-sm text-blue-700 mb-3">{shenshaData[selectedShensha].judgment.rule}</div>
                      <div className="text-xs bg-white p-3 rounded border font-mono">
                        {shenshaData[selectedShensha].judgment.formula}
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800 mb-2">判断示例</div>
                      <div className="text-sm text-green-700">{getJudgmentExample(shenshaData[selectedShensha])}</div>
                    </div>

                    {/* 详细对照表 */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium mb-3">详细对照表</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(shenshaData[selectedShensha].judgment.details).map(([gan, zhis]) => (
                          <div key={gan} className="flex justify-between p-2 bg-white rounded">
                            <span className="font-medium">{gan}干：</span>
                            <span>{Array.isArray(zhis) ? zhis.join("、") : zhis}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧：作用影响 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">作用影响</h4>
                  <div className="space-y-4">
                    {shenshaData[selectedShensha].effects.positive.length > 0 && (
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="font-medium text-green-800 mb-2">正面作用</div>
                        <div className="flex flex-wrap gap-2">
                          {shenshaData[selectedShensha].effects.positive.map((effect) => (
                            <Badge key={effect} className="bg-green-100 text-green-800">
                              {effect}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {shenshaData[selectedShensha].effects.negative.length > 0 && (
                      <div className="p-4 bg-red-50 rounded-lg">
                        <div className="font-medium text-red-800 mb-2">负面作用</div>
                        <div className="flex flex-wrap gap-2">
                          {shenshaData[selectedShensha].effects.negative.map((effect) => (
                            <Badge key={effect} className="bg-red-100 text-red-800">
                              {effect}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {shenshaData[selectedShensha].effects.neutral.length > 0 && (
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <div className="font-medium text-yellow-800 mb-2">注意事项</div>
                        <div className="flex flex-wrap gap-2">
                          {shenshaData[selectedShensha].effects.neutral.map((effect) => (
                            <Badge key={effect} className="bg-yellow-100 text-yellow-800">
                              {effect}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 解煞方法 */}
                {jieshaMethods[selectedShensha as keyof typeof jieshaMethods] && (
                  <div>
                    <h4 className="font-semibold mb-3">解煞方法</h4>
                    <div className="space-y-3">
                      {jieshaMethods[selectedShensha as keyof typeof jieshaMethods].methods.map((method) => (
                        <div key={method} className="p-3 bg-blue-50 rounded">
                          <div className="font-medium text-blue-800 mb-1">{method}</div>
                          <div className="text-sm text-blue-700">
                            {jieshaMethods[selectedShensha as keyof typeof jieshaMethods].details[method]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 象义解释 */}
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="font-medium text-purple-800 mb-2">象义内涵</div>
                  <div className="text-sm text-purple-700">{shenshaData[selectedShensha].symbolism}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
