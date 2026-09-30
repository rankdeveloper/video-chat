import http from "http";
import mongoose from "mongoose";
import { createApp } from "./app";
import { env } from "./config/env";
import { attachSockets } from "./sockets/room";

async function main() {
  await mongoose.connect(env.mongoUri);
  const server = http.createServer();
  server.on("request", createApp(server));
  attachSockets(server, env.clientOrigins);
  server.listen(env.port, () =>
    console.log(`Server on http://localhost:${env.port}`),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
