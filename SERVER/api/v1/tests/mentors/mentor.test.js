import chai, {
  expect, 
  assert
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../server';
import dummyMentor from '../dummyData/dummyMentor';
import tokenMan from '../../helpers/tokenMan';
import {getAll} from '../../controllers/mentorCtrl';

const {
  validMentorOne,
  validMentorTwo,
  validLogin,
  tokenizedMentee
} = dummyMentor;

const userToken = tokenMan.tokenizer(validLogin); 
const menteeToken = tokenMan.tokenizer(tokenizedMentee); 

chai.use(chaiHttp);

describe('MENTOR TESTING', () => {

  it('Should should throw an error when no token provided', (done)=> {
      chai 
      .request(app)
      .get('/api/v1/mentors') 
      .set('Authorization', '') 
      .end((err, res)=> {
          expect(res.body).to.be.an('object'); 
          expect(res.body.status).to.deep.equal(401); 
          expect(res.body.message).to.deep.equal('Access Denied.')
          done();
      })
  })

  it('Should retrieve all mentors', (done)=> {
      chai 
      .request(app)
      .get('/api/v1/mentors') 
      .set('Authorization', `Bearer ${menteeToken}`) 
      .end((err, res)=> {
          expect(res.body).to.be.an('object'); 
          expect(res.body.status).to.deep.equal(200); 
          expect(res.body.message).to.deep.equal('All Mentors.'); 
          expect(res.body.data).to.be.an('array');
          done();
      })
  })

  it('Should throw a internal server error for invalid signature', (done) => {

      let mentor_id = 2;
      chai
          .request(app)
          .get(`/api/v1/mentors/${mentor_id}`)
          .set('Authorization', `Bearer ${userToken + 'xxx'}`)
          .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(500);
              expect(res.body.message).to.deep.equal('invalid signature');
              done()
          })
  })

  it('Should throw an error unauthorized user', (done) => {

      let mentor_id = 2;
      chai
          .request(app)
          .get(`/api/v1/mentors/${mentor_id}`)
          .set('Authorization', '')
          .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(401);
              expect(res.body.message).to.deep.equal('Access Denied.');
              done()
          })
  })

  it('Should throw an error when no token is provided.', (done) => {

      let mentor_id = 2;
      chai
          .request(app)
          .get(`/api/v1/mentors/${mentor_id}`)
          .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(400);
              expect(res.body.message).to.deep.equal('Sorry, no token provided!');
              done()
          })
  });

  
  it('Should display a list of all mentors', (done) => {
      chai
          .request(app)
          .post('/api/v1/auth/signup')
          .send(validMentorTwo)
          .end((err, res) => {
              chai
                  .request(app)
                  .get('/api/v1/mentors')
                  .set('Authorization', `Bearer ${userToken}`)
                  .end((err, res) => {
                      expect(res.body).to.be.an('object');
                      expect(res.body.data).to.be.an('array');
                      expect(res.body.status).to.be.equal(200);
                      expect(res.body.message).to.deep.equal('All Mentors.');
                      done();
                  })
          })
  });


  it('Should not display list of all mentors', (done) => {
      chai
          .request(app)
          .post('/api/v1/auth/signup')
          .send(validMentorTwo)
          .end((err, res) => {

                  chai
                  .request(app)
                  .get('/api/v1/mentors')
                  .set('Authorization', `Bearer ${userToken + 'xxx'}`)
                  .end((err, res) => {
                    if(err){
                     assert.throws(getAll, err,);
                    } 
                  done();
                  })
  
          })
  })


  it('Should display a single mentor', (done) => {

      let mentor_id = 2;
      chai
          .request(app)
          .get(`/api/v1/mentors/${mentor_id}`)
          .set('Authorization', `Bearer ${userToken}`)
          .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.be.equal(200);
              expect(res.body.message).to.deep.equal('Your mentor.');
              done()
          })

  })

  it('Should  not display a single mentor', (done) => {
      let mentor_id = 1;
      chai
          .request(app)
          .get(`/api/v1/mentors/${mentor_id}`)
          .set('Authorization', `Bearer ${userToken}`)
          .end((err, res) => {
              expect(res.body).to.be.an('object');
              expect(res.body.status).to.deep.equal(404);
              expect(res.body.message).to.deep.equal(`Mentor number ${mentor_id} not found`);
              done()
          })
  })

})