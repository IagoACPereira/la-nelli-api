import CategoriasProdutos from '../models/CategoriasProdutos.js';

class CategoriasProdutosController {
  static async adicionar(req, res) {
    const { categoria } = req.body;
    try {
      const novaCategoria = await CategoriasProdutos.create({ categoria });
      res.status(201).json({
        mensagem: 'Nova categoria adicionada com sucesso',
        dados: novaCategoria,
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
      const categoriasProdutos = await CategoriasProdutos.findAll();

      res.status(200).json(categoriasProdutos);
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
      const categoriaProduto = await CategoriasProdutos.findOne({
        where: { id },
      });

      res.status(200).json(categoriaProduto);
    } catch (error) {
      res.status(400).json({
        mensagem: error.message,
        status: 400,
      });
    }
  }

  static async atualizar(req, res) {
    const { id } = req.params;
    const { categoria } = req.body;
    try {
      await CategoriasProdutos.update({ categoria }, {
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Categoria atualizada com sucesso',
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
      await CategoriasProdutos.destroy({
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Categoria deletada com sucesso',
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

export default CategoriasProdutosController;
