import express from "express"
//import errorHandler
//import router Files

const app = express();
const port = process.env.PORT || 3000 ;

app.use(express.json());

//add routes + routers
app.use("/users");
app.use("/products");
app.use("/categories");
app.use("/orders");

// add ErrorHandler inside
// app.use(); 

app.listen(port, () => console.log(`Server is running on port ${port}`));