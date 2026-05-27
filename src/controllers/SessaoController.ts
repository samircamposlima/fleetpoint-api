import { Request, Response } from "express";
import { prisma } from "../database";
import{ compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class SessaoController {
    async criar(req: Request, res: Response): Promise<Response>{
        try{
            const{matricula, senha} = req.body;

            if (!matricula || !senha) {
                return res.status(400).json({ error: "Matrícula e senha são obrigatórias."});
            }
            
            const usuario = await prisma.usuario.findUnique({
                where: { matricula }
            });

            if (!usuario) {
                return res.status(401).json({ error: "Creenciais inválidas."});
            }

            const senhaBate = await compare(senha, usuario.senha_hash);

             // Se a senha estiver errada, barra aqui com o mesmo erro por segurança
             if (!senhaBate) {
            return res.status(401).json({ error: "Credenciais inválidas." });
            }

            const token = sign(
                { regra: usuario.regra },
                "CHAVE_SECRETA_GENERICA_DE_TESTE", //DEPOIS MOVER ISTO PRA .ENV
                {
                    subject: usuario.id,
                    expiresIn: "1d"
                }
            );

            return res.json({
                usuario: {
                    id: usuario.id,
                    matricula: usuario.matricula,
                    regra: usuario.regra
                },
                token
            });

        }catch(error){
            console.error(error);
            return res.status(500).json({error: "Erro interno no teste de lógica"})
        }
    }
}