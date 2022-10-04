class expense {
    constructor(amount, desc, category) {
        this.amount = amount;
        this.desc = desc;
        this.category = category;
    }
}

let baseURL = 'https://crudcrud.com/api/d4bb7ab495cf4baf869b7800bad9d376/expense';
document.getElementById('myForm');
let amount = document.getElementById('amount');
let desc = document.getElementById('desc');
let category = document.getElementById('category');
let list = document.getElementById('list');
let updated = false;
var updatedItemId;


displayInitialScreen();  //Display Initial Screen 


function createItem() {
    // e.preventDefault();
    let new_expense = new expense(amount.value, desc.value, category.value);
    addItem(new_expense);
}

function displayInitialScreen() {
    //All the Existing Expenses will be feched using Get Request from the Server and Displayed here
    console.log('screen is refreshed');
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
    // This Function is used to Dispaly Expense on Screen
    let li = `<li id='${expense._id}'> ${expense.amount} : ${expense.desc} : ${expense.category}
              <button id='delBtn' onClick=deleteItem('${expense._id}')>Delete</button>
              <button onClick=updateItem('${expense._id}')>Edit</button>
              </li>`;
    list.innerHTML = list.innerHTML + li;
}

function addItem(new_expense) {
    //Add item to dom
    if(updated == false){
    axios.post(baseURL, new_expense)
        .then((res) => { displayItem(res.data) })
        .catch((err) => { console.log(err) })
    }
    else if(updated == true)
    {
        let updateURL = `${baseURL}/${updatedItemId}`
        axios.put(updateURL, new_expense)
        .then((res) => { displayItem(res.data)
        updated = false; })
        .catch((err) => { console.log(err) })
    }
}

function deleteItem(itemId) {
    // if (confirm('Are You Sure?')) {
        console.log(itemId);
        let deletedItem = document.getElementById(itemId);
        let delURL = `${baseURL}/${itemId}`
        axios.delete(delURL)
            .then((res) => {
                console.log(list);
                console.log(deletedItem);
                list.removeChild(deletedItem);
            })
            .catch((err) => { console.log(err) })
    // }
}

function updateItem(itemId) {
        let updatedItem = document.getElementById(itemId);
        getURL= `${baseURL}/${itemId}`
        axios.get(getURL)
        .then((res)=>{
            amount.value = res.data.amount;
            desc.value = res.data.desc;
            category.value = res.data.category;
            list.removeChild(updatedItem);
            updated = true;
            updatedItemId = res.data._id;            
        })
        .catch((err)=>{console.log(err)})
}