// const { getUsers } = require("../../ExpenseTracker/controllers/user");

// const e = require("express");

let messageForm = document.getElementById('send_message');
let groupForm = document.getElementById('createGroup');
let userMessage = document.getElementById('message');
let baseURL = 'http://localhost:3000/message/postMessage'
let chatList = document.getElementById('chats');
let userList = document.getElementById('users');
let token = localStorage.getItem('userToken');
let groupList = document.getElementById('groups');
let groupUsers = document.getElementById('groupUsers');
let userForm = document.getElementById('userForm')
let myTimer;
let currentGroupId = 0;

window.addEventListener('DOMContentLoaded', async () => {
    displayGroups();
    // setInterval(async()=>getMessages(),5000);
})

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        let token = localStorage.getItem('userToken');
        let message = { message: userMessage.value, groupId: currentGroupId };
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
        let oldMessages = JSON.parse(localStorage.getItem(`messages_${groupId}`));
        let lastElementId = 0;
        //Check if there are any messages in Local Storage if yes print on screen
        if (oldMessages != null) {
            oldMessages.forEach(element => {
                chatList.innerHTML += `<li>${element.username}: ${element.message}</li>`
            });
            lastElementId = oldMessages[oldMessages.length - 1].id;
        }
        myTimer = setInterval(async () => {
            let response = await axios.get(`http://localhost:3000/message/getMessages?groupId=${groupId}&lastMessageId=${lastElementId}`, { headers: { Authorization: token } });
            let chats = response.data.chats;
            if (chats.length != 0) {
                let updatedChat = [];
                if (oldMessages != null) {
                    updatedChat = oldMessages.concat(chats);
                }
                else {
                    updatedChat = chats;
                }
                if (updatedChat.length > 10) {
                    updatedChat = updatedChat.slice(Math.max(updatedChat.length - 10, 0));
                }
                let chatString = JSON.stringify(updatedChat);
                localStorage.setItem(`messages_${groupId}`, chatString);
                lastElementId = updatedChat[updatedChat.length - 1].id;
                oldMessages = updatedChat;
                chatList.innerHTML = '';
                updatedChat.forEach(element => {
                    chatList.innerHTML += `<li>${element.username}: ${element.message}</li>`
                });
            }
        }, 5000);
    }
    catch (err) {
        console.log(err);
    }
}

async function displayGroups() {
    let response = await axios.get('http://localhost:3000/group/getGroups', { headers: { Authorization: token } });
    let groups = response.data.data;
    groups.forEach(element => {
        groupList.innerHTML += `<li class='groupList' id=${element.id}>${element.name}</li>`
    });
}

groupList.addEventListener('click', (e) => {
    currentGroupId = e.target.id;
    let list = document.querySelectorAll('.groupList');
    console.log(list);
    list.forEach(li => {
        li.classList.remove('active');
    })
    e.target.classList.add('active');
    if (myTimer != null) {
        clearInterval(myTimer);
    }
    getGroupUsers(currentGroupId);
    getMessages(currentGroupId);
})

async function getGroupUsers(groupId) {
    let response = await axios.get(`http://localhost:3000/group/fetchUsers/${groupId}`, { headers: { Authorization: token } });
    let users = response.data;
    response = await axios.get(`http://localhost:3000/group/isAdmin/${groupId}`, { headers: { Authorization: token } });
    let isAdmin = response.data;
    userList.innerHTML = '';
    if (isAdmin == true) {
        users.forEach(user => {
            console.log(user.usergroup.isAdmin);
            let item = `<span>${user.name}<span>`
            console.log(user);
            if (user.usergroup.isAdmin == true) {
                item += `&ensp;&ensp;&ensp;<span>Admin<span>
                        <input type="button" class = 'sub-btn' value="Remove" onclick="removeUser(${user.id})">
                        <input type="button" class = 'sub-btn' value="Remove Admin" onclick="removeAdmin(${user.id})">`
            }
            else{
                item += `&ensp;&ensp;&ensp;<span>Admin<span>
                        <input type="button" class = 'sub-btn' value="Remove" onclick="removeUser(${user.id})">
                        <input type="button" class = 'sub-btn' value="Make Admin" onclick="makeAdmin(${user.id})">`
            }
            userList.innerHTML += `<li>${item}</li>`
        })
        userForm.innerHTML = `<input type="text" class="addUser" id="addUser" placeholder="Add User">
        <input type="submit" class = 'sub-btn' value="Add">`
    }
    else{
    users.forEach(user => {
        console.log(user.usergroup.isAdmin);
        let item = `<span>${user.name}<span>`
        if (user.usergroup.isAdmin == true) {
            item += `&ensp;&ensp;&ensp;<span>Admin<span>`
        }
        userList.innerHTML += `<li>${item}</li>`
    })
}
}

userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        let newUserEmail =  document.getElementById('addUser').value;
        userDetails = {email:newUserEmail,groupId:currentGroupId}
        let response = await axios.post(`http://localhost:3000/group/addUser`,userDetails, { headers: { Authorization: token } })
        console.log(response);
    }
    catch (err) {
        console.log(err);
    }
})

async function removeUser(userId){
    let userDetails = {userId:userId,groupId:currentGroupId};
    try{
    let response = await axios.post(`http://localhost:3000/group/removeUser`,userDetails, { headers: { Authorization: token } })
    console.log(`User ${userId} Removed`);
    }
    catch(err){
        console.log(err);
    }
}

async function makeAdmin(userId){
    let userDetails = {userId:userId,groupId:currentGroupId};
    try{
    let response = await axios.post(`http://localhost:3000/group/makeAdmin`,userDetails, { headers: { Authorization: token } })
    alert(`${response.data.user.name} is a admin Now`);
    }
    catch(err){
        console.log(err);
    }
    console.log(`User ${userId} to be made admin`);
}

async function removeAdmin(userId){
    let userDetails = {userId:userId,groupId:currentGroupId};
    try{
    let response = await axios.post(`http://localhost:3000/group/removeAdmin`,userDetails, { headers: { Authorization: token } })
    alert(`${response.data.user.name} is removed from Admin Now!!`);
    }
    catch(err){
        console.log(err);
    }
    console.log(`User ${userId} to be made admin`);
}
