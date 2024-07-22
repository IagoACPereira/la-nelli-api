import { validationResult } from 'express-validator';
import Fornecedores from '../models/Fornecedores.js';
import ProdutosFornecedores from '../models/ProdutosFornecedores.js';
import Produtos from '../models/Produtos.js';
import CategoriasProdutos from '../models/CategoriasProdutos.js';
import RegistroCompraFornecedor from '../models/RegistroCompraFornecedor.js';
import Funcionarios from '../models/Funcionarios.js';
import CargosFuncionarios from '../models/CargosFuncionarios.js';

class FornecedoresController {
  static async adicionar(req, res) {
    const nome = req.body.nome ? req.body.nome.toLowerCase().trim() : null;
    const email = req.body.email ? req.body.email.toLowerCase().trim() : null;
    const endereco = req.body.endereco ? req.body.endereco.toLowerCase().trim() : null;
    const { telefone } = req.body;
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const buscarRegistro = await Fornecedores.findOne({
        where: {
          nome,
          telefone,
          email,
          endereco,
        },
      });

      if (buscarRegistro) {
        throw new Error('Já existe um registro com esses mesmos dados');
      }

      const novoFornecedor = await Fornecedores.create({
        nome,
        telefone,
        email,
        endereco,
      });
      res.status(201).json({
        mensagem: 'Novo fornecedor adicionado com sucesso',
        dados: novoFornecedor,
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
      const fornecedores = await Fornecedores.findAll({
        include: [
          {
            model: ProdutosFornecedores,
            attributes: ['id'],
            include: [
              {
                model: Produtos,
                attributes: ['id', 'nome', 'qtd_estoque', 'preco_compra'],
                include: [
                  {
                    model: CategoriasProdutos,
                  },
                ],
              },
            ],
          },
          {
            model: RegistroCompraFornecedor,
            attributes: ['id', 'quantidade', 'custo'],
            include: [
              {
                model: Funcionarios,
                attributes: ['id', 'nome', 'telefone', 'email', 'salario', 'data_contratacao'],
                include: [
                  {
                    model: CargosFuncionarios,
                  },
                ],
              },
              {
                model: Produtos,
                attributes: ['id', 'nome', 'qtd_estoque', 'preco_compra'],
                include: [
                  {
                    model: CategoriasProdutos,
                  },
                ],
              },
            ],
          },
        ],
      });

      res.status(200).json(fornecedores);
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
      const fornecedor = await Fornecedores.findOne({
        where: { id },
        include: [
          {
            model: ProdutosFornecedores,
            attributes: ['id'],
            include: [
              {
                model: Produtos,
                attributes: ['id', 'nome', 'qtd_estoque', 'preco_compra'],
                include: [
                  {
                    model: CategoriasProdutos,
                  },
                ],
              },
            ],
          },
          {
            model: RegistroCompraFornecedor,
            attributes: ['id', 'quantidade', 'custo'],
            include: [
              {
                model: Funcionarios,
                attributes: ['id', 'nome', 'telefone', 'email', 'salario', 'data_contratacao'],
                include: [
                  {
                    model: CargosFuncionarios,
                  },
                ],
              },
              {
                model: Produtos,
                attributes: ['id', 'nome', 'qtd_estoque', 'preco_compra'],
                include: [
                  {
                    model: CategoriasProdutos,
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!fornecedor) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      res.status(200).json(fornecedor);
    } catch (error) {
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
  }

  static async atualizar(req, res) {
    const { id } = req.params;
    const nome = req.body.nome ? req.body.nome.toLowerCase().trim() : null;
    const email = req.body.email ? req.body.email.toLowerCase().trim() : null;
    const endereco = req.body.endereco ? req.body.endereco.toLowerCase().trim() : null;
    const { telefone } = req.body;
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const fornecedor = await Fornecedores.findOne({
        where: { id },
      });

      if (!fornecedor) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await Fornecedores.update({
        nome,
        telefone,
        email,
        endereco,
      }, {
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Fornecedor atualizado com sucesso',
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
      const fornecedor = await Fornecedores.findOne({
        where: { id },
      });

      if (!fornecedor) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await Fornecedores.destroy({
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Fornecedor deletado com sucesso',
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

export default FornecedoresController;
