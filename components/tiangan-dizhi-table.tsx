"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tianganData = [
  { gan: "甲", wuxing: "木", yinyang: "阳", meaning: "参天大树，栋梁之材" },
  { gan: "乙", wuxing: "木", yinyang: "阴", meaning: "花草藤蔓，柔韧灵活" },
  { gan: "丙", wuxing: "火", yinyang: "阳", meaning: "太阳之火，光明磊落" },
  { gan: "丁", wuxing: "火", yinyang: "阴", meaning: "灯烛之火，温和细腻" },
  { gan: "戊", wuxing: "土", yinyang: "阳", meaning: "高山厚土，稳重可靠" },
  { gan: "己", wuxing: "土", yinyang: "阴", meaning: "田园沃土，包容滋养" },
  { gan: "庚", wuxing: "金", yinyang: "阳", meaning: "刀剑钢铁，刚强果断" },
  { gan: "辛", wuxing: "金", yinyang: "阴", meaning: "珠宝首饰，精致美丽" },
  { gan: "壬", wuxing: "水", yinyang: "阳", meaning: "江河大海，奔腾不息" },
  { gan: "癸", wuxing: "水", yinyang: "阴", meaning: "雨露甘霖，润物无声" },
]

const dizhiData = [
  { zhi: "子", wuxing: "水", yinyang: "阳", canggan: ["癸"], season: "冬月", time: "23-1时" },
  { zhi: "丑", wuxing: "土", yinyang: "阴", canggan: ["己", "癸", "辛"], season: "冬月", time: "1-3时" },
  { zhi: "寅", wuxing: "木", yinyang: "阳", canggan: ["甲", "丙", "戊"], season: "春月", time: "3-5时" },
  { zhi: "卯", wuxing: "木", yinyang: "阴", canggan: ["乙"], season: "春月", time: "5-7时" },
  { zhi: "辰", wuxing: "土", yinyang: "阳", canggan: ["戊", "乙", "癸"], season: "春月", time: "7-9时" },
  { zhi: "巳", wuxing: "火", yinyang: "阴", canggan: ["丙", "戊", "庚"], season: "夏月", time: "9-11时" },
  { zhi: "午", wuxing: "火", yinyang: "阳", canggan: ["丁", "己"], season: "夏月", time: "11-13时" },
  { zhi: "未", wuxing: "土", yinyang: "阴", canggan: ["己", "丁", "乙"], season: "夏月", time: "13-15时" },
  { zhi: "申", wuxing: "金", yinyang: "阳", canggan: ["庚", "壬", "戊"], season: "秋月", time: "15-17时" },
  { zhi: "酉", wuxing: "金", yinyang: "阴", canggan: ["辛"], season: "秋月", time: "17-19时" },
  { zhi: "戌", wuxing: "土", yinyang: "阳", canggan: ["戊", "辛", "丁"], season: "秋月", time: "19-21时" },
  { zhi: "亥", wuxing: "水", yinyang: "阴", canggan: ["壬", "甲"], season: "冬月", time: "21-23时" },
]

const wuxingColors = {
  木: "bg-green-100 text-green-800",
  火: "bg-red-100 text-red-800",
  土: "bg-yellow-100 text-yellow-800",
  金: "bg-gray-100 text-gray-800",
  水: "bg-blue-100 text-blue-800",
}

const yinyangColors = {
  阳: "bg-orange-100 text-orange-800",
  阴: "bg-purple-100 text-purple-800",
}

export default function TianganDizhiTable() {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("tiangan")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tiangan">天干速查</TabsTrigger>
          <TabsTrigger value="dizhi">地支速查</TabsTrigger>
        </TabsList>

        <TabsContent value="tiangan">
          <Card>
            <CardHeader>
              <CardTitle>十天干属性表</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {tianganData.map((item) => (
                  <div
                    key={item.gan}
                    className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2">{item.gan}</div>
                      <div className="space-y-1">
                        <Badge className={wuxingColors[item.wuxing as keyof typeof wuxingColors]}>{item.wuxing}</Badge>
                        <Badge className={yinyangColors[item.yinyang as keyof typeof yinyangColors]}>
                          {item.yinyang}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dizhi">
          <Card>
            <CardHeader>
              <CardTitle>十二地支属性表</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {dizhiData.map((item) => (
                  <div
                    key={item.zhi}
                    className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2">{item.zhi}</div>
                      <div className="space-y-1">
                        <Badge className={wuxingColors[item.wuxing as keyof typeof wuxingColors]}>{item.wuxing}</Badge>
                        <Badge className={yinyangColors[item.yinyang as keyof typeof yinyangColors]}>
                          {item.yinyang}
                        </Badge>
                        <div className="text-xs text-gray-600">{item.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedItem && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-3xl">{selectedItem.gan || selectedItem.zhi}</span>
              <span>详细信息</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">基本属性</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">五行：</span>
                      <Badge className={wuxingColors[selectedItem.wuxing as keyof typeof wuxingColors]}>
                        {selectedItem.wuxing}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">阴阳：</span>
                      <Badge className={yinyangColors[selectedItem.yinyang as keyof typeof yinyangColors]}>
                        {selectedItem.yinyang}
                      </Badge>
                    </div>
                    {selectedItem.season && (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">季节：</span>
                        <span>{selectedItem.season}</span>
                      </div>
                    )}
                    {selectedItem.time && (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">时辰：</span>
                        <span>{selectedItem.time}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {selectedItem.meaning && (
                  <div>
                    <h4 className="font-semibold mb-2">象义</h4>
                    <p className="text-gray-700">{selectedItem.meaning}</p>
                  </div>
                )}
                {selectedItem.canggan && (
                  <div>
                    <h4 className="font-semibold mb-2">藏干</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.canggan.map((gan: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {gan} {index === 0 ? "(本气)" : index === 1 ? "(中气)" : "(余气)"}
                        </Badge>
                      ))}
                    </div>
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
