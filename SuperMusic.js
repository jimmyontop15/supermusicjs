const NodeManager = require("./NodeManager");
const Player = require("./Player");

class SuperMusic {
  constructor(client, options) {
    this.client = client;
    this.nodes = new NodeManager(options.nodes);
    this.players = new Map();
    this.send = options.send;
  }

  createPlayer(guildId) {
    if (this.players.has(guildId)) return this.players.get(guildId);
    const player = new Player(this.nodes, this.send);
    this.players.set(guildId, player);
    return player;
  }
}

module.exports = SuperMusic;
