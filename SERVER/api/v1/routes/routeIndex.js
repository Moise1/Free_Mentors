import express from "express";
import {json, Router} from "express"; 
import User from "../controllers/userCtrl";
import Mentor from "../controllers/mentorCtrl";
import MentorshipSession from "../controllers/sessionCtrl";
import {
    tokenExists,
    userAccess,
    adminAccess,
    mentorAccess,
    menteeAccess
} from "../middleware/userToken";


const router = express.Router();
router.use(json());

// User router 
router.post("/api/v1/auth/signup", User.userSignUp);
router.post("/api/v1/auth/signin", User.userSignIn);
router.patch("/api/v1/users/:userId", tokenExists, userAccess, adminAccess, User.updateUser);


// Mentor router 
router.get("/api/v1/mentors", tokenExists, userAccess, Mentor.allMentors);
router.get("/api/v1/mentors/:mentorId", tokenExists, userAccess, Mentor.singleMentor); 


// Session router 
router.post("/api/v1/sessions", tokenExists, userAccess, MentorshipSession.createSession);
router.patch("/api/v1/sessions/:sessionId/accept", tokenExists, userAccess, mentorAccess, MentorshipSession.updateSession);
router.patch("/api/v1/sessions/:sessionId/reject", tokenExists, userAccess, mentorAccess, MentorshipSession.updateSession);
router.post("/api/v1/sessions/:sessionId/review", tokenExists, userAccess, menteeAccess, MentorshipSession.reviewMentor);
router.delete("/api/v1/sessions/:sessionId/review", tokenExists, userAccess, adminAccess, MentorshipSession.deleteReview);

export default router;
