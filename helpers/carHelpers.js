const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if(result.error){
                return res.status(400).json(result.error);
            }

            if(!req.value) {req.value = {};}
            req.value['body'] = result.value;
            next();
        }
    },
    schemas: {
        vehicleSchema: {
            modelYear: Joi.number().required().integer(),
            manufacturer: Joi.string().required().min(2).max(10),
            model: Joi.string().required().min(2)
        }
    }
};