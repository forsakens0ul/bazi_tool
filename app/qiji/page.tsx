import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ShengkeZhihuaOverview from "@/components/shengke-zhihua-overview"
import QijiFlowSimulator from "@/components/qiji-flow-simulator"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import HuashenJudgeDiagram from "@/components/huashen-judge-diagram"

export default function QijiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">生克制化与气机</h1>
          <p className="text-gray-600">理解干支生克制化关系，掌握气机流通原理</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">生克制化总览</TabsTrigger>
            <TabsTrigger value="simulator">气机流动演示</TabsTrigger>
            <TabsTrigger value="advanced">化神判断</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ShengkeZhihuaOverview />
          </TabsContent>

          <TabsContent value="simulator">
            <QijiFlowSimulator />
          </TabsContent>

          <TabsContent value="advanced">
            <HuashenJudgeDiagram />
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>生克制化学习要点</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">五行生克</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 相生：木→火→土→金→水→木</li>
                    <li>• 相克：木克土，火克金，土克水</li>
                    <li>• 生克有情：力量适中，配合得当</li>
                    <li>• 生克无情：力量悬殊，冲突激烈</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">气机流通</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 流通：五行相生成环，气机顺畅</li>
                    <li>• 阻滞：相克激烈，需要通关</li>
                    <li>• 偏枯：某行过旺或过弱</li>
                    <li>• 调候：寒暖燥湿的平衡</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">化神制化</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 天干五合：甲己合土，乙庚合金</li>
                    <li>• 地支三合：申子辰水，亥卯未木</li>
                    <li>• 成化条件：化神有力，时令相助</li>
                    <li>• 假化判断：合而不化的情况</li>
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
