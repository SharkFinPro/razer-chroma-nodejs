const http = require("http");

const httpRequest = (params, postData) => {
    return new Promise((resolve, reject) => {
        const req = http.request(params, (res) => {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            const body = [];
            res.on('data', (chunk) => {
                body.push(chunk);
            });

            res.on('end', () => {
                resolve(JSON.parse(Buffer.concat(body).toString()));
            });
        });

        req.on('error', (err) => {
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        req.end();
    });
};

module.exports = {
    sendHeartbeat() {
        if (!this.sessionid) {
            return;
        }
        this.heartbeat = setInterval(() => {
            if (!this.sessionid) {
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
            });
        }, 1000);
    },
    init(callback) {
        if (this.sessionid) {
            return console.error("Error: Chroma editing is already active");
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
        })).then((data) => {
            this.sessionid = data.sessionid;
            this.sendHeartbeat();
            callback();
        });
    },
    uninit(callback) {
        if (!this.sessionid) {
            return console.error("Error: Chroma editing is not active");
        }
        this.heartbeat = clearInterval(this.heartbeat);

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
            callback();
        });
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

        return httpRequest({
            hostname: "localhost",
            port: this.sessionid,
            path: "/chromasdk/" + type,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": postData.length
            }
        }, postData);
    },
    setEffect(data) {
        if (!this.sessionid) {
            return console.error("Error: Chroma editing is not active");
        }
        setTimeout(() => {
            const postData = JSON.stringify({ id: data.id });
            httpRequest({
                hostname: "localhost",
                port: this.sessionid,
                path: "/chromasdk/effect",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": postData.length
                }
            }, postData);
        }, 600);
    }
};
