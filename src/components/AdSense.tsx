import { useEffect, useRef } from 'react'

interface AdSenseProps {
  client: string
  slot: string
  format?: string
  responsive?: boolean
  style?: React.CSSProperties
}

export default function AdSense({ 
  client, 
  slot, 
  format = 'auto', 
  responsive = true,
  style = {}
}: AdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 确保AdSense已加载
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }
  }, [])

  return (
    <div className="ad-container" style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  )
}
