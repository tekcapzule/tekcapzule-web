export interface CacheItem {
  body: any;
  expiry: number;
}

export interface CacheManager {
  getItem: (key: string) => CacheItem | null;
  setItem: (key: string, value: CacheItem) => void;
  removeItem: (key: string) => void;
  removeAll: () => void;
}

class SessionCacheManager implements CacheManager {
  private cacheKeys = new Set<string>();

  getItem(key: string): CacheItem | null {
    const item: string = window.sessionStorage.getItem(key);

    if (item) {
      this.cacheKeys.add(key);
      return JSON.parse(item);
    }

    return null;
  }

  setItem(key: string, value: CacheItem): void {
    window.sessionStorage.setItem(key, JSON.stringify(value));
    this.cacheKeys.add(key);
  }

  removeItem(key: string): void {
    window.sessionStorage.removeItem(key);
  }

  removeAll(): void {
    this.cacheKeys.forEach(key => {
      console.log('removing cache for ' + key);
      this.removeItem(key);
    });
  }
}

const cacheManager: CacheManager = new SessionCacheManager();
export { cacheManager };
