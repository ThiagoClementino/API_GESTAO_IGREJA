import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connectDatabase from "./database/database.js";
import routes from "./routes.js";

dotenv.config();

const app = express();

const PORT =
  process.env.PORT || 3060;

// ==========================================
// CORS
// ==========================================

const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  "http://localhost:3000"
)
  .split(",")
  .map((origin) =>
    origin.trim()
  )
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// ==========================================
// JSON
// ==========================================

app.use(
  express.json({
    limit: "1mb",
  })
);

// ==========================================
// HEALTH CHECK API
// ==========================================

app.get("/", (req, res) => {
  return res.status(200).json({
    api: "online",
    mensagem:
      "API funcionando corretamente!",
  });
});

// ==========================================
// HEALTH CHECK DATABASE
// ==========================================

app.get(
  "/health/db",
  async (req, res) => {
    try {
      await connectDatabase();

      return res.status(200).json({
        api: "online",
        database: "conectado",
      });
    } catch (erro) {
      console.error(
        "Erro MongoDB:",
        erro
      );

      return res.status(503).json({
        api: "online",
        database:
          "desconectado",
      });
    }
  }
);

// ==========================================
// DATABASE MIDDLEWARE
// ==========================================

app.use(
  async (req, res, next) => {
    try {
      await connectDatabase();

      return next();
    } catch (erro) {
      console.error(
        "Erro de conexão com MongoDB:",
        erro
      );

      return res.status(500).json({
        erro:
          "Não foi possível conectar ao banco de dados.",
      });
    }
  }
);

// ==========================================
// ROTAS
// ==========================================

app.use(routes);

// ==========================================
// 404
// ==========================================

app.use((req, res) => {
  return res.status(404).json({
    erro:
      "Rota não encontrada",
  });
});

// ==========================================
// SERVIDOR LOCAL
// ==========================================

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(
      `Servidor rodando em http://localhost:${PORT}`
    );
  });
}

export default app;