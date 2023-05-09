const Joi = require("joi");

const savedPublicationsSchema = Joi.object({
  publicationId: Joi.string().required(),
}).required();

module.exports = { savedPublicationsSchema };
