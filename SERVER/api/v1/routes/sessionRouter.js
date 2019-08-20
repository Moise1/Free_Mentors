import express from "express";
import {
    Router,
    json
} from "express";
import MentorshipSession from "../controllers/sessionCtrl";
import {tokenExists, userAccess, adminAccess} from "../middleware/userToken";


const sessionRouter = express.Router();

sessionRouter.use(json());

sessionRouter.post("/api/v1/sessions", tokenExists, userAccess, MentorshipSession.createSession);
// sessionRouter.get("/api/v1/sessions/:mentorId", tokenExists, userAccess, Mentor.singleMentor);




export default sessionRouter;