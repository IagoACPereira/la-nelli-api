import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Funcionarios from '../models/Funcionarios.js';
import Permissoes from '../models/Permissoes.js';

class AuthController {
  static async auth(req, res) {
    const email = req.body.email ? req.body.email.toLowerCase().trim() : null;
    const { senha } = req.body;
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const funcionario = await Funcionarios.findOne({
        where: { email },
        attributes: ['id', 'nome', 'telefone', 'email', 'senha', 'salario', 'data_contratacao'],
        include: [
          {
            model: Permissoes,
          },
        ],
      });

      if (!funcionario) {
        throw new Error('Email inválido');
      }

      if (!(await bcrypt.compare(senha, funcionario.senha))) {
        throw new Error('Senha inválida');
      }

      const payload = {
        id: funcionario.id,
        nome: funcionario.nome,
        telefone: funcionario.telefone,
        email: funcionario.email,
        dataContratacao: funcionario.data_contratacao,
        permissao: funcionario.permisso.titulo,
      };

      const token = jwt.sign(payload, process.env.SEGREDO, {
        expiresIn: 60 * 60 * 12, // 12 Horas
      });

      res.status(202).json({
        mensagem: 'Usuário autenticado com sucesso',
        token,
      });
    } catch (error) {
      if (error.message === 'Erro de validação') {
        return res.status(400).json({
          mensagem: validacao.array()[0].msg,
        });
      }
      res.status(401).json({
        mensagem: error.message,
      });
    }
    return 0;
  }
}

export default AuthController;
