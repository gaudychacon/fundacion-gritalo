import {useId,useRef,useState} from 'react';
import {getWorkbookPlan,isWorkbookComplete,taskComplete,WORD_GRID,WORD_PATHS} from '../../data/workbookPlans';

export function BookCrop({image,label,children}){
 return <svg className="book-crop" role="img" aria-label={label} viewBox={image.box.join(' ')}><image href={image.src} width="1200" height={image.height}/>{children}</svg>;
}
const colors=[['Azul','#245ac4'],['Rojo','#cc2649'],['Verde','#238652'],['Amarillo','#e6ad00'],['Morado','#7b44b5']];
function Strokes({value=[]}){
 return <g className="painted-strokes">{value.map((stroke,i)=>stroke.points.length===1?<circle key={i} cx={stroke.points[0][0]} cy={stroke.points[0][1]} r="2.5" fill={stroke.color} opacity=".45"/>:<polyline key={i} points={stroke.points.map(p=>p.join(',')).join(' ')} fill="none" stroke={stroke.color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity=".45"/>)}</g>;
}
function Paint({task,value=[],onChange}){
 const [color,setColor]=useState(colors[0][1]);const [cursor,setCursor]=useState([50,50]);const active=useRef(false);const id=useId();
 const point=e=>{const r=e.currentTarget.getBoundingClientRect();return [Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100)),Math.max(0,Math.min(100,(e.clientY-r.top)/r.height*100))];};
 const stamp=(p)=>{setCursor(p);onChange([...value,{color,points:[p]}]);};
 return <fieldset className="workbook-task"><legend>{task.label}</legend><p id={id}>Pinta con el dedo o el ratón. Con teclado: usa las flechas para mover el pincel y Espacio para pintar. Los dibujos no se califican.</p>
  <div className="paint-colors" aria-label="Colores">{colors.map(([name,hex])=><button type="button" key={hex} aria-label={name} aria-pressed={color===hex} style={{'--paint-color':hex}} onClick={()=>setColor(hex)}>{name}</button>)}</div>
  <div className="paint-surface" role="group" tabIndex={0} aria-label={`Lienzo: ${task.label}`} aria-describedby={id}
   onPointerDown={e=>{if(e.button!==0&&e.pointerType!=='touch')return;e.preventDefault();e.currentTarget.setPointerCapture?.(e.pointerId);active.current=true;stamp(point(e));}}
   onPointerMove={e=>{if(!active.current)return;const p=point(e);setCursor(p);onChange([...value.slice(0,-1),{...value.at(-1),points:[...(value.at(-1)?.points||[]),p]}]);}}
   onPointerUp={()=>{active.current=false;}} onPointerCancel={()=>{active.current=false;}}
   onKeyDown={e=>{const steps={ArrowLeft:[-3,0],ArrowRight:[3,0],ArrowUp:[0,-3],ArrowDown:[0,3]};if(steps[e.key]){e.preventDefault();setCursor(cursor.map((n,i)=>Math.max(0,Math.min(100,n+steps[e.key][i]))));}else if(e.key===' '||e.key==='Enter'){e.preventDefault();stamp(cursor);}}}>
   <BookCrop image={task.image} label={task.label}/><svg className="paint-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{value.map((stroke,i)=><polyline key={i} points={stroke.points.map(p=>p.join(',')).join(' ')} fill="none" stroke={stroke.color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity=".45"/>)}{value.map((stroke,i)=>stroke.points.length===1&&<circle key={i} cx={stroke.points[0][0]} cy={stroke.points[0][1]} r="2.5" fill={stroke.color} opacity=".45"/>)}<circle className="paint-cursor" cx={cursor[0]} cy={cursor[1]} r="3" fill="none" stroke="#152333" strokeWidth=".5"/></svg>
  </div><button className="button secondary" disabled={!value.length} onClick={()=>onChange(value.slice(0,-1))}>Deshacer trazo: {task.label}</button>
 </fieldset>;
}
function Choice({task,value,onChange,garmentPaint=[]}){
 const id=useId();const selected=task.options.indexOf(value);
 const image=task.image;
 return <fieldset className={`workbook-task task-${task.kind}`}><legend>{task.label}</legend>{task.context&&<p>{task.context}</p>}
  {image&&<div className="task-art"><BookCrop image={image} label={`Ilustración del libro: ${task.label}`}>
   {task.kind==='face'&&value&&<text x={image.box[0]+image.box[2]/2} y={image.box[1]+image.box[3]-25} textAnchor="middle" fontSize="75" fill="#17345e">{value.startsWith('☹')?'☹':'☺'}</text>}
   {task.kind==='scene'&&value==='Marcar X'&&<text x={image.box[0]+image.box[2]/2} y={image.box[1]+image.box[3]/2} textAnchor="middle" fontSize="150" fill="#ae1738">X</text>}
   {task.kind==='dress'&&selected>=0&&<svg className="placed-garment" x={image.box[0]+task.target[0]} y={image.box[1]+task.target[1]} width={task.target[2]} height={task.target[3]} viewBox={task.images[selected].box.join(' ')} preserveAspectRatio="none"><image href={task.images[selected].src} width="1200" height={task.images[selected].height}/><svg x={task.images[selected].box[0]} y={task.images[selected].box[1]} width={task.images[selected].box[2]} height={task.images[selected].box[3]} viewBox="0 0 100 100" preserveAspectRatio="none"><Strokes value={garmentPaint[selected]}/></svg></svg>}
  </BookCrop></div>}
  {task.kind==='cutout'&&selected>=0&&<div className="placed-cutout"><BookCrop image={task.images[selected]} label={`Recortable pegado: ${value}`}/></div>}
  {task.kind==='match'&&value&&<p className="connection-preview"><span aria-hidden="true">↳ ━━━ </span>Respuesta unida: {value}</p>}
  <div className="workbook-options">{task.options.map((option,i)=><label key={option} className={value===option?'chosen':''}><input type="radio" aria-label={option} name={id} value={option} checked={value===option} onChange={()=>onChange(option)}/>{task.kind==='cutout'&&<BookCrop image={task.images[i]} label={`Recortable ${option}`}/>}<span>{option}</span></label>)}</div>
  {task.open&&<p className="small">El libro pide la respuesta que tú darías. No hay una única combinación calificada aquí. Si quedaste en silencio o no pudiste decir NO, no es tu culpa; puedes buscar ayuda.</p>}
 </fieldset>;
}
function Phrase({tasks,answers,update}){
 const parts=tasks[0].phrase.split('__________');
 return <fieldset className="workbook-task"><legend>Completa la frase del libro</legend><p className="phrase-slots">{parts.map((part,i)=><span key={i}>{part}{i<tasks.length&&<select aria-label={tasks[i].label} value={answers[tasks[i].id]||''} onChange={e=>update(tasks[i].id,e.target.value)}><option value="">Elegir palabra</option>{tasks[i].options.map(word=><option key={word}>{word}</option>)}</select>}</span>)}</p></fieldset>;
}
function WordSearch({answers,update}){
 const [start,setStart]=useState(null);const [notice,setNotice]=useState('');
 const found=Object.keys(WORD_PATHS).filter(word=>answers[`find-${word}`]===word);
 function pick(r,c){
  if(!start){setStart([r,c]);setNotice('Ahora elige la última letra.');return;}
  const word=Object.keys(WORD_PATHS).find(w=>{const path=WORD_PATHS[w];return (path[0][0]===start[0]&&path[0][1]===start[1]&&path.at(-1)[0]===r&&path.at(-1)[1]===c)||(path.at(-1)[0]===start[0]&&path.at(-1)[1]===start[1]&&path[0][0]===r&&path[0][1]===c);});
  if(word){update(`find-${word}`,word);setNotice(`Encontraste ${word}.`);}else setNotice('Ese tramo no corresponde a una palabra de la lista. Prueba otra vez.');setStart(null);
 }
 return <fieldset className="workbook-task"><legend>Sopa de letras del libro</legend><p>Toca la primera y la última letra de cada palabra. También puedes usar Tab y Enter en cada casilla.</p><p>Busca: {Object.keys(WORD_PATHS).join(' · ')}</p><div className="word-grid-scroll"><div className="word-grid">{WORD_GRID.map((row,r)=>row.map((letter,c)=>{const marked=found.some(w=>WORD_PATHS[w].some(([y,x])=>y===r&&x===c));return <button key={`${r}-${c}`} aria-label={`Fila ${r+1}, columna ${c+1}: ${letter}`} aria-pressed={marked||!!(start&&start[0]===r&&start[1]===c)} className={marked?'found':''} onClick={()=>pick(r,c)}>{letter}</button>;}))}</div></div><p role="status">{notice||`${found.length} de 4 palabras encontradas`}</p><button className="button secondary" disabled={!start} onClick={()=>{setStart(null);setNotice('Selección cancelada.');}}>Cancelar selección</button><p className="small">Nota del sitio: en la cuadrícula impresa, ACTUAR aparece como ACTUAA. Conservamos esas letras; selecciona ese tramo de la columna 9 para encontrar ACTUAR.</p></fieldset>;
}
function Body({tasks,answers,update}){
 return <fieldset className="workbook-task"><legend>Encierra las partes del cuerpo</legend><p>Selecciona cada señal para dibujar su círculo sobre los personajes del libro. Puedes quitarlo volviendo a seleccionar.</p><div className="body-diagram"><BookCrop image={{src:'/books/10-15/page-9.jpg',box:[100,170,700,940],height:1696}} label="Ferina y Fredo: señales del cuerpo">{tasks.filter(t=>answers[t.id]).map(t=><circle key={t.id} cx={t.point[0]} cy={t.point[1]} r="48" fill="none" stroke="#2549ca" strokeWidth="6"/>)}</BookCrop></div><div className="workbook-options">{tasks.map(t=><label key={t.id}><input type="checkbox" checked={!!answers[t.id]} onChange={e=>update(t.id,e.target.checked)}/>{t.label}</label>)}</div></fieldset>;
}
export function DigitalWorkbook({activity,onComplete}){
 const plan=getWorkbookPlan(activity);const [answers,setAnswers]=useState({});const [attempt,setAttempt]=useState(false);const [version,setVersion]=useState(0);
 const update=(id,value)=>{setAnswers(s=>({...s,[id]:value}));setAttempt(false);};
 const complete=isWorkbookComplete(plan,answers);const count=plan.tasks.filter(t=>taskComplete(t,answers[t.id])).length;
 const blanks=plan.tasks.filter(t=>t.kind==='blank');const bodies=plan.tasks.filter(t=>t.kind==='body');
 return <div className="digital-workbook">
  <aside className="source-note"><p><strong>Indicaciones del sitio:</strong> Resuelve aquí las mismas actividades del libro. Puedes marcar, unir, colorear y pegar sin imprimir. Solo se guarda el avance; las respuestas y los dibujos se borran al salir o reiniciar.</p></aside>
  <details className="source-introduction"><summary>Texto del libro</summary><div className="book-transcript">{activity.text.map((line,i)=><p key={i}>{line}</p>)}</div></details>
  <div key={version} className="digital-tasks">
   {plan.tasks.some(t=>t.kind==='word')&&<WordSearch answers={answers} update={update}/>}
   {bodies.length>0&&<Body tasks={bodies} answers={answers} update={update}/>}
   {plan.tasks.filter(t=>!['word','body'].includes(t.kind)).map(t=>t.kind==='blank'?(t===blanks[0]?<Phrase key="phrase" tasks={blanks} answers={answers} update={update}/>:null):t.kind==='art'?<Paint key={t.id} task={t} value={answers[t.id]} onChange={v=>update(t.id,v)}/>:t.kind==='reflection'?<fieldset className="workbook-task" key={t.id}><legend>Mis personas de confianza</legend><p>No escribas nombres ni datos personales. Piensa en las tres personas del ejercicio; esta reflexión no se califica.</p><label className="reflection-check"><input type="checkbox" checked={!!answers[t.id]} onChange={e=>update(t.id,e.target.checked)}/>{t.label}</label></fieldset>:<Choice key={t.id} task={t} value={answers[t.id]} garmentPaint={[answers['paint-0'],answers['paint-1']]} onChange={v=>update(t.id,v)}/>)}
  </div>
  <p className="safety-note"><strong>Nota del sitio (no pertenece al libro):</strong> No es tu culpa. No haber podido decir NO, alejarte o pedir ayuda antes no te hace responsable del daño.</p>
  <p>{count} de {plan.tasks.length} pasos listos. Los dibujos y las reflexiones se registran como participación, no como respuestas correctas.</p>
  {attempt&&<div role="status" className="feedback">{complete?'La actividad está lista. Puedes terminar.':'Revisa los pasos pendientes: '+plan.tasks.filter(t=>!taskComplete(t,answers[t.id])).map(t=>t.label).join(' · ')}</div>}
  <div className="button-row"><button className="button secondary" onClick={()=>setAttempt(true)}>Revisar mis respuestas</button><button className="button primary" disabled={!complete} onClick={()=>{if(complete)onComplete();}}>Terminar actividad</button><button className="button secondary" onClick={()=>{setAnswers({});setAttempt(false);setVersion(v=>v+1);}}>Reiniciar actividad</button></div>
  <details className="source-introduction original-pages"><summary>Consultar las páginas originales</summary><div className="workbook-pages">{activity.pages.map(page=><figure key={page.src}><a href={page.src} target="_blank" rel="noopener noreferrer"><img src={page.src} alt={page.label} loading="lazy"/></a><figcaption>{page.label}</figcaption></figure>)}</div></details>
 </div>;
}
