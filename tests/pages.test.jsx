import React from 'react';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import App from '../src/App.jsx';
import {VideoCard} from '../src/components/videos/VideoCard.jsx';
import {readProgress} from '../src/utils/progress';
afterEach(cleanup);
test.each(['/','/6-9','/10-15','/6-9/historias','/10-15/aprende','/6-9/videos','/10-15/actividades','/6-9/ayuda'])('route %s renders a main heading and help link',path=>{
 render(<MemoryRouter initialEntries={[path]}><App/></MemoryRouter>);expect(screen.getByRole('main').querySelector('h1')).not.toBeNull(); expect(screen.getAllByRole('link',{name:/Necesito ayuda/}).length).toBeGreaterThan(0);
});
test('unknown chapter is a friendly not found instead of an exception',()=>{render(<MemoryRouter initialEntries={['/6-9/historias/no-existe']}><App/></MemoryRouter>);expect(screen.getByRole('heading',{name:/encontramos/})).toBeTruthy();});
test('video has no third-party request until explicit activation',()=>{
 const {container}=render(<VideoCard video={{titulo:'Video de prueba',descripcion:'Tema',youtubeId:'dQw4w9WgXcQ',thumbnail:'/missing.webp'}}/>);
 expect(container.querySelector('iframe')).toBeNull();fireEvent.click(screen.getByRole('button',{name:/Reproducir/}));expect(container.querySelector('iframe').src).toContain('youtube-nocookie.com/embed/dQw4w9WgXcQ');
});
test.each(['1e0','1.0','01'])('invalid chapter %s cannot create duplicate progress',id=>{
 localStorage.clear();render(<MemoryRouter initialEntries={[`/6-9/historias/${id}`]}><App/></MemoryRouter>);
 expect(screen.getByRole('heading',{name:/encontramos/})).toBeTruthy();expect(readProgress('6-9').chapters).toEqual([]);
});
test('video filters and lesson disclosure expose relevant content',()=>{
 const {unmount}=render(<MemoryRouter initialEntries={['/6-9/videos']}><App/></MemoryRouter>);
 fireEvent.click(screen.getByRole('button',{name:'Secretos'}));expect(screen.getByRole('heading',{name:'Sorpresa o secreto'})).toBeTruthy();expect(screen.queryByRole('heading',{name:'Mi cuerpo merece respeto'})).toBeNull();
 unmount();render(<MemoryRouter initialEntries={['/10-15/aprende']}><App/></MemoryRouter>);
 const summary=screen.getByText('Página 7').closest('summary');fireEvent.click(summary);expect(summary.parentElement.open).toBe(true);
});
