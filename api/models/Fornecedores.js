import { DataTypes } from 'sequelize';
import sequelize from '../config/conexaoDb.js';

const Fornecedores = sequelize.define('fornecedores', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

export default Fornecedores;
