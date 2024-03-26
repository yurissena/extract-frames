// src/controllers/uploadController.ts
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

export const uploadVideo = async (req: Request, res: Response) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('Nenhum arquivo enviado.');
    }

    const videoFile = req.files.video as Express.Multer.File;
    const bucket = admin.storage().bucket();
    const fileUpload = bucket.file(videoFile.name);

    const uploadStream = fileUpload.createWriteStream({
      metadata: {
        contentType: videoFile.mimetype
      }
    });

    uploadStream.on('error', (error) => {
      console.error(error);
      res.status(500).send('Erro ao fazer upload do arquivo.');
    });

    uploadStream.on('finish', async () => {
      await fileUpload.makePublic();
      res.send('Upload concluído com sucesso.');
    });

    uploadStream.end(videoFile.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor.');
  }
};
