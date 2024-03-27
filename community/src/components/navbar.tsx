import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="main-navbar">
      <ul>
        <li><Link to="/" aria-label="Página inicial">Home</Link></li>
        <li><Link to="/upload" aria-label="Página de Upload">Upload</Link></li>
        <li><Link to="/list" aria-label="Lista de Vídeos">Lista de Vídeos</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
