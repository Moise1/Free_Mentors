import express from "express";
import {json, Router} from "express"; 
import User from "../controllers/userCtrl";
import Mentor from "../controllers/mentorCtrl";
import MentorshipSession from "../controllers/sessionCtrl";
import Review from "../controllers/reviewCtrl";

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
router.patch("/api/v1/users/:user_id", tokenExists, userAccess, adminAccess, User.updateUser);


// Mentor router 
router.get("/api/v1/mentors", tokenExists, userAccess, Mentor.getAll);
router.get("/api/v1/mentors/:mentor_id", tokenExists, userAccess, Mentor.getOne); 


// Session router 
router.post("/api/v1/sessions", tokenExists, userAccess, MentorshipSession.createSession);
router.patch("/api/v1/sessions/:session_id/accept", tokenExists, userAccess, mentorAccess, MentorshipSession.updateSession);
router.patch("/api/v1/sessions/:session_id/reject", tokenExists, userAccess, mentorAccess, MentorshipSession.updateSession);
router.post("/api/v1/sessions/:session_id/review", tokenExists, userAccess, menteeAccess, Review.reviewMentor);
router.delete("/api/v1/sessions/:session_id/review", tokenExists, userAccess, adminAccess, Review.deleteReview);

export default router;
