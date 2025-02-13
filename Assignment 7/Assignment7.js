"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Department = /** @class */ (function () {
    function Department() {
        this.employees = [];
    }
    Department.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    Department.prototype.removeEmployee = function (id) {
        this.employees = this.employees.filter(function (e) { return e.id !== id; });
    };
    Department.prototype.listEmployee = function () {
        this.employees.forEach(function (e) {
            console.log("id : ".concat(e.id, " , name : ").concat(e.name));
        });
    };
    Department.prototype.getTotalSalary = function () {
        return this.employees.reduce(function (acc, e) { return acc + e.salary; }, 0);
    };
    return Department;
}());
var dept = new Department();
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
var genericStorage = /** @class */ (function () {
    function genericStorage() {
        this.arr = [];
    }
    genericStorage.prototype.add = function (arr) {
        this.arr.push(arr);
    };
    genericStorage.prototype.remove = function (arr) {
        this.arr = this.arr.filter(function (e) { return e !== arr; });
    };
    genericStorage.prototype.getAll = function () {
        return this.arr;
    };
    return genericStorage;
}());
var items = new genericStorage();
items.add(80);
items.add(20);
items.add(40);
items.remove(20);
console.log(items.getAll());
//output
// [ 80, 40 ]
//Task :  Utility function
var updateSalary = function (employee, newSalary) { return (__assign(__assign({}, employee), { salary: newSalary })); };
var emp1 = { id: 1, name: "ash", position: "Software Engineer", salary: 60000 };
console.log("Before Salary:", emp1);
var updatedEmp1 = updateSalary(emp1, 75000);
console.log("Updated Salary:", updatedEmp1);
