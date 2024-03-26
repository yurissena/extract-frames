import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

// Define uma interface para descrever o tipo do objeto req.files
interface FileFields {
  [fieldname: string]: Express.Multer.File[];
}

export const uploadVideo = async (req: Request, res: Response) => {
  try {
    const files = req.files as FileFields;
    if (!files || !files['video'] || !Array.isArray(files['video'])) {
      return res.status(400).send('Nenhum arquivo de vídeo enviado.');
    }

    const videoFile = files['video'][0] as Express.Multer.File;
    const bucket = admin.storage().bucket();
    const fileName = videoFile.originalname;
    const fileUpload = bucket.file(fileName);

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

    uploadStream.end(videoFile.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor.');
  }
};
