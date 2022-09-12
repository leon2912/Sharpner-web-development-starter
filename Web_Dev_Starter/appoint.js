
let myForm = document.querySelector('#myForm');
class User{
    constructor(name,email) {
        this.name = name;
        this.email = email;
    }
}
let myName = document.getElementById('name');
let myEmail = document.getElementById('email');

let objkeys = Object.keys(localStorage);
for(let i=0;i<objkeys.length;i++)
{
    let stringifiedDetailsOfPeople = localStorage.getItem(objkeys[i]);
    let detailsOfPeople = JSON.parse(stringifiedDetailsOfPeople);
    addItem(detailsOfPeople);
}
//myName.value = userDeserelized.name;
//myEmail.value = userDeserelized.email;
myForm.addEventListener('submit', (e) =>{
    e.preventDefault();
        let newUser = new User(myName.value,myEmail.value);
        let userSerelized = JSON.stringify(newUser);
        localStorage.setItem(newUser.email,userSerelized)
        addItem(newUser);
    }
)

function addItem(newUser){
  
    // Get input value
    //var newItem = document.getElementById('item').value;
    let locUser = localStorage.getItem(newUser.email);
    let userDeserelized = JSON.parse(locUser);
    var newItem = userDeserelized.name;
    var newItem2 = userDeserelized.email;
    // Create new li element
    if(localStorage.getItem(newUser.email) != null)
    {
        let childToBeDeleted = document.getElementById(newItem2);
        console.log(childToBeDeleted);
        if(childToBeDeleted != null){
        myForm.removeChild(childToBeDeleted);
        }
    }
    var li = document.createElement('li');
    // Add class
    li.className = 'list-group-item';
    li.id = newItem2;
    li.appendChild(document.createTextNode(newItem));
    li.appendChild(document.createTextNode(`      ${newItem2}`));
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    deleteBtn.appendChild(document.createTextNode('X'));
    li.appendChild(deleteBtn);
    //let Form = document.querySelector('#myForm');
    myForm.appendChild(li);
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
  }
