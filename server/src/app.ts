import path from "path";
import type http from "http";
import cors from "cors";
import express from "express";
import { ExpressPeerServer } from "peer";
import { env } from "./config/env";
import { feedbackRouter } from "./routes/feedback";

export function createApp(server: http.Server) {
  const app = express();
  app.use(cors({ origin: env.clientOrigins }));
  app.use(express.json({ limit: "20kb" }));

  app.use("/peerjs", ExpressPeerServer(server, { path: "/" }));
  app.use("/api/feedback", feedbackRouter);

  if (env.isProd) {
    const dist = path.resolve(__dirname, "../../client/dist");
    app.use(express.static(dist));
    app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
  }
  return app;
}
