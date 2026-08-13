import type { SiteContent } from "@/lib/i18n/types";

export const traditionalContent = {
  metadata: {
    title: "AESIR 影響力報告｜高端 3D 體驗",
    description: "以電影感與玻璃擬態視覺呈現 AESIR 的 AI 照護、SEN 介入、長者復康及運動科技生態系統。"
  },
  languageSelector: { compact: "繁中", selectLanguage: "選擇語言", language: "語言" },
  chapters: [
    { id: "hero", label: "AESIR 影響力報告" },
    { id: "founder-story", label: "創辦人焦點" },
    { id: "social-innovation", label: "社會創新宣言" },
    { id: "features", label: "照護能力" },
    { id: "impact-metrics", label: "影響力指標" },
    { id: "ai-ecosystem", label: "AI 生態系統" },
    { id: "target-status", label: "目標群體現況" },
    { id: "product-ecosystem", label: "產品生態系統" },
    { id: "sen-support", label: "SEN 支援" },
    { id: "elderly-care", label: "長者照護及復康" },
    { id: "physical-sports", label: "體能及運動科技" },
    { id: "partner-validation", label: "合作夥伴實證" },
    { id: "roadmap", label: "路線圖" },
    { id: "cta", label: "聯絡 AESIR" }
  ],
  accessibility: { chapterNavigation: "影響力報告章節", goToChapter: "前往「{{chapter}}」" },
  hero: {
    eyebrow: "AESIR 影響力報告",
    heading: "為可量化的世界打造 AI 照護系統。",
    headingSegments: ["為", "可量化的世界", "打造", "AI", "照護系統。"],
    description: "以高端而具電影感的視角，呈現 AESIR 在SEN領域積極樂齡，復康及運動科技的生態系統。",
    descriptionSegments: ["以高端而具電影感的視角，", "呈現 AESIR 在SEN領域", "積極樂齡，復康及運動科技的生態系統。"],
    spacedSegments: false
  },
  featuresSection: {
    eyebrow: "影響力架構",
    title: "三個互相連結的層次，串連照護，學習與智能。",
    features: [
      { eyebrow: "SEN 系統", title: "自適應學習，把動作轉化為進展數據。", description: "透過可重複的介入循環，動作感應，AR 及 VR 活動支援識字、專注力、協調能力及社交適應力。", metric: "98,000+", metricLabel: "已支援 SEN 使用者" },
      { eyebrow: "積極樂齡", title: "感應器引導的復康訓練，提升社區照護安全。", description: "長者健體及防跌體驗，協助前線團隊觀察參與者的信心、平衡、反應及活動能力。", metric: "2,000+", metricLabel: "已支援長者" },
      { eyebrow: "成效分析", title: "為照護團隊，NGO 及合作夥伴而設的數據層。", description: "AESIR 將前線學習與復康活動轉化為可量化的觸及範圍，參與度及成效指標。", metric: "50,000+", metricLabel: "訓練數據點" }
    ]
  },
  impactMetricsSection: {
    eyebrow: "成效數據分析",
    title: "將前線活動轉化為可量化指標。",
    description: "AESIR 在整個照護科技生態系統中，持續追蹤觸及範圍、SEN 參與度、長者服務部署、訓練參與情況，以及可觀察的進展訊號。",
    metrics: [
      { value: "100,000+", label: "每年觸及人數", domain: "觸及" },
      { value: "98,000+", label: "已支援 SEN 使用者", domain: "SEN" },
      { value: "2,000+", label: "已支援長者", domain: "樂齡" },
      { value: "79", label: "SEN 服務 NGO 合作夥伴", domain: "網絡" },
      { value: "43", label: "長者服務 NGO 合作夥伴", domain: "網絡" },
      { value: "50,000+", label: "已收集訓練數據點", domain: "數據" },
      { value: "90%+", label: "透過遊戲化學習展現可量化進步的學生比例", domain: "進展" },
      { value: "50%+", label: "行為及社交適應力改善", domain: "行為" }
    ]
  },
  targetStatusSection: {
    eyebrow: "目標群體現況",
    title: "針對真實 SEN 與長者照護情境而設計。",
    statuses: [
      {
        title: "目標群體：SEN 學習者",
        summary: "與傳統工作紙或單向訓練相比，SEN 學習者往往需要更多重複練習，更清晰的回饋，以及更強的學習動機。",
        points: [
          { label: "學習需要", body: "透過多感官練習，支援識字、發音、專注力、執行功能、動作協調及社交適應力。" },
          { label: "實際應用情境", body: "應用於學校、NGO、學習中心及面向家庭的介入場景，這些環境尤其重視參與度與可重複練習。" },
          { label: "產品方案", body: "動作感應、AR、VR 及自適應遊戲機制提供即時回饋，同時擷取可用的訓練訊號。" }
        ]
      },
      {
        title: "目標群體：長者照護",
        summary: "安全，低衝擊並可重複進行的復康模式，能讓長者更投入動作練習，同時讓工作人員更容易觀察其表現。",
        points: [
          { label: "照護需要", body: "透過引導式活動支援平衡、反應、活動能力、信心及跌倒風險意識，同時減低對活動的恐懼。" },
          { label: "實際應用情境", body: "應用於長者服務 NGO、日間中心、社區場景及家居式照護環境，並由前線人員協助帶領。" },
          { label: "產品方案", body: "VR 與動作感應體驗把復康轉化為引導式情境，讓團隊觀察姿勢，舒適度及反應數據。" }
        ]
      }
    ]
  },
  productEcosystemSection: {
    eyebrow: "產品影響力模組",
    title: "更完整的產品技術組合，支援學習，復康與主動參與運動。",
    modules: [
      { eyebrow: "SEN-01 | 識字引擎", title: "Magic Word Adventure", description: "動作感應遊戲透過身體動作與即時視覺回饋，支援書寫、空間感知、漢字辨識及持續練習。", tags: ["識字", "動作", "回饋"], image: "/impact-photos/sen-magic-word-battle.webp", imageAlt: "兒童正在使用 Magic Word Adventure 動作感應識字遊戲" },
      { eyebrow: "SEN-02 | 動作能力層", title: "動作技能訓練", description: "互動訓練支援精細動作控制、協調、反應及手眼整合，適合需要重複而有系統練習的學生。", tags: ["精細動作", "協調", "專注力"], image: "/impact-photos/sen-motor-capability.webp", imageAlt: "兒童正在使用互動式動作技能訓練顯示系統" },
      { eyebrow: "SEN-03 | 身體識字", title: "中文身體識字遊戲", description: "動作式學習把中文語音，身體動作與記憶連結成一個主動學習體驗，支援語言習得與參與。", tags: ["語言", "動作", "記憶"], image: "/impact-photos/sen-body-literacy.png", imageAlt: "學習者正在使用動作式中文身體識字活動" },
      { eyebrow: "AGE-01 | 活動能力層", title: "長者健體遊戲", description: "動作式運動透過可重複的練習流程支援平衡、協調、活動能力及信心，可應用於中心及照護院舍。", tags: ["平衡", "活動能力", "信心"], image: "/impact-photos/elderly-fitness-session.webp", imageAlt: "長者正在參與由工作人員帶領的健體活動" },
      { eyebrow: "AGE-02 | 風險模擬", title: "防跌 VR 遊戲", description: "沉浸式平衡訓練建立更安全的練習環境，在減少高衝擊身體負荷的同時，訓練動作控制，建立信心並接觸跌倒風險情境。", tags: ["VR", "跌倒風險", "復康"], image: "/impact-photos/elderly-fall-prevention-vr-2.webp", imageAlt: "長者正在使用 VR 頭戴裝置進行防跌訓練" },
      { eyebrow: "SPORT-01 | 沉浸式訓練", title: "AR/VR 運動訓練", description: "AR，VR 及動作感應把體能訓練延伸至傳統場地以外，將反應，參與度及教練回饋轉化為可量化的活動數據。", tags: ["AR", "VR", "運動數據"], image: "/impact-photos/sports-vr-training.jpg", imageAlt: "參與者正在使用 VR 進行運動訓練" }
    ]
  },
  founderStory: {
    eyebrow: "創辦人焦點",
    title: "科技從前線出發，才真正產生意義。",
    founders: ["Ernest Chan", "Zero Wong"],
    summary: "AESIR 的創辦人選擇以社會影響力為方向，而非走傳統企業道路。十多年來，他們一直與特殊教育及長者照護社群並肩合作，深入理解塑造日常照護的制度，流程與障礙。",
    promise: "AESIR 的承諾：將臨床嚴謹性轉化為人人可及的自主與賦能。",
    image: "/impact-photos/founder-ai-launch.jpeg",
    imageAlt: "AI 科技發布活動的團體合照",
    imageOverlay: "從零開始，為學習，復康與照護的真實需要而打造。",
    principles: [
      { title: "關鍵是研究", body: "每個互動平台都被設計成可量化的介入方案，以心理學及臨床驗證為基礎，而不只是娛樂體驗。" },
      { title: "良知驅動的創新", body: "AESIR 將科技進步重新投入可及工具及系統層面的支援，服務資源較少的社群。" }
    ]
  },
  socialInnovation: {
    eyebrow: "社會創新架構",
    title: "科學與遊戲的融合。",
    statement: "我們不是為娛樂而製作遊戲。我們打造經臨床驗證的沉浸式生態系統，把重複的治療訓練轉化為可見的認知與動作里程碑。",
    frictionLabel: "現實阻力",
    challenge: "傳統復康與特殊教育課程往往重複，難以持續，也不易個人化。這些阻力可能降低信心，參與度，以及照護的持續性。",
    responseLabel: "我們的回應",
    response: "AESIR 將實證為本的認知行為原則，感覺與動作整合，以及神經可塑性融入遊戲化環境，形成更安全而具吸引力的練習循環，鼓勵人們在遊戲中學習，成長與復康。",
    fieldPracticeLabel: "前線實踐",
    images: [
      { src: "/impact-photos/social-elderly-vr-outreach.jpeg", alt: "長者正在參與 VR 社區外展活動" },
      { src: "/impact-photos/social-ar-game.webp", alt: "參與者正在體驗 AR 遊戲" }
    ]
  },
  aiEcosystem: {
    eyebrow: "AI代理生態系統",
    title: "從靜態軟件，進化成可自適應的數碼協作治療夥伴。",
    description: "每次訓練都連結評估，環境調整與可執行回饋，讓專業人員在不中斷體驗的情況下，作出更有依據的照護決策。",
    feedbackLoop: ["實時評估", "動態環境調整", "持續數據驅動回饋"],
    capabilityLabel: "能力",
    capabilities: [
      { title: "自適應難度", body: "實時校準會按每位學習者的能力調整挑戰門檻，讓訓練保持可達成而且有意義。" },
      { title: "多模態分析", body: "電腦視覺在同一訓練時刻擷取關節角度，動作技能及情境性動作訊號。" },
      { title: "自動化分析", body: "原始活動訊號轉化成視覺化進度報告，協助教育及臨床專業人員理解每次訓練。" },
      { title: "預測智能", body: "長期累積的認知與動作模式，讓團隊更早掌握發展里程碑及照護需要的變化。" }
    ],
    foundationLabel: "運作基礎",
    foundations: ["經臨床驗證的認知與動作框架", "自家研發的電腦視覺與 AI 智能體模型基礎設施", "NGO，學校與臨床數據整合"]
  },
  productAtlas: {
    careConditionLabel: "照護情境",
    responseLabel: "AESIR 方案",
    fieldDeploymentLabel: "前線部署",
    categoryImages: [
      { src: "/impact-photos/category-sen-ar-book.jpg", alt: "學習者正在使用 AR 圖書體驗" },
      { src: "/impact-photos/category-elderly-new-life-vr.webp", alt: "長者正在使用 New Life VR 平台" },
      { src: "/impact-photos/category-sports-vr-fencing.jpeg", alt: "VR 劍擊科技示範" }
    ],
    categories: [
      {
        label: "類別 01", title: "SEN 支援",
        challenge: "有自閉症、ADHD、讀寫障礙、發展協調差異及執行功能需要的學生，可能需要在動作、語言、專注力與社交參與方面獲得個人化且可重複的練習。",
        response: "多感官遊戲與輔助科技把結構化訓練轉化為容易參與，可重複並提供即時回饋的練習循環。",
        products: [
          { name: "Magic Word Adventure", description: "一套桌面動作感應系統，把無線滑鼠化身為魔法棒，用於漢字書寫，部首辨識及空間感知訓練。", outcomes: ["書寫練習", "漢字辨識", "空間感知"] },
          { name: "動作技能訓練玩具", description: "Light Spot、Neuro Pulse 及 Cognigrid 把實體遊戲與記憶、感覺調節、空間推理及精細手指操作結合。", outcomes: ["認知與動作整合", "感覺調節", "精細動作控制"] },
          { name: "FingerFarm and Monkey and Banana", description: "流動應用程式支援手指獨立控制、手部力量、抓握，以及觸控屏幕上的捏合與拖曳練習。", outcomes: ["手指力量", "抓握", "手部訓練"] },
          { name: "中文身體識字遊戲", description: "以動作為基礎的識字體驗，把身體動作，視覺提示與聽覺回饋連結到中文漢字學習。", outcomes: ["動覺學習", "記憶與回想", "全身參與"] },
          { name: "New Life VR 與 Eye-Learning 平台", description: "沉浸式及眼動追蹤工具支援情緒調節、認知靈活性、視覺專注、反應抑制及客觀進度報告。", outcomes: ["安全練習", "持續專注", "教師報告"] },
          { name: "Little Rice Growth Story", description: "以敘事帶動的流動應用程式，透過持續的遊戲化評估支援九項核心執行功能。", outcomes: ["執行功能", "個人化歷程", "家庭支援"] }
        ]
      },
      {
        label: "類別 02", title: "長者照護及復康",
        challenge: "長者可能面對肌肉流失、平衡能力下降、跌倒風險、信心降低，以及難以持續傳統物理治療訓練等問題。",
        response: "動作感應與 VR 體驗建立安全而可重複的復康活動，讓動作表現更清晰，更具參與感，也更方便照護團隊引導。",
        products: [
          { name: "長者健體遊戲", description: "透過 Kinect 動作感應遊戲進行踏步，伸展及坐站訓練，適合在有支援的社區及照護環境中使用。", outcomes: ["平衡與協調", "肌肉力量", "練習動機"] },
          { name: "防跌 VR 遊戲", description: "沉浸式虛擬訓練計劃在受控環境中訓練平衡、活動能力、空間感知及自信動作。", outcomes: ["跌倒風險意識", "本體感覺", "減低焦慮"] }
        ]
      },
      {
        label: "類別 03", title: "體能及運動科技",
        challenge: "不少兒童及年輕人需要更容易投入的方法來建立持續運動習慣，尤其當傳統運動令人感到壓力或難以參與時。",
        response: "AR，VR 及動作感應運動把體能活動與遊戲結構，教練訊號及具吸引力的進度體驗結合。",
        products: [
          { name: "足球遊戲", description: "互動 AR 及動作感應足球遊戲，包括射門、跑動、十二碼、前鋒及守門員挑戰。", outcomes: ["心肺體能", "反應時間", "認知靈活性"] },
          { name: "跆拳道遊戲", description: "三款動作感應體驗透過全身踢擊及出拳，教授基本武術技巧。", outcomes: ["大肌肉動作技能", "力量與敏捷度", "專注力"] },
          { name: "VR 運動", description: "沉浸式運動包括羽毛球、匹克球、網球、高爾夫球及劍擊，支援全身活動與技能發展。", outcomes: ["手眼協調", "策略思考", "安全練習"] }
        ]
      }
    ]
  },
  partnerValidation: {
    eyebrow: "前線實證",
    title: "一個旨在擴大公共價值的社會企業模式。",
    body: "AESIR 的模式由大學、研究專業人員、前線 NGO、學校、復康中心及長者照護機構共同建立。其影響力透過觸及範圍，可重複練習，以及每次部署中協作的質素來衡量。",
    imageAlt: "AESIR 團隊正在為長者服務參與者帶領活動",
    imageOverlay: "照護科技只有在能夠強化每位參與者身邊的人與機構時，才真正有效。",
    proofs: [
      { value: "2014", label: "於香港成立" },
      { value: "500,000+", label: "累計服務人數" },
      { value: "122", label: "涵蓋 SEN 及長者照護的 NGO 合作夥伴" }
    ],
    network: ["大學及研究合作", "特殊學校及學習中心", "NGO 復康服務", "長者照護機構及前線團隊"]
  },
  roadmap: {
    eyebrow: "2026 路線圖",
    title: "打造更具預防性，更可及的影響力系統。",
    description: "下一階段將不再只衡量一次完成的訓練，而是進一步提供更早期的洞察，並讓更多人能夠接觸科技支援的照護。",
    items: [
      { number: "01", title: "預測及預防型 AI", body: "由實時行為追蹤進一步發展，讓團隊更早掌握發展軌跡，以及認知或動作能力下降的跡象，同時減輕照護團隊的行政負擔。" },
      { number: "02", title: "全面的可及性", body: "透過學校、復康中心、NGO 及國際研究合作夥伴，進一步擴展臨床驗證及共融科技的可及性。" }
    ],
    directionLabel: "發展方向",
    direction: "衡量真正重要的事。預見下一步。讓科技持續服務它原本要服務的社群。"
  },
  cta: {
    eyebrow: "下一階段系統形態",
    title: "由軟件產品，邁向臨床級影響力平台。",
    body: "建立一個讓每次訓練都能教學、衡量、調整，並持續改善下一次介入的生態系統。",
    primary: "探索影響力",
    secondary: "聯絡 AESIR"
  }
} satisfies SiteContent;
