import React from 'react'

interface UserGuideProps {
  isVisible: boolean
  onClose: () => void
}

export const UserGuide: React.FC<UserGuideProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null

  const steps = [
    {
      title: 'Upload Image',
      description: 'Drag image to canvas area, or click to select file',
      icon: '📁'
    },
    {
      title: 'Select Preset',
      description: 'Choose social platform preset size from right panel',
      icon: '📱'
    },
    {
      title: 'Adjust Crop',
      description: 'Drag to adjust crop area, use wheel to zoom',
      icon: '✂️'
    },
    {
      title: 'Add Effects',
      description: 'Adjust filters, borders, shadows and other effects',
      icon: '🎨'
    },
    {
      title: 'Export Image',
      description: 'Click download button to export final image',
      icon: '💾'
    }
  ]

  return (
    <div className="user-guide-overlay" onClick={onClose}>
      <div className="user-guide-modal" onClick={e => e.stopPropagation()}>
        <div className="user-guide-header">
          <h2>Welcome to ClipCrop!</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="user-guide-content">
          <p style={{ marginBottom: '24px', color: 'var(--muted)' }}>
            Quick guide on how to use ClipCrop to crop and edit images
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
            <h4>💡 Tips</h4>
            <ul>
              <li>Press <kbd>?</kbd> to view keyboard shortcuts</li>
              <li>Press <kbd>Ctrl/Cmd + S</kbd> to export quickly</li>
              <li>Supports batch processing of multiple images</li>
              <li>All processing is done locally to protect privacy</li>
            </ul>
          </div>
        </div>
        
        <div className="user-guide-footer">
          <button className="primary" onClick={onClose}>
            Get Started
          </button>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" />
            <span>Don't show this guide again</span>
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
                    <h2>😵 Something went wrong</h2>
        <p>The page encountered an unexpected error, please refresh and try again</p>
            <button 
              className="primary"
              onClick={() => window.location.reload()}
            >
              Refresh Page
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
    // Check file type
    if (!file.type.startsWith('image/')) {
              onInvalid('Please select an image file')
      return
    }

    // Check file size (10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
              onInvalid('File size cannot exceed 10MB')
      return
    }

    // Check file extension
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp']
    const fileName = file.name.toLowerCase()
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext))
    
    if (!hasValidExtension) {
              onInvalid('Unsupported image format, please select JPG, PNG, WebP, etc.')
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
          { key: '?', description: 'Show/hide keyboard shortcuts help' },
          { key: 'Ctrl/Cmd + S', description: 'Quick export image' },
      { key: 'Escape', description: 'Close dialog' },
          { key: 'Delete', description: 'Delete current image (batch mode)' },
      { key: 'Mouse wheel', description: 'Zoom image' },
          { key: 'Shift + wheel', description: 'Rotate image' },
      { key: 'Drag', description: 'Move crop area' },
          { key: 'Space', description: 'Temporarily hide guides' }
  ]

  return (
    <div className="shortcuts-overlay" onClick={onClose}>
      <div className="shortcuts-modal" onClick={e => e.stopPropagation()}>
        <div className="shortcuts-header">
          <h3>Keyboard Shortcuts</h3>
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
