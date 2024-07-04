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
    res.json('Pastelaria La Nelli');
  });
}

export default router;
