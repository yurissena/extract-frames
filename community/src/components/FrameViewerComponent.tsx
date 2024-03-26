import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Frame {
  id: number;
  imageUrl: string;
}

interface Props {
  videoId: string;
}

const FrameViewerComponent: React.FC<Props> = ({ videoId }) => {
  const [frames, setFrames] = useState<Frame[]>([]);

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const response = await axios.get(`/api/frames/${videoId}`);
        setFrames(response.data.frames);
      } catch (error) {
        console.error('Erro ao buscar os frames do vídeo:', error);
      }
    };

    fetchFrames();
  }, [videoId]);

  return (
    <div>
      {frames.map((frame) => (
        <img key={frame.id} src={frame.imageUrl} alt={`Frame ${frame.id}`} />
      ))}
    </div>
  );
};

export default FrameViewerComponent;
