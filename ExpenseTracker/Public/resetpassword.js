let form = document.getElementById('resetForm');
let email = document.getElementById('email');

form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    console.log(email.value);
    try{
        let response = await axios.post('http://44.212.63.93:3000/password/forgotpassword', {email:email.value});
        if(response.data.sucess){
        let resetLink = response.data.resetLink;
        form.innerHTML += `<a href="${resetLink}">Reset password</a>`
        }
        else{
            form.innerHTML += `User Not Found`   
        }
        console.log(response);
    }
    catch(err){
        console.log(err);
        console.log(err.message.value);
    }
})