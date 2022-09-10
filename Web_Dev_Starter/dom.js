// let items = document.getElementsByClassName('list-group-item');
// console.log(items);
// items[0].textContent = 'hello';
// items[2].style.backgroundColor = 'green';
// for(let i=0;i<items.length;i++){
//     items[i].style.fontWeight = 'bold';
// }
// let li = document.getElementsByTagName('li');
// console.log(items);
// li[2].style.backgroundColor = 'green';
// for(let i=0;i<li.length;i++){
//     li[i].style.fontWeight = 'bold';
// }

// let item1 = document.querySelector('.list-group-item:nth-child(1)');
// item1.style.backgroundColor = 'green';
// let item2 = document.querySelector('.list-group-item:nth-child(2)');
// item2.remove();
// let odd = document.querySelectorAll('li:nth-child(odd)');
// for(let i=0;i<odd.length;i++){
//      odd[i].style.backgroundColor = 'green';
//  }


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

// let newdiv = document.createElement('div');
// newdiv.className = 'hello';
// newdiv.id = 'hello';
// let h1 = document.createElement('h1');
// let newtext = document.createTextNode('Hello World');
// h1.appendChild(newtext);
// newdiv.appendChild(h1);
//  console.log(newdiv);
//  let container = document.querySelector('header .container');
//  console.log(container);
// //  container.appendChild(newdiv);
// let headerH1 = document.querySelector('header h1');
// // container.insertBefore(newdiv,headerH1);
// container.insertBefore(newdiv,container.firstChild);
// let newli = document.createElement('li');
// let itemtext = document.createTextNode('Hello World');
// newli.appendChild(itemtext);
// newli.className = 'list-group-item';
// let listcont = document.querySelector('.list-group');
// let firstItem = document.querySelector('.list-group-item');
// console.log(firstItem);
// listcont.insertBefore(newli,listcont.firstChild);


//Delete Event
var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');

// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);
// Filter event
filter.addEventListener('keyup', filterItems);

// Add item
function addItem(e){
  e.preventDefault();

  // Get input value
  var newItem = document.getElementById('item').value;

  // Create new li element
  var li = document.createElement('li');
  // Add class
  li.className = 'list-group-item';
  // Add text node with input value
  li.appendChild(document.createTextNode(newItem));

  // Create del button element
  var deleteBtn = document.createElement('button');

  // Add classes to del button
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

  // Append text node
  deleteBtn.appendChild(document.createTextNode('X'));

  // Append button to li
  li.appendChild(deleteBtn);

  // Append li to list
  itemList.appendChild(li);
}

// Remove item
function removeItem(e){
  if(e.target.classList.contains('delete')){
    if(confirm('Are You Sure?')){
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}

// Filter Items
function filterItems(e){
  // convert text to lowercase
  var text = e.target.value.toLowerCase();
  // Get lis
  var items = itemList.getElementsByTagName('li');
  // Convert to an array
  console.table(items,['className','innerText']);
  Array.from(items).forEach(function(item){
    var itemName = item.firstChild.textContent;
    if(itemName.toLowerCase().indexOf(text) != -1){
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}


