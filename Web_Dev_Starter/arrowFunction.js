class student{
    static count = 0;
    constructor(name,age,phoneno,marks){
        this.name = name;
        this.age = age;
        this.phoneno = phoneno;
        this.marks = marks;
        student.count++;
    }
    set_minimum_age(minAge)
    {
        return (minMarks) =>{
            if(this.age>minAge && this.marks>minMarks)
            {
                console.log("Eligible");
            }
            else{
                console.log("not Eligible");
            }

        }
    }
}

let stud1 = new student('leon',22,7875,85);
let stud2 = new student('jack',23,7875,35);
let stud3 = new student('jill',24,7875,40);
let stud4 = new student('john',25,7875,55);
let stud5 = new student('yoel',26,7875,75);

stud4.set_minimum_age(23)(40);