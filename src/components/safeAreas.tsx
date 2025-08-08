
import React from 'react'

// Simple safe-area guides (approximate industry guides)
export function SafeArea({ type }:{ type:'twitter'|'youtube'|'linkedin'|null }){
  if (!type) return null
  const style: React.CSSProperties = { position:'absolute', inset:0, pointerEvents:'none' }
  switch(type){
    case 'twitter':
      // 1500x500; center 1200x400 is safer
      return <div style={style}>
        <div style={{position:'absolute', left:'10%', top:'10%', width:'80%', height:'80%', border:'2px dashed rgba(255,255,255,.4)', borderRadius:12}}/>
      </div>
    case 'youtube':
      // 2560x1440; text safe center ~1546x423
      return <div style={style}>
        <div style={{position:'absolute', left:'20%', top:'50%', transform:'translateY(-50%)', width:'60%', height:'30%', border:'2px dashed rgba(255,255,255,.4)', borderRadius:12}}/>
      </div>
    case 'linkedin':
      // 1584x396; keep text center 70%
      return <div style={style}>
        <div style={{position:'absolute', left:'15%', top:'15%', width:'70%', height:'70%', border:'2px dashed rgba(255,255,255,.4)', borderRadius:12}}/>
      </div>
    default: return null
  }
}
