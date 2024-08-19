function paginar(arr, pagina, limite) {
  const paginaAtual = Number(pagina) || 1;
  const limiteItens = Number(limite) || 10;

  const qtdItens = arr.length;

  const qtdPaginas = Math.ceil(qtdItens / limiteItens);

  const paginaAnterior = paginaAtual > 1 ? paginaAtual - 1 : '';

  const proximaPagina = paginaAtual < qtdPaginas ? paginaAtual + 1 : '';

  const dados = arr.slice((paginaAtual - 1) * limiteItens, limiteItens * paginaAtual);

  return {
    paginaAnterior,
    proximaPagina,
    paginaAtual,
    limiteItens,
    qtdItens,
    qtdPaginas,
    dados,
  };
}

export default paginar;
