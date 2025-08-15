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
  
  // 检查是否为生产环境或特定域名
  const isProduction = typeof window !== 'undefined' && 
    (window.location.hostname === 'www.crop-image-tool.com' || 
     window.location.hostname === 'crop-image-tool.com')

  useEffect(() => {
    // 只在生产环境中加载AdSense
    if (isProduction && typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }
  }, [isProduction])

  // 在开发环境中显示占位符
  if (!isProduction) {
    return (
      <div className="ad-container ad-placeholder" style={style}>
        <div className="ad-placeholder-content">
          <span>📢 Ad Space</span>
          <small>AdSense will display here in production</small>
        </div>
      </div>
    )
  }

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
