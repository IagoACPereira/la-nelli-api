import express from 'express';
import router from './routes/index.js';

const app = express();

router(app);

export default app;