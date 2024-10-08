import { validationResult } from 'express-validator';
import ProdutosFornecedores from '../models/ProdutosFornecedores.js';
import Fornecedores from '../models/Fornecedores.js';
import Produtos from '../models/Produtos.js';
import CategoriasProdutos from '../models/CategoriasProdutos.js';
import paginar from '../modules/paginar.js';

class ProdutosFornecedoresController {
  static async adicionar(req, res) {
    const {
      idFornecedor,
      idProduto,
    } = req.body;
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const buscarRegistro = await ProdutosFornecedores.findOne({
        where: {
          id_fornecedor: idFornecedor,
          id_produto: idProduto,
        },
      });

      if (buscarRegistro) {
        throw new Error('Já existe um registro com esses mesmos dados');
      }

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
      const produtosFornecedores = paginar(
        await ProdutosFornecedores.findAll({
          attributes: ['id'],
          include: [
            {
              model: Fornecedores,
            },
            {
              model: Produtos,
              attributes: ['id', 'nome', 'descricao', 'qtd_estoque', 'preco_compra'],
              include: [
                {
                  model: CategoriasProdutos,
                },
              ],
            },
          ],
        }),
        pagina,
        limite,
      );

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
        attributes: ['id'],
        include: [
          {
            model: Fornecedores,
          },
          {
            model: Produtos,
            attributes: ['id', 'nome', 'descricao', 'qtd_estoque', 'preco_compra'],
            include: [
              {
                model: CategoriasProdutos,
              },
            ],
          },
        ],
      });

      if (!produtoFornecedor) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

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
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const produtoFornecedor = await ProdutosFornecedores.findOne({
        where: { id },
      });

      if (!produtoFornecedor) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

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
      const produtoFornecedor = await ProdutosFornecedores.findOne({
        where: { id },
      });

      if (!produtoFornecedor) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

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
