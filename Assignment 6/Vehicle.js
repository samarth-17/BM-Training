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
var Vehicle = /** @class */ (function () {
    function Vehicle(brand, model, rentperday) {
        this.brand = brand;
        this.model = model;
        this.rentperday = rentperday;
    }
    Vehicle.prototype.calrentperday = function (days) {
        return this.rentperday * days;
    };
    return Vehicle;
}());
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(brand, model, rentperday) {
        return _super.call(this, brand, model, rentperday) || this;
    }
    // Car has an extra $300 charge
    Car.prototype.calrentperday = function (days) {
        return _super.prototype.calrentperday.call(this, days) + 300;
    };
    return Car;
}(Vehicle));
var Bike = /** @class */ (function (_super) {
    __extends(Bike, _super);
    function Bike(brand, model, rentperday) {
        return _super.call(this, brand, model, rentperday) || this;
    }
    // Bike has $50 for maintenance
    Bike.prototype.calrentperday = function (days) {
        return _super.prototype.calrentperday.call(this, days) + 50;
    };
    return Bike;
}(Vehicle));
var Truck = /** @class */ (function (_super) {
    __extends(Truck, _super);
    function Truck(brand, model, rentperday) {
        return _super.call(this, brand, model, rentperday) || this;
    }
    Truck.prototype.calrentperday = function (days) {
        return days > 3 ? _super.prototype.calrentperday.call(this, days) + 500 : _super.prototype.calrentperday.call(this, days);
    };
    return Truck;
}(Vehicle));
var myCar = new Car("Toyota", "Camry", 60);
console.log("".concat(myCar.brand, " ").concat(myCar.model, " Rental Cost for 5 days: $").concat(myCar.calrentperday(5)));
var myBike = new Bike("Yamaha", "MT-15", 20);
console.log("".concat(myBike.brand, " ").concat(myBike.model, " Rental Cost for 6 days: $").concat(myBike.calrentperday(6)));
var myTruck = new Truck("Volvo", "FH16", 100);
console.log("".concat(myTruck.brand, " ").concat(myTruck.model, " Rental Cost for 4 days: $").concat(myTruck.calrentperday(4)));
