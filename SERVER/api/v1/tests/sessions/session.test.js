import chai, {
  expect
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../server';
import dummySession from '../dummyData/dummySession';
import tokenMan from '../../helpers/tokenMan';

const {
  menteeLogin,
  menteeOne,
  validRequest,
  tokenizedMentee, 
  tokenizedMentor, 
  tokenizedAdmin,
  updatedRequestOne,
  updatedRequestTwo, 
  validReview
} = dummySession

const menteeToken = tokenMan.tokenizer(tokenizedMentee); 
const mentorToken = tokenMan.tokenizer(tokenizedMentor);
const adminToken = tokenMan.tokenizer(tokenizedAdmin);

chai.use(chaiHttp);

describe('MENTORSHIP SESSION TESTING', () => {
  before((done) => {
      chai
          .request(app)
          .post('/api/v1/auth/signup')
          .send(menteeOne) 
          .end((err, res)=> {
              chai 
              .request(app)
              .post('/api/v1/auth/signin')
              .send(menteeLogin)
              .end((err, res)=> {
                  done()
              })
          })
  })

  it('Should create a mentorship session request', (done)=> {
      chai 
      .request(app)
      .post('/api/v1/sessions')
      .set('Authorization', `Bearer ${menteeToken}`)
      .send(validRequest)
      .end((err, res)=> {
          expect(res.body).to.be.an('object'); 
          expect(res.body.status).to.deep.equal(201); 
          expect(res.body.data).to.be.an('array');
          expect(res.body.message).to.deep.equal('Mentorship session successfully created!'); 
          done()
      })
  }) 

  it('Should not  create a mentorship session request', (done)=> {
      chai 
      .request(app)
      .post('/api/v1/sessions')
      .set('Authorization', '')
      .send(validRequest)
      .end((err, res)=> {
          expect(res.body).to.be.an('object'); 
          expect(res.body.status).to.deep.equal(401); 
          expect(res.body.message).to.deep.equal('Access Denied.')
          done()
      })
  })

  it('Should update a mentorship session  status from "pending" to "accepted" ', (done)=> {
      chai 
      .request(app) 
      .post('/api/v1/sessions')
      .send(validRequest) 
      .end((err, res)=> {

          let session_id = 1;
          chai 
          .request(app)
          .patch(`/api/v1/sessions/${session_id}/accept`)
          .set('Authorization', `Bearer ${mentorToken}`)
          .send(updatedRequestOne) 
          .end((err, res)=> {
              expect(res.body).to.be.an('object'); 
              expect(res.body.status).to.deep.equal(200); 
              expect(res.body.message).to.deep.equal('Mentorship session request successfully updated.') 
              expect(res.body.data).to.be.an('object');
              done()
          })
      })
  })
  it('Should update a mentorship session  status from "pending" to "rejected" ', (done)=> {
      chai 
      .request(app) 
      .post('/api/v1/sessions')
      .send(validRequest) 
      .end((err, res)=> {
          let sessionId = 1;
          chai 
          .request(app)
          .patch(`/api/v1/sessions/${sessionId}/reject`)
          .set('Authorization', `Bearer ${mentorToken}`)
          .send(updatedRequestTwo) 
          .end((err, res)=> {
              expect(res.body).to.be.an('object'); 
              expect(res.body.status).to.deep.equal(200); 
              expect(res.body.message).to.deep.equal('Mentorship session request successfully updated.') 
              expect(res.body.data).to.be.an('object');
              done()
          })
      })
  })

  it('Should allow mentee to review a mentor', (done)=> {

      let session_id = 1;
      chai 
      .request(app) 
      .post(`/api/v1/sessions/${session_id}/review`)
      .send(validReview) 
      .set('Authorization', `Bearer ${menteeToken}`)
      .end((err, res)=> {
          expect(res.body).to.be.an('object'); 
          expect(res.body.status).to.deep.equal(201); 
          expect(res.body.message).to.deep.equal('Thanks for your review.'); 
          expect(res.body.data).to.be.an('object');
          done()
      })
  });


  it('Should not allow mentee to review a mentor if there\'s no token' , (done)=> {

      let session_id = 1;
      chai 
      .request(app) 
      .post(`/api/v1/sessions/${session_id}/review`)
      .send(validReview) 
      .set('Authorization', '')
      .end((err, res)=> {
          expect(res.body).to.be.an('object'); 
          expect(res.body.status).to.deep.equal(401); 
          expect(res.body.message).to.deep.equal('Access Denied.');
          done()
      })
  }); 

  it('Should not allow mentee to review a mentor  token is invalid' , (done)=> {

      let session_id = 1;
      chai 
      .request(app) 
      .post(`/api/v1/sessions/${session_id}/review`)
      .send(validReview) 
      .set('Authorization', `Bearer ${menteeToken + 'xxx'}`)
      .end((err, res)=> {
          expect(res.body).to.be.an('object'); 
          expect(res.body.status).to.deep.equal(500); 
          expect(res.body.message).to.deep.equal('invalid signature');
          done()
      })
  })

  it('Should allow admin to delete an inappropriate review', (done)=> {

      let session_id = 1;
      chai 
      .request(app)
      .post(`/api/v1/sessions/${session_id}/review`)
      .send(validReview) 
      .set('Authorization', `Bearer ${menteeToken}`)
      .end((err, res)=> {

          let session_id = 1;
          chai 
          .request(app)
          .delete(`/api/v1/sessions/${session_id}/review`) 
          .set('Authorization', `Bearer ${adminToken}`)
          .end((err, res)=> {
              expect(res.body).to.be.an('object'); 
              expect(res.body.message).to.deep.equal(`Review for session ${session_id} successfully deleted!`)
              done()
          })
      })
  })
  
})
