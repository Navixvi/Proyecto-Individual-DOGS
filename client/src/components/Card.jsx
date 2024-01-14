import React from 'react';

const Card = ({ dog, onClick }) => {
  if (!dog) {
    return null;
  }

  const { name, temperaments, weight, reference_image_id, image } = dog;
  console.log('Temperaments:', temperaments);

  // Asegúrate de que temperaments sea un array o inicialízalo como un array vacío
  const dogTemperaments = Array.isArray(temperaments) ? temperaments : [];

  // Usa reference_image_id si está disponible, de lo contrario, usa image
  const imageUrl = reference_image_id
    ? `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`
    : image || 'url_de_imagen_predeterminada_o_placeholder';

  return (
    <div className="card" onClick={onClick}>
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>
        Temperamentos: {dogTemperaments.length > 0 ? dogTemperaments.join(', ') : 'Sin temperamentos'}
      </p>
      <p>Peso: {weight ? `${weight.metric} kg` : 'No especificado'}</p>
    </div>
  );
};

export default Card;
