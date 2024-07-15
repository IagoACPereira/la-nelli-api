import Produtos from '../models/Produtos.js';

class ProdutosController {
  static async adicionar(req, res) {
    const {
      nome,
      descricao,
      qtdEstoque,
      precoVenda,
      precoCompra,
      idCategoria,
    } = req.body;
    try {
      const novoProduto = await Produtos.create({
        nome,
        descricao,
        qtd_estoque: qtdEstoque,
        preco_venda: precoVenda,
        preco_compra: precoCompra,
        id_categoria: idCategoria,
      });

      res.status(201).json({
        mensagem: 'Novo produto adicionado com sucesso',
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
      const produtos = await Produtos.findAll();

      res.status(200).json(produtos);
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
      const produto = await Produtos.findOne({
        where: { id },
      });

      res.status(200).json(produto);
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
      nome,
      descricao,
      qtdEstoque,
      precoVenda,
      precoCompra,
      idCategoria,
    } = req.body;
    try {
      await Produtos.update({
        nome,
        descricao,
        qtd_estoque: qtdEstoque,
        preco_venda: precoVenda,
        preco_compra: precoCompra,
        id_categoria: idCategoria,
      }, {
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Produto atualizado com sucesso',
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
      await Produtos.destroy({
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Produto deletado com sucesso',
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

export default ProdutosController;
