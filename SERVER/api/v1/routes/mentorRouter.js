import express from 'express';
import {
    Router,
    json
} from  "express";

import Mentor from "../controllers/mentorCtrl";
import { tokenExists, userAccess, adminAccess } from "../middleware/userToken";


const mentorRouter = express.Router();

mentorRouter.use(json());

mentorRouter.get("/api/v1/mentors", tokenExists, userAccess, Mentor.allMentors);
mentorRouter.get("/api/v1/mentors/:mentorId", tokenExists, userAccess, Mentor.singleMentor);


export default mentorRouter;
