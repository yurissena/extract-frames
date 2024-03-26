import React, { useState } from 'react';
import axios from 'axios';

const UploadComponent: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('video', files[0]);

    try {
      await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadError(null);
      setUploading(false);
    } catch (error) {
      setUploadError('Ocorreu um erro durante o upload.');
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleUpload(e.target.files)} />
      {uploading && <p>Carregando...</p>}
      {uploadError && <p>{uploadError}</p>}
    </div>
  );
};

export default UploadComponent;
