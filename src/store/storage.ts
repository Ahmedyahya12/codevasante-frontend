import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import type { WebStorage } from 'redux-persist/es/types';

const createNoopStorage = (): WebStorage => {
  return {
    getItem(_key: string): Promise<string | null> {
      return Promise.resolve(null);
    },

    setItem(_key: string, _value: string): Promise<void> {
      return Promise.resolve();
    },

    removeItem(_key: string): Promise<void> {
      return Promise.resolve();
    },
  };
};

const storage: WebStorage =
  typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export default storage;
