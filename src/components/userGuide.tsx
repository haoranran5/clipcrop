import React from 'react'

interface UserGuideProps {
  isVisible: boolean
  onClose: () => void
}

export const UserGuide: React.FC<UserGuideProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null

  const steps = [
    {
      title: '上传图片',
      description: '拖拽图片到画布区域，或点击选择文件',
      icon: '📁'
    },
    {
      title: '选择预设',
      description: '从右侧面板选择社交平台预设尺寸',
      icon: '📱'
    },
    {
      title: '调整裁剪',
      description: '拖拽调整裁剪区域，使用滚轮缩放',
      icon: '✂️'
    },
    {
      title: '添加效果',
      description: '调整滤镜、边框、阴影等效果',
      icon: '🎨'
    },
    {
      title: '导出图片',
      description: '点击下载按钮导出最终图片',
      icon: '💾'
    }
  ]

  return (
    <div className="user-guide-overlay" onClick={onClose}>
      <div className="user-guide-modal" onClick={e => e.stopPropagation()}>
        <div className="user-guide-header">
          <h2>欢迎使用 ClipCrop！</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="user-guide-content">
          <p style={{ marginBottom: '24px', color: 'var(--muted)' }}>
            快速了解如何使用 ClipCrop 裁剪和编辑图片
          </p>
          
          <div className="guide-steps">
            {steps.map((step, index) => (
              <div key={index} className="guide-step">
                <div className="step-icon">{step.icon}</div>
                <div className="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="guide-tips">
            <h4>💡 小贴士</h4>
            <ul>
              <li>按 <kbd>?</kbd> 键查看快捷键</li>
              <li>按 <kbd>Ctrl/Cmd + S</kbd> 快速导出</li>
              <li>支持批量处理多张图片</li>
              <li>所有处理都在本地完成，保护隐私</li>
            </ul>
          </div>
        </div>
        
        <div className="user-guide-footer">
          <button className="primary" onClick={onClose}>
            开始使用
          </button>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" />
            <span>不再显示此引导</span>
          </label>
        </div>
      </div>
    </div>
  )
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <h2>😵 出现了一些问题</h2>
            <p>页面遇到了意外错误，请刷新页面重试</p>
            <button 
              className="primary"
              onClick={() => window.location.reload()}
            >
              刷新页面
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

interface FileValidationProps {
  file: File
  onValid: () => void
  onInvalid: (error: string) => void
}

export const FileValidator: React.FC<FileValidationProps> = ({ file, onValid, onInvalid }) => {
  React.useEffect(() => {
    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      onInvalid('请选择图片文件')
      return
    }

    // 检查文件大小 (10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      onInvalid('文件大小不能超过 10MB')
      return
    }

    // 检查文件扩展名
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp']
    const fileName = file.name.toLowerCase()
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext))
    
    if (!hasValidExtension) {
      onInvalid('不支持的图片格式，请选择 JPG、PNG、WebP 等格式')
      return
    }

    onValid()
  }, [file, onValid, onInvalid])

  return null
}

interface KeyboardShortcutsProps {
  isVisible: boolean
  onClose: () => void
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null

  const shortcuts = [
    { key: '?', description: '显示/隐藏快捷键帮助' },
    { key: 'Ctrl/Cmd + S', description: '快速导出图片' },
    { key: 'Escape', description: '关闭对话框' },
    { key: 'Delete', description: '删除当前图片（批量模式）' },
    { key: '鼠标滚轮', description: '缩放图片' },
    { key: 'Shift + 滚轮', description: '旋转图片' },
    { key: '拖拽', description: '移动裁剪区域' },
    { key: '空格键', description: '临时隐藏辅助线' }
  ]

  return (
    <div className="shortcuts-overlay" onClick={onClose}>
      <div className="shortcuts-modal" onClick={e => e.stopPropagation()}>
        <div className="shortcuts-header">
          <h3>键盘快捷键</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="shortcuts-content">
          <div className="shortcuts-grid">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="shortcut-item">
                <kbd className="shortcut-key">{shortcut.key}</kbd>
                <span className="shortcut-desc">{shortcut.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
