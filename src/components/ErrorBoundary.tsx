import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    
    // 发送错误到分析服务
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false
      })
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

              return (
          <div className="error-boundary">
            <div className="error-content">
              <h2>😔 Something went wrong</h2>
              <p>We're working to fix this issue. Please refresh the page and try again.</p>
              <button 
                onClick={() => window.location.reload()}
                className="retry-btn"
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
