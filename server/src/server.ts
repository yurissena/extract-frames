import express from 'express';
import * as admin from 'firebase-admin';
import cors from 'cors';
import { uploadVideo } from './controllers/uploadController';
import { listVideos } from './controllers/listController';

const app = express();

// Configurar o Firebase
const serviceAccount = require('./../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'extract-frames.appspot.com'
});

// Adicionar middlewares
app.use(express.json());
app.use(cors());

// Configurar rota de upload
app.post('/upload', uploadVideo);
// Configurar rota de listagem
app.get('/list', listVideos);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});

// Definir o tempo limite de conexão para 10 minutos (600000 milissegundos)
server.setTimeout(600000); // 10 minutos em milissegundos