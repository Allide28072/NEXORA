/**
 * Reactive Local Storage Layer
 * High-reliability browser persistence with type safety and change listeners.
 */

export class StorageEngine {
  private static prefix = 'nexora_';

  /**
   * Get an item from localStorage
   */
  public static get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (item === null) return defaultValue;
      return JSON.parse(item) as T;
    } catch (e) {
      console.warn(`[Storage] Failed to read key "${key}":`, e);
      return defaultValue;
    }
  }

  /**
   * Set an item in localStorage
   */
  public static set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
      // Dispatch storage event for reactive subscribers
      window.dispatchEvent(new CustomEvent('nexora-storage-update', {
        detail: { key, value }
      }));
      return true;
    } catch (e) {
      console.error(`[Storage] Failed to write key "${key}":`, e);
      return false;
    }
  }

  /**
   * Remove an item
   */
  public static remove(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
      window.dispatchEvent(new CustomEvent('nexora-storage-update', {
        detail: { key, value: null }
      }));
    } catch (e) {
      console.error(`[Storage] Failed to remove key "${key}":`, e);
    }
  }

  /**
   * Clear all NEXORA specific keys
   */
  public static clearAll(): void {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
      window.dispatchEvent(new CustomEvent('nexora-storage-update', {
        detail: { key: '*', value: null }
      }));
    } catch (e) {
      console.error('[Storage] Failed to clear NEXORA keys:', e);
    }
  }

  /**
   * Export all NEXORA data as a JSON string (for backups)
   */
  public static exportDatabaseJson(): string {
    const backup: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        try {
          backup[key.replace(this.prefix, '')] = JSON.parse(localStorage.getItem(key) || 'null');
        } catch {
          backup[key.replace(this.prefix, '')] = localStorage.getItem(key);
        }
      }
    }
    return JSON.stringify(backup, null, 2);
  }

  /**
   * Import database from JSON string
   */
  public static importDatabaseJson(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (typeof data !== 'object' || data === null) return false;
      Object.keys(data).forEach((key) => {
        this.set(key, data[key]);
      });
      return true;
    } catch (e) {
      console.error('[Storage] Failed to import database JSON:', e);
      return false;
    }
  }
}
