import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import List from './pages/List';
import View from './pages/View';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/list" element={<List />} />
        <Route path="/view/:videoId" element={<View />} />
      </Routes>
    </Router>
  );
}

export default App;
