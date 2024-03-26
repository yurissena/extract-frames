import React, { useEffect, useState } from 'react';
import TableComponent from '../components/TableComponent';

interface VideoData {
  id: string;
  fileName: string;
  frameCount: number;
  createdAt: string; 
}

const List: React.FC = () => {
    
  const [videos, setVideos] = useState<VideoData[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        if (!response.ok) {
          throw new Error('Failed to fetch videos.');
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Listagem</h1>
      <TableComponent data={videos} />
    </div>
  );
};

export default List;
