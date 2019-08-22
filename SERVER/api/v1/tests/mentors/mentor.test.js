import chai, {
    expect
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../server';
import dummyMentor from '../dummyData/dummyMentor';
import tokenMan from '../../helpers/tokenMan';

const {
    validMentorOne,
    validMentorTwo,
    validLogin
} = dummyMentor;

const userToken = tokenMan.tokenizer(validLogin)

chai.use(chaiHttp);

describe('MENTOR TESTING', () => {

    it('Should throw a internal server error for invalid signature', (done) => {

        let mentorId = 2;
        chai
            .request(app)
            .get(`/api/v1/mentors/${mentorId}`)
            .set('Authorization', `Bearer ${userToken + 'xxx'}`)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.deep.equal(500);
                expect(res.body.message).to.deep.equal('invalid signature');
                done()
            })
    })

    it('Should throw an error unauthorized user', (done) => {

        let mentorId = 2;
        chai
            .request(app)
            .get(`/api/v1/mentors/${mentorId}`)
            .set('Authorization', '')
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.deep.equal(401);
                expect(res.body.message).to.deep.equal('Access Denied.');
                done()
            })
    })

    it('Should throw an error when no token is provided.', (done) => {

        let mentorId = 2;
        chai
            .request(app)
            .get(`/api/v1/mentors/${mentorId}`)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.deep.equal(400);
                expect(res.body.message).to.deep.equal('Sorry, no token provided!');
                done()
            })
    })
    
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
                        expect(res.body.message).to.deep.equal('All Mentors');
                    })
                done()
            })
    })
    it('Should display a single mentor', (done) => {

        let mentorId = 2;
        chai
            .request(app)
            .get(`/api/v1/mentors/${mentorId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.be.equal(200);
                expect(res.body.message).to.deep.equal('Your mentor.')
                done()
            })

    })

    it('Should  not display a single mentor', (done) => {
        let mentorId = 1;
        chai
            .request(app)
            .get(`/api/v1/mentors/${mentorId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.deep.equal(404);
                expect(res.body.message).to.deep.equal(`Mentor number ${mentorId} not found`);
                done()
            })
    })

})