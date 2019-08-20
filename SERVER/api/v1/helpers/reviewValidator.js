import Joi from "joi"; 

const reviewFields = (review) => {
    
    const schema = {
        score: Joi.number().required(),
        remark: Joi.string().required(),
        
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

    return Joi.validate(review, schema, options);
};

export default reviewFields;