let form = document.getElementById('loginForm');
let email = document.getElementById('email');
let password = document.getElementById('password');
let msgContainer = document.getElementById('message');

class user {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}


form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    let message;
    try{
    let newUSer = new user('leon', email.value, password.value);
    let response = await axios.post('http://ec2-44-203-27-62.compute-1.amazonaws.com:3000/user/login', newUSer)
    localStorage.setItem('userToken',response.data.token);
    document.location.href = 'http://ec2-44-203-27-62.compute-1.amazonaws.com:3000/index.html';
    }
    catch(err){
        console.log(err);
        message = err.response.data.message;
        msgContainer.innerText = message;   
    }
    setTimeout(()=>{
        msgContainer.innerText = '';    
    },10000);
})

let forgotPassword = document.getElementById('forgot-password');
forgotPassword.addEventListener('click',(e)=>{
    console.log(e.target);
    window.location.replace('http://ec2-44-203-27-62.compute-1.amazonaws.com:3000/public/reset.html');
})