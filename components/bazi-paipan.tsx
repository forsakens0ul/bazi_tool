"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ganzhiProperties, getShishen, wuxingColors, shishenColors, presetExamples } from "@/data/paipan"
import { Calendar, User, MapPin, Zap } from "lucide-react"

interface BirthInfo {
  year: number
  month: number
  day: number
  hour: number
  gender: "男" | "女"
  calendar: "公历" | "农历"
}

interface BaziResult {
  year: string
  month: string
  day: string
  hour: string
  dayMaster: string
  wuxingStats: { [key: string]: number }
  shishenStats: { [key: string]: number }
  analysis: string
}

export default function BaziPaipan() {
  const [birthInfo, setBirthInfo] = useState<BirthInfo>({
    year: 1990,
    month: 6,
    day: 15,
    hour: 14,
    gender: "男",
    calendar: "公历",
  })
  const [baziResult, setBaziResult] = useState<BaziResult | null>(null)
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  // 简化的排盘算法（实际应用中需要更精确的算法）
  const calculateBazi = () => {
    setIsCalculating(true)

    // 模拟计算过程
    setTimeout(() => {
      // 这里使用简化算法，实际应该使用专业的八字排盘库
      const tianganList = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
      const dizhiList = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

      // 简化计算（实际需要考虑节气、时区等）
      const yearGan = tianganList[(birthInfo.year - 4) % 10]
      const yearZhi = dizhiList[(birthInfo.year - 4) % 12]
      const monthGan = tianganList[(birthInfo.month - 1) % 10]
      const monthZhi = dizhiList[(birthInfo.month - 1) % 12]
      const dayGan = tianganList[(birthInfo.day - 1) % 10]
      const dayZhi = dizhiList[(birthInfo.day - 1) % 12]
      const hourGan = tianganList[Math.floor(birthInfo.hour / 2) % 10]
      const hourZhi = dizhiList[Math.floor(birthInfo.hour / 2) % 12]

      const result: BaziResult = {
        year: `${yearGan}${yearZhi}`,
        month: `${monthGan}${monthZhi}`,
        day: `${dayGan}${dayZhi}`,
        hour: `${hourGan}${hourZhi}`,
        dayMaster: dayGan,
        wuxingStats: {},
        shishenStats: {},
        analysis: `${dayGan}日主生于${birthInfo.month}月，需要详细分析五行强弱和格局。`,
      }

      // 统计五行
      const allGan = [yearGan, monthGan, dayGan, hourGan]
      const allZhi = [yearZhi, monthZhi, dayZhi, hourZhi]

      result.wuxingStats = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 }
      allGan.forEach((gan) => {
        const wuxing = ganzhiProperties.天干[gan as keyof typeof ganzhiProperties.天干].wuxing
        result.wuxingStats[wuxing]++
      })
      allZhi.forEach((zhi) => {
        const wuxing = ganzhiProperties.地支[zhi as keyof typeof ganzhiProperties.地支].wuxing
        result.wuxingStats[wuxing]++
      })

      // 统计十神
      result.shishenStats = {}
      allGan.forEach((gan) => {
        if (gan !== dayGan) {
          const shishen = getShishen(dayGan, gan)
          result.shishenStats[shishen] = (result.shishenStats[shishen] || 0) + 1
        }
      })

      setBaziResult(result)
      setIsCalculating(false)
    }, 1500)
  }

  const loadPresetExample = (exampleKey: string) => {
    const example = presetExamples[exampleKey as keyof typeof presetExamples]
    // 这里简化处理，直接设置结果
    const result: BaziResult = {
      year: example.year,
      month: example.month,
      day: example.day,
      hour: example.hour,
      dayMaster: example.day[0],
      wuxingStats: { 木: 2, 火: 2, 土: 2, 金: 1, 水: 1 },
      shishenStats: { 正官: 1, 正财: 1, 正印: 1, 食神: 1 },
      analysis: example.analysis,
    }
    setBaziResult(result)
  }

  const getPositionDetails = (position: string) => {
    if (!baziResult) return null

    const positionMap: { [key: string]: string } = {
      year: baziResult.year,
      month: baziResult.month,
      day: baziResult.day,
      hour: baziResult.hour,
    }

    const ganzhi = positionMap[position]
    if (!ganzhi) return null

    const gan = ganzhi[0]
    const zhi = ganzhi[1]
    const ganProps = ganzhiProperties.天干[gan as keyof typeof ganzhiProperties.天干]
    const zhiProps = ganzhiProperties.地支[zhi as keyof typeof ganzhiProperties.地支]
    const shishen = gan !== baziResult.dayMaster ? getShishen(baziResult.dayMaster, gan) : "日主"

    return {
      ganzhi,
      gan: { char: gan, ...ganProps },
      zhi: { char: zhi, ...zhiProps },
      shishen,
      position: position === "year" ? "年柱" : position === "month" ? "月柱" : position === "day" ? "日柱" : "时柱",
    }
  }

  return (
    <div className="space-y-6">
      {/* 输入区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>八字排盘器</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 出生信息输入 */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>出生信息</span>
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">年份</label>
                  <Input
                    type="number"
                    value={birthInfo.year}
                    onChange={(e) => setBirthInfo({ ...birthInfo, year: Number.parseInt(e.target.value) })}
                    placeholder="1990"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">月份</label>
                  <Input
                    type="number"
                    value={birthInfo.month}
                    onChange={(e) => setBirthInfo({ ...birthInfo, month: Number.parseInt(e.target.value) })}
                    placeholder="6"
                    min="1"
                    max="12"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">日期</label>
                  <Input
                    type="number"
                    value={birthInfo.day}
                    onChange={(e) => setBirthInfo({ ...birthInfo, day: Number.parseInt(e.target.value) })}
                    placeholder="15"
                    min="1"
                    max="31"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">时辰</label>
                  <Input
                    type="number"
                    value={birthInfo.hour}
                    onChange={(e) => setBirthInfo({ ...birthInfo, hour: Number.parseInt(e.target.value) })}
                    placeholder="14"
                    min="0"
                    max="23"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">性别</label>
                  <Select
                    value={birthInfo.gender}
                    onValueChange={(value: "男" | "女") => setBirthInfo({ ...birthInfo, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="男">男</SelectItem>
                      <SelectItem value="女">女</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-600">历法</label>
                  <Select
                    value={birthInfo.calendar}
                    onValueChange={(value: "公历" | "农历") => setBirthInfo({ ...birthInfo, calendar: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="公历">公历</SelectItem>
                      <SelectItem value="农历">农历</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={calculateBazi} disabled={isCalculating} className="w-full">
                {isCalculating ? "排盘中..." : "开始排盘"}
              </Button>
            </div>

            {/* 预设命例 */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>预设命例</span>
              </h4>

              <div className="space-y-3">
                {Object.entries(presetExamples).map(([key, example]) => (
                  <div
                    key={key}
                    className="p-3 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => loadPresetExample(key)}
                  >
                    <div className="font-medium mb-1">{key}</div>
                    <div className="text-sm text-gray-600 mb-2">{example.description}</div>
                    <div className="flex space-x-2">
                      <Badge variant="outline">{example.year}</Badge>
                      <Badge variant="outline">{example.month}</Badge>
                      <Badge variant="outline">{example.day}</Badge>
                      <Badge variant="outline">{example.hour}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 排盘结果 */}
      {baziResult && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 四柱排盘 */}
          <Card>
            <CardHeader>
              <CardTitle>四柱排盘</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 四柱表格 */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { key: "year", label: "年柱", value: baziResult.year },
                    { key: "month", label: "月柱", value: baziResult.month },
                    { key: "day", label: "日柱", value: baziResult.day },
                    { key: "hour", label: "时柱", value: baziResult.hour },
                  ].map((column) => (
                    <div key={column.key} className="text-center">
                      <div className="text-xs text-gray-500 mb-1">{column.label}</div>
                      <div
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedPosition === column.key
                            ? "border-blue-400 bg-blue-50 shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedPosition(selectedPosition === column.key ? null : column.key)}
                      >
                        <div className="font-bold text-lg">{column.value}</div>
                        {column.key === "day" && <Badge className="mt-1 bg-red-100 text-red-800">日主</Badge>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 日主信息 */}
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl font-bold">{baziResult.dayMaster}</span>
                    <Badge className="bg-yellow-500 text-white">日主</Badge>
                  </div>
                  <div className="text-sm text-gray-700">
                    五行：{ganzhiProperties.天干[baziResult.dayMaster as keyof typeof ganzhiProperties.天干].wuxing}
                    {ganzhiProperties.天干[baziResult.dayMaster as keyof typeof ganzhiProperties.天干].yinyang}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 命盘分析 */}
          <Card>
            <CardHeader>
              <CardTitle>命盘分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 五行统计 */}
                <div>
                  <h5 className="font-medium mb-3">五行分布</h5>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.entries(baziResult.wuxingStats).map(([wuxing, count]) => (
                      <div
                        key={wuxing}
                        className="text-center p-2 rounded"
                        style={{ backgroundColor: wuxingColors[wuxing as keyof typeof wuxingColors].bg }}
                      >
                        <div
                          className="font-bold"
                          style={{ color: wuxingColors[wuxing as keyof typeof wuxingColors].text }}
                        >
                          {wuxing}
                        </div>
                        <div className="text-lg font-bold">{count}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 十神统计 */}
                <div>
                  <h5 className="font-medium mb-3">十神分布</h5>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(baziResult.shishenStats).map(([shishen, count]) => (
                      <Badge
                        key={shishen}
                        style={{
                          backgroundColor: `${shishenColors[shishen as keyof typeof shishenColors]}20`,
                          color: shishenColors[shishen as keyof typeof shishenColors],
                        }}
                      >
                        {shishen} ×{count}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 初步分析 */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium mb-2">初步分析</h5>
                  <div className="text-sm text-gray-700">{baziResult.analysis}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 详细解析面板 */}
      {selectedPosition && baziResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>{getPositionDetails(selectedPosition)?.position} 详解</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const details = getPositionDetails(selectedPosition)
              if (!details) return null

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 干支分析 */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">干支分析</h4>

                    {/* 天干 */}
                    <div
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: wuxingColors[details.gan.wuxing as keyof typeof wuxingColors].bg }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl font-bold">{details.gan.char}</span>
                        <Badge
                          style={{
                            backgroundColor: wuxingColors[details.gan.wuxing as keyof typeof wuxingColors].border,
                            color: "white",
                          }}
                        >
                          天干
                        </Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>
                          五行：{details.gan.yinyang}
                          {details.gan.wuxing}
                        </div>
                        <div>十神：{details.shishen}</div>
                      </div>
                    </div>

                    {/* 地支 */}
                    <div
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: wuxingColors[details.zhi.wuxing as keyof typeof wuxingColors].bg }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl font-bold">{details.zhi.char}</span>
                        <Badge
                          style={{
                            backgroundColor: wuxingColors[details.zhi.wuxing as keyof typeof wuxingColors].border,
                            color: "white",
                          }}
                        >
                          地支
                        </Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>
                          五行：{details.zhi.yinyang}
                          {details.zhi.wuxing}
                        </div>
                        <div>时辰：{details.zhi.time}时</div>
                        <div>季节：{details.zhi.season}季</div>
                        <div>藏干：{details.zhi.canggan.join("、")}</div>
                      </div>
                    </div>
                  </div>

                  {/* 命理意义 */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">命理意义</h4>

                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded">
                        <div className="font-medium text-blue-800 mb-1">位置意义</div>
                        <div className="text-sm text-blue-700">
                          {selectedPosition === "year" && "年柱代表祖上、父母、早年运势"}
                          {selectedPosition === "month" && "月柱代表父母、兄弟、青年运势"}
                          {selectedPosition === "day" && "日柱代表自己、配偶、中年运势"}
                          {selectedPosition === "hour" && "时柱代表子女、下属、晚年运势"}
                        </div>
                      </div>

                      <div className="p-3 bg-green-50 rounded">
                        <div className="font-medium text-green-800 mb-1">十神作用</div>
                        <div className="text-sm text-green-700">
                          {details.shishen === "日主" && "命主本人，判断其他十神的基准"}
                          {details.shishen === "正官" && "代表名声、地位、管束、责任"}
                          {details.shishen === "正财" && "代表妻子、财富、稳定收入"}
                          {details.shishen === "正印" && "代表母亲、学问、保护、名誉"}
                          {details.shishen === "食神" && "代表才华、口才、子女、享受"}
                          {details.shishen === "比肩" && "代表兄弟、朋友、竞争、自我"}
                        </div>
                      </div>

                      <div className="p-3 bg-purple-50 rounded">
                        <div className="font-medium text-purple-800 mb-1">生克关系</div>
                        <div className="text-sm text-purple-700">
                          与日主{baziResult.dayMaster}的关系：
                          {details.gan.wuxing ===
                            ganzhiProperties.天干[baziResult.dayMaster as keyof typeof ganzhiProperties.天干].wuxing &&
                            "同气相求"}
                          {/* 这里可以添加更详细的生克关系分析 */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
