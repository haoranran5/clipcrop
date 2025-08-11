import React from 'react'

// 高级滤镜系统
interface AdvancedFiltersProps {
  filters: any
  onFilterChange: (filters: any) => void
  onPresetApply: (preset: string) => void
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFilterChange,
  onPresetApply
}) => {
  const filterPresets = [
    {
      name: '复古',
      icon: '📷',
      filters: { brightness: 110, contrast: 120, saturation: 80, sepia: 30, grayscale: 0 }
    },
    {
      name: '黑白',
      icon: '⚫',
      filters: { brightness: 100, contrast: 110, saturation: 0, sepia: 0, grayscale: 100 }
    },
    {
      name: '暖色',
      icon: '🌅',
      filters: { brightness: 105, contrast: 105, saturation: 120, sepia: 15, grayscale: 0 }
    },
    {
      name: '冷色',
      icon: '❄️',
      filters: { brightness: 95, contrast: 110, saturation: 90, sepia: 0, grayscale: 0 }
    },
    {
      name: '高对比',
      icon: '⚡',
      filters: { brightness: 100, contrast: 140, saturation: 100, sepia: 0, grayscale: 0 }
    },
    {
      name: '柔和',
      icon: '🌸',
      filters: { brightness: 105, contrast: 90, saturation: 110, sepia: 0, grayscale: 0 }
    }
  ]

  const handleSliderChange = (key: string, value: number) => {
    onFilterChange({ ...filters, [key]: value })
  }

  return (
    <div className="advanced-filters">
      <div className="filters-header">
        <h4>🎨 高级滤镜</h4>
        <button 
          className="reset-filters"
          onClick={() => onFilterChange({
            brightness: 100,
            contrast: 100,
            saturation: 100,
            grayscale: 0,
            sepia: 0,
            blur: 0
          })}
        >
          重置
        </button>
      </div>

      <div className="filter-presets-grid">
        {filterPresets.map((preset, index) => (
          <div
            key={index}
            className="filter-preset-card"
            onClick={() => onPresetApply(preset.name)}
          >
            <div className="preset-icon">{preset.icon}</div>
            <div className="preset-name">{preset.name}</div>
            <div 
              className="preset-preview"
              style={{
                filter: `brightness(${preset.filters.brightness}%) contrast(${preset.filters.contrast}%) saturate(${preset.filters.saturation}%) grayscale(${preset.filters.grayscale}%) sepia(${preset.filters.sepia}%)`
              }}
            />
          </div>
        ))}
      </div>

      <div className="filter-controls">
        <div className="filter-slider">
          <label>亮度: {filters.brightness}%</label>
          <input
            type="range"
            min="0"
            max="200"
            value={filters.brightness}
            onChange={(e) => handleSliderChange('brightness', parseInt(e.target.value))}
          />
        </div>

        <div className="filter-slider">
          <label>对比度: {filters.contrast}%</label>
          <input
            type="range"
            min="0"
            max="200"
            value={filters.contrast}
            onChange={(e) => handleSliderChange('contrast', parseInt(e.target.value))}
          />
        </div>

        <div className="filter-slider">
          <label>饱和度: {filters.saturation}%</label>
          <input
            type="range"
            min="0"
            max="200"
            value={filters.saturation}
            onChange={(e) => handleSliderChange('saturation', parseInt(e.target.value))}
          />
        </div>

        <div className="filter-slider">
          <label>灰度: {filters.grayscale}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.grayscale}
            onChange={(e) => handleSliderChange('grayscale', parseInt(e.target.value))}
          />
        </div>

        <div className="filter-slider">
          <label>棕褐色: {filters.sepia}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.sepia}
            onChange={(e) => handleSliderChange('sepia', parseInt(e.target.value))}
          />
        </div>

        <div className="filter-slider">
          <label>模糊: {filters.blur}px</label>
          <input
            type="range"
            min="0"
            max="20"
            value={filters.blur}
            onChange={(e) => handleSliderChange('blur', parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}

// 边框和阴影效果
interface BorderShadowEffectsProps {
  border: any
  shadow: any
  onBorderChange: (border: any) => void
  onShadowChange: (shadow: any) => void
}

export const BorderShadowEffects: React.FC<BorderShadowEffectsProps> = ({
  border,
  shadow,
  onBorderChange,
  onShadowChange
}) => {
  const borderStyles = [
    { name: '无边框', value: 'none' },
    { name: '实线', value: 'solid' },
    { name: '虚线', value: 'dashed' },
    { name: '点线', value: 'dotted' }
  ]

  const shadowPresets = [
    { name: '无阴影', value: { enable: false, blur: 0, offsetX: 0, offsetY: 0, color: '#00000055' } },
    { name: '轻微', value: { enable: true, blur: 8, offsetX: 0, offsetY: 4, color: '#00000033' } },
    { name: '中等', value: { enable: true, blur: 16, offsetX: 0, offsetY: 8, color: '#00000044' } },
    { name: '强烈', value: { enable: true, blur: 24, offsetX: 0, offsetY: 12, color: '#00000066' } }
  ]

  return (
    <div className="border-shadow-effects">
      <div className="effects-header">
        <h4>🖼️ 边框与阴影</h4>
      </div>

      <div className="border-section">
        <h5>边框设置</h5>
        
        <div className="border-style-selector">
          <label>边框样式:</label>
          <select
            value={border.style || 'none'}
            onChange={(e) => onBorderChange({ ...border, style: e.target.value })}
          >
            {borderStyles.map(style => (
              <option key={style.value} value={style.value}>
                {style.name}
              </option>
            ))}
          </select>
        </div>

        {border.style !== 'none' && (
          <>
            <div className="border-control">
              <label>边框宽度: {border.width || 0}px</label>
              <input
                type="range"
                min="0"
                max="20"
                value={border.width || 0}
                onChange={(e) => onBorderChange({ ...border, width: parseInt(e.target.value) })}
              />
            </div>

            <div className="border-control">
              <label>边框颜色:</label>
              <input
                type="color"
                value={border.color || '#ffffff'}
                onChange={(e) => onBorderChange({ ...border, color: e.target.value })}
              />
            </div>
          </>
        )}
      </div>

      <div className="shadow-section">
        <h5>阴影效果</h5>
        
        <div className="shadow-presets">
          {shadowPresets.map((preset, index) => (
            <button
              key={index}
              className={`shadow-preset ${JSON.stringify(shadow) === JSON.stringify(preset.value) ? 'active' : ''}`}
              onClick={() => onShadowChange(preset.value)}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {shadow.enable && (
          <div className="shadow-controls">
            <div className="shadow-control">
              <label>模糊半径: {shadow.blur}px</label>
              <input
                type="range"
                min="0"
                max="50"
                value={shadow.blur}
                onChange={(e) => onShadowChange({ ...shadow, blur: parseInt(e.target.value) })}
              />
            </div>

            <div className="shadow-control">
              <label>水平偏移: {shadow.offsetX}px</label>
              <input
                type="range"
                min="-20"
                max="20"
                value={shadow.offsetX}
                onChange={(e) => onShadowChange({ ...shadow, offsetX: parseInt(e.target.value) })}
              />
            </div>

            <div className="shadow-control">
              <label>垂直偏移: {shadow.offsetY}px</label>
              <input
                type="range"
                min="-20"
                max="20"
                value={shadow.offsetY}
                onChange={(e) => onShadowChange({ ...shadow, offsetY: parseInt(e.target.value) })}
              />
            </div>

            <div className="shadow-control">
              <label>阴影颜色:</label>
              <input
                type="color"
                value={shadow.color}
                onChange={(e) => onShadowChange({ ...shadow, color: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// 水印系统
interface WatermarkSystemProps {
  watermark: any
  onWatermarkChange: (watermark: any) => void
}

export const WatermarkSystem: React.FC<WatermarkSystemProps> = ({
  watermark,
  onWatermarkChange
}) => {
  const [showLogoUpload, setShowLogoUpload] = React.useState(false)

  const watermarkPositions = [
    { name: '左上', value: 'top-left' },
    { name: '右上', value: 'top-right' },
    { name: '左下', value: 'bottom-left' },
    { name: '右下', value: 'bottom-right' },
    { name: '居中', value: 'center' }
  ]

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        onWatermarkChange({
          ...watermark,
          logo: { ...watermark.logo, src: e.target?.result as string }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="watermark-system">
      <div className="watermark-header">
        <h4>💎 水印设置</h4>
      </div>

      <div className="watermark-tabs">
        <button
          className={`watermark-tab ${!showLogoUpload ? 'active' : ''}`}
          onClick={() => setShowLogoUpload(false)}
        >
          文字水印
        </button>
        <button
          className={`watermark-tab ${showLogoUpload ? 'active' : ''}`}
          onClick={() => setShowLogoUpload(true)}
        >
         图片水印
        </button>
      </div>

      {!showLogoUpload ? (
        <div className="text-watermark">
          <div className="watermark-control">
            <label>水印文字:</label>
            <input
              type="text"
              placeholder="输入水印文字..."
              value={watermark.text || ''}
              onChange={(e) => onWatermarkChange({ ...watermark, text: e.target.value })}
            />
          </div>

          <div className="watermark-control">
            <label>字体大小: {watermark.fontSize || 24}px</label>
            <input
              type="range"
              min="12"
              max="72"
              value={watermark.fontSize || 24}
              onChange={(e) => onWatermarkChange({ ...watermark, fontSize: parseInt(e.target.value) })}
            />
          </div>

          <div className="watermark-control">
            <label>透明度: {Math.round((watermark.opacity || 0.8) * 100)}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round((watermark.opacity || 0.8) * 100)}
              onChange={(e) => onWatermarkChange({ ...watermark, opacity: parseInt(e.target.value) / 100 })}
            />
          </div>

          <div className="watermark-control">
            <label>文字颜色:</label>
            <input
              type="color"
              value={watermark.color || '#ffffff'}
              onChange={(e) => onWatermarkChange({ ...watermark, color: e.target.value })}
            />
          </div>
        </div>
      ) : (
        <div className="logo-watermark">
          <div className="logo-upload">
            <label>上传Logo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
            />
          </div>

          {watermark.logo?.src && (
            <>
              <div className="logo-preview">
                <img src={watermark.logo.src} alt="Logo预览" />
              </div>

              <div className="watermark-control">
                <label>Logo宽度: {watermark.logo.width || 128}px</label>
                <input
                  type="range"
                  min="32"
                  max="256"
                  value={watermark.logo.width || 128}
                  onChange={(e) => onWatermarkChange({
                    ...watermark,
                    logo: { ...watermark.logo, width: parseInt(e.target.value) }
                  })}
                />
              </div>

              <div className="watermark-control">
                <label>Logo透明度: {Math.round((watermark.logo.opacity || 0.8) * 100)}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round((watermark.logo.opacity || 0.8) * 100)}
                  onChange={(e) => onWatermarkChange({
                    ...watermark,
                    logo: { ...watermark.logo, opacity: parseInt(e.target.value) / 100 }
                  })}
                />
              </div>
            </>
          )}
        </div>
      )}

      <div className="watermark-position">
        <label>水印位置:</label>
        <div className="position-buttons">
          {watermarkPositions.map(position => (
            <button
              key={position.value}
              className={`position-btn ${watermark.position === position.value ? 'active' : ''}`}
              onClick={() => onWatermarkChange({ ...watermark, position: position.value })}
            >
              {position.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// 导出预设管理
interface ExportPresetManagerProps {
  presets: any[]
  onPresetSave: (preset: any) => void
  onPresetLoad: (preset: any) => void
  onPresetDelete: (presetId: string) => void
}

export const ExportPresetManager: React.FC<ExportPresetManagerProps> = ({
  presets,
  onPresetSave,
  onPresetLoad,
  onPresetDelete
}) => {
  const [showSaveDialog, setShowSaveDialog] = React.useState(false)
  const [newPresetName, setNewPresetName] = React.useState('')

  const handleSavePreset = () => {
    if (newPresetName.trim()) {
      onPresetSave({
        id: Date.now().toString(),
        name: newPresetName,
        timestamp: new Date()
      })
      setNewPresetName('')
      setShowSaveDialog(false)
    }
  }

  return (
    <div className="export-preset-manager">
      <div className="preset-header">
        <h4>💾 导出预设</h4>
        <button
          className="save-preset-btn"
          onClick={() => setShowSaveDialog(true)}
        >
          保存当前设置
        </button>
      </div>

      {showSaveDialog && (
        <div className="save-preset-dialog">
          <div className="dialog-content">
            <h5>保存预设</h5>
            <input
              type="text"
              placeholder="输入预设名称..."
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
            />
            <div className="dialog-actions">
              <button onClick={handleSavePreset}>保存</button>
              <button onClick={() => setShowSaveDialog(false)}>取消</button>
            </div>
          </div>
        </div>
      )}

      <div className="presets-list">
        {presets.map(preset => (
          <div key={preset.id} className="preset-item">
            <div className="preset-info">
              <div className="preset-name">{preset.name}</div>
              <div className="preset-time">
                {preset.timestamp.toLocaleDateString()}
              </div>
            </div>
            <div className="preset-actions">
              <button
                className="load-preset-btn"
                onClick={() => onPresetLoad(preset)}
              >
                加载
              </button>
              <button
                className="delete-preset-btn"
                onClick={() => onPresetDelete(preset.id)}
              >
                删除
              </button>
            </div>
          </div>
        ))}

        {presets.length === 0 && (
          <div className="no-presets">
            暂无保存的预设
          </div>
        )}
      </div>
    </div>
  )
}
