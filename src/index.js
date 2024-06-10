import express from "express";
import connectDatabase from "./Database/Database.js";
import routes from './routes.js'
import cors from "cors"

const app = express();
app.use(cors())
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3080


connectDatabase()
  .then(() => {
    app.listen(port, () => console.log(`Servidor e Banco de dados rodando no endereço: http://localhost:3080`)
    );
  })
  .catch((erro) => console.log("Banco de dados não conectado", ));


