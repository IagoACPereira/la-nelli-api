import { validationResult } from 'express-validator';
import RegistroCompraFornecedor from '../models/RegistroCompraFornecedor.js';

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
