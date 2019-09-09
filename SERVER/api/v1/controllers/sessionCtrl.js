import SessionModel from '../models/sessionModel';
import ResponseHandler from '../utils/responseHandler';
import sessionFields from '../helpers/sessionValidator';
import MentorModel from '../models/mentorModel'; 

class MentorshipSession {

    static async createSession(req, res) {

        const {
            error
        } = sessionFields(req.body);

        if (error) return res
            .status(400)
            .json(new ResponseHandler(404, error.details[0].message, null).result());

        try {
          
            const {mentor_id} = req.body; 
            const {rows} = await MentorModel.oneMentor(parseInt(mentor_id));
            const mentor_data = rows;

            if(mentor_data.length === 0) {
                return res 
                .status(404) 
                .json(new ResponseHandler(404, `Mentor number ${mentor_id} not found`, null).result());

            }else {
                const {rows} = await SessionModel.create(req.body, req.user.user_id, req.user.email, mentor_data.mentor_id); 
                return res
                .status(201)
                .json(new ResponseHandler(201, 'Mentorship session successfully created!', rows, null).result());

            }
            
        } catch (err) {
            return res
                .status(500)
                .json(new ResponseHandler(500, err.message, null).result())
        }
    }

    static async updateSession(req, res) {

        try {
            const {session_id} = req.params; 
            const theSession = await SessionModel.singleSession(parseInt(session_id)); 

                if(theSession.rows.length === 0) return res
                    .status(404)
                    .json(new ResponseHandler(404, `Mentorship sesssion number ${session_id} not found`, null).result());

                    const {rows} = await SessionModel.edit(session_id, req.body); 
                    return res
                    .status(200)
                    .json(new ResponseHandler(200, 'Mentorship session request successfully updated.', rows[0], null ).result());
                
        } catch (err) {
            return res
                .status(500)
                .json(new ResponseHandler(500, err.message, null).result())
        }

    }

}


export default MentorshipSession;