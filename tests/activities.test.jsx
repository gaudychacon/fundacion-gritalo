import React from 'react';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import { ActivityEngine } from '../src/components/activities/ActivityEngine.jsx';
import {kidsActivities,teensActivities} from '../src/data/activities';
afterEach(cleanup);
test('choice offers gentle retry and completes only after correct answer',()=>{
 const done=vi.fn(); render(<ActivityEngine activity={{type:'choice',questions:[{prompt:'¿Pedir ayuda?',options:['Sí','No'],answer:0,explanation:'Puedes contar lo que te preocupa.'}]}} onComplete={done}/>);
 fireEvent.click(screen.getByRole('button',{name:'No'})); expect(screen.getByRole('status').textContent).toContain('Intentemos otra vez'); expect(done).not.toHaveBeenCalled();
 fireEvent.click(screen.getByRole('button',{name:'Sí'})); fireEvent.click(screen.getByRole('button',{name:/Terminar/})); expect(done).toHaveBeenCalledOnce();
});
test('ordering supports buttons without dragging',()=>{
 const done=vi.fn(); render(<ActivityEngine activity={{type:'order',steps:['Decir NO','Alejarme','Contarlo']}} onComplete={done}/>);
 for(const name of ['Decir NO','Alejarme','Contarlo']) fireEvent.click(screen.getByRole('button',{name}));
 fireEvent.click(screen.getByRole('button',{name:'Comprobar orden'})); expect(done).toHaveBeenCalledOnce();
});
test('network requires reflection but never asks for names',()=>{
 const done=vi.fn(); render(<ActivityEngine activity={{type:'network'}} onComplete={done}/>);
 expect(screen.queryByRole('textbox')).toBeNull(); fireEvent.click(screen.getByRole('button',{name:/Una persona de mi familia/}));
 fireEvent.click(screen.getByRole('checkbox')); fireEvent.click(screen.getByRole('button',{name:'Guardar solo mi avance'})); expect(done).toHaveBeenCalledOnce();
});
test('selection explains the lesson before finishing',()=>{
 const done=vi.fn();render(<ActivityEngine activity={{type:'select',prompt:'Acciones de cuidado',options:['Escucha','Amenaza'],answers:[0],explanation:'Importan las acciones, no el parentesco.'}} onComplete={done}/>);
 fireEvent.click(screen.getByRole('button',{name:'Escucha'}));fireEvent.click(screen.getByRole('button',{name:/Comprobar/}));
 expect(screen.getByRole('status').textContent).toContain('Importan las acciones');expect(done).not.toHaveBeenCalled();fireEvent.click(screen.getByRole('button',{name:'Terminar actividad'}));expect(done).toHaveBeenCalledOnce();
});
test.each([...kidsActivities,...teensActivities].map((a,i)=>[`${i+1}. ${a.title}`,a]))('%s requires completing the digital tasks',(_,activity)=>{
 const done=vi.fn();render(<ActivityEngine activity={activity} onComplete={done}/>);
 expect(screen.getByText('Texto del libro')).toBeTruthy();
 expect(screen.getByRole('button',{name:'Terminar actividad'}).disabled).toBe(true);
 expect(done).not.toHaveBeenCalled();
});
