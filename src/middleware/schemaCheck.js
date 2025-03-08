import ExtendedError from "../utils/ExtendedError.js";

export const schemaChecker = (schema) => async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err) {
      next(new ExtendedError(400, err.message));
    }
};

export default schemaChecker;