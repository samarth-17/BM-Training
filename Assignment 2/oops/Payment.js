class Payment {
    constructor(amount, date) {
        this.amount = amount;
        this.date = date;
    }

    processPayment() {
        throw "Payment method processing not implemented!";
    }
}

class CreditCardPayment extends Payment {
    #cardNumber;
    #cardHolderName;

    constructor(amount, date, cardNumber, cardHolderName) {
        super(amount, date);
        this.#cardNumber = cardNumber;
        this.#cardHolderName = cardHolderName;
    }

    processPayment() {
        console.log("Processing credit card payment...");
    }
}

class PayPalPayment extends Payment {
    #paypalEmail;

    constructor(amount, date, paypalEmail) {
        super(amount, date);
        this.#paypalEmail = paypalEmail;
    }

    processPayment() {
        console.log("Processing PayPal payment...");
    }
}

class CryptoPayment extends Payment {
    #cryptoAddress;

    constructor(amount, date, cryptoAddress) {
        super(amount, date);
        this.#cryptoAddress = cryptoAddress;
    }

    processPayment() {
        console.log("Processing crypto payment...");
    }
}


const creditCardPayment = new CreditCardPayment(100, "2025-02-05", "1234-5678-9876", "John Doe");
creditCardPayment.processPayment();

const payPalPayment = new PayPalPayment(50, "2025-02-05", "john@example.com");
payPalPayment.processPayment();

const cryptoPayment = new CryptoPayment(200, "2025-02-05", "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
cryptoPayment.processPayment();
