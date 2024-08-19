import { validationResult } from 'express-validator';
import Permissoes from '../models/Permissoes.js';
import paginar from '../modules/paginar.js';

class PermissoesController {
  static async adicionar(req, res) {
    const titulo = req.body.titulo ? req.body.titulo.toLowerCase().trim() : null;
    const descricao = req.body.descricao ? req.body.descricao.toLowerCase().trim() : null;
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const buscarRegistro = await Permissoes.findOne({
        where: {
          titulo,
          descricao,
        },
      });

      if (buscarRegistro) {
        throw new Error('Já existe um registro com esses mesmos dados');
      }

      const novaPermissao = await Permissoes.create({
        titulo,
        descricao,
      });
      res.status(201).json({
        mensagem: 'Nova permissão adicionada com sucesso',
        dados: novaPermissao,
        status: 201,
      });
    } catch (error) {
      if (error.message === 'Erro de validação') {
        return res.status(400).json({
          mensagem: validacao.array()[0].msg,
          status: 400,
        });
      }
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
    return 0;
  }

  static async exibirTodos(req, res) {
    const pagina = req.query.pagina || 1;
    const limite = req.query.limite || 10;
    try {
      const permissoes = paginar(
        await Permissoes.findAll(),
        pagina,
        limite,
      );

      res.status(200).json(permissoes);
    } catch (error) {
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
  }

  static async exibirUm(req, res) {
    const { id } = req.params;
    try {
      const permissao = await Permissoes.findOne({
        where: { id },
      });

      if (!permissao) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      res.status(200).json(permissao);
    } catch (error) {
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
  }

  static async atualizar(req, res) {
    const { id } = req.params;
    const titulo = req.body.titulo ? req.body.titulo.toLowerCase().trim() : null;
    const descricao = req.body.descricao ? req.body.descricao.toLowerCase().trim() : null;
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const permissao = await Permissoes.findOne({
        where: { id },
      });

      if (!permissao) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await Permissoes.update({
        titulo,
        descricao,
      }, {
        where: { id },
      });
      res.status(200).json({
        mensagem: 'Permissão atualizada com sucesso',
        status: 200,
      });
    } catch (error) {
      if (error.message === 'Erro de validação') {
        return res.status(400).json({
          mensagem: validacao.array()[0].msg,
          status: 400,
        });
      }
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
    return 0;
  }

  static async deletar(req, res) {
    const { id } = req.params;
    try {
      const permissao = await Permissoes.findOne({
        where: { id },
      });

      if (!permissao) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await Permissoes.destroy({
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Permissão deletada com sucesso',
        status: 200,
      });
    } catch (error) {
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
  }
}

export default PermissoesController;
