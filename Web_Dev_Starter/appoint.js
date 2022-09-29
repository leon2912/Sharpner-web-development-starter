
let myForm = document.querySelector('#myForm');
class User{
    constructor(name,email) {
        this.name = name;
        this.email = email;
    }
}
let myName = document.getElementById('name');
let myEmail = document.getElementById('email');

// let objkeys = Object.keys(localStorage);
axios.get("https://crudcrud.com/api/ba4b516cd2064a9c92a799621f9980e6/appointmentData")
.then((res)=>{console.log(res.data);loadInitialScreen(res.data)})
.catch((err)=>{console.log('Error in Fetching Appointment Data')})

myForm.addEventListener('submit', (e) =>{
    e.preventDefault();
        let newUser = new User(myName.value,myEmail.value);
        axios.post("https://crudcrud.com/api/ba4b516cd2064a9c92a799621f9980e6/appointmentData",newUser)
        .then((res)=>{addItemOnScreen(res.data);
                    console.log(res)})
        .catch((err)=>{console.log('something went Wrong')})
    }
)

function addItemOnScreen(newUser){
    console.log(newUser);
    var li = document.createElement('li');
    li.className = 'list-group-item';
    // console.log(newUser.id);
    li.id = newUser._id;
    li.appendChild(document.createTextNode(newUser.name));
    li.appendChild(document.createTextNode(`      ${newUser.email}`));
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    deleteBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteBtn);
    //let Form = document.querySelector('#myForm');
    myForm.appendChild(li);
    console.log(myForm);
    deleteBtn.addEventListener('click',(e) => {
        e.preventDefault();
        if(e.target.classList.contains('delete')){
            if(confirm('Are You Sure?')){
              var li = e.target.parentElement;
              console.log(li);
              let baseURL = 'https://crudcrud.com/api/ba4b516cd2064a9c92a799621f9980e6/appointmentData';
              let delURL = `${baseURL}/${li.id}`;
            //   console.log(delURL);
              axios.delete(delURL)
              .then(()=>{myForm.removeChild(li);})
              .catch((res)=>{console.log(res)})
              
            }
          }
      })
  }

  function loadInitialScreen(appointments){
    for(let i=0;i<appointments.length;i++)
    {
        addItemOnScreen(appointments[i]);
    }

  }
