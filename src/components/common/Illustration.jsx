import {useState,useEffect} from 'react';
import {Sparkles, Image as ImageIcon, Heart, Star, ShieldCheck, BookOpen} from 'lucide-react';
export function Illustration({src,label,variant='hero'}) {
 const [failed,setFailed]=useState(false);
 useEffect(()=>setFailed(false),[src]);
 return <div className={`illustration illustration-${variant}`}>
 {!failed&&<img src={src} alt={label} onError={()=>setFailed(true)}/>}
 {failed&&<><div className="art-shape shape-one"/><div className="art-shape shape-two"/><Star className="art-star"/><Sparkles className="art-sparkles"/><div className="art-card"><ShieldCheck/><Heart className="art-heart"/><BookOpen className="art-book"/></div><span className="art-caption"><ImageIcon size={15}/>{label}</span><code>{src}</code></>}
 </div>;
}
