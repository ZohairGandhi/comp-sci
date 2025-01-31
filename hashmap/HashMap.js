export default class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);

    for (let i = 0; i < this.capacity; i += 1) {
      this.buckets[i] = [];
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    let i = 0;
    for (let pair of bucket) {
      if (pair.key === key) {
        bucket[i] = { key, value };

        if (this.length() > Math.round(this.loadFactor * this.capacity)) {
          this.resize();
        }
        return;
      }

      i += 1;
    }

    bucket.push({ key, value });
    if (this.length() > Math.round(this.loadFactor * this.capacity)) {
      this.resize();
    }
  }

  resize() {
    const entries = this.entries();

    this.capacity = this.capacity * 2;
    for (let i = 0; i < this.capacity; i += 1) {
      this.buckets[i] = [];
    }

    entries.forEach((entry) => {
      this.set(entry[0], entry[1]);
    });
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let pair of bucket) {
      if (pair.key === key) {
        return pair.value;
      }
    }

    return null;
  }

  has(key) {
    return this.get(key) ? true : false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    let i = 0;
    for (let pair of bucket) {
      if (pair.key === key) {
        bucket.splice(i, 1);
        return;
      }
    }
  }

  length() {
    let count = 0;
    this.buckets.forEach((bucket) => (count += bucket.length));
    return count;
  }

  clear() {
    this.buckets = new Array(this.capacity);

    for (let i = 0; i < this.capacity; i += 1) {
      this.buckets[i] = [];
    }
  }

  keys() {
    const keys = [];
    this.buckets.forEach((bucket) =>
      bucket.forEach((pair) => keys.push(pair.key))
    );
    return keys;
  }

  values() {
    const values = [];
    this.buckets.forEach((bucket) =>
      bucket.forEach((pair) => values.push(pair.value))
    );
    return values;
  }

  entries() {
    const entries = [];
    this.buckets.forEach((bucket) =>
      bucket.forEach((pair) => entries.push([pair.key, pair.value]))
    );
    return entries;
  }
}
