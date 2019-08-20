import sessions from '../models/sessionModel';
import users from '../models/userModel';
import ResponseHandler from '../utils/responseHandler';
import sessionFields from '../helpers/sessionValidator';
import renamer from '../utils/renamer';
import { type } from 'os';

class MentorshipSession {

    static async createSession(req, res) {

        const {
            error
        } = sessionFields(req.body);

        if (error) return res
            .status(400)
            .json(new ResponseHandler(404, error.details[0].message, null).result());

        try {
            const mentee = req.user;

            Promise.all(users).then(async values => {
                const modValues = values.map(v => {
                    const alteredValue = renamer(v, {
                        "id": "mentorId"
                    })
                    return alteredValue;
                })

                const mentor = modValues.find(v => v.mentorId === parseInt(req.body.mentorId));

                if (!mentor || mentor.is_mentor === false) {
                    return res
                        .status(404)
                        .json(new ResponseHandler(404, `Mentor number ${req.body.mentorId} not found`, null).result());
                }

                const newSession = {
                    sessionId: sessions.length + 1,
                    mentorId: mentor.mentorId,
                    menteeId: mentee.id,
                    questions: req.body.questions,
                    menteeEmail: mentee.email,
                    status: 'pending'
                }

                sessions.push(newSession)
                return res
                    .status(201)
                    .json(new ResponseHandler(201, 'Mentorship session successfully created!', sessions, null).result());

            })

        } catch (err) {
            return res
                .status(500)
                .json(new ResponseHandler(500, err.message, null).result())
        }
    }

    static async updateSession(req, res) {

        try {
                const theSession = sessions.find(s => s.sessionId === parseInt(req.params.sessionId));

                if(!theSession) return res
                    .status(404)
                    .json(new ResponseHandler(404, `Mentorship sesssion number ${req.params.sessionId} not found`, null).result());

                theSession.status = req.body.status; 
                return res
                    .status(200)
                    .json(new ResponseHandler(200, 'Mentorship session request successfully updated!', theSession, null).result())
         
        } catch (err) {
            return res
                .status(500)
                .json(new ResponseHandler(500, err.message, null).result())
        }

    }
}


export default MentorshipSession;