export const PROGRESS_KEY = 'aprendo-cuidarme:v1';
const empty = () => ({ chapters: [], activities: [] });
const store = (storage) => storage ?? globalThis.localStorage;
export function readProgress(world, storage) {
  try {
    const value = JSON.parse(store(storage).getItem(PROGRESS_KEY) || '{}')[world];
    return { chapters: Array.isArray(value?.chapters) ? value.chapters.filter(x=>typeof x==='string') : [], activities: Array.isArray(value?.activities) ? value.activities.filter(x=>typeof x==='string') : [] };
  } catch { return empty(); }
}
export function markProgress(world, kind, id, storage) {
  if (!['6-9','10-15'].includes(world) || !['chapters','activities'].includes(kind)) return;
  try {
    const data = {'6-9':readProgress('6-9',storage),'10-15':readProgress('10-15',storage)};
    data[world][kind] = [...new Set([...data[world][kind],String(id)])];
    store(storage).setItem(PROGRESS_KEY,JSON.stringify(data));
  } catch { /* Learning remains available when storage is blocked. */ }
}
export function resetProgress(storage) { try { store(storage).removeItem(PROGRESS_KEY); } catch { /* Storage is optional. */ } }
