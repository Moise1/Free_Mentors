const animatedForm = ()=>{
    const arrows = document.querySelectorAll('.fa-arrow-down'); 

    arrows.forEach(arrow => {
        arrow.addEventListener('click', ()=>{

            const userInput = arrow.previousElementSibling; 
            const parentDiv = arrow.parentElement;
            const nextForm = parentDiv.nextElementSibling;

            // Execute validation 
           if(userInput.type === 'email' && validateEmail(userInput)){
                nextField(parentDiv, nextForm);
            }else if(userInput.type === 'password' && validatePassword(userInput)){
                nextField(parentDiv, nextForm);

            }else {
                parentDiv.style.animation = 'shake 0.5s ease';
            }

            // Reset the element after animation 
            parentDiv.addEventListener('animationend', ()=>{
                parentDiv.style.animation = '';
            })
        });
    })

} 

const validatePassword = (userData)=> {
    const laptopScreen = window.matchMedia('(min-width: 1224px)');
    const mobileScreen = window.matchMedia('(min-width: 300px)');
    const wrongInput = document.getElementById('wrongInput');
    if(laptopScreen.matches && userData.value.length < 8 && userData.value === ''){
        wrongInput.innerHTML = 'Password must be 8 characters containing 1 capital letter, 1 digit and 1 special character';
        wrongInput.style = `
            width: 27%;
            padding: 10px 0 10px 0;
            margin-left: 36%;
            color: red;
            font-size: 15px;
            top: 55%;
            border-radius: 6px;
            background: #fff; 
            opacity: 0.9;
            position: absolute;
            text-align: center;`;
        return;
    }else if(mobileScreen.matches && userData.value === ''){
        wrongInput.innerHTML = 'Password must be 8 characters containing 1 capital letter, 1 digit and 1 special character';
        wrongInput.style = `
            width: 70%;
            padding: 10px 0px 10px 0;
            margin-left: 10%;
            color: red;
            font-size: 15px;
            top: 55%;
            border-radius: 6px;
            background: #fff; 
            opacity: 0.9;
            position: absolute;
            text-align: center;`;
        return;

    }else {
        wrongInput.innerHTML = '';
        wrongInput.style.background = 'none';
        return true;
    }
}

const validateEmail = (email) =>{
    const laptopScreen = window.matchMedia('(min-width: 1224px)');
    const mobileScreen = window.matchMedia('(min-width: 300px)');
    const wrongInput = document.getElementById('wrongInput');
    const validMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (validMail.test(email.value)) {
        wrongInput.innerHTML = '';
        wrongInput.style.background = 'none';
        return true;
    } else if(laptopScreen.matches) {
        wrongInput.innerHTML = 'Invalid Email.';
        wrongInput.style = `
            width: 27%;
            padding: 10px 0 10px 0;
            margin-left: 36%;
            color: red;
            font-size: 15px;
            top: 55%;
            border-radius: 6px;
            background: #fff; 
            opacity: 0.9;
            position: absolute;
            text-align: center;`;
        return;
    }else if(mobileScreen.matches) {
        wrongInput.innerHTML = 'Invalid Email.';
        wrongInput.style = `
            width: 70%;
            padding: 10px 0 10px 0;
            margin-left: 10%;
            color: red;
            font-size: 15px;
            top: 55%;
            border-radius: 6px;
            background: #fff; 
            opacity: 0.9;
            position: absolute;
            text-align: center;`;
        return;
    }
}
const nextField = (parentDiv, nextForm) =>{
    parentDiv.classList.add('inactive'); 
    parentDiv.classList.remove('active'); 
    nextForm.classList.add('active');
}

animatedForm();

formValidator = () => {
    window.location.assign('./admin_board.html');
}
