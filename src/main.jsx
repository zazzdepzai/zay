import React,{useEffect,useMemo,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Music2,Pause,Play,Volume2,VolumeX,Settings,Copy,Check,ExternalLink,Instagram, Github, Send, Sparkles, Rotate3D, X, Eye, Zap, Disc3, Upload, ChevronDown} from 'lucide-react';
import './styles.css';

const tracks=[
 {title:'night drive',artist:'0nly4or',src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
 {title:'after dark',artist:'0nly4or',src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'}
];
const effects=['grain','scanlines','particles','glow','tilt','cursorTrail'];

function App(){
 const audio=useRef(null), card=useRef(null), [entered,setEntered]=useState(false), [playing,setPlaying]=useState(false), [track,setTrack]=useState(0), [volume,setVolume]=useState(.55), [panel,setPanel]=useState(false), [copied,setCopied]=useState(false), [angle,setAngle]=useState(8), [avatar,setAvatar]=useState(''), [theme,setTheme]=useState('mono'), [name,setName]=useState('0nly4or'), [bio,setBio]=useState('lost somewhere between 0 and forever.\ncreating things nobody asked for.'), [enabled,setEnabled]=useState(Object.fromEntries(effects.map(x=>[x,true])));
 const [mx,setMx]=useState(0),[my,setMy]=useState(0);
 const path=window.location.pathname;
 useEffect(()=>{if(audio.current){audio.current.volume=volume}},[volume]);
 useEffect(()=>{if(audio.current){audio.current.src=tracks[track].src;if(playing) audio.current.play().catch(()=>setPlaying(false))}},[track]);
 useEffect(()=>{const fn=e=>{document.documentElement.style.setProperty('--mx',`${e.clientX}px`);document.documentElement.style.setProperty('--my',`${e.clientY}px`); if(card.current&&enabled.tilt){const r=card.current.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5; setMx(x*angle);setMy(-y*angle)} };window.addEventListener('pointermove',fn);return()=>window.removeEventListener('pointermove',fn)},[angle,enabled.tilt]);
 const style=useMemo(()=>({transform:`perspective(1200px) rotateX(${my}deg) rotateY(${mx}deg) rotateZ(-1deg)`}),[mx,my]);
 const togglePlay=()=>{if(!audio.current)return;if(playing){audio.current.pause();setPlaying(false)}else{audio.current.play().then(()=>setPlaying(true)).catch(()=>{})}};
 const copy=async()=>{await navigator.clipboard?.writeText(location.href);setCopied(true);setTimeout(()=>setCopied(false),1300)};
 const upload=e=>{const f=e.target.files?.[0];if(f){const r=new FileReader();r.onload=()=>setAvatar(r.result);r.readAsDataURL(f)}};
 const toggle=x=>setEnabled(v=>({...v,[x]:!v[x]}));
 return <div className={`app theme-${theme} ${enabled.grain?'fx-grain':''} ${enabled.scanlines?'fx-scan':''} ${enabled.particles?'fx-particles':''} ${enabled.glow?'fx-glow':''} ${enabled.cursorTrail?'fx-cursor':''}`}>
  <audio ref={audio} loop onEnded={()=>setTrack((track+1)%tracks.length)} />
  <div className="ambient a1"/><div className="ambient a2"/><div className="noise"/>
  {enabled.particles&&<ParticleField/>}
  {!entered&&<div className="entry"><div className="entry-logo"><img src="/logo.svg"/></div><div className="entry-title">0nly4or</div><div className="entry-sub">click to enter</div><button onClick={()=>{setEntered(true);audio.current?.play().then(()=>setPlaying(true)).catch(()=>{})}} className="enter">ENTER <span>↗</span></button></div>}
  <header className="topbar"><div className="brand"><img src="/logo.svg"/><span>zyo.black</span></div><div className="top-actions"><button onClick={copy}>{copied?<Check size={16}/>:<Copy size={16}/>} {copied?'copied':'share'}</button><button onClick={()=>setPanel(true)}><Settings size={16}/> customize</button></div></header>
  <main className="stage">
   <div ref={card} className="profile" style={style}>
    <div className="card-shine"/>
    <div className="avatar-wrap">{avatar?<img src={avatar} className="avatar"/>:<div className="avatar placeholder">0</div>}<span className="online"/></div>
    <div className="name-row"><h1>{name}</h1><span className="verified">✓</span></div>
    <div className="handle">@{name.toLowerCase()} <span>•</span> profile/{name}</div>
    <p className="bio">{bio}</p>
    <div className="badges"><span>OWNER</span><span>DESIGNER</span><span>ONLINE</span></div>
    <div className="links"><a href="https://github.com" target="_blank"><Github size={17}/> GitHub <ExternalLink size={13}/></a><a href="#" onClick={e=>e.preventDefault()}><Instagram size={17}/> Instagram <ExternalLink size={13}/></a><a href="#" onClick={e=>e.preventDefault()}><Send size={17}/> Telegram <ExternalLink size={13}/></a></div>
    <div className="stats"><span><Eye size={14}/> 12,481 views</span><span><Zap size={14}/> 99.9% uptime</span></div>
    <div className="player"><div className="album"><Disc3 size={19} className={playing?'spin':''}/></div><div className="song"><b>{tracks[track].title}</b><small>{tracks[track].artist}</small></div><button onClick={togglePlay} className="play">{playing?<Pause size={17}/>:<Play size={17}/>}</button><button className="skip" onClick={()=>setTrack((track+1)%tracks.length)}>›</button></div>
    <div className="progress"><span style={{width:playing?'38%':'0%'}}/></div>
   </div>
   <div className="side-note"><span>01</span><i/> MINIMAL / MONO / 3D</div>
  </main>
  <footer><span>© 2026 0nly4or</span><span>built for the internet.</span></footer>
  {panel&&<aside className="drawer"><div className="drawer-head"><div><small>PROFILE STUDIO</small><h2>Customize</h2></div><button onClick={()=>setPanel(false)}><X/></button></div><section><label>Identity</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Username"/><textarea value={bio} onChange={e=>setBio(e.target.value)} rows="3"/></section><section><label>Avatar</label><label className="upload"><Upload size={16}/> upload image<input type="file" accept="image/*" onChange={upload}/></label></section><section><label>3D angle <b>{angle}°</b></label><input type="range" min="0" max="18" value={angle} onChange={e=>setAngle(+e.target.value)}/></section><section><label>Effects</label>{effects.map(x=><button key={x} className={`switch ${enabled[x]?'on':''}`} onClick={()=>toggle(x)}><span>{x}</span><i/></button>)}</section><section><label>Theme</label><div className="themes"><button className={theme==='mono'?'active':''} onClick={()=>setTheme('mono')}>BLACK / WHITE</button><button className={theme==='silver'?'active':''} onClick={()=>setTheme('silver')}>SILVER</button></div></section><section><label>Volume <b>{Math.round(volume*100)}%</b></label><input type="range" min="0" max="1" step=".01" value={volume} onChange={e=>setVolume(+e.target.value)}/></section><div className="drawer-foot"><span>preview auto-saves locally</span><button onClick={()=>setPanel(false)}>DONE</button></div></aside>}
 </div>
}
function ParticleField(){return <div className="particles">{Array.from({length:32},(_,i)=><i key={i} style={{left:`${(i*37)%100}%`,top:`${(i*61)%100}%`,animationDelay:`-${(i%9)}s`,animationDuration:`${5+(i%6)}s`}}/>)}</div>}
createRoot(document.getElementById('root')).render(<App/>);
