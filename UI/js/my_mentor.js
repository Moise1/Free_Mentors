const selectedMentor = document.querySelector('.selected-mentor'); 
const reachOne = document.getElementById('reachOne');
const laptopScreen = window.matchMedia('(min-width: 1224px)');
const mobileScreen = window.matchMedia('(min-width: 300px)');



window.addEventListener('load', ()=>{
    if(laptopScreen.matches){
        selectedMentor.style.marginLeft = '50%';
        selectedMentor.innerHTML = `
        <div style=>
            <img 
            src="https://res.cloudinary.com/mo1/image/upload/v1564584621/kobe_lq48jt.jpg"
            style="
            border-radius: 10px;
            height: 310px;
            margin-bottom: 10%;

            />
            <ul style="list-style-type:none;">

            <li><strong>Name: </strong> Kobe Bryant</li><br>
            <li><strong>Bio: </strong> A 44-year old husband and father of 2.</li><br>
            <li><strong>Occupation: </strong> Retired professional basketball player</li><br>
            <li><strong>Expertise: </strong> 20 Teen training</li><br>
                <button style="
                background: #000;
                padding: 10px;
                margin-bottom: 20px;
                color: #fff;
                border: 1px solid #000;
                border-radius: 2px;
                cursor: pointer;
            "
            onclick="document.getElementById('form').style.display='block'"
            >Send Request</button>
            </ul>
        </div>`
        }else if(mobileScreen.matches){
            selectedMentor.style.marginLeft = '-10%'; 

        selectedMentor.innerHTML = `
        <div>
            <img 
            src="https://res.cloudinary.com/mo1/image/upload/v1564584621/kobe_lq48jt.jpg"
            style="
            border-radius: 10px;
            height: 200px;
            width: 95%;
            margin-bottom: 10%;

            />
            <ul style="list-style-type: none; left: 80%">
            <li><strong>Name: </strong> Kobe Bryant</li><br>
            <li><strong>Bio: </strong> A 44-year old husband and father of 2.</li><br>
            <li><strong>Occupation: </strong> Retired professional basketball player</li><br>
            <li><strong>Expertise: </strong> 20 years</li><br>
                <button id="requestBtn" style="
                background: #000;
                padding: 10px;
                margin-bottom: 20px;
                color: #fff;
                border: 1px solid #000;
                border-radius: 2px;
                cursor: pointer;
            ">Send Request</button>
            </ul>
        </div>`
        }
});


const form = document.getElementById('form');
const closebtn = document.getElementById('closebtn').addEventListener('click', ()=>{
    form.style.display = "none";
})

window.onclick = (e) =>{
    if (e.target == form) {
      form.style.display = "none";
    }
  }