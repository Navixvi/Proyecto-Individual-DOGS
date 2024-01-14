const axios = require('axios');
const { Dog, Temperament } = require('../db');

const getDogById = async (req, res) => {
  const { idRaza } = req.params;

  try {
    // Verificar si la raza existe en la API
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${idRaza}`);
    const apiDog = response.data;

    if (apiDog && apiDog.id) {
      // Si la raza existe en la API, devolver la información
      const { name, weight, height, life_span, temperament, origin, bred_for, breed_group, reference_image_id } = apiDog;

      // Convierte la cadena de temperamentos en un array
      const temperamentsArray = temperament ? temperament.split(',').map((temp) => temp.trim()) : [];

      const dogDetails = {
        id: apiDog.id,
        name,
        weight,
        height,
        life_span,
        temperaments: temperamentsArray,
        origin,
        bred_for,
        breed_group,
        reference_image_id,
      };

      res.json(dogDetails);
    } else {
      // Si la raza no existe en la API, buscar en la base de datos
      const dbDog = await Dog.findByPk(idRaza, {
        include: [
          {
            model: Temperament,
            attributes: ['name'],
            through: { attributes: [] },
          },
        ],
      });

      if (dbDog) {
        // Si la raza existe en la base de datos, devolver la información
        const { id, name, weight, height, life_span, origin, bred_for, breed_group, temperaments } = dbDog;

        const dogDetails = {
          id,
          name,
          weight,
          height,
          life_span,
          origin,
          bred_for,
          breed_group,
          temperaments: temperaments.map((temp) => temp.name),
        };

        res.json(dogDetails);
      } else {
        // Si la raza no existe ni en la API ni en la base de datos, devolver un error
        res.status(404).json({ error: 'Raza no encontrada' });
      }
    }
  } catch (error) {
    console.error(error);

    if (error.response && error.response.status === 404) {
      // La API de The Dog API podría devolver 404 si la raza no se encuentra
      res.status(404).json({ error: 'Raza no encontrada' });
    } else {
      // Otro tipo de error
      res.status(500).json({ error: 'Error al obtener el detalle de la raza de perro' });
    }
  }
};

module.exports = getDogById;
