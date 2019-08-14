import hasher from '../helpers/password';
import tokenMan from '../helpers/tokenMan';



const adminPassword = async()=>{
    const hash = await hasher.hashingPassword('job123', 10); 
    return hash;
}
let id = 1 ; 
let is_admin = true;
let email = 'job@freementors.com';
let token = tokenMan.tokenizer({id ,is_admin}); 

let admin = adminPassword().then(pwd =>{
        return {
            token: token,
            id: id, 
            first_name: 'john', 
            last_name: 'job', 
            email: email,
            address: 'Kigali',
            password: pwd, 
            is_admin: is_admin,
        }
    }).then(res =>{
        return res;
    }).catch(err =>{
        throw err.message;
    });
    
export default [admin];