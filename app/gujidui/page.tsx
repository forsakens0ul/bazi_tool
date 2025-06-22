import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GujikeywordSearch from "@/components/guji-keyword-search"
import ModernTermMapping from "@/components/modern-term-mapping"
import ClassicTextAnalyzer from "@/components/classic-text-analyzer"

export default function GujiduidPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-amber-600 hover:text-amber-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">古籍对照</h1>
          <p className="text-gray-600">经典古籍关键词对照系统，提升命理理解力与查阅效率</p>
        </div>

        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">关键词搜索</TabsTrigger>
            <TabsTrigger value="mapping">现代对照</TabsTrigger>
            <TabsTrigger value="analyzer">原文解析</TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <GujikeywordSearch />
          </TabsContent>

          <TabsContent value="mapping">
            <ModernTermMapping />
          </TabsContent>

          <TabsContent value="analyzer">
            <ClassicTextAnalyzer />
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>古籍学习要点</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">经典古籍</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 《三命通会》- 命理集大成</li>
                    <li>• 《滴天髓》- 格局精髓</li>
                    <li>• 《穷通宝鉴》- 调候要诀</li>
                    <li>• 《子平真诠》- 子平正宗</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">学习方法</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 原文与白话对照理解</li>
                    <li>• 古今术语转换掌握</li>
                    <li>• 结合实例深入分析</li>
                    <li>• 系统化整理归纳</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">实战应用</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 快速查找相关条文</li>
                    <li>• 理解古人命理思维</li>
                    <li>• 提升理论功底</li>
                    <li>• 增强实战能力</li>
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