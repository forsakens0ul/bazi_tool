"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const wuxingData = {
  木: {
    color: "#16a34a",
    bgColor: "#dcfce7",
    textColor: "#15803d",
    position: { x: 200, y: 50 },
  },
  火: {
    color: "#dc2626",
    bgColor: "#fee2e2",
    textColor: "#b91c1c",
    position: { x: 350, y: 150 },
  },
  土: {
    color: "#ca8a04",
    bgColor: "#fef3c7",
    textColor: "#a16207",
    position: { x: 300, y: 300 },
  },
  金: {
    color: "#6b7280",
    bgColor: "#f3f4f6",
    textColor: "#4b5563",
    position: { x: 100, y: 300 },
  },
  水: {
    color: "#2563eb",
    bgColor: "#dbeafe",
    textColor: "#1d4ed8",
    position: { x: 50, y: 150 },
  },
}

const shengRelations = {
  木: "火",
  火: "土",
  土: "金",
  金: "水",
  水: "木",
}

const keRelations = {
  木: "土",
  火: "金",
  土: "水",
  金: "木",
  水: "火",
}

const wuxingMeaning = {
  木: { 性质: "生发、条达", 方位: "东方", 季节: "春季", 脏腑: "肝胆" },
  火: { 性质: "炎热、向上", 方位: "南方", 季节: "夏季", 脏腑: "心小肠" },
  土: { 性质: "承载、化育", 方位: "中央", 季节: "长夏", 脏腑: "脾胃" },
  金: { 性质: "收敛、肃杀", 方位: "西方", 季节: "秋季", 脏腑: "肺大肠" },
  水: { 性质: "滋润、向下", 方位: "北方", 季节: "冬季", 脏腑: "肾膀胱" },
}

type WuxingType = keyof typeof wuxingData

export default function WuxingCycle() {
  const [selectedElement, setSelectedElement] = useState<WuxingType | null>(null)
  const [showRelation, setShowRelation] = useState<"sheng" | "ke" | null>(null)

  const handleElementClick = (element: WuxingType) => {
    setSelectedElement(element)
    setShowRelation(null)
  }

  const showShengRelation = () => {
    setShowRelation("sheng")
  }

  const showKeRelation = () => {
    setShowRelation("ke")
  }

  const resetView = () => {
    setShowRelation(null)
    setSelectedElement(null)
  }

  const getArrowPath = (from: WuxingType, to: WuxingType, type: "sheng" | "ke") => {
    const fromPos = wuxingData[from].position
    const toPos = wuxingData[to].position
    const color = type === "sheng" ? "#10b981" : "#ef4444"

    // 计算箭头的起点和终点，避免与圆圈重叠
    const dx = toPos.x - fromPos.x
    const dy = toPos.y - fromPos.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const unitX = dx / distance
    const unitY = dy / distance

    const startX = fromPos.x + 40 + unitX * 35
    const startY = fromPos.y + 40 + unitY * 35
    const endX = toPos.x + 40 - unitX * 35
    const endY = toPos.y + 40 - unitY * 35

    return (
      <g key={`${from}-${to}-${type}`}>
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={color}
          strokeWidth="3"
          strokeDasharray={type === "sheng" ? "none" : "8,4"}
          markerEnd={`url(#arrowhead-${type})`}
        />
      </g>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-4">
            <span>五行相生相克图</span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={showShengRelation}
                className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
              >
                显示相生
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={showKeRelation}
                className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
              >
                显示相克
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetView}
                className="bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
              >
                重置
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <svg width="450" height="400" viewBox="0 0 450 400" className="border rounded-lg bg-white">
              {/* 定义箭头标记 */}
              <defs>
                <marker
                  id="arrowhead-sheng"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                </marker>
                <marker
                  id="arrowhead-ke"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                </marker>
              </defs>

              {/* 绘制相生或相克关系箭头 */}
              {showRelation === "sheng" &&
                Object.entries(shengRelations).map(([from, to]) =>
                  getArrowPath(from as WuxingType, to as WuxingType, "sheng"),
                )}
              {showRelation === "ke" &&
                Object.entries(keRelations).map(([from, to]) =>
                  getArrowPath(from as WuxingType, to as WuxingType, "ke"),
                )}

              {/* 绘制五行元素 */}
              {Object.entries(wuxingData).map(([element, data]) => (
                <g key={element}>
                  <circle
                    cx={data.position.x + 40}
                    cy={data.position.y + 40}
                    r="35"
                    fill={data.bgColor}
                    stroke={selectedElement === element ? "#f59e0b" : data.color}
                    strokeWidth={selectedElement === element ? "4" : "2"}
                    className="cursor-pointer transition-all duration-200 hover:stroke-4"
                    onClick={() => handleElementClick(element as WuxingType)}
                  />
                  <text
                    x={data.position.x + 40}
                    y={data.position.y + 48}
                    textAnchor="middle"
                    fontSize="24"
                    fontWeight="bold"
                    fill={data.textColor}
                    className="cursor-pointer select-none"
                    onClick={() => handleElementClick(element as WuxingType)}
                  >
                    {element}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>点击五行元素查看详细信息，点击上方按钮显示相生相克关系</p>
          </div>

          {/* 图例 */}
          <div className="mt-4 flex justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-green-500"></div>
              <span className="text-sm text-gray-600">相生关系</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-red-500 border-dashed border-t-2 border-red-500"></div>
              <span className="text-sm text-gray-600">相克关系</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedElement && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div
                className="w-6 h-6 rounded-full border-2"
                style={{
                  backgroundColor: wuxingData[selectedElement].bgColor,
                  borderColor: wuxingData[selectedElement].color,
                }}
              ></div>
              <span style={{ color: wuxingData[selectedElement].textColor }}>{selectedElement}行详解</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 text-gray-800">基本属性</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(wuxingMeaning[selectedElement]).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">{key}：</span>
                        <span className="text-gray-800">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 text-gray-800">生克关系</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3 p-2 bg-green-50 rounded">
                      <Badge className="bg-green-500 text-white">生</Badge>
                      <span className="text-gray-700">
                        {selectedElement} → {shengRelations[selectedElement]}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-red-50 rounded">
                      <Badge className="bg-red-500 text-white">克</Badge>
                      <span className="text-gray-700">
                        {selectedElement} → {keRelations[selectedElement]}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded">
                      <Badge className="bg-blue-500 text-white">被生</Badge>
                      <span className="text-gray-700">
                        {Object.entries(shengRelations).find(([_, target]) => target === selectedElement)?.[0]} →{" "}
                        {selectedElement}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-purple-50 rounded">
                      <Badge className="bg-purple-500 text-white">被克</Badge>
                      <span className="text-gray-700">
                        {Object.entries(keRelations).find(([_, target]) => target === selectedElement)?.[0]} →{" "}
                        {selectedElement}
                      </span>
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
