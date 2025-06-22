"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { classicAnalyses, getClassicAnalysis } from "@/data/guji-classics"
import { BookOpen, Eye, Lightbulb, TrendingUp } from "lucide-react"

export default function ClassicTextAnalyzer() {
  const [selectedText, setSelectedText] = useState<string>("")
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [showStructure, setShowStructure] = useState(false)

  const handleTextSelect = (textKey: string) => {
    setSelectedText(textKey)
    const analysis = getClassicAnalysis(textKey)
    setAnalysisResult(analysis)
    setShowStructure(false)
  }

  const toggleStructure = () => {
    setShowStructure(!showStructure)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>原文解析器</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">选择经典条文</label>
              <Select value={selectedText} onValueChange={handleTextSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="请选择要分析的经典条文" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(classicAnalyses).map(([key, analysis]) => (
                    <SelectItem key={key} value={key}>
                      {analysis.book} - {analysis.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 快速选择 */}
            <div>
              <h5 className="font-medium mb-2 text-sm">热门条文</h5>
              <div className="flex flex-wrap gap-2">
                {Object.entries(classicAnalyses).slice(0, 6).map(([key, analysis]) => (
                  <Badge
                    key={key}
                    variant="outline"
                    className="cursor-pointer hover:bg-amber-100 transition-colors"
                    onClick={() => handleTextSelect(key)}
                  >
                    {analysis.title}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 分析结果 */}
      {analysisResult && (
        <div className="space-y-6">
          {/* 原文展示 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-amber-600">{analysisResult.book}</span>
                  <Badge variant="outline">{analysisResult.chapter}</Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleStructure}
                  className="flex items-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>{showStructure ? "隐藏" : "显示"}结构图</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 原文 */}
                <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                  <div className="font-medium text-amber-800 mb-2">原文</div>
                  <div className="text-lg text-gray-800 leading-relaxed">
                    {analysisResult.originalText}
                  </div>
                </div>

                {/* 白话解释 */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-800 mb-2">白话解释</div>
                  <div className="text-gray-700 leading-relaxed">
                    {analysisResult.modernExplanation}
                  </div>
                </div>

                {/* 现代术语解读 */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-800 mb-2">现代术语解读</div>
                  <div className="text-gray-700 leading-relaxed">
                    {analysisResult.modernTermExplanation}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 结构分析图 */}
          {showStructure && analysisResult.structure && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>结构分析图</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* 命理结构图 */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium mb-3">命理结构示意</div>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {analysisResult.structure.bazi.split(" ").map((zhu: string, index: number) => (
                        <div key={index} className="text-center p-3 bg-white rounded border">
                          <div className="text-xs text-gray-500 mb-1">
                            {["年柱", "月柱", "日柱", "时柱"][index]}
                          </div>
                          <div className="font-bold text-lg">{zhu}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* 十神标注 */}
                    <div className="grid grid-cols-4 gap-2">
                      {analysisResult.structure.shishen.map((shishen: string, index: number) => (
                        <div key={index} className="text-center">
                          <Badge 
                            className={`text-xs ${
                              shishen === "日主" ? "bg-yellow-500 text-white" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {shishen}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 关键要素分析 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-purple-50 rounded">
                      <div className="font-medium text-purple-800 mb-2">关键要素</div>
                      <div className="space-y-1 text-sm text-purple-700">
                        {analysisResult.structure.keyElements.map((element: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>{element}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-red-50 rounded">
                      <div className="font-medium text-red-800 mb-2">问题所在</div>
                      <div className="space-y-1 text-sm text-red-700">
                        {analysisResult.structure.problems.map((problem: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span>{problem}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 案例应用 */}
          <Card>
            <CardHeader>
              <CardTitle>案例应用</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {analysisResult.examples.map((example: any, index: number) => (
                  <div key={index} className="p-4 bg-yellow-50 rounded-lg">
                    <div className="font-medium text-yellow-800 mb-3">
                      案例 {index + 1}：{example.title}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">八字：</div>
                        <div className="font-mono text-lg">{example.bazi}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600 mb-1">分析：</div>
                        <div className="text-sm text-gray-700">{example.analysis}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600 mb-1">体现：</div>
                        <div className="text-sm text-yellow-700 font-medium">{example.demonstration}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 学习要点 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5" />
                <span>学习要点</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-800">理解要点</h4>
                  <div className="space-y-2">
                    {analysisResult.learningPoints.understanding.map((point: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span className="text-sm text-gray-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-blue-800">应用技巧</h4>
                  <div className="space-y-2">
                    {analysisResult.learningPoints.application.map((point: string, index: number) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span className="text-sm text-gray-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 使用指南 */}
      {!analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle>使用指南</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-amber-500" />
                <h4 className="font-semibold mb-2">选择条文</h4>
                <p className="text-sm text-gray-600">
                  从经典古籍中选择要分析的条文
                </p>
              </div>
              <div className="text-center p-6">
                <Eye className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h4 className="font-semibold mb-2">查看解析</h4>
                <p className="text-sm text-gray-600">
                  获得原文、白话、现代术语三重解释
                </p>
              </div>
              <div className="text-center p-6">
                <Lightbulb className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h4 className="font-semibold mb-2">深入学习</h4>
                <p className="text-sm text-gray-600">
                  通过案例和要点深化理解
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}