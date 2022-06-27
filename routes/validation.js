//validation
const Joi = require("joi");

//Registration Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(6).max(1024),
  });

  const response = schema.validateAsync(data, {
    abortEarly: false,
  });

  return response;
};

//Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6).max(1024),
  });
  const response = schema.validateAsync(data, {
    abortEarly: false,
  });

  return response;
};

module.exports = {
  registerValidation,
  loginValidation,
};
