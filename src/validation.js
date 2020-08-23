const Joi = require('joi');

const reviewValidation = (data) => {
  const reviewSchema = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().max(300),
    rating: Joi.number().min(1).max(5).required(),
  });

  return reviewSchema.validate(data);
};

module.exports = { reviewValidation };
