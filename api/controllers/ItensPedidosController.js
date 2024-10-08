import { validationResult } from 'express-validator';
import ItensPedidos from '../models/ItensPedidos.js';
import Pedidos from '../models/Pedidos.js';
import Produtos from '../models/Produtos.js';
import CategoriasProdutos from '../models/CategoriasProdutos.js';
import paginar from '../modules/paginar.js';

class ItensPedidosController {
  static async adicionar(req, res) {
    const {
      quantidade,
      idPedido,
      idProduto,
    } = req.body;
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const buscarRegistro = await ItensPedidos.findOne({
        where: {
          id_pedido: idPedido,
          id_produto: idProduto,
        },
      });

      if (buscarRegistro) {
        throw new Error('Já existe um registro com esses mesmos dados');
      }

      // Decrementar do estoque quando inserir item do pedido
      const produto = await Produtos.findOne({
        where: {
          id: idProduto,
        },
      });

      await Produtos.update({
        qtd_estoque: produto.qtd_estoque - quantidade,
      }, {
        where: {
          id: idProduto,
        },
      });
      // Fim --> Decrementar do estoque quando inserir item do pedido

      const novoItem = await ItensPedidos.create({
        quantidade,
        id_pedido: idPedido,
        id_produto: idProduto,
      });
      // Incrementar valor do item ao total do pedido
      const pedido = await Pedidos.findOne({
        where: {
          id: novoItem.id_pedido,
        },
      });

      await Pedidos.update({
        total: pedido.total + (produto.preco_venda * novoItem.quantidade),
      }, {
        where: {
          id: novoItem.id_pedido,
        },
      });
      // Fim --> Incrementar valor do item ao total do pedido

      res.status(201).json({
        mensagem: 'Novo item adicionado com sucesso',
        dados: novoItem,
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
      const itensPedidos = paginar(
        await ItensPedidos.findAll({
          attributes: ['id', 'quantidade'],
          include: [
            {
              model: Pedidos,
              attributes: ['id', 'data_pedido', 'total'],
            },
            {
              model: Produtos,
              attributes: ['id', 'nome', 'descricao', 'qtd_estoque', 'qtd_estoque', 'preco_venda', 'preco_compra'],
              include: [
                {
                  model: CategoriasProdutos,
                },
              ],
            },
          ],
        }),
        pagina,
        limite,
      );

      res.status(200).json(itensPedidos);
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
      const itemPedido = await ItensPedidos.findOne({
        where: { id },
        attributes: ['id', 'quantidade'],
        include: [
          {
            model: Pedidos,
            attributes: ['id', 'data_pedido', 'total'],
          },
          {
            model: Produtos,
            attributes: ['id', 'nome', 'descricao', 'qtd_estoque', 'qtd_estoque', 'preco_venda', 'preco_compra'],
            include: [
              {
                model: CategoriasProdutos,
              },
            ],
          },
        ],
      });

      if (!itemPedido) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      res.status(200).json(itemPedido);
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
    } = req.body;
    const validacao = validationResult(req);
    try {
      if (!validacao.isEmpty()) {
        throw new Error('Erro de validação');
      }

      const itemPedido = await ItensPedidos.findOne({
        where: { id },
      });

      if (!itemPedido) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      // Decrementar todo o valor do total do pedido
      const produto = await Produtos.findOne({
        where: {
          id: itemPedido.id_produto,
        },
      });

      const pedido = await Pedidos.findOne({
        where: {
          id: itemPedido.id_pedido,
        },
      });

      await Pedidos.update({
        total: pedido.total - (itemPedido.quantidade * produto.preco_venda),
      }, {
        where: {
          id: itemPedido.id_pedido,
        },
      });
      // Fim --> Decrementar todo o valor do total do pedido

      // Incrementar no total do pedido o valor atualizado
      const pedidoAtualizado = await Pedidos.findOne({
        where: {
          id: itemPedido.id_pedido,
        },
      });

      await Pedidos.update({
        total: pedidoAtualizado.total + (quantidade * produto.preco_venda),
      }, {
        where: {
          id: itemPedido.id_pedido,
        },
      });
      // Fim --> Incrementar no total do pedido o valor atualizado

      // // Incrementar no estoque toda a quantidade do produto
      await Produtos.update({
        qtd_estoque: produto.qtd_estoque + itemPedido.quantidade,
      }, {
        where: {
          id: itemPedido.id_produto,
        },
      });
      // Fim --> Incrementar no estoque toda a quantidade do produto

      // Decrementar do estoque com a quantidade atualizada
      const produtoAtualizado = await Produtos.findOne({
        where: {
          id: itemPedido.id_produto,
        },
      });

      await Produtos.update({
        qtd_estoque: produtoAtualizado.qtd_estoque - quantidade,
      }, {
        where: {
          id: itemPedido.id_produto,
        },
      });
      // Fim --> Decrementar do estoque com a quantidade atualizada

      await ItensPedidos.update({
        quantidade,
      }, {
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Item atualizado com sucesso',
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
      const itemPedido = await ItensPedidos.findOne({
        where: { id },
      });

      if (!itemPedido) {
        throw new Error(`Não existem registros com o id ${id}`);
      }

      // Decrementar do estoque quando inserir item do pedido
      const produto = await Produtos.findOne({
        where: {
          id: itemPedido.id_produto,
        },
      });

      await Produtos.update({
        qtd_estoque: produto.qtd_estoque + itemPedido.quantidade,
      }, {
        where: {
          id: itemPedido.id_produto,
        },
      });
      // Fim --> Decrementar do estoque quando inserir item do pedido

      // Decrementar valor do pedido
      const pedido = await Pedidos.findOne({
        where: {
          id: itemPedido.id_pedido,
        },
      });

      await Pedidos.update({
        total: pedido.total - (itemPedido.quantidade * produto.preco_venda),
      }, {
        where: {
          id: itemPedido.id_pedido,
        },
      });
      // Fim --> Decrementar valor do pedido

      await ItensPedidos.destroy({
        where: { id },
      });

      res.status(200).json({
        mensagem: 'Item deletado com sucesso',
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

export default ItensPedidosController;
