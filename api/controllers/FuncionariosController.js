import { validationResult } from 'express-validator';
import Funcionarios from '../models/Funcionarios.js';

class FuncionariosController {
  static async adicionar(req, res) {
    const nome = req.body.nome.toLowerCase().trim();
    const telefone = req.body.telefone.toLowerCase().trim();
    const email = req.body.email.toLowerCase().trim();
    const salario = req.body.salario.toLowerCase().trim();
    const dataContratacao = req.body.dataContratacao.toLowerCase().trim();
    const idCargo = req.body.idCargo.toLowerCase().trim();
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const buscarRegistro = await Funcionarios.findOne({
        where: {
          nome,
          telefone,
          email,
          salario,
          data_contratacao: dataContratacao,
          id_cargo: idCargo,
        },
      });

      if (buscarRegistro) {
        throw new Error('Já existe um registro com esses mesmos dados');
      }

      const novoFuncionario = await Funcionarios.create({
        nome,
        telefone,
        email,
        salario,
        data_contratacao: dataContratacao,
        id_cargo: idCargo,
      });

      res.status(201).json({
        mensagem: 'Novo funcionaria adicionado com sucesso',
        dados: novoFuncionario,
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
      const funcionarios = await Funcionarios.findAll();

      res.status(200).json(funcionarios);
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
      const funcionario = await Funcionarios.findOne({
        where: { id },
      });

      if (!funcionario) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      res.status(200).json(funcionario);
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
    const salario = req.body.salario.toLowerCase().trim();
    const dataContratacao = req.body.dataContratacao.toLowerCase().trim();
    const idCargo = req.body.idCargo.toLowerCase().trim();
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const funcionario = await Funcionarios.findOne({
        where: { id },
      });

      if (!funcionario) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await Funcionarios.update({
        nome,
        telefone,
        email,
        salario,
        data_contratacao: dataContratacao,
        id_cargo: idCargo,
      }, {
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Funcionario atualizado com sucesso',
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
      const funcionario = await Funcionarios.findOne({
        where: { id },
      });

      if (!funcionario) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      await Funcionarios.destroy({
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Funcionario deletado com sucesso',
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

export default FuncionariosController;
