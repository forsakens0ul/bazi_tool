"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { wuxingFlow } from "@/data/geju"
import { Play, Pause, RotateCcw } from "lucide-react"

type ViewMode = "shengke" | "tiaohou" | "congge"
type FlowType = "yongshen" | "jishen" | "all"

export default function YongshenFlow() {
  const [viewMode, setViewMode] = useState<ViewMode>("shengke")
  const [flowType, setFlowType] = useState<FlowType>("all")
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedPath, setSelectedPath] = useState<string | null>(null)

  const wuxingPositions = {
    木: { x: 200, y: 80, color: "#10b981" },
    火: { x: 320, y: 160, color: "#ef4444" },
    土: { x: 280, y: 280, color: "#f59e0b" },
    金: { x: 120, y: 280, color: "#6b7280" },
    水: { x: 80, y: 160, color: "#3b82f6" },
  }

  const shishenPositions = {
    印: { x: 200, y: 40, label: "印绶", color: "#16a34a" },
    食: { x: 360, y: 120, label: "食伤", color: "#10b981" },
    财: { x: 360, y: 240, label: "财星", color: "#059669" },
    官: { x: 200, y: 320, label: "官杀", color: "#1d4ed8" },
    比: { x: 40, y: 180, label: "比劫", color: "#3b82f6" },
  }

  const centerPosition = { x: 200, y: 180 }

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
  }

  const resetAnimation = () => {
    setIsAnimating(false)
    setSelectedPath(null)
  }

  const handlePathClick = (path: string) => {
    setSelectedPath(selectedPath === path ? null : path)
  }

  // 五行环动画
  const WuxingRing = () => (
    <svg width="400" height="360" className="border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* 外圈连接线 */}
      <circle cx="200" cy="180" r="120" fill="none" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="5,5" />

      {/* 生克关系箭头 */}
      {Object.entries(wuxingFlow.生).map(([from, data]) => {
        const fromPos = wuxingPositions[from as keyof typeof wuxingPositions]
        const toPos = wuxingPositions[data.target as keyof typeof wuxingPositions]
        const isSelected = selectedPath === `${from}-生-${data.target}`
        const isYongshen = flowType === "yongshen"
        const isJishen = flowType === "jishen"

        return (
          <g key={`sheng-${from}-${data.target}`}>
            <defs>
              <marker
                id={`arrowhead-sheng-${from}`}
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill={isSelected ? "#10b981" : "#94a3b8"} />
              </marker>
            </defs>
            <line
              x1={fromPos.x}
              y1={fromPos.y}
              x2={toPos.x}
              y2={toPos.y}
              stroke={isSelected ? "#10b981" : isYongshen ? "#10b981" : isJishen ? "#ef4444" : "#94a3b8"}
              strokeWidth={isSelected ? "4" : "2"}
              markerEnd={`url(#arrowhead-sheng-${from})`}
              className={`cursor-pointer transition-all duration-300 ${isAnimating ? "animate-pulse" : ""}`}
              onClick={() => handlePathClick(`${from}-生-${data.target}`)}
            />
          </g>
        )
      })}

      {/* 五行节点 */}
      {Object.entries(wuxingPositions).map(([wuxing, pos]) => (
        <g key={wuxing}>
          <circle
            cx={pos.x}
            cy={pos.y}
            r="25"
            fill={pos.color}
            stroke="white"
            strokeWidth="3"
            className="cursor-pointer hover:scale-110 transition-transform"
          />
          <text x={pos.x} y={pos.y + 5} textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">
            {wuxing}
          </text>
        </g>
      ))}

      {/* 中心日主 */}
      <circle cx="200" cy="180" r="30" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" />
      <text x="200" y="185" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">
        日主
      </text>
    </svg>
  )

  // 气机流动图
  const QijiFlow = () => (
    <svg width="400" height="360" className="border rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
      {/* 连接线 */}
      {Object.entries(shishenPositions).map(([shishen, pos]) => {
        const isYongshenPath = flowType === "yongshen" && ["印", "比"].includes(shishen)
        const isJishenPath = flowType === "jishen" && ["食", "财"].includes(shishen)

        return (
          <line
            key={`line-${shishen}`}
            x1={centerPosition.x}
            y1={centerPosition.y}
            x2={pos.x}
            y2={pos.y}
            stroke={isYongshenPath ? "#10b981" : isJishenPath ? "#ef4444" : "#d1d5db"}
            strokeWidth={isYongshenPath || isJishenPath ? "3" : "1"}
            strokeDasharray={isJishenPath ? "5,5" : "none"}
            className={`transition-all duration-300 ${isAnimating ? "animate-pulse" : ""}`}
          />
        )
      })}

      {/* 十神节点 */}
      {Object.entries(shishenPositions).map(([shishen, pos]) => {
        const isYongshen = flowType === "yongshen" && ["印", "比"].includes(shishen)
        const isJishen = flowType === "jishen" && ["食", "财"].includes(shishen)

        return (
          <g key={shishen}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r="20"
              fill={isYongshen ? "#10b981" : isJishen ? "#ef4444" : pos.color}
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer hover:scale-110 transition-transform"
              onClick={() => handlePathClick(`${shishen}-path`)}
            />
            <text x={pos.x} y={pos.y + 4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">
              {pos.label}
            </text>
          </g>
        )
      })}

      {/* 中心日主 */}
      <circle cx={centerPosition.x} cy={centerPosition.y} r="25" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" />
      <text
        x={centerPosition.x}
        y={centerPosition.y + 5}
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fill="#92400e"
      >
        日主
      </text>
    </svg>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-4">
            <span>用神流通动画</span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={viewMode === "shengke" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("shengke")}
              >
                生克流通
              </Button>
              <Button
                variant={viewMode === "tiaohou" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("tiaohou")}
              >
                调候视角
              </Button>
              <Button
                variant={viewMode === "congge" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("congge")}
              >
                从格视角
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 左侧：动画图 */}
            <div className="flex-1">
              <div className="flex justify-center mb-4">{viewMode === "shengke" ? <WuxingRing /> : <QijiFlow />}</div>

              {/* 控制按钮 */}
              <div className="flex justify-center space-x-4">
                <Button onClick={toggleAnimation} className="flex items-center space-x-2">
                  {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isAnimating ? "暂停" : "播放"}</span>
                </Button>
                <Button variant="outline" onClick={resetAnimation} className="flex items-center space-x-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>重置</span>
                </Button>
              </div>
            </div>

            {/* 右侧：控制面板 */}
            <div className="w-full lg:w-80 space-y-4">
              <div>
                <h4 className="font-semibold mb-3">流通类型</h4>
                <div className="space-y-2">
                  <Button
                    variant={flowType === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFlowType("all")}
                    className="w-full"
                  >
                    显示全部
                  </Button>
                  <Button
                    variant={flowType === "yongshen" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFlowType("yongshen")}
                    className="w-full bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                  >
                    用神路线
                  </Button>
                  <Button
                    variant={flowType === "jishen" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFlowType("jishen")}
                    className="w-full bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                  >
                    忌神路线
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">图例说明</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-1 bg-green-500"></div>
                    <span>用神流通路线</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-1 bg-red-500 border-dashed border-t-2 border-red-500"></div>
                    <span>忌神阻碍路线</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-1 bg-gray-400"></div>
                    <span>中性关系</span>
                  </div>
                </div>
              </div>

              {viewMode === "shengke" && (
                <div>
                  <h4 className="font-semibold mb-3">五行生克</h4>
                  <div className="space-y-2 text-sm">
                    <div>木生火 → 文明礼智</div>
                    <div>火生土 → 包容厚德</div>
                    <div>土生金 → 收敛肃杀</div>
                    <div>金生水 → 智慧流动</div>
                    <div>水生木 → 生发条达</div>
                  </div>
                </div>
              )}

              {viewMode === "tiaohou" && (
                <div>
                  <h4 className="font-semibold mb-3">调候要点</h4>
                  <div className="space-y-2 text-sm">
                    <div>春木 → 需火暖局</div>
                    <div>夏火 → 需水润燥</div>
                    <div>秋金 → 需火炼金</div>
                    <div>冬水 → 需火解冻</div>
                    <div>四季土 → 看干湿</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 路径解释面板 */}
      {selectedPath && (
        <Card>
          <CardHeader>
            <CardTitle>路径解释</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-800 mb-2">选中路径：{selectedPath}</div>
              <div className="text-sm text-blue-700">
                {selectedPath.includes("生") ? (
                  <div>
                    <p>这是一条生扶路线，表示五行之间的相生关系。</p>
                    <p>在用神配置中，生扶路线通常用来：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>增强日主力量（印绶生身）</li>
                      <li>生助用神发挥作用</li>
                      <li>形成连续的生扶链条</li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    <p>这是一条十神作用路线。</p>
                    <p>点击了解该十神在格局中的具体作用和重要性。</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
