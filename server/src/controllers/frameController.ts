import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

interface VideoMetadata {
  fileName: string;
  frameCount: number;
}

export const frameVideos = async (req: Request, res: Response) => {
  try {
    const videoId = req.params.videoId;

    // Consulta o Firestore para obter os metadados do vídeo
    const videoRef = admin.firestore().collection('videos').doc(videoId);
    const videoDoc = await videoRef.get();

    if (!videoDoc.exists) {
      return res.status(404).send('Vídeo não encontrado.');
    }

    const videoMetadata = videoDoc.data() as VideoMetadata;
    const fileName = videoMetadata.fileName;
    const frameCount = videoMetadata.frameCount;

    // Construir as URLs dos frames
    const frames: { id: number; imageUrl: string }[] = [];
    const bucket = admin.storage().bucket();

    for (let i = 1; i <= frameCount; i++) {
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/frames/${fileName}/frame-${i}.jpg`;
      frames.push({ id: i, imageUrl });
    }

    res.json({ fileName, frameCount, frames });
  } catch (error) {
    console.error('Erro ao buscar os frames do vídeo:', error);
    res.status(500).send('Erro interno do servidor ao buscar os frames do vídeo.');
  }
};
