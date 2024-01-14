const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { Op } = require('sequelize');

const getDogsByName = async (req, res) => {
  const { name } = req.params; 
  const API_KEY = process.env.API_KEY;

  try {
    // Buscar razas en la API de The Dog API
    const apiResponse = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`);
    const apiDogs = Array.isArray(apiResponse.data) ? apiResponse.data : [];

    // Si la base de datos no está vacía, buscar razas en la base de datos
    const dbDogs = Dog.findAll({
      where: {
        nombre: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: Temperament,
    });

    // Esperar a que se resuelvan ambas consultas
    const [dbResults, apiResults] = await Promise.all([dbDogs, apiDogs]);

    // Combinar resultados de la API y la base de datos
    const mergedResults = [...apiResults, ...dbResults];

    if (mergedResults.length > 0) {
      // Procesar la información y devolverla en el formato deseado
      const resultDetails = mergedResults.map(async (result) => {
        const details = {
          id: result.id || result._id, // Manejar la variación de nombres de propiedad en API y base de datos
          name: result.name || result.nombre,
        };

        if (result.weight) {
          details.weight = result.weight;
        }

        if (result.height) {
          details.height = result.height;
        }


        if (result.temperament) {
          details.temperament = Array.isArray(result.temperament)
            ? result.temperament.map((t) => t.trim())
            : result.temperament.split(',').map((t) => t.trim());
        }

        // Obtener la imagen de la raza desde la API
        const imageResponse = await axios.get(`https://api.thedogapi.com/v1/images/search?breed_id=${result.id || result._id}`);
        if (imageResponse.data && imageResponse.data[0] && imageResponse.data[0].url) {
          details.image = imageResponse.data[0].url;
        }

        return details;
      });

      const resolvedDetails = await Promise.all(resultDetails);

      res.json(resolvedDetails);
    } else {
      res.status(404).json({ error: 'No se encontraron razas de perros con ese nombre' });
    }
  } catch (error) {
    console.error('Error in getDogsByName:', error);
    res.status(500).json({ error: 'Error al buscar razas de perros por nombre' });
  }
};

module.exports = getDogsByName;
