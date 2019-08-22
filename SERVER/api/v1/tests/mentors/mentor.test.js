import chai, {
    expect
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../server';
import dummyAuth from '../dummyData/dummyMentor';
import tokenMan from '../../helpers/tokenMan';

const {
    validMentorOne,
    validMentorTwo,
    validLogin
} = dummyAuth;
const userToken = tokenMan.tokenizer(validLogin)

chai.use(chaiHttp);

describe('MENTOR TESTING', () => {

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
                    .end((err, res)=> {
                        expect(res.body).to.be.an('object'); 
                        expect(res.body.data).to.be.an('array'); 
                        expect(res.body.status).to.be.equal(200); 
                        expect(res.body.message).to.deep.equal('All Mentors');
                    })
                    done()
                })
        })
})