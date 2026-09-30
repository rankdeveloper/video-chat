// import "dotenv/config";

// export const env = {
//   port: Number(process.env.PORT) || 3030,
//   mongoUri: process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/hola-amigo",
//   clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
//   isProd: process.env.NODE_ENV === "production",
// };

import path from "path";
import dotenv from "dotenv";

const envFile = `.env.${process.env.NODE_ENV ?? "development"}`;
dotenv.config({ path: path.resolve(__dirname, "../../", envFile) });
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const env = {
  port: Number(process.env.PORT) || 3030,
  mongoUri: process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/hola-amigo",
  // clientOrigins: (process.env.CLIENT_ORIGIN ?? "http://localhost:5173")
  //   .split(",")
  //   .map((s) => s.trim()),
  clientOrigins: true as any, // accepts every origin
  isProd: process.env.NODE_ENV === "production",
};
