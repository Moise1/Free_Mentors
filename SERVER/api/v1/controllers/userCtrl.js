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
        .json(new ResponseHandler(404, null, error.details[0].message).result());


        const id = users.length + 1;
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
                    id,
                    is_admin,
                }),
                id: id,
                first_name: first_name,
                last_name: last_name,
                email: email.toLowerCase(),
                password: hashed_password,
                address: address,
                bio: bio, 
                occupation: occupation, 
                expertise: expertise,
                is_admin: is_admin,
            }
            
            // Check whether the email is already taken. 
    
            if(users.some(us => us.email === email)) return res.status(409).json({
                status: 409, 
                error: 'Sorry! Email already taken.'
            }) 
            users.push(newUser);

            Promise.all(users).then(async values => {
                console.log(values);
                return res 
                .status(201) 
                .json(new ResponseHandler(201, lodash.omit(values[values-1], 'User created successfully')).result());
                // return res.status(201).json({
                //     status: 201,
                //     message: 'Successfully Signed Up!',
                //     data: lodash.omit(values[values.length -1], ['password'])
                // })
            });

        } catch (err) {
            return res
            .status(500)
            .json(new ResponseHandler(500, err, null, err.message).result());
        }
    }
}

export default User; 