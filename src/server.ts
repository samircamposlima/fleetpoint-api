// src/server.ts
import express from 'express';

const app = express();

// Middleware para permitir que o Express entenda JSON nas requisições
app.use(express.json());

// Rota genérica de teste de lógica/sistema (mantendo o padrão neutro)
app.get('/teste-sistema', (req, res) => {
  return res.json({ 
    status: "operacional", 
    timestamp: new Date().toISOString(),
    ambiente: "Node.js + Express + TypeScript" 
  });
});

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`🚀 Servidor FleetPoint-API rodando na porta ${PORT}`);
});