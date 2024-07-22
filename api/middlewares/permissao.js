/* eslint-disable func-names */
import jwt from 'jsonwebtoken';

function permissao(arrPermissoes) {
  return function (req, res, next) {
    const token = req.headers.authorization;
    try {
      const payload = jwt.decode(token);

      if (!arrPermissoes.includes(payload.permissao)) {
        throw new Error('Usuário não permitido');
      }

      next();
    } catch (error) {
      res.status(401).json({
        mensagem: error.message,
      });
    }
  };
}

export default permissao;
