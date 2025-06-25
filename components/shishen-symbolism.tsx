"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { shishenData } from "@/data/shishen"
import { User, Users } from "lucide-react"

type Gender = "male" | "female"

export default function ShishenSymbolism() {
  const [selectedShishen, setSelectedShishen] = useState<string | null>(null)
  const [gender, setGender] = useState<Gender>("male")

  // 12宫布局位置计算
  const getPosition = (index: number) => {
    const angle = (index * 36 - 90) * (Math.PI / 180) // 每个36度，从顶部开始
    const radius = 180
    const centerX = 250
    const centerY = 250
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    return { x, y }
  }

  const shishenList = Object.entries(shishenData)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-4">
            <span>十神象义对照图</span>
            <div className="flex items-center space-x-2">
              <Button
                variant={gender === "male" ? "default" : "outline"}
                size="sm"
                onClick={() => setGender("male")}
                className="flex items-center space-x-1"
              >
                <User className="w-4 h-4" />
                <span>男命</span>
              </Button>
              <Button
                variant={gender === "female" ? "default" : "outline"}
                size="sm"
                onClick={() => setGender("female")}
                className="flex items-center space-x-1"
              >
                <Users className="w-4 h-4" />
                <span>女命</span>
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className="relative">
              <svg
                width="500"
                height="500"
                viewBox="0 0 500 500"
                className="border rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50"
              >
                {/* 中心圆 */}
                <circle cx="250" cy="250" r="60" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" />
                <text x="250" y="245" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">
                  十神
                </text>
                <text x="250" y="265" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">
                  象义
                </text>

                {/* 外圈连接线 */}
                <circle cx="250" cy="250" r="180" fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />

                {/* 十神节点 */}
                {shishenList.map(([name, data], index) => {
                  const pos = getPosition(index)
                  const isSelected = selectedShishen === name

                  return (
                    <g key={name}>
                      {/* 连接线 */}
                      <line
                        x1="250"
                        y1="250"
                        x2={pos.x}
                        y2={pos.y}
                        stroke={data.color}
                        strokeWidth={isSelected ? "3" : "1"}
                        opacity={isSelected ? 1 : 0.3}
                      />

                      {/* 十神节点 */}
                      <g
                        className="cursor-pointer"
                        onClick={() => setSelectedShishen(selectedShishen === name ? null : name)}
                      >
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={isSelected ? "35" : "30"}
                          fill={isSelected ? data.color : `${data.color}20`}
                          stroke={data.color}
                          strokeWidth={isSelected ? "3" : "2"}
                        />
                        <text
                          x={pos.x}
                          y={pos.y - 5}
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="bold"
                          fill={isSelected ? "white" : data.color}
                        >
                          {name}
                        </text>
                        <text
                          x={pos.x}
                          y={pos.y + 8}
                          textAnchor="middle"
                          fontSize="16"
                          fill={isSelected ? "white" : data.color}
                        >
                          {data.icon}
                        </text>
                      </g>

                      {/* 关键词标签 */}
                      {isSelected && (
                        <g>
                          <rect
                            x={pos.x - 40}
                            y={pos.y + 45}
                            width="80"
                            height="30"
                            fill="white"
                            stroke={data.color}
                            strokeWidth="1"
                            rx="5"
                          />
                          <text
                            x={pos.x}
                            y={pos.y + 65}
                            textAnchor="middle"
                            fontSize="10"
                            fill={data.color}
                            fontWeight="bold"
                          >
                            {data.keywords.slice(0, 2).join(" · ")}
                          </text>
                        </g>
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>点击十神节点查看详细象义，支持男命/女命切换</p>
          </div>
        </CardContent>
      </Card>

      {/* 详细象义展示 */}
      {selectedShishen && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <span className="text-3xl">{shishenData[selectedShishen].icon}</span>
              <span style={{ color: shishenData[selectedShishen].color }}>{selectedShishen} · 象义解析</span>
              <Badge
                style={{
                  backgroundColor: `${shishenData[selectedShishen].color}20`,
                  color: shishenData[selectedShishen].color,
                }}
              >
                {gender === "male" ? "男命" : "女命"}视角
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 基本象义 */}
              <Card className="border-2" style={{ borderColor: `${shishenData[selectedShishen].color}40` }}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">基本象义</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div
                      className="text-center p-4 rounded-lg"
                      style={{ backgroundColor: `${shishenData[selectedShishen].color}10` }}
                    >
                      <div className="text-4xl mb-2">{shishenData[selectedShishen].icon}</div>
                      <div className="font-bold" style={{ color: shishenData[selectedShishen].color }}>
                        {shishenData[selectedShishen].essence}
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">{shishenData[selectedShishen].description}</div>
                    <div className="flex flex-wrap gap-1">
                      {shishenData[selectedShishen].keywords.map((keyword) => (
                        <Badge key={keyword} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 现实对应 */}
              <Card className="border-2" style={{ borderColor: `${shishenData[selectedShishen].color}40` }}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">现实对应</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-800 mb-1">人物关系</div>
                      <div className="text-sm text-blue-700">
                        {shishenData[selectedShishen].genderDifference[gender].meaning}
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800 mb-1">事物象征</div>
                      <div className="text-sm text-green-700">{shishenData[selectedShishen].lifeAspects.career}</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-medium text-purple-800 mb-1">性格体现</div>
                      <div className="text-sm text-purple-700">
                        {shishenData[selectedShishen].lifeAspects.personality}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 应用场景 */}
              <Card className="border-2" style={{ borderColor: `${shishenData[selectedShishen].color}40` }}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">应用场景</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-medium text-yellow-800 mb-1">财运分析</div>
                      <div className="text-sm text-yellow-700">{shishenData[selectedShishen].lifeAspects.wealth}</div>
                    </div>
                    <div className="p-3 bg-pink-50 rounded-lg">
                      <div className="font-medium text-pink-800 mb-1">感情婚姻</div>
                      <div className="text-sm text-pink-700">
                        {shishenData[selectedShishen].lifeAspects.relationship}
                      </div>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <div className="font-medium text-indigo-800 mb-1">主要影响</div>
                      <div className="text-sm text-indigo-700">
                        {shishenData[selectedShishen].genderDifference[gender].influence}
                      </div>
                    </div>
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
