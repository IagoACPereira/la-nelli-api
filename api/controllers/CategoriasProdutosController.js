import { validationResult } from 'express-validator';
import CategoriasProdutos from '../models/CategoriasProdutos.js';
import Produtos from '../models/Produtos.js';
import paginar from '../modules/paginar.js';

class CategoriasProdutosController {
  static async adicionar(req, res) {
    const categoria = req.body.categoria ? req.body.categoria.toLowerCase().trim() : null;
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const buscarRegistro = await CategoriasProdutos.findOne({
        where: { categoria },
      });

      if (buscarRegistro) {
        throw new Error('Já existe um registro com esses mesmos dados');
      }

      const novaCategoria = await CategoriasProdutos.create({ categoria });
      res.status(201).json({
        mensagem: 'Nova categoria adicionada com sucesso',
        dados: novaCategoria,
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
    const pagina = req.query.pagina || 1;
    const limite = req.query.limite || 10;
    try {
      const categoriasProdutos = paginar(
        await CategoriasProdutos.findAll({
          include: [
            {
              model: Produtos,
              attributes: ['id', 'nome', 'qtd_estoque', 'preco_compra', 'preco_venda'],
            },
          ],
        }),
        pagina,
        limite,
      );

      res.status(200).json(categoriasProdutos);
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
      const categoriaProduto = await CategoriasProdutos.findOne({
        where: { id },
        include: [
          {
            model: Produtos,
            attributes: ['id', 'nome', 'descricao', 'qtd_estoque', 'preco_venda', 'preco_compra'],
          },
        ],
      });

      if (!categoriaProduto) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      res.status(200).json(categoriaProduto);
    } catch (error) {
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
  }

  static async atualizar(req, res) {
    const { id } = req.params;
    const categoria = req.body.categoria ? req.body.categoria.toLowerCase().trim() : null;
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const categoriaProduto = await CategoriasProdutos.findOne({
        where: { id },
      });

      if (!categoriaProduto) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await CategoriasProdutos.update({ categoria }, {
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Categoria atualizada com sucesso',
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
    }
    return 0;
  }

  static async deletar(req, res) {
    const { id } = req.params;
    try {
      const categoriaProduto = await CategoriasProdutos.findOne({
        where: { id },
      });

      if (!categoriaProduto) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await CategoriasProdutos.destroy({
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Categoria deletada com sucesso',
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

export default CategoriasProdutosController;
