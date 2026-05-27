// src/server.ts
import express from 'express';
import { routes } from './routes';

const app = express();

// Middleware para permitir que o Express entenda JSON nas requisições
app.use(express.json());

app.use(routes) // Ativar as nossas rotras no servidor

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`🚀 Servidor FleetPoint-API rodando na porta ${PORT}`);
});