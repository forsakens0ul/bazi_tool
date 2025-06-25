"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { sanyuanData, calculateXingyun } from "@/data/paipan-advanced"
import { Clock, Zap, TrendingUp, Calendar } from "lucide-react"

export default function XingyunSanyuan() {
  const [selectedYear, setSelectedYear] = useState<number>(2024)
  const [xingyunResult, setXingyunResult] = useState<any>(null)
  const [selectedYuan, setSelectedYuan] = useState<string | null>(null)

  const handleAnalyze = () => {
    const result = calculateXingyun(selectedYear)
    setXingyunResult(result)
  }

  const getYuanColor = (yuan: string) => {
    const colors = {
      上元: "#10b981",
      中元: "#3b82f6", 
      下元: "#8b5cf6"
    }
    return colors[yuan as keyof typeof colors] || "#6b7280"
  }

  const getStarColor = (star: string) => {
    const colors = {
      一白: "#ffffff", 二黑: "#000000", 三碧: "#10b981",
      四绿: "#22c55e", 五黄: "#eab308", 六白: "#f3f4f6",
      七赤: "#ef4444", 八白: "#f8fafc", 九紫: "#8b5cf6"
    }
    return colors[star as keyof typeof colors] || "#6b7280"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>星运三元流转图</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 左侧：年份选择 */}
            <div className="space-y-4">
              <h4 className="font-semibold">年份分析</h4>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  placeholder="输入年份"
                  className="flex-1"
                />
                <Button onClick={handleAnalyze}>
                  分析星运
                </Button>
              </div>

              {/* 快速年份选择 */}
              <div>
                <h5 className="font-medium mb-2 text-sm">快速选择</h5>
                <div className="grid grid-cols-3 gap-2">
                  {[2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028].map((year) => (
                    <Button
                      key={year}
                      variant={selectedYear === year ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedYear(year)
                        const result = calculateXingyun(year)
                        setXingyunResult(result)
                      }}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 三元九运说明 */}
              <div className="p-4 bg-emerald-50 rounded-lg">
                <h5 className="font-medium mb-2 text-emerald-800">三元九运</h5>
                <div className="text-sm text-emerald-700 space-y-1">
                  <div>• 上元：一白、二黑、三碧</div>
                  <div>• 中元：四绿、五黄、六白</div>
                  <div>• 下元：七赤、八白、九紫</div>
                  <div>• 每运20年，三元共180年</div>
                </div>
              </div>
            </div>

            {/* 右侧：当前星运信息 */}
            <div className="space-y-4">
              <h4 className="font-semibold">当前星运</h4>
              {xingyunResult ? (
                <div className="space-y-4">
                  {/* 基本信息 */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold">{xingyunResult.currentStar}</span>
                      <Badge style={{ backgroundColor: getYuanColor(xingyunResult.currentYuan), color: "white" }}>
                        {xingyunResult.currentYuan}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">运期：</span>
                        <span>{xingyunResult.period}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">五行：</span>
                        <span>{xingyunResult.wuxing}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">方位：</span>
                        <span>{xingyunResult.direction}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">特性：</span>
                        <span>{xingyunResult.characteristic}</span>
                      </div>
                    </div>
                  </div>

                  {/* 运势特点 */}
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-800 mb-2">运势特点</div>
                    <div className="text-sm text-green-700">
                      {xingyunResult.fortune}
                    </div>
                  </div>

                  {/* 适宜行业 */}
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="font-medium text-yellow-800 mb-2">适宜行业</div>
                    <div className="flex flex-wrap gap-2">
                      {xingyunResult.suitableIndustries.map((industry: string, index: number) => (
                        <Badge key={index} className="bg-yellow-100 text-yellow-800 text-xs">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>请选择年份分析星运</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 三元九运流转图 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>三元九运流转图</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* 三元展示 */}
            <div className="grid grid-cols-3 gap-6">
              {Object.entries(sanyuanData).map(([yuan, data]) => (
                <div
                  key={yuan}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedYuan === yuan ? "shadow-lg scale-105" : "hover:shadow-md"
                  }`}
                  style={{ borderColor: getYuanColor(yuan) }}
                  onClick={() => setSelectedYuan(selectedYuan === yuan ? null : yuan)}
                >
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold mb-2" style={{ color: getYuanColor(yuan) }}>
                      {yuan}
                    </h3>
                    <div className="text-sm text-gray-600">{data.period}</div>
                  </div>

                  <div className="space-y-2">
                    {data.stars.map((star, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-medium">{star.name}</span>
                        <div className="flex items-center space-x-2">
                          <Badge style={{ backgroundColor: `${getStarColor(star.name)}`, color: star.name.includes('白') ? '#000' : '#fff' }}>
                            {star.wuxing}
                          </Badge>
                          <span className="text-xs text-gray-500">{star.years}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 时间轴 */}
            <div className="relative">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-300"></div>
              <div className="flex justify-between items-center relative">
                {Object.entries(sanyuanData).map(([yuan, data]) => (
                  <div key={yuan} className="text-center">
                    <div 
                      className="w-4 h-4 rounded-full border-4 bg-white z-10 relative"
                      style={{ borderColor: getYuanColor(yuan) }}
                    />
                    <div className="mt-2 text-sm font-medium" style={{ color: getYuanColor(yuan) }}>
                      {yuan}
                    </div>
                    <div className="text-xs text-gray-500">{data.period}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 当前运势标注 */}
            {xingyunResult && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-lg">当前运势分析</h4>
                  <Badge className="bg-blue-500 text-white">
                    {selectedYear}年
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium text-blue-800 mb-2">星运配置</div>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div>当运：{xingyunResult.currentStar} ({xingyunResult.wuxing})</div>
                      <div>方位：{xingyunResult.direction}</div>
                      <div>特性：{xingyunResult.characteristic}</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-purple-800 mb-2">运势影响</div>
                    <div className="text-sm text-purple-700">
                      {xingyunResult.influence}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 详细解释面板 */}
      {selectedYuan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <span style={{ color: getYuanColor(selectedYuan) }}>{selectedYuan} 详解</span>
              <Badge style={{ backgroundColor: getYuanColor(selectedYuan), color: "white" }}>
                {sanyuanData[selectedYuan as keyof typeof sanyuanData].period}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 左侧：运星详情 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">运星详情</h4>
                  <div className="space-y-4">
                    {sanyuanData[selectedYuan as keyof typeof sanyuanData].stars.map((star, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xl font-bold">{star.name}</span>
                          <Badge style={{ backgroundColor: `${getStarColor(star.name)}`, color: star.name.includes('白') ? '#000' : '#fff' }}>
                            {star.wuxing}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">运期：</span>
                            <span>{star.years}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">方位：</span>
                            <span>{star.direction}</span>
                          </div>
                        </div>
                        <div className="mt-3 text-sm text-gray-700">
                          {star.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 右侧：应用分析 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">应用分析</h4>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-800 mb-2">总体特征</div>
                      <div className="text-sm text-blue-700">
                        {sanyuanData[selectedYuan as keyof typeof sanyuanData].characteristics}
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800 mb-2">适宜发展</div>
                      <div className="flex flex-wrap gap-2">
                        {sanyuanData[selectedYuan as keyof typeof sanyuanData].suitableAreas.map((area, index) => (
                          <Badge key={index} className="bg-green-100 text-green-800 text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="font-medium text-yellow-800 mb-2">注意事项</div>
                      <div className="text-sm text-yellow-700">
                        {sanyuanData[selectedYuan as keyof typeof sanyuanData].precautions}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 与命盘配合 */}
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="font-medium text-purple-800 mb-3">与命盘配合</div>
                  <div className="space-y-2 text-sm text-purple-700">
                    <div>• 星运与命盘五行的生克关系</div>
                    <div>• 当运星与用神的配合情况</div>
                    <div>• 流年星运对格局的影响</div>
                    <div>• 选择有利时机的参考依据</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 学习要点 */}
      <Card>
        <CardHeader>
          <CardTitle>星运学习要点</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-800">时间周期</h4>
              </div>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• 三元九运每180年一个大周期</li>
                <li>• 每运20年，每元60年</li>
                <li>• 当前处于下元八运时期</li>
                <li>• 2024年进入九运时代</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-800">五行配合</h4>
              </div>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• 星运五行与命盘的生克关系</li>
                <li>• 当运星对用神的影响</li>
                <li>• 选择有利时机的依据</li>
                <li>• 避开不利星运的方法</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-purple-800">实战应用</h4>
              </div>
              <ul className="space-y-1 text-sm text-purple-700">
                <li>• 结合流年分析运势变化</li>
                <li>• 选择创业投资的时机</li>
                <li>• 调整发展方向和策略</li>
                <li>• 预测行业兴衰趋势</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}