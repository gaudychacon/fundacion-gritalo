import { worlds } from '../src/data/worlds.js';
test.each(['6-9','10-15'])('%s provides six adapted chapters and eight distinct activities', age => {
 const w=worlds[age]; expect(w.stories).toHaveLength(6); expect(w.activities).toHaveLength(8);
 expect(new Set(w.activities.map(a=>a.id)).size).toBe(8);
 expect(w.activities.some(a=>a.type==='order')).toBe(true); expect(w.activities.some(a=>a.type==='network')).toBe(true);
 expect(w.stories.every(c=>c.text.length>=2)).toBe(true); expect(w.videos.every(v=>v.youtubeId==='')).toBe(true);
});
