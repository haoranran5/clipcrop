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
    { name: "Avatar Sizes", sizes: [128, 256, 512] },
    { name: "E-commerce Main", sizes: [400, 800, 1200] },
    { name: "Social Media", sizes: [512, 1024, 2048] },
    { name: "High Res Print", sizes: [1500, 3000, 4500] }
  ]

  return (
    <div className="batch-processor">
              <h4>Batch Processing</h4>
        <div className="small">Selected {queue.length} images</div>
      
      {isProcessing && (
        <div className="progress-indicator">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentIndex / (queue.length * 3)) * 100}%` }}
            />
          </div>
          <div className="small">
            Processing... {currentIndex} / {queue.length * 3}
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
