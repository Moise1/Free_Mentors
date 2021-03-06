import Joi from "joi";

const signUpFields = (user) => {
  const schema = Joi.object().keys({
    first_name: Joi.string().regex(/^\S+$/).min(3).max(20)
      .required().error(() =>'first_name  can\'t have empty spaces'),
    last_name: Joi.string().regex(/^\S+$/).min(3).max(20)
      .required().error(() =>'last_name  can\'t have empty spaces'),
    email: Joi.string().email({ minDomainAtoms: 2 }).trim().required().error(() => 'email must be a valid email'),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required().error(() => "password must be at least 8 characters long containing 1 capital letter, 1 small letter, 1 digit and 1 of these special characters(@, $, !, %, *, ?, &) "),
    address: Joi.string().min(3).max(255).required(),
    bio: Joi.string().min(3).max(255).required(),
    occupation: Joi.string().required(),
    expertise: Joi.string().required(),
  })

  return Joi.validate(user, schema);
};


const loginFields = (userFinder) => {
  const schema = Joi.object().keys({
    email: Joi.string().regex(/^\S+$/).email().required(),
    password: Joi.string().required(),

  });


  return Joi.validate(userFinder, schema);
};

export { signUpFields, loginFields };
