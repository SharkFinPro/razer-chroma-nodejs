const http = require("http");

module.exports = (params, postData) => {
  return new Promise((resolve, reject) => {
    const req = http.request(params, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`statusCode=${res.statusCode}`));
      }
      const body = [];
      res.on("data", (chunk) => {
        body.push(chunk);
      });

      res.on("end", () => {
        resolve(JSON.parse(Buffer.concat(body).toString()));
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
};
