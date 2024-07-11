import Fornecedores from '../models/Fornecedores.js';

class FornecedoresController {
  static async adicionar(req, res) {
    const {
      nome,
      telefone,
      email,
      endereco,
    } = req.body;
    try {
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
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
  }

  static async exibirTodos(req, res) {
    try {
      const fornecedores = await Fornecedores.findAll();

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
      });

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
    const {
      nome,
      telefone,
      email,
      endereco,
    } = req.body;
    try {
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
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
  }

  static async deletar(req, res) {
    const { id } = req.params;
    try {
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
