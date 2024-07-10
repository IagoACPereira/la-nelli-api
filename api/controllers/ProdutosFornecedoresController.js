import ProdutosFornecedores from '../models/ProdutosFornecedores.js';

class ProdutosFornecedoresController {
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
      const produtosFornecedores = await ProdutosFornecedores.findAll();

      res.status(200).json(produtosFornecedores);
    } catch (error) {
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
  }

  static async exibirUm(req, res) {
    try {
      res.status(200).json('Em Desenvolvimento.');
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

export default ProdutosFornecedoresController;
