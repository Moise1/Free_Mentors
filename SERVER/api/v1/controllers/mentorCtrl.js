import mentors from '../models/mentorModel';
import users from '../models/userModel';
import ResponseHandler from '../utils/responseHandler';
import renamer from '../utils/renamer';

class Mentor {

    static async allMentors(req, res) {

        try {

            users.forEach(async user => {
                if (user.is_mentor === true) {
                    return mentors.push(user);
                }
            })

            const uniqueMentors = Array.from(new Set(mentors.map(m => m.id)))
                .map(id => {
                    return new Promise((resolve, reject) => {
                        const currMentor = mentors.find(m => m.id === id);
                        const modMentor = renamer(currMentor, {
                            "id": "mentorId"
                        });
                        return resolve(modMentor);
                    })
                })

            Promise.all(uniqueMentors).then(output => {
                output.forEach(async obj => {
                    await delete obj['password'];
                })

                return res
                .status(200)
                .json(new ResponseHandler(200, 'All Mentors', output, null).result());
                
            }).catch(err => {
                console.log(err)
            })

        }catch (err) {
            return res
                .status(500)
                .json(new ResponseHandler(500, err.message, null).result());

        }

    };

    static async singleMentor(req, res) {

        const modUsers = await users.map(u => {
            const alteredUser = renamer(u, {"id": "mentorId"});
            return alteredUser;
        })

        const theMentor = await  modUsers.find(m => m.mentorId === parseInt(req.params.mentorId));
        try {

            if(!theMentor || theMentor === undefined) {
                return res
                .status(404)
                .json(new ResponseHandler(404, `Mentor number ${req.params.mentorId} not found`, null).result());
    
            }else if(theMentor.is_mentor !== true){
                return res
                .status(404)
                .json(new ResponseHandler(404, `User number ${req.params.mentorId} is not a mentor`, null).result());
            }else {
                delete theMentor['password'];
                return res
                .status(200)
                .json(new ResponseHandler(200, 'Your mentor', theMentor, null).result());
            }

        } catch (err) {
            return res
                .status(500)
                .json(new ResponseHandler(500, err.message, null).result())
        }
    }

}


export default Mentor;