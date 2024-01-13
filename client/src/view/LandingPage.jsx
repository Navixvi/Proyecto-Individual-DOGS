import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Link to="/home" className="enter-link">
        Entrar
      </Link>
    </div>
  );
};

export default LandingPage;
