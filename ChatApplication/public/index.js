let messageForm = document.getElementById('send_message');
let userMessage = document.getElementById('message');
let baseURL = 'http://localhost:3000/message/postMessage'
let chatList = document.getElementById('chats');

window.addEventListener('DOMContentLoaded', async () => {
    try {
        chatList.innerHTML = '';
        let token = localStorage.getItem('userToken');
        let oldMessages = JSON.parse(localStorage.getItem('messages'));
        let lastElementId = 0;
        //Check if there are any messages in Local Storage if yes print on screen
        if (oldMessages != null) {
            oldMessages.forEach(element => {
                chatList.innerHTML += `<li>${element.username}: ${element.message}</li>`
            });
            lastElementId = oldMessages[oldMessages.length - 1].id;
        }
            let response = await axios.get(`http://localhost:3000/message/getMessages?lastMessageId=${lastElementId}`, { headers: { Authorization: token } });
            let chats = response.data.chats;
            if (chats != null) {
                let updatedChat = [];
                if(oldMessages != null){
                    updatedChat = oldMessages.concat(chats);
                }
                else{
                    updatedChat = chats; 
                }
                if(updatedChat.length>10)
                {
                    updatedChat.slice(Math.max(updatedChat.length - 10, 0));
                }
                let chatString = JSON.stringify(updatedChat);
                localStorage.setItem('messages', chatString);
                lastElementId = updatedChat[updatedChat.length - 1].id;
                oldMessages = updatedChat;
                chatList.innerHTML = '';
                updatedChat.forEach(element => {
                    chatList.innerHTML += `<li>${element.username}: ${element.message}</li>`
                });
            }
        // Keep checking for new messages every 5 secs
        setInterval(async () => {
            let response = await axios.get(`http://localhost:3000/message/getMessages?lastMessageId=${lastElementId}`, { headers: { Authorization: token } });
            let chats = response.data.chats;
            if (chats != null) {
                let updatedChat;
                if(oldMessages != null){
                    updatedChat = oldMessages.concat(chats);
                }
                else{
                    updatedChat = chats; 
                }
                if(updatedChat.length>10)
                {
                    updatedChat = updatedChat.slice(Math.max(updatedChat.length - 10, 0));
                }
                let chatString = JSON.stringify(updatedChat);
                localStorage.setItem('messages', chatString);
                //Update Chats on screen
                chatList.innerHTML='';
                updatedChat.forEach(element => {
                    chatList.innerHTML += `<li>${element.username}: ${element.message}</li>`
                });
            }
        }, 5000);
    }
    catch (err) {
        console.log(err);
    }
})

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        let token = localStorage.getItem('userToken');
        let message = { message: userMessage.value };
        let response = await axios.post(baseURL, message, { headers: { Authorization: token } });
        console.log(response);
        location.reload();
    }
    catch (err) {
        console.log(err);
    }
})