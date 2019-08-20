import express from "express";
import {
    Router,
    json
} from "express";
import MentorshipSession from "../controllers/sessionCtrl";
import {tokenExists, userAccess,mentorAccess ,adminAccess} from "../middleware/userToken";


const sessionRouter = express.Router();

sessionRouter.use(json());

sessionRouter.post("/api/v1/sessions", tokenExists, userAccess, MentorshipSession.createSession);
sessionRouter.patch("/api/v1/sessions/:sessionId/accept", tokenExists, userAccess, mentorAccess, MentorshipSession.updateSession);
sessionRouter.patch("/api/v1/sessions/:sessionId/reject", tokenExists, userAccess, mentorAccess, MentorshipSession.updateSession);


export default sessionRouter;