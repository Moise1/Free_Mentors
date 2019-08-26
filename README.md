[![Build Status](https://travis-ci.com/Moise1/Free_Mentors.svg?branch=develop)](https://travis-ci.com/Moise1/Free_Mentors)
[![Coverage Status](https://coveralls.io/repos/github/Moise1/Free_Mentors/badge.svg?branch=develop)](https://coveralls.io/github/Moise1/Free_Mentors?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/893a95dda32b58970185/maintainability)](https://codeclimate.com/github/Moise1/Free_Mentors/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/893a95dda32b58970185/test_coverage)](https://codeclimate.com/github/Moise1/Free_Mentors/test_coverage)

# Free_Mentors 

[Free Mentors](https://moise1.github.io/Free_Mentors/UI/) is a social initiative where accomplished professionals become role models to
young people to provide free mentorship sessions.

###  Required features for user: 

* User(mentor or mentee)  can sign up .<br/>
* User(mentor or mentee) can sign in.<br/>
* User(mentee) can view all mentors.<br/>
* User(mentee) can view a specific mentor<br/>
* User(mentee) can create a mentorship session request with a mentor.<br/>


###  Required features for a mentor: 
* Mentor can accept a mentorship session request.
* Mentor can decline a mentorship session request.

###  Required features for an admin: 

* Admin can change a user to a mentor 


### Prerequisites 
You must have the following tools installed in order to run this project: <br/>

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git): A distributed version control tool 
* [NodeJS](https://nodejs.org/en/): A  JavaScript runtime environment<br/>
* [Express](https://expressjs.com/): A web application framework for NodeJS <br/>
* [ESLint](https://eslint.org/): A JavaScript linting library <br/>
* [Airbnb](https://github.com/airbnb/javascript): A populr style guide<br/>
* [Mocha](https://mochajs.org/) or [Jasmine](https://jasmine.github.io/): Testing frameworks

### A glance at API-endpoints 

#### User authentication endpoints.


| HTTP Verb     | Endpoint      | Role | Authorized Entity  |
| ------------- | ------------- | ------ |          ----------- |
| POST  | /api/v1/auth/signup  |    User sign up             | User
| POST  | /api/v1/auth/signin  |  User login             | User


#### Mentee's  activities endpoints

| HTTP Verb     | Endpoint      | Role | Authorized Entity  |
| ------------- | ------------- | ------ |          ----------- |
| GET  | /api/v1/mentors  |    Get a list of all mentors            | User(mentee)
| GET  | /api/v1/mentors/mentorId  |  mentee get a specific mentor          | User(mentee)
| POST  | /api/v1/sessions  |  mentee request a mentorship session           | User(mentee)
| POST  | /api/v1/sessions/:sessionId/review  |  mentee review mentor           | User(mentee)




### Mentor's  activities endpoints.


| HTTP Verb     | Endpoint      | Role | Authorized Entity  |
| ------------- | ------------- | ------ |          ----------- |
| PATCH | /api/v1/sessions/:sessionId/accept  |    Accept a mentorship request session             | User(mentor)
| PATCH | /api/v1/sessions/:sessionId/reject | Reject a mentorship request session            | User(mentor)



#### Admin's  activities endpoints 

| HTTP Verb     | Endpoint      | Role | Authorized Entity  |
| ------------- | ------------- | ------ |          ----------- |
| PATCH  | /api/v1/users/:userId |  Admin update user's mentor's status         | Admin
| DELETE  | /api/v1/sessions/:sessionId/review |  Admin delete a mentorship session          | Admin


To get the code in this repo and customize it to suit your needs, do the following:<br/> 

```
git clone https://github.com/Moise1/Free_Mentors.git
cd AutoMart
npm install

```
### Important scripts 

Start developer server 

`npm start`

Run tests 

`npm test`


### Author 

[Moise1](https://github.com/Moise1)
