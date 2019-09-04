import Joi from "joi";

const reviewFields = (review) => {
  const schema = {
    score: Joi.number().valid([1, 2, 3, 4, 5]).required(),
    remark: Joi.string().required(),

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

  return Joi.validate(review, schema, options);
};

export default reviewFields;
