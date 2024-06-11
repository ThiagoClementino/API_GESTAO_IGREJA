import express from "express";
import connectDatabase from "./database/database.js";
import routes from './routes.js'
import cors from "cors"
const PORT = 3080;

const app = express();
app.use(cors())
app.use(express.json());
app.use(routes);




connectDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor e Banco de dados rodando no endereço: http://localhost:${PORT}`)
    );
  })
  .catch((erro) => console.log("Banco de dados não conectado", ));


