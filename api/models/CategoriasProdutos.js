import { DataTypes } from 'sequelize';
import sequelize from '../config/conexaoDb.js';

const CategoriasProdutos = sequelize.define('categorias_produtos', {
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

// CategoriasProdutos.sync({ force: true });

export default CategoriasProdutos;
