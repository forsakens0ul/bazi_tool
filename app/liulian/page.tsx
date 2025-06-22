import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DayunTimeline from "@/components/dayun-timeline"
import LiunianAnalyzer from "@/components/liunian-analyzer"
import ComprehensiveAnalyzer from "@/components/comprehensive-analyzer"

export default function LiulianPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">流年与大运推演</h1>
          <p className="text-gray-600">时间维度把握命运走势，预测关键年份与转运节点</p>
        </div>

        <Tabs defaultValue="dayun" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dayun">大运排布</TabsTrigger>
            <TabsTrigger value="liunian">流年分析</TabsTrigger>
            <TabsTrigger value="comprehensive">综合推演</TabsTrigger>
          </TabsList>

          <TabsContent value="dayun">
            <DayunTimeline />
          </TabsContent>

          <TabsContent value="liunian">
            <LiunianAnalyzer />
          </TabsContent>

          <TabsContent value="comprehensive">
            <ComprehensiveAnalyzer />
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>流年大运学习要点</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">大运规律</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 每运十年，顺逆排列</li>
                    <li>• 阳男阴女顺排大运</li>
                    <li>• 阴男阳女逆排大运</li>
                    <li>• 起运年龄精确计算</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">流年作用</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 流年为君，大运为臣</li>
                    <li>• 三者互动看吉凶</li>
                    <li>• 冲合刑害要重视</li>
                    <li>• 应期推断有技巧</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">实战技巧</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 关键年份提前预知</li>
                    <li>• 趋吉避凶有方法</li>
                    <li>• 人生节点把握准</li>
                    <li>• 运势起伏有规律</li>
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