import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

export const listVideos = async (req: Request, res: Response) => {
  try {
    const firestore = admin.firestore();
    const snapshot = await firestore.collection('videos').get();

    const videos: admin.firestore.DocumentData[] = [];
    snapshot.forEach(doc => {
      videos.push(doc.data());
    });

    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor.');
  }
};
