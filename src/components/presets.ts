
export type Preset = { platform: string; type: string; width: number; height: number; category?: string }

export const presets: Preset[] = [
  // Most popular social media presets
  { platform: "Instagram", type: "Post", width: 1080, height: 1080, category: "social" },
  { platform: "Instagram", type: "Story", width: 1080, height: 1920, category: "social" },
  { platform: "Twitter/X", type: "Banner", width: 1500, height: 500, category: "social" },
  { platform: "Facebook", type: "Cover", width: 820, height: 312, category: "social" },
  { platform: "LinkedIn", type: "Cover", width: 1584, height: 396, category: "social" },
  { platform: "YouTube", type: "Thumbnail", width: 1280, height: 720, category: "social" },
  { platform: "Universal", type: "Avatar", width: 512, height: 512, category: "avatar" },
  { platform: "Universal", type: "Square", width: 1000, height: 1000, category: "general" }
]
