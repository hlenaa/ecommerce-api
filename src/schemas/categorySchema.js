import Joi from "joi";

const categorySchema = Joi.object({
	name: Joi.string().trim().min(1).max(100).required(),
});

export default categorySchema;
