// server.ts
import { createServer } from "https";
import { parse } from "url";
import next from "next";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Convierte import.meta.url a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Configuración HTTPS
const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, "localhost.key")),
  cert: fs.readFileSync(path.resolve(__dirname, "localhost.crt")),
};

// IP y Puerto para escuchar conexiones
const hostname = "172.20.10.4"; // IP de tu PC en la red local
const port = 3000;

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url || "", true);
    handle(req, res, parsedUrl);
  }).listen(port, hostname, () => {
    console.log(`> Server running on https://${hostname}:${port}`);
  });
});
