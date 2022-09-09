let items = document.getElementsByClassName('list-group-item');
console.log(items);
items[0].textContent = 'hello';
items[2].style.backgroundColor = 'green';
for(let i=0;i<items.length;i++){
    items[i].style.fontWeight = 'bold';
}
// console.log("DOM Manipualtion Script");

// console.log(document.forms[0]);


// console.log(document.links); 
// console.log(document.images);

// console.log(document.getElementById('header-title'));
// var headerTitle= document.getElementById('header-title');

// var header = document.getElementById('main-header'); 
// console.log(headerTitle);

// headerTitle.textContent = 'Hello';

//  headerTitle.innerText = 'Goodbye';

//  console.log(headerTitle.innerText); 
// headerTitle.innerHTML = 'Hello';

// header.style.borderBottom = 'solid 3px #000';

// var items=document.getElementsByClassName('list-group-item');

// console.log(items); 
// console.log(items[1]);