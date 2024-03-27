import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import ffmpeg from 'fluent-ffmpeg';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('video');

const extractFrames = async (tempFilePath: string, outputPath: string) => {
  return new Promise<void>((resolve, reject) => {
    const command = ffmpeg(tempFilePath)
      .outputOptions('-vf', 'fps=1')
      .on('start', (commandLine: string) => {
        console.log('Comando ffmpeg:', commandLine);
      })
      .on('error', (error: Error, stdout: string, stderr: string) => {
        console.error('Erro ao extrair os frames:', error);
        console.error('Saída padrão:', stdout);
        console.error('Saída de erro:', stderr);
        reject(error);
      })
      .on('end', () => {
        console.log('Frames extraídos com sucesso.');
        resolve();
      });

    // Definir o destino de saída para os frames extraídos
    command.save(path.join(outputPath, 'frame-%d.jpg'));

    // Executar o comando ffmpeg
    command.run();
  });
};

const uploadFrames = async (outputPath: string, fileName: string) => {
  const bucket = admin.storage().bucket();
  const files = fs.readdirSync(outputPath);
  const uploadPromises = files.map(async (file) => {
    const filePath = path.join(outputPath, file);
    await bucket.upload(filePath, {
      destination: `frames/${fileName}/${file}`,
      metadata: {
        contentType: 'image/jpeg'
      }
    });
  });
  await Promise.all(uploadPromises);
  console.log('Upload dos frames concluído.');
};

export const uploadVideo = async (req: Request, res: Response) => {
  let tempFilePath: string | null = null;
  let tempFileDeleted = false;

  try {
    upload(req, res, async (err: any) => {
      if (err) {
        console.error(err);
        return res.status(400).send('Erro ao fazer upload do arquivo.');
      }

      if (!req.file) {
        return res.status(400).send('Nenhum arquivo de vídeo enviado.');
      }

      const videoFile = req.file;
      const fileName = videoFile.originalname;

      const tempDir = os.tmpdir();
      tempFilePath = path.join(tempDir, fileName);
      fs.writeFileSync(tempFilePath, videoFile.buffer);

      console.log('Arquivo temporário criado em:', tempFilePath);

      const framesFolder = 'frames';
      const outputPath = path.join(__dirname, '..', framesFolder);
      fs.mkdirSync(outputPath, { recursive: true });

      console.log('Diretório de saída dos frames:', outputPath);

      console.log('Extraindo frames de:', tempFilePath);

      await extractFrames(tempFilePath, outputPath);

      // Fazer upload dos frames para o Firebase Storage e salvar metadados no Firestore
      await uploadFrames(outputPath, fileName);

      const firestore = admin.firestore();
      const videoRef = firestore.collection('videos').doc();
      await videoRef.set({
        id: videoRef.id,
        fileName: fileName,
        frameCount: fs.readdirSync(outputPath).length,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      if (tempFilePath && !tempFileDeleted) {
        fs.unlinkSync(tempFilePath);
        tempFileDeleted = true;
        console.log('Arquivo temporário excluído.');
      }
      console.log('Upload e extração de frames concluídos com sucesso.');
      res.send('Upload e extração de frames concluídos com sucesso.');
    });
  } catch (error) {
    console.error(error);
    if (tempFilePath && !tempFileDeleted) {
      fs.unlinkSync(tempFilePath);
      console.log('Arquivo temporário excluído.');
    }
    res.status(500).send('Erro interno do servidor.');
  }
};
