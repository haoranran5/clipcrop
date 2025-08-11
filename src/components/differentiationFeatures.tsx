import React from 'react'

// AI智能裁剪建议
interface AICropSuggestionProps {
  imageSrc: string | null
  onApplySuggestion: (crop: { x: number; y: number; width: number; height: number }) => void
}

export const AICropSuggestion: React.FC<AICropSuggestionProps> = ({
  imageSrc,
  onApplySuggestion
}) => {
  const [suggestions, setSuggestions] = React.useState<any[]>([])
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)

  const analyzeImage = async () => {
    if (!imageSrc) return
    
    setIsAnalyzing(true)
    // 模拟AI分析过程
    setTimeout(() => {
      const mockSuggestions = [
        { name: '主体居中', type: 'center', confidence: 0.95 },
        { name: '黄金比例', type: 'golden', confidence: 0.87 },
        { name: '三分法', type: 'thirds', confidence: 0.82 },
        { name: '对称构图', type: 'symmetry', confidence: 0.78 }
      ]
      setSuggestions(mockSuggestions)
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="ai-crop-suggestion">
      <div className="suggestion-header">
        <h4>🤖 AI 智能建议</h4>
        <button 
          className="analyze-btn"
          onClick={analyzeImage}
          disabled={isAnalyzing || !imageSrc}
        >
          {isAnalyzing ? '分析中...' : '分析图片'}
        </button>
      </div>
      
      {suggestions.length > 0 && (
        <div className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="suggestion-item">
              <div className="suggestion-info">
                <div className="suggestion-name">{suggestion.name}</div>
                <div className="suggestion-confidence">
                  置信度: {Math.round(suggestion.confidence * 100)}%
                </div>
              </div>
              <button 
                className="apply-btn"
                onClick={() => onApplySuggestion({ x: 0, y: 0, width: 100, height: 100 })}
              >
                应用
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// 品牌色彩提取器
interface BrandColorExtractorProps {
  imageSrc: string | null
  onColorSelect: (color: string) => void
}

export const BrandColorExtractor: React.FC<BrandColorExtractorProps> = ({
  imageSrc,
  onColorSelect
}) => {
  const [extractedColors, setExtractedColors] = React.useState<string[]>([])

  const extractColors = () => {
    if (!imageSrc) return
    
    // 模拟颜色提取
    const mockColors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ]
    setExtractedColors(mockColors)
  }

  return (
    <div className="brand-color-extractor">
      <div className="extractor-header">
        <h4>🎨 品牌色彩提取</h4>
        <button onClick={extractColors} disabled={!imageSrc}>
          提取色彩
        </button>
      </div>
      
      {extractedColors.length > 0 && (
        <div className="color-palette">
          {extractedColors.map((color, index) => (
            <div 
              key={index}
              className="color-swatch"
              style={{ backgroundColor: color }}
              onClick={() => onColorSelect(color)}
              title={color}
            >
              <span className="color-value">{color}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// 一键多平台适配
interface MultiPlatformAdapterProps {
  imageSrc: string | null
  onAdapt: (platforms: string[]) => void
}

export const MultiPlatformAdapter: React.FC<MultiPlatformAdapterProps> = ({
  imageSrc,
  onAdapt
}) => {
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>([])

  const platformGroups = [
    {
      name: '社交媒体',
      platforms: [
        { id: 'instagram', name: 'Instagram', icon: '📸' },
        { id: 'twitter', name: 'Twitter/X', icon: '🐦' },
        { id: 'facebook', name: 'Facebook', icon: '📘' },
        { id: 'linkedin', name: 'LinkedIn', icon: '💼' }
      ]
    },
    {
      name: '中国平台',
      platforms: [
        { id: 'xiaohongshu', name: '小红书', icon: '📖' },
        { id: 'bilibili', name: 'B站', icon: '📺' },
        { id: 'douyin', name: '抖音', icon: '🎵' },
        { id: 'weibo', name: '微博', icon: '📱' }
      ]
    },
    {
      name: '电商平台',
      platforms: [
        { id: 'taobao', name: '淘宝', icon: '🛒' },
        { id: 'jd', name: '京东', icon: '🛒' },
        { id: 'pdd', name: '拼多多', icon: '🛒' },
        { id: 'amazon', name: 'Amazon', icon: '📦' }
      ]
    }
  ]

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    )
  }

  const selectAll = (groupName: string) => {
    const group = platformGroups.find(g => g.name === groupName)
    if (group) {
      const platformIds = group.platforms.map(p => p.id)
      setSelectedPlatforms(prev => [...new Set([...prev, ...platformIds])])
    }
  }

  return (
    <div className="multi-platform-adapter">
      <div className="adapter-header">
        <h4>🚀 一键多平台适配</h4>
        <button 
          className="adapt-btn"
          onClick={() => onAdapt(selectedPlatforms)}
          disabled={selectedPlatforms.length === 0 || !imageSrc}
        >
          生成 {selectedPlatforms.length} 个版本
        </button>
      </div>

      <div className="platform-groups">
        {platformGroups.map(group => (
          <div key={group.name} className="platform-group">
            <div className="group-header">
              <h5>{group.name}</h5>
              <button 
                className="select-all-btn"
                onClick={() => selectAll(group.name)}
              >
                全选
              </button>
            </div>
            
            <div className="platform-list">
              {group.platforms.map(platform => (
                <label 
                  key={platform.id}
                  className={`platform-item ${selectedPlatforms.includes(platform.id) ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(platform.id)}
                    onChange={() => togglePlatform(platform.id)}
                  />
                  <span className="platform-icon">{platform.icon}</span>
                  <span className="platform-name">{platform.name}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 智能水印生成器
interface SmartWatermarkGeneratorProps {
  onWatermarkGenerated: (watermark: { text: string; style: any }) => void
}

export const SmartWatermarkGenerator: React.FC<SmartWatermarkGeneratorProps> = ({
  onWatermarkGenerated
}) => {
  const [watermarkText, setWatermarkText] = React.useState('')
  const [selectedStyle, setSelectedStyle] = React.useState('minimal')

  const watermarkStyles = [
    { id: 'minimal', name: '简约', preview: '简约水印' },
    { id: 'elegant', name: '优雅', preview: '优雅水印' },
    { id: 'bold', name: '粗体', preview: '粗体水印' },
    { id: 'gradient', name: '渐变', preview: '渐变水印' },
    { id: 'outline', name: '描边', preview: '描边水印' }
  ]

  const generateWatermark = () => {
    if (!watermarkText.trim()) return
    
    const styleMap = {
      minimal: { fontFamily: 'Arial', fontSize: '24px', color: '#ffffff', opacity: 0.8 },
      elegant: { fontFamily: 'Georgia', fontSize: '28px', color: '#f0f0f0', opacity: 0.9 },
      bold: { fontFamily: 'Arial Black', fontSize: '32px', color: '#ffffff', opacity: 1.0 },
      gradient: { fontFamily: 'Arial', fontSize: '26px', background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)', opacity: 0.9 },
      outline: { fontFamily: 'Arial', fontSize: '24px', color: '#ffffff', textShadow: '2px 2px 4px #000000' }
    }

    onWatermarkGenerated({
      text: watermarkText,
      style: styleMap[selectedStyle as keyof typeof styleMap]
    })
  }

  return (
    <div className="smart-watermark-generator">
      <div className="generator-header">
        <h4>💎 智能水印生成</h4>
      </div>

      <div className="watermark-input">
        <input
          type="text"
          placeholder="输入水印文字..."
          value={watermarkText}
          onChange={(e) => setWatermarkText(e.target.value)}
        />
      </div>

      <div className="style-selector">
        <label>选择样式:</label>
        <div className="style-options">
          {watermarkStyles.map(style => (
            <div
              key={style.id}
              className={`style-option ${selectedStyle === style.id ? 'selected' : ''}`}
              onClick={() => setSelectedStyle(style.id)}
            >
              <div className="style-preview">{style.preview}</div>
              <div className="style-name">{style.name}</div>
            </div>
          ))}
        </div>
      </div>

      <button 
        className="generate-btn"
        onClick={generateWatermark}
        disabled={!watermarkText.trim()}
      >
        生成水印
      </button>
    </div>
  )
}

// 实时性能监控
interface PerformanceMonitorProps {
  imageSize: number
  processingTime: number
  memoryUsage: number
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  imageSize,
  processingTime,
  memoryUsage
}) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="performance-monitor">
      <div className="monitor-header">
        <h4>⚡ 性能监控</h4>
      </div>

      <div className="performance-metrics">
        <div className="metric-item">
          <div className="metric-label">图片大小</div>
          <div className="metric-value">{formatFileSize(imageSize)}</div>
        </div>
        
        <div className="metric-item">
          <div className="metric-label">处理时间</div>
          <div className="metric-value">{processingTime}ms</div>
        </div>
        
        <div className="metric-item">
          <div className="metric-label">内存使用</div>
          <div className="metric-value">{formatFileSize(memoryUsage)}</div>
        </div>
      </div>

      <div className="performance-tips">
        <div className="tip-item">
          <span className="tip-icon">💡</span>
          <span className="tip-text">大图片建议先压缩再处理</span>
        </div>
        <div className="tip-item">
          <span className="tip-icon">⚡</span>
          <span className="tip-text">WebP格式可节省50%空间</span>
        </div>
      </div>
    </div>
  )
}
