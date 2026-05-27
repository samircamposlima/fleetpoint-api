import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { SessaoController } from "../controllers/SessaoController";

const routes = Router();
const usuarioController = new UsuarioController();
const sessaoController = new SessaoController();

// Definições da rota de criação de usuário
routes.post("/usuarios",usuarioController.criar);
routes.post("/sessoes",sessaoController.criar);

export { routes };