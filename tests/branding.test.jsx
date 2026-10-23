import React from 'react';
import {readFileSync} from 'node:fs';
import {render,screen,cleanup} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import App from '../src/App.jsx';
import {site} from '../src/data/worlds.js';

afterEach(cleanup);

test('uses the exact requested branding in configuration and static title',()=>{
 expect(site.name).toBe('Yo Digo NO');
 expect(readFileSync('index.html','utf8')).toContain('<title>Yo Digo NO</title>');
});

test('shows Yo Digo NO on the homepage, navigation, footer and browser title',()=>{
 render(<MemoryRouter initialEntries={['/']}><App/></MemoryRouter>);
 expect(screen.getByRole('heading',{level:1,name:'Yo Digo NO'})).toBeTruthy();
 expect(screen.getByRole('link',{name:'Yo Digo NO, inicio'})).toBeTruthy();
 expect(screen.getByRole('link',{name:'Yo Digo NO'})).toBeTruthy();
 expect(document.title).toBe('Yo Digo NO');
 expect(screen.queryByText('Aprendo a cuidarme')).toBeNull();
});
