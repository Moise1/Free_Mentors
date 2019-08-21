export default {
    validSignUp: {
        first_name: 'gold', 
        last_name: 'mugeni', 
        email: 'gold@gmail.com', 
        password: 'gold123',
        address: 'kigali',
        bio: 'multitasker', 
        occupation: 'medical doctor', 
        expertise: '4 years', 

    }, 
    invalidSignUp: {
        first_name: 'gold', 
        last_name: 'mugeni', 
        email: 'gold@gmail', 
        password: 'gold123',
        address: 'kigali',
    }, 
    validLogin: {
        email: 'gold@gmail.com', 
        password: 'gold123'
    }, 
    invalidLogin: {
        email: 'gold@gmail.com', 
        password:'mane123'
    }, 
    anotherUser: {
        first_name: 'jane', 
        last_name: 'kale', 
        email: 'jane@gmail.com', 
        password: 'ma12345',
        address: 'kigali',
        bio: 'hardworker', 
        occupation: 'student', 
        expertise: 'N/A', 
        is_admin: 'false',
        is_mentor: 'false'
    },

    updatedUser: {
        first_name: 'jane', 
        last_name: 'kale', 
        email: 'jane@gmail.com', 
        password: 'ma12345',
        address: 'kigali',
        bio: 'hardworker', 
        occupation: 'student', 
        expertise: 'N/A', 
        is_admin: 'false',
        is_mentor: 'true'
        
    }, 

    tokenizedAdmin: {
        userId: 1, 
        email: 'john@gmail.com', 
        firt_name: 'job', 
        last_name: 'john',
        is_admin: true
    }
}