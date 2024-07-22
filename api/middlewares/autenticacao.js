import jwt from 'jsonwebtoken';
import segredo from '../config/segredo.js';

function autenticacao(req, res, next) {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, segredo);

    next();
  } catch (error) {
    res.status(401).json({
      mensagem: error.message,
    });
  }
}

export default autenticacao;
