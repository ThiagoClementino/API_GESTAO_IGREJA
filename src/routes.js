import { Router } from "express";

import {
  getMember,
  getMemberschek,
  getMembers,
  postMembers,
  deleteMembers,
  putMembers,

  getfinance,
  getfinanceById,
  postfinance,
  deletefinance,
  putfinance,
} from "./controllers/UserController.js";

const routes = Router();

// ==========================================
// MEMBROS
// ==========================================

routes.get(
  "/membros/ok",
  getMemberschek
);

routes.get(
  "/membros",
  getMembers
);

routes.get(
  "/membros/:id",
  getMember
);

routes.post(
  "/membros",
  postMembers
);

routes.put(
  "/membros/:id",
  putMembers
);

routes.delete(
  "/membros/:id",
  deleteMembers
);

// ==========================================
// FINANCEIRO
// ==========================================

routes.get(
  "/finance",
  getfinance
);

routes.get(
  "/finance/:id",
  getfinanceById
);

routes.post(
  "/finance",
  postfinance
);

routes.put(
  "/finance/:id",
  putfinance
);

routes.delete(
  "/finance/:id",
  deletefinance
);

export default routes;