import MentorModel from '../models/mentorModel';
import ResponseHandler from '../utils/responseHandler';
import lodash from 'lodash';

class Mentor {

    static async getAll(req, res) {

        try {
            const {rows} = await MentorModel.allMentors(); 
            const modMentors = await Array.from(new Set(rows.map(r => r.mentor_id)))
            .map(mentor_id => {
                const theMentor = rows.find(r => r.mentor_id === mentor_id); 
                return lodash.omit(theMentor, ['password']);
            })
            
            return res
                .status(200)
                .json(new ResponseHandler(200, 'All Mentors.',  modMentors, null).result());

        }catch (err) {
            return res
                .status(500)
                .json(new ResponseHandler(500, err.message, null).result());
        }

    };

    static async getOne(req, res) {

        const {mentor_id} = req.params;
        const {rows} = await MentorModel.oneMentor(mentor_id);
        const modMentors = await rows.map(r => lodash.omit(r, ['password']));
        try {
            if(rows.length === 0) {
                return res
                .status(404)
                .json(new ResponseHandler(404, `Mentor number ${mentor_id} not found`, null).result());
            }else {
                delete rows['password'];
                return res
                .status(200)
                .json(new ResponseHandler(200, 'Your mentor.', modMentors, null).result()); 
            }
           
        } catch (err) {
            return res
                .status(500)
                .json(new ResponseHandler(500, err.message, null).result())
        }
    }

}


export default Mentor;