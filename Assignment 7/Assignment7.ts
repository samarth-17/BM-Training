//task 1  Employee
interface Employee{
    id:number;
    name:string;
    position:string;
    salary:number;
}

interface Manager extends Employee{
    teamsize:number
}

class Department{
    private employees : Employee[]=[];

    addEmployee(employee:Employee):void {
        this.employees.push(employee);    
    }

    removeEmployee(id:number):void{
        this.employees=this.employees.filter(e=>e.id!==id);
    }

    listEmployee():void{
        this.employees.forEach(e=>{
            console.log(`id : ${e.id} , name : ${e.name}`);
        });
    }
    
    getTotalSalary():number{
        return this.employees.reduce((acc , e)=> acc + e.salary , 0);
    }
}

const dept = new Department();
dept.addEmployee({ id: 1, name: "sam", position: "intern", salary: 80000 });
dept.addEmployee({ id: 2, name: "avy", position: "Manager", salary: 100000 });

console.log("Employees before:");
dept.listEmployee();

dept.removeEmployee(1); 

console.log("Employees after removal:");
dept.listEmployee();

console.log("Total Salary:", dept.getTotalSalary());

/* OUTPUT
Employees before:
id : 1 , name : sam
id : 2 , name : avy
Employees after removal:
id : 2 , name : avy
Total Salary: 100000
*/


// Task : Generic Storage
class genericStorage<T>{
    arr : T[]=[]

    add(arr : T):void{
        this.arr.push(arr);
    }

    remove(arr:T):void{
        this.arr = this.arr.filter(e => e !== arr);
    }

    getAll():T[] {
        return this.arr;
    }

    
}
const items = new genericStorage<number>();
items.add(80);
items.add(20);
items.add(40);
items.remove(20)
console.log(items.getAll()); 


//output
// [ 80, 40 ]


//Task :  Utility function
const updateSalary = <T extends Employee>(employee: T, newSalary: number): T => ({
    ...employee,
    salary: newSalary
});

const emp1: Employee = { id: 1, name: "ash", position: "Software Engineer", salary: 60000 };

console.log("Before Salary:",emp1);


const updatedEmp1 = updateSalary(emp1, 75000);

console.log("Updated Salary:", updatedEmp1);

/*
output
Before Salary: { id: 1, name: 'ash', position: 'Software Engineer', salary: 60000 }
Updated Salary: { id: 1, name: 'ash', position: 'Software Engineer', salary: 75000 }*/


export{}