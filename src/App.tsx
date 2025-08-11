
import React, { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import { presets, Preset } from './components/presets'
import { getCroppedImage, readFileAsImage, fixExifOrientation, simpleSaliencyCenter } from './components/utils'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { useTranslation } from 'react-i18next'
import { GridOverlay } from './components/overlay'
import SocialPreview from './components/socialPreview'
import { ThemeToggle } from './components/themeToggle'
import { BatchProcessor } from './components/batchProcessor'
import { PresetCategories } from './components/presetCategories'
import { MobileOptimizer, useIsMobile } from './components/mobileOptimizer'
import { LoadingSpinner, ProgressBar, Toast, FileUploadZone } from './components/loadingStates'
import { UserGuide, ErrorBoundary, FileValidator, KeyboardShortcuts } from './components/userGuide'
import i18n from './i18n/setup'

type Format = 'png' | 'jpeg' | 'webp'

export default function App() {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
  const [format, setFormat] = useState<Format>('png')
  const [filePrefix, setFilePrefix] = useState('clipcrop')
  const [lastPreset, setLastPreset] = useState<string>('custom')

  const [circle, setCircle] = useState(false)
  const [mask, setMask] = useState<'rect'|'roundRect'|'circle'>('rect')
  const [diameter, setDiameter] = useState<number | ''>('')
  const [radius, setRadius] = useState(24)
  const [borderColor, setBorderColor] = useState<string>('#ffffff')
  const [borderWidth, setBorderWidth] = useState<number>(0)
  const [pad, setPad] = useState(0)
  const [bg, setBg] = useState<string | null>(null)
  const [shadow, setShadow] = useState({ enable:false, color:'#00000055', blur:24, offsetX:0, offsetY:8 })
  const [filters, setFilters] = useState({ brightness:100, contrast:100, saturation:100, grayscale:0, sepia:0, blur:0 })
  const [feather, setFeather] = useState(0)

  const [wmText, setWmText] = useState({ enable:false, text:'', color:'#ffffffaa', font:'24px sans-serif', x:24, y:48 })
  const [wmLogo, setWmLogo] = useState<{enable:boolean, src?:string, img?:HTMLImageElement, alpha:number, x:number, y:number, w:number, h:number}>({ enable:false, alpha:0.8, x:16, y:16, w:128, h:128 })

  const [showR3, setShowR3] = useState(true)
  const [showGolden, setShowGolden] = useState(true)
  const [showGrid, setShowGrid] = useState(false)
  const [showCenter, setShowCenter] = useState(false)
  const [progress, setProgress] = useState(0)
  const [working, setWorking] = useState(false)

  const [queue, setQueue] = useState<string[]>([])
  const [activeIdx, setActiveIdx] = useState(0)
  const [showHelp, setShowHelp] = useState(false)
  const [showUserGuide, setShowUserGuide] = useState(false)
  const [batchProgress, setBatchProgress] = useState<{done:number,total:number}|null>(null)
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info' | 'warning'} | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Load settings
  React.useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem('clipcrop_settings') || '{}')
      if (s) {
        s.aspect !== undefined && setAspect(s.aspect)
        s.circle !== undefined && setCircle(s.circle)
        s.radius !== undefined && setRadius(s.radius)
        s.borderColor && setBorderColor(s.borderColor)
        s.borderWidth !== undefined && setBorderWidth(s.borderWidth)
        s.pad !== undefined && setPad(s.pad)
        s.bg !== undefined && setBg(s.bg)
        s.filters && setFilters(s.filters)
        s.feather !== undefined && setFeather(s.feather)
        s.format && setFormat(s.format)
        s.filePrefix && setFilePrefix(s.filePrefix)
      }
    } catch {}
  }, [])

  // Save settings
  React.useEffect(() => {
    const s = { aspect, circle, radius, borderColor, borderWidth, pad, bg, filters, feather, format, filePrefix }
    localStorage.setItem('clipcrop_settings', JSON.stringify(s))
  }, [aspect, circle, radius, borderColor, borderWidth, pad, bg, filters, feather, format, filePrefix])

  // Paste handler
  React.useEffect(() => {
    const onPaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return
      const imgs: File[] = []
      for (const it of items as any) {
        if (it.kind === 'file' && it.type.startsWith('image/')) {
          imgs.push(it.getAsFile())
        }
      }
      if (imgs.length) {
        const urls: string[] = []
        for (const f of imgs) { const fixed = await fixExifOrientation(f as File); urls.push(await readFileAsImage(fixed)) }
        setQueue(urls); setActiveIdx(0); setImageSrc(urls[0])
      }
    }
    window.addEventListener('paste', onPaste as any)
    return () => window.removeEventListener('paste', onPaste as any)
  }, [])


  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '?') setShowHelp(s => !s)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); exportImage() }
      if (e.key === 'Escape') { 
        setShowHelp(false)
        setShowUserGuide(false)
      }
      if (e.key === 'Delete' && queue.length > 1) {
        const newQueue = queue.filter((_, i) => i !== activeIdx)
        setQueue(newQueue)
        if (activeIdx >= newQueue.length) setActiveIdx(Math.max(0, newQueue.length - 1))
        setImageSrc(newQueue[Math.max(0, newQueue.length - 1)] || null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [queue, activeIdx])

  // 语言切换处理
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
    const currentPath = window.location.pathname
    const newPath = `/${lang}${currentPath.includes('/zh') || currentPath.includes('/en') || currentPath.includes('/es') ? currentPath.substring(3) : ''}`
    window.history.pushState(null, '', newPath)
  }

  const onCropComplete = useCallback((_c:any, pixels:any) => setCroppedAreaPixels(pixels), [])

  const onFile = async (files: File[]) => {
    setIsLoading(true)
    try {
      const imageFiles = files.filter(f => f.type.startsWith('image/'))
      if (!imageFiles.length) {
        setToast({ message: '请选择图片文件', type: 'error' })
        return
      }
      
      const urls: string[] = []
      for (const f of imageFiles) { 
        const fixed = await fixExifOrientation(f as File); 
        urls.push(await readFileAsImage(fixed)) 
      }
      setQueue(urls); 
      setActiveIdx(0); 
      setImageSrc(urls[0])
      setToast({ message: `成功加载 ${urls.length} 张图片`, type: 'success' })
    } catch (error) {
      setToast({ message: '图片加载失败，请重试', type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const preventDefaults = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation() }
  
  const onDragOver = (e: React.DragEvent) => {
    preventDefaults(e)
    setIsDragOver(true)
  }
  
  const onDragLeave = (e: React.DragEvent) => {
    preventDefaults(e)
    setIsDragOver(false)
  }
  
  const onDrop = useCallback(async (e: React.DragEvent) => {
    preventDefaults(e)
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files || [])
    await onFile(files)
  }, [])

  const exportImage = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) {
      setToast({ message: '请先选择图片', type: 'warning' })
      return
    }
    
    setWorking(true)
    try {
      const outSize = diameter ? Number(diameter) : undefined
      const opts:any = {
        rotation, format, quality: 0.92,
        mask: circle ? 'circle' : (mask),
        radius,
        outSize,
        borderColor, borderWidth,
        padding: pad,
        background: bg,
        shadow: shadow.enable ? { color: shadow.color, blur: shadow.blur, offsetX: shadow.offsetX, offsetY: shadow.offsetY } : null,
        watermarkText: wmText.enable && wmText.text ? { text: wmText.text, font: wmText.font, color: wmText.color, alpha: 1, x: wmText.x, y: wmText.y } : null,
        watermarkImage: wmLogo.enable && wmLogo.img ? { img: wmLogo.img, alpha: wmLogo.alpha, x: wmLogo.x, y: wmLogo.y, width: wmLogo.w, height: wmLogo.h } : null,
        filters, feather
      }
      let blob: Blob
      try {
        blob = await getCroppedImage(imageSrc, croppedAreaPixels, opts)
      } catch (e) {
        // fallback: remove feather/filters/shadow if any issue
        const fallback = { ...opts, feather: 0, filters: null, shadow: null }
        blob = await getCroppedImage(imageSrc, croppedAreaPixels, fallback)
      }
      const ext = (opts.mask !== 'rect' && format === 'jpeg') ? 'png' : (format === 'jpeg' ? 'jpg' : format)
      const ts = Date.now()
      saveAs(blob, `${filePrefix}-${lastPreset}-${ext === 'jpg' ? 'jpeg' : ext}-${ts}.${ext}`)
      setToast({ message: '图片导出成功！', type: 'success' })
    } catch (error) {
      setToast({ message: '导出失败，请重试', type: 'error' })
    } finally {
      setWorking(false)
    }
  }, [imageSrc, croppedAreaPixels, rotation, format, circle, mask, radius, diameter, borderColor, borderWidth, pad, bg, shadow, wmText, wmLogo, filters, feather])

  const exportBatchZip = useCallback(async (sizes: number[]) => {
    if (!queue.length || !croppedAreaPixels) return
    // Use Worker if supported
    const useWorker = typeof Worker !== 'undefined'
    let results: { name:string; buf:ArrayBuffer }[] = []
    if (useWorker) {
      const worker = new Worker(new URL('./worker/exportWorker.ts', import.meta.url), { type: 'module' })
      const tasks:any[] = []
      let id = 1
      for (let qi=0; qi<queue.length; qi++) {
        const src = queue[qi]
        for (const size of sizes) {
          const opts:any = {
            rotation, format, quality: 0.92,
            mask: circle ? 'circle' : (mask),
            radius,
            outSize: size,
            borderColor, borderWidth,
            padding: pad,
            background: bg,
            // worker ignores filters/feather/shadow for speed
          }
          tasks.push({ id: id++, imageSrc: src, pixelCrop: croppedAreaPixels, opts, size })
        }
      }
      const donePromise = new Promise<any>((resolve) => {
        worker.onmessage = (ev:any) => {
          const data = ev.data
          if (data.type === 'progress') setBatchProgress({done: data.done, total: data.total})
          if (data.type === 'done') resolve(data.results)
        }
      })
      worker.postMessage({ tasks })
      const workerResults = await donePromise as any[]
      results = workerResults.filter(r=>r.ok).map((r, idx) => {
        const ts = Date.now()
        const size = tasks[idx].size
        const ext = (tasks[idx].opts.mask !== 'rect' && format === 'jpeg') ? 'png' : (format === 'jpeg' ? 'jpg' : format)
        const name = `${filePrefix}-${lastPreset}-${size}-${ts}.${ext}`
        return { name, buf: r.data as ArrayBuffer }
      })
      worker.terminate()
      setBatchProgress(null)
    } else {
      // Fallback to main thread (previous logic)
      const JSZip = (await import('jszip')).default
      const zip = new JSZip()
      for (let qi=0; qi<queue.length; qi++) {
        const src = queue[qi]
        for (const size of sizes) {
          let blob: Blob
          try {
            const opts:any = {
              rotation, format, quality: 0.92,
              mask: circle ? 'circle' : (mask),
              radius,
              outSize: size,
              borderColor, borderWidth,
              padding: pad,
              background: bg,
              filters, feather
            }
            const b = await getCroppedImage(src, croppedAreaPixels, opts)
            blob = b
          } catch (e) {
            const fallback:any = { rotation, format, quality:0.92, mask: circle ? 'circle' : (mask), radius, outSize: size, borderColor, borderWidth, padding: pad, background: bg }
            blob = await getCroppedImage(src, croppedAreaPixels, fallback)
          }
          const arr = await blob.arrayBuffer()
          const ts = Date.now()
          const ext = (mask !== 'rect' && format === 'jpeg') ? 'png' : (format === 'jpeg' ? 'jpg' : format)
          zip.file(`${filePrefix}-${lastPreset}-${size}-${ts}.${ext}`, arr)
        }
      }
      const zipBlob = await zip.generateAsync({type:'blob'})
      return saveAs(zipBlob, 'clipcrop-batch.zip')
    }
    // Build ZIP from worker results
    const { default: JSZip } = await import('jszip')
    const zip = new JSZip()
    for (const r of results) zip.file(r.name, r.buf)
    const blob = await zip.generateAsync({ type:'blob' })
    saveAs(blob, 'clipcrop-batch.zip')
  }, [queue, croppedAreaPixels, rotation, format, circle, mask, radius, borderColor, borderWidth, pad, bg, filters, feather, filePrefix, lastPreset])

  async function autoSubjectCenter() {
    if (!imageSrc) return
    let cx = 0.5, cy = 0.5
    const anyWin = window as any
    if (anyWin.FaceDetector) {
      try {
        const img = new Image(); img.src = imageSrc; await new Promise(res => img.onload = res)
        const fd = new anyWin.FaceDetector({ fastMode: true, maxDetectedFaces: 1 })
        const faces = await fd.detect(img)
        if (faces?.length) { const f=faces[0].boundingBox; cx=(f.x+f.width/2)/img.width; cy=(f.y+f.height/2)/img.height }
      } catch {}
    }
    if (cx===0.5 && cy===0.5) {
      try {
        const s = await simpleSaliencyCenter(imageSrc); const img = new Image(); img.src=imageSrc; await new Promise(res => img.onload = res)
        cx = s.cx / img.width; cy = s.cy / img.height
      } catch {}
    }
    setCrop({ x: (cx - 0.5)*100, y: (cy - 0.5)*100 })
  }

  return (
    <ErrorBoundary>
      <MobileOptimizer>
        <div className={isMobile ? 'mobile-layout' : ''}>
      <header>
        <div className="container topbar">
          <div className="brand">
            <img src="/icons/favicon-192.png" width="24" height="24" alt="ClipCrop"/>
            <h1>{t('title')}</h1>
          </div>
          <div className="langs">
            <ThemeToggle />
            <button className="ghost" onClick={() => setShowUserGuide(true)} title="使用指南">📖</button>
            <button className="ghost" onClick={() => handleLanguageChange('en')}>EN</button>
            <button className="ghost" onClick={() => handleLanguageChange('zh')}>中文</button>
            <button className="ghost" onClick={() => handleLanguageChange('es')}>ES</button>
          </div>
        </div>
      </header>

      <main onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}>
        <section className="canvas-wrap" style={{filter:`brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) grayscale(${filters.grayscale}%) sepia(${filters.sepia}%) blur(${filters.blur}px)`}} onClick={(e)=>{
          const r=(e.target as HTMLElement).getBoundingClientRect();
          if (wmText.enable) setWmText({...wmText, x: Math.round(e.clientX - r.left), y: Math.round(e.clientY - r.top)})
          if (wmLogo.enable) setWmLogo({...wmLogo, x: Math.round(e.clientX - r.left), y: Math.round(e.clientY - r.top)})
        }}>
          {!imageSrc ? (
            <FileUploadZone
              onFileSelect={onFile}
              isDragOver={isDragOver}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              isLoading={isLoading}
            />
          ) : (
            <>
              <GridOverlay 
                showRuleOfThirds={showR3} 
                showGolden={showGolden} 
                showCircle={circle}
                showGrid={showGrid}
                showCenter={showCenter}
              />
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={circle ? 1 : aspect}
                cropShape={circle ? 'round' : 'rect'}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onZoomChange={setZoom}
                onCropComplete={(_c, pixels)=>setCroppedAreaPixels(pixels)}
                showGrid={false}
              />
            </>
          )}
        </section>

        <aside className="controls">
          {batchProgress && (<div className="group"><h4>Batch progress</h4><div className="small">{batchProgress.done} / {batchProgress.total}</div></div>)}
          <div className="group">
            <h4>{t('presets')}</h4>
            <div className="small">Click to set canvas aspect</div>
            <PresetCategories 
              onPresetSelect={(preset: Preset) => {
                setAspect(preset.width/preset.height)
                setCircle(false)
                setLastPreset(`${preset.platform}-${preset.type}`)
              }}
              selectedPreset={lastPreset}
            />
          </div>

          {batchProgress && (<div className="group"><h4>Batch progress</h4><div className="small">{batchProgress.done} / {batchProgress.total}</div></div>)}
          <div className="group">
            <h4>{t('adjust')}</h4>
            <label className="row"><span>{t('zoom')}</span><input type="range" min={1} max={5} step={0.01} value={zoom} onChange={e=>setZoom(parseFloat(e.target.value))} /></label>
            <label className="row"><span>{t('rotation')}</span><input type="range" min={-180} max={180} step={1} value={rotation} onChange={e=>setRotation(parseInt(e.target.value))} /></label>
            <label className="row"><span>{t('ratio')}</span>
              <select value={circle ? 'circle' : (aspect || 'free')} onChange={e=>{
                const v = e.target.value
                if (v === 'circle') { setCircle(true); setAspect(1) }
                else if (v === 'free') { setCircle(false); setAspect(undefined) }
                else { setCircle(false); setAspect(parseFloat(v)) }
              }}>
                <option value="free">{t('free')}</option>
                <option value="1">1:1</option>
                <option value={16/9}>16:9</option>
                <option value={4/3}>4:3</option>
                <option value={3/4}>3:4</option>
                <option value="circle">◯ Circle</option>
              </select>
            </label>
          </div>

          {batchProgress && (<div className="group"><h4>Batch progress</h4><div className="small">{batchProgress.done} / {batchProgress.total}</div></div>)}
          <div className="group">
            <h4>{t('filters')}</h4>
            <label className="row"><span>Brightness</span><input type="range" min={50} max={150} value={filters.brightness} onChange={e=>setFilters({...filters, brightness: parseInt(e.target.value)})}/></label>
            <label className="row"><span>Contrast</span><input type="range" min={50} max={150} value={filters.contrast} onChange={e=>setFilters({...filters, contrast: parseInt(e.target.value)})}/></label>
            <label className="row"><span>Saturation</span><input type="range" min={0} max={200} value={filters.saturation} onChange={e=>setFilters({...filters, saturation: parseInt(e.target.value)})}/></label>
            <label className="row"><span>Grayscale</span><input type="range" min={0} max={100} value={filters.grayscale} onChange={e=>setFilters({...filters, grayscale: parseInt(e.target.value)})}/></label>
            <label className="row"><span>Sepia</span><input type="range" min={0} max={100} value={filters.sepia} onChange={e=>setFilters({...filters, sepia: parseInt(e.target.value)})}/></label>
            <label className="row"><span>Blur</span><input type="range" min={0} max={12} value={filters.blur} onChange={e=>setFilters({...filters, blur: parseInt(e.target.value)})}/></label>
            <div style={{display:'flex', gap:6, flexWrap:'wrap', marginTop:6}}>
              <button className="ghost" onClick={()=>setFilters({brightness:100,contrast:100,saturation:100,grayscale:0,sepia:0,blur:0})}>Neutral</button>
              <button className="ghost" onClick={()=>setFilters({brightness:110,contrast:110,saturation:120,grayscale:0,sepia:0,blur:0})}>Vibrant</button>
              <button className="ghost" onClick={()=>setFilters({brightness:95,contrast:120,saturation:0,grayscale:100,sepia:0,blur:0})}>B&W</button>
              <button className="ghost" onClick={()=>setFilters({brightness:105,contrast:110,saturation:90,grayscale:0,sepia:30,blur:0})}>Film</button>
            </div>
          </div>

          {batchProgress && (<div className="group"><h4>Batch progress</h4><div className="small">{batchProgress.done} / {batchProgress.total}</div></div>)}
          <div className="group">
            <h4>{t('export')}</h4>
            <label className="row"><span>{t('format')}</span>
              <select value={format} onChange={e=>setFormat(e.target.value as any)}>
                <option value="png">PNG</option>
                <option value="jpeg">JPG</option>
                <option value="webp">WebP</option>
              </select>
            </label>
            <label className="row"><span>{t('diameter')}</span><input type="number" min={16} max={4096} placeholder="auto" value={diameter as any} onChange={e => setDiameter(e.target.value ? Number(e.target.value) : '')} /></label>
            {(circle || mask==='roundRect') && (
              <label className="row"><span>{t('borderColor')}</span><input type="color" value={borderColor} onChange={e => setBorderColor((e.target as any).value)} /></label>
            )}
            {(circle || mask==='roundRect') && (
              <label className="row"><span>{t('borderWidth')}</span><input type="number" min={0} max={200} value={borderWidth} onChange={e => setBorderWidth(parseInt((e.target as any).value || '0'))} /></label>
            )}
            <label className="row"><span>{t('radius')}</span><input type="range" min={0} max={128} value={radius} onChange={e=>setRadius(parseInt(e.target.value))} /></label>
            <label className="row"><span>{t('padding')}</span><input type="number" min={0} max={512} value={pad} onChange={e=>setPad(parseInt(e.target.value||'0'))} /></label>
            <label className="row"><span>{t('background')}</span><input type="color" value={bg || '#000000'} onChange={e=>setBg((e.target as any).value)} /></label>
            <label className="row"><span>Feather</span><input type="range" min={0} max={40} value={feather} onChange={e=>setFeather(parseInt(e.target.value))} /></label>
            <label className="row"><span>{t('shadow')}</span><input type="checkbox" checked={shadow.enable} onChange={e=>setShadow({...shadow, enable:e.target.checked})} /></label>
            <label className="row"><span>File name</span><input type="text" value={filePrefix} onChange={e=>setFilePrefix(e.target.value)} /></label>
            <div style={{display:'flex', gap:8, flexWrap:'wrap', alignItems:'center'}}>
              <button className="primary" onClick={exportImage} disabled={working}>{t('download')}</button>
              <button className="ghost" onClick={autoSubjectCenter} disabled={working}>{t('autoFace')}</button>
              {working && <div className='small'>Generating… {Math.round(progress*100)}%</div>}
            </div>
            
            {queue.length > 0 && (
              <BatchProcessor
                queue={queue}
                onBatchComplete={() => {}}
                onProgress={setProgress}
                exportBatchZip={exportBatchZip}
                working={working}
              />
            )}
          </div>

          {batchProgress && (<div className="group"><h4>Batch progress</h4><div className="small">{batchProgress.done} / {batchProgress.total}</div></div>)}
          <div className="group">
            <h4>{t('overlay')}</h4>
            <label className="row"><span>三分法</span><input type="checkbox" checked={showR3} onChange={e=>setShowR3(e.target.checked)} /></label>
            <label className="row"><span>黄金比例</span><input type="checkbox" checked={showGolden} onChange={e=>setShowGolden(e.target.checked)} /></label>
            <label className="row"><span>密集网格</span><input type="checkbox" checked={showGrid} onChange={e=>setShowGrid(e.target.checked)} /></label>
            <label className="row"><span>中心十字</span><input type="checkbox" checked={showCenter} onChange={e=>setShowCenter(e.target.checked)} /></label>
          </div>

          {queue.length>1 && (
            <div className="group">
                <h4>{t('queue')}</h4>
                <div className="small">Images: {queue.length}</div>
                <div style={{display:'flex', gap:8}}>
                  <button className="ghost" onClick={()=>{ const i=Math.max(0, activeIdx-1); setActiveIdx(i); setImageSrc(queue[i])}}>{t('prev')}</button>
                  <button className="ghost" onClick={()=>{ const i=Math.min(queue.length-1, activeIdx+1); setActiveIdx(i); setImageSrc(queue[i])}}>{t('next')}</button>
                </div>
              </div>
          )}

          <SocialPreview src={imageSrc} />
        </aside>
      </main>

      {showHelp && (
        <KeyboardShortcuts isVisible={showHelp} onClose={() => setShowHelp(false)} />
      )}
      
      {showUserGuide && (
        <UserGuide isVisible={showUserGuide} onClose={() => setShowUserGuide(false)} />
      )}
      
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <footer className="container">
        <div className="badges">
          <div className="badge">ClipCrop</div>
          <div className="badge">{t('features')}</div>
          <div className="badge">{t('seo_badges')}</div>
        </div>
              </footer>
      </div>
      </MobileOptimizer>
    </ErrorBoundary>
  )
}
