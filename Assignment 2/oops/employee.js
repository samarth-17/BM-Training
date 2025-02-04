class employee{
    constructor(name , id , salary ){
        this.name=name
        this.id=id
        this.#salary=salary

    }
    #salary;

    getsalary(){
        return this.#salary;
    }

    calculatebonus(){
        return this.getsalary*0.05
}
}

class manager extends employee{
    calculatebonus(){
        return this.getsalary()*0.1  //10% for managers
    }
}

class engineer extends employee{
    calculatebonus(){
        return this.getsalary()*0.15 
    }
}

class intern extends employee{
    calculatebonus(){
        return 500;
    }
}

const Manager=new manager("Sam",101,100000)
const Engineer=new manager("john",102,2000)
const Intern=new manager("lee",103,15000)

console.log(`${Manager.name} Bonus : $${Manager.calculatebonus()}`)
