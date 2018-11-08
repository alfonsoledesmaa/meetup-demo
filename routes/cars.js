const router = require('express-promise-router')();

const CarsController = require('../controllers/cars');

router.route('/')
    .get(CarsController.getVehicles);

module.exports = router;