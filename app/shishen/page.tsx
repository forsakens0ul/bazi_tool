import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ShishenDictionary from "@/components/shishen-dictionary"
import ShishenSymbolism from "@/components/shishen-symbolism"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ShishenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">十神系统</h1>
          <p className="text-gray-600">理解十神定义、练习定位方法、掌握象义对照</p>
        </div>

        <Tabs defaultValue="dictionary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dictionary">十神词典</TabsTrigger>
            <TabsTrigger value="symbolism">象义对照</TabsTrigger>
            <TabsTrigger value="practice">定位练习</TabsTrigger>
          </TabsList>

          <TabsContent value="dictionary">
            <ShishenDictionary />
          </TabsContent>

          <TabsContent value="symbolism">
            <ShishenSymbolism />
          </TabsContent>

          <TabsContent value="practice">
            <Card>
              <CardHeader>
                <CardTitle>十神定位练习器</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500 py-12">
                  <p className="text-lg mb-4">十神定位练习器开发中...</p>
                  <p className="text-sm">将包含：根据日主与其他干支推导十神的交互练习</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>十神学习要点</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">基础定义</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 十神是以日主为中心的十种关系</li>
                    <li>• 根据五行生克和阴阳属性确定</li>
                    <li>• 每个十神都有特定的象义</li>
                    <li>• 男命女命的象义有所不同</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">定位方法</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 同我：比肩（同性）、劫财（异性）</li>
                    <li>• 我生：食神（同性）、伤官（异性）</li>
                    <li>• 我克：偏财（同性）、正财（异性）</li>
                    <li>• 克我：七杀（同性）、正官（异性）</li>
                    <li>• 生我：偏印（同性）、正印（异性）</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">实际应用</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 分析性格特征和行为模式</li>
                    <li>• 判断人际关系和社会角色</li>
                    <li>• 预测事业发展和财运状况</li>
                    <li>• 了解婚姻感情和家庭关系</li>
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
