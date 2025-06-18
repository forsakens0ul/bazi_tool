import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WuxingCycle from "@/components/wuxing-cycle"
import TianganDizhiTable from "@/components/tiangan-dizhi-table"
import LiushiJiaziWheel from "@/components/liushi-jiazi-wheel"
import DizhiCangganDetail from "@/components/dizhi-canggan-detail"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function WuxingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-amber-600 hover:text-amber-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">五行与干支基础</h1>
          <p className="text-gray-600">掌握阴阳五行相生相克关系，理解天干地支基础属性</p>
        </div>

        <Tabs defaultValue="wuxing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="wuxing">五行相生相克</TabsTrigger>
            <TabsTrigger value="ganzhi">天干地支</TabsTrigger>
            <TabsTrigger value="jiazi">六十甲子</TabsTrigger>
            <TabsTrigger value="canggan">地支藏干</TabsTrigger>
          </TabsList>

          <TabsContent value="wuxing">
            <WuxingCycle />
          </TabsContent>

          <TabsContent value="ganzhi">
            <TianganDizhiTable />
          </TabsContent>

          <TabsContent value="jiazi">
            <LiushiJiaziWheel />
          </TabsContent>

          <TabsContent value="canggan">
            <DizhiCangganDetail />
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>学习要点</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">五行相生</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 木生火：木燃烧生火</li>
                    <li>• 火生土：火烧成灰化为土</li>
                    <li>• 土生金：土中蕴含金属</li>
                    <li>• 金生水：金属凝结生水</li>
                    <li>• 水生木：水滋养树木</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">五行相克</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 木克土：树根破土而出</li>
                    <li>• 火克金：烈火熔化金属</li>
                    <li>• 土克水：土能吸水止水</li>
                    <li>• 金克木：金属可砍伐树木</li>
                    <li>• 水克火：水能灭火</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">六十甲子</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 十天干与十二地支组合</li>
                    <li>• 每个组合都有纳音五行</li>
                    <li>• 60年为一个完整周期</li>
                    <li>• 用于年月日时的推算</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">地支藏干</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 每个地支藏有天干</li>
                    <li>• 分为本气、中气、余气</li>
                    <li>• 影响五行力量分布</li>
                    <li>• 决定格局和用神</li>
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
