"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { classicTexts, searchClassicTexts } from "@/data/guji-classics"
import { Search, BookOpen, Eye, ChevronDown, ChevronUp } from "lucide-react"

export default function GujikeywordSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedBook, setSelectedBook] = useState<string>("all")
  const [expandedResult, setExpandedResult] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    if (!searchTerm.trim()) return
    
    setIsSearching(true)
    setTimeout(() => {
      const results = searchClassicTexts(searchTerm, selectedBook)
      setSearchResults(results)
      setIsSearching(false)
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const toggleExpanded = (resultId: string) => {
    setExpandedResult(expandedResult === resultId ? null : resultId)
  }

  const highlightText = (text: string, term: string) => {
    if (!term) return text
    const regex = new RegExp(`(${term})`, 'gi')
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>古籍关键词搜索</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 搜索输入区 */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="输入关键词搜索（如：伤官见官、财多身弱、枭印夺食）"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch} disabled={isSearching || !searchTerm.trim()}>
                {isSearching ? "搜索中..." : "搜索"}
              </Button>
            </div>

            {/* 古籍选择 */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedBook === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedBook("all")}
              >
                全部古籍
              </Button>
              {Object.keys(classicTexts).map((book) => (
                <Button
                  key={book}
                  variant={selectedBook === book ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedBook(book)}
                >
                  {book}
                </Button>
              ))}
            </div>

            {/* 快速搜索示例 */}
            <div className="p-4 bg-amber-50 rounded-lg">
              <h5 className="font-medium mb-2 text-amber-800">热门搜索</h5>
              <div className="flex flex-wrap gap-2">
                {["伤官见官", "财多身弱", "枭印夺食", "身强财旺", "官杀混杂", "食神制杀"].map((term) => (
                  <Badge
                    key={term}
                    variant="outline"
                    className="cursor-pointer hover:bg-amber-100 transition-colors"
                    onClick={() => {
                      setSearchTerm(term)
                      const results = searchClassicTexts(term, selectedBook)
                      setSearchResults(results)
                    }}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 搜索结果 */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>搜索结果 ({searchResults.length})</span>
              <Badge variant="outline">关键词: {searchTerm}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <div
                  key={`${result.book}-${index}`}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-amber-600" />
                      <span className="font-semibold text-amber-700">{result.book}</span>
                      <Badge variant="outline" className="text-xs">
                        {result.chapter}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(`${result.book}-${index}`)}
                      className="flex items-center space-x-1"
                    >
                      {expandedResult === `${result.book}-${index}` ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                      <span>详情</span>
                    </Button>
                  </div>

                  {/* 原文片段 */}
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-1">原文：</div>
                    <div 
                      className="text-gray-800 bg-gray-50 p-3 rounded border-l-4 border-amber-400"
                      dangerouslySetInnerHTML={{ 
                        __html: highlightText(result.originalText, searchTerm) 
                      }}
                    />
                  </div>

                  {/* 白话解释 */}
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-1">白话解释：</div>
                    <div className="text-gray-700 bg-blue-50 p-3 rounded">
                      {result.modernExplanation}
                    </div>
                  </div>

                  {/* 展开的详细内容 */}
                  {expandedResult === `${result.book}-${index}` && (
                    <div className="mt-4 pt-4 border-t space-y-4">
                      {/* 现代术语 */}
                      <div>
                        <div className="text-sm text-gray-600 mb-2">现代术语：</div>
                        <div className="flex flex-wrap gap-2">
                          {result.modernTerms.map((term: string, idx: number) => (
                            <Badge key={idx} className="bg-green-100 text-green-800">
                              {term}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* 结构分析 */}
                      <div>
                        <div className="text-sm text-gray-600 mb-2">结构分析：</div>
                        <div className="text-gray-700 bg-purple-50 p-3 rounded">
                          {result.structureAnalysis}
                        </div>
                      </div>

                      {/* 应用案例 */}
                      {result.example && (
                        <div>
                          <div className="text-sm text-gray-600 mb-2">应用案例：</div>
                          <div className="bg-yellow-50 p-3 rounded">
                            <div className="font-medium mb-1">八字：{result.example.bazi}</div>
                            <div className="text-sm text-gray-700">{result.example.analysis}</div>
                          </div>
                        </div>
                      )}

                      {/* 相关条目 */}
                      {result.relatedTerms && result.relatedTerms.length > 0 && (
                        <div>
                          <div className="text-sm text-gray-600 mb-2">相关条目：</div>
                          <div className="flex flex-wrap gap-2">
                            {result.relatedTerms.map((term: string, idx: number) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                  setSearchTerm(term)
                                  const results = searchClassicTexts(term, selectedBook)
                                  setSearchResults(results)
                                }}
                              >
                                {term}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 无搜索结果 */}
      {searchResults.length === 0 && searchTerm && !isSearching && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>未找到相关内容</p>
            </div>
            <p className="text-sm text-gray-400">
              尝试使用其他关键词或选择不同的古籍范围
            </p>
          </CardContent>
        </Card>
      )}

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-amber-700">搜索技巧</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• 支持关键词、通假字、拼音搜索</li>
                <li>• 可按古籍分类筛选结果</li>
                <li>• 点击相关条目可快速跳转</li>
                <li>• 支持模糊匹配和精确匹配</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-amber-700">内容特色</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• 原文与白话对照解释</li>
                <li>• 现代命理术语转换</li>
                <li>• 结构分析图解说明</li>
                <li>• 真实八字案例应用</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}