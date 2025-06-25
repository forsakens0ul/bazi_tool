"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { qijiStates, tiaohouData, wuxingShengkeData } from "@/data/shengke-zhihua"
import { Play, Pause, RotateCcw } from "lucide-react"
import { conggeQijiData } from "@/data/congge-huashen"

type ViewMode = "wuxing" | "tiaohou" | "congge"
type QijiState = keyof typeof qijiStates

interface BaziInput {
  year: string
  month: string
  day: string
  hour: string
}

export default function QijiFlowSimulator() {
  const [viewMode, setViewMode] = useState<ViewMode>("wuxing")
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentQijiState, setCurrentQijiState] = useState<QijiState>("流通")
  const [baziInput, setBaziInput] = useState<BaziInput>({
    year: "甲子",
    month: "丙寅",
    day: "戊午",
    hour: "癸亥",
  })
  const [selectedExample, setSelectedExample] = useState<string>("example1")

  // 预设命例
  const examples = {
    example1: {
      name: "气机流通例",
      bazi: { year: "甲子", month: "丙寅", day: "戊午", hour: "癸亥" },
      analysis: "水生木，木生火，火生土，形成完整的生扶链条",
      qijiState: "流通" as QijiState,
      description: "五行相生有情，气机循环流通",
    },
    example2: {
      name: "气机阻滞例",
      bazi: { year: "庚申", month: "戊子", day: "甲寅", hour: "丙午" },
      analysis: "金克木，水克火，相克激烈，气机受阻",
      qijiState: "阻滞" as QijiState,
      description: "五行相克无情，需要通关用神",
    },
    example3: {
      name: "气机偏枯例",
      bazi: { year: "丙午", month: "丁巳", day: "戊戌", hour: "己未" },
      analysis: "火土过旺，缺乏水木调节，气机偏枯",
      qijiState: "偏枯" as QijiState,
      description: "火土燥烈，需要水木润燥",
    },
  }

  const loadExample = (exampleKey: string) => {
    const example = examples[exampleKey as keyof typeof examples]
    setBaziInput(example.bazi)
    setCurrentQijiState(example.qijiState)
    setSelectedExample(exampleKey)
  }

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
  }

  const resetSimulation = () => {
    setIsAnimating(false)
    setCurrentQijiState("流通")
  }

  // 分析八字五行分布
  const analyzeBazi = (bazi: BaziInput) => {
    const allGanZhi = [bazi.year, bazi.month, bazi.day, bazi.hour]
    const wuxingCount = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 }

    // 简化的五行归属（实际应该更复杂）
    const ganWuxing: { [key: string]: string } = {
      甲: "木",
      乙: "木",
      丙: "火",
      丁: "火",
      戊: "土",
      己: "土",
      庚: "金",
      辛: "金",
      壬: "水",
      癸: "水",
    }

    const zhiWuxing: { [key: string]: string } = {
      子: "水",
      丑: "土",
      寅: "木",
      卯: "木",
      辰: "土",
      巳: "火",
      午: "火",
      未: "土",
      申: "金",
      酉: "金",
      戌: "土",
      亥: "水",
    }

    allGanZhi.forEach((ganzhi) => {
      const gan = ganzhi[0]
      const zhi = ganzhi[1]
      if (ganWuxing[gan]) wuxingCount[ganWuxing[gan] as keyof typeof wuxingCount]++
      if (zhiWuxing[zhi]) wuxingCount[zhiWuxing[zhi] as keyof typeof wuxingCount]++
    })

    return wuxingCount
  }

  const wuxingCount = analyzeBazi(baziInput)
  const dayMaster = baziInput.day[0]
  const dayMasterWuxing =
    dayMaster === "甲" || dayMaster === "乙"
      ? "木"
      : dayMaster === "丙" || dayMaster === "丁"
        ? "火"
        : dayMaster === "戊" || dayMaster === "己"
          ? "土"
          : dayMaster === "庚" || dayMaster === "辛"
            ? "金"
            : "水"

  // 气机流动图
  const QijiFlowChart = () => {
    const centerX = 200
    const centerY = 200
    const radius = 120

    return (
      <svg width="400" height="400" className="border rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
        {/* 日主中心 */}
        <circle cx={centerX} cy={centerY} r="30" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" />
        <text x={centerX} y={centerY + 5} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">
          {dayMaster}
        </text>

        {/* 五行分布 */}
        {Object.entries(wuxingShengkeData).map(([wuxing, data], index) => {
          const angle = (index * 72 - 90) * (Math.PI / 180)
          const x = centerX + radius * Math.cos(angle)
          const y = centerY + radius * Math.sin(angle)
          const count = wuxingCount[wuxing as keyof typeof wuxingCount]

          return (
            <g key={wuxing}>
              {/* 连接线 */}
              <line
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke={data.color}
                strokeWidth={count > 0 ? count * 2 : 1}
                opacity={count > 0 ? 0.8 : 0.3}
                strokeDasharray={count === 0 ? "5,5" : "none"}
                className={isAnimating ? "animate-pulse" : ""}
              />

              {/* 五行节点 */}
              <circle
                cx={x}
                cy={y}
                r={count > 0 ? 15 + count * 3 : 10}
                fill={count > 0 ? data.color : "#e5e7eb"}
                stroke="white"
                strokeWidth="2"
              />
              <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">
                {wuxing}
              </text>

              {/* 数量标识 */}
              {count > 0 && (
                <text x={x} y={y + 35} textAnchor="middle" fontSize="10" fill={data.color} fontWeight="bold">
                  {count}
                </text>
              )}
            </g>
          )
        })}

        {/* 气机状态指示 */}
        <rect
          x="10"
          y="10"
          width="120"
          height="60"
          fill="white"
          stroke={qijiStates[currentQijiState].color}
          strokeWidth="2"
          rx="5"
        />
        <text
          x="70"
          y="30"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill={qijiStates[currentQijiState].color}
        >
          {qijiStates[currentQijiState].icon} {qijiStates[currentQijiState].name}
        </text>
        <text x="70" y="50" textAnchor="middle" fontSize="10" fill="#6b7280">
          {qijiStates[currentQijiState].description}
        </text>
      </svg>
    )
  }

  // 调候视图
  const TiaohouView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(tiaohouData).map(([key, data]) => (
        <Card key={key} className="hover:shadow-lg transition-shadow" style={{ borderColor: data.color }}>
          <CardHeader className="pb-3">
            <CardTitle style={{ color: data.color }}>
              {data.season}
              {data.wuxing}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded">
                <div className="font-medium text-red-800 mb-1">问题</div>
                <div className="text-sm text-red-700">{data.problem}</div>
              </div>

              <div className="p-3 bg-green-50 rounded">
                <div className="font-medium text-green-800 mb-1">用神</div>
                <div className="flex flex-wrap gap-1">
                  {data.yongshen.map((ys) => (
                    <Badge key={ys} className="bg-green-100 text-green-800 text-xs">
                      {ys}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-red-50 rounded">
                <div className="font-medium text-red-800 mb-1">忌神</div>
                <div className="flex flex-wrap gap-1">
                  {data.jishen.map((js) => (
                    <Badge key={js} className="bg-red-100 text-red-800 text-xs">
                      {js}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-600">{data.description}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  // 从格视图
  const ConggeView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(conggeQijiData).map(([key, data]) => (
          <Card key={key} className="hover:shadow-lg transition-shadow" style={{ borderColor: data.color }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">{data.icon}</span>
                <span style={{ color: data.color }}>{data.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${data.color}20` }}>
                  <div className="font-medium mb-1" style={{ color: data.color }}>
                    气机特征
                  </div>
                  <div className="text-sm text-gray-700">{data.qijiCharacter}</div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded">
                    <div className="font-medium text-blue-800 mb-1">流向</div>
                    <div className="text-sm text-blue-700">{data.flowDirection}</div>
                  </div>

                  <div className="p-3 bg-green-50 rounded">
                    <div className="font-medium text-green-800 mb-1">用神</div>
                    <div className="flex flex-wrap gap-1">
                      {data.yongshen.map((ys) => (
                        <Badge key={ys} className="bg-green-100 text-green-800 text-xs">
                          {ys}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-red-50 rounded">
                    <div className="font-medium text-red-800 mb-1">忌神</div>
                    <div className="flex flex-wrap gap-1">
                      {data.jishen.map((js) => (
                        <Badge key={js} className="bg-red-100 text-red-800 text-xs">
                          {js}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded">
                    <div className="font-medium text-yellow-800 mb-1">风险提示</div>
                    <div className="text-sm text-yellow-700">{data.analysis.risk}</div>
                  </div>
                </div>

                {/* 命例展示 */}
                <div className="border-t pt-3">
                  <div className="font-medium mb-2 text-sm">典型命例</div>
                  <div className="p-2 bg-gray-50 rounded text-xs">
                    <div className="font-mono">{data.examples[0].bazi}</div>
                    <div className="text-gray-600 mt-1">{data.examples[0].analysis}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 从格气机特点总结 */}
      <Card>
        <CardHeader>
          <CardTitle>从格气机特点</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">单向流动</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• 气机呈单向流动，不可逆转</li>
                <li>• 日主极弱，无力抗衡大势</li>
                <li>• 顺势而为，不可违逆</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">势力集中</h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• 某一五行或十神极旺</li>
                <li>• 形成压倒性优势</li>
                <li>• 其他五行相对微弱</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-3">易变性强</h4>
              <ul className="space-y-1 text-sm text-red-700">
                <li>• 大运改变容易破格</li>
                <li>• 逆势之神出现危险</li>
                <li>• 需要持续维护格局</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-4">
            <span>气机流动演示器</span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={viewMode === "wuxing" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("wuxing")}
              >
                五行视角
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
          {viewMode === "wuxing" && (
            <div className="space-y-6">
              {/* 八字输入区 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">八字输入</h4>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <label className="text-xs text-gray-600">年柱</label>
                      <Input
                        value={baziInput.year}
                        onChange={(e) => setBaziInput({ ...baziInput, year: e.target.value })}
                        className="text-center"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">月柱</label>
                      <Input
                        value={baziInput.month}
                        onChange={(e) => setBaziInput({ ...baziInput, month: e.target.value })}
                        className="text-center"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">日柱</label>
                      <Input
                        value={baziInput.day}
                        onChange={(e) => setBaziInput({ ...baziInput, day: e.target.value })}
                        className="text-center font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">时柱</label>
                      <Input
                        value={baziInput.hour}
                        onChange={(e) => setBaziInput({ ...baziInput, hour: e.target.value })}
                        className="text-center"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">预设命例</h5>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(examples).map(([key, example]) => (
                        <Button
                          key={key}
                          variant={selectedExample === key ? "default" : "outline"}
                          size="sm"
                          onClick={() => loadExample(key)}
                        >
                          {example.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">五行分布</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.entries(wuxingCount).map(([wuxing, count]) => (
                      <div key={wuxing} className="text-center p-2 border rounded">
                        <div
                          className="font-bold"
                          style={{ color: wuxingShengkeData[wuxing as keyof typeof wuxingShengkeData].color }}
                        >
                          {wuxing}
                        </div>
                        <div className="text-lg font-bold">{count}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-medium mb-1">
                      日主：{dayMaster}（{dayMasterWuxing}）
                    </div>
                    <div className="text-sm text-gray-600">
                      {examples[selectedExample as keyof typeof examples]?.description}
                    </div>
                  </div>
                </div>
              </div>

              {/* 气机流动图 */}
              <div className="flex justify-center">
                <QijiFlowChart />
              </div>

              {/* 控制按钮 */}
              <div className="flex justify-center space-x-4">
                <Button onClick={toggleAnimation} className="flex items-center space-x-2">
                  {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isAnimating ? "暂停" : "播放"}动画</span>
                </Button>
                <Button variant="outline" onClick={resetSimulation} className="flex items-center space-x-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>重置</span>
                </Button>
              </div>
            </div>
          )}

          {viewMode === "tiaohou" && <TiaohouView />}

          {viewMode === "congge" && <ConggeView />}
        </CardContent>
      </Card>

      {/* 分析结果面板 */}
      {selectedExample && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">{qijiStates[currentQijiState].icon}</span>
              <span>气机分析：{examples[selectedExample as keyof typeof examples].name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">气机状态</h4>
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${qijiStates[currentQijiState].color}20` }}>
                  <div className="font-medium mb-2" style={{ color: qijiStates[currentQijiState].color }}>
                    {qijiStates[currentQijiState].name}
                  </div>
                  <div className="text-sm text-gray-700 mb-3">{qijiStates[currentQijiState].description}</div>
                  <div className="space-y-1">
                    {qijiStates[currentQijiState].characteristics.map((char) => (
                      <Badge key={char} variant="outline" className="mr-1 text-xs">
                        {char}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">分析建议</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded">
                    <div className="font-medium text-blue-800 mb-1">流通分析</div>
                    <div className="text-sm text-blue-700">
                      {examples[selectedExample as keyof typeof examples].analysis}
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 rounded">
                    <div className="font-medium text-green-800 mb-1">用神建议</div>
                    <div className="text-sm text-green-700">
                      {currentQijiState === "流通" && "气机流通良好，用神以维护流通为主"}
                      {currentQijiState === "阻滞" && "需要通关用神，化解五行冲突"}
                      {currentQijiState === "偏枯" && "需要调候用神，平衡五行力量"}
                      {currentQijiState === "混乱" && "需要理清主次，确定主要矛盾"}
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
