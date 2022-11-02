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
    let response = await axios.post('http://localhost:3000/user/login', newUSer)
    localStorage.setItem('userToken',response.data.token);
    window.location.replace('http://127.0.0.1:5500/ExpenseTracker/Public/expense.html');
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