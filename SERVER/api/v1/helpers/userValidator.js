import Joi from "joi"; 

const signUpFields = (user) => {
    
    const schema = {
        first_name: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        last_name: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).trim().required(),
        password: Joi.string().regex(/^\S+$/).min(3).max(255).required(), 
        address: Joi.string().min(3).max(255).required(), 
        bio: Joi.string().min(3).max(255).required(), 
        occupation: Joi.string().required(), 
        expertise: Joi.string().required()
    };

    const options = {
        language: {
            key: "{{key}} ",
            string: {
                regex: {
                    base: "must not have empty spaces"
                }
            }
        }
    };

    return Joi.validate(user, schema, options);
};


const loginFields = (userFinder) => {
    const schema = {
        email: Joi.string().regex(/^\S+$/).email().required(),
        password: Joi.string().regex(/^\S+$/).min(3).max(255).required(),

    };

    const options = {
        language: {
            key: "{{key}} ",
            string: {
                regex: {
                    base: "must not have empty spaces"
                }
            }
        }
    };

    return Joi.validate(userFinder, schema, options);
};

export {signUpFields, loginFields};