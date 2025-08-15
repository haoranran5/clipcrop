import { useState, useCallback, lazy, Suspense } from 'react'
import Cropper from 'react-easy-crop'
import { presets, Preset } from './components/presets'
import { getCroppedImage, readFileAsImage, fixExifOrientation } from './components/utils'
import { saveAs } from 'file-saver'
import AdSense from './components/AdSense'
import ContentSection from './components/ContentSection'
import BlogSection from './components/BlogSection'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'

// 懒加载组件
const PartialCrop = lazy(() => import('./PartialCrop'))

type Format = 'png' | 'jpeg' | 'webp'

export default function App() {
  const [currentPage, setCurrentPage] = useState<'main' | 'partial'>('main')
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
  const [format, setFormat] = useState<Format>('png')
  const [circle, setCircle] = useState(false)
  const [radius, setRadius] = useState(24)
  // @ts-ignore
  const [borderColor, setBorderColor] = useState<string>('#ffffff')
  // @ts-ignore
  const [borderWidth, setBorderWidth] = useState<number>(0)
  const [filters, setFilters] = useState({ brightness: 100, contrast: 100, saturation: 100, grayscale: 0, sepia: 0, blur: 0 })
  // @ts-ignore
  const [showGrid, setShowGrid] = useState(true)
  const [working, setWorking] = useState(false)

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const onFile = async (files: File[]) => {
    try {
      const file = files[0]
      const fixed = await fixExifOrientation(file)
      const url = await readFileAsImage(fixed)
      setImageSrc(url)
    } catch (error) {
      console.error('Failed to load image file:', error)
    }
  }

  const exportImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return
    
    setWorking(true)
    try {
      const blob = await getCroppedImage(imageSrc, croppedAreaPixels, {
        rotation,
        format,
        mask: circle ? 'circle' : 'rect',
        radius,
        borderColor,
        borderWidth,
        filters
      })
      
      saveAs(blob, `clipcrop.${format}`)
    } catch (error) {
      console.error('Failed to export image file:', error)
    } finally {
      setWorking(false)
    }
  }

  const onPresetSelect = (preset: Preset) => {
    setAspect(preset.width / preset.height)
  }

  return (
    <ErrorBoundary>
      <div className="app">
        <header>
        <div className="container">
          <div className="topbar">
            <div className="brand">
              <img src="/icons/favicon-192.png" alt="ClipCrop" width="32" height="32" />
              <h1>ClipCrop</h1>
            </div>
            <nav className="nav-menu">
              <button 
                className={`nav-btn ${currentPage === 'main' ? 'active' : ''}`}
                onClick={() => setCurrentPage('main')}
              >
                Full Image Cropper
              </button>
              <button 
                className={`nav-btn ${currentPage === 'partial' ? 'active' : ''}`}
                onClick={() => setCurrentPage('partial')}
              >
                Partial Image Cropper
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Google AdSense - Top Banner */}
        <AdSense 
          client="ca-pub-3844052645861702"
          slot="1234567890"
          format="auto"
          responsive={true}
        />

        {currentPage === 'main' ? (
          <>
            <div className="canvas-wrap">
              {!imageSrc ? (
                <div className="dropzone">
                  <p>Drag and drop images here or click to browse</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    id="file-input"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const files = e.target.files
                      if (files && files.length > 0) {
                        onFile(Array.from(files))
                      }
                    }}
                  />
                  <button 
                    className="browse-btn"
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    Choose File
                  </button>
                </div>
              ) : (
                <>
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    showGrid={showGrid}
                    objectFit="contain"
                  />
                  

                </>
              )}
            </div>

            <aside>
              <div className="controls">
                <div className="group">
                  <h4>Presets</h4>
                  <div className="preset-grid">
                    {presets.slice(0, 8).map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => onPresetSelect(preset)}
                        className="preset-btn"
                      >
                        {preset.platform} {preset.type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="group">
                  <h4>Crop Settings</h4>
                  <div className="row">
                    <label>Aspect Ratio</label>
                    <select value={aspect || 'custom'} onChange={(e) => setAspect(e.target.value === 'custom' ? undefined : parseFloat(e.target.value))}>
                      <option value="custom">Custom</option>
                      <option value="1">1:1 Square</option>
                      <option value="1.91">1.91:1 Landscape</option>
                      <option value="0.75">4:3 Portrait</option>
                      <option value="1.33">4:3 Landscape</option>
                    </select>
                  </div>
                  <div className="row">
                    <label>Circle Crop</label>
                    <input type="checkbox" checked={circle} onChange={(e) => setCircle(e.target.checked)} />
                  </div>
                  <div className="row">
                    <label>Border Radius</label>
                    <input type="number" value={radius} onChange={(e) => setRadius(parseInt(e.target.value))} min="0" max="100" />
                  </div>
                </div>

                <div className="group">
                  <h4>Effects</h4>
                  <div className="row">
                    <label>Brightness</label>
                    <input type="range" min="0" max="200" value={filters.brightness} onChange={(e) => setFilters({...filters, brightness: parseInt(e.target.value)})} />
                  </div>
                  <div className="row">
                    <label>Contrast</label>
                    <input type="range" min="0" max="200" value={filters.contrast} onChange={(e) => setFilters({...filters, contrast: parseInt(e.target.value)})} />
                  </div>
                  <div className="row">
                    <label>Saturation</label>
                    <input type="range" min="0" max="200" value={filters.saturation} onChange={(e) => setFilters({...filters, saturation: parseInt(e.target.value)})} />
                  </div>
                </div>

                <div className="group">
                  <h4>Export</h4>
                  <div className="row">
                    <label>Format</label>
                    <select value={format} onChange={(e) => setFormat(e.target.value as Format)}>
                      <option value="png">PNG</option>
                      <option value="jpeg">JPEG</option>
                      <option value="webp">WebP</option>
                    </select>
                  </div>
                  <button className="primary" onClick={exportImage} disabled={working || !imageSrc}>
                    {working ? 'Processing...' : 'Export Image'}
                  </button>
                </div>
              </div>
            </aside>
          </>
        ) : (
          <Suspense fallback={<LoadingSpinner text="Loading Partial Cropper..." />}>
            <PartialCrop />
          </Suspense>
        )}

        {/* Google AdSense - Bottom Banner */}
        <AdSense 
          client="ca-pub-3844052645861702"
          slot="0987654321"
          format="auto"
          responsive={true}
        />
      </main>

      {/* 添加有价值的内容区域 */}
      <ContentSection />
      
      {/* 博客文章区域 */}
      <BlogSection />
      
      {/* 页脚 */}
      <Footer />
      </div>
    </ErrorBoundary>
  )
}
