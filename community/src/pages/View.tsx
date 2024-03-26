import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FrameViewerComponent from '../components/FrameViewerComponent';

interface Frame {
  id: number;
  imageUrl: string;
}

const View: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [frames, setFrames] = useState<Frame[]>([]);

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const response = await fetch(`/api/videos/${videoId}/frames`);
        if (!response.ok) {
          throw new Error('Failed to fetch frames.');
        }
        const data = await response.json();
        setFrames(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFrames();
  }, [videoId]);

  return (
    <div>
      <h1>Visualização de Frames</h1>
      <FrameViewerComponent frames={frames} />
    </div>
  );
};

export default View;
