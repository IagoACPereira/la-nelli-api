import StatusPedidos from '../models/StatusPedidos.js';

class StatusPedidosController {
  static async adicionar(req, res) {
    const { status } = req.body;
    try {
      const novoStatus = await StatusPedidos.create({ status });
      res.status(201).json({
        mensagem: 'Novo status adicionado com sucesso',
        dados: novoStatus,
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
      const statusPedidos = await StatusPedidos.findAll();

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
      });

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
    const { status } = req.body;
    try {
      await StatusPedidos.update({ status }, {
        where: { id },
      });
      res.status(200).json({
        mensagem: 'Status atualizado com sucesso',
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

export default StatusPedidosController;
