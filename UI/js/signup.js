const animatedForm = ()=>{
    const arrows = document.querySelectorAll('.fa-arrow-down'); 

    arrows.forEach(arrow => {
        arrow.addEventListener('click', ()=>{

            const userInput = arrow.previousElementSibling; 
            const parentDiv = arrow.parentElement;
            const nextForm = parentDiv.nextElementSibling;

            // Execute validation 
            if(userInput.type === 'text' && validateInput(userInput)){
                nextField(parentDiv, nextForm);
            }else if(userInput.type === 'email' && validateEmail(userInput)){
                nextField(parentDiv, nextForm);
                
            }else if(userInput.type === 'password' && validateInput(userInput)){
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

const validateInput = (userData) => {
    if(userData.value.length < 6 && userData.value === ''){
        return alert('Something wrong with you info you provided.')
    }else {
        return true;    
    }
}

const validateEmail = (email) =>{
    const validMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(validMail.test(email.value)){
        return true;
    }else{
        return alert('Email seems to be invalid.');
    }
}
const nextField = (parentDiv, nextForm) =>{
    parentDiv.classList.add('inactive'); 
    parentDiv.classList.remove('active'); 
    nextForm.classList.add('active');
}


animatedForm();