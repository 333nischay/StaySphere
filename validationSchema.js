const Joi = require('joi'); //this is to validate individual errors in the data given by the client and throw errors

 module.exports.listingSchema = Joi.object({
        listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.object({
            url: Joi.string().allow("",null),
            filename: Joi.string().allow("",null)
        }).allow("",null),
        price: Joi.number().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        category: Joi.string().required()

    }).required(),

 });
