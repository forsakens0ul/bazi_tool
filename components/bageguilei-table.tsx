"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { gejuData, specialGejuData, terminology } from "@/data/geju"
import { Search, ChevronDown, ChevronUp, HelpCircle } from "lucide-react"

export default function BageGuiLeiTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [expandedGeju, setExpandedGeju] = useState<string | null>(null)
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null)

  const allGeju = { ...gejuData, ...specialGejuData }

  // 搜索过滤
  const filteredGeju = Object.entries(allGeju).filter(([name, data]) => {
    const matchesSearch =
      searchTerm === "" ||
      name.includes(searchTerm) ||
      data.condition.includes(searchTerm) ||
      data.description.includes(searchTerm)

    const matchesCategory = selectedCategory === "all" || data.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleGejuClick = (name: string) => {
    setExpandedGeju(expandedGeju === name ? null : name)
  }

  const highlightTerminology = (text: string) => {
    let highlightedText = text
    Object.keys(terminology).forEach((term) => {
      const regex = new RegExp(`(${term})`, "g")
      highlightedText = highlightedText.replace(
        regex,
        `<span class="terminology-highlight cursor-help underline decoration-dotted text-blue-600" data-term="${term}">$1</span>`,
      )
    })
    return highlightedText
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>八格归类表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索格局名称或条件（如：官格、清透）"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                全部
              </Button>
              <Button
                variant={selectedCategory === "正格" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("正格")}
              >
                正格
              </Button>
              <Button
                variant={selectedCategory === "从格" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("从格")}
              >
                从格
              </Button>
            </div>
          </div>

          {/* 格局表格 */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 font-semibold">格局名</th>
                  <th className="text-left p-4 font-semibold">成格条件</th>
                  <th className="text-left p-4 font-semibold">适配日干</th>
                  <th className="text-left p-4 font-semibold">用神方向</th>
                  <th className="text-left p-4 font-semibold">说明</th>
                  <th className="text-left p-4 font-semibold">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredGeju.map(([name, data]) => (
                  <tr key={name} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{data.icon}</span>
                        <div>
                          <div className="font-semibold" style={{ color: data.color }}>
                            {name}
                          </div>
                          <Badge
                            className="mt-1"
                            style={{
                              backgroundColor: `${data.color}20`,
                              color: data.color,
                            }}
                          >
                            {data.category}
                          </Badge>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: highlightTerminology(data.condition) }}
                        onMouseOver={(e) => {
                          const target = e.target as HTMLElement
                          if (target.classList.contains("terminology-highlight")) {
                            setHoveredTerm(target.getAttribute("data-term"))
                          }
                        }}
                        onMouseOut={() => setHoveredTerm(null)}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {data.suitableDayMaster?.map((dayMaster) => (
                          <Badge key={dayMaster} variant="outline" className="text-xs">
                            {dayMaster}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {data.yongshenDirection?.map((direction) => (
                          <Badge key={direction} className="bg-green-100 text-green-800 text-xs">
                            {direction}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div
                        className="text-sm text-gray-600"
                        dangerouslySetInnerHTML={{ __html: highlightTerminology(data.description) }}
                      />
                    </td>
                    <td className="p-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGejuClick(name)}
                        className="flex items-center space-x-1"
                      >
                        {expandedGeju === name ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
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

      {/* 术语解释悬浮窗 */}
      {hoveredTerm && (
        <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-xs z-50">
          <div className="flex items-center space-x-2 mb-2">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-blue-600">{hoveredTerm}</span>
          </div>
          <div className="text-sm text-gray-700">{terminology[hoveredTerm as keyof typeof terminology]}</div>
        </div>
      )}

      {/* 详细信息展开 */}
      {expandedGeju && gejuData[expandedGeju as keyof typeof gejuData] && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <span className="text-3xl">{gejuData[expandedGeju as keyof typeof gejuData].icon}</span>
              <span style={{ color: gejuData[expandedGeju as keyof typeof gejuData].color }}>{expandedGeju} 详解</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 左侧：格局分析 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">格局分析</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-800 mb-2">成格条件</div>
                      <div className="text-sm text-blue-700">
                        {gejuData[expandedGeju as keyof typeof gejuData].detailedCondition}
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800 mb-2">用神配置</div>
                      <div className="text-sm text-green-700 space-y-1">
                        <div>
                          主用神：{gejuData[expandedGeju as keyof typeof gejuData].yongshen.primary} -{" "}
                          {gejuData[expandedGeju as keyof typeof gejuData].yongshen.reason}
                        </div>
                        <div>次用神：{gejuData[expandedGeju as keyof typeof gejuData].yongshen.secondary}</div>
                      </div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="font-medium text-red-800 mb-2">忌神</div>
                      <div className="flex flex-wrap gap-2">
                        {gejuData[expandedGeju as keyof typeof gejuData].jishen.map((jishen) => (
                          <Badge key={jishen} className="bg-red-100 text-red-800">
                            {jishen}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">性格特征</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800 mb-2">正面特质</div>
                      <div className="flex flex-wrap gap-2">
                        {gejuData[expandedGeju as keyof typeof gejuData].characteristics.positive.map((trait) => (
                          <Badge key={trait} className="bg-green-100 text-green-800 text-xs">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-medium text-red-800 mb-2">注意事项</div>
                      <div className="flex flex-wrap gap-2">
                        {gejuData[expandedGeju as keyof typeof gejuData].characteristics.negative.map((trait) => (
                          <Badge key={trait} className="bg-red-100 text-red-800 text-xs">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧：经典命例 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">经典命例</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium mb-3">八字排盘</div>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {gejuData[expandedGeju as keyof typeof gejuData].example.bazi.split(" ").map((zhu, index) => (
                        <div key={index} className="text-center p-2 bg-white rounded border">
                          <div className="text-xs text-gray-500">{["年柱", "月柱", "日柱", "时柱"][index]}</div>
                          <div className="font-bold">{zhu}</div>
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-700">
                      <div className="font-medium mb-2">分析：</div>
                      <div>{gejuData[expandedGeju as keyof typeof gejuData].example.analysis}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">实战要点</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                      <span>首先确认月令或月干是否符合成格条件</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                      <span>检查是否有破格因素（如官杀混杂、伤官见官等）</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                      <span>根据日主强弱和格局特点选择合适的用神</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                      <span>注意大运流年对格局的影响和变化</span>
                    </div>
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
