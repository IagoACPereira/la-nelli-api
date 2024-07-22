import { validationResult } from 'express-validator';
import CargosFuncionarios from '../models/CargosFuncionarios.js';
import Funcionarios from '../models/Funcionarios.js';

class CargosFuncionariosController {
  static async adicionar(req, res) {
    const cargo = req.body.cargo ? req.body.cargo.toLowerCase().trim() : null;
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }
      const buscarRegistro = await CargosFuncionarios.findOne({
        where: { cargo },
      });

      if (buscarRegistro) {
        throw new Error('Já existe um registro com esses mesmos dados');
      }

      const novoCargo = await CargosFuncionarios.create({ cargo });

      res.status(201).json({
        mensagem: 'Novo cargo adicionado com sucesso',
        dados: novoCargo,
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
      const cargosFuncionarios = await CargosFuncionarios.findAll({
        include: [
          {
            model: Funcionarios,
            attributes: ['id', 'nome', 'telefone', 'email', 'salario', 'data_contratacao'],
          },
        ],
      });
      res.status(200).json(cargosFuncionarios);
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
      const cargoFuncionario = await CargosFuncionarios.findOne({
        where: { id },
        include: [
          {
            model: Funcionarios,
            attributes: ['id', 'nome', 'telefone', 'email', 'salario', 'data_contratacao'],
          },
        ],
      });

      if (!cargoFuncionario) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      res.status(200).json(cargoFuncionario);
    } catch (error) {
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
  }

  static async atualizar(req, res) {
    const { id } = req.params;
    const cargo = req.body.cargo ? req.body.cargo.toLowerCase().trim() : null;
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const cargoFuncionario = await CargosFuncionarios.findOne({
        where: { id },
      });

      if (!cargoFuncionario) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await CargosFuncionarios.update({ cargo }, {
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Cargo atualizado com sucesso',
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
      const cargoFuncionario = await CargosFuncionarios.findOne({
        where: { id },
      });

      if (!cargoFuncionario) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await CargosFuncionarios.destroy({
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Cargo deletado com sucesso',
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

export default CargosFuncionariosController;
