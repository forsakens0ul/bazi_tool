"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { shishenData, shishenCategories, searchKeywords } from "@/data/shishen"
import { Search, User, Users } from "lucide-react"

type Gender = "male" | "female"

export default function ShishenDictionary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedShishen, setSelectedShishen] = useState<string | null>(null)
  const [gender, setGender] = useState<Gender>("male")
  const [showCardAnimation, setShowCardAnimation] = useState(false)

  // 搜索过滤
  const filteredShishen = Object.entries(shishenData).filter(([name, data]) => {
    const matchesSearch =
      searchTerm === "" ||
      name.includes(searchTerm) ||
      data.keywords.some((keyword) => keyword.includes(searchTerm)) ||
      Object.entries(searchKeywords).some(
        ([keyword, shishens]) => keyword.includes(searchTerm) && shishens.includes(name),
      )

    const matchesCategory =
      selectedCategory === "all" ||
      Object.entries(shishenCategories).some(
        ([category, shishens]) => category === selectedCategory && shishens.includes(name),
      )

    return matchesSearch && matchesCategory
  })

  const handleShishenClick = (name: string) => {
    setSelectedShishen(name)
    setShowCardAnimation(true)
    setTimeout(() => setShowCardAnimation(false), 300)
  }

  return (
    <div className="space-y-6">
      {/* 搜索和筛选 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-4">
            <span>十神定义词典</span>
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
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索十神或关键词（如：口才、子女、财运）"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                全部
              </Button>
              {Object.keys(shishenCategories).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* 十神网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {filteredShishen.map(([name, data]) => (
              <Card
                key={name}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                  selectedShishen === name ? "ring-2 ring-blue-400 shadow-lg" : ""
                }`}
                onClick={() => handleShishenClick(name)}
                style={{ borderColor: data.color }}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-2">{data.icon}</div>
                  <div className="text-xl font-bold mb-1" style={{ color: data.color }}>
                    {name}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{data.essence}</div>
                  <Badge
                    className="mb-2"
                    style={{
                      backgroundColor: `${data.color}20`,
                      color: data.color,
                      borderColor: data.color,
                    }}
                  >
                    {data.category}
                  </Badge>
                  <div className="text-xs text-gray-500">{data.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 详细信息卡片动画 */}
      {selectedShishen && (
        <div className={`transition-all duration-300 ${showCardAnimation ? "animate-pulse" : ""}`}>
          <Card className="overflow-hidden">
            <div className="relative">
              {/* 三张卡牌布局 */}
              <div className="flex justify-center items-center min-h-[400px] bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
                <div className="flex space-x-8 perspective-1000">
                  {/* 左卡：关键词图示 */}
                  <div className="transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                    <Card className="w-64 h-80 shadow-xl" style={{ borderColor: shishenData[selectedShishen].color }}>
                      <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                        <div className="text-6xl mb-4">{shishenData[selectedShishen].icon}</div>
                        <div className="text-2xl font-bold mb-4" style={{ color: shishenData[selectedShishen].color }}>
                          {selectedShishen}
                        </div>
                        <div className="text-lg text-gray-600 mb-4">{shishenData[selectedShishen].essence}</div>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {shishenData[selectedShishen].keywords.slice(0, 4).map((keyword) => (
                            <Badge key={keyword} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 中卡：预留封面 */}
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <Card className="w-64 h-80 shadow-xl bg-gradient-to-br from-gray-100 to-gray-200">
                      <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                        <div className="text-gray-400 text-lg mb-4">卡牌封面</div>
                        <div className="text-gray-500 text-sm">即将上线</div>
                        <div className="mt-4 w-full h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                          <span className="text-gray-500">封面图片</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 右卡：基本概念 */}
                  <div className="transform rotate-12 hover:rotate-0 transition-transform duration-300">
                    <Card className="w-64 h-80 shadow-xl" style={{ borderColor: shishenData[selectedShishen].color }}>
                      <CardContent className="p-6 h-full">
                        <div
                          className="text-xl font-bold mb-3 text-center"
                          style={{ color: shishenData[selectedShishen].color }}
                        >
                          基本概念
                        </div>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="font-medium">五行关系：</span>
                            <span className="text-gray-600">{shishenData[selectedShishen].wuxingRelation}</span>
                          </div>
                          <div>
                            <span className="font-medium">阴阳属性：</span>
                            <span className="text-gray-600">{shishenData[selectedShishen].yinyang}</span>
                          </div>
                          <div>
                            <span className="font-medium">核心含义：</span>
                            <span className="text-gray-600">{shishenData[selectedShishen].description}</span>
                          </div>
                          <div>
                            <span className="font-medium">{gender === "male" ? "男命" : "女命"}象义：</span>
                            <span className="text-gray-600">
                              {shishenData[selectedShishen].genderDifference[gender].meaning}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 详细解释面板 */}
      {selectedShishen && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <span className="text-3xl">{shishenData[selectedShishen].icon}</span>
              <span style={{ color: shishenData[selectedShishen].color }}>
                {selectedShishen} · {shishenData[selectedShishen].essence}
              </span>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 左侧：性格特征 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">性格特征</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800 mb-2">正面特质</div>
                      <div className="flex flex-wrap gap-2">
                        {shishenData[selectedShishen].characteristics.positive.map((trait) => (
                          <Badge key={trait} className="bg-green-100 text-green-800">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="font-medium text-red-800 mb-2">负面特质</div>
                      <div className="flex flex-wrap gap-2">
                        {shishenData[selectedShishen].characteristics.negative.map((trait) => (
                          <Badge key={trait} className="bg-red-100 text-red-800">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">关键词云</h4>
                  <div className="flex flex-wrap gap-2">
                    {shishenData[selectedShishen].keywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="outline"
                        style={{
                          borderColor: shishenData[selectedShishen].color,
                          color: shishenData[selectedShishen].color,
                        }}
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* 右侧：生活应用 */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4 text-lg">生活应用</h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-800 mb-1">性格表现</div>
                      <div className="text-sm text-blue-700">
                        {shishenData[selectedShishen].lifeAspects.personality}
                      </div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-medium text-purple-800 mb-1">事业发展</div>
                      <div className="text-sm text-purple-700">{shishenData[selectedShishen].lifeAspects.career}</div>
                    </div>
                    <div className="p-3 bg-pink-50 rounded-lg">
                      <div className="font-medium text-pink-800 mb-1">人际关系</div>
                      <div className="text-sm text-pink-700">
                        {shishenData[selectedShishen].lifeAspects.relationship}
                      </div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-medium text-yellow-800 mb-1">财运分析</div>
                      <div className="text-sm text-yellow-700">{shishenData[selectedShishen].lifeAspects.wealth}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">{gender === "male" ? "男命" : "女命"}特殊影响</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm space-y-2">
                      <div>
                        <span className="font-medium">代表含义：</span>
                        <span className="text-gray-700">
                          {shishenData[selectedShishen].genderDifference[gender].meaning}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">主要影响：</span>
                        <span className="text-gray-700">
                          {shishenData[selectedShishen].genderDifference[gender].influence}
                        </span>
                      </div>
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
