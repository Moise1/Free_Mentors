import db from "../db/dbIndex";

class MentorModel{

    static async allMentors(){
        await db.query('INSERT INTO mentors SELECT * FROM users WHERE  users.is_mentor=true ON CONFLICT (mentor_id) DO NOTHING;');
        const queryText = 'SELECT * FROM mentors';
        const queryResult = await db.query(queryText); 
        return queryResult; 
    } 

    static async oneMentor(mentor_id){
        const queryText = 'SELECT * FROM mentors WHERE mentor_id=$1 LIMIT 1'; 
        const queryResult = await db.query(queryText, [parseInt(mentor_id)]); 
        return queryResult;
    }
}

export default MentorModel;
