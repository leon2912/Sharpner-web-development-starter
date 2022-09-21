class expense{
    constructor(amount,desc,category)
    {
        this.amount = amount;
        this.desc = desc;
        this.category = category;
    }
}

document.getElementById('myForm');
let amount = document.getElementById('amount'); 
let desc = document.getElementById('desc'); 
let category = document.getElementById('category'); 

myForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let new_expense = new expense(amount.value,desc.value,category.value);
    let expSerelized = JSON.stringify(new_expense);
    let locExpense = localStorage.getItem(desc.value);
    if(locExpense == null)
    {
    addItem(new_expense);
    }
    localStorage.setItem(new_expense.desc,expSerelized);
})
displayItems();

function addItem(new_expense){
    //Add item to dom
    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.id = new_expense.desc;
    li.appendChild(document.createTextNode(`${new_expense.amount}  ${new_expense.desc}  ${new_expense.category} `));
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteBtn);
    let editBtn = document.createElement('button');
    editBtn.className = 'edit';
    editBtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(editBtn);
    myForm.appendChild(li);
    console.log(li);
    // Event for Delete button
    deleteBtn.addEventListener('click',(e) => {
        e.preventDefault();
        if(e.target.classList.contains('delete')){
            if(confirm('Are You Sure?')){
              var li = e.target.parentElement;
              myForm.removeChild(li);
              localStorage.removeItem(li.id);
            }
          }
      })
      editBtn.addEventListener('click',(e) => {
        e.preventDefault();
        if(e.target.classList.contains('edit')){
              var li = e.target.parentElement;
              console.log(e.target.classList);
              let locExpense = localStorage.getItem(li.id);
              let expDeserelized = JSON.parse(locExpense);
              console.log(expDeserelized);
              amount.value = expDeserelized.amount;
              desc.value = expDeserelized.desc;
              category.value = expDeserelized.category;
              localStorage.removeItem(li.id);
              myForm.removeChild(li);
            }
      })
}

function displayItems()
{
    let localKeys = Object.keys(localStorage); 
    for(let i=0;i<localKeys.length;i++){
    let locExpense = localStorage.getItem(localKeys[i]);
    let expDeserelized = JSON.parse(locExpense);
    addItem(expDeserelized);
    }   
}





