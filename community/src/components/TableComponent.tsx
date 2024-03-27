import React, { useState } from 'react';

interface VideoData {
  id: string;
  fileName: string;
  frameCount: number;
  createdAt: string;
}

interface Props {
  data: VideoData[];
  itemsPerPage?: number; // Número de itens por página
  onViewFrames?: (videoId: string) => void;
}

const TableComponent: React.FC<Props> = ({ data, itemsPerPage = 10, onViewFrames }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcula o índice inicial e final dos itens a serem exibidos na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filtra os dados com base na página atual
  const currentPageData = data.slice(startIndex, endIndex);

  // Calcula o número total de páginas
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Função para avançar para a próxima página
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Função para voltar para a página anterior
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <table className="custom-table" aria-label="Lista de vídeos"> {/* Adicionando um rótulo acessível para a tabela */}
        {/* Renderiza os cabeçalhos da tabela */}
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome do Arquivo</th>
            <th scope="col">Quantidade de Frames</th>
            <th scope="col">Data de Criação</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        {/* Renderiza os dados da página atual */}
        <tbody>
          {currentPageData.map((video) => (
            <tr key={video.id}>
              <td>{video.id}</td>
              <td>{video.fileName}</td>
              <td>{video.frameCount}</td>
              <td>{video.createdAt}</td>
              <td>
                <button
                  className="view-frames-button"
                  onClick={() => onViewFrames && onViewFrames(video.id)}
                >
                  Ver Frames
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Adicionando botões de paginação com estilos e atributos de acessibilidade */}
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
