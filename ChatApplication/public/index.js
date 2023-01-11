let messageForm = document.getElementById('send_message');
let userMessage = document.getElementById('message');
let baseURL = 'http://localhost:3000/message/postMessage'

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try{
        let token = localStorage.getItem('userToken');
        let message = {message:userMessage.value};
        let response = await axios.post(baseURL, message , { headers: { Authorization: token } });
        console.log(response);
    }
    catch(err){
        console.log(err);
    }
})