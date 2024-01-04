const { Dog, Temperament } = require('../db');

const createDog = async (req, res) => {
  try {
    const { imagen, nombre, altura, peso, añosDeVida, } = req.body;


    // Crear el perro en la base de datos
    const createdDog = await Dog.create({
      imagen,
      nombre,
      altura,
      peso,
      añosDeVida,
    });

    // Obtener los objetos de temperamentos asociados
    const temperamentObjects = await Temperament.findAll({
      where: { nombre: temperaments },
    });

    // Relacionar el perro con los temperamentos asociados
    await createdDog.addTemperaments(temperamentObjects);

    res.status(201).json({ message: 'Perro creado exitosamente.', dog: createdDog });
  } catch (error) {
    console.error('Error in createDog:', error);
    res.status(500).json({ error: 'Error al crear el perro.' });
  }
};

module.exports = createDog;
