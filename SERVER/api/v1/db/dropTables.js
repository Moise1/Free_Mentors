import pool from "./index";

pool.on("connect", () => {
    console.log('Tables dropped!')
  });

        const removeTables = 
        "DROP TABLE IF EXISTS users, mentors, sessions, reviews CASCADE;";

         pool.query(removeTables)
         .then((res) => {

         })
         .catch((err) => {
             console.log(err);
         });


export default pool;