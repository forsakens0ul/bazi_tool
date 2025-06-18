import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BageGuiLeiTable from "@/components/bageuilei-table"
import YongshenFlow from "@/components/yongshen-flow"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function GejuPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">格局与用神</h1>
          <p className="text-gray-600">学习八格归类、格局训练、用神流通原理</p>
        </div>

        <Tabs defaultValue="bageuilei" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bageuilei">八格归类</TabsTrigger>
            <TabsTrigger value="yongshenflow">用神流通</TabsTrigger>
            <TabsTrigger value="training">格局训练</TabsTrigger>
          </TabsList>

          <TabsContent value="bageuilei">
            <BageGuiLeiTable />
          </TabsContent>

          <TabsContent value="yongshenflow">
            <YongshenFlow />
          </TabsContent>

          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle>格局对照训练器</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500 py-12">
                  <p className="text-lg mb-4">格局对照训练器开发中...</p>
                  <p className="text-sm">将包含：输入八字判断格局归属的交互练习</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>格局学习要点</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">格局识别</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 以月令为主，月干为辅</li>
                    <li>• 确认格局神是否透干</li>
                    <li>• 检查是否有破格因素</li>
                    <li>• 区分正格与从格</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">用神选择</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 扶抑：身强抑之，身弱扶之</li>
                    <li>• 调候：寒暖燥湿的调节</li>
                    <li>• 通关：化解五行冲突</li>
                    <li>• 从格：顺势而为不抗拒</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">实战应用</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 格局决定人生层次</li>
                    <li>• 用神影响运势起伏</li>
                    <li>• 大运配合格局变化</li>
                    <li>• 流年触发吉凶应验</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
