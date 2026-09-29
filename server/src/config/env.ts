import "dotenv/config";

export const env = {
  port: Number(process.env.PORT) || 3030,
  mongoUri: process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/hola-amigo",
  clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
  isProd: process.env.NODE_ENV === "production",
};
