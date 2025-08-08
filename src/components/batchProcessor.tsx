import React from 'react'
import { useTranslation } from 'react-i18next'

interface BatchProcessorProps {
  queue: string[]
  onBatchComplete: (results: any[]) => void
  onProgress: (progress: number) => void
  exportBatchZip: (sizes: number[]) => Promise<void>
  working: boolean
}

export const BatchProcessor: React.FC<BatchProcessorProps> = ({ 
  queue, 
  onBatchComplete, 
  onProgress, 
  exportBatchZip,
  working 
}) => {
  const { t } = useTranslation()
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const processBatch = async (sizes: number[]) => {
    setIsProcessing(true)
    setCurrentIndex(0)
    
    try {
      await exportBatchZip(sizes)
    } catch (error) {
      console.error('Batch processing failed:', error)
    } finally {
      setIsProcessing(false)
      setCurrentIndex(0)
    }
  }

  const batchPresets = [
    { name: "头像尺寸", sizes: [128, 256, 512] },
    { name: "电商主图", sizes: [400, 800, 1200] },
    { name: "社交媒体", sizes: [512, 1024, 2048] },
    { name: "高清打印", sizes: [1500, 3000, 4500] }
  ]

  return (
    <div className="batch-processor">
      <h4>批量处理</h4>
      <div className="small">已选择 {queue.length} 张图片</div>
      
      {isProcessing && (
        <div className="progress-indicator">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentIndex / (queue.length * 3)) * 100}%` }}
            />
          </div>
          <div className="small">
            处理中... {currentIndex} / {queue.length * 3}
          </div>
        </div>
      )}
      
      <div className="batch-actions">
        {batchPresets.map((preset, index) => (
          <button 
            key={index}
            className="ghost" 
            onClick={() => processBatch(preset.sizes)}
            disabled={working || isProcessing}
          >
            {preset.name} ({preset.sizes.join('/')})
          </button>
        ))}
      </div>
    </div>
  )
}
