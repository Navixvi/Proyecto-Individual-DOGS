import React from 'react';

const Card = ({ dog, onClick }) => {
  if (!dog) {
    return null;
  }

  const { name, temperaments, weight, reference_image_id } = dog;

  const imageUrl = `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`;

  return (
    <div className="card" onClick={onClick}>
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>
        Temperamentos: {temperaments && temperaments.length > 0 ? temperaments.join(', ') : 'Sin temperamentos'}
      </p>
      <p>Peso: {weight ? `${weight.metric} kg` : 'No especificado'}</p>
    </div>
  );
};

export default Card;

