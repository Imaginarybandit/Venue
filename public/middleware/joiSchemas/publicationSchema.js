const Joi = require("joi");

const editPublicationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  date: Joi.string().required().required(),
  localizacion: Joi.string().required(),
}).required();

const newPublicationSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().allow(""),
  date: Joi.string().required().required(),
  localizacion: Joi.string().required(),
}).required();

module.exports = { editPublicationSchema, newPublicationSchema };
