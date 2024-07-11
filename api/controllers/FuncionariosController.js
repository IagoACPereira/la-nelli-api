import Funcionarios from '../models/Funcionarios.js';

class FuncionariosController {
  static async adicionar(req, res) {
    const {
      nome,
      telefone,
      email,
      salario,
      dataContratacao,
      idCargo,
    } = req.body;
    try {
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
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
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
    const {
      nome,
      telefone,
      email,
      salario,
      dataContratacao,
      idCargo,
    } = req.body;
    try {
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

export default FuncionariosController;
