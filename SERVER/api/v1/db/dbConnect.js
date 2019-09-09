import pool from "./index";

pool.on("connect", () => {
    console.log('DB Connected...');
});

const tables = `
            CREATE TABLE IF NOT EXISTS users(
             user_id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY, 
             first_name  VARCHAR(50) NOT NULL, 
             last_name  VARCHAR(50) NOT NULL, 
             email TEXT NOT NULL, 
             address VARCHAR(50) NOT NULL, 
             password VARCHAR(250) NOT NULL, 
             bio VARCHAR(250), 
             occupation VARCHAR(50), 
             expertise VARCHAR(50), 
             is_mentor BOOL, 
             is_admin BOOL NOT NULL);
             
            CREATE TABLE IF NOT EXISTS mentors AS SELECT users.user_id AS mentor_id, 
            first_name, last_name, email, address, password, bio, occupation, expertise,
            is_mentor, is_admin FROM users;
            
            ALTER TABLE mentors ADD UNIQUE(mentor_id);

       CREATE TABLE IF NOT EXISTS sessions(
        session_id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY, 
        mentor_id INTEGER REFERENCES mentors(mentor_id) NOT NULL, 
        mentee_id INTEGER,
        mentee_email TEXT,
        questions VARCHAR(250) NOT NULL,
        status VARCHAR(50) NOT NULL);
        
        CREATE TABLE IF NOT EXISTS reviews(
            review_id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY, 
            session_id INTEGER REFERENCES sessions(session_id) NOT NULL, 
            mentee_id INTEGER,
            mentee_full_name VARCHAR(250),
            mentor_id INTEGER,
            score NUMERIC NOT NULL,
            remark VARCHAR(250) NOT NULL);`;

pool.query(tables)
    .then((res) => {

    })
    .catch((err) => {
        console.log(err);
    });

module.exports = pool; 