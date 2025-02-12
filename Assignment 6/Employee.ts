class Employee{

    constructor(public name : string , public readonly id : number , private salary : number ){
    }

        getsalary() : number{
        return this.salary;
    }

        calculatebonus() : number{
        return this.getsalary()*0.05;
}

  
}

class Manager extends Employee{
    calculatebonus(): number {
        return this.getsalary()*0.15;
    }
}

class Engineer extends Employee{
    calculatebonus():number{
        return this.getsalary()*0.15 
    }
}

class Intern extends Employee{
    calculatebonus() : number{
        return 500;
    }
}

const manager=new Manager("Sam",101,100000)
const engineer=new Engineer("john",102,2000)
const intern=new Intern("lee",103,15000)

console.log(`${manager.name} Bonus : $${manager.calculatebonus()}`)
console.log(`${intern.name} Bonus : $${intern.calculatebonus()}`)


export{}