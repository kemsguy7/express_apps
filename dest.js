const person = 
{
    name : 'Matthew',
    age: 29,
    greet() {
        console.log('Hi, I am ' + this.name);
    }
};

const printName = ({name}) => {
    console.log(name);
}
printName(person); 


// object destructuring
const { name, age } = person;
console.log(name, age )

//Array dest
const sports = ['basketball', 'golf'];
const [hobby1, hobby2] = sports;
console.log(hobby1, hobby2);



