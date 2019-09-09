import UserModel from '../models/userModel';
import tokenMan from '../helpers/tokenMan';
import {
    signUpFields,
    loginFields
} from '../helpers/userValidator';
import hasher from '../helpers/password';
import decryptor from '../helpers/password';
import lodash from 'lodash'; 
import ResponseHandler from '../utils/responseHandler'; 


class User{

    static async userSignUp(req, res){
        const {
            error
        } = signUpFields(req.body);

        if (error) return res
        .status(400)
        .json(new ResponseHandler(404, error.details[0].message, null).result());


        try {

            const oneMail = await UserModel.findMail(req.body.email);

            if(oneMail.rows.length !== 0) 
            return res
            .status(409)
            .json(new ResponseHandler(409, 'Sorry! Email already taken.', null).result()); 

            const {
                rows
            } = await UserModel.create(req.body);

            
            const token = tokenMan.tokenizer({
                user_id: rows[0].user_id,
                is_mentor: rows[0].is_mentor,
                is_admin: rows[0].is_admin
            });
                      
            const returnedResponse = {
                token: token, 
                ...lodash.omit(rows[0], ['password'])
            }
            
            return res
            .status(201)
            .json(new ResponseHandler(201, 'User created successfully.', returnedResponse, null).result());

        } catch (err) {
            return res
            .status(500)
            .json(new ResponseHandler(500, err.message, null).result());
        }
    }  

    static async userSignIn(req, res) {

        const {
            error
        } = loginFields(req.body);

        if (error) return res 
        .status(400)
        .json(new ResponseHandler(404, error.details[0].message, null).result());

        try {
            
            const {
                email,
                password
            } = req.body;

            // Check if email exists.
            const {
                rows
            } = await UserModel.findMail(email);


                if (rows.length === 0) {
                    return res
                    .status(404) 
                    .json(new ResponseHandler(404, `User with email ${email} is not found!`, null).result());
                };

                const matcher = await decryptor.isSame(password, rows[0].password);

                if (!matcher) {
                    return res
                    .status(401) 
                    .json(new ResponseHandler(401, 'Invalid Password', null).result());
                }

                const token = await tokenMan.tokenizer({
                    user_id: rows[0].user_id,
                    email: rows[0].email,
                    first_name: rows[0].first_name, 
                    last_name: rows[0].last_name,
                    is_mentor: rows[0].is_mentor,
                    is_admin: rows[0].is_admin, 
                });

                const returnedResponse = {
                    token: token, 
                    ...lodash.omit(rows[0], ['password'])
                }
                return res
                .header('Authorization', `Bearer ${token}`)
                .status(200)
                .json(new ResponseHandler(200, 'Successfully Signed In.', returnedResponse, null).result())

        } catch (err) {
            return res
            .status(500)
            .json(new ResponseHandler(500, err.message, null).result())
        }
    }

    static async updateUser(req, res){

        const {
            user_id
        } = req.params;


        const uniqueUser = await UserModel.findUser(user_id);

        if (uniqueUser.rows.length === 0) {
            
            return res
            .status(404)
            .json(new ResponseHandler(404, `User number ${user_id} not found!`, null).result());
        }
        try{

            const {
                rows
            } = await UserModel.updateUser(user_id, req.body);

            return res
            .status(200)
            .json(new ResponseHandler(200, `User number ${user_id} successfully updated.`, lodash.omit(rows[0], ['password'])).result())

        }catch(err){
            return res
            .status(500)
            .json(new ResponseHandler(500, err.message, null).result())
        }
        
    }
}

export default User; 