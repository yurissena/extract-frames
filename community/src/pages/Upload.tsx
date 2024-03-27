import React from 'react';
import UploadComponent from '../components/UploadComponent';
import NavBar from '../components/navbar';
import '../styles/Upload.css';

const UploadPage: React.FC = () => {
  return (
    <div className="page-container">
      <NavBar />
      <div className="content-container">
        <h1>Upload do Vídeo para a extração de frames</h1>
        <UploadComponent />
      </div>
  </div>
  );
};

export default UploadPage;
