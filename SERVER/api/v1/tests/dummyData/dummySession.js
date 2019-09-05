
export default {
  menteeOne: {
    first_name: "kalisa",
    last_name: "kabano",
    email: "kabano@gmail.com",
    password: "kabano123",
    address: "kampala",
    bio: "determined",
    occupation: "student",
    expertise: "N/A",
  },
  menteeLogin: {
    email: "kabano@gmail.com",
    password: "kabano123",
  },
  tokenizedAdmin: {
    userId: 1,
    email: "job123",
    first_name: "john",
    last_name: "job",
    is_admin: true,
  },
  tokenizedMentee: {
    userId: 4,
    first_name: "kalisa",
    last_name: "kabano",
    is_admin: "false",
    is_mentor: false,
  },
  tokenizedMentor: {
    mentorId: 2,
    email: "gold@gmail.com",
    first_name: "gold",
    first_name: "mugeni",
    is_admin: "false",
    is_mentor: true,
  },
  validRequest: {
    mentorId: 2,
    questions: "Would you help me?",
    status: "pending",
  },
  updatedRequestOne: {
    mentorId: 2,
    questions: "Would you help me?",
    status: "accepted",
  },
  updatedRequestTwo: {
    mentorId: 2,
    questions: "Would you help me?",
    status: "rejected",
  },
  validReview: {
    score: 4,
    remark: "I like that!",
  },
};
