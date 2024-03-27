import express from 'express';
import * as admin from 'firebase-admin';
import cors from 'cors';
import { uploadVideo } from './controllers/uploadController';
import { listVideos } from './controllers/listController';
import { frameVideos } from './controllers/frameController';

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
// Rota para buscar os frames
app.get('/frames/:videoId', frameVideos);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});