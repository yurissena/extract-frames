import express from 'express';
import * as admin from 'firebase-admin';
import cors from 'cors';
import uploadRoutes from './routes/uploadRoutes';
import listRoutes from './routes/listRoutes';

const app = express();

// Configurar o Firebase
const serviceAccount = require('./../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'extract-frames.appspot.com'
});

// Adicionar middlewares
app.use(express.json());

// Permitir solicitações CORS de qualquer origem
app.use(cors());

// Configurar rotas
app.use('/upload', uploadRoutes);
app.use('/list', listRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
