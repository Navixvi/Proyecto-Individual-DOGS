const { Router } = require('express');
const dogController = require('../controllers/dogController');
const getDogById = require('../controllers/getDogById');
const getDogsByName = require('../controllers/getDogByName');
const getTemperaments = require('../controllers/getTemperaments');
const createDog = require('../controllers/createDog');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', dogController.getDogBreeds);
router.get('/dogs/name/:name', getDogsByName);  
router.get('/dogs/:idRaza', getDogById);
router.get('/temperaments', getTemperaments);
router.post('/create' , createDog);

module.exports = router;
