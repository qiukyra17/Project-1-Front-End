//ELEMENTS
const username = document.getElementById('userName');
const password = document.getElementById('password');
const login = document.getElementById('submitLogin');

//EVENT LISTENER 
login.addEventListener('click',apiLogin)

//FETCH
async function apiLogin(){
    
    let userInput = {
        userName: username.value,
        userPassword: password.value
    };
    
    let response = await fetch ('http://localhost:7000/users/',{
        method:'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(userInput)
    });

    if(response.status == 202){
        window.location.href = "file:///C:/Users/kywahhhhhhh/IdeaProjects/Project%2001%20-%20Front%20End/DeadbirdWarrantyApp/02-Admin/Main/adminMain.html"
    } else {
        document.getElementById('error').innerText = "Please Insert Valid Email + Password";
    }

    console.log(userInput)
    console.log(response.status)
}     

