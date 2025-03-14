class Player {
  constructor(nodeManager, send) {
    this.nodeManager = nodeManager;
    this.queue = [];
    this.currentTrack = null;
    this.send = send;
  }

  async play(track) {
    this.currentTrack = track;
    await this.nodeManager.request("/v4/sessions/play", { method: "POST", body: JSON.stringify({ track }) });
  }

  pause() {
    return this.nodeManager.request("/v4/sessions/pause", { method: "POST", body: JSON.stringify({ pause: true }) });
  }

  resume() {
    return this.nodeManager.request("/v4/sessions/pause", { method: "POST", body: JSON.stringify({ pause: false }) });
  }

  stop() {
    this.currentTrack = null;
    return this.nodeManager.request("/v4/sessions/stop", { method: "POST" });
  }

  setVolume(volume) {
    return this.nodeManager.request("/v4/sessions/volume", { method: "POST", body: JSON.stringify({ volume }) });
  }
}

module.exports = Player;
