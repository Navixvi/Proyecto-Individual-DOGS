const axios = require('axios');

const getDogBreeds = async (req, res) => {
  try {
    // Hacer la solicitud a la API de The Dog API
    const response = await axios.get('https://api.thedogapi.com/v1/breeds');
    const dogBreeds = response.data;

    // Filtrar la información para obtener solo los datos necesarios
    const simplifiedBreeds = dogBreeds.map(breed => {
      return {
        id: breed.id,
        name: breed.name,
        weight: breed.weight,
        height: breed.height,
        life_span: breed.life_span,
        temperaments: breed.temperament ? breed.temperament.split(',').map((t) => t.trim()) : [],
        origin: breed.origin,
        bred_for: breed.bred_for,
        breed_group: breed.breed_group,
        reference_image_id: breed.reference_image_id, 
      };
    });

    res.json(simplifiedBreeds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las razas de perros' });
  }
};

module.exports = {
  getDogBreeds,
};
