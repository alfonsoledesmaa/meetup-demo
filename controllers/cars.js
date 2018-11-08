const axios = require('axios');

module.exports = {

  getVehicles: async (req, res) => {
    res.send('getVehicles Reached!');
  },

  postVehicles: async (req, res)  => {
    res.send(req.value['body']);
  }
};

