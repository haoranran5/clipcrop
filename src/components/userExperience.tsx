import React from 'react'

// Smart Tips System
interface SmartTipsProps {
  currentStep: string
  userActions: string[]
  onTipAction: (action: string) => void
}

export const SmartTips: React.FC<SmartTipsProps> = ({
  currentStep,
  userActions,
  onTipAction
}) => {
  const [tips, setTips] = React.useState<any[]>([])
  const [showTips, setShowTips] = React.useState(true)

  React.useEffect(() => {
    const generateTips = () => {
      const tipMap: { [key: string]: any[] } = {
        'upload': [
          { id: 'drag-drop', text: '💡 Drag images here, or click to select files', action: 'upload' },
          { id: 'paste', text: '📋 You can also paste images directly (Ctrl+V)', action: 'paste' },
          { id: 'batch', text: '📁 Supports batch upload of multiple images', action: 'batch' }
        ],
        'crop': [
          { id: 'auto-center', text: '🎯 Click "Auto center" to let AI help you position the subject', action: 'auto-center' },
          { id: 'grid', text: '📐 Enable grid guides for precise alignment', action: 'grid' },
          { id: 'zoom', text: '🔍 Scroll to zoom, drag to move', action: 'zoom' }
        ],
        'export': [
          { id: 'batch-export', text: '📦 Batch export multiple sizes, download with one click', action: 'batch-export' },
          { id: 'webp', text: '⚡ Choose WebP format for smaller files', action: 'webp' },
          { id: 'preview', text: '👀 Preview display effects on different platforms', action: 'preview' }
        ]
      }
      
      setTips(tipMap[currentStep] || [])
    }

    generateTips()
  }, [currentStep, userActions])

  if (!showTips || tips.length === 0) return null

  return (
    <div className="smart-tips">
      <div className="tips-header">
        <h4>💡 Smart Tips</h4>
        <button 
          className="close-tips"
          onClick={() => setShowTips(false)}
        >
          ✕
        </button>
      </div>
      
      <div className="tips-list">
        {tips.map(tip => (
          <div 
            key={tip.id}
            className="tip-item"
            onClick={() => onTipAction(tip.action)}
          >
            <span className="tip-text">{tip.text}</span>
            <span className="tip-action">Try it</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Quick Actions Panel
interface QuickActionsProps {
  onAction: (action: string, params?: any) => void
  hasImage: boolean
  isProcessing: boolean
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onAction,
  hasImage,
  isProcessing
}) => {
  const quickActions = [
    {
      id: 'instagram-square',
              name: 'Instagram Square',
      icon: '📸',
      action: 'preset',
      params: { width: 1080, height: 1080, platform: 'Instagram' }
    },
    {
      id: 'linkedin-banner',
              name: 'LinkedIn Banner',
      icon: '💼',
      action: 'preset',
      params: { width: 1584, height: 396, platform: 'LinkedIn' }
    },
    {
      id: 'twitter-header',
              name: 'Twitter Header',
      icon: '🐦',
      action: 'preset',
      params: { width: 1500, height: 500, platform: 'Twitter' }
    },
    {
      id: 'xiaohongshu',
              name: 'Xiaohongshu',
      icon: '📖',
      action: 'preset',
              params: { width: 1080, height: 1440, platform: 'Xiaohongshu' }
    },
    {
      id: 'auto-center',
              name: 'AI Center',
      icon: '🎯',
      action: 'auto-center'
    },
    {
      id: 'batch-export',
              name: 'Batch Export',
      icon: '📦',
      action: 'batch-export'
    }
  ]

  return (
    <div className="quick-actions">
      <div className="actions-header">
        <h4>⚡ Quick Actions</h4>
      </div>
      
      <div className="actions-grid">
        {quickActions.map(action => (
          <button
            key={action.id}
            className="action-btn"
            onClick={() => onAction(action.action, action.params)}
            disabled={!hasImage || isProcessing}
            title={action.name}
          >
            <span className="action-icon">{action.icon}</span>
            <span className="action-name">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// Progress Indicator
interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  stepNames: string[]
  onStepClick: (step: number) => void
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepNames,
  onStepClick
}) => {
  return (
    <div className="progress-indicator">
      <div className="progress-steps">
        {stepNames.map((name, index) => (
          <div
            key={index}
            className={`progress-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
            onClick={() => onStepClick(index)}
          >
            <div className="step-number">
              {index < currentStep ? '✓' : index + 1}
            </div>
            <div className="step-name">{name}</div>
            {index < totalSteps - 1 && (
              <div className="step-connector" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Enhanced File Drop Zone
interface EnhancedDropZoneProps {
  onFilesDrop: (files: File[]) => void
  isDragOver: boolean
  supportedFormats: string[]
  maxFileSize: number
}

export const EnhancedDropZone: React.FC<EnhancedDropZoneProps> = ({
  onFilesDrop,
  isDragOver,
  supportedFormats,
  maxFileSize
}) => {
  const [dragCounter, setDragCounter] = React.useState(0)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    setDragCounter(prev => prev + 1)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragCounter(prev => prev - 1)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragCounter(0)
    
    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter(file => 
      file.type.startsWith('image/') && 
      file.size <= maxFileSize
    )
    
    if (imageFiles.length > 0) {
      onFilesDrop(imageFiles)
    }
  }

  const isActive = dragCounter > 0 || isDragOver

  return (
    <div 
      className={`enhanced-drop-zone ${isActive ? 'active' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="drop-zone-content">
        <div className="drop-icon">
          {isActive ? '📁' : '📸'}
        </div>
        
        <div className="drop-text">
                  <h3>Drag images here</h3>
        <p>Supports {supportedFormats.join(', ')} formats</p>
        <p>Max file size: {(maxFileSize / 1024 / 1024).toFixed(1)}MB</p>
        </div>
        
        <div className="drop-features">
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <span className="feature-text">AI Auto Center</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📱</span>
            <span className="feature-text">Multi-platform</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span className="feature-text">Batch Process</span>
          </div>
        </div>
        
        <button className="select-files-btn">
          Select Files
        </button>
      </div>
    </div>
  )
}

// Keyboard Shortcuts Tips
interface KeyboardShortcutsProps {
  onClose: () => void
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  onClose
}) => {
  const shortcuts = [
    { key: 'Ctrl + V', action: 'Paste image' },
          { key: 'Ctrl + Z', action: 'Undo' },
      { key: 'Ctrl + Y', action: 'Redo' },
          { key: 'Space', action: 'Toggle grid' },
      { key: 'C', action: 'Auto center' },
          { key: 'R', action: 'Reset zoom' },
      { key: '1-9', action: 'Quick preset select' },
          { key: 'Enter', action: 'Export image' },
      { key: 'Esc', action: 'Close dialog' }
  ]

  return (
    <div className="keyboard-shortcuts-modal">
      <div className="shortcuts-content">
        <div className="shortcuts-header">
          <h3>⌨️ Keyboard Shortcuts</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="shortcuts-grid">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="shortcut-item">
              <kbd className="shortcut-key">{shortcut.key}</kbd>
              <span className="shortcut-action">{shortcut.action}</span>
            </div>
          ))}
        </div>
        
        <div className="shortcuts-tip">
          💡 Tip: Press spacebar in crop area to quickly toggle grid display
        </div>
      </div>
    </div>
  )
}

// Action History
interface ActionHistoryProps {
  history: Array<{
    id: string
    action: string
    timestamp: Date
    description: string
  }>
  onUndo: (actionId: string) => void
  onRedo: (actionId: string) => void
}

export const ActionHistory: React.FC<ActionHistoryProps> = ({
  history,
  onUndo,
  onRedo
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="action-history">
      <div className="history-header">
        <h4>📝 Action History</h4>
        <div className="history-controls">
          <button 
            className="undo-btn"
            disabled={history.length === 0}
            onClick={() => history.length > 0 && onUndo(history[history.length - 1].id)}
          >
            ↩️ Undo
          </button>
          <button 
            className="redo-btn"
            disabled={history.length === 0}
            onClick={() => history.length > 0 && onRedo(history[history.length - 1].id)}
          >
            ↪️ Redo
          </button>
        </div>
      </div>
      
      <div className="history-list">
        {history.slice(-5).reverse().map((item) => (
          <div key={item.id} className="history-item">
            <div className="history-info">
              <span className="history-action">{item.action}</span>
              <span className="history-time">{formatTime(item.timestamp)}</span>
            </div>
            <div className="history-description">{item.description}</div>
          </div>
        ))}
        
        {history.length === 0 && (
          <div className="history-empty">
            No action history
          </div>
        )}
      </div>
    </div>
  )
}
