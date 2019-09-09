import db from '../db/dbIndex'; 

class SessionModel{ 

    static async create(req, mentee_id, mentee_email){

        const {mentor_id,  questions} = req; 
        const new_session = {
            mentor_id: mentor_id, 
            mentee_id: mentee_id, 
            mentee_email: mentee_email,
            questions: questions,  
            status: 'pending'
        }

        const queryText = 'INSERT INTO sessions(mentor_id, mentee_id, mentee_email, questions,status) VALUES($1, $2, $3, $4, $5)RETURNING*'; 

        const values = [
            new_session.mentor_id, 
            new_session.mentee_id, 
            new_session.mentee_email, 
            new_session.questions, 
            new_session.status
        ]

        const queryResult = await db.query(queryText, values); 
        return queryResult;
    }

    static async singleSession(session_id){
        const queryText = 'SELECT * FROM sessions WHERE session_id=$1'; 
        const queryResult = await db.query(queryText, [parseInt(session_id)]); 
        return queryResult; 
    }

    static async edit(session_id, input){
        const {rows} = this.singleSession(session_id); 
        const status = input.status;
        const queryText = 'UPDATE sessions SET status=$1 WHERE session_id=$2 RETURNING*'; 
        const queryResult = await db.query(queryText, [status, session_id]);
        return queryResult;
    }

}


export default SessionModel; 
