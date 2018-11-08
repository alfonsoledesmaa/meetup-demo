const router = require('express-promise-router')();

const CarsController = require('../controllers/cars');
const { validateBody, schemas } = require('../helpers/carHelpers');

router.route('/:year/:manufacturer/:model')
    .get(CarsController.getVehicle);

router.route('/')
    .post(validateBody(schemas.vehicleSchema), CarsController.postVehicles);

module.exports = router;