const Joi = require('joi');
const review = require('./models/review');
 module.exports.reviewSchema = Joi.object({
    review: Joi.object({
       comment: Joi.string().required(),
       rating: Joi.number().min(1).max(5).required(),
       date: Joi.date().default(Date.now)
    }).required(),

 });