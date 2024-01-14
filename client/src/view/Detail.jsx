import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

const Detail = () => {
  const { id } = useParams();
  const [dogDetails, setDogDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDogDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/dogs/${id}`);
        setDogDetails(response.data);
      } catch (error) {
        console.error('Error al obtener detalles de la raza de perro:', error);
      }
    };

    fetchDogDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate('/home');
  };

  if (!dogDetails) {
    return <p>Cargando...</p>;
  }
  
  const { name, weight, height, life_span, temperament, origin, bred_for, breed_group, temperaments, reference_image_id } = dogDetails;
  const weightString = `${weight.imperial} (imperial) - ${weight.metric} (metric)`;
  const heightString = `${height.imperial} (imperial) - ${height.metric} (metric)`;
  const temperamentsArray = temperaments || [];
  
  // Verificar si reference_image_id está definido antes de construir la URL de la imagen
  const imageUrl = reference_image_id ? `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg` : '';
  
  return (
    <div className="detail-container">
      <h2>{name}</h2>
      {imageUrl && <img src={imageUrl} alt={name} className="dog-image" />}
      <p>Peso: {weightString}</p>
      <p>Altura: {heightString}</p>
      <p>Esperanza de vida: {life_span}</p>
      <p>Temperamentos: {temperamentsArray.join(', ')}</p>
      <p>Origen: {origin}</p>
      <p>Para lo que fue criado: {bred_for}</p>
      <p>Grupo de raza: {breed_group}</p>
      <button onClick={handleGoBack}>Volver a Home</button>
    </div>
  );
};

export default Detail;

