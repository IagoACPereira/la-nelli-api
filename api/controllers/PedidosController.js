import { validationResult } from 'express-validator';
import Pedidos from '../models/Pedidos.js';
import Clientes from '../models/Clientes.js';
import StatusPedidos from '../models/StatusPedidos.js';
import ItensPedidos from '../models/ItensPedidos.js';
import Produtos from '../models/Produtos.js';
import CategoriasProdutos from '../models/CategoriasProdutos.js';

class PedidosController {
  static async adicionar(req, res) {
    const {
      dataPedido,
      horaPedido,
      idCliente,
    } = req.body;
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const buscarRegistro = await Pedidos.findOne({
        where: {
          data_pedido: dataPedido,
          hora_pedido: horaPedido,
          id_cliente: idCliente,
        },
      });

      if (buscarRegistro) {
        throw new Error('Já existe um registro com esses mesmos dados');
      }

      const novoPedido = await Pedidos.create({
        data_pedido: dataPedido,
        total: '0',
        id_cliente: idCliente,
        id_status: 1,
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
      const pedidos = await Pedidos.findAll({
        attributes: ['id', 'data_pedido', 'total'],
        include: [
          {
            model: Clientes,
          },
          {
            model: StatusPedidos,
          },
          {
            model: ItensPedidos,
            attributes: ['id', 'quantidade'],
            include: [
              {
                model: Produtos,
                attributes: ['id', 'nome', 'descricao', 'preco_venda'],
                include: [
                  {
                    model: CategoriasProdutos,
                  },
                ],
              },
            ],
          },
        ],
      });
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
        attributes: ['id', 'data_pedido', 'total'],
        include: [
          {
            model: Clientes,
          },
          {
            model: StatusPedidos,
          },
          {
            model: ItensPedidos,
            attributes: ['id', 'quantidade'],
            include: [
              {
                model: Produtos,
                attributes: ['id', 'nome', 'descricao', 'preco_venda'],
                include: [
                  {
                    model: CategoriasProdutos,
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!pedido) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

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
      horaPedido,
      idCliente,
      idStatus,
    } = req.body;
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const pedido = await Pedidos.findOne({
        where: { id },
      });

      if (!pedido) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await Pedidos.update({
        data_pedido: dataPedido,
        hora_pedido: horaPedido,
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
      const pedido = await Pedidos.findOne({
        where: { id },
      });

      if (!pedido) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

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

  static async finalizarPedido(req, res) {
    const { id } = req.params;
    try {
      await Pedidos.update({
        id_status: 2,
      }, {
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Pedido finalizado com sucesso',
      });
    } catch (error) {
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
  }

  static async cancelarPedido(req, res) {
    const { id } = req.params;
    try {
      await Pedidos.update({
        id_status: 3,
      }, {
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Pedido cancelado com sucesso',
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
