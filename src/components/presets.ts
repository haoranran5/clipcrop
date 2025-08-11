
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
  
  // Chinese platforms
  { platform: "Xiaohongshu", type: "Note Cover", width: 1080, height: 1440, category: "china" },
  { platform: "Bilibili", type: "Cover", width: 1146, height: 717, category: "china" },
  { platform: "Douban", type: "Group Cover", width: 980, height: 300, category: "china" },
  { platform: "Douyin", type: "Cover", width: 1080, height: 1920, category: "china" },
  { platform: "WeChat", type: "Avatar", width: 132, height: 132, category: "china" },
  { platform: "Weibo", type: "Avatar", width: 180, height: 180, category: "china" },
  
  // E-commerce platforms
  { platform: "Taobao", type: "Main Image", width: 800, height: 800, category: "ecommerce" },
  { platform: "Taobao", type: "White Background", width: 800, height: 800, category: "ecommerce" },
  { platform: "JD", type: "Main Image", width: 800, height: 800, category: "ecommerce" },
  { platform: "Pinduoduo", type: "Main Image", width: 750, height: 750, category: "ecommerce" },
  { platform: "Amazon", type: "Main Image", width: 1000, height: 1000, category: "ecommerce" },
  { platform: "Etsy", type: "Main Image", width: 1000, height: 1000, category: "ecommerce" },
  
  // Professional platforms
  { platform: "Behance", type: "Project Cover", width: 1200, height: 675, category: "professional" },
  { platform: "Dribbble", type: "Shot", width: 800, height: 600, category: "professional" },
  { platform: "Figma", type: "Cover", width: 1200, height: 800, category: "professional" },
  
  // Avatar presets
  { platform: "Universal", type: "Avatar", width: 512, height: 512, category: "avatar" },
  { platform: "Universal", type: "Small Avatar", width: 128, height: 128, category: "avatar" },
  { platform: "Universal", type: "Large Avatar", width: 1024, height: 1024, category: "avatar" }
]

// Preset combinations
export const presetCombos = {
  "E-commerce Main Images": [
    { platform: "Taobao", type: "Main Image", width: 800, height: 800 },
    { platform: "Taobao", type: "White Background", width: 800, height: 800 },
    { platform: "Universal", type: "Thumbnail", width: 400, height: 400 }
  ],
  "Social Media Avatars": [
    { platform: "Universal", type: "Avatar", width: 512, height: 512 },
    { platform: "Universal", type: "Small Avatar", width: 128, height: 128 },
    { platform: "Universal", type: "Large Avatar", width: 1024, height: 1024 }
  ],
  "Content Creator": [
    { platform: "YouTube", type: "Thumbnail", width: 1280, height: 720 },
    { platform: "Instagram", type: "Post", width: 1080, height: 1080 },
    { platform: "Xiaohongshu", type: "Note Cover", width: 1080, height: 1440 }
  ]
}
