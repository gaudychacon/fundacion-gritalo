import React from 'react';
import {render,screen,fireEvent,cleanup,within} from '@testing-library/react';
import {ActivityEngine} from '../src/components/activities/ActivityEngine';
import {kidsActivities,teensActivities} from '../src/data/activities';
import {getWorkbookPlan, isWorkbookComplete, WORD_GRID, WORD_PATHS} from '../src/data/workbookPlans';
afterEach(cleanup);
const activities=[...kidsActivities,...teensActivities];
test.each(activities.map((a,i)=>[`${i+1}`,a]))('book %s requires all original digital tasks, not a review checkbox',(_,activity)=>{
 const plan=getWorkbookPlan(activity);
 expect(plan.tasks.length).toBeGreaterThan(0);
 expect(plan.tasks.every(t=>typeof t.label==='string'&&t.label.length>0)).toBe(true);
 expect(isWorkbookComplete(plan,{})).toBe(false);
 const state=Object.fromEntries(plan.tasks.map(t=>[t.id,t.answer??(t.kind==='art'?['stroke']:t.options[0])]));
 expect(isWorkbookComplete(plan,state)).toBe(true);
 for(const task of plan.tasks)expect(isWorkbookComplete(plan,{...state,[task.id]:undefined})).toBe(false);
 const done=vi.fn();render(<ActivityEngine activity={activity} onComplete={done}/>);
 expect(screen.queryByText('Revisé la ficha del libro.')).toBeNull();
 expect(screen.getByRole('button',{name:'Terminar actividad'}).disabled).toBe(true);
 expect(done).not.toHaveBeenCalled();
});
test.each(activities.map((a,i)=>[`${i+1}`,a]))('book %s completes every digital action with keyboard-accessible controls',(_,activity)=>{
 const done=vi.fn();render(<ActivityEngine activity={activity} onComplete={done}/>);
 for(const task of getWorkbookPlan(activity).tasks){
  if(task.kind==='word'){
   const path=WORD_PATHS[task.label];for(const [r,c] of [path[0],path.at(-1)])fireEvent.click(screen.getByRole('button',{name:`Fila ${r+1}, columna ${c+1}: ${WORD_GRID[r][c]}`}));
  }else if(task.kind==='art')fireEvent.keyDown(screen.getByRole('group',{name:`Lienzo: ${task.label}`}),{key:' '});
  else if(task.kind==='blank')fireEvent.change(screen.getByRole('combobox',{name:task.label}),{target:{value:task.answer}});
  else if(['body','reflection'].includes(task.kind))fireEvent.click(screen.getByRole('checkbox',{name:task.label}));
  else fireEvent.click(within(screen.getByRole('group',{name:task.label})).getByRole('radio',{name:task.answer??task.options[0]}));
 }
 expect(screen.getByRole('button',{name:'Terminar actividad'}).disabled).toBe(false);
 fireEvent.click(screen.getByRole('button',{name:'Terminar actividad'}));expect(done).toHaveBeenCalledOnce();
 fireEvent.click(screen.getByRole('button',{name:'Reiniciar actividad'}));
 expect(screen.getByRole('button',{name:'Terminar actividad'}).disabled).toBe(true);
 expect(screen.queryAllByRole('radio').every(r=>!r.checked)).toBe(true);
});
test('painting undo revokes artwork completion and pointer strokes can be drawn',()=>{
 render(<ActivityEngine activity={kidsActivities[2]} onComplete={()=>{}}/>);
 const canvas=screen.getByRole('group',{name:'Lienzo: Colorear ropa de baño de aledis'});
 fireEvent.keyDown(canvas,{key:'ArrowRight'});fireEvent.keyDown(canvas,{key:' '});
 const undo=screen.getByRole('button',{name:'Deshacer trazo: Colorear ropa de baño de aledis'});
 expect(undo.disabled).toBe(false);fireEvent.click(undo);expect(undo.disabled).toBe(true);
 canvas.getBoundingClientRect=()=>({left:0,top:0,width:100,height:100});
 vi.stubGlobal('PointerEvent',MouseEvent);
 fireEvent.pointerDown(canvas,{button:0,pointerType:'touch',clientX:10,clientY:10});
 fireEvent.pointerMove(canvas,{clientX:20,clientY:20});fireEvent.pointerUp(canvas);
 expect(undo.disabled).toBe(false);
 vi.unstubAllGlobals();
});
test('word search preserves the source grid and all four word paths',()=>{
 expect(WORD_GRID).toHaveLength(8);expect(WORD_GRID.every(row=>row.length===10)).toBe(true);
 for(const [word,path] of Object.entries(WORD_PATHS))expect(path.map(([r,c])=>WORD_GRID[r][c]).join('')).toBe(word==='ACTUAR'?'ACTUAA':word);
});

test('word search recognizes the printed ACTUAR diagonal and marks the selected cells',()=>{
 render(<ActivityEngine activity={teensActivities[1]} onComplete={()=>{}}/>);
 const cell=(r,c)=>screen.getByRole('button',{name:`Fila ${r+1}, columna ${c+1}: ${WORD_GRID[r][c]}`});
 fireEvent.click(cell(5,4));fireEvent.click(cell(0,9));
 expect(screen.getByRole('status').textContent).toBe('Encontraste ACTUAR.');
 for(let i=0;i<6;i++)expect(cell(5-i,4+i).getAttribute('aria-pressed')).toBe('true');
 expect(cell(6,8).getAttribute('aria-pressed')).toBe('false');
});

test('word search accepts the reverse diagonal, rejects invalid selections, and resets highlights',()=>{
 render(<ActivityEngine activity={teensActivities[1]} onComplete={()=>{}}/>);
 const cell=(r,c)=>screen.getByRole('button',{name:`Fila ${r+1}, columna ${c+1}: ${WORD_GRID[r][c]}`});
 for(const end of [[0,8],[1,8],[5,4]]){
  fireEvent.click(cell(5,4));fireEvent.click(cell(...end));
  expect(screen.getByRole('status').textContent).toContain('Ese tramo no corresponde');
  expect(cell(5,4).getAttribute('aria-pressed')).toBe('false');
 }
 fireEvent.click(cell(0,9));fireEvent.click(cell(5,4));
 expect(screen.getByRole('status').textContent).toBe('Encontraste ACTUAR.');
 expect(screen.getByText(/1 de 8 pasos listos/)).toBeTruthy();
 for(let i=0;i<6;i++)expect(cell(5-i,4+i).getAttribute('aria-pressed')).toBe('true');
 fireEvent.click(screen.getByRole('button',{name:'Reiniciar actividad'}));
 expect(screen.getByRole('status').textContent).toBe('0 de 4 palabras encontradas');
 for(let i=0;i<6;i++)expect(cell(5-i,4+i).getAttribute('aria-pressed')).toBe('false');
 expect(screen.getByText(/ACTUAR se encuentra en diagonal/)).toBeTruthy();
});
test('original choices reject incorrect responses, allow correction, and reset',()=>{
 const done=vi.fn();render(<ActivityEngine activity={kidsActivities[0]} onComplete={done}/>);
 const fields=screen.getAllByRole('group',{name:/^Pregunta/});
 for(const f of fields)fireEvent.click(within(f).getAllByRole('radio')[0]);
 expect(screen.getByRole('button',{name:'Terminar actividad'}).disabled).toBe(true);
 for(const f of fields)fireEvent.click(within(f).getAllByRole('radio')[1]);
 expect(screen.getByRole('button',{name:'Terminar actividad'}).disabled).toBe(false);
 fireEvent.click(screen.getByRole('button',{name:'Reiniciar actividad'}));
 expect(screen.getByRole('button',{name:'Terminar actividad'}).disabled).toBe(true);
 for(const f of screen.getAllByRole('group',{name:/^Pregunta/}))fireEvent.click(within(f).getAllByRole('radio')[1]);
 fireEvent.click(screen.getByRole('button',{name:'Terminar actividad'}));expect(done).toHaveBeenCalledOnce();
});
test('changing workbook age or activity discards transient responses',()=>{
 const {rerender}=render(<ActivityEngine activity={kidsActivities[0]} onComplete={()=>{}}/>);
 fireEvent.click(screen.getAllByRole('radio')[1]);
 rerender(<ActivityEngine activity={teensActivities[0]} onComplete={()=>{}}/>);
 expect(screen.queryAllByRole('radio').every(r=>!r.checked)).toBe(true);
});
test('personal reflection can be completed privately without names or persisted answers',()=>{
 localStorage.clear();render(<ActivityEngine activity={teensActivities[3]} onComplete={()=>{}}/>);
 expect(screen.queryByRole('textbox')).toBeNull();
 expect(screen.getByText(/No escribas nombres/)).toBeTruthy();
 fireEvent.click(screen.getByRole('checkbox',{name:/Pensé en tres personas/}));
 expect(localStorage.length).toBe(0);
});
test('colored swimsuit carries its marks when placed on the original character',()=>{
 const {container}=render(<ActivityEngine activity={kidsActivities[2]} onComplete={()=>{}}/>);
 fireEvent.keyDown(screen.getByRole('group',{name:'Lienzo: Colorear ropa de baño de aledis'}),{key:' '});
 const dress=screen.getByRole('group',{name:'Cubrir las partes privadas de Aledis'});
 fireEvent.click(within(dress).getByRole('radio',{name:'Ropa de baño de Aledis'}));
 expect(container.querySelector('.placed-garment .painted-strokes circle')).not.toBeNull();
});
test('teen yes/no controls contain the original question instead of requiring recall',()=>{
 render(<ActivityEngine activity={teensActivities[0]} onComplete={()=>{}}/>);
 const groups=screen.getAllByRole('group');
 expect(groups.some(g=>g.textContent.includes(teensActivities[0].text[1])&&within(g).queryByRole('radio',{name:'SÍ'}))).toBe(true);
});
