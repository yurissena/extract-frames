import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/navbar';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <div>
      <NavBar />
      <div className="conteiner">
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
    </div>
  );
};

export default Home;
