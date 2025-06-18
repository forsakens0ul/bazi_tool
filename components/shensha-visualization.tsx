"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { shenshaData, shenshaLevels } from "@/data/shensha"

export default function ShenshaVisualization() {
  const [selectedShensha, setSelectedShensha] = useState<string | null>(null)
  const [hoveredShensha, setHoveredShensha] = useState<string | null>(null)

  // 雷达图布局位置计算
  const getRadarPosition = (index: number, total: number, radius = 180) => {
    const angle = ((index * 360) / total - 90) * (Math.PI / 180)
    const centerX = 300
    const centerY = 300
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    return { x, y, angle }
  }

  const shenshaList = Object.entries(shenshaData)

  // 能量雷达图
  const EnergyRadarChart = () => (
    <svg width="600" height="600" className="border rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* 背景同心圆 */}
      {[60, 120, 180].map((r) => (
        <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />
      ))}

      {/* 能量等级标识 */}
      <text x="320" y="140" textAnchor="start" fontSize="10" fill="#6b7280">
        高能量
      </text>
      <text x="320" y="200" textAnchor="start" fontSize="10" fill="#6b7280">
        中能量
      </text>
      <text x="320" y="260" textAnchor="start" fontSize="10" fill="#6b7280">
        低能量
      </text>

      {/* 神煞节点 */}
      {shenshaList.map(([name, data], index) => {
        const pos = getRadarPosition(index, shenshaList.length)
        const isSelected = selectedShensha === name
        const isHovered = hoveredShensha === name
        const levelStyle = shenshaLevels[data.level as keyof typeof shenshaLevels]

        // 根据能量值调整半径
        const energyRadius = (data.energy / 100) * 180
        const nodeRadius = isSelected ? 25 : isHovered ? 20 : 15

        return (
          <g key={name}>
            {/* 能量连接线 */}
            <line
              x1="300"
              y1="300"
              x2={300 + energyRadius * Math.cos(pos.angle)}
              y2={300 + energyRadius * Math.sin(pos.angle)}
              stroke={levelStyle.color}
              strokeWidth={isSelected ? "4" : "2"}
              opacity={isSelected ? 1 : 0.6}
            />

            {/* 神煞节点 */}
            <g
              className="cursor-pointer"
              onClick={() => setSelectedShensha(selectedShensha === name ? null : name)}
              onMouseEnter={() => setHoveredShensha(name)}
              onMouseLeave={() => setHoveredShensha(null)}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={nodeRadius}
                fill={isSelected ? levelStyle.color : levelStyle.bgColor}
                stroke={levelStyle.color}
                strokeWidth={isSelected ? "3" : "2"}
                className="transition-all duration-200"
              />
              <text
                x={pos.x}
                y={pos.y + 5}
                textAnchor="middle"
                fontSize="16"
                fill={isSelected ? "white" : levelStyle.textColor}
              >
                {data.icon}
              </text>
            </g>

            {/* 神煞名称 */}
            <text x={pos.x} y={pos.y + 35} textAnchor="middle" fontSize="12" fontWeight="bold" fill={levelStyle.color}>
              {name}
            </text>

            {/* 能量值 */}
            <text x={pos.x} y={pos.y + 50} textAnchor="middle" fontSize="10" fill="#6b7280">
              {data.energy}%
            </text>

            {/* 悬停气场效果 */}
            {isHovered && (
              <g>
                <circle cx={pos.x} cy={pos.y} r="40" fill={levelStyle.color} opacity="0.1" className="animate-pulse" />
                <rect
                  x={pos.x - 60}
                  y={pos.y - 80}
                  width="120"
                  height="50"
                  fill="white"
                  stroke={levelStyle.color}
                  strokeWidth="2"
                  rx="5"
                />
                <text
                  x={pos.x}
                  y={pos.y - 60}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill={levelStyle.color}
                >
                  {data.symbolism}
                </text>
                <text x={pos.x} y={pos.y - 45} textAnchor="middle" fontSize="8" fill="#6b7280">
                  {data.category} · {data.level}
                </text>
              </g>
            )}
          </g>
        )
      })}

      {/* 中心圆 */}
      <circle cx="300" cy="300" r="40" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" />
      <text x="300" y="295" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">
        神煞
      </text>
      <text x="300" y="315" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">
        能量图
      </text>
    </svg>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-4">
            <span>神煞可视化地图</span>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>悬停查看气场，点击查看详情</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <EnergyRadarChart />
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>神煞按能量强度分布，距离中心越远能量越强</p>
          </div>

          {/* 图例 */}
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
            {Object.entries(shenshaLevels).map(([level, style]) => (
              <div key={level} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-full border-2"
                  style={{ backgroundColor: style.bgColor, borderColor: style.color }}
                ></div>
                <span>{level}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 详细信息面板 */}
      {selectedShensha && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <span className="text-3xl">{shenshaData[selectedShensha].icon}</span>
              <span>{selectedShensha} · 气场分析</span>
              <Badge
                style={{
                  backgroundColor:
                    shenshaLevels[shenshaData[selectedShensha].level as keyof typeof shenshaLevels].bgColor,
                  color: shenshaLevels[shenshaData[selectedShensha].level as keyof typeof shenshaLevels].textColor,
                }}
              >
                能量 {shenshaData[selectedShensha].energy}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 气场特征 */}
              <Card
                className="border-2"
                style={{
                  borderColor: shenshaLevels[shenshaData[selectedShensha].level as keyof typeof shenshaLevels].color,
                }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">气场特征</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div
                      className="text-center p-4 rounded-lg"
                      style={{
                        backgroundColor:
                          shenshaLevels[shenshaData[selectedShensha].level as keyof typeof shenshaLevels].bgColor,
                      }}
                    >
                      <div className="text-4xl mb-2">{shenshaData[selectedShensha].icon}</div>
                      <div
                        className="font-bold"
                        style={{
                          color: shenshaLevels[shenshaData[selectedShensha].level as keyof typeof shenshaLevels].color,
                        }}
                      >
                        {shenshaData[selectedShensha].symbolism}
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">{shenshaData[selectedShensha].description}</div>
                  </div>
                </CardContent>
              </Card>

              {/* 能量分析 */}
              <Card
                className="border-2"
                style={{
                  borderColor: shenshaLevels[shenshaData[selectedShensha].level as keyof typeof shenshaLevels].color,
                }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">能量分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">能量等级：</span>
                      <Badge
                        style={{
                          backgroundColor:
                            shenshaLevels[shenshaData[selectedShensha].level as keyof typeof shenshaLevels].bgColor,
                          color:
                            shenshaLevels[shenshaData[selectedShensha].level as keyof typeof shenshaLevels].textColor,
                        }}
                      >
                        {shenshaData[selectedShensha].level}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">能量强度：</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${shenshaData[selectedShensha].energy}%`,
                              backgroundColor:
                                shenshaLevels[shenshaData[selectedShensha].level as keyof typeof shenshaLevels].color,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{shenshaData[selectedShensha].energy}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">分类：</span>
                      <Badge variant="outline">{shenshaData[selectedShensha].category}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 影响范围 */}
              <Card
                className="border-2"
                style={{
                  borderColor: shenshaLevels[shenshaData[selectedShensha].level as keyof typeof shenshaLevels].color,
                }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">影响范围</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {shenshaData[selectedShensha].effects.positive.length > 0 && (
                      <div>
                        <div className="text-sm font-medium text-green-800 mb-1">正面影响</div>
                        <div className="flex flex-wrap gap-1">
                          {shenshaData[selectedShensha].effects.positive.slice(0, 3).map((effect) => (
                            <Badge key={effect} className="bg-green-100 text-green-800 text-xs">
                              {effect}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {shenshaData[selectedShensha].effects.negative.length > 0 && (
                      <div>
                        <div className="text-sm font-medium text-red-800 mb-1">负面影响</div>
                        <div className="flex flex-wrap gap-1">
                          {shenshaData[selectedShensha].effects.negative.slice(0, 3).map((effect) => (
                            <Badge key={effect} className="bg-red-100 text-red-800 text-xs">
                              {effect}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
