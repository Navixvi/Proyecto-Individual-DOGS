import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <h1>Bienvenido a la Página de Inicio</h1>
      <Link to="/home">Ir a la página de inicio</Link>
    </div>
  );
}

export default LandingPage;