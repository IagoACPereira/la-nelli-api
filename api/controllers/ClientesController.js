import { validationResult } from 'express-validator';
import Clientes from '../models/Clientes.js';
import Pedidos from '../models/Pedidos.js';
import StatusPedidos from '../models/StatusPedidos.js';

class ClientesController {
  static async adicionar(req, res) {
    const nome = req.body.nome.toLowerCase().trim();
    const telefone = req.body.telefone.toLowerCase().trim();
    const email = req.body.email.toLowerCase().trim();
    const endereco = req.body.endereco.toLowerCase().trim();
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const buscarRegistro = await Clientes.findOne({
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
      const clientes = await Clientes.findAll({
        include: [
          {
            model: Pedidos,
            attributes: ['id', 'data_pedido', 'total'],
            include: [
              {
                model: StatusPedidos,
              },
            ],
          },
        ],
      });

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
        include: [
          {
            model: Pedidos,
            attributes: ['id', 'data_pedido', 'total'],
            include: [
              {
                model: StatusPedidos,
              },
            ],
          },
        ],
      });

      if (!cliente) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      res.status(200).json(cliente);
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
    const telefone = req.body.telefone.toLowerCase().trim();
    const email = req.body.email.toLowerCase().trim();
    const endereco = req.body.endereco.toLowerCase().trim();
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const cliente = await Clientes.findOne({
        where: { id },
      });

      if (!cliente) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await Clientes.update({
        nome,
        telefone,
        email,
        endereco,
      }, {
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Cliente atualizado com sucesso',
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
      const cliente = await Clientes.findOne({
        where: { id },
      });

      if (!cliente) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await Clientes.destroy({
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Cliente deletado com sucesso',
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

export default ClientesController;
