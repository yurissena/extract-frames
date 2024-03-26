import React, { useState } from 'react';

const Upload: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files) return;

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('video', files[0]);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload video.');
      }

      // Atualizar a interface do usuário com sucesso
      console.log('Video uploaded successfully');
    } catch (error: any) {
      setUploadError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Upload</h1>
      <input type="file" onChange={(e) => handleUpload(e.target.files)} />
      {uploading && <p>Carregando...</p>}
      {uploadError && <p>{uploadError}</p>}
    </div>
  );
};

export default Upload;
