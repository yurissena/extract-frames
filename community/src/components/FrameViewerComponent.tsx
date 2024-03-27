import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Frame {
  id: string;
  imageUrl: string;
}

interface Props {
  videoId: string;
}

const FrameViewerComponent: React.FC<Props> = ({ videoId }) => {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const framesPerPage = 1; // Definindo o número de frames por página

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/frames/${videoId}`);
        setFrames(response.data.frames);
      } catch (error) {
        console.error('Erro ao buscar os frames do vídeo:', error);
      }
    };

    fetchFrames();
  }, [videoId]);

  // Função para retornar os frames da página atual
  const getCurrentPageFrames = () => {
    const startIndex = (currentPage - 1) * framesPerPage;
    const endIndex = startIndex + framesPerPage;
    return frames.slice(startIndex, endIndex);
  };

  // Função para avançar para a próxima página
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages()));
  };

  // Função para voltar para a página anterior
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Função para calcular o número total de páginas
  const totalPages = () => Math.ceil(frames.length / framesPerPage);

  return (
    <div className="frame-viewer-container">
      <h2>Frames do Vídeo: {videoId}</h2>
      <div className="frame-list">
        {getCurrentPageFrames().map((frame) => (
          <img key={frame.id} src={frame.imageUrl} alt={`Frame ${frame.id}`} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>&lt; Anterior</button>
        <span>Página {currentPage} de {totalPages()}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages()}>Próxima &gt;</button>
      </div>
    </div>
  );
};

export default FrameViewerComponent;
