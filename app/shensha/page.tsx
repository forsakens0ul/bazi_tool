import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ShenshaDictionary from "@/components/shensha-dictionary"
import ShenshaVisualization from "@/components/shensha-visualization"
import MingpanShenshaAnalyzer from "@/components/mingpan-shensha-analyzer"

export default function ShenshaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-yellow-600 hover:text-yellow-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">神煞与杂曜</h1>
          <p className="text-gray-600">掌握神煞查找方法，理解象义和吉凶组合</p>
        </div>

        <Tabs defaultValue="dictionary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dictionary">神煞词典</TabsTrigger>
            <TabsTrigger value="visualization">可视化地图</TabsTrigger>
            <TabsTrigger value="analyzer">命盘标注</TabsTrigger>
          </TabsList>

          <TabsContent value="dictionary">
            <ShenshaDictionary />
          </TabsContent>

          <TabsContent value="visualization">
            <ShenshaVisualization />
          </TabsContent>

          <TabsContent value="analyzer">
            <MingpanShenshaAnalyzer />
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>神煞学习要点</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">判断方法</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 以日干查地支为主要方法</li>
                    <li>• 记住核心口诀便于快速判断</li>
                    <li>• 注意年支、日支的特殊查法</li>
                    <li>• 区分真神煞与假神煞</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">吉凶应用</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 贵人类神煞多为吉神</li>
                    <li>• 凶煞需要制化才能化解</li>
                    <li>• 中性神煞看具体配合</li>
                    <li>• 神煞不能脱离格局单论</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">实战技巧</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 重点关注高频实用神煞</li>
                    <li>• 结合大运流年看神煞应期</li>
                    <li>• 神煞多者不一定就好</li>
                    <li>• 学会用神煞辅助判断</li>
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
