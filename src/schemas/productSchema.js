import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Product name is required",
    "string.min": "Product name must be at least 3 characters",
    "string.max": "Product name must be at most 100 characters",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be greater than zero",
    "any.required": "Price is required",
  }),
  description: Joi.string().optional().allow("").max(500).messages({
    "string.max": "Description must be at most 500 characters",
  }),
  categoryId: Joi.number().integer().positive().required().messages({
    "number.base": "Category ID must be a number",
    "number.positive": "Category ID must be a positive number",
    "any.required": "Category ID is required",
  }),
});


export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional().messages({
    "string.min": "Product name must be at least 3 characters",
    "string.max": "Product name must be at most 100 characters",
  }),
  price: Joi.number().positive().optional().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be greater than zero",
  }),
  description: Joi.string().optional().allow("").max(500).messages({
    "string.max": "Description must be at most 500 characters",
  }),
  categoryId: Joi.number().integer().positive().optional().messages({
    "number.base": "Category ID must be a number",
    "number.positive": "Category ID must be a positive number",
  }),
});