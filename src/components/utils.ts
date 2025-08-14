
export async function readFileAsImage(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
export async function fixExifOrientation(file: File): Promise<Blob> {
  // Try modern path: createImageBitmap honors EXIF with imageOrientation:'from-image'
  try {
    // @ts-ignore
    const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' })
    const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height
    const ctx = c.getContext('2d')!; ctx.drawImage(bmp, 0, 0)
    const blob: Blob = await new Promise(res => c.toBlob(b => res(b!), file.type || 'image/png', 0.92))
    return blob
  } catch {
    // Fallback: return original; most modern browsers already render EXIF correctly in <img>
    return file
  }
}
type Mask = 'rect' | 'roundRect' | 'circle'
export type ExportOptions = {
  rotation?: number; format?: 'png'|'jpeg'|'webp'; quality?: number;
  mask?: Mask; radius?: number; outSize?: number; borderColor?: string; borderWidth?: number;
  padding?: number; background?: string | null;
  shadow?: { color: string, blur: number, offsetX: number, offsetY: number } | null;
  filters?: { brightness:number, contrast:number, saturation:number, grayscale:number, sepia:number, blur:number } | null;
  feather?: number;
}

export async function getCroppedImage(imageSrc:string, pixelCrop:{x:number;y:number;width:number;height:number}, opts:ExportOptions={}):Promise<Blob>{
  const { rotation=0, format='png', quality=0.92, mask='rect', radius=24, outSize: _outSize, borderColor, borderWidth,
    padding=0, background=null, shadow: _shadow, filters=null, feather=0 } = opts
  const image = await createImage(imageSrc)
  const safeArea = Math.max(image.width, image.height) * 1.5
  const stage = document.createElement('canvas'); stage.width = safeArea; stage.height = safeArea
  const sctx = stage.getContext('2d')!; sctx.translate(safeArea/2, safeArea/2); sctx.rotate((rotation*Math.PI)/180); sctx.translate(-safeArea/2, -safeArea/2)
  sctx.drawImage(image, (safeArea-image.width)/2, (safeArea-image.height)/2)
  const data = sctx.getImageData(0,0,safeArea,safeArea)
  const cw = Math.round(pixelCrop.width + padding*2), ch = Math.round(pixelCrop.height + padding*2)
  const cropCanvas = document.createElement('canvas'); cropCanvas.width = cw; cropCanvas.height = ch
  const cctx = cropCanvas.getContext('2d')!; background ? (cctx.fillStyle=background, cctx.fillRect(0,0,cw,ch)) : cctx.clearRect(0,0,cw,ch)
  cctx.putImageData(data, Math.round(-(safeArea/2) + image.width/2 - (pixelCrop.x - padding)), Math.round(-(safeArea/2) + image.height/2 - (pixelCrop.y - padding)))
  let ow=cw, oh=ch; if (mask==='circle') { const side=Math.min(cw,ch); ow=side; oh=side }
  let outCanvas = document.createElement('canvas'); outCanvas.width=ow; outCanvas.height=oh
  const octx = outCanvas.getContext('2d')!; background ? (octx.fillStyle=background, octx.fillRect(0,0,ow,oh)) : octx.clearRect(0,0,ow,oh)
  if (filters) octx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) grayscale(${filters.grayscale}%) sepia(${filters.sepia}%) blur(${filters.blur}px)`
  octx.save()
  if (mask==='circle') { const side=Math.min(cw,ch); octx.beginPath(); octx.arc(ow/2,oh/2,side/2,0,Math.PI*2); octx.closePath(); octx.clip(); octx.drawImage(cropCanvas, Math.floor((cw-ow)/2)*-1, Math.floor((ch-oh)/2)*-1) }
  else if (mask==='roundRect') { roundRect(octx,0,0,ow,oh,radius); octx.clip(); octx.drawImage(cropCanvas,0,0,ow,oh) }
  else { octx.drawImage(cropCanvas,0,0,ow,oh) }
  octx.restore()
  if (feather && feather>0 && (mask==='circle'||mask==='roundRect')) {
    const alphaMask = document.createElement('canvas'); alphaMask.width=ow; alphaMask.height=oh; const mctx = alphaMask.getContext('2d')!
    if (mask==='circle'){ mctx.beginPath(); mctx.arc(ow/2,oh/2,Math.min(ow,oh)/2 - feather/2,0,Math.PI*2); mctx.closePath(); mctx.fillStyle='#000'; mctx.fill() }
    else { roundRect(mctx,feather/2,feather/2,ow-feather,oh-feather,Math.max(0,radius-feather/2)); mctx.fillStyle='#000'; mctx.fill() }
    mctx.filter = `blur(${feather}px)`; mctx.drawImage(alphaMask,0,0)
    octx.save(); octx.globalCompositeOperation='destination-in'; octx.drawImage(alphaMask,0,0); octx.restore()
  }
  if ((mask==='roundRect'||mask==='circle') && borderWidth && borderWidth>0) {
    octx.save(); octx.lineWidth=borderWidth; octx.strokeStyle=borderColor||'#fff'
    if (mask==='circle'){ const r=Math.min(ow,oh)/2 - borderWidth/2; octx.beginPath(); octx.arc(ow/2,oh/2,r,0,Math.PI*2); octx.stroke() }
    else { roundRect(octx,borderWidth/2,borderWidth/2,ow-borderWidth,oh-borderWidth,Math.max(0,radius-borderWidth/2)); octx.stroke() }
    octx.restore()
  }
  const finalFormat = (mask!=='rect' && format==='jpeg') ? 'png' : format
  const blob:Blob = await new Promise(res => outCanvas.toBlob(b => res(b!), 'image/' + (finalFormat==='jpeg'?'jpeg':finalFormat), quality))
  return blob
}
export async function simpleSaliencyCenter(imageSrc:string):Promise<{cx:number, cy:number}>{
  const img = await createImage(imageSrc); const c=document.createElement('canvas'); c.width=img.width; c.height=img.height
  const ctx=c.getContext('2d')!; ctx.drawImage(img,0,0); const d=ctx.getImageData(0,0,c.width,c.height).data
  let sumX=0,sumY=0,weight=0; for (let y=1;y<c.height-1;y+=2){ for (let x=1;x<c.width-1;x+=2){ const i=(y*c.width+x)*4
    const lum=.2126*d[i]+.7152*d[i+1]+.0722*d[i+2]; const lumR=.2126*d[i+4]+.7152*d[i+5]+.0722*d[i+6]; const lumD=.2126*d[i+c.width*4]+.7152*d[i+c.width*4+1]+.0722*d[i+c.width*4+2]
    const mag=Math.abs(lum-lumR)+Math.abs(lum-lumD); sumX+=x*mag; sumY+=y*mag; weight+=mag } }
  const cx=weight?sumX/weight:c.width/2, cy=weight?sumY/weight:c.height/2; return {cx,cy}
}
function roundRect(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number,r:number){ const rr=Math.min(r,Math.min(w,h)/2); ctx.beginPath(); ctx.moveTo(x+rr,y); ctx.arcTo(x+w,y,x+w,y+h,rr); ctx.arcTo(x+w,y+h,x,y+h,rr); ctx.arcTo(x,y+h,x,y,rr); ctx.arcTo(x,y,x+w,y,rr); ctx.closePath() }
function createImage(url:string):Promise<HTMLImageElement>{ return new Promise((resolve,reject)=>{ const img=new Image(); img.crossOrigin='anonymous'; img.onload=()=>resolve(img); img.onerror=reject; img.src=url }) }
