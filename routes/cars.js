const router = require('express-promise-router')();

const CarsController = require('../controllers/cars');
const { validateBody, schemas } = require('../helpers/carHelpers');

router.route('/')
    .get(CarsController.getVehicles);

router.route('/')
    .post(validateBody(schemas.vehicleSchema), CarsController.postVehicles);

module.exports = router;