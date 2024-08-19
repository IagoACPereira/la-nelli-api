import { validationResult } from 'express-validator';
import RegistroCompraFornecedor from '../models/RegistroCompraFornecedor.js';
import Funcionarios from '../models/Funcionarios.js';
import Produtos from '../models/Produtos.js';
import Fornecedores from '../models/Fornecedores.js';
import CargosFuncionarios from '../models/CargosFuncionarios.js';
import CategoriasProdutos from '../models/CategoriasProdutos.js';
import paginar from '../modules/paginar.js';

class RegistroCompraFornecedorController {
  static async adicionar(req, res) {
    const {
      quantidade,
      custo,
      idFuncionario,
      idProduto,
      idFornecedor,
    } = req.body;
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const novaCompra = await RegistroCompraFornecedor.create({
        quantidade,
        custo,
        id_funcionario: idFuncionario,
        id_produto: idProduto,
        id_fornecedor: idFornecedor,
      });

      // Incrementar no estoque quando houver compra com o fornecedor
      const produto = await Produtos.findOne({
        where: {
          id: idProduto,
        },
      });

      await Produtos.update({
        qtd_estoque: produto.qtd_estoque + quantidade,
      }, {
        where: {
          id: idProduto,
        },
      });
      // Fim --> Incrementar no estoque quando houver compra com o fornecedor

      res.status(201).json({
        mensagem: 'Nova compra com fornecedor registrada com sucesso',
        dados: novaCompra,
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
    } return 0;
  }

  static async exibirTodos(req, res) {
    const pagina = req.query.pagina || 1;
    const limite = req.query.limite || 10;
    try {
      const registrosCompras = paginar(
        await RegistroCompraFornecedor.findAll({
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
              attributes: ['id', 'nome', 'descricao', 'qtd_estoque', 'preco_compra'],
              include: [
                {
                  model: CategoriasProdutos,
                },
              ],
            },
            {
              model: Fornecedores,
            },
          ],
        }),
        pagina,
        limite,
      );
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

      if (!registroCompra) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      res.status(200).json(registroCompra);
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
      custo,
      idFuncionario,
      idProduto,
      idFornecedor,
    } = req.body;
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const registroCompra = await RegistroCompraFornecedor.findOne({
        where: { id },
      });

      if (!registroCompra) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await RegistroCompraFornecedor.update({
        quantidade,
        custo,
        id_funcionario: idFuncionario,
        id_produto: idProduto,
        id_fornecedor: idFornecedor,
      }, {
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Registro de compra atualizado com sucesso',
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
      const registroCompra = await RegistroCompraFornecedor.findOne({
        where: { id },
      });

      if (!registroCompra) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await RegistroCompraFornecedor.destroy({
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Registro de compra deletado com sucesso',
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

export default RegistroCompraFornecedorController;
