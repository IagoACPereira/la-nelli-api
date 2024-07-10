import { DataTypes } from 'sequelize';
import sequelize from '../config/conexaoDb.js';
import CategoriasProdutos from './CategoriasProdutos.js';

const Produtos = sequelize.define('produtos', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  preco: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  qtd_estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

CategoriasProdutos.hasMany(Produtos, {
  foreignKey: 'id_categoria',
});
Produtos.belongsTo(CategoriasProdutos, {
  foreignKey: 'id_categoria',
});

export default Produtos;
