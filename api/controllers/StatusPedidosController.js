import { validationResult } from 'express-validator';
import StatusPedidos from '../models/StatusPedidos.js';
import Pedidos from '../models/Pedidos.js';

class StatusPedidosController {
  static async adicionar(req, res) {
    const status = req.body.status.toLowerCase().trim();
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const buscarRegistro = await StatusPedidos.findOne({
        where: { status },
      });

      if (buscarRegistro) {
        throw new Error('Já existe um registro com esses mesmos dados');
      }

      const novoStatus = await StatusPedidos.create({ status });
      res.status(201).json({
        mensagem: 'Novo status adicionado com sucesso',
        dados: novoStatus,
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
    try {
      const statusPedidos = await StatusPedidos.findAll({
        include: [
          {
            model: Pedidos,
            attributes: ['id', 'data_pedido', 'total'],
          },
        ],
      });

      res.status(200).json(statusPedidos);
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
      const statusPedido = await StatusPedidos.findOne({
        where: { id },
        include: [
          {
            model: Pedidos,
            attributes: ['id', 'data_pedido', 'total'],
          },
        ],
      });

      if (!statusPedido) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      res.status(200).json(statusPedido);
    } catch (error) {
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
  }

  static async atualizar(req, res) {
    const { id } = req.params;
    const status = req.body.status.toLowerCase().trim();
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const statusPedido = await StatusPedidos.findOne({
        where: { id },
      });

      if (!statusPedido) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await StatusPedidos.update({ status }, {
        where: { id },
      });
      res.status(200).json({
        mensagem: 'Status atualizado com sucesso',
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
      const statusPedido = await StatusPedidos.findOne({
        where: { id },
      });

      if (!statusPedido) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await StatusPedidos.destroy({
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Status deletado com sucesso',
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

export default StatusPedidosController;
