import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Detail = ({ match }) => {
  const [dogDetails, setDogDetails] = useState(null);

  useEffect(() => {
    const fetchDogDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/dogs/${match.params.id}`);
        setDogDetails(response.data);
      } catch (error) {
        console.error('Error fetching dog details:', error);
      }
    };

    fetchDogDetails();
  }, [match.params.id]);

  if (!dogDetails) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Detalles de la Raza: {dogDetails.name}</h2>
      <div>
        <img src={dogDetails.imagen} alt={dogDetails.name} />
        <p>Temperamentos: {dogDetails.temperaments.join(', ')}</p>
        <p>Peso: {dogDetails.weight}</p>
        {/* Agrega más detalles según tus necesidades */}
      </div>
    </div>
  );
};

export default Detail;
