import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import Funcionarios from '../models/Funcionarios.js';
import CargosFuncionarios from '../models/CargosFuncionarios.js';
import Permissoes from '../models/Permissoes.js';
import paginar from '../modules/paginar.js';

class FuncionariosController {
  static async adicionar(req, res) {
    const nome = req.body.nome ? req.body.nome.toLowerCase().trim() : null;
    const email = req.body.email ? req.body.email.toLowerCase().trim() : null;
    const {
      senha,
      confirmacaoSenha,
    } = req.body;
    const {
      telefone,
      salario,
      dataContratacao,
      idCargo,
      idPermissao,
    } = req.body;
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
          id_permissao: idPermissao,
        },
      });

      if (buscarRegistro) {
        throw new Error('Já existe um registro com esses mesmos dados');
      }

      if (confirmacaoSenha !== senha) {
        throw new Error('Campo senha e confirmação senha são diferentes');
      }

      const novoFuncionario = await Funcionarios.create({
        nome,
        telefone,
        email,
        senha: await bcrypt.hash(senha, 10),
        salario,
        data_contratacao: dataContratacao,
        id_cargo: idCargo,
        id_permissao: idPermissao,
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
    const pagina = req.query.pagina || 1;
    const limite = req.query.limite || 10;
    try {
      const funcionarios = paginar(
        await Funcionarios.findAll({
          attributes: ['id', 'nome', 'telefone', 'email', 'salario', 'data_contratacao'],
          include: [
            {
              model: CargosFuncionarios,
            },
            {
              model: Permissoes,
              attributes: ['id', 'titulo'],
            },
          ],
        }),
        pagina,
        limite,
      );

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
        attributes: ['id', 'nome', 'telefone', 'email', 'salario', 'data_contratacao'],
        include: [
          {
            model: CargosFuncionarios,
          },
          {
            model: Permissoes,
          },
        ],
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
    const nome = req.body.nome ? req.body.nome.toLowerCase().trim() : null;
    const email = req.body.email ? req.body.email.toLowerCase().trim() : null;
    const {
      telefone,
      salario,
      idCargo,
      dataContratacao,
    } = req.body;
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
