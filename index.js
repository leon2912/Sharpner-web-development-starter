class Student{
    static studentCount = 0;
    constructor(firstName,lastName,rollNo,sex,age){
        this.firstName = firstName;
        this.lastName = lastName;
        this.rollNo = rollNo;
        this.sex = sex;
        this.age = age;
        Student.studentCount = Student.studentCount  + 1;
    }
    getFullName(){
        return `${this.firstName} ${this.lastName}`;
    }
}

let leon = new Student('Leon','Falcao',123,'male',22);
let Tom  = new Student('Tom','Berks',321,'male',26);
console.log(`Total number of students are ${Student.studentCount}`);

class Member extends Student{
    constructor(firstName,lastName,rollNo,sex,age,membership)
    {
        super(firstName,lastName,rollNo,sex,age);
        this.membership = membership;
        let now = new Date();
        this.membershipValidTill = new Date(now.setDate(now.getDate()+30));
    }

    getDetails = ()=>{
        console.log(`Student ${Sam.firstName} has subscribed to ${Sam.membership} membership`);
    }

    extendMembership = (membershipType) => {
        if(membershipType == 'yearly'){
            this.membershipValidTill = new Date(this.membershipValidTill.setDate(this.membershipValidTill.getDate()+365));
            this.membership = 'Yearly';
        }
        else
        {
            this.membershipValidTill = new Date(this.membershipValidTill.setDate(this.membershipValidTill.getDate()+30));
            this.membership = 'Standard';
        }
        
    }
}

let Sam = new Member('Sam','Johnson',123,'male',22,'standard');
let Mac = new Member('Mac', 'Berks', 456, 'male', 25, 'standard');
Sam.getDetails();
Sam.extendMembership('yearly');
console.log(Sam);
console.log('git updated');



// console.log(document.querySelectorAll('.items'));
// const ul = document.querySelectorAll('.items');
// ul[0].textContent = 'Hello';
// //Change color based on text content
// let i=0;
// while(i<ul.length)
// {
//     if(ul[i].textContent == 'Hello')
//     {
//         ul[i].style.color = 'green';
//     }
// i++;
// }
// ul[1].style.color = 'yellow';

let myForm = document.querySelector('#myForm');
let myName = document.querySelector('#name');
let myEmail = document.querySelector('#email');
let errorMsg = document.querySelector('.errorMsg');
let succMsg = document.querySelector('.succMsg');
console.log(myForm,myName,errorMsg);
myForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    if(myName.value == '' || myEmail.value == '' )
    {
        errorMsg.classList.add('error');
        errorMsg.innerHTML = 'Please Enter all fields';
        setTimeout(() => errorMsg.remove(), 3000);
    }
    else
    {
        console.log(`Data for User ${myName.value} with email ${myEmail.value} saved`);
        succMsg.innerHTML = 'Data Saved Successfully';
    }

})

myName.addEventListener('click',(e) => {
    myName.style.backgroundColor = 'powderblue';
    console.log('click on name event trigged');
})

myName.addEventListener('mouseout',(e) => {
    myName.style.backgroundColor = 'white';
    console.log('mouseout name event trigged');
})




