let obj = {num:5};
function addNums(a,b,c){
    console.log(this.num + a + b + c);
}
let arr=[1,2,3];
addNums.call(obj,1,2,3);
addNums.apply(obj ,arr);

let bound = addNums.bind(obj,1);
bound(2,3);

let student1 = {age:22};
let student2 = {age:25};

function printAge()
{
    console.log(this.age);
}

printAge.call(student2);