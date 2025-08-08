
export type Preset = { platform: string; type: string; width: number; height: number }
export const presets: Preset[] = [
  { platform: "Instagram", type: "Post", width: 1080, height: 1080 },
  { platform: "Instagram", type: "Story", width: 1080, height: 1920 },
  { platform: "Twitter/X", type: "Banner", width: 1500, height: 500 },
  { platform: "Facebook", type: "Cover", width: 820, height: 312 },
  { platform: "LinkedIn", type: "Cover", width: 1584, height: 396 },
  { platform: "YouTube", type: "Thumbnail", width: 1280, height: 720 },
  { platform: "Pinterest", type: "Pin", width: 1000, height: 1500 },
  { platform: "Telegram", type: "Profile", width: 512, height: 512 },
  { platform: "小红书", type: "笔记封面", width: 1080, height: 1440 },
  { platform: "B站", type: "封面", width: 1146, height: 717 },
  { platform: "豆瓣", type: "小组封面", width: 980, height: 300 }
]
