import "./db/associations.js";
import express from "express";
//import errorHandler
import errorHandler from "./middleware/errorHandler.js";
//import router Files
import categoryRouter from "./routers/categoryRouter.js";
import orderRouter from "./routers/orderRouter.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//add routes + routers
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);


// add ErrorHandler inside
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));