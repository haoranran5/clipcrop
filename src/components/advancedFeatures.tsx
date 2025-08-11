import React from 'react'

// Advanced Filter System
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
              name: 'Vintage',
      icon: '📷',
      filters: { brightness: 110, contrast: 120, saturation: 80, sepia: 30, grayscale: 0 }
    },
    {
              name: 'Black & White',
      icon: '⚫',
      filters: { brightness: 100, contrast: 110, saturation: 0, sepia: 0, grayscale: 100 }
    },
    {
              name: 'Warm',
      icon: '🌅',
      filters: { brightness: 105, contrast: 105, saturation: 120, sepia: 15, grayscale: 0 }
    },
    {
              name: 'Cool',
      icon: '❄️',
      filters: { brightness: 95, contrast: 110, saturation: 90, sepia: 0, grayscale: 0 }
    },
    {
              name: 'High Contrast',
      icon: '⚡',
      filters: { brightness: 100, contrast: 140, saturation: 100, sepia: 0, grayscale: 0 }
    },
    {
              name: 'Soft',
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
        <h4>🎨 Advanced Filters</h4>
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
                      Reset
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
                      <label>Brightness: {filters.brightness}%</label>
          <input
            type="range"
            min="0"
            max="200"
            value={filters.brightness}
            onChange={(e) => handleSliderChange('brightness', parseInt(e.target.value))}
          />
        </div>

        <div className="filter-slider">
                      <label>Contrast: {filters.contrast}%</label>
          <input
            type="range"
            min="0"
            max="200"
            value={filters.contrast}
            onChange={(e) => handleSliderChange('contrast', parseInt(e.target.value))}
          />
        </div>

        <div className="filter-slider">
                      <label>Saturation: {filters.saturation}%</label>
          <input
            type="range"
            min="0"
            max="200"
            value={filters.saturation}
            onChange={(e) => handleSliderChange('saturation', parseInt(e.target.value))}
          />
        </div>

        <div className="filter-slider">
                      <label>Grayscale: {filters.grayscale}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.grayscale}
            onChange={(e) => handleSliderChange('grayscale', parseInt(e.target.value))}
          />
        </div>

        <div className="filter-slider">
                      <label>Sepia: {filters.sepia}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.sepia}
            onChange={(e) => handleSliderChange('sepia', parseInt(e.target.value))}
          />
        </div>

        <div className="filter-slider">
                      <label>Blur: {filters.blur}px</label>
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

// Border and Shadow Effects
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
            { name: 'No Border', value: 'none' },
        { name: 'Solid', value: 'solid' },
          { name: 'Dashed', value: 'dashed' },
      { name: 'Dotted', value: 'dotted' }
  ]

  const shadowPresets = [
            { name: 'No Shadow', value: { enable: false, blur: 0, offsetX: 0, offsetY: 0, color: '#00000055' } },
        { name: 'Light', value: { enable: true, blur: 8, offsetX: 0, offsetY: 4, color: '#00000033' } },
        { name: 'Medium', value: { enable: true, blur: 16, offsetX: 0, offsetY: 8, color: '#00000044' } },
        { name: 'Strong', value: { enable: true, blur: 24, offsetX: 0, offsetY: 12, color: '#00000066' } }
  ]

  return (
    <div className="border-shadow-effects">
      <div className="effects-header">
        <h4>🖼️ Border & Shadow</h4>
      </div>

      <div className="border-section">
                  <h5>Border Settings</h5>
        
        <div className="border-style-selector">
                      <label>Border Style:</label>
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
              <label>Border Width: {border.width || 0}px</label>
              <input
                type="range"
                min="0"
                max="20"
                value={border.width || 0}
                onChange={(e) => onBorderChange({ ...border, width: parseInt(e.target.value) })}
              />
            </div>

            <div className="border-control">
              <label>Border Color:</label>
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
                  <h5>Shadow Effects</h5>
        
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
              <label>Blur Radius: {shadow.blur}px</label>
              <input
                type="range"
                min="0"
                max="50"
                value={shadow.blur}
                onChange={(e) => onShadowChange({ ...shadow, blur: parseInt(e.target.value) })}
              />
            </div>

            <div className="shadow-control">
              <label>Horizontal Offset: {shadow.offsetX}px</label>
              <input
                type="range"
                min="-20"
                max="20"
                value={shadow.offsetX}
                onChange={(e) => onShadowChange({ ...shadow, offsetX: parseInt(e.target.value) })}
              />
            </div>

            <div className="shadow-control">
              <label>Vertical Offset: {shadow.offsetY}px</label>
              <input
                type="range"
                min="-20"
                max="20"
                value={shadow.offsetY}
                onChange={(e) => onShadowChange({ ...shadow, offsetY: parseInt(e.target.value) })}
              />
            </div>

            <div className="shadow-control">
              <label>Shadow Color:</label>
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

// Watermark System
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
            { name: 'Top Left', value: 'top-left' },
        { name: 'Top Right', value: 'top-right' },
        { name: 'Bottom Left', value: 'bottom-left' },
        { name: 'Bottom Right', value: 'bottom-right' },
        { name: 'Center', value: 'center' }
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
        <h4>💎 Watermark Settings</h4>
      </div>

      <div className="watermark-tabs">
        <button
          className={`watermark-tab ${!showLogoUpload ? 'active' : ''}`}
          onClick={() => setShowLogoUpload(false)}
        >
          Text Watermark
        </button>
        <button
          className={`watermark-tab ${showLogoUpload ? 'active' : ''}`}
          onClick={() => setShowLogoUpload(true)}
        >
                   Image Watermark
        </button>
      </div>

      {!showLogoUpload ? (
        <div className="text-watermark">
          <div className="watermark-control">
            <label>Watermark Text:</label>
            <input
              type="text"
                              placeholder="Enter watermark text..."
              value={watermark.text || ''}
              onChange={(e) => onWatermarkChange({ ...watermark, text: e.target.value })}
            />
          </div>

          <div className="watermark-control">
            <label>Font Size: {watermark.fontSize || 24}px</label>
            <input
              type="range"
              min="12"
              max="72"
              value={watermark.fontSize || 24}
              onChange={(e) => onWatermarkChange({ ...watermark, fontSize: parseInt(e.target.value) })}
            />
          </div>

          <div className="watermark-control">
            <label>Opacity: {Math.round((watermark.opacity || 0.8) * 100)}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round((watermark.opacity || 0.8) * 100)}
              onChange={(e) => onWatermarkChange({ ...watermark, opacity: parseInt(e.target.value) / 100 })}
            />
          </div>

          <div className="watermark-control">
            <label>Text Color:</label>
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
            <label>Upload Logo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
            />
          </div>

          {watermark.logo?.src && (
            <>
              <div className="logo-preview">
                <img src={watermark.logo.src} alt="Logo preview" />
              </div>

              <div className="watermark-control">
                <label>Logo Width: {watermark.logo.width || 128}px</label>
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
                <label>Logo Opacity: {Math.round((watermark.logo.opacity || 0.8) * 100)}%</label>
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
                    <label>Watermark Position:</label>
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

// Export Preset Management
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
        <h4>💾 Export Presets</h4>
        <button
          className="save-preset-btn"
          onClick={() => setShowSaveDialog(true)}
        >
                      Save Current Settings
        </button>
      </div>

      {showSaveDialog && (
        <div className="save-preset-dialog">
          <div className="dialog-content">
            <h5>Save Preset</h5>
            <input
              type="text"
                              placeholder="Enter preset name..."
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
            />
            <div className="dialog-actions">
              <button onClick={handleSavePreset}>Save</button>
              <button onClick={() => setShowSaveDialog(false)}>Cancel</button>
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
                Load
              </button>
              <button
                className="delete-preset-btn"
                onClick={() => onPresetDelete(preset.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {presets.length === 0 && (
          <div className="no-presets">
            No saved presets
          </div>
        )}
      </div>
    </div>
  )
}
