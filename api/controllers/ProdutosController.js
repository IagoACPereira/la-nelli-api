import { validationResult } from 'express-validator';
import Produtos from '../models/Produtos.js';
import CategoriasProdutos from '../models/CategoriasProdutos.js';

class ProdutosController {
  static async adicionar(req, res) {
    const nome = req.body.nome.toLowerCase().trim();
    const descricao = req.body.descricao.toLowerCase().trim();
    const qtdEstoque = req.body.qtdEstoque.toLowerCase().trim();
    const precoVenda = req.body.precoVenda.toLowerCase().trim();
    const precoCompra = req.body.precoCompra.toLowerCase().trim();
    const idCategoria = req.body.idCategoria.toLowerCase().trim();
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const buscarRegistro = await Produtos.findOne({
        where: {
          nome,
          descricao,
          qtd_estoque: qtdEstoque,
          preco_venda: precoVenda,
          preco_compra: precoCompra,
          id_categoria: idCategoria,
        },
      });

      if (buscarRegistro) {
        throw new Error('Já existe um registro com esses mesmos dados');
      }

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
      const produtos = await Produtos.findAll({
        attributes: ['id', 'nome', 'descricao', 'qtd_estoque', 'preco_venda', 'preco_compra'],
        include: [
          {
            model: CategoriasProdutos,
          },
        ],
      });

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
        attributes: ['id', 'nome', 'descricao', 'qtd_estoque', 'preco_venda', 'preco_compra'],
        include: [
          {
            model: CategoriasProdutos,
          },
        ],
      });

      if (!produto) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

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
    const nome = req.body.nome.toLowerCase().trim();
    const descricao = req.body.descricao.toLowerCase().trim();
    const qtdEstoque = req.body.qtdEstoque.toLowerCase().trim();
    const precoVenda = req.body.precoVenda.toLowerCase().trim();
    const precoCompra = req.body.precoCompra.toLowerCase().trim();
    const idCategoria = req.body.idCategoria.toLowerCase().trim();
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const produto = await Produtos.findOne({
        where: { id },
      });

      if (!produto) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

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
      const produto = await Produtos.findOne({
        where: { id },
      });

      if (!produto) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

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
