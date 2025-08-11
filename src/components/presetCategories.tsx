import React from 'react'
import { presets, Preset } from './presets'

interface PresetCategoriesProps {
  onPresetSelect: (preset: Preset) => void
  selectedPreset?: string
}

export const PresetCategories: React.FC<PresetCategoriesProps> = ({ 
  onPresetSelect, 
  selectedPreset 
}) => {
  const [activeCategory, setActiveCategory] = React.useState<string>('all')
  
  const categories = [
    { id: 'all', name: 'All', icon: '📱' },
    { id: 'social', name: 'Social Media', icon: '📱' },
    { id: 'china', name: 'Chinese Platforms', icon: '🇨🇳' },
    { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
    { id: 'professional', name: 'Professional', icon: '💼' },
    { id: 'avatar', name: 'Avatars', icon: '👤' }
  ]

  const filteredPresets = activeCategory === 'all' 
    ? presets 
    : presets.filter(p => p.category === activeCategory)

  return (
    <div className="preset-categories">
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>
      
      <div className="preset-grid">
        {filteredPresets.map((preset, index) => (
          <button
            key={index}
            className={`preset-button ${selectedPreset === `${preset.platform}-${preset.type}` ? 'selected' : ''}`}
            onClick={() => onPresetSelect(preset)}
          >
            <div className="preset-info">
              <div className="preset-platform">{preset.platform}</div>
              <div className="preset-type">{preset.type}</div>
              <div className="preset-size">{preset.width}×{preset.height}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
