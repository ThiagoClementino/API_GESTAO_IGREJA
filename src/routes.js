import { Router } from "express";

import {getMember, getMemberschek, getMembers, postMembers, deleteMembers, putMembers, getfinance, postfinance, deletefinance, putfinance,   } from "./controllers/UserController.js";
import cors from 'cors'
const routes = Router();
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
import upload from "./dataBaseArquive/UploadFinance.js";

routes.get('/membros/ok', getMemberschek);
routes.get('/membros/:id', getMember);
routes.get('/membros', getMembers);
routes.post('/membros', cors(), postMembers);
routes.delete('/membros/:id', deleteMembers);
routes.put('/membros/:id', putMembers);



routes.get('/finance', getfinance);
routes.post('/finance', cors(), upload.single('comprovante'), postfinance);
routes.delete('/finance/:id', deletefinance);
routes.put('/finance/:id', putfinance);

export default routes;
