import { DataTypes } from 'sequelize';
import sequelize from '../config/conexaoDb.js';

const Permissoes = sequelize.define('permissoes', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

// Permissoes.sync({ force: true });

export default Permissoes;
