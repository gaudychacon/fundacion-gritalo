import { readProgress, markProgress, resetProgress, PROGRESS_KEY } from '../src/utils/progress.js';
beforeEach(() => localStorage.clear());
test('stores only unique technical progress for each world', () => {
  markProgress('6-9', 'chapters', '1'); markProgress('6-9', 'chapters', '1'); markProgress('10-15', 'activities', 'mitos');
  expect(readProgress('6-9').chapters).toEqual(['1']); expect(readProgress('10-15').activities).toEqual(['mitos']);
});
test('malformed and unavailable storage safely fall back', () => {
  localStorage.setItem(PROGRESS_KEY, '{bad'); expect(readProgress('6-9')).toEqual({chapters:[],activities:[]});
  const broken={getItem(){throw Error()},setItem(){throw Error()},removeItem(){throw Error()}};
  expect(() => markProgress('6-9','chapters','1',broken)).not.toThrow(); expect(readProgress('6-9',broken).chapters).toEqual([]);
});
test('reset removes only our application data', () => {
  localStorage.setItem('unrelated','keep'); markProgress('6-9','chapters','1'); resetProgress();
  expect(readProgress('6-9').chapters).toEqual([]); expect(localStorage.getItem('unrelated')).toBe('keep');
});
