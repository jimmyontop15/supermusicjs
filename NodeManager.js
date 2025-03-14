const { request } = require("undici");

class NodeManager {
  constructor(nodes) {
    this.nodes = nodes;
    this.activeNode = nodes[0];
  }

  async request(endpoint, options = {}) {
    const url = `${this.activeNode.secure ? "https" : "http"}://${this.activeNode.host}:${this.activeNode.port}${endpoint}`;
    const res = await request(url, {
      ...options,
      headers: {
        Authorization: this.activeNode.password,
        "Content-Type": "application/json",
      },
    });
    return res.body.json();
  }
}

module.exports = NodeManager;
