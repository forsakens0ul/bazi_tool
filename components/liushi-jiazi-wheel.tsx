"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { generateLiushiJiazi, wuxingColors } from "@/data/liushijiazi"

const jiaziData = generateLiushiJiazi()

type FilterType = "all" | "木" | "火" | "土" | "金" | "水"

export default function LiushiJiaziWheel() {
  const [selectedJiazi, setSelectedJiazi] = useState<any>(null)
  const [hoveredJiazi, setHoveredJiazi] = useState<any>(null)
  const [filter, setFilter] = useState<FilterType>("all")

  const centerX = 300
  const centerY = 300
  const radius = 220
  const innerRadius = 180

  // 计算每个甲子在圆周上的位置
  const getPosition = (index: number) => {
    const angle = (index * 6 - 90) * (Math.PI / 180) // 从顶部开始，每个6度
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    return { x, y, angle }
  }

  // 获取内圈五行标识位置
  const getInnerPosition = (index: number) => {
    const angle = (index * 6 - 90) * (Math.PI / 180)
    const x = centerX + innerRadius * Math.cos(angle)
    const y = centerY + innerRadius * Math.sin(angle)
    return { x, y }
  }

  // 过滤甲子数据
  const filteredJiazi =
    filter === "all"
      ? jiaziData
      : jiaziData.filter((item) => item.ganData.wuxing === filter || item.zhiData.wuxing === filter)

  const handleJiaziClick = (jiazi: any) => {
    setSelectedJiazi(jiazi)
  }

  const handleJiaziHover = (jiazi: any) => {
    setHoveredJiazi(jiazi)
  }

  const handleJiaziLeave = () => {
    setHoveredJiazi(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-4">
            <span>六十甲子轮盘图</span>
            <div className="flex flex-wrap gap-2">
              <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                全部
              </Button>
              {Object.keys(wuxingColors).map((wuxing) => (
                <Button
                  key={wuxing}
                  variant={filter === wuxing ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(wuxing as FilterType)}
                  style={{
                    backgroundColor:
                      filter === wuxing ? wuxingColors[wuxing as keyof typeof wuxingColors].border : undefined,
                    borderColor: wuxingColors[wuxing as keyof typeof wuxingColors].border,
                    color: filter === wuxing ? "white" : wuxingColors[wuxing as keyof typeof wuxingColors].text,
                  }}
                >
                  {wuxing}行
                </Button>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className="relative">
              <svg
                width="600"
                height="600"
                viewBox="0 0 600 600"
                className="border rounded-lg bg-gradient-to-br from-amber-50 to-orange-50"
              >
                {/* 外圈背景圆 */}
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={radius + 30}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />

                {/* 内圈背景圆 */}
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={innerRadius - 20}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />

                {/* 中心圆 */}
                <circle cx={centerX} cy={centerY} r="60" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" />
                <text x={centerX} y={centerY - 10} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#92400e">
                  六十
                </text>
                <text x={centerX} y={centerY + 15} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#92400e">
                  甲子
                </text>

                {/* 绘制六十甲子 */}
                {jiaziData.map((jiazi, index) => {
                  const pos = getPosition(index)
                  const innerPos = getInnerPosition(index)
                  const isFiltered =
                    filter === "all" || jiazi.ganData.wuxing === filter || jiazi.zhiData.wuxing === filter
                  const isSelected = selectedJiazi?.index === jiazi.index
                  const isHovered = hoveredJiazi?.index === jiazi.index

                  const ganColor = wuxingColors[jiazi.ganData.wuxing as keyof typeof wuxingColors]
                  const zhiColor = wuxingColors[jiazi.zhiData.wuxing as keyof typeof wuxingColors]

                  return (
                    <g key={jiazi.combination}>
                      {/* 连接线 */}
                      <line
                        x1={innerPos.x}
                        y1={innerPos.y}
                        x2={pos.x}
                        y2={pos.y}
                        stroke={isFiltered ? "#d1d5db" : "#f3f4f6"}
                        strokeWidth="1"
                      />

                      {/* 内圈五行标识 */}
                      <circle cx={innerPos.x} cy={innerPos.y} r="4" fill={isFiltered ? ganColor.border : "#e5e7eb"} />

                      {/* 外圈甲子组合 */}
                      <g
                        className="cursor-pointer"
                        onClick={() => handleJiaziClick(jiazi)}
                        onMouseEnter={() => handleJiaziHover(jiazi)}
                        onMouseLeave={handleJiaziLeave}
                      >
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="18"
                          fill={isSelected ? "#fbbf24" : isFiltered ? "white" : "#f9fafb"}
                          stroke={isSelected ? "#f59e0b" : isFiltered ? ganColor.border : "#e5e7eb"}
                          strokeWidth={isSelected ? "3" : isHovered ? "2" : "1"}
                          opacity={isFiltered ? 1 : 0.3}
                        />
                        <text
                          x={pos.x}
                          y={pos.y + 5}
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="bold"
                          fill={isSelected ? "#92400e" : isFiltered ? ganColor.text : "#9ca3af"}
                        >
                          {jiazi.combination}
                        </text>
                      </g>
                    </g>
                  )
                })}

                {/* 方位标识 */}
                <text x={centerX} y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6b7280">
                  北
                </text>
                <text x="560" y={centerY + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6b7280">
                  东
                </text>
                <text x={centerX} y="580" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6b7280">
                  南
                </text>
                <text x="40" y={centerY + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6b7280">
                  西
                </text>
              </svg>

              {/* 悬停提示 */}
              {hoveredJiazi && (
                <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg border max-w-xs z-10">
                  <div className="text-sm">
                    <div className="font-bold text-lg mb-2">{hoveredJiazi.combination}</div>
                    <div className="space-y-1">
                      <div>
                        纳音：<span className="font-medium">{hoveredJiazi.nayin}</span>
                      </div>
                      <div>年份：{hoveredJiazi.years.slice(0, 2).join(", ")}...</div>
                      <div className="flex space-x-2 mt-2">
                        <Badge
                          style={{
                            backgroundColor: wuxingColors[hoveredJiazi.ganData.wuxing as keyof typeof wuxingColors].bg,
                          }}
                        >
                          {hoveredJiazi.gan}({hoveredJiazi.ganData.wuxing})
                        </Badge>
                        <Badge
                          style={{
                            backgroundColor: wuxingColors[hoveredJiazi.zhiData.wuxing as keyof typeof wuxingColors].bg,
                          }}
                        >
                          {hoveredJiazi.zhi}({hoveredJiazi.zhiData.wuxing})
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>悬停查看简要信息，点击甲子获取详细解释</p>
          </div>
        </CardContent>
      </Card>

      {/* 详细解释卡片 */}
      {selectedJiazi && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-amber-600">{selectedJiazi.combination}</span>
              <span className="text-lg">（第{selectedJiazi.index}位）</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 左侧：干支分析 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">干支分析</h4>

                  {/* 天干分析 */}
                  <div
                    className="p-4 rounded-lg mb-4"
                    style={{
                      backgroundColor: wuxingColors[selectedJiazi.ganData.wuxing as keyof typeof wuxingColors].bg,
                    }}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl font-bold">{selectedJiazi.gan}</span>
                      <Badge
                        style={{
                          backgroundColor:
                            wuxingColors[selectedJiazi.ganData.wuxing as keyof typeof wuxingColors].border,
                          color: "white",
                        }}
                      >
                        天干
                      </Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <div>
                        五行：
                        <span className="font-medium">
                          {selectedJiazi.ganData.yinyang}
                          {selectedJiazi.ganData.wuxing}
                        </span>
                      </div>
                      <div>
                        方位：<span className="font-medium">{selectedJiazi.ganData.direction}方</span>
                      </div>
                      <div>
                        象义：<span className="font-medium">{selectedJiazi.ganData.meaning}</span>
                      </div>
                    </div>
                  </div>

                  {/* 地支分析 */}
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: wuxingColors[selectedJiazi.zhiData.wuxing as keyof typeof wuxingColors].bg,
                    }}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl font-bold">{selectedJiazi.zhi}</span>
                      <Badge
                        style={{
                          backgroundColor:
                            wuxingColors[selectedJiazi.zhiData.wuxing as keyof typeof wuxingColors].border,
                          color: "white",
                        }}
                      >
                        地支
                      </Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <div>
                        五行：
                        <span className="font-medium">
                          {selectedJiazi.zhiData.yinyang}
                          {selectedJiazi.zhiData.wuxing}
                        </span>
                      </div>
                      <div>
                        方位：<span className="font-medium">{selectedJiazi.zhiData.direction}</span>
                      </div>
                      <div>
                        象义：<span className="font-medium">{selectedJiazi.zhiData.meaning}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 组合关系 */}
                <div>
                  <h4 className="font-semibold mb-3">组合关系</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm">
                      <div className="mb-2">
                        <span className="font-medium">干支配合：</span>
                        {selectedJiazi.ganData.wuxing === selectedJiazi.zhiData.wuxing
                          ? "同气相求"
                          : (selectedJiazi.ganData.wuxing === "木" && selectedJiazi.zhiData.wuxing === "水") ||
                              (selectedJiazi.ganData.wuxing === "火" && selectedJiazi.zhiData.wuxing === "木") ||
                              (selectedJiazi.ganData.wuxing === "土" && selectedJiazi.zhiData.wuxing === "火") ||
                              (selectedJiazi.ganData.wuxing === "金" && selectedJiazi.zhiData.wuxing === "土") ||
                              (selectedJiazi.ganData.wuxing === "水" && selectedJiazi.zhiData.wuxing === "金")
                            ? "相生和谐"
                            : "需要调和"}
                      </div>
                      <div>
                        <span className="font-medium">组合特点：</span>
                        天干{selectedJiazi.gan}为{selectedJiazi.ganData.yinyang}
                        {selectedJiazi.ganData.wuxing}， 地支{selectedJiazi.zhi}为{selectedJiazi.zhiData.yinyang}
                        {selectedJiazi.zhiData.wuxing}， 两者结合体现了{selectedJiazi.ganData.meaning.split("，")[0]}与
                        {selectedJiazi.zhiData.meaning.split("，")[0]}的融合。
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧：纳音与应用 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">纳音五行</h4>
                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                    <div className="text-center mb-3">
                      <span className="text-2xl font-bold text-amber-700">{selectedJiazi.nayin}</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p>纳音是古代命理学中的重要概念，将六十甲子配以五行属性，用以推断人的性格特征和命运走向。</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">年份举例</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedJiazi.years.map((year: number) => (
                      <div key={year} className="p-2 bg-blue-50 rounded text-center">
                        <span className="font-medium text-blue-700">{year}年</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">* 每60年循环一次</div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">命理应用</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">流年排盘</Badge>
                      <span>用于推算年运变化</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">流月换算</Badge>
                      <span>月份干支的推算基础</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">年柱基础</Badge>
                      <span>八字排盘的年柱确定</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">纳音分析</Badge>
                      <span>性格特征的辅助判断</span>
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
