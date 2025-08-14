import { useState, useRef, useCallback, useEffect } from 'react'

interface CroppedResult {
  dataUrl: string
  name: string
}

export default function PartialCrop() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [croppedResults, setCroppedResults] = useState<CroppedResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [currentHandle, setCurrentHandle] = useState<string | null>(null)
  
  const imageRef = useRef<HTMLImageElement>(null)
  const cropOverlayRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file!')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setImageSrc(result)
      setCroppedResults([])
      setShowResults(false)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const initCropArea = useCallback(() => {
    if (cropOverlayRef.current) {
      cropOverlayRef.current.style.left = '50px'
      cropOverlayRef.current.style.top = '50px'
      cropOverlayRef.current.style.width = '150px'
      cropOverlayRef.current.style.height = '150px'
      cropOverlayRef.current.style.display = 'block'
    }
  }, [])

  const startDrag = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('crop-handle')) return
    setIsDragging(true)
    if (cropOverlayRef.current) {
      const rect = cropOverlayRef.current.getBoundingClientRect()
      setStartX(e.clientX - rect.left)
      setStartY(e.clientY - rect.top)
    }
    e.preventDefault()
  }

  const startResize = (e: React.MouseEvent) => {
    setIsResizing(true)
    const handle = (e.target as HTMLElement).classList[1]
    setCurrentHandle(handle)
    e.preventDefault()
    e.stopPropagation()
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cropOverlayRef.current || !imageRef.current) return

    if (isDragging) {
      const containerRect = imageRef.current.getBoundingClientRect()
      let newLeft = e.clientX - containerRect.left - startX
      let newTop = e.clientY - containerRect.top - startY
      
      newLeft = Math.max(0, Math.min(newLeft, imageRef.current.offsetWidth - cropOverlayRef.current.offsetWidth))
      newTop = Math.max(0, Math.min(newTop, imageRef.current.offsetHeight - cropOverlayRef.current.offsetHeight))
      
      cropOverlayRef.current.style.left = newLeft + 'px'
      cropOverlayRef.current.style.top = newTop + 'px'
    } else if (isResizing) {
      const containerRect = imageRef.current.getBoundingClientRect()
      const x = e.clientX - containerRect.left
      const y = e.clientY - containerRect.top
      resizeCropArea(x, y)
    }
  }, [isDragging, isResizing, startX, startY, currentHandle])

  const resizeCropArea = (x: number, y: number) => {
    if (!cropOverlayRef.current || !imageRef.current) return

    const currentLeft = parseInt(cropOverlayRef.current.style.left)
    const currentTop = parseInt(cropOverlayRef.current.style.top)
    const currentWidth = parseInt(cropOverlayRef.current.style.width)
    const currentHeight = parseInt(cropOverlayRef.current.style.height)

    switch(currentHandle) {
      case 'se':
        cropOverlayRef.current.style.width = Math.min(x - currentLeft, imageRef.current.offsetWidth - currentLeft) + 'px'
        cropOverlayRef.current.style.height = Math.min(y - currentTop, imageRef.current.offsetHeight - currentTop) + 'px'
        break
      case 'nw':
        const newWidth = currentLeft + currentWidth - x
        const newHeight = currentTop + currentHeight - y
        if (x >= 0 && y >= 0 && newWidth > 20 && newHeight > 20) {
          cropOverlayRef.current.style.left = x + 'px'
          cropOverlayRef.current.style.top = y + 'px'
          cropOverlayRef.current.style.width = newWidth + 'px'
          cropOverlayRef.current.style.height = newHeight + 'px'
        }
        break
      case 'ne':
        const newWidth2 = x - currentLeft
        const newHeight2 = currentTop + currentHeight - y
        if (y >= 0 && newWidth2 > 20 && newHeight2 > 20) {
          cropOverlayRef.current.style.top = y + 'px'
          cropOverlayRef.current.style.width = Math.min(newWidth2, imageRef.current.offsetWidth - currentLeft) + 'px'
          cropOverlayRef.current.style.height = newHeight2 + 'px'
        }
        break
      case 'sw':
        const newWidth3 = currentLeft + currentWidth - x
        const newHeight3 = y - currentTop
        if (x >= 0 && newWidth3 > 20 && newHeight3 > 20) {
          cropOverlayRef.current.style.left = x + 'px'
          cropOverlayRef.current.style.width = newWidth3 + 'px'
          cropOverlayRef.current.style.height = Math.min(newHeight3, imageRef.current.offsetHeight - currentTop) + 'px'
        }
        break
    }
  }

  const stopDragResize = useCallback(() => {
    setIsDragging(false)
    setIsResizing(false)
    setCurrentHandle(null)
  }, [])

  const addCrop = () => {
    if (!cropOverlayRef.current || !imageRef.current) return

    const cropWidth = parseInt(cropOverlayRef.current.style.width)
    const cropHeight = parseInt(cropOverlayRef.current.style.height)
    
    if (cropWidth < 20 || cropHeight < 20) {
      alert('Crop area too small, please adjust the selection box!')
      return
    }

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const scaleX = imageRef.current.naturalWidth / imageRef.current.offsetWidth
    const scaleY = imageRef.current.naturalHeight / imageRef.current.offsetHeight
    
    const cropLeft = parseInt(cropOverlayRef.current.style.left) * scaleX
    const cropTop = parseInt(cropOverlayRef.current.style.top) * scaleY
    const scaledCropWidth = cropWidth * scaleX
    const scaledCropHeight = cropHeight * scaleY
    
    canvas.width = scaledCropWidth
    canvas.height = scaledCropHeight
    
    if (imageRef.current.complete && imageRef.current.naturalHeight !== 0) {
      ctx.drawImage(imageRef.current, cropLeft, cropTop, scaledCropWidth, scaledCropHeight, 0, 0, scaledCropWidth, scaledCropHeight)
      
      const croppedDataUrl = canvas.toDataURL('image/png', 1.0)
      
      if (croppedDataUrl && croppedDataUrl.length > 100) {
        const newResult: CroppedResult = {
          dataUrl: croppedDataUrl,
          name: `Walnut_${croppedResults.length + 1}.png`
        }
        setCroppedResults([...croppedResults, newResult])
        alert(`Added ${croppedResults.length + 1} crop area!\nTip: You can continue selecting other walnut areas`)
      } else {
        alert('Crop failed, please try again!')
      }
    } else {
      alert('Image not fully loaded, please wait a moment!')
    }
  }

  const resetCrop = () => {
    if (cropOverlayRef.current) {
      cropOverlayRef.current.style.left = '50px'
      cropOverlayRef.current.style.top = '50px'
      cropOverlayRef.current.style.width = '150px'
      cropOverlayRef.current.style.height = '150px'
    }
  }

  const handleShowResults = () => {
    if (croppedResults.length === 0) {
      alert('Please add some crop areas first!')
      return
    }
    setShowResults(true)
  }

  const downloadSingle = (index: number) => {
    const result = croppedResults[index]
    const link = document.createElement('a')
    link.download = result.name
    link.href = result.dataUrl
    link.style.display = 'none'
    
    document.body.appendChild(link)
    link.click()
    
    setTimeout(() => {
      document.body.removeChild(link)
    }, 100)
  }

  const downloadAll = () => {
    if (croppedResults.length === 0) {
      alert('No images to download!')
      return
    }

    let downloadCount = 0
    
    const downloadNext = () => {
      if (downloadCount >= croppedResults.length) {
        alert(`Successfully downloaded ${croppedResults.length} images!`)
        return
      }
      
      const result = croppedResults[downloadCount]
      const link = document.createElement('a')
      link.download = result.name
      link.href = result.dataUrl
      link.style.display = 'none'
      
      document.body.appendChild(link)
      link.click()
      
      setTimeout(() => {
        document.body.removeChild(link)
        downloadCount++
        downloadNext()
      }, 500)
    }
    
    downloadNext()
  }

  const backToEdit = () => {
    setShowResults(false)
  }

  // Add event listeners when image loads
  useEffect(() => {
    if (imageSrc) {
      setTimeout(initCropArea, 100)
    }
  }, [imageSrc, initCropArea])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', stopDragResize)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', stopDragResize)
    }
  }, [handleMouseMove, stopDragResize])

  return (
    <div className="walnut-cropper">
      <div className="container">
        <div className="header">
          <h1>🥜 Walnut Image Cropper</h1>
          <p>Easily crop multiple walnut images into individual files</p>
        </div>

        <div className="instructions">
          <h4>📖 Instructions:</h4>
          <ul>
            <li>Click the upload area to select your walnut image</li>
            <li>Drag on the image to select the area to crop</li>
            <li>You can adjust the selection box size and position</li>
            <li>Click "Add Crop" to save the current selection</li>
            <li>Repeat the operation to crop multiple walnuts</li>
            <li>Finally download all crop results in batch</li>
          </ul>
        </div>

        {!imageSrc && (
          <div className="upload-section">
            <div 
              className="upload-area" 
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="upload-icon">📸</div>
              <div className="upload-text">Click to select image or drag here</div>
              <div className="upload-hint">Supports JPG, PNG, GIF formats</div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </div>
        )}

        {imageSrc && !showResults && (
          <div className="crop-section">
            <div className="image-container">
              <img 
                ref={imageRef}
                src={imageSrc} 
                alt="Original"
                onLoad={initCropArea}
              />
              <div 
                ref={cropOverlayRef}
                className="crop-overlay"
                onMouseDown={startDrag}
              >
                <div className="crop-handle nw" onMouseDown={startResize}></div>
                <div className="crop-handle ne" onMouseDown={startResize}></div>
                <div className="crop-handle sw" onMouseDown={startResize}></div>
                <div className="crop-handle se" onMouseDown={startResize}></div>
              </div>
            </div>
            <div className="controls">
              <button className="btn" onClick={addCrop}>➕ Add Crop</button>
              <button className="btn secondary" onClick={resetCrop}>🔄 Reset Selection</button>
              <button className="btn secondary" onClick={handleShowResults}>📋 View Results</button>
            </div>
          </div>
        )}

        {showResults && (
          <div className="results">
            <h3>🎉 Crop Results</h3>
            <div className="cropped-images">
              {croppedResults.map((result, index) => (
                <div key={index} className="cropped-item">
                  <img src={result.dataUrl} alt={result.name} />
                  <div>{result.name}</div>
                  <button className="download-btn" onClick={() => downloadSingle(index)}>
                    📥 Download
                  </button>
                </div>
              ))}
            </div>
            <div className="controls">
              <button className="btn" onClick={downloadAll}>📥 Download All</button>
              <button className="btn secondary" onClick={backToEdit}>↩️ Continue Editing</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
