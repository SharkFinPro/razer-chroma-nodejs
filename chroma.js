const http = require("http");

module.exports = {
    sendHeartbeat() {
        if (!this.sessionid) {
            return;
        }
        this.heartbeat = setInterval(() => {
            if (!this.sessionid) {
                return;
            }

            const req = http.request({
                hostname: "localhost",
                port: this.sessionid,
                path: "/chromasdk/heartbeat",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            }).on("error", console.error);
            req.end();
        }, 1000);
    },
    init(callback) {
        if (this.sessionid) {
            return console.error("Error: Chroma editing is already active");
        }
        const postData = JSON.stringify({
            "title": "Razer Chroma nodejs Editor",
            "description": "This edits Razer Chroma effects using nodejs",
            "author": {
                "name": "Alex Martin",
                "contact": "https://github.com/sharkfinpro"
            },
            "device_supported": [
                "keyboard",
                "mouse",
                "headset",
                "mousepad",
                "keypad",
                "chromalink"],
            "category": "application"
        });

        const req = http.request({
            hostname: "localhost",
            port: 54235,
            path: "/razer/chromasdk",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": postData.length
            }
        }, (res) => {
            res.setEncoding("utf8");
            res.on("data", (chunk) => {
                this.sessionid = JSON.parse(chunk).sessionid;
            });
            res.on("end", () => {
                this.sendHeartbeat();
                if (callback) {
                    callback();
                }
            });
        }).on("error", console.error);

        req.write(postData);
        req.end();
    },
    uninit(callback) {
        if (!this.sessionid) {
            return console.error("Error: Chroma editing is not active");
        }
        this.heatbeat = clearInterval(this.heartbeat);

        const req = http.request({
            hostname: "localhost",
            port: this.sessionid,
            path: "/chromasdk",
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }, (res) => {
            res.setEncoding("utf8");
            res.on("data", (chunk) => {
                this.sessionid = undefined;
            });
            res.on("end", () => {
                if (callback) {
                    callback();
                }
            });
        }).on("error", console.error);

        req.end();
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
        if (!this.sessionid) {
            return console.error("Error: Chroma editing is not active");
        }
        const postData = this.getEffectData(effect, param);

        const req = http.request({
            hostname: "localhost",
            port: this.sessionid,
            path: "/chromasdk/" + type,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": postData.length
            }
        }, (res) => {
            res.setEncoding("utf8");
            res.on("data", (chunk) => {
                setTimeout(() => this.setEffect(JSON.parse(chunk).id), 600);
            });
        }).on("error", console.error);

        req.write(postData);
        req.end();
    },
    setEffect(id) {
        if (!this.sessionid) {
            return console.error("Error: Chroma editing is not active");
        }
        const postData = JSON.stringify({ id });

        const req = http.request({
            hostname: "localhost",
            port: this.sessionid,
            path: "/chromasdk/effect",
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": postData.length
            }
        }).on("error", console.error);

        req.write(postData);
        req.end();
    }
};
