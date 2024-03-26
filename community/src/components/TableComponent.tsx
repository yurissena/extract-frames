import React from 'react';

interface VideoData {
  id: string;
  fileName: string;
  frameCount: number;
  createdAt: string;
}

interface Props {
  data: VideoData[];
  onViewFrames: (videoId: string) => void;
}

const TableComponent: React.FC<Props> = ({ data, onViewFrames }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome do Arquivo</th>
          <th>Quantidade de Frames</th>
          <th>Data de Criação</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((video) => (
          <tr key={video.id}>
            <td>{video.id}</td>
            <td>{video.fileName}</td>
            <td>{video.frameCount}</td>
            <td>{video.createdAt}</td>
            <td>
              <button onClick={() => onViewFrames(video.id)}>Ver Frames</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
