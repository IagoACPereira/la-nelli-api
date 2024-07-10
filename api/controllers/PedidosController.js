import Pedidos from '../models/Pedidos.js';

class PedidosController {
  static async adicionar(req, res) {
    try {
      res.status(201).json('Em Desenvolvimento.');
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
    try {
      res.status(200).json('Em Desenvolvimento.');
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
