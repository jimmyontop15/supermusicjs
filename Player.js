const Queue = require("./Queue");

class Player {
  constructor(nodeManager, send) {
    this.nodeManager = nodeManager;
    this.queue = new Queue();
    this.currentTrack = null;
    this.send = send;
  }

  async play(track) {
    if (this.currentTrack) {
      this.queue.add(track);
      return;
    }

    this.currentTrack = track;
    await this.nodeManager.request("/v4/sessions/play", { method: "POST", body: JSON.stringify({ track }) });

    this.checkQueue();
  }

  async checkQueue() {
    if (this.queue.isEmpty()) {
      this.currentTrack = null;
      return;
    }

    this.currentTrack = this.queue.next();
    await this.nodeManager.request("/v4/sessions/play", { method: "POST", body: JSON.stringify({ track: this.currentTrack }) });
  }

  pause() {
    return this.nodeManager.request("/v4/sessions/pause", { method: "POST", body: JSON.stringify({ pause: true }) });
  }

  resume() {
    return this.nodeManager.request("/v4/sessions/pause", { method: "POST", body: JSON.stringify({ pause: false }) });
  }

  stop() {
    this.queue.clear();
    this.currentTrack = null;
    return this.nodeManager.request("/v4/sessions/stop", { method: "POST" });
  }

  setVolume(volume) {
    return this.nodeManager.request("/v4/sessions/volume", { method: "POST", body: JSON.stringify({ volume }) });
  }
}

module.exports = Player;
