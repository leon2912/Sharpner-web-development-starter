class expense {
    constructor(amount, desc, category) {
        this.amount = amount;
        this.desc = desc;
        this.category = category;
    }
}

document.getElementById('myForm');
let amount = document.getElementById('amount');
let desc = document.getElementById('desc');
let category = document.getElementById('category');
let baseURL = 'http://localhost:3000/expense';


displayInitialScreen();


myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let new_expense = new expense(amount.value, desc.value, category.value);
    addItem(new_expense);
})


async function addItem(new_expense) {
    //Add item to dom
    try {
        let response = await axios.post(baseURL, new_expense);
        displayItem(response.data)
        console.log(response);
        myForm.reset();
        return response;
    }
    catch {
        console.log('something went wrong');
    }
}

async function displayInitialScreen() {
    try {
        let res = await axios.get(baseURL);
        let allExpenses = res.data;
        for (let i = 0; i < allExpenses.length; i++) {
            displayItem(allExpenses[i]);
        }
    }
    catch {
        console.log('something went wrong');
    }
}

function displayItem(expense) {
    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.id = expense.id;
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger delete';
    deleteBtn.appendChild(document.createTextNode('Delete'));

    let editBtn = document.createElement('button');
    editBtn.className = 'btn btn-primary edit';
    editBtn.appendChild(document.createTextNode('Edit'));

    li.appendChild(document.createTextNode(`${expense.amount} - ${expense.desc} - ${expense.category} `));
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    myForm.appendChild(li);

    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('delete')) {
            if (confirm('Are You Sure?')) {
                deleteItem(e)
            }
        }
    })

    editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('edit')) {
            updateItem(e)
        }
    })
}

async function deleteItem(e) {
    try {
        var li = e.target.parentElement;
        let delURL = `${baseURL}/${li.id}`;
        let response = await axios.delete(delURL);
        myForm.removeChild(li);
        console.log(response);
        return response;
    }
    catch {
        console.log('something went wrong');
    }
}

async function updateItem(e) {
    try {
        var li = e.target.parentElement;
        let liValues = li.textContent.split(" - ");
        amount.value = liValues[0];
        desc.value = liValues[1];
        category.value = liValues[2].split(" ")[0];
        let delRes = await deleteItem(e)
        myForm.removeChild(li)
        return delRes;
    }
    catch {
        console.log('something went wrong');
    }
}