import Joi from "joi";

const sessionFields = (session) => {
  const schema = {
    questions: Joi.string().required(),
    status: Joi.string().regex(/^\S+$/).valid(["pending"]),
    mentorId: Joi.number().required(),

  };

  const options = {
    language: {
      key: "{{key}} ",
      string: {
        regex: {
          base: "must not have empty spaces",
        },
      },
    },
  };

  return Joi.validate(session, schema, options);
};

export default sessionFields;
