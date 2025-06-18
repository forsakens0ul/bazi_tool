"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { huashenJudgeData, huashenCases } from "@/data/congge-huashen"
import { CheckCircle, XCircle, AlertCircle, ArrowRight } from "lucide-react"

export default function HuashenJudgeDiagram() {
  const [selectedCase, setSelectedCase] = useState<string>("甲己合土真化")
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [showFlow, setShowFlow] = useState<boolean>(false)

  const currentCase = huashenCases[selectedCase as keyof typeof huashenCases]

  // 判断流程图
  const JudgeFlowChart = () => (
    <div className="space-y-4">
      {huashenJudgeData.判断流程.map((step, index) => {
        const isActive = currentStep === step.step
        const isCompleted = currentStep > step.step

        return (
          <div key={step.step} className="flex items-start space-x-4">
            {/* 步骤圆圈 */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                isCompleted
                  ? "bg-green-500 text-white"
                  : isActive
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
              }`}
            >
              {isCompleted ? <CheckCircle className="w-4 h-4" /> : step.step}
            </div>

            {/* 步骤内容 */}
            <div className="flex-1">
              <div
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  isActive
                    ? "border-blue-400 bg-blue-50"
                    : isCompleted
                      ? "border-green-400 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="font-semibold mb-2">{step.title}</div>
                <div className="text-sm text-gray-700 mb-3">{step.description}</div>
                <div className="space-y-1">
                  {step.details.map((detail, idx) => (
                    <div key={idx} className="text-xs text-gray-600 flex items-center space-x-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 连接箭头 */}
            {index < huashenJudgeData.判断流程.length - 1 && (
              <div className="flex justify-center mt-4">
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )

  // 案例分析图
  const CaseAnalysisChart = () => (
    <div className="space-y-6">
      {/* 八字展示 */}
      <div className="text-center">
        <div className="font-semibold mb-3">{currentCase.title}</div>
        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
          {currentCase.bazi.split(" ").map((zhu, index) => (
            <div key={index} className="p-3 bg-white border-2 rounded-lg text-center">
              <div className="text-xs text-gray-500 mb-1">{["年", "月", "日", "时"][index]}</div>
              <div className="font-bold text-lg">{zhu}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 分析过程 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(currentCase.analysis).map(([key, value]) => (
          <div key={key} className="p-4 border rounded-lg">
            <div className="font-medium mb-2 text-sm">{key}</div>
            <div className="text-sm text-gray-700">{value}</div>
          </div>
        ))}
      </div>

      {/* 结论展示 */}
      <div
        className={`p-4 rounded-lg border-2 ${
          currentCase.success ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"
        }`}
      >
        <div className="flex items-center space-x-2 mb-2">
          {currentCase.success ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600" />
          )}
          <span className={`font-semibold ${currentCase.success ? "text-green-800" : "text-red-800"}`}>
            {currentCase.success ? "真化成立" : "合而不化"}
          </span>
        </div>
        <div className={`text-sm ${currentCase.success ? "text-green-700" : "text-red-700"}`}>
          {currentCase.qijiFlow}
        </div>
      </div>
    </div>
  )

  // 真假化对比
  const TrueVsFalseComparison = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 真化条件 */}
      <Card className="border-2 border-green-400">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center space-x-2 text-green-800">
            <CheckCircle className="w-5 h-5" />
            <span>{huashenJudgeData.真化条件.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {huashenJudgeData.真化条件.conditions.map((condition, index) => (
              <div key={index} className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-green-800 mb-1">{condition.name}</div>
                <div className="text-sm text-green-700 mb-2">{condition.description}</div>
                <div className="text-xs text-gray-600 bg-white p-2 rounded border">例：{condition.example}</div>
              </div>
            ))}
            <div className="p-3 bg-green-100 rounded-lg border border-green-300">
              <div className="font-semibold text-green-800">{huashenJudgeData.真化条件.result}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 假化条件 */}
      <Card className="border-2 border-red-400">
        <CardHeader className="bg-red-50">
          <CardTitle className="flex items-center space-x-2 text-red-800">
            <XCircle className="w-5 h-5" />
            <span>{huashenJudgeData.假化条件.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {huashenJudgeData.假化条件.conditions.map((condition, index) => (
              <div key={index} className="p-3 bg-red-50 rounded-lg">
                <div className="font-medium text-red-800 mb-1">{condition.name}</div>
                <div className="text-sm text-red-700 mb-2">{condition.description}</div>
                <div className="text-xs text-gray-600 bg-white p-2 rounded border">例：{condition.example}</div>
              </div>
            ))}
            <div className="p-3 bg-red-100 rounded-lg border border-red-300">
              <div className="font-semibold text-red-800">{huashenJudgeData.假化条件.result}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-4">
            <span>化神与假化判断图解</span>
            <div className="flex flex-wrap gap-2">
              <Button variant={!showFlow ? "default" : "outline"} size="sm" onClick={() => setShowFlow(false)}>
                真假化对比
              </Button>
              <Button variant={showFlow ? "default" : "outline"} size="sm" onClick={() => setShowFlow(true)}>
                判断流程
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>{!showFlow ? <TrueVsFalseComparison /> : <JudgeFlowChart />}</CardContent>
      </Card>

      {/* 案例分析 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-4">
            <span>典型案例分析</span>
            <div className="flex flex-wrap gap-2">
              {Object.keys(huashenCases).map((caseKey) => (
                <Button
                  key={caseKey}
                  variant={selectedCase === caseKey ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCase(caseKey)}
                  style={{
                    borderColor: huashenCases[caseKey as keyof typeof huashenCases].color,
                    backgroundColor:
                      selectedCase === caseKey ? huashenCases[caseKey as keyof typeof huashenCases].color : undefined,
                  }}
                >
                  {caseKey.split("真化")[0].split("假化")[0]}
                </Button>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CaseAnalysisChart />
        </CardContent>
      </Card>

      {/* 步骤控制 */}
      {showFlow && (
        <Card>
          <CardHeader>
            <CardTitle>判断步骤控制</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                上一步
              </Button>
              <Badge variant="outline" className="px-4 py-2">
                步骤 {currentStep} / {huashenJudgeData.判断流程.length}
              </Badge>
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.min(huashenJudgeData.判断流程.length, currentStep + 1))}
                disabled={currentStep === huashenJudgeData.判断流程.length}
              >
                下一步
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 学习要点 */}
      <Card>
        <CardHeader>
          <CardTitle>化神判断要点</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-800">关键要素</h4>
              </div>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• 化神是否得令有力</li>
                <li>• 合化双方是否有强根</li>
                <li>• 是否被其他干支冲破</li>
                <li>• 整体格局是否支持</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-800">真化特征</h4>
              </div>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• 化神当令或透干有力</li>
                <li>• 合化双方均无强根</li>
                <li>• 不被冲克或争合</li>
                <li>• 以化神五行论命</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <XCircle className="w-5 h-5 text-red-600" />
                <h4 className="font-semibold text-red-800">假化特征</h4>
              </div>
              <ul className="space-y-1 text-sm text-red-700">
                <li>• 化神无力或被制</li>
                <li>• 合化一方有强根</li>
                <li>• 被冲克或有争合</li>
                <li>• 仍以原五行论命</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
