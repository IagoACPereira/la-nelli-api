import { validationResult } from 'express-validator';
import Pedidos from '../models/Pedidos.js';

class PedidosController {
  static async adicionar(req, res) {
    const {
      dataPedido,
      total,
      idCliente,
    } = req.body;
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }
      const novoPedido = await Pedidos.create({
        data_pedido: dataPedido,
        total,
        id_cliente: idCliente,
        id_status: 5,
      });
      res.status(201).json({
        mensagem: 'Novo pedido adicionado com sucesso',
        dados: novoPedido,
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
      const pedidos = await Pedidos.findAll();
      res.status(200).json(pedidos);
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
      const pedido = await Pedidos.findOne({
        where: { id },
      });

      res.status(200).json(pedido);
    } catch (error) {
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
  }

  static async atualizar(req, res) {
    const { id } = req.params;
    const {
      dataPedido,
      total,
      idCliente,
      idStatus,
    } = req.body;
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }
      await Pedidos.update({
        data_pedido: dataPedido,
        total,
        id_cliente: idCliente,
        id_status: idStatus,
      }, {
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Pedido atualizado com sucesso',
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
    } return 0;
  }

  static async deletar(req, res) {
    const { id } = req.params;
    try {
      await Pedidos.destroy({
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Pedido deletado com sucesso',
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

export default PedidosController;
