// 古籍经典数据

// 经典古籍文本数据
export const classicTexts = {
    三命通会: {
      name: "三命通会",
      author: "万民英",
      description: "明代命理学集大成之作",
      chapters: ["论五行", "论十神", "论格局", "论大运"],
    },
    滴天髓: {
      name: "滴天髓",
      author: "京图",
      description: "命理学经典，格局精髓",
      chapters: ["天道", "地道", "人道", "知命"],
    },
    穷通宝鉴: {
      name: "穷通宝鉴",
      author: "余春台",
      description: "调候用神专著",
      chapters: ["春月", "夏月", "秋月", "冬月"],
    },
    子平真诠: {
      name: "子平真诠",
      author: "沈孝瞻",
      description: "子平命理正宗理论",
      chapters: ["论十神", "论格局", "论用神", "论行运"],
    },
    五行精纪: {
      name: "五行精纪",
      author: "廖中",
      description: "五行理论专著",
      chapters: ["五行生克", "干支配合", "纳音论命"],
    },
  };
  
  // 术语映射数据
  export const termMappings = {
    伤官见官: {
      modern: "十神冲克结构破格",
      explanation: "伤官与官星同现，主是非、官灾",
      modernExplanation: "伤官克制正官，破坏格局清纯，容易引起权威冲突和法律纠纷",
      category: "十神类",
      relatedTerms: ["伤官配印", "官杀混杂", "食神制杀"],
      sources: [
        {
          book: "滴天髓",
          quote: "伤官见官，为祸百端",
        },
      ],
      examples: [
        {
          bazi: "壬子 庚午 辛酉 乙卯",
          analysis:
            "辛金日主，庚为伤官，乙为正官透出，伤官见官，虽身强但易有官司是非",
        },
      ],
    },
    财多身弱: {
      modern: "日主不敌财星，需印助或从财",
      explanation: "身弱而财旺，主破耗",
      modernExplanation:
        "日主力量不足以驾驭财星，容易因财致祸，需要印绶生身或从财格",
      category: "格局类",
      relatedTerms: ["身强财旺", "从财格", "印绶护身"],
      sources: [
        {
          book: "三命通会",
          quote: "财多身弱，富屋贫人",
        },
      ],
      examples: [
        {
          bazi: "甲子 丙子 戊午 癸亥",
          analysis: "戊土日主，水旺财多，身弱不胜财，易因财生灾，需要火土帮身",
        },
      ],
    },
    枭印夺食: {
      modern: "偏印制食神，需食神制印",
      explanation: "偏印克食神",
      modernExplanation:
        "偏印克制食神，影响才华发挥和子女运，需要食神有力或财星制印",
      category: "十神类",
      relatedTerms: ["食神制杀", "印绶生身", "偏印格"],
      sources: [
        {
          book: "子平真诠",
          quote: "枭神夺食，子息艰难",
        },
      ],
      examples: [
        {
          bazi: "甲寅 丙寅 戊午 壬子",
          analysis: "戊土日主，壬水偏印克制丙火食神，影响才华发挥，子女缘薄",
        },
      ],
    },
    柱中见鬼: {
      modern: "七杀透干",
      explanation: "八字中见七杀",
      modernExplanation: "命局中七杀透出天干，需要制化得当，否则易有压力和小人",
      category: "十神类",
      relatedTerms: ["七杀格", "食神制杀", "印绶化杀"],
      sources: [
        {
          book: "三命通会",
          quote: "柱中见鬼，须要制伏",
        },
      ],
      examples: [
        {
          bazi: "乙酉 戊子 己巳 庚午",
          analysis: "己土日主，乙木七杀透出，需要庚金食神制杀或火土印绶化杀",
        },
      ],
    },
    三刑相见: {
      modern: "地支三刑，主是非病灾",
      explanation: "丑未戌、寅巳申、子卯自刑结构",
      modernExplanation: "地支形成三刑格局，容易有法律纠纷、意外伤害和人际冲突",
      category: "神煞类",
      relatedTerms: ["六冲", "六害", "三合"],
      sources: [
        {
          book: "五行精纪",
          quote: "三刑相见，必主刑伤",
        },
      ],
      examples: [
        {
          bazi: "甲寅 丁巳 庚申 戊子",
          analysis: "寅巳申三刑，容易有意外伤害和法律纠纷，需要谨慎行事",
        },
      ],
    },
    身强财旺: {
      modern: "日主有力能胜财，富贵可期",
      explanation: "身强能胜财，主富贵",
      modernExplanation: "日主力量强旺，能够驾驭财星，是富贵的基本条件之一",
      category: "格局类",
      relatedTerms: ["财多身弱", "正财格", "偏财格"],
      sources: [
        {
          book: "滴天髓",
          quote: "财旺生官，富贵双全",
        },
      ],
      examples: [
        {
          bazi: "庚申 戊子 甲寅 乙亥",
          analysis: "甲木日主得寅亥生助，身强能胜戊土财星，主富贵",
        },
      ],
    },
  };
  
  // 搜索古籍文本
  export const searchClassicTexts = (
    keyword: string,
    bookFilter: string = "all"
  ) => {
    const results = [];
  
    // 模拟搜索结果
    const searchData = [
      {
        book: "滴天髓",
        chapter: "论格局",
        originalText: "伤官见官，为祸百端。",
        modernExplanation:
          "八字中如果伤官透干，且官星也透出，无印星化解或食神调和，会导致权威冲突、易惹官司、性格刚烈易犯上。",
        modernTerms: ["十神冲克", "破格", "官司是非"],
        structureAnalysis:
          "此格为伤官克官，若日主强则可担，弱则反受害，构成伤官见官之破格。",
        example: {
          bazi: "壬子 庚午 辛酉 乙卯",
          analysis:
            "辛金日主，庚为伤官，乙为正官透出，庚乙并见，伤官见官，虽身强，但伤官旺盛克官，为破格。需大运调候。",
        },
        relatedTerms: ["伤官配印", "官杀混杂", "食神制杀"],
      },
      {
        book: "三命通会",
        chapter: "论十神",
        originalText: "若身轻，官杀混杂，而又逢伤官露出，则必主口舌是非。",
        modernExplanation:
          "如果日主身弱，命局中官星和七杀同时出现，再加上伤官透出，必然会有口舌是非和法律纠纷。",
        modernTerms: ["身弱", "官杀混杂", "伤官透干", "口舌是非"],
        structureAnalysis:
          "身弱不能胜官杀，官杀混杂本已不清，再见伤官克官，必然是非不断。",
        example: {
          bazi: "癸亥 甲子 乙卯 丁巳",
          analysis:
            "乙木日主身弱，癸水正官，甲木七杀，丁火伤官，官杀混杂又见伤官，主口舌是非。",
        },
        relatedTerms: ["身弱", "官杀混杂", "伤官见官"],
      },
      {
        book: "子平真诠",
        chapter: "论伤官",
        originalText: "伤官者，吐秀之神也，最怕官星同透。",
        modernExplanation:
          "伤官代表才华的展现，是吐露秀气的十神，但最怕与官星同时透出天干。",
        modernTerms: ["伤官", "吐秀", "才华展现", "官星"],
        structureAnalysis:
          "伤官主才华聪明，但与官星相克，同透则破格，需要印星化解。",
        example: {
          bazi: "甲午 丙寅 甲子 丙寅",
          analysis:
            "甲木日主，丙火伤官透出，若再见辛金正官，则伤官见官，需要印星化解。",
        },
        relatedTerms: ["伤官配印", "才华", "破格"],
      },
      {
        book: "三命通会",
        chapter: "卷一·论五行生成",
        originalText:
          "天高寥廓，六气回旋以成四时；地厚幽深，五行化生以成万物。……明大衍之数，由是以立，则万物岂能逃其数哉？",
        modernExplanation:
          "本章阐述五行生成的自然规律，天地未分，万物未成之初，先见于水，五行依次生成，数理配合阴阳，万物皆不离其数。强调五行与阴阳、数理的内在联系。",
        modernTerms: ["五行生成", "阴阳配数", "大衍之数"],
        structureAnalysis:
          "五行生成顺序：水（1）→火（2）→木（3）→金（4）→土（5），各配阴阳奇偶之数，土居中央，五行循环不息。",
        example: {
          bazi: "——",
          analysis: "理解五行生成顺序与数理配合，是八字命理分析的基础。",
        },
        relatedTerms: ["五行", "阴阳", "数理"],
      },
      {
        book: "三命通会",
        chapter: "卷一·论五行生克",
        originalText:
          "五行相生相克，其理昭然。……顺则相生，逆则相克，如是则各各为用，以成其道而已。",
        modernExplanation:
          "本章系统论述五行相生相克的原理，五行在天为气，在地为形，形气相感，化生万物。强调五行生克的顺逆、母子关系及其在命理中的应用。",
        modernTerms: ["五行相生", "五行相克", "母子关系"],
        structureAnalysis:
          "五行相生：水→木→火→土→金→水；五行相克：木克土、土克水、水克火、火克金、金克木。母子关系、窃气、复仇等命理要点。",
        example: {
          bazi: "——",
          analysis: "掌握五行生克顺序及其在八字中的表现，是判断命局吉凶的基础。",
        },
        relatedTerms: ["五行生克", "母子复仇", "窃气"],
      },
      {
        book: "三命通会",
        chapter: "卷一·论支干源流",
        originalText:
          "夫干犹木之干，强而为阳；支犹木之枝，弱而为阴。……命大尧探五行之情，占斗纲所建，于是始作甲子配五行纳音之属。",
        modernExplanation:
          "本章追溯天干地支的起源，阐述其与阴阳、三才、五行的关系，介绍干支命名、配属、与五行纳音的渊源。",
        modernTerms: ["天干地支", "三才", "五行纳音"],
        structureAnalysis:
          "天干为阳、地支为阴，源于三才分化。十天干、十二地支的命名与配属，伏羲画卦、黄帝授河图，甲子纳音体系的建立。",
        example: {
          bazi: "——",
          analysis: "理解干支与五行、三才的关系，是命理推演的基础。",
        },
        relatedTerms: ["天干", "地支", "纳音"],
      },
      {
        book: "三命通会",
        chapter: "卷一·总论纳音",
        originalText:
          "尝观《笔谈》论六十甲子纳音，本六十律，旋相为宫，法也。……此金之数之所以难同而又有海中沙中之异。",
        modernExplanation:
          "本章阐述六十甲子纳音的起源与推演方法，纳音以律吕相生、干支配合为法，强调五行之中金为先，土为终，纳音取象有同类娶妻、隔八生子等规律。",
        modernTerms: ["六十甲子", "纳音", "律吕相生"],
        structureAnalysis:
          "纳音起于金终于土，干支配合，律吕相生，六十甲子各有五行属性与象征。",
        example: {
          bazi: "——",
          analysis: "理解纳音推演规律，有助于八字五行属性的细致分析。",
        },
        relatedTerms: ["纳音五行", "干支配合", "律吕"],
      },
      {
        book: "三命通会",
        chapter: "卷一·论纳音取象",
        originalText:
          "昔者，黄帝将甲子分轻重而配成六十，号曰花甲子……六十甲子圣人不过借其象以明其理，而五行性情、材质、形色、功用无不曲尽而造化无余蕴矣。",
        modernExplanation:
          "本章详细解释六十甲子纳音五行的取象方法，逐一说明金、木、水、火、土各自的象征意义及其在命理中的应用。强调五行取象的对待、阴阳、始终变化。",
        modernTerms: ["纳音取象", "五行性情", "阴阳对待"],
        structureAnalysis:
          "六十甲子分属五行，金木水火土各有象征。纳音取象以对待分阴阳，圆看方看，莫逃五行本性。",
        example: {
          bazi: "——",
          analysis: "掌握纳音取象，有助于理解命局五行深层含义。",
        },
        relatedTerms: ["纳音象义", "五行变化", "甲子配五行"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText:
          "甲子金，为宝物，喜金木旺地。进神喜，福星，平头，悬针，破字。",
        modernExplanation:
          "甲子纳音属金，为宝物之象，命局中金木旺地最为有利。遇进神、福星等吉神则吉，遇平头、悬针、破字等煞则需警惕。",
        modernTerms: ["甲子金", "纳音吉凶", "进神", "福星", "煞神"],
        structureAnalysis: "甲子金象征珍贵，适合金木旺地，吉神助益，煞神需防。",
        example: {
          bazi: "甲子年生，金木旺地",
          analysis: "命局甲子金，若金木得地，吉神助益，主富贵。",
        },
        relatedTerms: ["纳音金", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText: "乙丑金，为顽矿，喜火及南方日时。福星，华盖，正印。",
        modernExplanation:
          "乙丑纳音属金，为顽矿之象，命局中火及南方日时有助于其成器。遇福星、华盖、正印等吉神则吉。",
        modernTerms: ["乙丑金", "顽矿", "火炼成器", "吉神"],
        structureAnalysis: "乙丑金需火炼方成器，南方日时有助，吉神助益。",
        example: {
          bazi: "乙丑年生，火旺南方时",
          analysis: "命局乙丑金，得火炼，吉神助，主成器有用。",
        },
        relatedTerms: ["纳音金", "火炼", "吉神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText: "丙寅火，为炉炭，喜冬及木。福星，禄刑，平头，聋哑。",
        modernExplanation:
          "丙寅纳音属火，为炉炭之象，命局中冬季及木有助于其生旺。遇福星、禄刑等吉神则吉，遇平头、聋哑等煞则需注意。",
        modernTerms: ["丙寅火", "炉炭", "冬木生旺", "吉神煞神"],
        structureAnalysis: "丙寅火如炉炭，冬季及木助其旺，吉神助益，煞神需防。",
        example: {
          bazi: "丙寅年生，冬季木旺",
          analysis: "命局丙寅火，冬木助旺，吉神助益，主温和有用。",
        },
        relatedTerms: ["纳音火", "炉炭", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText: "丁卯火，为炉烟，喜巽地及秋冬。平头，截路，悬针。",
        modernExplanation:
          "丁卯纳音属火，为炉烟之象，命局中巽地（东南）及秋冬有助于其生旺。遇平头、截路、悬针等煞则需注意。",
        modernTerms: ["丁卯火", "炉烟", "巽地秋冬", "煞神"],
        structureAnalysis: "丁卯火如炉烟，巽地秋冬助旺，煞神需防。",
        example: {
          bazi: "丁卯年生，秋冬巽地",
          analysis: "命局丁卯火，秋冬巽地助旺，需防煞神影响。",
        },
        relatedTerms: ["纳音火", "炉烟", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText:
          "戊辰木，山林山野处不材之木，喜水。禄库，华盖，水马库，棒杖，伏神，平头。",
        modernExplanation:
          "戊辰纳音属木，为山林不材之木，命局中水有助于其生发。遇禄库、华盖等吉神则吉，遇棒杖、伏神、平头等煞则需注意。",
        modernTerms: ["戊辰木", "山林木", "水助生发", "吉神煞神"],
        structureAnalysis: "戊辰木如山林不材，水助生发，吉神助益，煞神需防。",
        example: {
          bazi: "戊辰年生，水旺",
          analysis: "命局戊辰木，水助生发，吉神助益，主有根基。",
        },
        relatedTerms: ["纳音木", "山林", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText: "己巳木，山头花草，喜春及秋。禄库，八吉，阙字，曲脚。",
        modernExplanation:
          "己巳纳音属木，为山头花草之象，命局中春季及秋季有助于其生长。遇禄库、八吉等吉神则吉，遇阙字、曲脚等煞则需注意。",
        modernTerms: ["己巳木", "山头花草", "春秋生旺", "吉神煞神"],
        structureAnalysis: "己巳木如山头花草，春秋助旺，吉神助益，煞神需防。",
        example: {
          bazi: "己巳年生，春秋旺地",
          analysis: "命局己巳木，春秋助旺，吉神助益，主秀美。",
        },
        relatedTerms: ["纳音木", "花草", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText:
          "庚午土，路旁干土，喜水及春。福星，官贵，截路，棒杖，悬针。",
        modernExplanation:
          "庚午纳音属土，为路旁干土之象，命局中水及春季有助于其润泽。遇福星、官贵等吉神则吉，遇截路、棒杖、悬针等煞则需注意。",
        modernTerms: ["庚午土", "路旁土", "水润春生", "吉神煞神"],
        structureAnalysis: "庚午土如路旁干土，水润春生，吉神助益，煞神需防。",
        example: {
          bazi: "庚午年生，春季水旺",
          analysis: "命局庚午土，春水润泽，吉神助益，主稳重。",
        },
        relatedTerms: ["纳音土", "路旁", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText: "辛未土，含万宝，待秋成，喜秋及火。华盖，悬针，破字。",
        modernExplanation:
          "辛未纳音属土，含万宝之象，待秋季及火助成器。遇华盖等吉神则吉，遇悬针、破字等煞则需注意。",
        modernTerms: ["辛未土", "含万宝", "秋火成器", "吉神煞神"],
        structureAnalysis: "辛未土含万宝，秋火助成，吉神助益，煞神需防。",
        example: {
          bazi: "辛未年生，秋季火旺",
          analysis: "命局辛未土，秋火助成，吉神助益，主富藏。",
        },
        relatedTerms: ["纳音土", "万宝", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText:
          "壬申金，戈戟，大喜子午卯酉。平头，大败，妨害，聋哑，破字，悬针。",
        modernExplanation:
          "壬申纳音属金，为戈戟之象，命局中子午卯酉时最为有利。遇平头、大败、妨害、聋哑、破字、悬针等煞则需警惕。",
        modernTerms: ["壬申金", "戈戟", "子午卯酉", "煞神"],
        structureAnalysis: "壬申金如戈戟，子午卯酉助旺，煞神需防。",
        example: {
          bazi: "壬申年生，子午卯酉旺地",
          analysis: "命局壬申金，得四正之地，主刚毅果断，煞神需防。",
        },
        relatedTerms: ["纳音金", "戈戟", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText: "癸酉金，金之椎凿，喜木及寅卯。伏神，破字，聋哑。",
        modernExplanation:
          "癸酉纳音属金，为椎凿之象，命局中木及寅卯有助于其成器。遇伏神、破字、聋哑等煞则需注意。",
        modernTerms: ["癸酉金", "椎凿", "木助成器", "煞神"],
        structureAnalysis: "癸酉金如椎凿，木寅卯助成，煞神需防。",
        example: {
          bazi: "癸酉年生，寅卯木旺",
          analysis: "命局癸酉金，寅卯木助成，主技艺精湛，煞神需防。",
        },
        relatedTerms: ["纳音金", "椎凿", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText:
          "甲戌火，火所宿处，喜春及夏。正印，华盖，平头，悬针，破字，棒杖。",
        modernExplanation:
          "甲戌纳音属火，为火所宿处之象，命局中春夏有助于其生旺。遇正印、华盖等吉神则吉，遇平头、悬针、破字、棒杖等煞则需注意。",
        modernTerms: ["甲戌火", "火宿处", "春夏生旺", "吉神煞神"],
        structureAnalysis: "甲戌火如火宿处，春夏助旺，吉神助益，煞神需防。",
        example: {
          bazi: "甲戌年生，春夏旺地",
          analysis: "命局甲戌火，春夏助旺，吉神助益，主光明正大。",
        },
        relatedTerms: ["纳音火", "火宿", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText: "乙亥火，火之热气，喜土及夏。天德，曲脚。",
        modernExplanation:
          "乙亥纳音属火，为火之热气之象，命局中土及夏季有助于其生旺。遇天德等吉神则吉，遇曲脚等煞则需注意。",
        modernTerms: ["乙亥火", "热气", "土夏生旺", "吉神煞神"],
        structureAnalysis: "乙亥火如热气，土夏助旺，吉神助益，煞神需防。",
        example: {
          bazi: "乙亥年生，夏季土旺",
          analysis: "命局乙亥火，夏土助旺，吉神助益，主热情洋溢。",
        },
        relatedTerms: ["纳音火", "热气", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText:
          "丙子水，江湖，喜木及土。福星，官贵，平头，聋哑，交神，飞刃。",
        modernExplanation:
          "丙子纳音属水，为江湖之象，命局中木及土有助于其流通。遇福星、官贵等吉神则吉，遇平头、聋哑、交神、飞刃等煞则需注意。",
        modernTerms: ["丙子水", "江湖", "木土流通", "吉神煞神"],
        structureAnalysis: "丙子水如江湖，木土助流通，吉神助益，煞神需防。",
        example: {
          bazi: "丙子年生，木土旺地",
          analysis: "命局丙子水，木土助流通，吉神助益，主灵活多变。",
        },
        relatedTerms: ["纳音水", "江湖", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText:
          "丁丑水，水之不流清澈处，喜金及夏。华盖，进神，平头，飞刃，阙字。",
        modernExplanation:
          "丁丑纳音属水，为不流清澈之水，命局中金及夏季有助于其清澈。遇华盖、进神等吉神则吉，遇平头、飞刃、阙字等煞则需注意。",
        modernTerms: ["丁丑水", "不流清水", "金夏清澈", "吉神煞神"],
        structureAnalysis: "丁丑水如不流清水，金夏助清澈，吉神助益，煞神需防。",
        example: {
          bazi: "丁丑年生，夏季金旺",
          analysis: "命局丁丑水，夏金助清，吉神助益，主清澈明净。",
        },
        relatedTerms: ["纳音水", "清水", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText: "戊寅土，堤阜城郭，喜木及火。伏神，俸杖。聋哑。",
        modernExplanation:
          "戊寅纳音属土，为堤阜城郭之象，命局中木及火有助于其稳固。遇伏神、俸杖等吉神则吉，遇聋哑等煞则需注意。",
        modernTerms: ["戊寅土", "堤阜城郭", "木火助稳", "吉神煞神"],
        structureAnalysis: "戊寅土如堤阜城郭，木火助稳，吉神助益，煞神需防。",
        example: {
          bazi: "戊寅年生，木火旺地",
          analysis: "命局戊寅土，木火助稳，吉神助益，主根基牢固。",
        },
        relatedTerms: ["纳音土", "堤阜", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText:
          "己卯土，破堤败城，喜申酉及火。进神，短夭，九丑，阙字，曲脚，悬针。",
        modernExplanation:
          "己卯纳音属土，为破堤败城之象，命局中申酉及火有助于其补救。遇进神等吉神则吉，遇短夭、九丑、阙字、曲脚、悬针等煞则需注意。",
        modernTerms: ["己卯土", "破堤败城", "申酉火补", "吉神煞神"],
        structureAnalysis: "己卯土如破堤败城，申酉火补救，吉神助益，煞神需防。",
        example: {
          bazi: "己卯年生，申酉火旺",
          analysis: "命局己卯土，申酉火补救，吉神助益，主有转机。",
        },
        relatedTerms: ["纳音土", "破堤", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText: "庚辰金，锡蜡，喜秋及微木。华盖，大败，棒杖，平头。",
        modernExplanation:
          "庚辰纳音属金，为锡蜡之象，命局中秋季及微木有助于其成器。遇华盖等吉神则吉，遇大败、棒杖、平头等煞则需注意。",
        modernTerms: ["庚辰金", "锡蜡", "秋微木成器", "吉神煞神"],
        structureAnalysis: "庚辰金如锡蜡，秋微木助成，吉神助益，煞神需防。",
        example: {
          bazi: "庚辰年生，秋季微木",
          analysis: "命局庚辰金，秋微木助成，吉神助益，主柔中带刚。",
        },
        relatedTerms: ["纳音金", "锡蜡", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText:
          "辛巳金，金之幽者，杂沙石，喜火及秋。天德，福星，官贵，截路，大败，悬针，曲脚。",
        modernExplanation:
          "辛巳纳音属金，为杂沙石之象，命局中火及秋季有助于其纯净。遇天德、福星、官贵等吉神则吉，遇截路、大败、悬针、曲脚等煞则需注意。",
        modernTerms: ["辛巳金", "杂沙石", "火秋纯净", "吉神煞神"],
        structureAnalysis: "辛巳金如杂沙石，火秋助纯净，吉神助益，煞神需防。",
        example: {
          bazi: "辛巳年生，秋季火旺",
          analysis: "命局辛巳金，秋火助纯，吉神助益，主精纯有用。",
        },
        relatedTerms: ["纳音金", "杂沙石", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText:
          "壬午木，杨柳干节，喜春夏。官贵，九丑，飞刃、平头、聋哑，悬针。",
        modernExplanation:
          "壬午纳音属木，为杨柳干节之象，命局中春夏有助于其生发。遇官贵等吉神则吉，遇九丑、飞刃、平头、聋哑、悬针等煞则需注意。",
        modernTerms: ["壬午木", "杨柳干节", "春夏生发", "吉神煞神"],
        structureAnalysis: "壬午木如杨柳干节，春夏助生发，吉神助益，煞神需防。",
        example: {
          bazi: "壬午年生，春夏旺地",
          analysis: "命局壬午木，春夏助生发，吉神助益，主柔韧有为。",
        },
        relatedTerms: ["纳音木", "杨柳", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText:
          "癸未木，杨柳根，喜冬及水，亦宜春。正印，华盖，短夭，伏神，飞刃，破字。",
        modernExplanation:
          "癸未纳音属木，为杨柳根之象，命局中冬季及水有助于其生长，春季亦宜。遇正印、华盖等吉神则吉，遇短夭、伏神、飞刃、破字等煞则需注意。",
        modernTerms: ["癸未木", "杨柳根", "冬水春生", "吉神煞神"],
        structureAnalysis: "癸未木如杨柳根，冬水春助生，吉神助益，煞神需防。",
        example: {
          bazi: "癸未年生，冬水春旺",
          analysis: "命局癸未木，冬水春助生，吉神助益，主根深叶茂。",
        },
        relatedTerms: ["纳音木", "杨柳根", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText:
          "庚申木，榴花，喜夏，不宜秋冬。建禄马，八专，杖刑，破字，悬针。",
        modernExplanation:
          "庚申纳音属木，为榴花之象，命局中夏季有助于其生发，秋冬不宜。遇建禄马、八专等吉神则吉，遇杖刑、破字、悬针等煞则需注意。",
        modernTerms: ["庚申木", "榴花", "夏生发", "吉神煞神"],
        structureAnalysis:
          "庚申木如榴花，夏助生发，秋冬不宜，吉神助益，煞神需防。",
        example: {
          bazi: "庚申年生，夏季旺地",
          analysis: "命局庚申木，夏助生发，吉神助益，主秀美有为。",
        },
        relatedTerms: ["纳音木", "榴花", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText:
          "辛酉木，榴子，喜秋及夏。建禄，交神，九丑，八专，悬针，聋哑。",
        modernExplanation:
          "辛酉纳音属木，为榴子之象，命局中秋季及夏季有助于其成熟。遇建禄、交神等吉神则吉，遇九丑、八专、悬针、聋哑等煞则需注意。",
        modernTerms: ["辛酉木", "榴子", "秋夏成熟", "吉神煞神"],
        structureAnalysis: "辛酉木如榴子，秋夏助成熟，吉神助益，煞神需防。",
        example: {
          bazi: "辛酉年生，秋夏旺地",
          analysis: "命局辛酉木，秋夏助成熟，吉神助益，主果实累累。",
        },
        relatedTerms: ["纳音木", "榴子", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText: "壬戌水，海也，喜春夏及木。华盖，退神，平头，聋哑，杖刑。",
        modernExplanation:
          "壬戌纳音属水，为大海之象，命局中春夏及木有助于其流通。遇华盖、退神等吉神则吉，遇平头、聋哑、杖刑等煞则需注意。",
        modernTerms: ["壬戌水", "大海", "春夏木助", "吉神煞神"],
        structureAnalysis: "壬戌水如大海，春夏木助流通，吉神助益，煞神需防。",
        example: {
          bazi: "壬戌年生，春夏木旺",
          analysis: "命局壬戌水，春夏木助流通，吉神助益，主气势磅礴。",
        },
        relatedTerms: ["纳音水", "大海", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText: "癸亥水，百川，喜金土火。伏马，大败，破字。截路。",
        modernExplanation:
          "癸亥纳音属水，为百川之象，命局中金土火有助于其汇聚。遇伏马等吉神则吉，遇大败、破字、截路等煞则需注意。",
        modernTerms: ["癸亥水", "百川", "金土火汇聚", "吉神煞神"],
        structureAnalysis: "癸亥水如百川，金土火助汇聚，吉神助益，煞神需防。",
        example: {
          bazi: "癸亥年生，金土火旺",
          analysis: "命局癸亥水，金土火助汇聚，吉神助益，主包容万物。",
        },
        relatedTerms: ["纳音水", "百川", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText:
          "甲午金，百炼精金，喜水木土。进神，德合，平头，破字，悬针。",
        modernExplanation:
          "甲午纳音属金，为百炼精金之象，命局中水木土有助于其成器。遇进神、德合等吉神则吉，遇平头、破字、悬针等煞则需注意。",
        modernTerms: ["甲午金", "百炼精金", "水木土成器", "吉神煞神"],
        structureAnalysis: "甲午金如百炼精金，水木土助成器，吉神助益，煞神需防。",
        example: {
          bazi: "甲午年生，水木土旺",
          analysis: "命局甲午金，水木土助成器，吉神助益，主坚韧不拔。",
        },
        relatedTerms: ["纳音金", "百炼金", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText: "乙未金，炉炭余金，喜大火及土。华盖，截路，曲脚，破字。",
        modernExplanation:
          "乙未纳音属金，为炉炭余金之象，命局中大火及土有助于其成器。遇华盖等吉神则吉，遇截路、曲脚、破字等煞则需注意。",
        modernTerms: ["乙未金", "炉炭余金", "大火土成器", "吉神煞神"],
        structureAnalysis: "乙未金如炉炭余金，大火土助成器，吉神助益，煞神需防。",
        example: {
          bazi: "乙未年生，大火土旺",
          analysis: "命局乙未金，大火土助成器，吉神助益，主坚实有用。",
        },
        relatedTerms: ["纳音金", "炉炭余金", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText:
          "丙申火，白茅野烧，喜秋冬及木。平头，聋哑，大败，破字，悬针。",
        modernExplanation:
          "丙申纳音属火，为白茅野烧之象，命局中秋冬及木有助于其生旺。遇平头、聋哑、大败、破字、悬针等煞则需注意。",
        modernTerms: ["丙申火", "白茅野烧", "秋冬木助", "煞神"],
        structureAnalysis: "丙申火如白茅野烧，秋冬木助生旺，煞神需防。",
        example: {
          bazi: "丙申年生，秋冬木旺",
          analysis: "命局丙申火，秋冬木助生旺，主刚烈有为，煞神需防。",
        },
        relatedTerms: ["纳音火", "野烧", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText:
          "丁酉火，鬼神之灵响，火无形者，喜辰戌丑未。天乙，喜神，平头，破字，聋哑，大败。",
        modernExplanation:
          "丁酉纳音属火，为鬼神之灵响、无形之火，命局中辰戌丑未有助于其显现。遇天乙、喜神等吉神则吉，遇平头、破字、聋哑、大败等煞则需注意。",
        modernTerms: ["丁酉火", "灵响", "辰戌丑未助", "吉神煞神"],
        structureAnalysis: "丁酉火如灵响，辰戌丑未助显现，吉神助益，煞神需防。",
        example: {
          bazi: "丁酉年生，辰戌丑未旺地",
          analysis: "命局丁酉火，辰戌丑未助显现，吉神助益，主灵动有神。",
        },
        relatedTerms: ["纳音火", "灵响", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText:
          "戊戌木，蒿艾之枯者，喜火及春夏。华盖，大败，八专，杖刑，截路。",
        modernExplanation:
          "戊戌纳音属木，为蒿艾枯木之象，命局中火及春夏有助于其生机。遇华盖等吉神则吉，遇大败、八专、杖刑、截路等煞则需注意。",
        modernTerms: ["戊戌木", "蒿艾枯木", "火春夏助", "吉神煞神"],
        structureAnalysis: "戊戌木如蒿艾枯木，火春夏助生机，吉神助益，煞神需防。",
        example: {
          bazi: "戊戌年生，火春夏旺",
          analysis: "命局戊戌木，火春夏助生机，吉神助益，主坚韧不拔。",
        },
        relatedTerms: ["纳音木", "枯木", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText: "己亥木，蒿艾之茅，喜水及春夏。阙字，曲脚。",
        modernExplanation:
          "己亥纳音属木，为蒿艾之茅之象，命局中水及春夏有助于其生长。遇阙字、曲脚等煞则需注意。",
        modernTerms: ["己亥木", "蒿艾茅", "水春夏助", "煞神"],
        structureAnalysis: "己亥木如蒿艾茅，水春夏助生长，煞神需防。",
        example: {
          bazi: "己亥年生，水春夏旺",
          analysis: "命局己亥木，水春夏助生长，主柔顺有生机，煞神需防。",
        },
        relatedTerms: ["纳音木", "茅草", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText: "庚子土，土中空者，屋宇也，喜木及金。木德合，杖刑。",
        modernExplanation:
          "庚子纳音属土，为土中空、屋宇之象，命局中木及金有助于其稳固。遇木德合等吉神则吉，遇杖刑等煞则需注意。",
        modernTerms: ["庚子土", "屋宇", "木金助稳", "吉神煞神"],
        structureAnalysis: "庚子土如屋宇，木金助稳固，吉神助益，煞神需防。",
        example: {
          bazi: "庚子年生，木金旺地",
          analysis: "命局庚子土，木金助稳固，吉神助益，主安稳有依。",
        },
        relatedTerms: ["纳音土", "屋宇", "吉神", "煞神"],
      },
      {
        book: "三命通会",
        chapter: "卷一·释六十甲子性质吉凶",
        originalText: "辛丑土，坟墓，喜木及火与春。华盖，悬针，阙字。",
        modernExplanation:
          "辛丑纳音属土，为坟墓之象，命局中木及火、春季有助于其生机。遇华盖等吉神则吉，遇悬针、阙字等煞则需注意。",
        modernTerms: ["辛丑土", "坟墓", "木火春助", "吉神煞神"],
        structureAnalysis: "辛丑土如坟墓，木火春助生机，吉神助益，煞神需防。",
        example: {
          bazi: "辛丑年生，木火春旺",
          analysis: "命局辛丑土，木火春助生机，吉神助益，主厚重有藏。",
        },
        relatedTerms: ["纳音土", "坟墓", "吉神", "煞神"],
      },
    ];
  
    // 根据关键词过滤
    return searchData.filter((item) => {
      const matchesKeyword =
        keyword === "" ||
        item.originalText.includes(keyword) ||
        item.modernExplanation.includes(keyword) ||
        item.modernTerms.some((term) => term.includes(keyword));
  
      const matchesBook = bookFilter === "all" || item.book === bookFilter;
  
      return matchesKeyword && matchesBook;
    });
  };
  
  // 获取术语映射
  export const getTermMapping = (ancient: string) => {
    const mapping = termMappings[ancient as keyof typeof termMappings];
    if (!mapping) return null;
  
    return {
      ancient,
      ...mapping,
    };
  };
  
  // 经典条文分析数据
  export const classicAnalyses = {
    shangguanjianguan: {
      book: "滴天髓",
      chapter: "论格局",
      title: "伤官见官",
      originalText: "伤官见官，为祸百端。",
      modernExplanation:
        "八字中如果伤官透干，且官星也透出，无印星化解或食神调和，会导致权威冲突、易惹官司、性格刚烈易犯上。",
      modernTermExplanation:
        "这是典型的十神冲克破格现象。伤官代表叛逆和创新，正官代表权威和规范，两者相克会产生激烈冲突。",
      structure: {
        bazi: "壬子 庚午 辛酉 乙卯",
        shishen: ["偏印", "伤官", "日主", "正官"],
        keyElements: ["伤官庚金透出", "正官乙木透出", "伤官克正官"],
        problems: ["格局破损", "权威冲突", "易有官司"],
      },
      examples: [
        {
          title: "伤官见官破格例",
          bazi: "壬子 庚午 辛酉 乙卯",
          analysis: "辛金日主，庚金伤官透出，乙木正官透出，伤官见官，格局破损",
          demonstration: "体现了伤官见官为祸百端的古训",
        },
        {
          title: "伤官配印化解例",
          bazi: "壬子 庚午 辛酉 己卯",
          analysis: "同样伤官见官，但有己土印星化解，可以减轻破格之害",
          demonstration: "说明伤官见官需要印星化解的道理",
        },
      ],
      learningPoints: {
        understanding: [
          "理解伤官与正官的五行生克关系",
          "掌握破格的概念和危害",
          "认识印星化解的重要作用",
        ],
        application: [
          "遇到伤官见官格局要谨慎判断",
          "寻找化解方法如印星、食神等",
          "注意大运流年的影响变化",
        ],
      },
    },
    caiduoshenjuo: {
      book: "三命通会",
      chapter: "论财格",
      title: "财多身弱",
      originalText: "财多身弱，富屋贫人。",
      modernExplanation:
        "财星过多而日主身弱，虽然有财但无力享用，反而会因财致祸，如富人家的穷亲戚。",
      modernTermExplanation:
        "这反映了命理中力量平衡的重要性。财星代表财富和欲望，日主代表自身能力，两者失衡必然出问题。",
      structure: {
        bazi: "甲子 丙子 戊午 癸亥",
        shishen: ["正财", "正财", "日主", "正财"],
        keyElements: ["财星过多", "日主身弱", "力量失衡"],
        problems: ["无力胜财", "易因财生灾", "需要帮身"],
      },
      examples: [
        {
          title: "财多身弱破财例",
          bazi: "甲子 丙子 戊午 癸亥",
          analysis: "戊土日主，水旺财多，身弱不胜财，易因财生灾",
          demonstration: "体现了财多身弱富屋贫人的道理",
        },
        {
          title: "印绶帮身化解例",
          bazi: "甲子 丙子 戊午 丁巳",
          analysis: "同样财多身弱，但有丁火印星帮身，可以化解",
          demonstration: "说明印绶生身的重要作用",
        },
      ],
      learningPoints: {
        understanding: [
          "理解身财平衡的重要性",
          "掌握富屋贫人的含义",
          "认识帮身的必要性",
        ],
        application: [
          "遇到财多身弱要寻找帮身之神",
          "可以考虑从财格的可能性",
          "注意大运对身财平衡的影响",
        ],
      },
    },
  };
  
  // 获取经典分析
  export const getClassicAnalysis = (key: string) => {
    return classicAnalyses[key as keyof typeof classicAnalyses] || null;
  };
  