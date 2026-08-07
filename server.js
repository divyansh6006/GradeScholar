/**
 * Custom entry point for Hostinger's Node.js app hosting (Phusion Passenger).
 * Passenger spawns this file directly with `node server.js` rather than
 * running an npm script, so `next start` alone isn't enough here.
 */
const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, () => {
    console.log(`> Ready on port ${port} (env: ${dev ? "development" : "production"})`);
  });
});
