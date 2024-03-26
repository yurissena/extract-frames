import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Bem-vindo à Página Inicial</h1>
      <nav>
        <ul>
          <li>
            <Link to="/upload">Ir para Página de Upload</Link>
          </li>
          <li>
            <Link to="/list">Ir para Página de Listagem</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
