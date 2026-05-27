import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

const routes = Router();
const usuarioController = new UsuarioController();

// Definições da rota de criação de usuário
routes.post("/usuarios",usuarioController.criar);

export { routes };