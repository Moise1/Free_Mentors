import db from "./dbIndex";
import hasher from "../helpers/password";

        
hasher.hashingPassword("job123", 10).then( async admin_password =>{
        const adminValues = ["john", "job", "job@freementors.com", "kigali", admin_password, true];
        const admin =
            `
            INSERT INTO users(
                first_name, 
                last_name, 
                email, 
                address,
                password,  
                is_admin
            )VALUES($1, $2, $3, $4, $5, $6)`;
         await db.query(admin, adminValues);
});
        

