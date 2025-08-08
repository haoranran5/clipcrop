
// Minimal crop routine in Worker (no external DOM libs).
// Uses OffscreenCanvas+createImageBitmap; falls back to simple canvas if needed.

export type WorkerTask = {
  id: number
  imageSrc: string
  pixelCrop: { x:number; y:number; width:number; height:number }
  opts: any
  size?: number
}

function roundRect(ctx: OffscreenCanvasRenderingContext2D, x:number,y:number,w:number,h:number,r:number){
  const rr = Math.min(r, Math.min(w,h)/2)
  ctx.beginPath()
  ctx.moveTo(x+rr, y)
  ctx.arcTo(x+w, y, x+w, y+h, rr)
  ctx.arcTo(x+w, y+h, x, y+h, rr)
  ctx.arcTo(x, y+h, x, y, rr)
  ctx.arcTo(x, y, x+w, y, rr)
  ctx.closePath()
}

async function getBitmap(src: string): Promise<ImageBitmap> {
  const res = await fetch(src)
  const blob = await res.blob()
  // @ts-ignore
  return await createImageBitmap(blob, { imageOrientation: 'from-image' })
}

export async function processTask(t: WorkerTask): Promise<Blob> {
  const { imageSrc, pixelCrop, opts } = t
  const bmp = await getBitmap(imageSrc)
  const safe = Math.max(bmp.width, bmp.height) * 1.5
  const stage = new OffscreenCanvas(safe, safe)
  const sctx = stage.getContext('2d')!
  sctx.translate(safe/2, safe/2)
  sctx.rotate(((opts.rotation||0) * Math.PI)/180)
  sctx.translate(-safe/2, -safe/2)
  sctx.drawImage(bmp, (safe-bmp.width)/2, (safe-bmp.height)/2)
  const data = sctx.getImageData(0,0,safe,safe)

  const padding = opts.padding || 0
  const cw = Math.round(pixelCrop.width + padding*2)
  const ch = Math.round(pixelCrop.height + padding*2)

  const crop = new OffscreenCanvas(cw, ch)
  const cctx = crop.getContext('2d')!
  if (opts.background) { cctx.fillStyle = opts.background; cctx.fillRect(0,0,cw,ch) } else { cctx.clearRect(0,0,cw,ch) }
  cctx.putImageData(data, Math.round(-(safe/2) + bmp.width/2 - (pixelCrop.x - padding)), Math.round(-(safe/2) + bmp.height/2 - (pixelCrop.y - padding)))

  let ow=cw, oh=ch
  if (opts.mask === 'circle'){ const side = Math.min(cw,ch); ow=side; oh=side }

  const out = new OffscreenCanvas(ow, oh)
  const octx = out.getContext('2d')!
  if (opts.background) { octx.fillStyle = opts.background; octx.fillRect(0,0,ow,oh) } else { octx.clearRect(0,0,ow,oh) }

  if (opts.filters) { /* OffscreenCanvas lacks CSS-like filters; skip in worker */ }

  octx.save()
  if (opts.mask === 'circle') {
    const side = Math.min(cw, ch)
    octx.beginPath(); octx.arc(ow/2, oh/2, side/2, 0, Math.PI*2); octx.closePath(); octx.clip()
    octx.drawImage(crop, Math.floor((cw-ow)/2)*-1, Math.floor((ch-oh)/2)*-1)
  } else if (opts.mask === 'roundRect') {
    roundRect(octx, 0,0,ow,oh, opts.radius||24); octx.clip()
    octx.drawImage(crop, 0,0,ow,oh)
  } else {
    octx.drawImage(crop, 0,0,ow,oh)
  }
  octx.restore()

  // no feather/border/watermark in worker for now (keep worker simple & fast)
  // post-process on main thread if needed

  // resize if outSize
  let target = out
  if (opts.outSize && opts.outSize > 0) {
    const tw = (opts.mask === 'rect') ? opts.outSize : opts.outSize
    const th = (opts.mask === 'rect') ? Math.round(opts.outSize * (oh/ow)) : opts.outSize
    const r = new OffscreenCanvas(tw, th)
    const rctx = r.getContext('2d')!
    rctx.imageSmoothingQuality = 'high'
    rctx.drawImage(out, 0,0, tw, th)
    target = r
  }

  const finalFmt = (opts.mask !== 'rect' && opts.format === 'jpeg') ? 'image/png' : ('image/' + (opts.format || 'png'))
  const blob: Blob = await target.convertToBlob({ type: finalFmt, quality: opts.quality || 0.92 })
  return blob
}
