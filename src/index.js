import "./db/associations.js";
import express from "express";
//import errorHandler
import errorHandler from "./middleware/errorHandler.js";
//import router Files
import categoryRouter from "./routers/categoryRouter.js";
import orderRouter from "./routers/orderRouter.js";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//add routes + routers
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);

// add ErrorHandler inside
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));