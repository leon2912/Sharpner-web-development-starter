
let myForm = document.querySelector('#myForm');
let dataUpdadtedID ;
class User{
    constructor(name,phone,email) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
}
let myName = document.getElementById('name');
let myPhone = document.getElementById('phone');
let myEmail = document.getElementById('email');

// let objkeys = Object.keys(localStorage);
axios.get("http://localhost:3000/user")
.then((res)=>{
    console.log(res.data);
    loadInitialScreen(res.data)})
.catch((err)=>{console.log('Error in Fetching Appointment Data')})

myForm.addEventListener('submit', (e) =>{
    e.preventDefault();
        let newUser = new User(myName.value,myPhone.value,myEmail.value);
        axios.post("http://localhost:3000/user",newUser)
        .then((res)=>{
            addItemOnScreen(res.data);
            console.log(res)})
        .catch((err)=>{console.log('something went Wrong')})
    }
)

function addItemOnScreen(newUser){
    console.log(newUser);
    var li = document.createElement('li');
    li.className = 'list-group-item';
    // console.log(newUser.id);
    li.id = newUser.id;
    li.appendChild(document.createTextNode(newUser.name));
    li.appendChild(document.createTextNode(`    :    ${newUser.phone}`));
    li.appendChild(document.createTextNode(`    :    ${newUser.email}`));
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger delete';
    deleteBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteBtn);
    let editBtn = document.createElement('button');
    editBtn.className = 'btn btn-primary edit';
    editBtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(editBtn);
    //let Form = document.querySelector('#myForm');
    myForm.appendChild(li);
    console.log(myForm);
    deleteBtn.addEventListener('click',(e) => {
        e.preventDefault();
        if(e.target.classList.contains('delete')){
            if(confirm('Are You Sure?')){
              var li = e.target.parentElement;
              console.log(li);
              let baseURL = 'http://localhost:3000/user';
              let delURL = `${baseURL}/${li.id}`;
            //   console.log(delURL);
              axios.delete(delURL)
              .then(()=>{myForm.removeChild(li);})
              .catch((res)=>{console.log(res)})
              
            }
          }
      })
      editBtn.addEventListener('click',(e) => {
        e.preventDefault();
        if(e.target.classList.contains('edit'))
        {
              let li = e.target.parentElement;
              let getURL = `http://localhost:3000/user/${li.id}`;
              axios.get(getURL)
             .then((res)=>{console.log(res.data);
                        myName.value = res.data.name;
                        myPhone.value = res.data.phone;
                        myEmail.value = res.data.email;
                        axios.delete(getURL)
                        .then(()=>{myForm.removeChild(li)})
                        .catch((err)=>{console.log(err)})
            })            
            .catch((err)=>{console.log('Error in Fetching Appointment Data')});
        }
    })
  }

  function loadInitialScreen(appointments){
    for(let i=0;i<appointments.length;i++)
    {
        addItemOnScreen(appointments[i]);
    }

  }
