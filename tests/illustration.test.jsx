import React from 'react';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import {Illustration} from '../src/components/common/Illustration';
afterEach(cleanup);
test('missing illustration falls back and a new source can load',()=>{
 const {rerender}=render(<Illustration src="/missing.webp" label="Escena"/>);
 fireEvent.error(screen.getByRole('img'));expect(screen.queryByRole('img')).toBeNull();expect(screen.getByText('/missing.webp')).toBeTruthy();
 rerender(<Illustration src="/available.webp" label="Nueva escena"/>);expect(screen.getByRole('img').getAttribute('src')).toBe('/available.webp');
});
