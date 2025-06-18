"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { dizhiCangganData, wuxingColors, cangganTypeColors, wuxingRelations } from "@/data/dizhi-canggan"

type ViewMode = "cards" | "mindmap"

export default function DizhiCangganDetail() {
  const [selectedZhi, setSelectedZhi] = useState<string | null>(null)
  const [selectedGan, setSelectedGan] = useState<any>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("cards")
  const [hoveredGan, setHoveredGan] = useState<string | null>(null)

  const handleZhiClick = (zhi: string) => {
    setSelectedZhi(selectedZhi === zhi ? null : zhi)
    setSelectedGan(null)
  }

  const handleGanClick = (gan: any, zhi: string) => {
    setSelectedGan({ ...gan, fromZhi: zhi })
  }

  const getShengKeRelation = (from: string, to: string) => {
    if (wuxingRelations.生[from as keyof typeof wuxingRelations.生] === to) return "生"
    if (wuxingRelations.克[from as keyof typeof wuxingRelations.克] === to) return "克"
    if (wuxingRelations.生[to as keyof typeof wuxingRelations.生] === from) return "被生"
    if (wuxingRelations.克[to as keyof typeof wuxingRelations.克] === from) return "被克"
    return "同气"
  }

  // 卡片式视图
  const CardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Object.entries(dizhiCangganData).map(([zhi, data]) => (
        <Card
          key={zhi}
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            selectedZhi === zhi ? "ring-2 ring-amber-400 shadow-lg" : ""
          }`}
          onClick={() => handleZhiClick(zhi)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">{zhi}</span>
                <Badge
                  style={{
                    backgroundColor: wuxingColors[data.wuxing as keyof typeof wuxingColors].bg,
                    color: wuxingColors[data.wuxing as keyof typeof wuxingColors].text,
                  }}
                >
                  {data.yinyang}
                  {data.wuxing}
                </Badge>
              </div>
              <Badge variant="outline" className="text-xs">
                {data.season}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.canggan.map((canggan, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    canggan.type === "本气"
                      ? "border-solid"
                      : canggan.type === "中气"
                        ? "border-dashed"
                        : "border-dotted"
                  }`}
                  style={{
                    backgroundColor: wuxingColors[canggan.wuxing as keyof typeof wuxingColors].light,
                    borderColor: wuxingColors[canggan.wuxing as keyof typeof wuxingColors].border,
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleGanClick(canggan, zhi)
                  }}
                  onMouseEnter={() => setHoveredGan(`${zhi}-${canggan.gan}`)}
                  onMouseLeave={() => setHoveredGan(null)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">{canggan.gan}</span>
                      <Badge
                        size="sm"
                        style={{
                          backgroundColor: cangganTypeColors[canggan.type as keyof typeof cangganTypeColors].bg,
                          color: cangganTypeColors[canggan.type as keyof typeof cangganTypeColors].text,
                        }}
                      >
                        {canggan.type}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500">{canggan.strength}%</div>
                  </div>
                  <div className="text-sm">
                    <div className="flex items-center space-x-1 mb-1">
                      <span className="text-gray-600">五行：</span>
                      <Badge
                        size="sm"
                        style={{
                          backgroundColor: wuxingColors[canggan.wuxing as keyof typeof wuxingColors].bg,
                          color: wuxingColors[canggan.wuxing as keyof typeof wuxingColors].text,
                        }}
                      >
                        {canggan.yinyang}
                        {canggan.wuxing}
                      </Badge>
                    </div>
                    {hoveredGan === `${zhi}-${canggan.gan}` && (
                      <div className="text-xs text-gray-600 mt-2 p-2 bg-white rounded border">{canggan.meaning}</div>
                    )}
                  </div>

                  {/* 力量条 */}
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${canggan.strength}%`,
                          backgroundColor: wuxingColors[canggan.wuxing as keyof typeof wuxingColors].border,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}

              {/* 生克关系提示 */}
              {selectedZhi === zhi && data.canggan.length > 1 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h5 className="font-semibold text-sm mb-2">内部生克关系：</h5>
                  <div className="space-y-1 text-xs">
                    {data.canggan.map((gan1, i) =>
                      data.canggan.map((gan2, j) => {
                        if (i >= j) return null
                        const relation = getShengKeRelation(gan1.wuxing, gan2.wuxing)
                        if (relation === "同气") return null
                        return (
                          <div key={`${i}-${j}`} className="flex items-center space-x-2">
                            <span>
                              {gan1.gan}({gan1.wuxing})
                            </span>
                            <Badge
                              size="sm"
                              className={
                                relation.includes("生") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }
                            >
                              {relation}
                            </Badge>
                            <span>
                              {gan2.gan}({gan2.wuxing})
                            </span>
                          </div>
                        )
                      }),
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  // 思维导图视图
  const MindmapView = () => (
    <div className="flex justify-center">
      <svg width="1000" height="800" className="border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
        {Object.entries(dizhiCangganData).map(([zhi, data], zhiIndex) => {
          const centerX = 150 + (zhiIndex % 4) * 200
          const centerY = 150 + Math.floor(zhiIndex / 4) * 200

          return (
            <g key={zhi}>
              {/* 地支中心节点 */}
              <circle
                cx={centerX}
                cy={centerY}
                r="30"
                fill={wuxingColors[data.wuxing as keyof typeof wuxingColors].bg}
                stroke={wuxingColors[data.wuxing as keyof typeof wuxingColors].border}
                strokeWidth="3"
                className="cursor-pointer"
                onClick={() => handleZhiClick(zhi)}
              />
              <text
                x={centerX}
                y={centerY + 5}
                textAnchor="middle"
                fontSize="16"
                fontWeight="bold"
                fill={wuxingColors[data.wuxing as keyof typeof wuxingColors].text}
                className="cursor-pointer"
                onClick={() => handleZhiClick(zhi)}
              >
                {zhi}
              </text>

              {/* 藏干节点 */}
              {data.canggan.map((canggan, ganIndex) => {
                const angle = (ganIndex * 120 - 90) * (Math.PI / 180)
                const distance = 80
                const ganX = centerX + distance * Math.cos(angle)
                const ganY = centerY + distance * Math.sin(angle)

                return (
                  <g key={`${zhi}-${canggan.gan}`}>
                    {/* 连接线 */}
                    <line
                      x1={centerX}
                      y1={centerY}
                      x2={ganX}
                      y2={ganY}
                      stroke={wuxingColors[canggan.wuxing as keyof typeof wuxingColors].border}
                      strokeWidth={canggan.type === "本气" ? "3" : canggan.type === "中气" ? "2" : "1"}
                      strokeDasharray={canggan.type === "本气" ? "none" : canggan.type === "中气" ? "5,5" : "3,3"}
                    />

                    {/* 藏干节点 */}
                    <circle
                      cx={ganX}
                      cy={ganY}
                      r={canggan.type === "本气" ? "20" : canggan.type === "中气" ? "16" : "12"}
                      fill={wuxingColors[canggan.wuxing as keyof typeof wuxingColors].light}
                      stroke={wuxingColors[canggan.wuxing as keyof typeof wuxingColors].border}
                      strokeWidth="2"
                      className="cursor-pointer"
                      onClick={() => handleGanClick(canggan, zhi)}
                    />
                    <text
                      x={ganX}
                      y={ganY + 4}
                      textAnchor="middle"
                      fontSize={canggan.type === "本气" ? "14" : "12"}
                      fontWeight="bold"
                      fill={wuxingColors[canggan.wuxing as keyof typeof wuxingColors].text}
                      className="cursor-pointer"
                      onClick={() => handleGanClick(canggan, zhi)}
                    >
                      {canggan.gan}
                    </text>

                    {/* 类型标签 */}
                    <text
                      x={ganX}
                      y={ganY + 35}
                      textAnchor="middle"
                      fontSize="10"
                      fill={cangganTypeColors[canggan.type as keyof typeof cangganTypeColors].text}
                    >
                      {canggan.type}
                    </text>
                  </g>
                )
              })}
            </g>
          )
        })}
      </svg>
    </div>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-4">
            <span>地支藏干详解</span>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === "cards" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("cards")}
              >
                卡片视图
              </Button>
              <Button
                variant={viewMode === "mindmap" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("mindmap")}
              >
                思维导图
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === "cards" ? <CardView /> : <MindmapView />}

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>点击地支查看详细信息，悬停天干查看解释</p>
          </div>

          {/* 图例 */}
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-solid border-gray-400 rounded"></div>
              <span>本气（主要力量）</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-dashed border-gray-400 rounded"></div>
              <span>中气（次要力量）</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-dotted border-gray-400 rounded"></div>
              <span>余气（微弱力量）</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 详细解释面板 */}
      {selectedGan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <span className="text-3xl font-bold">{selectedGan.gan}</span>
              <Badge
                style={{
                  backgroundColor: cangganTypeColors[selectedGan.type as keyof typeof cangganTypeColors].bg,
                  color: cangganTypeColors[selectedGan.type as keyof typeof cangganTypeColors].text,
                }}
              >
                {selectedGan.type}
              </Badge>
              <span className="text-lg text-gray-600">藏于{selectedGan.fromZhi}中</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 左侧：基本信息 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">基本属性</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">五行属性：</span>
                      <Badge
                        style={{
                          backgroundColor: wuxingColors[selectedGan.wuxing as keyof typeof wuxingColors].bg,
                          color: wuxingColors[selectedGan.wuxing as keyof typeof wuxingColors].text,
                        }}
                      >
                        {selectedGan.yinyang}
                        {selectedGan.wuxing}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">藏干类型：</span>
                      <Badge
                        style={{
                          backgroundColor: cangganTypeColors[selectedGan.type as keyof typeof cangganTypeColors].bg,
                          color: cangganTypeColors[selectedGan.type as keyof typeof cangganTypeColors].text,
                        }}
                      >
                        {selectedGan.type}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">力量强度：</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${selectedGan.strength}%`,
                              backgroundColor: wuxingColors[selectedGan.wuxing as keyof typeof wuxingColors].border,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{selectedGan.strength}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">象义解释</h4>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-700">{selectedGan.meaning}</p>
                  </div>
                </div>
              </div>

              {/* 右侧：应用场景 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">命理应用</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800 mb-1">排盘应用</div>
                      <div className="text-sm text-green-700">
                        在八字排盘中，{selectedGan.fromZhi}支所藏{selectedGan.gan}干会影响该柱的五行力量分布
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-800 mb-1">格局判断</div>
                      <div className="text-sm text-blue-700">
                        {selectedGan.type === "本气"
                          ? "作为主要力量参与格局构成"
                          : selectedGan.type === "中气"
                            ? "作为辅助力量影响格局变化"
                            : "在特定条件下可能发挥关键作用"}
                      </div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-medium text-purple-800 mb-1">生克关系</div>
                      <div className="text-sm text-purple-700">与日主的关系需要考虑藏干的力量强度和透出情况</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">学习要点</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                      <span>
                        {selectedGan.type}是地支{selectedGan.fromZhi}中{selectedGan.strength === 100 ? "唯一" : "主要"}
                        的{selectedGan.wuxing}行力量
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                      <span>力量强度为{selectedGan.strength}%，在实际应用中需要按比例计算</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                      <span>只有透出天干时才能完全发挥作用</span>
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
