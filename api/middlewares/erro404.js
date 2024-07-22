function erro404(_, res, next) {
  res.status(404).json({
    mensagem: 'Página não encontrada',
  });

  next();
}

export default erro404;
