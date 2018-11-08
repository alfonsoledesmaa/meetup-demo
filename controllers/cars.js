const axios = require('axios');

axios.defaults.baseURL = 'https://one.nhtsa.gov/webapi/api/SafetyRatings';
/*
Request Example:
https://one.nhtsa.gov/webapi/api/SafetyRatings/modelyear/2015/make/Audi/model/A3?format=json

GET http://localhost:8888/vehicles/<MODEL YEAR>/<MANUFACTURER>/<MODEL>
 */

//TODO: Error handles as the assignment requires && delete unnecessary comments
module.exports = {

  getVehicle: async (req, res) => {

    // Get parameters from request to generate request to API
    const modelYear = (req.params.year.replace(/\D/g, '')).trim();
    const manufacturer = (req.params.manufacturer.replace(/([.*+?^$|(){}\[\]])/mg, '')).trim();
    const model = (req.params.model.replace(/([.*+?^$|(){}\[\]])/mg, '')).trim();

    const query = req.query;

    // Resquest to NHTSA API
    const responseNHTSA = await axios.get(`/modelyear/${modelYear}/make/${manufacturer}/model/${model}?format=json`);

    // User response
    const response = {
        Count : responseNHTSA.data.Count,
        Results: responseNHTSA.data.Results
    };

    if(query.hasOwnProperty('withRating') && query.withRating === 'true') {
       for (let i = 0; i < response.Results.length; i++) {
         response.Results[i].CrashRating =  await getCrashRating(response.Results[i].VehicleId);
         response.Results[i].Description = response.Results[i].VehicleDescription;
         delete response.Results[i].VehicleDescription;
       }
    }

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

const getCrashRating = async vehicleId => {
  const crashRating = await axios.get(`/VehicleId/${vehicleId}?format=json`);
  return crashRating.data.Results[0].OverallRating;
};

