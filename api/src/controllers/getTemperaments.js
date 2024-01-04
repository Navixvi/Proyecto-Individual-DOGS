const axios = require('axios');
const { Temperaments } = require('../db');

const getTemperaments = async (req, res) => {
  try {
    // Obtener razas desde la API
    const response = await axios.get('https://api.thedogapi.com/v1/breeds');
    const breeds = response.data;

    // Extraer y almacenar temperamentos en la base de datos
    const allTemperaments = breeds.flatMap((breed) => {
      // La propiedad 'temperament' puede contener una lista de temperamentos separados por comas
      const breedTemperaments = breed.temperament ? breed.temperament.split(',').map((t) => t.trim()) : [];
      return breedTemperaments;
    });

    // Utilizar Set para eliminar duplicados
    const uniqueTemperaments = [...new Set(allTemperaments)];

    // Almacenar temperamentos en la base de datos
    const createdTemperaments = await Promise.all(
      uniqueTemperaments.map((temperament) =>
        Temperaments.findOrCreate({
          where: { nombre: temperament },
        })
      )
    );

    // Obtener solo los nombres de los temperamentos creados (filtrando los nulos)
    const storedTemperaments = createdTemperaments
      .filter(([, created]) => created) // Filtrar solo los temperamentos creados
      .map(([temperament]) => temperament.nombre);

    res.json({ temperaments: storedTemperaments });
  } catch (error) {
    console.error('Error in getTemperaments:', error);
    res.status(500).json({ error: 'Error al obtener temperamentos desde la API' });
  }
};

module.exports = getTemperaments;

