const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { Op } = require('sequelize');

const getDogsByName = async (req, res) => {
  const { name } = req.query;
  const API_KEY = process.env.API_KEY;

  try {
    // Buscar razas en la API de The Dog API
    const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`);
    const apiDogs = Array.isArray(apiResponse.data) ? apiResponse.data : [];

    // Buscar razas en la base de datos
    const dbDogs = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Temperament,
        attributes: ['name'],
        through: { attributes: [] },
      },
    });

    // Combinar resultados de la API y la base de datos
    const mergedResults = [...apiDogs, ...dbDogs];

    if (mergedResults.length > 0) {
      // Procesar la información y devolverla en el formato deseado
      const resultDetails = mergedResults.map(result => {
        const details = {
          id: result.id || result._id, // Manejar la variación de nombres de propiedad en API y base de datos
          name: result.name,
        };

        if (result.weight) {
          details.weight = result.weight;
        }

        if (result.height) {
          details.height = result.height;
        }

        // Temperament es un array, debes manejarlo adecuadamente
        if (result.temperament && result.temperament.length > 0) {
          details.temperament = result.temperament.map(t => t.name);
        }

        return details;
      });

      res.json(resultDetails);
    } else {
      res.status(404).json({ error: 'No se encontraron razas de perros con ese nombre' });
    }
  } catch (error) {
    console.error('Error in getDogsByName:', error);
    res.status(500).json({ error: 'Error al buscar razas de perros por nombre' });
  }
};

module.exports = getDogsByName;
