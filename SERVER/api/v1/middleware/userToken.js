import jwt from "jsonwebtoken";
import devKeys from "../config/config";
import ResponseHandler from '../utils/responseHandler';


const tokenExists = (req, res, next) => {
    if (req.headers.authorization === undefined) {
        return res
        .status(400)
        .json(new ResponseHandler(400, "Sorry, no token provided!", null).result())
    }else {
        next(); 
    }
};

const userAccess = (req, res, next) => {
    
    const token = req.headers.authorization.split(" ")[1];

    try {
        if (!token) {
            return res
            .status(401)
            .json(new ResponseHandler(401, "Access Denied.", null).result())
        }else {
            const decryptedToken = jwt.verify(token, devKeys.SECRET_OR_PUBLIC_KEY);
            req.user = decryptedToken;
            next();
        }
        
    } catch (err) {
        return res
        .status(500)
        .json(new ResponseHandler(500, err.message, null ).result())
    }
};

const mentorAccess = (req, res, next) =>{
    if(req.user.is_mentor === true){
        next()
    }else {
        return res 
        .status(403)
        .json(new ResponseHandler(403, 'Sorry! Only mentor authorized!', null).result())
    }
}
const adminAccess = (req, res, next) => {
    if (req.user.is_admin === true) {
        next();
    } else {
        return res 
        .status(403)
        .json(new ResponseHandler(403, 'Sorry! Only admin authorized!', null).result())
    }
};



export {
    tokenExists,
    userAccess,
    mentorAccess,
    adminAccess
};