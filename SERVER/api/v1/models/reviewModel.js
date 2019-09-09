import db from '../db/dbIndex';

class ReviewModel{

    static async createReview(req, session_id, mentee_id, mentee_full_name, mentor_id ){

        const {score, remark} = req; 

        const new_review = {
            session_id: session_id,
            mentee_id: mentee_id, 
            mentee_full_name: mentee_full_name, 
            mentor_id: mentor_id, 
            score: score, 
            remark: remark
        }

        const values = [
            new_review.session_id, 
            new_review.mentee_id, 
            new_review.mentee_full_name, 
            new_review.mentor_id, 
            new_review.score, 
            new_review.remark
        ];
        
        const queryText = "INSERT INTO reviews(session_id, mentee_id, mentee_full_name, mentor_id, score, remark) VALUES($1, $2, $3, $4, $5, $6) RETURNING*";
        const queryResult = await db.query(queryText, values); 
        return queryResult;
    }

    static async removeReview(){
        const queryText = "DELETE  FROM reviews"; 
        const queryResult = await db.query(queryText); 
        return queryResult;

    }
}

export default ReviewModel;
