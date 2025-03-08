import { Router } from "express"; //import router object from express
//import controllers
import {
	getAllCategories,
	createCategory,
	getCategory,
	updateCategory,
	deleteCategory,
} from "../controllers/category.js";
//import Schema Validation from joi
import categorySchema from "../schemas/categorySchema.js";
import { schemaChecker } from "../middleware/schemaCheck.js";
import idCheck from "../middleware/categoryIdCheck.js";

const categoryRouter = Router(); //create a router object

categoryRouter
	.get("/", getAllCategories)
	.post("/", schemaChecker(categorySchema), createCategory) //check first if body is valid
	.get("/:id", idCheck, getCategory) //check if id exists
	.put("/:id", idCheck, schemaChecker(categorySchema), updateCategory) //check if id exists + if body is valid
	.delete("/:id", idCheck, deleteCategory); //check if id exists

export default categoryRouter;
