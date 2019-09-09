
export default {
  menteeOne: {
    first_name: "kalisa",
    last_name: "kabano",
    email: "kabano@gmail.com",
    password: "kabano123",
    address: "kampala",
    bio: "determined",
    occupation: "student",
    expertise: "none",
  },
  menteeLogin: {
    email: "kabano@gmail.com",
    password: "kabano123",
  },
  tokenizedAdmin: {
    user_id: 1,
    email: "job123",
    first_name: "john",
    last_name: "job",
    is_admin: true,
  },
  tokenizedMentee: {
    user_id: 4,
    first_name: "kalisa",
    last_name: "kabano",
    email: "kalisa@gmail.com",
    is_admin: "false",
    is_mentor: false,
  },
  tokenizedMentor: {
    mentor_id: 2,
    email: "gold@gmail.com",
    first_name: "gold",
    last_name: "mugeni",
    is_admin: "false",
    is_mentor: true,
  },
  validRequest: {
    mentor_id: 2,
    questions: "Would you help me?",
    status: "pending",
  },
  updatedRequestOne: {
    mentor_id: 2,
    questions: "Would you help me?",
    status: "accepted",
  },
  updatedRequestTwo: {
    mentor_id: 2,
    questions: "Would you help me?",
    status: "rejected",
  },
  validReview: {
    score: 4,
    remark: "I like that!",
  },
};
