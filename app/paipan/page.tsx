import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BaziPaipan from "@/components/bazi-paipan"
import MingpanStructureAnalyzer from "@/components/mingpan-structure-analyzer"

export default function PaipanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-red-600 hover:text-red-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">排盘与演练</h1>
          <p className="text-gray-600">手动排盘、命盘分析、结构解读与断语训练</p>
        </div>

        <Tabs defaultValue="paipan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="paipan">八字排盘</TabsTrigger>
            <TabsTrigger value="structure">结构分析</TabsTrigger>
            <TabsTrigger value="training">断语训练</TabsTrigger>
          </TabsList>

          <TabsContent value="paipan">
            <BaziPaipan />
          </TabsContent>

          <TabsContent value="structure">
            <MingpanStructureAnalyzer />
          </TabsContent>

          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle>断语训练系统</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500 py-12">
                  <p className="text-lg mb-4">断语训练系统开发中...</p>
                  <p className="text-sm">将包含：命盘分析练习、断语生成训练、准确度评估系统</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>排盘学习要点</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">排盘基础</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 准确计算四柱干支</li>
                    <li>• 区分公历农历换算</li>
                    <li>• 掌握节气时间点</li>
                    <li>• 了解时区地理影响</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">结构分析</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 五行分布统计</li>
                    <li>• 十神关系网络</li>
                    <li>• 气机流通状态</li>
                    <li>• 格局模式识别</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">实战演练</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 从看盘到说盘</li>
                    <li>• 逐层深入分析</li>
                    <li>• 断语逻辑训练</li>
                    <li>• 准确度自我评估</li>
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
