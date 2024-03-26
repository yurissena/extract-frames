import express from 'express';
import * as admin from 'firebase-admin';
import uploadRoutes from './routes/uploadRoutes';
import listRoutes from './routes/listRoutes';

const app = express();

// Configurar o Firebase
const serviceAccount = require('../../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'extract-frames.appspot.com'
});

// Adicionar middlewares
app.use(express.json());

// Configurar rotas
app.use('/upload', uploadRoutes);
app.use('/list', listRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
