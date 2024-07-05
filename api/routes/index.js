import express from 'express';

function router(app) {
  app
    .use(
      express.json(),
      express.urlencoded({
        extended: true,
      }),
    )
    .get('/', (_, res) => {
      res.json('La Nelli API');
    });
}

export default router;
