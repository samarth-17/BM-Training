class Vehicle {
    constructor(public brand: string, public model: string, public rentperday: number) {}

    calrentperday(days: number): number {
        return this.rentperday * days;
    }
}

class Car extends Vehicle {
    constructor(brand: string, model: string, rentperday: number) {
        super(brand, model, rentperday);
    }

    // Car has an extra $300 charge
    calrentperday(days: number): number {
        return super.calrentperday(days) + 300;
    }
}

class Bike extends Vehicle {
    constructor(brand: string, model: string, rentperday: number) {
        super(brand, model, rentperday);
    }

    // Bike has $50 for maintenance
    calrentperday(days: number): number {
        return super.calrentperday(days) + 50;
    }
}

class Truck extends Vehicle {
    constructor(brand: string, model: string, rentperday: number) {
        super(brand, model, rentperday);
    }

    calrentperday(days: number): number {
        return days > 3 ? super.calrentperday(days) + 500 : super.calrentperday(days);
    }
}

const myCar = new Car("Toyota", "Camry", 60);
console.log(`${myCar.brand} ${myCar.model} Rental Cost for 5 days: $${myCar.calrentperday(5)}`);

const myBike = new Bike("Yamaha", "MT-15", 20);
console.log(`${myBike.brand} ${myBike.model} Rental Cost for 6 days: $${myBike.calrentperday(6)}`);

const myTruck = new Truck("Volvo", "FH16", 100);
console.log(`${myTruck.brand} ${myTruck.model} Rental Cost for 4 days: $${myTruck.calrentperday(4)}`);

export {};
