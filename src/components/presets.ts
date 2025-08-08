
export type Preset = { platform: string; type: string; width: number; height: number; category?: string }
export const presets: Preset[] = [
  // 社交媒体
  { platform: "Instagram", type: "Post", width: 1080, height: 1080, category: "social" },
  { platform: "Instagram", type: "Story", width: 1080, height: 1920, category: "social" },
  { platform: "Twitter/X", type: "Banner", width: 1500, height: 500, category: "social" },
  { platform: "Facebook", type: "Cover", width: 820, height: 312, category: "social" },
  { platform: "LinkedIn", type: "Cover", width: 1584, height: 396, category: "social" },
  { platform: "YouTube", type: "Thumbnail", width: 1280, height: 720, category: "social" },
  { platform: "Pinterest", type: "Pin", width: 1000, height: 1500, category: "social" },
  { platform: "Telegram", type: "Profile", width: 512, height: 512, category: "social" },
  
  // 中国平台
  { platform: "小红书", type: "笔记封面", width: 1080, height: 1440, category: "china" },
  { platform: "B站", type: "封面", width: 1146, height: 717, category: "china" },
  { platform: "豆瓣", type: "小组封面", width: 980, height: 300, category: "china" },
  { platform: "抖音", type: "封面", width: 1080, height: 1920, category: "china" },
  { platform: "微信", type: "头像", width: 132, height: 132, category: "china" },
  { platform: "微博", type: "头像", width: 180, height: 180, category: "china" },
  
  // 电商平台
  { platform: "淘宝", type: "主图", width: 800, height: 800, category: "ecommerce" },
  { platform: "淘宝", type: "白底图", width: 800, height: 800, category: "ecommerce" },
  { platform: "京东", type: "主图", width: 800, height: 800, category: "ecommerce" },
  { platform: "拼多多", type: "主图", width: 750, height: 750, category: "ecommerce" },
  { platform: "Amazon", type: "主图", width: 1000, height: 1000, category: "ecommerce" },
  { platform: "Etsy", type: "主图", width: 1000, height: 1000, category: "ecommerce" },
  
  // 专业平台
  { platform: "Behance", type: "项目封面", width: 1200, height: 675, category: "professional" },
  { platform: "Dribbble", type: "Shot", width: 800, height: 600, category: "professional" },
  { platform: "Figma", type: "封面", width: 1200, height: 800, category: "professional" },
  
  // 头像专用
  { platform: "通用", type: "头像", width: 512, height: 512, category: "avatar" },
  { platform: "通用", type: "小头像", width: 128, height: 128, category: "avatar" },
  { platform: "通用", type: "大头像", width: 1024, height: 1024, category: "avatar" }
]

// 预设组合
export const presetCombos = {
  "电商主图": [
    { platform: "淘宝", type: "主图", width: 800, height: 800 },
    { platform: "淘宝", type: "白底图", width: 800, height: 800 },
    { platform: "通用", type: "缩略图", width: 400, height: 400 }
  ],
  "社交媒体头像": [
    { platform: "通用", type: "头像", width: 512, height: 512 },
    { platform: "通用", type: "小头像", width: 128, height: 128 },
    { platform: "通用", type: "大头像", width: 1024, height: 1024 }
  ],
  "内容创作者": [
    { platform: "YouTube", type: "Thumbnail", width: 1280, height: 720 },
    { platform: "Instagram", type: "Post", width: 1080, height: 1080 },
    { platform: "小红书", type: "笔记封面", width: 1080, height: 1440 }
  ]
}
