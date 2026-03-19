export class BoundedMap<K, V> {
  private map = new Map<K, { value: V; accessedAt: number; createdAt: number }>();
  private maxSize: number;
  private ttlMs: number | null;

  constructor(maxSize: number, ttlMs?: number) {
    this.maxSize = maxSize;
    this.ttlMs = ttlMs ?? null;
  }

  get(key: K): V | undefined {
    const entry = this.map.get(key);
    if (!entry) return undefined;
    if (this.ttlMs && Date.now() - entry.createdAt > this.ttlMs) {
      this.map.delete(key);
      return undefined;
    }
    entry.accessedAt = Date.now();
    return entry.value;
  }

  set(key: K, value: V): this {
    if (this.map.has(key)) {
      const entry = this.map.get(key)!;
      entry.value = value;
      entry.accessedAt = Date.now();
      return this;
    }
    if (this.map.size >= this.maxSize) {
      this.evict();
    }
    this.map.set(key, { value, accessedAt: Date.now(), createdAt: Date.now() });
    return this;
  }

  has(key: K): boolean {
    if (!this.map.has(key)) return false;
    const entry = this.map.get(key)!;
    if (this.ttlMs && Date.now() - entry.createdAt > this.ttlMs) {
      this.map.delete(key);
      return false;
    }
    return true;
  }

  delete(key: K): boolean {
    return this.map.delete(key);
  }

  get size(): number {
    return this.map.size;
  }

  clear(): void {
    this.map.clear();
  }

  values(): V[] {
    this.pruneExpired();
    return Array.from(this.map.values()).map(e => e.value);
  }

  keys(): K[] {
    this.pruneExpired();
    return Array.from(this.map.keys());
  }

  entries(): [K, V][] {
    this.pruneExpired();
    return Array.from(this.map.entries()).map(([k, e]) => [k, e.value]);
  }

  forEach(fn: (value: V, key: K) => void): void {
    this.pruneExpired();
    for (const [key, entry] of this.map) {
      fn(entry.value, key);
    }
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    this.pruneExpired();
    const entries = this.entries();
    let i = 0;
    const iter: IterableIterator<[K, V]> = {
      next(): IteratorResult<[K, V], undefined> {
        if (i < entries.length) {
          return { value: entries[i++], done: false } as IteratorYieldResult<[K, V]>;
        }
        return { value: undefined, done: true } as IteratorReturnResult<undefined>;
      },
      [Symbol.iterator]() { return iter; },
    };
    return iter;
  }

  prune(): number {
    return this.pruneExpired();
  }

  private evict(): void {
    let oldestKey: K | null = null;
    let oldestTime = Infinity;
    for (const [key, entry] of this.map) {
      if (this.ttlMs && Date.now() - entry.createdAt > this.ttlMs) {
        this.map.delete(key);
        return;
      }
      if (entry.accessedAt < oldestTime) {
        oldestTime = entry.accessedAt;
        oldestKey = key;
      }
    }
    if (oldestKey !== null) {
      this.map.delete(oldestKey);
    }
  }

  private pruneExpired(): number {
    if (!this.ttlMs) return 0;
    let pruned = 0;
    const now = Date.now();
    for (const [key, entry] of this.map) {
      if (now - entry.createdAt > this.ttlMs) {
        this.map.delete(key);
        pruned++;
      }
    }
    return pruned;
  }
}
