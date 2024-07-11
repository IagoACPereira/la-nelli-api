import ProdutosFornecedores from '../models/ProdutosFornecedores.js';

class ProdutosFornecedoresController {
  static async adicionar(req, res) {
    const {
      idFornecedor,
      idProduto,
    } = req.body;
    try {
      const novoProduto = await ProdutosFornecedores.create({
        id_fornecedor: idFornecedor,
        id_produto: idProduto,
      });

      res.status(201).json({
        mensagem: 'Produto associado ao um fornecedor com sucesso',
        dados: novoProduto,
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
    const { id } = req.params;
    try {
      const produtoFornecedor = await ProdutosFornecedores.findOne({
        where: { id },
      });
      res.status(200).json(produtoFornecedor);
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
      idFornecedor,
      idProduto,
    } = req.body;
    try {
      await ProdutosFornecedores.update({
        id_fornecedor: idFornecedor,
        id_produto: idProduto,
      }, {
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Associação do produto atualizado com sucesso',
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
    const { id } = req.params;
    try {
      await ProdutosFornecedores.destroy({
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Associação do produto deletado com sucesso',
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

export default ProdutosFornecedoresController;
