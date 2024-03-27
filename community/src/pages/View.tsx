import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FrameViewerComponent from '../components/FrameViewerComponent';
import NavBar from '../components/navbar';
import './../styles/view.css';

const View: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();

  // Provide a default value for videoId using the nullish coalescing operator
  const id = videoId ?? '';

  return (
    <div>
      <NavBar />
      <FrameViewerComponent videoId={id} />
    </div>
  );
};

export default View;
