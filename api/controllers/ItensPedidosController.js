import ItensPedidos from '../models/ItensPedidos.js';

class ItensPedidosController {
  static async adicionar(req, res) {
    const {
      quantidade,
      idPedido,
      idProduto,
    } = req.body;
    try {
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
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
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
    const {
      quantidade,
      idPedido,
      idProduto,
    } = req.body;
    try {
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

export default ItensPedidosController;
