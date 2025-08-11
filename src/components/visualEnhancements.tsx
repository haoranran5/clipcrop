import React from 'react'

// 改进的预设卡片组件
interface EnhancedPresetCardProps {
  preset: any
  isSelected: boolean
  onClick: () => void
  isPopular?: boolean
}

export const EnhancedPresetCard: React.FC<EnhancedPresetCardProps> = ({
  preset,
  isSelected,
  onClick,
  isPopular = false
}) => {
  return (
    <div 
      className={`enhanced-preset-card ${isSelected ? 'selected' : ''} ${isPopular ? 'popular' : ''}`}
      onClick={onClick}
    >
      <div className="preset-header">
        <div className="preset-icon">
          {preset.platform === 'Instagram' && '📸'}
          {preset.platform === 'Twitter/X' && '🐦'}
          {preset.platform === 'LinkedIn' && '💼'}
          {preset.platform === 'Facebook' && '📘'}
          {preset.platform === 'YouTube' && '📺'}
          {preset.platform === 'Xiaohongshu' && '📖'}
          {preset.platform === 'Bilibili' && '📺'}
          {preset.platform === 'Douyin' && '🎵'}
          {preset.platform === 'Taobao' && '🛒'}
          {preset.platform === 'JD' && '🛒'}
          {!['Instagram', 'Twitter/X', 'LinkedIn', 'Facebook', 'YouTube', 'Xiaohongshu', 'Bilibili', 'Douyin', 'Taobao', 'JD'].includes(preset.platform) && '📱'}
        </div>
        {isPopular && <div className="popular-badge">🔥 Popular</div>}
      </div>
      
      <div className="preset-info">
        <div className="preset-name">{preset.platform}</div>
        <div className="preset-type">{preset.type}</div>
        <div className="preset-dimensions">{preset.width} × {preset.height}</div>
      </div>
      
      {isSelected && <div className="selected-indicator">✓</div>}
    </div>
  )
}

// 改进的滤镜预设组件
interface FilterPresetProps {
  name: string
  icon: string
  filters: any
  onClick: () => void
  isActive: boolean
}

export const FilterPreset: React.FC<FilterPresetProps> = ({
  name,
  icon,
  filters,
  onClick,
  isActive
}) => {
  return (
    <div 
      className={`filter-preset ${isActive ? 'active' : ''}`}
      onClick={onClick}
      title={name}
    >
      <div className="filter-icon">{icon}</div>
      <div className="filter-name">{name}</div>
      <div className="filter-preview" style={{
        filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) grayscale(${filters.grayscale}%) sepia(${filters.sepia}%)`
      }} />
    </div>
  )
}

// 改进的导出选项组件
interface ExportOptionsProps {
  format: string
  quality: number
  onFormatChange: (format: string) => void
  onQualityChange: (quality: number) => void
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({
  format,
  quality,
  onFormatChange,
  onQualityChange
}) => {
  const formatInfo = {
    png: { name: 'PNG', desc: '无损压缩，支持透明', icon: '🖼️' },
    jpeg: { name: 'JPEG', desc: '有损压缩，文件小', icon: '📷' },
    webp: { name: 'WebP', desc: '现代格式，体积小', icon: '🌐' }
  }

  return (
    <div className="export-options">
      <h4>导出选项</h4>
      
      <div className="format-selector">
        {Object.entries(formatInfo).map(([key, info]) => (
          <div 
            key={key}
            className={`format-option ${format === key ? 'selected' : ''}`}
            onClick={() => onFormatChange(key)}
          >
            <div className="format-icon">{info.icon}</div>
            <div className="format-details">
              <div className="format-name">{info.name}</div>
              <div className="format-desc">{info.desc}</div>
            </div>
          </div>
        ))}
      </div>
      
      {format === 'jpeg' && (
        <div className="quality-control">
          <label>质量: {quality}%</label>
          <input 
            type="range" 
            min="1" 
            max="100" 
            value={quality}
            onChange={(e) => onQualityChange(parseInt(e.target.value))}
          />
        </div>
      )}
    </div>
  )
}

// 改进的批量处理组件
interface EnhancedBatchProcessorProps {
  queue: string[]
  onBatchComplete: (results: any[]) => void
  onProgress: (progress: number) => void
  exportBatchZip: (sizes: number[]) => Promise<void>
  working: boolean
}

export const EnhancedBatchProcessor: React.FC<EnhancedBatchProcessorProps> = ({
  queue,
  onBatchComplete,
  onProgress,
  exportBatchZip,
  working
}) => {
  const [selectedSizes, setSelectedSizes] = React.useState<number[]>([128, 256, 512])
  const [customSizes, setCustomSizes] = React.useState<string>('')

  const sizePresets = [
    { name: '头像尺寸', sizes: [128, 256, 512], icon: '👤' },
    { name: '电商主图', sizes: [400, 800, 1200], icon: '🛒' },
    { name: '社交媒体', sizes: [512, 1024, 2048], icon: '📱' },
    { name: '高清打印', sizes: [1500, 3000, 4500], icon: '🖨️' }
  ]

  const handleCustomSizes = () => {
    const sizes = customSizes.split(',').map(s => parseInt(s.trim())).filter(s => !isNaN(s))
    if (sizes.length > 0) {
      setSelectedSizes(sizes)
    }
  }

  return (
    <div className="enhanced-batch-processor">
      <div className="batch-header">
        <h4>批量处理</h4>
        <div className="batch-info">
          <span className="file-count">{queue.length} 张图片</span>
          <span className="size-count">{selectedSizes.length} 种尺寸</span>
        </div>
      </div>

      <div className="size-presets">
        {sizePresets.map((preset, index) => (
          <div 
            key={index}
            className={`size-preset ${selectedSizes.join(',') === preset.sizes.join(',') ? 'selected' : ''}`}
            onClick={() => setSelectedSizes(preset.sizes)}
          >
            <div className="preset-icon">{preset.icon}</div>
            <div className="preset-name">{preset.name}</div>
            <div className="preset-sizes">{preset.sizes.join('/')}</div>
          </div>
        ))}
      </div>

      <div className="custom-sizes">
        <label>自定义尺寸 (用逗号分隔):</label>
        <div className="custom-input">
          <input 
            type="text" 
            value={customSizes}
            onChange={(e) => setCustomSizes(e.target.value)}
            placeholder="例如: 100,200,300"
          />
          <button onClick={handleCustomSizes}>应用</button>
        </div>
      </div>

      <div className="batch-actions">
        <button 
          className="primary"
          onClick={() => exportBatchZip(selectedSizes)}
          disabled={working || queue.length === 0}
        >
          {working ? <LoadingSpinner size="small" /> : '开始批量处理'}
        </button>
      </div>
    </div>
  )
}

// 改进的社交预览组件
interface EnhancedSocialPreviewProps {
  src: string | null
  aspect: number
  format: string
}

export const EnhancedSocialPreview: React.FC<EnhancedSocialPreviewProps> = ({
  src,
  aspect,
  format
}) => {
  const [selectedPlatform, setSelectedPlatform] = React.useState('all')
  const [showComparison, setShowComparison] = React.useState(false)

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: '📸', color: '#E4405F' },
    { id: 'twitter', name: 'Twitter/X', icon: '🐦', color: '#1DA1F2' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0A66C2' },
    { id: 'facebook', name: 'Facebook', icon: '📘', color: '#1877F2' },
    { id: 'youtube', name: 'YouTube', icon: '📺', color: '#FF0000' },
    { id: 'xiaohongshu', name: '小红书', icon: '📖', color: '#FF2442' },
    { id: 'bilibili', name: 'B站', icon: '📺', color: '#00A1D6' }
  ]

  return (
    <div className="enhanced-social-preview">
      <div className="preview-header">
        <h4>社交平台预览</h4>
        <div className="preview-controls">
          <button 
            className={`preview-mode ${!showComparison ? 'active' : ''}`}
            onClick={() => setShowComparison(false)}
          >
            单平台预览
          </button>
          <button 
            className={`preview-mode ${showComparison ? 'active' : ''}`}
            onClick={() => setShowComparison(true)}
          >
            对比预览
          </button>
        </div>
      </div>

      {!showComparison ? (
        <div className="single-preview">
          <div className="platform-selector">
            {platforms.map(platform => (
              <button
                key={platform.id}
                className={`platform-btn ${selectedPlatform === platform.id ? 'active' : ''}`}
                onClick={() => setSelectedPlatform(platform.id)}
                style={{ '--platform-color': platform.color } as any}
              >
                <span className="platform-icon">{platform.icon}</span>
                <span className="platform-name">{platform.name}</span>
              </button>
            ))}
          </div>
          
                     <div className="preview-frame">
             {/* 这里可以添加具体的平台预览组件 */}
             <div className="mock-preview">
               <div className="mock-header" style={{ backgroundColor: platforms.find(p => p.id === selectedPlatform)?.color }}>
                 <img 
                   src={`/icons/platforms/${platforms.find(p => p.id === selectedPlatform)?.id}.svg`}
                   style={{ 
                     width: '24px', 
                     height: '24px'
                   }}
                   alt={platforms.find(p => p.id === selectedPlatform)?.name}
                 />
               </div>
               <div className="mock-content" style={{ aspectRatio: aspect }}>
                 {src ? (
                   <img src={src} alt="预览" />
                 ) : (
                   <div className="placeholder">选择图片查看预览</div>
                 )}
               </div>
             </div>
           </div>
        </div>
      ) : (
        <div className="comparison-preview">
                   <div className="comparison-grid">
           {platforms.slice(0, 6).map(platform => (
             <div key={platform.id} className="comparison-item">
               <div className="comparison-header">
                 <img 
                   src={`/icons/platforms/${platform.id}.svg`}
                   style={{ 
                     width: '20px', 
                     height: '20px'
                   }}
                   alt={platform.name}
                 />
               </div>
               <div className="comparison-content">
                 {src ? (
                   <img src={src} alt={`${platform.name}预览`} />
                 ) : (
                   <div className="placeholder">无图片</div>
                 )}
               </div>
             </div>
           ))}
         </div>
        </div>
      )}
    </div>
  )
}

// 加载动画组件
const LoadingSpinner: React.FC<{ size: 'small' | 'medium' | 'large' }> = ({ size }) => {
  const sizeMap = { small: '12px', medium: '16px', large: '24px' }
  return (
    <div 
      className="loading-spinner"
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        border: `2px solid transparent`,
        borderTop: `2px solid var(--brand)`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    />
  )
}
