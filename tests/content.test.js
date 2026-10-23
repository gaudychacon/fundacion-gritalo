import { worlds } from '../src/data/worlds.js';
test.each(['6-9','10-15'])('%s provides source pages and seven distinct original worksheets', age => {
 const w=worlds[age]; expect(w.stories).toHaveLength(age==='6-9'?7:6); expect(w.activities).toHaveLength(7);
 expect(new Set(w.activities.map(a=>a.id)).size).toBe(7);
 expect(w.activities.every(a=>a.type==='workbook')).toBe(true);
 expect(w.stories.every(c=>c.text.length>=2)).toBe(true); expect(w.videos.every(v=>v.youtubeId==='')).toBe(true);
});
