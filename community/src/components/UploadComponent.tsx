import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import ProgressBar from 'react-progress-bar';

const UploadComponent: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async (files: FileList | null) => {
    if (!files) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('video', files[0]);

    try {
      const response: AxiosResponse = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });
      if (response.status === 200) {
        // Upload bem-sucedido
        console.log('Upload concluído com sucesso');
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

  return (
    <div>
      <input type="file" onChange={(e) => handleUpload(e.target.files)} />
      {uploading && <ProgressBar completed={uploadProgress} />}
      {uploadError && <p>{uploadError}</p>}
    </div>
  );
};

export default UploadComponent;
