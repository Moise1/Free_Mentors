import users from '../models/userModel';
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


        const userId = users.length + 1;
        const is_admin = false;
        const {
            first_name,
            last_name,
            email,
            password,
            address,
            bio, 
            occupation, 
            expertise
        } = req.body

        const hashed_password = await hasher.hashingPassword(password, 10);

        try {

            const newUser = {
                token: tokenMan.tokenizer({
                    userId,
                    is_admin,
                }),
                userId: userId,
                first_name: first_name,
                last_name: last_name,
                email: email.toLowerCase(),
                password: hashed_password,
                address: address,
                bio: bio, 
                occupation: occupation, 
                expertise: expertise,
                is_admin: is_admin, 
                is_mentor: occupation  ===  'N/A' ||  expertise  ===  'N/A' ? false : true
            }
            
            // Check whether the email is already taken. 
    
            if(users.some(us => us.email === email)) 
            return res
            .status(409)
            .json(new ResponseHandler(409, 'Sorry! Email already taken.', null).result()); 

            users.push(newUser);
            
            Promise.all(users).then(values => {
                return res 
                .status(201) 
                .json(new ResponseHandler(201, 'User created successfully.', lodash.omit(values[values.length -1], ['password']), null).result());
            });

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


            Promise.all(users).then( async values => {

                const userFinder = await values.find(user => user.email === email); 
                
                if (!userFinder) {
                    return res
                    .status(404) 
                    .json(new ResponseHandler(404, `User with email ${email} is not found!`, null).result());
                };

                const matched = await decryptor.isSame(password, userFinder.password);
                if (!matched) {
                    return res
                    .status(401) 
                    .json(new ResponseHandler(401, 'Invalid Password', null).result());
                }

                const token = await tokenMan.tokenizer({
                    userId: userFinder.userId,
                    email: userFinder.email,
                    first_name: userFinder.first_name, 
                    last_name: userFinder.last_name,
                    is_admin: userFinder.is_admin, 
                    is_mentor: userFinder.is_mentor
                });
                return res
                .header('Authorization', `Bearer ${token}`)
                .status(200)
                .json(new ResponseHandler(200, 'Successfully Signed In.', lodash.omit(userFinder, ['password'])).result())
            });

        } catch (err) {
            return res
            .status(500)
            .json(new ResponseHandler(500, err.message, null).result())
        }
    }

    static async updateUser(req, res){

        const findUser = users.find(user => user.userId === parseInt(req.params.userId));
        try{
                if(!findUser) return res
                .status(404)
                .json(new ResponseHandler(404, `User number ${req.params.userId} not found!`, null).result()); 
                
                findUser.is_mentor = Boolean(req.body);  
                return res
                .status(200)
                .json(new ResponseHandler(200, `User number ${req.params.userId} successfully updated.`, lodash.omit(findUser, ['password'])).result())

        }catch(err){
            return res
            .status(500)
            .json(new ResponseHandler(500, err.message, null).result())
        }
        
    }
}

export default User; 