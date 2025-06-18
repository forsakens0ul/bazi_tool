"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { wuxingShengkeData, huashenData, sanheData } from "@/data/shengke-zhihua"
import { Play, Pause, RotateCcw } from "lucide-react"

type ViewMode = "shengke" | "huashen" | "sanhe"
type AnimationState = "idle" | "sheng" | "ke" | "both"

export default function ShengkeZhihuaOverview() {
  const [viewMode, setViewMode] = useState<ViewMode>("huashen")
  const [selectedWuxing, setSelectedWuxing] = useState<string | null>(null)
  const [hoveredWuxing, setHoveredWuxing] = useState<string | null>(null)
  const [animationState, setAnimationState] = useState<AnimationState>("idle")
  const [isAnimating, setIsAnimating] = useState(false)

  const centerX = 250
  const centerY = 250
  const radius = 150

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
    if (!isAnimating) {
      // 开始动画循环
      const states: AnimationState[] = ["sheng", "ke", "both"]
      let currentIndex = 0
      const interval = setInterval(() => {
        setAnimationState(states[currentIndex])
        currentIndex = (currentIndex + 1) % states.length
      }, 2000)

      // 存储interval ID以便清理
      ;(window as any).animationInterval = interval
    } else {
      // 停止动画
      if ((window as any).animationInterval) {
        clearInterval((window as any).animationInterval)
      }
      setAnimationState("idle")
    }
  }

  const resetAnimation = () => {
    setIsAnimating(false)
    setAnimationState("idle")
    setSelectedWuxing(null)
    if ((window as any).animationInterval) {
      clearInterval((window as any).animationInterval)
    }
  }

  const handleWuxingClick = (wuxing: string) => {
    setSelectedWuxing(selectedWuxing === wuxing ? null : wuxing)
  }

  const getArrowPath = (from: string, to: string, type: "sheng" | "ke") => {
    const fromData = wuxingShengkeData[from as keyof typeof wuxingShengkeData]
    const toData = wuxingShengkeData[to as keyof typeof wuxingShengkeData]

    const fromPos = fromData.position
    const toPos = toData.position

    // 计算箭头路径
    const dx = toPos.x - fromPos.x
    const dy = toPos.y - fromPos.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const unitX = dx / distance
    const unitY = dy / distance

    const startX = fromPos.x + 30 + unitX * 25
    const startY = fromPos.y + 30 + unitY * 25
    const endX = toPos.x + 30 - unitX * 25
    const endY = toPos.y + 30 - unitY * 25

    const isVisible =
      animationState === "idle" || animationState === type || animationState === "both" || selectedWuxing === from

    const color = type === "sheng" ? "#10b981" : "#ef4444"
    const opacity = isVisible ? 1 : 0.2

    return (
      <g key={`${from}-${to}-${type}`}>
        <defs>
          <marker id={`arrowhead-${type}-${from}`} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={color} opacity={opacity} />
          </marker>
        </defs>
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={color}
          strokeWidth="3"
          strokeDasharray={type === "ke" ? "8,4" : "none"}
          markerEnd={`url(#arrowhead-${type}-${from})`}
          opacity={opacity}
          className={`transition-all duration-500 ${isAnimating && isVisible ? "animate-pulse" : ""}`}
        />
      </g>
    )
  }

  // 五行环视图
  const WuxingRing = () => (
    <svg width="500" height="500" className="border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* 外圈背景 */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius + 30}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="2"
        strokeDasharray="5,5"
      />

      {/* 生克关系箭头 */}
      {Object.entries(wuxingShengkeData).map(([wuxing, data]) => (
        <g key={`arrows-${wuxing}`}>
          {getArrowPath(wuxing, data.sheng.target, "sheng")}
          {getArrowPath(wuxing, data.ke.target, "ke")}
        </g>
      ))}

      {/* 五行节点 */}
      {Object.entries(wuxingShengkeData).map(([wuxing, data]) => {
        const isSelected = selectedWuxing === wuxing
        const isHovered = hoveredWuxing === wuxing

        return (
          <g key={wuxing}>
            <circle
              cx={data.position.x + 30}
              cy={data.position.y + 30}
              r={isSelected ? "35" : "30"}
              fill={data.bgColor}
              stroke={isSelected ? "#f59e0b" : data.color}
              strokeWidth={isSelected ? "4" : "3"}
              className="cursor-pointer transition-all duration-200 hover:scale-110"
              onClick={() => handleWuxingClick(wuxing)}
              onMouseEnter={() => setHoveredWuxing(wuxing)}
              onMouseLeave={() => setHoveredWuxing(null)}
            />
            <text
              x={data.position.x + 30}
              y={data.position.y + 38}
              textAnchor="middle"
              fontSize="18"
              fontWeight="bold"
              fill={data.textColor}
              className="cursor-pointer select-none"
              onClick={() => handleWuxingClick(wuxing)}
            >
              {wuxing}
            </text>

            {/* 悬停信息 */}
            {isHovered && (
              <g>
                <rect
                  x={data.position.x - 20}
                  y={data.position.y + 70}
                  width="100"
                  height="60"
                  fill="white"
                  stroke={data.color}
                  strokeWidth="2"
                  rx="5"
                />
                <text
                  x={data.position.x + 30}
                  y={data.position.y + 90}
                  textAnchor="middle"
                  fontSize="12"
                  fill={data.textColor}
                >
                  {data.season}季 · {data.direction}方
                </text>
                <text
                  x={data.position.x + 30}
                  y={data.position.y + 110}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#6b7280"
                >
                  生{data.sheng.target} · 克{data.ke.target}
                </text>
              </g>
            )}
          </g>
        )
      })}

      {/* 中心说明 */}
      <circle cx={centerX} cy={centerY} r="40" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" />
      <text x={centerX} y={centerY - 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">
        五行
      </text>
      <text x={centerX} y={centerY + 15} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">
        生克
      </text>
    </svg>
  )

  // 化神组合视图
  const HuashenView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(huashenData).map(([name, data]) => (
        <Card key={name} className="hover:shadow-lg transition-shadow" style={{ borderColor: data.color }}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">{data.icon}</span>
              <span style={{ color: data.color }}>{name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center p-3 rounded-lg" style={{ backgroundColor: `${data.color}20` }}>
                <div className="text-lg font-bold mb-1">
                  {data.gan1} + {data.gan2} → {data.huashen}
                </div>
                <div className="text-sm text-gray-600">{data.description}</div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="p-2 bg-blue-50 rounded">
                  <div className="font-medium text-blue-800">成化条件</div>
                  <div className="text-blue-700">{data.condition}</div>
                </div>

                <div className="p-2 bg-green-50 rounded">
                  <div className="font-medium text-green-800">化神成功</div>
                  <div className="text-green-700">{data.success}</div>
                </div>

                <div className="p-2 bg-red-50 rounded">
                  <div className="font-medium text-red-800">合而不化</div>
                  <div className="text-red-700">{data.failure}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  // 三合局视图
  const SanheView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(sanheData).map(([name, data]) => (
        <Card key={name} className="hover:shadow-lg transition-shadow" style={{ borderColor: data.color }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">{data.icon}</span>
              <span style={{ color: data.color }}>{name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: `${data.color}20` }}>
                <div className="flex justify-center space-x-4 mb-2">
                  {data.zhi.map((zhi, index) => (
                    <div key={zhi} className="flex items-center">
                      <div
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold"
                        style={{ borderColor: data.color, color: data.color }}
                      >
                        {zhi}
                      </div>
                      {index < data.zhi.length - 1 && <div className="mx-2 text-gray-400">+</div>}
                    </div>
                  ))}
                </div>
                <div className="text-lg font-bold" style={{ color: data.color }}>
                  → {data.wuxing}局
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">成局条件：</span>
                  <span className="text-gray-700">{data.condition}</span>
                </div>
                <div>
                  <span className="font-medium">作用效果：</span>
                  <span className="text-gray-700">{data.effect}</span>
                </div>
                <div>
                  <span className="font-medium">象义：</span>
                  <span className="text-gray-700">{data.description}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-4">
            <span>生克制化总览图</span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={viewMode === "huashen" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("huashen")}
              >
                化神组合
              </Button>
              <Button
                variant={viewMode === "shengke" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("shengke")}
              >
                五行生克
              </Button>
              <Button
                variant={viewMode === "sanhe" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("sanhe")}
              >
                三合局
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === "shengke" && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <WuxingRing />
              </div>

              {/* 控制按钮 */}
              <div className="flex justify-center space-x-4">
                <Button onClick={toggleAnimation} className="flex items-center space-x-2">
                  {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isAnimating ? "暂停动画" : "播放动画"}</span>
                </Button>
                <Button variant="outline" onClick={resetAnimation} className="flex items-center space-x-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>重置</span>
                </Button>
              </div>

              {/* 图例 */}
              <div className="flex justify-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-1 bg-green-500"></div>
                  <span className="text-sm">相生关系</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-1 bg-red-500 border-dashed border-t-2 border-red-500"></div>
                  <span className="text-sm">相克关系</span>
                </div>
              </div>
            </div>
          )}

          {viewMode === "huashen" && <HuashenView />}
          {viewMode === "sanhe" && <SanheView />}
        </CardContent>
      </Card>

      {/* 详细解释面板 */}
      {selectedWuxing && viewMode === "shengke" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold"
                style={{
                  backgroundColor: wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].bgColor,
                  borderColor: wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].color,
                  color: wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].textColor,
                }}
              >
                {selectedWuxing}
              </div>
              <span style={{ color: wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].color }}>
                {selectedWuxing}行生克详解
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 生克关系 */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">生克关系</h4>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">
                      {wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].sheng.icon}
                    </span>
                    <Badge className="bg-green-500 text-white">我生</Badge>
                    <span className="font-medium">
                      {selectedWuxing} →{" "}
                      {wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].sheng.target}
                    </span>
                  </div>
                  <div className="text-sm text-green-700">
                    {wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].sheng.description}
                  </div>
                </div>

                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">
                      {wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].ke.icon}
                    </span>
                    <Badge className="bg-red-500 text-white">我克</Badge>
                    <span className="font-medium">
                      {selectedWuxing} → {wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].ke.target}
                    </span>
                  </div>
                  <div className="text-sm text-red-700">
                    {wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].ke.description}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">
                      {wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].beisheng.icon}
                    </span>
                    <Badge className="bg-blue-500 text-white">生我</Badge>
                    <span className="font-medium">
                      {wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].beisheng.from} →{" "}
                      {selectedWuxing}
                    </span>
                  </div>
                  <div className="text-sm text-blue-700">
                    {wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].beisheng.description}
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">
                      {wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].beike.icon}
                    </span>
                    <Badge className="bg-purple-500 text-white">克我</Badge>
                    <span className="font-medium">
                      {wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].beike.from} →{" "}
                      {selectedWuxing}
                    </span>
                  </div>
                  <div className="text-sm text-purple-700">
                    {wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].beike.description}
                  </div>
                </div>
              </div>

              {/* 特性与应用 */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">特性与应用</h4>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium mb-2">基本特性</div>
                  <div className="flex flex-wrap gap-2">
                    {wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].characteristics.map((char) => (
                      <Badge key={char} variant="outline">
                        {char}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="font-medium text-yellow-800 mb-2">时空属性</div>
                  <div className="text-sm text-yellow-700 space-y-1">
                    <div>季节：{wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].season}</div>
                    <div>方位：{wuxingShengkeData[selectedWuxing as keyof typeof wuxingShengkeData].direction}</div>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg">
                  <div className="font-medium text-indigo-800 mb-2">命理应用</div>
                  <div className="text-sm text-indigo-700 space-y-1">
                    <div>• 作为日主时的性格特征</div>
                    <div>• 作为用神时的作用方向</div>
                    <div>• 在格局中的地位和作用</div>
                    <div>• 与其他五行的配合关系</div>
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
