// let form = document.getElementById('signupForm');
// let fname = document.getElementById('name');
// let email = document.getElementById('email');
// let password = document.getElementById('password');
// let msgContainer = document.getElementById('message');

// class user {
//     constructor(name, email, password) {
//         this.name = name;
//         this.email = email;
//         this.password = password;
//     }
// }

// form.addEventListener('submit', async (e)=>{
//     e.preventDefault();
//     let message;
//     try{
//     let newUSer = new user(fname.value, email.value, password.value);
//     await axios.post('http://44.212.63.93:3000/user/signup', newUSer)
//         message = 'User Created Successfully'
//     }
//     catch(err){
//         message = err.response.data.message;   
//     }
//     msgContainer.innerText = message;
//     setTimeout(()=>{
//         msgContainer.innerText = '';    
//     },4000);
//     form.reset();
// })

