# la-nelli-api

`.env`
```js
PORTA="[Porta da API]"

DATABASE="[Nome do Banco]"

PORTADB="[Porta do Banco]"

USUARIODB="[Usuário do Banco]"

SENHADB="[Senha do Banco]"

HOSTDB="[Host do Banco]"
```

```js
const buscarRegistro = await CargosFuncionarios.findOne({
        where: { algo },
      });

      if (buscarRegistro) {
        throw new Error('Já existe um registro com esses mesmos dados');
      }
```