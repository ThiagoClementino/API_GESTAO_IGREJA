import express from "express";
import cors from "cors";

import connectDatabase from "./database/database.js";
import routes from "./routes.js";

const PORT = process.env.PORT || 3060;

const app = express();

app.use(cors());
app.use(express.json());

/*
 * Conecta ao MongoDB antes de processar
 * as rotas que dependem do banco.
 */
app.use(async (req, res, next) => {
  try {
    await connectDatabase();
    next();
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
});

app.use(routes);

app.get("/", (req, res) => {
  res.send(
    "API funcionando corretamente!"
  );
});

/*
 * Vercel utiliza o Express exportado
 * como handler da aplicação.
 */
export default app;

/*
 * Servidor local.
 * Na Vercel este trecho não é executado.
 */
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(
      `Servidor rodando em http://localhost:${PORT}`
    );
  });
}