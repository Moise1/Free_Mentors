import express from "express";  
import userRouter from "./api/v1/routes/userRouter";


const app = express(); 

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(userRouter);


app.get("/", (req, res) =>{
    return res.status(200).json({
        status: 200,
        message: "Welcome to Free Mentors!"
    });
});


app.use("*", (req, res) =>{
    return res.status(405).json({
        status: 405,
        message: "Method Not Allowed!"
    });
});


const port = process.env.PORT || 3000; 
app.listen(port);

export default app;