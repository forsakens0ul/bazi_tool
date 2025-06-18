import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BookOpen, Zap, Target, Compass, Star, Calculator } from "lucide-react"

const modules = [
  {
    id: "wuxing",
    title: "五行与干支基础",
    description: "阴阳五行相生相克、天干地支、六十甲子",
    icon: Compass,
    difficulty: "基础",
    components: ["五行相生相克图", "天干地支速查表", "六十甲子速查表", "地支藏干展开图"],
    href: "/wuxing",
  },
  {
    id: "shishen",
    title: "十神系统",
    description: "十神定义、定位练习、象义对照",
    icon: Target,
    difficulty: "基础",
    components: ["十神定义词典", "十神定位练习器", "十神象义对照图"],
    href: "/shishen",
  },
  {
    id: "geju",
    title: "格局与用神",
    description: "八格归类、格局训练、用神流通",
    icon: BookOpen,
    difficulty: "进阶",
    components: ["八格归类表", "格局对照训练器", "用神流通动画"],
    href: "/geju",
  },
  {
    id: "qiji",
    title: "生克制化与气机",
    description: "干支生克、气机流通、藏干力量",
    icon: Zap,
    difficulty: "进阶",
    components: ["干支生克制化图", "气机流通模拟器", "藏干力量分布图"],
    href: "/qiji",
  },
  {
    id: "shensha",
    title: "神煞与杂曜",
    description: "神煞查找、象义图鉴、吉凶组合",
    icon: Star,
    difficulty: "高阶",
    components: ["神煞查找器", "神煞象义图鉴", "吉凶组合图"],
    href: "/shensha",
  },
  {
    id: "paipan",
    title: "排盘与演练",
    description: "手动排盘、命盘分析、断语训练",
    icon: Calculator,
    difficulty: "实践",
    components: ["手动排八字模块", "命盘结构分析图", "断语训练系统"],
    href: "/paipan",
  },
]

const difficultyColors = {
  基础: "bg-green-100 text-green-800",
  进阶: "bg-blue-100 text-blue-800",
  高阶: "bg-purple-100 text-purple-800",
  实践: "bg-orange-100 text-orange-800",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">八字知识交互组件库</h1>
          <p className="text-xl text-gray-600 mb-2">概念可视化词典 + 交互式学习工具</p>
          <p className="text-gray-500">帮助理解、记忆和演练八字核心难点知识</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const IconComponent = module.icon
            return (
              <Link key={module.id} href={module.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-amber-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <IconComponent className="h-8 w-8 text-amber-600" />
                      <Badge className={difficultyColors[module.difficulty as keyof typeof difficultyColors]}>
                        {module.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">包含组件：</p>
                      <div className="flex flex-wrap gap-1">
                        {module.components.map((component, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {component}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>学习路径建议</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <Badge className="bg-green-100 text-green-800">基础</Badge>
                  <span>建立五行与干支基础，理解相生相克关系</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-blue-100 text-blue-800">进阶</Badge>
                  <span>掌握十神系统，学习格局分类和气机流通</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-purple-100 text-purple-800">高阶</Badge>
                  <span>深入神煞组合，理解通神用忌</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-orange-100 text-orange-800">实践</Badge>
                  <span>综合运用，排盘演练和断语训练</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
