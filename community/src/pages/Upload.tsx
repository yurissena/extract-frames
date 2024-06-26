import React from 'react';
import UploadComponent from '../components/UploadComponent';
import '../styles/upload.css';

const UploadPage: React.FC = () => {
  return (
    <div className="page-container">
      <main className="content-container">
        <h1>Upload do Vídeo para a extração de frames</h1>
        <UploadComponent />
      </main>
    </div>
  );
};

export default UploadPage;
