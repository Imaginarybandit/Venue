const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  city: Joi.string().required(),
});

const editUserSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  city: Joi.string().required(),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  phone: Joi.string().allow(""),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { userSchema, editUserSchema, loginSchema };
