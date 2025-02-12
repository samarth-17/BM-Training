"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Employee = /** @class */ (function () {
    function Employee(name, id, salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    Employee.prototype.getsalary = function () {
        return this.salary;
    };
    Employee.prototype.calculatebonus = function () {
        return this.getsalary() * 0.05;
    };
    return Employee;
}());
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Manager.prototype.calculatebonus = function () {
        return this.getsalary() * 0.15;
    };
    return Manager;
}(Employee));
var Engineer = /** @class */ (function (_super) {
    __extends(Engineer, _super);
    function Engineer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Engineer.prototype.calculatebonus = function () {
        return this.getsalary() * 0.15;
    };
    return Engineer;
}(Employee));
var Intern = /** @class */ (function (_super) {
    __extends(Intern, _super);
    function Intern() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Intern.prototype.calculatebonus = function () {
        return 500;
    };
    return Intern;
}(Employee));
var manager = new Manager("Sam", 101, 100000);
var engineer = new Engineer("john", 102, 2000);
var intern = new Intern("lee", 103, 15000);
console.log("".concat(manager.name, " Bonus : $").concat(manager.calculatebonus()));
console.log("".concat(intern.name, " Bonus : $").concat(intern.calculatebonus()));
