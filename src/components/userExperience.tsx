import React from 'react'

// 智能提示系统
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
          { id: 'drag-drop', text: '💡 拖拽图片到这里，或点击选择文件', action: 'upload' },
          { id: 'paste', text: '📋 也可以直接粘贴图片 (Ctrl+V)', action: 'paste' },
          { id: 'batch', text: '📁 支持批量上传多张图片', action: 'batch' }
        ],
        'crop': [
          { id: 'auto-center', text: '🎯 点击"自动居中"让AI帮你定位主体', action: 'auto-center' },
          { id: 'grid', text: '📐 开启网格辅助线，精确对齐', action: 'grid' },
          { id: 'zoom', text: '🔍 滚轮缩放，拖拽移动', action: 'zoom' }
        ],
        'export': [
          { id: 'batch-export', text: '📦 批量导出多个尺寸，一键打包下载', action: 'batch-export' },
          { id: 'webp', text: '⚡ 选择WebP格式，文件更小', action: 'webp' },
          { id: 'preview', text: '👀 预览不同平台的显示效果', action: 'preview' }
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
        <h4>💡 智能提示</h4>
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
            <span className="tip-action">点击试试</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 快捷操作面板
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
      name: 'Instagram方形',
      icon: '📸',
      action: 'preset',
      params: { width: 1080, height: 1080, platform: 'Instagram' }
    },
    {
      id: 'linkedin-banner',
      name: 'LinkedIn横幅',
      icon: '💼',
      action: 'preset',
      params: { width: 1584, height: 396, platform: 'LinkedIn' }
    },
    {
      id: 'twitter-header',
      name: 'Twitter头图',
      icon: '🐦',
      action: 'preset',
      params: { width: 1500, height: 500, platform: 'Twitter' }
    },
    {
      id: 'xiaohongshu',
      name: '小红书',
      icon: '📖',
      action: 'preset',
      params: { width: 1080, height: 1440, platform: '小红书' }
    },
    {
      id: 'auto-center',
      name: 'AI居中',
      icon: '🎯',
      action: 'auto-center'
    },
    {
      id: 'batch-export',
      name: '批量导出',
      icon: '📦',
      action: 'batch-export'
    }
  ]

  return (
    <div className="quick-actions">
      <div className="actions-header">
        <h4>⚡ 快捷操作</h4>
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

// 进度指示器
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

// 文件拖拽区域增强
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
          <h3>拖拽图片到这里</h3>
          <p>支持 {supportedFormats.join(', ')} 格式</p>
          <p>最大文件大小: {(maxFileSize / 1024 / 1024).toFixed(1)}MB</p>
        </div>
        
        <div className="drop-features">
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <span className="feature-text">AI自动居中</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📱</span>
            <span className="feature-text">多平台适配</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span className="feature-text">批量处理</span>
          </div>
        </div>
        
        <button className="select-files-btn">
          选择文件
        </button>
      </div>
    </div>
  )
}

// 键盘快捷键提示
interface KeyboardShortcutsProps {
  onClose: () => void
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  onClose
}) => {
  const shortcuts = [
    { key: 'Ctrl + V', action: '粘贴图片' },
    { key: 'Ctrl + Z', action: '撤销操作' },
    { key: 'Ctrl + Y', action: '重做操作' },
    { key: 'Space', action: '切换网格显示' },
    { key: 'C', action: '自动居中' },
    { key: 'R', action: '重置缩放' },
    { key: '1-9', action: '快速选择预设' },
    { key: 'Enter', action: '导出图片' },
    { key: 'Esc', action: '关闭对话框' }
  ]

  return (
    <div className="keyboard-shortcuts-modal">
      <div className="shortcuts-content">
        <div className="shortcuts-header">
          <h3>⌨️ 键盘快捷键</h3>
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
          💡 提示：在裁剪区域按空格键可以快速切换网格显示
        </div>
      </div>
    </div>
  )
}

// 操作历史记录
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
        <h4>📝 操作历史</h4>
        <div className="history-controls">
          <button 
            className="undo-btn"
            disabled={history.length === 0}
            onClick={() => history.length > 0 && onUndo(history[history.length - 1].id)}
          >
            ↩️ 撤销
          </button>
          <button 
            className="redo-btn"
            disabled={history.length === 0}
            onClick={() => history.length > 0 && onRedo(history[history.length - 1].id)}
          >
            ↪️ 重做
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
            暂无操作记录
          </div>
        )}
      </div>
    </div>
  )
}
