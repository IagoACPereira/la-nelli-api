import CargosFuncionarios from '../models/CargosFuncionarios.js';

class CargosFuncionariosController {
  static async adicionar(req, res) {
    const { cargo } = req.body;
    try {
      const novoCargo = await CargosFuncionarios.create({ cargo });

      res.status(201).json({
        mensagem: 'Novo cargo adicionado com sucesso',
        dados: novoCargo,
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
      const cargosFuncionarios = await CargosFuncionarios.findAll();
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
      });

      res.status(200).json(cargoFuncionario);
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

export default CargosFuncionariosController;
