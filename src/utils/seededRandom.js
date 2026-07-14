// A simple seeded random number generator (Linear Congruential Generator)
export class SeededRandom {
  constructor(seedString) {
    this.seed = this._hashString(seedString);
  }

  // Convert string to an initial integer seed
  _hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) || 1;
  }

  // Returns a pseudo-random number between 0 and 1
  next() {
    // LCG parameters
    const a = 1664525;
    const c = 1013904223;
    const m = 4294967296; // 2^32
    
    this.seed = (a * this.seed + c) % m;
    return this.seed / m;
  }

  // Returns a random element from an array using the seeded random
  pick(array) {
    if (!array || array.length === 0) return null;
    const index = Math.floor(this.next() * array.length);
    return array[index];
  }

  // Shuffles an array in place using the seeded random
  shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(this.next() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }
}
