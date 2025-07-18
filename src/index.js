import express from "express";
import connectDatabase from "./database/database.js";
import routes from "./routes.js";
import cors from "cors";
const PORT = 3060;

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  console.log(
    `Mais informações, leia o README desta aplicação através do link: https://github.com/ThiagoClementino/Api_usuarios.git`
  );
  res.send("API funcionando corretamente!");
});

connectDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Servidor e Banco de dados rodando no endereço: http://localhost:${PORT}`
      )
    );
  })
  .catch((erro) => console.log("Banco de dados não conectado"));
