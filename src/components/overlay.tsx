
import React from 'react'
export function GridOverlay({ showRuleOfThirds, showGolden, color = 'rgba(124,192,255,0.6)' }: { showRuleOfThirds: boolean; showGolden: boolean; color?: string }) {
  return (
    <svg style={{position:'absolute', inset:0, pointerEvents:'none'}}>
      {showRuleOfThirds && (
        <g stroke={color} strokeWidth="1">
          <line x1="33.333%" y1="0" x2="33.333%" y2="100%" />
          <line x1="66.666%" y1="0" x2="66.666%" y2="100%" />
          <line x1="0" y1="33.333%" x2="100%" y2="33.333%" />
          <line x1="0" y1="66.666%" x2="100%" y2="66.666%" />
        </g>
      )}
      {showGolden && (
        <g stroke="rgba(52,211,153,0.6)" strokeWidth="1">
          <line x1="61.8%" y1="0" x2="61.8%" y2="100%" />
          <line x1="0" y1="61.8%" x2="100%" y2="61.8%" />
        </g>
      )}
    </svg>
  )
}


export function SafeAreaOverlay({ preset }:{ preset?: string }){
  // simple normalized safe areas for a few banners
  // twitter 1500x500: safe 1260x420 centered
  // youtube 2560x1440: safe 1546x423 centered (channel art)
  // linkedin cover 1584x396: safe ~ 1350x220 centered
  const map:any = {
    'Twitter/X Banner': { w:1500, h:500, sw:1260, sh:420 },
    'YouTube Banner': { w:2560, h:1440, sw:1546, sh:423 },
    'LinkedIn Cover': { w:1584, h:396, sw:1350, sh:220 },
  }
  const m = preset ? map[preset] : null
  if (!m) return null
  const nx = (1 - m.sw/m.w)/2 * 100
  const ny = (1 - m.sh/m.h)/2 * 100
  const nw = (m.sw/m.w) * 100
  const nh = (m.sh/m.h) * 100
  return (
    <div style={{position:'absolute', inset:0, pointerEvents:'none'}}>
      <div style={{position:'absolute', left:`${nx}%`, top:`${ny}%`, width:`${nw}%`, height:`${nh}%`, border:'2px dashed rgba(255,255,255,.35)', borderRadius:12}}/>
    </div>
  )
}
