const httpRequest = require("./httpRequest.js");

module.exports = {
  effects: [],
  // Check if Chroma is active
  isActive(debug) {
    const active = this.sessionid != null;

    if (debug) {
      console.error(new Error(`Chroma editing is ${active ? "already" : "not"} active`));
    }

    return active;
  },
  // Set interval that runs every second sending a heartbeat to the Chroma Rest API
  sendHeartbeat() {
    this.heartbeat = setInterval(() => {
      if (!this.isActive()) {
        return;
      }

      httpRequest({
        hostname: "localhost",
        port: this.sessionid,
        path: "/chromasdk/heartbeat",
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      }).catch(console.error);
    }, 5000);
  },
  // Initiate the connection to Chroma
  init(callback) {
    if (this.isActive()) {
      return;
    }

    httpRequest({
      hostname: "localhost",
      port: 54235,
      path: "/razer/chromasdk",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 10000
    }, JSON.stringify({
      "title": "Razer Chroma nodejs Editor",
      "description": "This edits Razer Chroma effects using nodejs",
      "author": {
        "name": "Alex Martin",
        "contact": "https://github.com/SharkFinPro"
      },
      "device_supported": [
        "keyboard",
        "mouse",
        "headset",
        "mousepad",
        "keypad",
        "chromalink"],
      "category": "application"
    })).then((data) => {
      this.sessionid = data.sessionid;
      this.sendHeartbeat();
      if (callback) {
        setTimeout(callback, 2000);
      }
    }).catch(console.error);
  },
  // End the connection with Chroma
  close(callback) {
    if (!this.isActive()) {
      return;
    }

    for (let effect in this.effects) {
      clearInterval(this.effects[effect]);
    }

    clearInterval(this.heartbeat);

    httpRequest({
      hostname: "localhost",
      port: this.sessionid,
      path: "/chromasdk",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      this.sessionid = undefined;
      if (callback) {
        callback();
      }
    }).catch(console.error);
  },
  // Get effect data parameters
  getEffectData(effect, param) {
    if (effect === "CHROMA_NONE") {
      return JSON.stringify({ effect });
    } else if (effect === "CHROMA_STATIC") {
      return JSON.stringify({
        effect,
        param: {
          color: param
        }
      });
    }
    return JSON.stringify({ effect, param });
  },
  // Create effect to be applied later
  createEffect(type, effect, param) {
    return new Promise((resolve, reject) => {
      if (!this.isActive()) {
        return;
      }

      const postData = this.getEffectData(effect, param);

      httpRequest({
        hostname: "localhost",
        port: this.sessionid,
        path: `/chromasdk/${type}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": postData.length
        }
      }, postData).then((data) => {
        resolve(data.id);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // Apply an effect
  setEffect(id) {
    if (!this.isActive()) {
      return;
    }

    httpRequest({
      hostname: "localhost",
      port: this.sessionid,
      path: "/chromasdk/effect",
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    }, JSON.stringify({ id })).catch(console.error);
  }
};
