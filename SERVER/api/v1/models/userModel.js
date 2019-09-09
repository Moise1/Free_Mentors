import db from "../db/dbIndex";
import hasher from "../helpers/password";


class UserModel {

    static async create(req){

        const  { first_name, last_name, email, address, password, bio, occupation, expertise } = req;

        const encrypted_password = await hasher.hashingPassword(password, 10);

        const new_user = {
            first_name, 
            last_name, 
            email: email.toLowerCase(), 
            encrypted_password, 
            address,
            bio, 
            occupation, 
            expertise,
            is_mentor: false,
            is_admin: false,
        };


        const queryText = "INSERT INTO users(first_name, last_name, email, password, address, bio, occupation, expertise, is_mentor, is_admin) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING*";

        const values = [
            new_user.first_name,
            new_user.last_name,
            new_user.email,
            encrypted_password,
            new_user.address,
            new_user.bio,
            new_user.occupation, 
            new_user.expertise,
            new_user.is_mentor,
            new_user.is_admin,
        ];
        const queryResult = await db.query(queryText, values); 
        return queryResult;
    }


    static async allUsers(){
        const queryText = "SELECT * FROM users"; 
        const queryResult = await db.query(queryText); 
        return queryResult; 

    } 

    static async findMail(email){
        const queryText = "SELECT * FROM users WHERE email=$1";
        const mailResult = email.toLowerCase();
        const mailData = await db.query(queryText, [mailResult]);
        return mailData;
    }

    static async findUser(user_id){
        const queryText = "SELECT * FROM users WHERE user_id=$1";
        const queryResult = await db.query(queryText, [parseInt(user_id)]);
        return queryResult; 
    }

    // Admin update user's admin status. 

    static async updateUser(user_id, input) {
        const {
            rows
        } = await this.findUser(user_id);
        const is_mentor = input.is_mentor;
        const queryText = "UPDATE users SET is_mentor=$1 WHERE user_id=$2 RETURNING*";
        const queryResult = await db.query(queryText, [is_mentor, rows[0].user_id]);
        return queryResult;
    }

}


export default UserModel;