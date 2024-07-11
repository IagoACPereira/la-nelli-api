import Clientes from '../models/Clientes.js';

class ClientesController {
  static async adicionar(req, res) {
    const {
      nome,
      telefone,
      email,
      endereco,
    } = req.body;
    try {
      const novoCliente = await Clientes.create({
        nome,
        telefone,
        email,
        endereco,
      });

      res.status(201).json({
        mensagem: 'Novo cliente adicionado com sucesso',
        dados: novoCliente,
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
      const clientes = await Clientes.findAll();

      res.status(200).json(clientes);
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
      const cliente = await Clientes.findOne({
        where: { id },
      });

      res.status(200).json(cliente);
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

export default ClientesController;
