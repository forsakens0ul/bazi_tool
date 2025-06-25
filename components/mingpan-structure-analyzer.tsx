"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ganzhiProperties, getShishen, wuxingColors, shishenColors } from "@/data/paipan"
import { Network, Zap, Target, Eye } from "lucide-react"

interface StructureAnalysis {
  bazi: {
    year: string
    month: string
    day: string
    hour: string
  }
  dayMaster: string
  analysis: {
    wuxingFlow: string[]
    shishenNetwork: string[]
    qijiState: string
    geju: string
    yongshen: string
  }
}

type ViewMode = "wuxing" | "shishen" | "qiji"

export default function MingpanStructureAnalyzer() {
  const [viewMode, setViewMode] = useState<ViewMode>("wuxing")
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // 示例命盘数据
  const exampleBazi: StructureAnalysis = {
    bazi: {
      year: "乙卯",
      month: "戊午",
      day: "庚子",
      hour: "丙辰",
    },
    dayMaster: "庚",
    analysis: {
      wuxingFlow: ["水生木", "木生火", "火生土", "土生金"],
      shishenNetwork: ["偏财", "伤官", "正官", "偏印"],
      qijiState: "流通有情",
      geju: "财官印俱全",
      yongshen: "水木为用",
    },
  }

  // 获取节点位置（圆形布局）
  const getNodePosition = (index: number, total: number, radius = 120) => {
    const angle = ((index * 360) / total - 90) * (Math.PI / 180)
    const centerX = 200
    const centerY = 200
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    return { x, y }
  }

  // 五行流动图
  const WuxingFlowChart = () => {
    const positions = [
      { name: "年柱", ganzhi: exampleBazi.bazi.year, pos: getNodePosition(0, 4) },
      { name: "月柱", ganzhi: exampleBazi.bazi.month, pos: getNodePosition(1, 4) },
      { name: "日柱", ganzhi: exampleBazi.bazi.day, pos: getNodePosition(2, 4) },
      { name: "时柱", ganzhi: exampleBazi.bazi.hour, pos: getNodePosition(3, 4) },
    ]

    return (
      <svg width="400" height="400" className="border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* 中心日主 */}
        <circle cx="200" cy="200" r="30" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" />
        <text x="200" y="205" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">
          {exampleBazi.dayMaster}
        </text>

        {/* 四柱节点 */}
        {positions.map((item, index) => {
          const gan = item.ganzhi[0]
          const zhi = item.ganzhi[1]
          const ganWuxing = ganzhiProperties.天干[gan as keyof typeof ganzhiProperties.天干].wuxing
          const zhiWuxing = ganzhiProperties.地支[zhi as keyof typeof ganzhiProperties.地支].wuxing
          const isSelected = selectedNode === item.name

          return (
            <g key={item.name}>
              {/* 连接线 */}
              <line
                x1="200"
                y1="200"
                x2={item.pos.x}
                y2={item.pos.y}
                stroke={wuxingColors[ganWuxing as keyof typeof wuxingColors].border}
                strokeWidth={isSelected ? "4" : "2"}
                opacity={isAnimating ? 0.8 : 0.6}
                className={isAnimating ? "animate-pulse" : ""}
              />

              {/* 节点 */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedNode(selectedNode === item.name ? null : item.name)}
              >
                <circle
                  cx={item.pos.x}
                  cy={item.pos.y}
                  r={isSelected ? "25" : "20"}
                  fill={wuxingColors[ganWuxing as keyof typeof wuxingColors].bg}
                  stroke={wuxingColors[ganWuxing as keyof typeof wuxingColors].border}
                  strokeWidth={isSelected ? "3" : "2"}
                />
                <text
                  x={item.pos.x}
                  y={item.pos.y + 5}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill={wuxingColors[ganWuxing as keyof typeof wuxingColors].text}
                >
                  {item.ganzhi}
                </text>
              </g>

              {/* 标签 */}
              <text x={item.pos.x} y={item.pos.y + 40} textAnchor="middle" fontSize="10" fill="#6b7280">
                {item.name}
              </text>
            </g>
          )
        })}

        {/* 流动箭头 */}
        {isAnimating && (
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
            </marker>
          </defs>
        )}
      </svg>
    )
  }

  // 十神网络图
  const ShishenNetworkChart = () => {
    const allGan = [
      exampleBazi.bazi.year[0],
      exampleBazi.bazi.month[0],
      exampleBazi.bazi.day[0],
      exampleBazi.bazi.hour[0],
    ]

    const positions = allGan.map((gan, index) => ({
      gan,
      shishen: gan === exampleBazi.dayMaster ? "日主" : getShishen(exampleBazi.dayMaster, gan),
      pos: getNodePosition(index, 4),
    }))

    return (
      <svg width="400" height="400" className="border rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
        {/* 中心 */}
        <circle cx="200" cy="200" r="25" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="3" />
        <text x="200" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">
          十神
        </text>

        {/* 十神节点 */}
        {positions.map((item, index) => {
          const isSelected = selectedNode === item.shishen
          const color =
            item.shishen === "日主" ? "#fbbf24" : shishenColors[item.shishen as keyof typeof shishenColors] || "#6b7280"

          return (
            <g key={index}>
              {/* 连接线 */}
              <line
                x1="200"
                y1="200"
                x2={item.pos.x}
                y2={item.pos.y}
                stroke={color}
                strokeWidth={isSelected ? "3" : "1"}
                opacity={0.6}
              />

              {/* 节点 */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedNode(selectedNode === item.shishen ? null : item.shishen)}
              >
                <circle
                  cx={item.pos.x}
                  cy={item.pos.y}
                  r={isSelected ? "22" : "18"}
                  fill={`${color}20`}
                  stroke={color}
                  strokeWidth={isSelected ? "3" : "2"}
                />
                <text
                  x={item.pos.x}
                  y={item.pos.y + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill={color}
                >
                  {item.shishen}
                </text>
              </g>

              {/* 天干标识 */}
              <text
                x={item.pos.x}
                y={item.pos.y + 35}
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
                fill="#6b7280"
              >
                {item.gan}
              </text>
            </g>
          )
        })}
      </svg>
    )
  }

  // 气机状态图
  const QijiStateChart = () => (
    <svg width="400" height="400" className="border rounded-lg bg-gradient-to-br from-green-50 to-teal-50">
      {/* 气机流动路径 */}
      <path
        d="M 100 200 Q 200 100 300 200 Q 200 300 100 200"
        fill="none"
        stroke="#10b981"
        strokeWidth="4"
        strokeDasharray={isAnimating ? "10,5" : "none"}
        className={isAnimating ? "animate-pulse" : ""}
      />

      {/* 中心气机核心 */}
      <circle cx="200" cy="200" r="40" fill="#10b981" opacity="0.2" />
      <circle cx="200" cy="200" r="20" fill="#10b981" stroke="#059669" strokeWidth="2" />
      <text x="200" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">
        气机
      </text>

      {/* 状态指示 */}
      <rect x="50" y="50" width="100" height="40" fill="white" stroke="#10b981" strokeWidth="2" rx="5" />
      <text x="100" y="75" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#10b981">
        {exampleBazi.analysis.qijiState}
      </text>
    </svg>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Network className="w-5 h-5" />
              <span>命盘结构分析图</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={viewMode === "wuxing" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("wuxing")}
                className="flex items-center space-x-1"
              >
                <Target className="w-4 h-4" />
                <span>五行流动</span>
              </Button>
              <Button
                variant={viewMode === "shishen" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("shishen")}
                className="flex items-center space-x-1"
              >
                <Eye className="w-4 h-4" />
                <span>十神网络</span>
              </Button>
              <Button
                variant={viewMode === "qiji" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("qiji")}
                className="flex items-center space-x-1"
              >
                <Zap className="w-4 h-4" />
                <span>气机状态</span>
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 可视化图表 */}
            <div className="flex justify-center">
              {viewMode === "wuxing" && <WuxingFlowChart />}
              {viewMode === "shishen" && <ShishenNetworkChart />}
              {viewMode === "qiji" && <QijiStateChart />}
            </div>

            {/* 分析面板 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">结构分析</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAnimating(!isAnimating)}
                  className="flex items-center space-x-1"
                >
                  <Zap className="w-4 h-4" />
                  <span>{isAnimating ? "停止" : "动画"}</span>
                </Button>
              </div>

              {/* 命盘信息 */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium mb-2">命盘信息</h5>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {Object.entries(exampleBazi.bazi).map(([key, value]) => (
                    <div key={key} className="text-center p-2 bg-white rounded border">
                      <div className="text-xs text-gray-500">
                        {key === "year" ? "年" : key === "month" ? "月" : key === "day" ? "日" : "时"}
                      </div>
                      <div className="font-bold">{value}</div>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  日主：<span className="font-bold text-yellow-600">{exampleBazi.dayMaster}</span>
                </div>
              </div>

              {/* 分析结果 */}
              <div className="space-y-3">
                {viewMode === "wuxing" && (
                  <div className="p-3 bg-blue-50 rounded">
                    <div className="font-medium text-blue-800 mb-1">五行流动</div>
                    <div className="text-sm text-blue-700">{exampleBazi.analysis.wuxingFlow.join(" → ")}</div>
                  </div>
                )}

                {viewMode === "shishen" && (
                  <div className="p-3 bg-purple-50 rounded">
                    <div className="font-medium text-purple-800 mb-1">十神网络</div>
                    <div className="flex flex-wrap gap-1">
                      {exampleBazi.analysis.shishenNetwork.map((shishen) => (
                        <Badge
                          key={shishen}
                          style={{
                            backgroundColor: `${shishenColors[shishen as keyof typeof shishenColors]}20`,
                            color: shishenColors[shishen as keyof typeof shishenColors],
                          }}
                        >
                          {shishen}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {viewMode === "qiji" && (
                  <div className="p-3 bg-green-50 rounded">
                    <div className="font-medium text-green-800 mb-1">气机状态</div>
                    <div className="text-sm text-green-700">{exampleBazi.analysis.qijiState}</div>
                  </div>
                )}

                <div className="p-3 bg-yellow-50 rounded">
                  <div className="font-medium text-yellow-800 mb-1">格局判断</div>
                  <div className="text-sm text-yellow-700">{exampleBazi.analysis.geju}</div>
                </div>

                <div className="p-3 bg-green-50 rounded">
                  <div className="font-medium text-green-800 mb-1">用神建议</div>
                  <div className="text-sm text-green-700">{exampleBazi.analysis.yongshen}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>点击节点查看详细信息，切换视角观察不同层面的命盘结构</p>
          </div>
        </CardContent>
      </Card>

      {/* 节点详情面板 */}
      {selectedNode && (
        <Card>
          <CardHeader>
            <CardTitle>节点详情：{selectedNode}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-700">
                {selectedNode === "年柱" && "年柱代表祖上根基、父母宫位、早年运势，影响0-16岁的人生轨迹"}
                {selectedNode === "月柱" && "月柱代表父母兄弟、青年运势、事业宫位，影响17-32岁的发展"}
                {selectedNode === "日柱" && "日柱代表自己和配偶、中年运势、婚姻宫位，影响33-48岁的核心阶段"}
                {selectedNode === "时柱" && "时柱代表子女下属、晚年运势、子女宫位，影响49岁以后的人生"}
                {selectedNode === "日主" && "日主是命盘的核心，代表命主本人，是判断其他十神关系的基准点"}
                {selectedNode &&
                  !["年柱", "月柱", "日柱", "时柱", "日主"].includes(selectedNode) &&
                  `${selectedNode}在命盘中的作用和意义需要结合具体位置和组合来分析`}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
