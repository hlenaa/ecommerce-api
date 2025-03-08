import "./db/associations.js";
import express from "express";
import orderRouter from "./routers/orderRouter.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/orders", orderRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));