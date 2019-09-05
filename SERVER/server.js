import express from "express";
import router from "./api/v1/routes/routeIndex";


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.get("/", (req, res) => res.status(200).json({
  status: 200,
  message: "Welcome to Free Mentors!",
}));


app.use("*", (req, res) => res.status(405).json({
  status: 405,
  message: "Method Not Allowed!",
}));


// eslint-disable-next-line
const port = process.env.PORT || 3000;
app.listen(port);

export default app;
