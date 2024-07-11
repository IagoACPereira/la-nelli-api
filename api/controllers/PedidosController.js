import Pedidos from '../models/Pedidos.js';

class PedidosController {
  static async adicionar(req, res) {
    const {
      dataPedido,
      total,
      idCliente,
    } = req.body;
    try {
      const novoPedido = await Pedidos.create({
        data_pedido: dataPedido,
        total,
        id_cliente: idCliente,
        id_status: 1,
      });
      res.status(201).json({
        mensagem: 'Novo pedido adicionado com sucesso',
        dados: novoPedido,
        status: 201,
      });
    } catch (error) {
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
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
    try {
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
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
  }

  static async deletar(req, res) {
    try {
      res.status(200).json('Em Desenvolvimento.');
    } catch (error) {
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
  }
}

export default PedidosController;
