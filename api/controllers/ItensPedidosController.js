import { validationResult } from 'express-validator';
import ItensPedidos from '../models/ItensPedidos.js';

class ItensPedidosController {
  static async adicionar(req, res) {
    const quantidade = req.body.quantidade.toLowerCase().trim();
    const idPedido = req.body.idPedido.toLowerCase().trim();
    const idProduto = req.body.idProduto.toLowerCase().trim();
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const buscarRegistro = await ItensPedidos.findOne({
        where: {
          quantidade,
          id_pedido: idPedido,
          id_produto: idProduto,
        },
      });

      if (buscarRegistro) {
        throw new Error('Já existe um registro com esses mesmos dados');
      }

      const novoItem = await ItensPedidos.create({
        quantidade,
        id_pedido: idPedido,
        id_produto: idProduto,
      });
      res.status(201).json({
        mensagem: 'Novo item adicionado com sucesso',
        dados: novoItem,
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
      const itensPedidos = await ItensPedidos.findAll();

      res.status(200).json(itensPedidos);
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
      const itemPedido = await ItensPedidos.findOne({
        where: { id },
      });

      if (!itemPedido) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      res.status(200).json(itemPedido);
    } catch (error) {
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
  }

  static async atualizar(req, res) {
    const { id } = req.params;
    const quantidade = req.body.quantidade.toLowerCase().trim();
    const idPedido = req.body.idPedido.toLowerCase().trim();
    const idProduto = req.body.idProduto.toLowerCase().trim();
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const itemPedido = await ItensPedidos.findOne({
        where: { id },
      });

      if (!itemPedido) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await ItensPedidos.update({
        quantidade,
        id_pedido: idPedido,
        id_produto: idProduto,
      }, {
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Item atualizado com sucesso',
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
      const itemPedido = await ItensPedidos.findOne({
        where: { id },
      });

      if (!itemPedido) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await ItensPedidos.destroy({
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Item deletado com sucesso',
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

export default ItensPedidosController;
