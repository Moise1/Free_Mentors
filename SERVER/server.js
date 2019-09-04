import express from "express";
import userRouter from "./api/v1/routes/userRouter";
import mentorRouter from "./api/v1/routes/mentorRouter";
import sessionRouter from "./api/v1/routes/sessionRouter";


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(userRouter);
app.use(mentorRouter);
app.use(sessionRouter);


app.get("/", (req, res) => res.status(200).json({
  status: 200,
  message: "Welcome to Free Mentors!",
}));


app.use("*", (req, res) => res.status(405).json({
  status: 405,
  message: "Method Not Allowed!",
}));


const port = process.env.PORT || 3000;
app.listen(port);

export default app;
