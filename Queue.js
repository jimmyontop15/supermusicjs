class Queue {
  constructor() {
    this.songs = [];
  }

  add(song) {
    this.songs.push(song);
  }

  next() {
    return this.songs.shift();
  }

  isEmpty() {
    return this.songs.length === 0;
  }

  clear() {
    this.songs = [];
  }
}

module.exports = Queue;
