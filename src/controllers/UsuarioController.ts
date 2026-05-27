import { Request, Response } from "express";
import { prisma } from "../database";
import { hash } from "bcryptjs"

export class UsuarioController {
    async criar(req: Request, res: Response): Promise<Response> {
        try{
            const {matricula, senha, regra} = req.body;

            // Validação básica dos dados obrigatórios
            if(!matricula || !senha || !regra){
                return res.status(400).json({error:"Dados incompletos para registro."})
            }
// Verificação lógica de duplicidade no banco
      const usuarioExiste = await prisma.usuario.findUnique({
        where: { matricula }
      });

      if (usuarioExiste) {
        return res.status(400).json({ error: "Esta matrícula já está cadastrada." });
      }

      const senhaCriptografada = await hash(senha, 10);

      // Persistência matemática no PostgreSQL via Prisma
      const novoUsuario = await prisma.usuario.create({
        data: {
            matricula,
            senha_hash : senhaCriptografada,
            regra
        }
      });

      return res.status(201).json({
        id: novoUsuario.id,
        matricula: novoUsuario.matricula,
        regra: novoUsuario.regra,
        criado_em: novoUsuario.criado_em
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno ao processar o registro." });
    }
  }
}