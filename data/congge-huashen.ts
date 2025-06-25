// 从格气机数据
export const conggeQijiData = {
  从财格: {
    name: "从财格",
    description: "日主极弱，财星极旺，顺从财势",
    qijiCharacter: "顺势而为，不可逆转",
    flowDirection: "日主 → 财星 → 官杀",
    yongshen: ["财星", "食伤", "官杀"],
    jishen: ["比劫", "印绶"],
    qijiState: "单向流出",
    color: "#f97316",
    icon: "💸",
    analysis: {
      success: "财星得令，食伤生财，官杀护财，形成完整的泄耗链条",
      failure: "比劫夺财，印绶生身，破坏从财之势",
      risk: "遇比劫印绶大运，容易破格变局",
    },
    examples: [
      {
        bazi: "戊申 甲子 乙巳 丁亥",
        analysis: "乙木无根，财星包围，食伤生财，构成从财格",
      },
    ],
  },
  从杀格: {
    name: "从杀格",
    description: "日主极弱，杀星极旺，顺从杀势",
    qijiCharacter: "威压之下，不得不从",
    flowDirection: "财星 → 杀星 → 日主",
    yongshen: ["七杀", "财星"],
    jishen: ["比劫", "印绶", "食伤"],
    qijiState: "单向压制",
    color: "#ef4444",
    icon: "🗡️",
    analysis: {
      success: "杀星得令，财星生杀，形成强大的克身之势",
      failure: "印绶化杀，食伤制杀，比劫助身，破坏从杀之势",
      risk: "遇印绶食伤大运，容易反抗杀星，危险重重",
    },
    examples: [
      {
        bazi: "庚申 戊子 甲午 丙寅",
        analysis: "甲木无根，杀星当令，财星生杀，构成从杀格",
      },
    ],
  },
  从儿格: {
    name: "从儿格",
    description: "日主极弱，食伤极旺，顺从食伤",
    qijiCharacter: "才华外泄，不可收敛",
    flowDirection: "日主 → 食伤 → 财星",
    yongshen: ["食伤", "财星"],
    jishen: ["比劫", "印绶"],
    qijiState: "单向泄秀",
    color: "#06b6d4",
    icon: "🎭",
    analysis: {
      success: "食伤得令，财星泄秀，形成完整的泄秀链条",
      failure: "印绶夺食，比劫助身，破坏从儿之势",
      risk: "遇印绶大运，容易夺食破格，影响才华发挥",
    },
    examples: [
      {
        bazi: "甲午 丙寅 戊申 癸亥",
        analysis: "戊土无根，食伤当令，财星泄秀，构成从儿格",
      },
    ],
  },
  从势格: {
    name: "从势格",
    description: "日主极弱，全局一气，顺从大势",
    qijiCharacter: "大势所趋，不可违逆",
    flowDirection: "顺应全局最旺之势",
    yongshen: ["当令之神"],
    jishen: ["逆势之神"],
    qijiState: "全局统一",
    color: "#8b5cf6",
    icon: "🌊",
    analysis: {
      success: "全局一气，势不可挡，顺之者昌",
      failure: "出现逆势之神，破坏统一格局",
      risk: "大运改变全局之势，格局容易变化",
    },
    examples: [
      {
        bazi: "丙午 丁巳 戊戌 己未",
        analysis: "全局火土一气，日主顺从火土之势",
      },
    ],
  },
}

// 化神判断数据
export const huashenJudgeData = {
  真化条件: {
    title: "真化成立条件",
    conditions: [
      {
        name: "化神有力",
        description: "化神在月令得地或天干透出",
        example: "甲己合土，见戊土透干或辰戌丑未月",
        success: true,
      },
      {
        name: "无强根",
        description: "合化双方在地支无强根",
        example: "甲己合土，甲木不见寅卯强根",
        success: true,
      },
      {
        name: "不被冲破",
        description: "合化组合不被其他干支冲克",
        example: "甲己合土，不见庚金克甲或乙木争合",
        success: true,
      },
    ],
    result: "化神成立，以化神论命",
    color: "#10b981",
  },
  假化条件: {
    title: "假化（合而不化）",
    conditions: [
      {
        name: "化神无力",
        description: "化神不得令或被克制",
        example: "甲己合土，但在亥子月水旺",
        success: false,
      },
      {
        name: "有强根",
        description: "合化一方在地支有强根",
        example: "甲己合土，但甲木坐寅或见卯",
        success: false,
      },
      {
        name: "被冲破",
        description: "有其他干支冲克合化组合",
        example: "甲己合土，但见庚金克甲",
        success: false,
      },
    ],
    result: "合而不化，仍以原五行论",
    color: "#ef4444",
  },
  判断流程: [
    {
      step: 1,
      title: "确认合化组合",
      description: "检查是否存在天干五合",
      details: ["甲己合土", "乙庚合金", "丙辛合水", "丁壬合木", "戊癸合火"],
    },
    {
      step: 2,
      title: "检查化神力量",
      description: "判断化神是否得令有力",
      details: ["月令是否为化神", "化神是否透干", "化神是否有根"],
    },
    {
      step: 3,
      title: "检查阻碍因素",
      description: "是否有因素阻止化神成立",
      details: ["合化双方是否有强根", "是否被冲克", "是否有争合"],
    },
    {
      step: 4,
      title: "得出结论",
      description: "综合判断真化还是假化",
      details: ["真化：以化神论命", "假化：以原五行论命"],
    },
  ],
}

// 典型化神案例
export const huashenCases = {
  甲己合土真化: {
    title: "甲己合土真化案例",
    bazi: "甲戌 己巳 戊午 己未",
    analysis: {
      合化组合: "年干甲木与月干己土相合",
      化神状态: "戊土透干，巳午未火土当令，化神有力",
      阻碍因素: "甲木坐戌土，无强根，不被冲克",
      结论: "真化成立，甲木化为土性",
    },
    qijiFlow: "甲木失去木性，转化为土性，增强土的力量",
    color: "#f59e0b",
    success: true,
  },
  乙庚合金假化: {
    title: "乙庚合金假化案例",
    bazi: "乙卯 庚申 丙午 己亥",
    analysis: {
      合化组合: "年干乙木与月干庚金相合",
      化神状态: "庚金坐申金，金得令有力",
      阻碍因素: "乙木坐卯木强根，木性难化",
      结论: "合而不化，乙木仍为木性",
    },
    qijiFlow: "乙木虽合庚金，但保持木性，与庚金形成金木相克",
    color: "#ef4444",
    success: false,
  },
  丙辛合水真化: {
    title: "丙辛合水真化案例",
    bazi: "丙子 辛亥 壬寅 癸卯",
    analysis: {
      合化组合: "年干丙火与月干辛金相合",
      化神状态: "壬癸水透干，亥子水当令，化神极旺",
      阻碍因素: "丙火坐子水，辛金坐亥水，均无强根",
      结论: "真化成立，丙辛均化为水性",
    },
    qijiFlow: "丙火辛金均化为水性，大大增强水的力量",
    color: "#3b82f6",
    success: true,
  },
}
