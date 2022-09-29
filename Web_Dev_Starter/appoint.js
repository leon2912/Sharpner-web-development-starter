
let myForm = document.querySelector('#myForm');
let dataUpdadtedID ;
class User{
    constructor(name,email) {
        this.name = name;
        this.email = email;
    }
}
let myName = document.getElementById('name');
let myEmail = document.getElementById('email');

// let objkeys = Object.keys(localStorage);
axios.get("https://crudcrud.com/api/1281a939c3f24d1198b8ca2b06630e0a/appointmentData")
.then((res)=>{console.log(res.data);loadInitialScreen(res.data)})
.catch((err)=>{console.log('Error in Fetching Appointment Data')})

myForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    if(dataUpdadtedID == null){
        let newUser = new User(myName.value,myEmail.value);
        axios.post("https://crudcrud.com/api/1281a939c3f24d1198b8ca2b06630e0a/appointmentData",newUser)
        .then((res)=>{addItemOnScreen(res.data);
                    console.log(res)})
        .catch((err)=>{console.log('something went Wrong')})
    }
    else
    {
        let newUser = new User(myName.value,myEmail.value);
        let updateURL = `https://crudcrud.com/api/1281a939c3f24d1198b8ca2b06630e0a/appointmentData/${dataUpdadtedID}`
        axios.put(updateURL,newUser)
        .then((res)=>{addItemOnScreen(res.data);
                    console.log(res)})
        .catch((err)=>{console.log('something went Wrong')}) 
    }
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
    let editBtn = document.createElement('button');
    editBtn.className = 'edit';
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
              let baseURL = 'https://crudcrud.com/api/1281a939c3f24d1198b8ca2b06630e0a/appointmentData';
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
        if(e.target.classList.contains('edit')){
              let li = e.target.parentElement;
              let getURL = `https://crudcrud.com/api/1281a939c3f24d1198b8ca2b06630e0a/appointmentData/${li.id}`;
              axios.get(getURL)
             .then((res)=>{console.log(res.data);
                        myName.value = res.data.name;
                        myEmail.value = res.data.email;
                        axios.delete(getURL)
                        .then(()=>{myForm.removeChild(li);})
             })
            .catch((err)=>{console.log('Error in Fetching Appointment Data')})
            //   let baseURL = 'https://crudcrud.com/api/ba4b516cd2064a9c92a799621f9980e6/appointmentData';
            //   let updateURL = `${baseURL}/${li.id}`;
            //   axios.put(updateURL,)
            console.log(dataUpdadtedID);
            }
      })
  }

  function loadInitialScreen(appointments){
    for(let i=0;i<appointments.length;i++)
    {
        addItemOnScreen(appointments[i]);
    }

  }
