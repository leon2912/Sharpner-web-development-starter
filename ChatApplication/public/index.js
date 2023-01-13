let messageForm = document.getElementById('send_message');
let userMessage = document.getElementById('message');
let baseURL = 'http://localhost:3000/message/postMessage'
let chatList = document.getElementById('chats');

window.addEventListener('DOMContentLoaded', async () => {
    try{
        let token = localStorage.getItem('userToken');
        let response = await axios.get('http://localhost:3000/message/getMessages', { headers: { Authorization: token } });
        let chats = response.data.chats;

        chats.forEach(element => {
            chatList.innerHTML += `<li>${element.username}: ${element.message}</li>`
        });
    }
    catch(err){
        console.log(err);
    }
})

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try{
        let token = localStorage.getItem('userToken');
        let message = {message:userMessage.value};
        let response = await axios.post(baseURL, message , { headers: { Authorization: token } });
        console.log(response);
        location.reload();
    }
    catch(err){
        console.log(err);
    }
})

setInterval(async() => {
    try{
        let token = localStorage.getItem('userToken');
        let response = await axios.get('http://localhost:3000/message/getMessages', { headers: { Authorization: token } });
        let chats = response.data.chats;
        chatList.innerHTML = '';
        chats.forEach(element => {
            chatList.innerHTML += `<li>${element.username}: ${element.message}</li>`
        });
    }
    catch(err){
        console.log(err);
    }

}, 5000)