const httpRequest = require("./httpRequest.js");

module.exports = {
  isNotActive(hideError) {
    if (this.sessionid) {
      return false;
    }
    if (!hideError) {
      console.error("Error: Chroma editing is not active");
    }
    return true;
  },
  isActive(hideError) {
    if (!this.sessionid) {
      return false;
    }
    if (!hideError) {
      console.error("Error: Chroma editing is already active");
    }
    return true;
  },
  sendHeartbeat() {
    this.heartbeat = setInterval(() => {
      if (this.isNotActive()) {
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
    }, 1000);
  },
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
      }
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
        callback();
      }
    }).catch(console.error);
  },
  uninit(callback) {
    if (this.isNotActive()) {
      return;
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
  getEffectData(effect, param) {
    if (effect === "CHROMA_NONE") {
      return JSON.stringify({ effect });
    } else if (effect === "CHROMA_STATIC") {
      return JSON.stringify({
        effect,
        "param": {
          "color": param
        }
      });
    } else {
      return JSON.stringify({ effect, param });
    }
  },
  createEffect(type, effect, param) {
    return new Promise((resolve, reject) => {
      if (this.isNotActive()) {
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
  setEffect(id) {
    if (this.isNotActive()) {
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
