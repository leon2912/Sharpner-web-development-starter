class expense {
    constructor(amount, desc, category) {
        this.amount = amount;
        this.desc = desc;
        this.category = category;
    }
}

document.getElementById('myForm');
let expenseContainer = document.getElementById('expense-container');
let amount = document.getElementById('amount');
let desc = document.getElementById('desc');
let category = document.getElementById('category');
let baseURL = 'http://localhost:3000/expense';

let updated = false;
let updatedItemId = 0;



displayInitialScreen();


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
        let response = await axios.post(baseURL, new_expense,{headers:{Authorization: token}});
        displayItem(response.data)
        console.log(response);
        myForm.reset();
        return response;
    }
    catch (err) {
        console.log(err);
    }
}

async function displayInitialScreen() {
    try {
        let token = localStorage.getItem('userToken');
        let res = await axios.get(baseURL,{headers:{Authorization: token}});
        let allExpenses = res.data;
        for (let i = 0; i < allExpenses.length; i++) {
            displayItem(allExpenses[i]);
        }
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
        let response = await axios.put(updateURL, new_expense,{headers:{Authorization: token}});
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
    expenseContainer.appendChild(li);


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
        let response = await axios.delete(delURL,{headers:{Authorization: token}});
        expenseContainer.removeChild(li);
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
        expenseContainer.removeChild(li);
        myForm.classList.toggle("active");
        return delRes;
    }
    catch(err) {
        console.log(err);
    }
}

addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', (e) => {
    console.log(e.target);
    myForm.classList.toggle("active");    
})