import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import ProgressBar from "@ramonak/react-progress-bar";

const UploadComponent: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUpload = async (files: FileList | null) => {
    if (!files) return;

    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
    const file = files[0];

    if (!allowedTypes.includes(file.type)) {
      setUploadError('Por favor, selecione um arquivo de vídeo válido.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response: AxiosResponse = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setUploadProgress(progress);
        }
      });
      if (response.status === 200) {
        // Upload bem-sucedido
        console.log('Upload concluído com sucesso');
        setUploadSuccess(true);
      } else {
        throw new Error('Falha no upload');
      }
      setUploadError(null);
    } catch (error) {
      setUploadError('Ocorreu um erro durante o upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleUpload(event.dataTransfer.files);
  };

  const handleFileInputClick = () => {
    document.getElementById('file-input')?.click();
  };

  return (
    <div className="page-container">
      <div className="upload-container" onDragOver={handleDragOver} onDrop={handleDrop}>
        <div className="drop-area">
          <label htmlFor="file-input" className="drop-text" onClick={handleFileInputClick}>
            Arraste e solte o arquivo de vídeo aqui ou clique para selecionar
          </label>
          <input id="file-input" type="file" onChange={(e) => handleUpload(e.target.files)} className="file-input" />
        </div>
        {uploading && <ProgressBar completed={uploadProgress} className="progress-bar" />}
        {uploadSuccess && !uploading && <p className="success-message">Upload concluído com sucesso!</p>}
        {uploadError && <p className="error-message">{uploadError}</p>}
      </div>
    </div>
  );
};

export default UploadComponent;
