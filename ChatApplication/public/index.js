let messageForm = document.getElementById('send_message');
let groupForm = document.getElementById('createGroup');
let userMessage = document.getElementById('message');
let baseURL = 'http://localhost:3000/message/postMessage'
let chatList = document.getElementById('chats');
let token = localStorage.getItem('userToken');
let groupList = document.getElementById('groups');

window.addEventListener('DOMContentLoaded', async () => {
    displayGroups();
    getMessages();
    // setInterval(async()=>getMessages(),5000);
})

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        let token = localStorage.getItem('userToken');
        let message = { message: userMessage.value };
        let response = await axios.post(baseURL, message, { headers: { Authorization: token } });
        chatList.innerHTML += `<li> You: ${response.data.arr[0].message}</li>`
        console.log(response);
    }
    catch (err) {
        console.log(err);
    }
})

groupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        console.log('Inside Create Group');
        let token = localStorage.getItem('userToken');
        let groupName = { grpName: document.getElementById('groupName').value };
        let response = await axios.post('http://localhost:3000/group/createGroup', groupName, { headers: { Authorization: token } });
        console.log(response);
        location.reload();
    }
    catch (err) {
        console.log(err);
    }
})


async function getMessages(groupId) {
    try {
        chatList.innerHTML = '';
        let token = localStorage.getItem('userToken');
        let oldMessages = JSON.parse(localStorage.getItem(`messages`));
        let lastElementId = 0;
        //Check if there are any messages in Local Storage if yes print on screen
        if (oldMessages != null) {
            oldMessages.forEach(element => {
                chatList.innerHTML += `<li>${element.username}: ${element.message}</li>`
            });
            lastElementId = oldMessages[oldMessages.length - 1].id;
        }
        setInterval(async()=>{
            let response = await axios.get(`http://localhost:3000/message/getMessages?lastMessageId=${lastElementId}`, { headers: { Authorization: token } });
            let chats = response.data.chats;
            if ( chats.length != 0) {
                let updatedChat = [];
                if (oldMessages != null) {
                    updatedChat = oldMessages.concat(chats);
                }
                else {
                    updatedChat = chats;
                }
                if (updatedChat.length > 10) {
                    updatedChat =  updatedChat.slice(Math.max(updatedChat.length - 10, 0));
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
        },5000);
    }
    catch (err) {
        console.log(err);
    }
}

async function displayGroups()
{
    let response = await axios.get('http://localhost:3000/group/getGroups',{ headers: { Authorization: token } });
    let groups = response.data.data;
    groups.forEach(element => {
        groupList.innerHTML += `<li>${element.name}</li>`
    });
    
}
