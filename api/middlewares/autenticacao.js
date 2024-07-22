import jwt from 'jsonwebtoken';

function autenticacao(req, res, next) {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, process.env.SEGREDO);

    next();
  } catch (error) {
    res.status(401).json({
      mensagem: error.message,
    });
  }
}

export default autenticacao;
