const Joi = require("joi");

const groupSchema = Joi.object({
  groupName: Joi.string(),
  groupDescription: Joi.string().allow(null, ""),
  posterImage: Joi.object({
    url: Joi.string().required(),
    filename: Joi.string().required(),
  }),
  website: Joi.string().allow(null, ""),
  phone: Joi.string().allow(null, ""),
  email: Joi.string().email().allow(null, ""),
}).required();

const newGroupSchema = Joi.object({
  groupName: Joi.string().required(),
  groupDescription: Joi.string().allow(null, ""),
  posterImage: Joi.object({
    url: Joi.string().required(),
    filename: Joi.string().required(),
  }),
  website: Joi.string().allow(null, ""),
  phone: Joi.string().allow(null, ""),
  email: Joi.string().email().allow(null, ""),
}).required();

module.exports = { groupSchema, newGroupSchema };
