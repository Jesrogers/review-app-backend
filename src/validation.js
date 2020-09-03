const Joi = require('joi');

const reviewValidation = (data) => {
  const reviewSchema = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().max(300).allow(''),
    rating: Joi.number().min(1).max(5).required(),
  });

  return reviewSchema.validate(data);
};

const registerValidation = (data) => {
  const reviewSchema = Joi.object({
    username: Joi.string().lowercase().alphanum().max(100).required(),
    password: Joi.string().max(200).required(),
    repeatPassword: Joi.ref('password'),
  }).with('password', 'repeatPassword');

  return reviewSchema.validate(data);
};

module.exports = { reviewValidation, registerValidation };
