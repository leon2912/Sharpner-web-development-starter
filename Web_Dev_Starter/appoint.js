
let myForm = document.querySelector('#myForm');
class User{
    constructor(name,email) {
        this.name = name;
        this.email = email;
    }
}
let myName = document.getElementById('name');
let myEmail = document.getElementById('email');
//myName.value = userDeserelized.name;
//myEmail.value = userDeserelized.email;
myForm.addEventListener('submit', (e) =>{
    e.preventDefault();
        let newUser = new User(myName.value,myEmail.value);
        let userSerelized = JSON.stringify(newUser);
        localStorage.setItem(newUser.email,userSerelized)
        addItem(e);
    }
)

function addItem(e){
    e.preventDefault();
  
    // Get input value
    //var newItem = document.getElementById('item').value;
    let locUser = localStorage.getItem(myEmail.value);
    let userDeserelized = JSON.parse(locUser);
    var newItem = userDeserelized.name;
    var newItem2 = userDeserelized.email;
    // Create new li element
    var li = document.createElement('li');
    // Add class
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(newItem));
    li.appendChild(document.createTextNode(`      ${newItem2}`));
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    deleteBtn.appendChild(document.createTextNode('X'));
    li.appendChild(deleteBtn);
    console.log(li);
    //let Form = document.querySelector('#myForm');
    myForm.appendChild(li);
    deleteBtn.addEventListener('click',(e) => {
        e.preventDefault();
        console.log('delete button Added');
      })
  }
