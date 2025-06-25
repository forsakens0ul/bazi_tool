import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CangganDemonstrator from "@/components/canggan-demonstrator"
import FuxingRelationMap from "@/components/fuxing-relation-map"
import XingyunSanyuan from "@/components/xingyun-sanyuan"
import NayinAnalyzer from "@/components/nayin-analyzer"
import SizhuDeconstructor from "@/components/sizhu-deconstructor"

export default function PaipanAdvancedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">排盘进阶</h1>
          <p className="text-gray-600">深入解析藏干、副星、星运、纳音、宫位与六亲的隐性结构</p>
        </div>

        <Tabs defaultValue="canggan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="canggan">藏干演示</TabsTrigger>
            <TabsTrigger value="fuxing">副星图谱</TabsTrigger>
            <TabsTrigger value="xingyun">星运流转</TabsTrigger>
            <TabsTrigger value="nayin">纳音分析</TabsTrigger>
            <TabsTrigger value="sizhu">四柱解构</TabsTrigger>
          </TabsList>

          <TabsContent value="canggan">
            <CangganDemonstrator />
          </TabsContent>

          <TabsContent value="fuxing">
            <FuxingRelationMap />
          </TabsContent>

          <TabsContent value="xingyun">
            <XingyunSanyuan />
          </TabsContent>

          <TabsContent value="nayin">
            <NayinAnalyzer />
          </TabsContent>

          <TabsContent value="sizhu">
            <SizhuDeconstructor />
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>排盘进阶学习要点</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">隐性结构</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 地支藏干的力量分布</li>
                    <li>• 副星神煞的作用位置</li>
                    <li>• 纳音五行的特殊意义</li>
                    <li>• 宫位六亲的关系网络</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">系统分析</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 多维度联动交互分析</li>
                    <li>• 星运三元九运流转</li>
                    <li>• 四柱宫位智能解构</li>
                    <li>• 可视化结构图表展示</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">实战应用</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 精准定位用神所在</li>
                    <li>• 识别关键作用因素</li>
                    <li>• 把握时空运势变化</li>
                    <li>• 提升断语准确度</li>
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