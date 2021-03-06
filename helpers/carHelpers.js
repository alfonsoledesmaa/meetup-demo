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
        vehicleSchema: Joi.object().keys({
            modelYear: Joi.number().integer(),
            manufacturer: Joi.string().min(2).max(10),
            model: Joi.string().min(2)
        })
    }
};