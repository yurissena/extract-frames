import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import logo from '../logo.svg';

const Home: React.FC = () => {
  return (
    <div>
      <div className="conteiner-home">
        <img className='logo' src={logo} alt="" />
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
