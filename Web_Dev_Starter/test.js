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


displayInitialScreen();


myForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let new_expense = new expense(amount.value,desc.value,category.value);
    addItem(new_expense);
})




function addItem(new_expense){
    //Add item to dom
    axios.post('https://crudcrud.com/api/6ae93437248d45d0a1cf962cacfe6e8b/expense',new_expense)
    .then((res)=>{displayItem(res.data)})
    .catch((err)=>{console.log(err)})
}

function displayInitialScreen()
{
    axios.get('https://crudcrud.com/api/6ae93437248d45d0a1cf962cacfe6e8b/expense')
    .then((res)=>{
    let allExpenses = res.data; 
    for(let i=0;i<allExpenses.length;i++){
        displayItem(allExpenses[i]);
    }})
    .catch((err)=>{console.log(err)})  
}

let deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.appendChild(document.createTextNode('Delete'));

    let editBtn = document.createElement('button');
    editBtn.className = 'edit';
    editBtn.appendChild(document.createTextNode('Edit'));

function displayItem(expense)
{   
    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.id = expense._id;
    let deleteBtn1 = {...deleteBtn};
	let editBtn1 = {...editBtn1};
    li.appendChild(document.createTextNode(`${expense.amount}  ${expense.desc}  ${expense.category} `));
    li.appendChild(deleteBtn1);
    li.appendChild(editBtn1);
    myForm.appendChild(li);   
}

deleteBtn.addEventListener('click',(e) => {
	e.preventDefault();
	if(e.target.classList.contains('delete')){
		if(confirm('Are You Sure?')){
		  var li = e.target.parentElement;
		  let delURL = `https://crudcrud.com/api/6ae93437248d45d0a1cf962cacfe6e8b/expense/${li.id}` 
		  axios.delete(delURL)
		  .then((res)=>{myForm.removeChild(li)})
		  .catch((err)=>{console.log(err)})
		}
	  }
  })

  editBtn.addEventListener('click',(e) => {
	e.preventDefault();
	if(e.target.classList.contains('edit')){
		  var li = e.target.parentElement;
		  let updateURL = `https://crudcrud.com/api/6ae93437248d45d0a1cf962cacfe6e8b/expense/${li.id}` 
		  axios.get(updateURL)
		  .then((res)=>{
			amount.value = res.data.amount;
			desc.value =  res.data.desc;
			category.value = res.data.category;
			axios.delete(updateURL)
			.then((res)=>{myForm.removeChild(li);})
		  })
		  .catch((err)=>{console.log(err)})  
		}
  })