import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  database: process.env.DATABASE,
  port: process.env.PORTADB,
  username: process.env.USUARIODB,
  password: process.env.SENHADB,
  host: process.env.HOSTDB,
  dialect: 'postgres',
  logging: false,
});

try {
  sequelize.authenticate();
  // eslint-disable-next-line no-console
  console.log('Conexão com o banco de dados estabelecida com exito');
} catch (error) {
  // eslint-disable-next-line no-console
  console.log('Erro ao conectar com o banco de dados');
}

export default sequelize;
