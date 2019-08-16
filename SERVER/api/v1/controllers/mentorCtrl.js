import mentors from '../models/mentorModel'; 
import users from '../models/userModel'; 
import ResponseHandler from '../utils/responseHandler';


class Mentor{


    static async allMentors(req, res) {

        try{

            users.forEach(user => {
                if(user.is_mentor === true) {
                    mentors.push(user);  
                }  
            })
    
            const uniqueMentors = Array.from(new Set(mentors.map(m => m.id))) 
            .map(id => {
                return mentors.find(m => m.id === id)
            })
    
            return res 
            .status(200) 
            .json(new ResponseHandler(200, 'All Mentors', uniqueMentors, null).result());
            
        }catch(err){
            return res
            .status(500) 
            .json(new ResponseHandler(500, err.messae, null).result());

        }
       
    }
}


export default Mentor; 