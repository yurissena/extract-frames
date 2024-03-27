import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import logo from '../logo.svg';

const NavBar: React.FC = () => {

  return (
    <nav className="main-navbar">
      <div className="name-logo">
        <Link to="/" aria-label="Página inicial">
          <img src={logo} alt="" />
          <span>Extract Frame</span>
        </Link>
      </div>
      <ul>
        <li><Link to="/upload" aria-label="Página de Upload">Upload</Link></li>
        <li><Link to="/list" aria-label="Lista de Vídeos">Lista de Vídeos</Link></li>
      </ul>
    </nav>
  );
};
export default NavBar;
