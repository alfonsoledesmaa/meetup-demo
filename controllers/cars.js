const axios = require('axios');

axios.defaults.baseURL = 'https://one.nhtsa.gov/webapi/api/SafetyRatings';
/*
Request Example:
https://one.nhtsa.gov/webapi/api/SafetyRatings/modelyear/2015/make/Audi/model/A3?format=json

GET http://localhost:8888/vehicles/<MODEL YEAR>/<MANUFACTURER>/<MODEL>
 */

module.exports = {

  getVehicle: async (req, res) => {
    // Get parameters from request to generate request to API

    const modelYear = (req.params.year.replace(/\D/g, '')).trim();
    const manufacturer = (req.params.manufacturer.replace(/([.*+?^$|(){}\[\]])/mg, '')).trim();
    const model = (req.params.model.replace(/([.*+?^$|(){}\[\]])/mg, '')).trim();

    // Resquest to NHTSA API
    const responseNHTSA = await axios.get(`/modelyear/${modelYear}/make/${manufacturer}/model/${model}?format=json`);

    // User response
    const response = {
      Count : responseNHTSA.data.Count,
      Results: responseNHTSA.data.Results
    };

    res.json(response);
  },

  postVehicle: async (req, res)  => {

    const modelYear = req.value['body'].modelYear;
    const manufacturer = req.value['body'].manufacturer;
    const model = req.value['body'].model;

    // Resquest to NHTSA API
    const responseNHTSA = await axios.get(`/modelyear/${modelYear}/make/${manufacturer}/model/${model}?format=json`);

    // User response
    const response = {
        Count : responseNHTSA.data.Count,
        Results: responseNHTSA.data.Results
    };

    res.json(response);
  }
};

