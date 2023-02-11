let form = document.getElementById('signupForm');
let fname = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let password = document.getElementById('password');
let msgContainer = document.getElementById('message');

class user {
    constructor(name, email,phone, password) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }
}

form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    let message;
    try{
    let newUSer = new user(fname.value, email.value,phone.value, password.value);
    await axios.post('http://ec2-44-203-27-62.compute-1.amazonaws.com:3000/user/signup', newUSer)
        message = 'User Created Successfully'
    }
    catch(err){
        message = err.response.data.message;   
    }
    msgContainer.innerText = message;
    setTimeout(()=>{
        msgContainer.innerText = 'http://ec2-44-203-27-62.compute-1.amazonaws.com:3000/public/reset.html';    
    },4000);
    form.reset();
})

