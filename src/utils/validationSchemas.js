import Joi from 'joi';

const schemas = {};
schemas.loginSchema = Joi.object({
  email: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string().required(),
});
schemas.signupSchema = Joi.object({
  name: Joi.string().min(3).required(),
  lastname: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string().required(),
  phoneNumber: Joi.number().required(),
  admin: Joi.boolean().required(),
});

schemas.createProductSchema = Joi.object({
  product_desc: Joi.string().min(3).required(),
  unit_price: Joi.number().required(),
  quantity_in_stock: Joi.number().required(),
  quantity_supplied: Joi.number().required(),
  supplier_name: Joi.string().required(),
  category: Joi.string().required(),
});

schemas.ModifyProductSchema = Joi.object({
  product_id: Joi.number().required(),
  product_desc: Joi.string().min(3).required(),
  unit_price: Joi.number().required(),
  quantity_in_stock: Joi.number().required(),
  quantity_supplied: Joi.number().required(),
  supplier_name: Joi.string().required(),
  category: Joi.string().required(),
});
export default schemas;
