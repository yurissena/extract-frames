import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

export const listVideos = async (req: Request, res: Response) => {
  try {
    const [files] = await admin.storage().bucket().getFiles();

    const videos = files.map((file) => ({
      id: file.id,
      name: file.name,
      created: file.metadata.timeCreated
    }));

    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor.');
  }
};
