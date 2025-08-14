
// Optional HEIC support hook.
// If you place a decoder at /libs/heic/decoder.js exposing window.HEIC.decode(blob)->Promise<Blob>,
// this function will use it; otherwise returns null.
export async function tryDecodeHEIC(blob: Blob): Promise<Blob | null> {
  try {
    // @ts-ignore
    if (window.HEIC && typeof window.HEIC.decode === 'function') {
      // @ts-ignore
      return await window.HEIC.decode(blob)
    }
  } catch {}
  return null
}
