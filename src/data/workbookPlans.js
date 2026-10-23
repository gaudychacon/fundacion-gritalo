// Digital controls reference the unchanged transcript; editorial help is separate.
const crop=(age,page,box,height=age==='10-15'?1696:1873)=>({src:`/books/${age}/${page}.jpg`,box,height});
const choice=(id,label,options,answer,extra={})=>({id,kind:'choice',label,options,answer,...extra});
const art=(id,image,label)=>({id,kind:'art',image,label});
const phrase=(text,words,answers)=>answers.map((answer,i)=>choice(`blank-${i}`,`Espacio ${i+1}`,words,answer,{kind:'blank',phrase:text}));
const bodyPhrase=(a)=>phrase(a.text.find(t=>t.startsWith('“MI ')),['TESORO','DAÑARLO','DIOS','VALIOSO','CUERPO'],['CUERPO','TESORO','VALIOSO','DIOS','DAÑARLO']);
const houses=['IGLESIA','COLEGIO','POLICIA','HOSPITAL','FISCALIA'];
const houseBoxes={
 '6-9':[[210,1060,270,300],[525,1080,340,240],[150,1400,360,260],[620,1335,265,260],[480,1600,290,245]],
 '10-15':[[45,90,250,285],[310,150,320,230],[90,415,340,260],[650,150,250,250],[480,420,270,240]]
};
function placements(age){return houses.map((name,i)=>choice(`house-${i}`,`Pegar en ${name}`,houses,name,{kind:'cutout',images:houses.map((_,j)=>crop(age,age==='6-9'?'cutouts':'page-15',houseBoxes[age][j],age==='6-9'?1891:1696))}));}
export const WORD_GRID=['PDQPENSORR','PELIGROSAS','ECTQKYÑUCR','NILPELTITU','SDECTCWLUT','AIHZAXDEAC','RRPKJGBPAA','DECIDCPLAN'].map(row=>row.split(''));
// Preserve the printed ACTUAA typo; explain it rather than altering the source grid.
export const WORD_PATHS={
 DECIDIR:Array.from({length:7},(_,i)=>[i,1]),
 PENSAR:Array.from({length:6},(_,i)=>[i+1,0]),
 PELIGROSAS:Array.from({length:10},(_,i)=>[1,i]),
 ACTUAR:Array.from({length:6},(_,i)=>[i+1,8])
};
export function getWorkbookPlan(a){
 const age=a.pages?.[0]?.src.includes('/6-9/')?'6-9':'10-15';
 const n=Number(a.id?.split('-')[1]); const t=a.text;let tasks=[];
 const questions=(start)=>Array.from({length:4},(_,i)=>choice(`question-${i}`,`Pregunta ${i+1}: ${t[start+i*3]}`,t.slice(start+i*3+1,start+i*3+3),t[start+i*3+2]));
 if(age==='6-9'){
  if(n===1)tasks=questions(2);
  if(n===2){
   const boxes=[[85,930,330,415],[425,930,345,425],[780,930,320,430],[255,1350,330,425],[605,1340,330,420]];
   tasks=boxes.map((b,i)=>choice(`face-${i}`,`Escena ${i+1}`,['☹ Decisión peligrosa','☺ Buena decisión'],[0,1,0,0,1].map(x=>['☹ Decisión peligrosa','☺ Buena decisión'][x])[i],{kind:'face',image:crop(age,'page-8',b,1894)}));
  }
  if(n===3){
   const clothes=['Ropa de baño de Aledis','Ropa de baño de Shawi'];
   const images=[crop(age,'cutouts',[530,725,125,180],1891),crop(age,'cutouts',[278,730,140,150],1891)];
   tasks=clothes.flatMap((name,i)=>[art(`paint-${i}`,images[i],`Colorear ${name.toLowerCase()}`),choice(`dress-${i}`,`Cubrir las partes privadas de ${i===0?'Aledis':'Shawi'}`,clothes,name,{kind:'dress',images,image:crop(age,'page-9',i===0?[80,520,390,860]:[645,480,340,875],1894),target:i===0?[130,350,140,230]:[110,535,140,110]})]);
  }
  if(n===4){
   const boxes=[[80,470,350,425],[440,510,350,385],[800,560,340,340],[85,925,350,370],[440,930,350,370],[790,940,350,355],[210,1310,350,370],[650,1300,350,385]];
   tasks=boxes.flatMap((b,i)=>{
    const image=crop(age,'page-10',b), safe=[3,5,7].includes(i);
    return [choice(`scene-${i}`,`Escena ${i+1}`,['Marcar X','Colorear'],safe?'Colorear':'Marcar X',{kind:'scene',image}),...(safe?[art(`color-${i}`,image,`Colorear escena ${i+1}`)]:[])];
   });
  }
  if(n===5){
   const boxes=[[95,200,315,460],[760,190,320,460],[80,670,340,520],[705,710,350,480],[170,1190,830,545]];
   tasks=[1,2,5,6,7].flatMap((idx,i)=>{const image=crop(age,'page-11',boxes[i]);return [choice(`match-${i}`,t[idx],['DIGO: NO','DIGO: SI'],i===4?'DIGO: SI':'DIGO: NO',{kind:'match',image}),art(`color-${i}`,image,`Colorear dibujo ${i+1}`)];});
  }
  if(n===6)tasks=bodyPhrase(a);
  if(n===7)tasks=placements(age);
 }else{
  if(n===1)tasks=[...questions(1),choice('yesno-0',`${t[1]} SÍ o NO`,['SÍ','NO'],'SÍ'),choice('yesno-1',`${t[4]} SÍ o NO`,['SÍ','NO'],'NO'),...phrase(t[14],t.slice(15),['PRIVADAS','ROPA','BAÑO','VERLAS','TAMPOCO','TOCAR'])];
  if(n===2)tasks=[...Object.keys(WORD_PATHS).map(word=>({id:`find-${word}`,kind:'word',label:word,answer:word})),...phrase(t[1],t.slice(2),['PENSAR','DECIDIR','ACTUAR','PELIGROSAS'])];
  if(n===3){
   const points=[[300,365],[306,414],[307,547],[288,1030],[640,880],[621,636],[543,728],[589,350]];
   tasks=t.slice(1).map((label,i)=>({id:`body-${i}`,kind:'body',label,point:points[i],answer:true}));
  }
  if(n===4)tasks=[...t.slice(5,17).map((label,i)=>choice(`action-${i}`,label,[t[2],t[3]],[1,3,5,8].includes(i)?t[2]:t[3])),{id:'reflection',kind:'reflection',label:'Pensé en tres personas adultas que me escuchan, me respetan y pueden ayudarme, o en cómo buscar apoyo si no se me ocurren tres.',answer:true}];
  if(n===5){
   const labels=['Ferina y su padrastro','Fredo y el vecino',t[1],t[2]];
   const boxes=[[40,130,325,370],[40,500,335,340],[40,835,530,340],[40,1120,365,410]];
   tasks=boxes.flatMap((b,i)=>{const image=crop(age,'page-11',b);return [choice(`match-${i}`,labels[i],t.slice(3),undefined,{kind:'match',image,open:true}),art(`color-${i}`,image,`Colorear dibujo ${i+1}`)];});
  }
  if(n===6)tasks=Array.from({length:4},(_,i)=>{
   const start=1+i*5;return [choice(`yesno-${i}`,t[start+1],['SÍ','NO'],i===1?'SÍ':'NO',{context:t[start]}),choice(`decision-${i}`,`DECIDE: ${t[start]}`,t.slice(start+3,start+5),t[start+(i<2?3:4)])];
  }).flat();
  if(n===7)tasks=[...bodyPhrase(a),...placements(age)];
 }
 return {age,number:n,tasks};
}
export function taskComplete(task,value){
 if(task.kind==='art')return Array.isArray(value)&&value.length>0;
 if(task.open)return task.options.includes(value);
 return value===task.answer;
}
export function isWorkbookComplete(plan,state){return plan.tasks.length>0&&plan.tasks.every(task=>taskComplete(task,state[task.id]));}
