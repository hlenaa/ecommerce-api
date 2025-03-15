import express from "express";
import { registerUser, loginUser } from "../controllers/users.js";
import schemaChecker from "../middleware/schemaChecke.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";

const router = express.Router();

router.post("/register", schemaChecker(registerSchema), registerUser);
router.post("/login", schemaChecker(loginSchema), loginUser);

export default router;