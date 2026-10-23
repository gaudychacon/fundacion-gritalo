import React from 'react';
import {render,screen,cleanup,fireEvent} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {existsSync} from 'node:fs';
import App from '../src/App.jsx';
import {worlds} from '../src/data/worlds';
import {ActivityEngine} from '../src/components/activities/ActivityEngine';
import {readProgress,markProgress,PROGRESS_KEY} from '../src/utils/progress';

afterEach(cleanup);
test('each age uses the original book pages and seven source activities',()=>{
 expect(worlds['6-9'].stories).toHaveLength(7);
 expect(worlds['10-15'].stories).toHaveLength(6);
 for(const world of Object.values(worlds)){
  expect(world.activities).toHaveLength(7);
  expect(world.stories.every(s=>s.source.pdfPage&&s.source.printedPage)).toBe(true);
  expect(world.activities.every(a=>a.type==='workbook'&&a.source.pdfPage&&a.text.length)).toBe(true);
 }
});
test('source opening and ending are not replaced by adaptations',()=>{
 expect(worlds['6-9'].stories[0].text[0]).toBe('A nuestro amigo Shawi le encanta levantarse temprano los días sábados; esos días, sus papás van a comprar al mercado y él debe levantarse a limpiar y arreglar su habitación.');
 expect(worlds['6-9'].stories.at(-1).text.join(' ')).toContain('¿Alguien nos podrá ayudar y decir qué podemos hacer?');
 expect(worlds['10-15'].stories[0].text[0]).toBe('¡Hoy es el cumpleaños de Ferina!');
 expect(worlds['10-15'].stories.at(-1).text.join(' ')).toContain('¿Qué harías tú?');
});
test('reader labels literal source and separates editorial safety guidance',()=>{
 render(<MemoryRouter initialEntries={['/6-9/historias/4']}><App/></MemoryRouter>);
 expect(screen.getByText(/Texto del libro/)).toBeTruthy();
 expect(screen.getByText(/Nota del sitio/)).toBeTruthy();
 expect(screen.queryByText(/ADAPTACIÓN/)).toBeNull();
 expect(screen.getByText(/Entonces, tomó una mala decisión/)).toBeTruthy();
});
test('worksheet preserves source text and original page beside digital tasks',()=>{
 const done=vi.fn();const activity=worlds['6-9'].activities[0];
 render(<ActivityEngine activity={activity} onComplete={done}/>);
 fireEvent.click(screen.getByText('Texto del libro'));
 expect(screen.getByText(activity.text[0])).toBeTruthy();
 fireEvent.click(screen.getByText('Consultar las páginas originales'));
 expect(screen.getByRole('img',{name:'Página original 7'})).toBeTruthy();
 expect(screen.queryByRole('textbox')).toBeNull();
 expect(screen.getByRole('button',{name:'Terminar actividad'}).disabled).toBe(true);
 expect(done).not.toHaveBeenCalled();
});
test('all original worksheet page assets exist locally',()=>{
 for(const world of Object.values(worlds))for(const a of world.activities){
  expect(a.pages.length).toBeGreaterThan(0);
  for(const page of a.pages)expect(existsSync(`public${page.src}`)).toBe(true);
 }
});
test('old adaptation progress cannot count as reviewed source-book content',()=>{
 localStorage.clear();
 localStorage.setItem('aprendo-cuidarme:v1',JSON.stringify({'6-9':{chapters:['1','6'],activities:['red','pasos']}}));
 expect(readProgress('6-9')).toEqual({chapters:[],activities:[]});
 markProgress('6-9','activities','libro-1');
 expect(readProgress('6-9').activities).toEqual(['libro-1']);
 expect(PROGRESS_KEY).not.toBe('aprendo-cuidarme:v1');
});
test.each(['6-9','10-15'])('%s reader uses real page artwork and removes adaptation wording',age=>{
 render(<MemoryRouter initialEntries={[`/${age}/historias/1`]}><App/></MemoryRouter>);
 const original=screen.getByRole('img',{name:/página original 1/});
 expect(original.getAttribute('src')).toBe(`/books/${age}/page-1.jpg`);
 expect(existsSync(`public${original.getAttribute('src')}`)).toBe(true);
 expect(screen.queryByText(/ADAPTACIÓN/)).toBeNull();
});
test('home replaces the generic hero with both original covers',()=>{
 render(<MemoryRouter initialEntries={['/']}><App/></MemoryRouter>);
 expect(screen.getByRole('img',{name:'Portada de El Secreto de Shawi'}).getAttribute('src')).toBe('/books/6-9/cover.jpg');
 expect(screen.getByRole('img',{name:'Portada de El Secreto de Ferina y Fredo'}).getAttribute('src')).toBe('/books/10-15/cover.jpg');
 for(const img of screen.getAllByRole('img'))expect(img.getAttribute('src')).toMatch(/^\/books\//);
});
test('worksheet source reference preserves Spanish characters',()=>{
 render(<MemoryRouter initialEntries={['/10-15/actividades/libro-1']}><App/></MemoryRouter>);
 expect(screen.getByText('El Secreto de Ferina y Fredo · PDF 5 · Página impresa 7')).toBeTruthy();
});
test('world progress describes completed interactive activities',()=>{
 localStorage.clear();
 render(<MemoryRouter initialEntries={['/6-9']}><App/></MemoryRouter>);
 expect(screen.getByText(/0 de 7 actividades completadas/)).toBeTruthy();
});
