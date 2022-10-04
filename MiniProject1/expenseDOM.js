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
let baseURL = 'https://crudcrud.com/api/433e517103e441a4996f3373a4543bfc/expense';


displayInitialScreen();


myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let new_expense = new expense(amount.value, desc.value, category.value);
    addItem(new_expense)
        .then((res) => { console.log('Item created sucessfully'); myForm.reset(); })
        .catch((err) => { console.log('Something Went wrong') })
})




async function addItem(new_expense) {
    //Add item to dom
    let response = await axios.post(baseURL, new_expense);
    displayItem(response.data)
    console.log(response);
    return response;
}

function displayInitialScreen() {
    axios.get(baseURL)
        .then((res) => {
            let allExpenses = res.data;
            for (let i = 0; i < allExpenses.length; i++) {
                displayItem(allExpenses[i]);
            }
        })
        .catch((err) => { console.log(err) })
}

function displayItem(expense) {
    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.id = expense._id;
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.appendChild(document.createTextNode('Delete'));

    let editBtn = document.createElement('button');
    editBtn.className = 'edit';
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
                    .then((res) => { console.log('Item Deleted Sucessfully') })
                    .catch((err) => { console.log('Error in deleteing Item') })
            }
        }
    })

    editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('edit')) {
            updateItem(e)
                .then((res) => { console.log('data Updated Sucessfully') })
                .catch((err) => { console.log('Error In updating data') })
        }
    })
}

async function deleteItem(e) {

    var li = e.target.parentElement;
    let delURL = `${baseURL}/${li.id}`;
    let response = await axios.delete(delURL);
    myForm.removeChild(li);
    console.log(response);
    return response;
}

async function updateItem(e) {

    var li = e.target.parentElement;
    let updateURL = `${baseURL}/${li.id}`
    let res = await axios.get(updateURL)
    amount.value = res.data.amount;
    desc.value = res.data.desc;
    category.value = res.data.category;
    let delRes = await deleteItem(e)
    myForm.removeChild(li)
    return delRes;
}