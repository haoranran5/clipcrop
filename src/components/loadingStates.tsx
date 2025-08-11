import React from 'react'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'var(--brand)' 
}) => {
  const sizeMap = {
    small: '16px',
    medium: '24px',
    large: '32px'
  }

  return (
    <div 
      className="loading-spinner"
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        border: `2px solid transparent`,
        borderTop: `2px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    />
  )
}

interface ProgressBarProps {
  progress: number
  label?: string
  showPercentage?: boolean
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  label, 
  showPercentage = true 
}) => {
  return (
    <div className="progress-container">
      {label && <div className="progress-label">{label}</div>}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showPercentage && (
        <div className="progress-text">{Math.round(progress)}%</div>
      )}
    </div>
  )
}

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  onClose: () => void
  duration?: number
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  onClose, 
  duration = 3000 
}) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const typeStyles = {
    success: { background: '#10b981', icon: '✅' },
    error: { background: '#ef4444', icon: '❌' },
    info: { background: '#3b82f6', icon: 'ℹ️' },
    warning: { background: '#f59e0b', icon: '⚠️' }
  }

  const style = typeStyles[type]

  return (
    <div 
      className="toast"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: style.background,
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        zIndex: 1000,
        animation: 'slideIn 0.3s ease'
      }}
    >
      <span>{style.icon}</span>
      <span>{message}</span>
      <button 
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '16px',
          marginLeft: '8px'
        }}
      >
        ×
      </button>
    </div>
  )
}

interface FileUploadZoneProps {
  onFileSelect: (files: File[]) => void
  isDragOver: boolean
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  isLoading?: boolean
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  onFileSelect,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  isLoading = false
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      onFileSelect(files)
    }
  }

  return (
    <div 
      className={`file-upload-zone ${isDragOver ? 'drag-over' : ''}`}
      onClick={handleClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{
        border: '2px dashed var(--line)',
        borderRadius: '14px',
        padding: '40px 20px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        background: isDragOver ? 'var(--panel)' : 'transparent',
        borderColor: isDragOver ? 'var(--brand)' : 'var(--line)'
      }}
    >
      {isLoading ? (
        <div>
          <LoadingSpinner size="large" />
          <p style={{ marginTop: '16px', color: 'var(--muted)' }}>
            正在处理图片...
          </p>
        </div>
      ) : (
        <>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>
            📁
          </div>
          <h3 style={{ margin: '0 0 8px 0', color: 'var(--text)' }}>
            拖拽图片到这里
          </h3>
          <p style={{ margin: '0 0 16px 0', color: 'var(--muted)' }}>
            或者点击选择图片文件
          </p>
          <div className="badges" style={{ justifyContent: 'center' }}>
            <div className="badge">支持 JPG、PNG、WebP</div>
            <div className="badge">最大 10MB</div>
          </div>
        </>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}
