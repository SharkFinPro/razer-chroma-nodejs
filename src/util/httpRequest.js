const http = require("http");

module.exports = (params, postData) => {
  return new Promise((resolve, reject) => {
    // Make the request with passed parameters
    const req = http.request(params, (res) => {
      // Reject if bad status code
      if (res.statusCode < 200 || res.statusCode >= 300) {
        reject(new Error(`statusCode=${res.statusCode}`));
      }

      // Make body array and add data to that array when data is recieved
      const body = [];
      res.on("data", (chunk) => {
        body.push(chunk);
      });

      // Resolve the data from the arrey on the end of data input
      res.on("end", () => {
        resolve(JSON.parse(Buffer.concat(body).toString()));
      });
    });

    // Reject an error on the request
    req.on("error", (err) => {
      reject(err);
    });

    req.on("timeout", () => {
      reject("timed out");
      req.destroy();
    });

    // If data is passed then send data
    if (postData) {
      req.write(postData);
    }

    // End request
    req.end();
  });
};
