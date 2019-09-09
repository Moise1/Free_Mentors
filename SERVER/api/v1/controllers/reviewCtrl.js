import SessionModel from '../models/sessionModel';
import ReviewModel from '../models/reviewModel';
import reviewFields from '../helpers/reviewValidator';
import ResponseHandler from '../utils/responseHandler';

class Review {

    static async reviewMentor(req, res) {
        const {
            error
        } = reviewFields(req.body);

        if (error) return res
            .status(400)
            .json(new ResponseHandler(404, error.details[0].message, null).result());

        const {
            session_id
        } = req.params;

        const theSession = await SessionModel.singleSession(parseInt(session_id));


        if (theSession.rows.length === 0) return res
            .status(404)
            .json(new ResponseHandler(404, `Sorry, sesssion number ${session_id} not found`, null).result())
        try {

            const {
                rows
            } = await ReviewModel.createReview(
                req.body, theSession.rows[0].session_id, theSession.rows[0].mentee_id,
                req.user.first_name + ' ' + req.user.last_name, theSession.rows[0].mentor_id);
            return res
                .status(201)
                .json(new ResponseHandler(201, 'Thanks for your review.', rows[0], null).result());

        } catch (err) {
            return res
                .status(500)
                .json(new ResponseHandler(500, err.message, null).result())
        }

    }

    static async deleteReview(req, res) {


        const {
            session_id
        } = req.params;
        const theSession = await SessionModel.singleSession(parseInt(session_id));

        try {
            if (theSession.rows.length === 0){
                return res
                .status(404)
                .json(new ResponseHandler(404, `Sorry, sesssion number ${session_id} not found`, null).result())

            }else{
                await ReviewModel.removeReview();
                return res
                .status(200)
                .json(new ResponseHandler(200, `Review for session ${session_id} successfully deleted!`, null).result());
            }
            
        } catch (err) {
            return res
                .status(500)
                .json(new ResponseHandler(500, err.message, null).result())
        }

    }
}

export default Review;