import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <div className="container">
      <h1 className="heading">Bem-vindo ao Extract Frame </h1>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/upload" className="nav-link">Ir para Página de Upload</Link>
          </li>
          <li className="nav-item">
            <Link to="/list" className="nav-link">Ir para Página de Listagem</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
