import {
    Router,
    json
} from express from "express";

import MentorshipSession from "../controllers/sessionCtrl";
import {
  tokenExists,
  userAccess,
  menteeAccess,
  mentorAccess,
  adminAccess,
} from "../middleware/userToken";


const sessionRouter = express.Router();

sessionRouter.use(json());

sessionRouter.post("/api/v1/sessions", tokenExists, userAccess, MentorshipSession.createSession);
sessionRouter.patch("/api/v1/sessions/:sessionId/accept", tokenExists, userAccess, mentorAccess, MentorshipSession.updateSession);
sessionRouter.patch("/api/v1/sessions/:sessionId/reject", tokenExists, userAccess, mentorAccess, MentorshipSession.updateSession);
sessionRouter.post("/api/v1/sessions/:sessionId/review", tokenExists, userAccess, menteeAccess, MentorshipSession.reviewMentor);
sessionRouter.delete("/api/v1/sessions/:sessionId/review", tokenExists, userAccess, adminAccess, MentorshipSession.deleteReview);


export default sessionRouter;
