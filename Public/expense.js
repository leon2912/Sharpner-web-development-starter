class expense {
    constructor(amount, desc, category) {
        this.amount = amount;
        this.desc = desc;
        this.category = category;
    }
}

document.getElementById('myForm');
let expenseContainer = document.getElementById('expense-container');
let leaderBoard = document.getElementById('leader-board');
let downloads = document.getElementById('downloads');
let filesContainer = document.getElementById('files');
let amount = document.getElementById('amount');
let desc = document.getElementById('desc');
let category = document.getElementById('category');
let total = document.getElementById('total');
let baseURL = 'http://localhost:3000/expense';
let pagination = document.getElementById('pagination');
let itemList = document.getElementById('expense-items');
let updated = false;
let updatedItemId = 0;
let token = localStorage.getItem('userToken');


window.addEventListener('DOMContentLoaded', () => {
    displayExpenses(1);
})



myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let new_expense = new expense(amount.value, desc.value, category.value);
    if (updated == false) {
        addItem(new_expense);
    }
    else {
        console.log('record was updated');
        update(new_expense);
        updated = false;
    }
})


async function addItem(new_expense) {
    //Add item to dom
    try {
        let token = localStorage.getItem('userToken');
        let response = await axios.post(baseURL, new_expense, { headers: { Authorization: token } });
        total.innerText = response.data.user.totalExpense;
        displayItem(response.data.expense)
        console.log(response);
        return response;
    }
    catch (err) {
        console.log(err);
    }
}

async function displayExpenses(pageNo) {
    try {
        let token = localStorage.getItem('userToken');
        itemList.innerHTML = '';
        let res = await axios.get(`${baseURL}/userExpenses?page=${pageNo}`, { headers: { Authorization: token } });
        let allExpenses = res.data.expenses;
        total.innerText = res.data.user.totalExpense;
        if (res.data.user.ispremiumuser) {
            document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/1595911.jpg')";
        };
        for (let i = 0; i < allExpenses.length; i++) {
            displayItem(allExpenses[i]);
        }
        // let pagination = `<div class='pagination' id='pagination'></div>`
        // expenseContainer.innerHTML += pagination;
        showPagination(res.data);
    }
    catch {
        console.log('something went wrong');
    }
}

async function update(new_expense) {
    //Add item to dom
    try {
        let token = localStorage.getItem('userToken');
        let updateURL = `${baseURL}/${updatedItemId}`
        let response = await axios.put(updateURL, new_expense, { headers: { Authorization: token } });
        displayItem(response.data)
        console.log(response);
        myForm.reset();
        return response;
    }
    catch {
        console.log('something went wrong');
    }
}

function displayItem(expense) {
    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.id = expense.id;

    li.innerHTML = `<span id=amount${expense.id}>Amount-${expense.amount}</span><br>
                    <span id=desc${expense.id}>Description-${expense.desc}</span><br>
                    <span id=category${expense.id}>Category-${expense.category}</span><br>
                    <button class='btn btn-danger delete' id='deleteBtn'>Delete</button>
                    <button class='btn btn-primary edit' id='editBtn'>Edit</button>
                    <hr>`
    // expenseContainer.appendChild(li);
    itemList.appendChild(li);


    let deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('delete')) {
            if (confirm('Are You Sure?')) {
                deleteItem(e)
            }
        }
    })

    let editBtn = document.getElementById('editBtn');
    editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('edit')) {
            updateItem(e)
        }
    })
}

async function deleteItem(e) {
    try {
        let token = localStorage.getItem('userToken');
        var li = e.target.parentElement;
        let delURL = `${baseURL}/${li.id}`;
        let response = await axios.delete(delURL, { headers: { Authorization: token } });
        total.innerText = response.data.user.totalExpense;
        itemList.removeChild(li);
        return response;
    }
    catch {
        console.log('something went wrong');
    }
}

async function updateItem(e) {
    try {
        var li = e.target.parentElement;
        let id = e.target.parentNode.id;
        amount.value = document.getElementById(`amount${id}`).innerText.split('-')[1];
        desc.value = document.getElementById(`desc${id}`).innerText.split('-')[1];
        category.value = document.getElementById(`category${id}`).innerText.split('-')[1];
        updated = true;
        updatedItemId = li.id;
        itemList.removeChild(li);
        myForm.classList.toggle("active");
        return delRes;
    }
    catch (err) {
        console.log(err);
    }
}

addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', (e) => {
    console.log(e.target);
    myForm.classList.toggle("active");
})

document.getElementById('rzp-button1').onclick = async function (e) {
    const response = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: { "Authorization": token } });
    console.log(response);
    var options =
    {
        "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
        "name": "Test Company",
        "order_id": response.data.order.id, // For one time payment
        "prefill": {
            "name": "Leon Falcao",
            "email": "leon@gmail.com",
            "contact": "7875294115"
        },
        "theme": {
            "color": "#3399cc"
        },
        // This handler function will handle the success payment
        "handler": function (response) {
            console.log(response);
            axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, { headers: { "Authorization": token } }).then(() => {
                alert('You are a Premium User Now')
            }).catch(() => {
                alert('Something went wrong. Try Again!!!')
            })
        },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });
}

document.getElementById('leader-button').onclick = async function (e) {
    try {
        const response = await axios.get('http://localhost:3000/user', { headers: { "Authorization": token } });
        let users = response.data.users;
        console.log(users);
        leaderBoard.innerHTML = '<div><h1>Leader Board</h1><hr></div>'
        users.forEach(user => {
            let li = document.createElement('li');
            li.className = 'list-group-item';
            li.id = user.id;
            li.innerHTML = `<hr><span>Name-${user.name}</span><br>
                        <span>Total Expense-${user.totalExpense}</span><br>
                        <button id="details-button" class='btn btn-primary edit' onclick='displayDetails(this)'>Details</button>
                        <div id='details${user.id}' class='details'><div>
                        `
            leaderBoard.appendChild(li)
            leaderBoard.style.display = 'block';
        });
    }
    catch (err) {
        console.log(err);
        if(err.response.status=='403'){
            leaderBoard.innerHTML = '<div><h1>Leader Board</h1><hr></div>Only Premium users can access Leader Board';
            leaderBoard.style.display = 'block';   
        };
    }
}

async function displayDetails(event){
    let userId = event.parentNode.id;
    const response = await axios.get(`http://localhost:3000/expense/premiumUser?userId=${userId}`)
    let userExpenses = response.data.expenses;
    let li = event.parentNode;
    let details = document.getElementById(`details${userId}`)
    details.innerHTML = '';
    userExpenses.forEach((expense)=>{
        details.innerHTML += `<div>Amount:${expense.amount}---Desc:${expense.desc}---Category:${expense.category} </div>`
    })
    console.log(li);

}

async function download(){
    try{
        const response = await axios.get('http://localhost:3000/expense/download', { headers: { "Authorization": token } });
        console.log(response);
        let a = document.createElement('a');
        a.href = response.data.fileUrl;
        a.click();
    }
    catch(err){
        console.log(err.response.status);
        if(err.response.status == 403)
        {
            window.alert('Please Buy premium to access this Feature')
        }
    }
}

async function downloadFiles(){
    try{
        const response = await axios.get('http://localhost:3000/expense/getFiles', { headers: { "Authorization": token } });
        // console.log(response.files);
        let files = response.data.files;
        filesContainer.innerHTML = '';
        files.forEach((file,i)=>{
            let linkHtml = `<div><a href=${file.url}>File${i+1}</a></div>`
            filesContainer.innerHTML += linkHtml;
        })
        console.log(files)
    }
    catch(err){
        console.log(err);
    }
    downloads.style.display = 'block';

}

function showPagination(data) {
    pagination.innerHTML = '';
    if (data.hasPrev) {
        pagination.innerHTML = `<button class="page" id="prev" onclick=displayPrev(event,${data.currPage}) >prev</button>`;
    }
    pagination.innerHTML += `<span id="curr-page"> ${data.currPage} </span>`
    if (data.hasNext) {
        pagination.innerHTML += `<button class="page" id="next" onclick=displayNext(event,${data.currPage}) >next</button>`;
    }
}

function displayNext(e,pageNo)
{
    console.log('Next Button Clicked');
    let nextPage = parseInt(pageNo)+1;
    displayExpenses(nextPage);
}

function displayPrev(e,pageNo)
{
    console.log('Next Button Clicked');
    let nextPage = parseInt(pageNo)-1;
    displayExpenses(nextPage);
}
