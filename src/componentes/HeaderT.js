import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Blog Personal</h1>
      <nav> 
        <Link to="/entradas">Entradas del Blog</Link> 
        <Link to="/crear">Crear Entrada</Link>
      </nav>
    </header>
  );
}

export default Header;
