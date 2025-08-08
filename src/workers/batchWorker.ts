
import { getCroppedImage, ExportOptions } from '../components/utils'

// Minimal worker: receives queue, croppedAreaPixels, sizes, opts -> returns {name, arrayBuffer} list
self.onmessage = async (e: MessageEvent) => {
  const { queue, croppedAreaPixels, sizes, baseOpts, filePrefix, lastPreset, format } = e.data
  const results: { name: string, buf: ArrayBuffer }[] = []
  let done = 0, total = queue.length * sizes.length
  for (let qi=0; qi<queue.length; qi++) {
    const src = queue[qi]
    for (const size of sizes) {
      const opts: ExportOptions = { ...baseOpts, outSize: size }
      let blob: Blob
      try {
        blob = await getCroppedImage(src, croppedAreaPixels, opts)
      } catch {
        const fallback: ExportOptions = { ...opts, feather: 0, filters: null, shadow: null }
        blob = await getCroppedImage(src, croppedAreaPixels, fallback)
      }
      const ext = (opts.mask !== 'rect' && format === 'jpeg') ? 'png' : (format === 'jpeg' ? 'jpg' : format)
      const ts = Date.now()
      const name = `${filePrefix}-${lastPreset}-${size}-${ts}.${ext}`
      const buf = await blob.arrayBuffer()
      results.push({ name, buf })
      done++
      ;(self as any).postMessage({ progress: done/total })
    }
  }
  ;(self as any).postMessage({ done: true, results }, [])
}
