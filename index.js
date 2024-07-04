import 'dotenv/config';
import app from './api/app.js';

const porta = process.env.PORTA;

app.listen(porta, () => console.log(`Servidor rodando em: http://localhost:${porta}/`))