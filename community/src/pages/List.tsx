import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableComponent from '../components/TableComponent';
import '../styles/list.css'; // Importar o arquivo CSS

interface VideoData {
  id: string;
  fileName: string;
  frameCount: number;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

const List: React.FC = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get<VideoData[]>('http://localhost:3000/list');
        // Ordenar os vídeos por data de criação em ordem decrescente
        const sortedVideos = response.data.sort((a, b) => {
          return b.createdAt._seconds - a.createdAt._seconds;
        });
        setVideos(sortedVideos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, []);

  const formatCreatedAt = (createdAt: { _seconds: number; _nanoseconds: number }) => {
    const date = new Date(createdAt._seconds * 1000 + createdAt._nanoseconds / 1000000);
    return date.toLocaleString();
  };

  return (
    <main className="list-container">
      <h1 className="list-title">Listagem de Vídeos</h1>
      <TableComponent
        data={videos.map(video => ({
          ...video,
          createdAt: formatCreatedAt(video.createdAt)
        }))}
        aria-label="Lista de vídeos"
      />
    </main>
  );
};

export default List;
