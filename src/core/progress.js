const STORAGE_KEY = 'mahjong.completed';

function readStored() {
  try {
    const ids = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(ids) ? ids : [];
  } catch (unused) {
    return [];
  }
}

class ProgressStore {
  constructor() {
    this.completed = new Set(readStored());
  }

  has(id) {
    return this.completed.has(id);
  }

  complete(id) {
    if (this.has(id)) return;
    this.completed.add(id);
    this.persist();
  }

  persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.completed]));
    } catch (unused) {
      return;
    }
  }
}

export const Progress = new ProgressStore();
