import RegistroCompraFornecedor from '../models/RegistroCompraFornecedor.js';

class RegistroCompraFornecedorController {
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
      const registrosCompras = await RegistroCompraFornecedor.findAll();
      res.status(200).json(registrosCompras);
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
      const registroCompra = await RegistroCompraFornecedor.findOne({
        where: { id },
      });

      res.status(200).json(registroCompra);
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

export default RegistroCompraFornecedorController;
