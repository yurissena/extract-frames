import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface VideoData {
  id: string;
  fileName: string;
  frameCount: number;
  createdAt: string;
}

interface Props {
  data: VideoData[];
  itemsPerPage?: number;
  onViewFrames?: (videoId: string) => void;
}

const TableComponent: React.FC<Props> = ({ data, itemsPerPage = 10, onViewFrames }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <table className="custom-table" aria-label="Lista de vídeos">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome do Arquivo</th>
            <th scope="col">Quantidade de Frames</th>
            <th scope="col">Data de Criação</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((video) => (
            <tr key={video.id}>
              <td>{video.id}</td>
              <td>{video.fileName}</td>
              <td>{video.frameCount}</td>
              <td>{video.createdAt}</td>
              <td>
                <Link to={`/view/${video.id}`} className="view-frames-button">
                  Ver Frames
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <button className="pagination-button" onClick={prevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span className="pagination-info">Página {currentPage} de {totalPages}</span>
        <button className="pagination-button" onClick={nextPage} disabled={currentPage === totalPages}>
          Próxima
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
