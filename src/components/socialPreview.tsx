import { SafeArea } from './safeAreas'

import React from 'react'
type Frame = 'instagram'|'twitter'|'linkedin'|'facebook'|'pinterest'
export default function SocialPreview({ src }: { src: string | null }) {
  const [frame, setFrame] = React.useState<Frame>('instagram')
  const [showSafe, setShowSafe] = React.useState(true)
  return (
    <div className="group">
      <h4>Social Preview</h4>
      <div style={{display:'flex', gap:8, marginBottom:8}}>+<label style={{display:'flex',alignItems:'center',gap:6}}><input type='checkbox' checked={showSafe} onChange={e=>setShowSafe(e.target.checked)} /> Safe area</label>
        <select value={frame} onChange={e=>setFrame(e.target.value as Frame)}>
          <option value="instagram">Instagram Post</option>
          <option value="twitter">Twitter/X Banner</option>
          <option value="linkedin">LinkedIn Post</option>
          <option value="facebook">Facebook Page Cover</option>
          <option value="pinterest">Pinterest Pin</option>
        </select>
      </div>
      <div style={{background:'#0b0f14', padding:12, borderRadius:10, border:'1px solid #223040'}}>
        {frame === 'instagram' && <Insta src={src} />}
        {frame === 'twitter' && <Twitter src={src} showSafe={showSafe} />}
        {frame === 'linkedin' && <LinkedIn src={src} showSafe={showSafe} />}
        {frame === 'facebook' && <Facebook src={src} />}
        {frame === 'pinterest' && <Pinterest src={src} />}
      </div>
    </div>
  )
}
function Insta({ src }:{src:string|null}){ return (<div style={{width:'100%', maxWidth:360, background:'#111', borderRadius:12, overflow:'hidden', border:'1px solid #333'}}>
  <div style={{display:'flex', alignItems:'center', gap:8, padding:8, color:'#ddd'}}><div style={{width:28, height:28, borderRadius:'50%', background:'#444'}}/></div>
  <div style={{aspectRatio:'1/1', background:'#000', display:'grid', placeContent:'center'}}>{src ? <img src={src} style={{maxWidth:'100%', maxHeight:'100%'}}/> : <span style={{color:'#888'}}>Your image</span>}</div>
</div>)}
function Twitter({ src }:{src:string|null}){ return (<div style={{width:'100%', maxWidth:480, background:'#0f1419', borderRadius:12, overflow:'hidden', border:'1px solid #2f3336', color:'#e7edf3'}}>
  <div style={{padding:8, borderBottom:'1px solid #2f3336', display:'flex', alignItems:'center', justifyContent:'center'}}><div style={{width:24, height:24, borderRadius:'50%', background:'#1DA1F2'}}/></div>
  <div style={{aspectRatio:'3/1', background:'#000', display:'grid', placeContent:'center'}}>{src ? <img src={src} style={{maxWidth:'100%', maxHeight:'100%'}}/> : <span style={{color:'#888'}}>1500×500</span>}</div>
</div>)}
function LinkedIn({ src }:{src:string|null}){ return (<div style={{width:'100%', maxWidth:480, background:'#0a0d12', borderRadius:12, overflow:'hidden', border:'1px solid #1f2937', color:'#cbd5e1'}}>
  <div style={{padding:8, borderBottom:'1px solid #1f2937', display:'flex', alignItems:'center', justifyContent:'center'}}><div style={{width:24, height:24, borderRadius:'50%', background:'#0A66C2'}}/></div>
  <div style={{aspectRatio:'1.91/1', background:'#000', display:'grid', placeContent:'center'}}>{src ? <img src={src} style={{maxWidth:'100%', maxHeight:'100%'}}/> : <span style={{color:'#888'}}>1200×627</span>}</div>
</div>)}
function Facebook({ src }:{src:string|null}){ return (<div style={{width:'100%', maxWidth:520, background:'#1b1f2a', borderRadius:12, overflow:'hidden', border:'1px solid #2a3142', color:'#e7edf3'}}>
  <div style={{padding:8, borderBottom:'1px solid #2a3142', display:'flex', alignItems:'center', justifyContent:'center'}}><div style={{width:24, height:24, borderRadius:'50%', background:'#1877F2'}}/></div>
  <div style={{aspectRatio:'41/16', background:'#000', display:'grid', placeContent:'center'}}>{src ? <img src={src} style={{maxWidth:'100%', maxHeight:'100%'}}/> : <span style={{color:'#888'}}>820×312</span>}</div>
</div>)}
function Pinterest({ src }:{src:string|null}){ return (<div style={{width:'100%', maxWidth:360, background:'#111', borderRadius:12, overflow:'hidden', border:'1px solid #333'}}>
  <div style={{padding:8, color:'#ddd', display:'flex', alignItems:'center', justifyContent:'center'}}><div style={{width:24, height:24, borderRadius:'50%', background:'#E60023'}}/></div>
  <div style={{aspectRatio:'2/3', background:'#000', display:'grid', placeContent:'center'}}>{src ? <img src={src} style={{maxWidth:'100%', maxHeight:'100%'}}/> : <span style={{color:'#888'}}>1000×1500</span>}</div>
</div>)}
