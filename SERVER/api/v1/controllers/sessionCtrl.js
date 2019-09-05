import sessions from "../models/sessionModel";
import users from "../models/userModel";
import ResponseHandler from "../utils/responseHandler";
import sessionFields from "../helpers/sessionValidator";
import reviewFields from "../helpers/reviewValidator";
import renamer from "../utils/renamer";
import reviews from "../models/reviewModel";

class MentorshipSession {
  static async createSession(req, res) {
    const {
      error,
    } = sessionFields(req.body);

    if (error) {
      return res
        .status(400)
        .json(new ResponseHandler(404, error.details[0].message, null).result());
    }

    try {
      const mentee = req.user;

      Promise.all(users).then(async (values) => {
        const modValues = values.map((v) => {
          const alteredValue = renamer(v, {
            userId: "mentorId",
          });
          return alteredValue;
        });

        const mentor = modValues.find((v) => v.mentorId === parseInt(req.body.mentorId));

        if (!mentor || mentor.is_mentor === false) {
          return res
            .status(404)
            .json(new ResponseHandler(404, `Mentor number ${req.body.mentorId} not found`, null).result());
        }

        const newSession = {
          sessionId: sessions.length + 1,
          mentorId: mentor.mentorId,
          menteeId: mentee.id,
          questions: req.body.questions,
          menteeEmail: mentee.email,
          status: "pending",
        };

        // Check whether the question has already been asked.
        if (sessions.some((sess) => sess.questions === req.body.questions)) {
          return res
            .status(409)
            .json(new ResponseHandler(409, "Sorry! You cannot ask this question more than once.", null).result());
        }
        sessions.push(newSession);
        return res
          .status(201)
          .json(new ResponseHandler(201, "Mentorship session successfully created!", sessions[sessions.length - 1], null).result());
      });
    } catch (err) {
      return res
        .status(500)
        .json(new ResponseHandler(500, err.message, null).result());
    }
  }

  static async updateSession(req, res) {
    try {
      const theSession = sessions.find((s) => s.sessionId === parseInt(req.params.sessionId));

      if (!theSession) {
        return res
          .status(404)
          .json(new ResponseHandler(404, `Mentorship sesssion number ${req.params.sessionId} not found`, null).result());
      }

      switch (theSession.status) {
        case "rejected":
          res
            .status(409)
            .json(new ResponseHandler(409, "Sorry! This request has already been rejected.", null).result());
          break;
        case "accepted":
          res
            .status(409)
            .json(new ResponseHandler(409, "Sorry! This request has already been accepted.", null).result());
          break;
        default:
          theSession.status = req.body.status;
          return res
            .status(200)
            .json(new ResponseHandler(200, "Mentorship session request successfully updated.", theSession, null).result());
      }


    } catch (err) {
      return res
        .status(500)
        .json(new ResponseHandler(500, err.message, null).result());
    }
  }


  static async reviewMentor(req, res) {
    const {
      error,
    } = reviewFields(req.body);

    if (error) {
      return res
        .status(400)
        .json(new ResponseHandler(400, error.details[0].message, null).result());
    }

    const {
      score,
      remark
    } = req.body;
    const mentee = req.user;

    const theSession = sessions.find((s) => s.sessionId === parseInt(req.params.sessionId));

    if (!theSession) {
      return res
        .status(404)
        .json(new ResponseHandler(404, `Sorry, sesssion number ${req.params.sessionId} not found`, null).result());
    }
    try {


      const newReview = {
        sessionId: theSession.sessionId,
        mentorId: theSession.mentorId,
        menteeId: theSession.menteeId,
        score,
        menteeFullName: `${mentee.first_name}  ${mentee.last_name}`,
        remark
      };

      if(reviews.some(rev => rev.menteeFullName === newReview.menteeFullName)){
        return res
        .status(409)
        .json(new ResponseHandler(409, "Sorry! You cannot review the same session more than once.", null).result());
      }else{
        reviews.push(newReview);
         return res
        .status(201)
        .json(new ResponseHandler(201, "Thanks for your review.", reviews[reviews.length - 1], null).result());

      }
    
      
    } catch (err) {
      return res
        .status(500)
        .json(new ResponseHandler(500, err.message, null).result());
    }
  }

  static async deleteReview(req, res) {
    const theReview = reviews.find((r) => r.sessionId === parseInt(req.params.sessionId));

    if (!theReview) {
      return res
        .status(404)
        .json(new ResponseHandler(404, `Sorry, sesssion review number ${req.params.sessionId} not found`, null).result());
    }
    try {
      const index = reviews.indexOf(theReview);
      reviews.splice(index, 1);
      return res
        .status(200)
        .json(new ResponseHandler(200, `Session review number  ${req.params.sessionId} successfully deleted!`, null).result());
    } catch (err) {
      return res
        .status(500)
        .json(new ResponseHandler(500, err.message, null).result());
    }
  }
}


export default MentorshipSession;
