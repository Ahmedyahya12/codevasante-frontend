// src/store/storage.ts
import createWebStorageModule from 'redux-persist/lib/storage/createWebStorage';

type WebStorage = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
};

const createNoopStorage = (): WebStorage => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, _value: string) {
    return Promise.resolve();
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

const createWebStorage =
  typeof createWebStorageModule === 'function'
    ? createWebStorageModule
    : (createWebStorageModule as any).default;

const storage: WebStorage =
  typeof window !== 'undefined' && typeof createWebStorage === 'function'
    ? createWebStorage('local')
    : createNoopStorage();

export default storage;
