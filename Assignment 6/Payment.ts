class Payment {
    constructor(public amount: number, public date: string) {}

    processPayment(): void {
        throw new Error("processPayment method must be implemented in subclasses");
    }
}

class CreditCardPayment extends Payment {
    private cardNumber: string;
    private cardHolderName: string;

    constructor(amount: number, date: string, cardNumber: string, cardHolderName: string) {
        super(amount, date);
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
    }

    processPayment(): void {
        console.log("Processing credit card payment...");
    }
}

class PayPalPayment extends Payment {
    private paypalEmail: string;

    constructor(amount: number, date: string, paypalEmail: string) {
        super(amount, date);
        this.paypalEmail = paypalEmail;
    }

    processPayment(): void {
        console.log("Processing PayPal payment...");
    }
}

class CryptoPayment extends Payment {
    private cryptoAddress: string;

    constructor(amount: number, date: string, cryptoAddress: string) {
        super(amount, date);
        this.cryptoAddress = cryptoAddress;
    }

    processPayment(): void {
        console.log("Processing crypto payment...");
    }
}


const creditCardPayment = new CreditCardPayment(100, "2025-02-05", "1234-5678-9876", "John Doe");
creditCardPayment.processPayment();

const payPalPayment = new PayPalPayment(50, "2025-02-05", "john@example.com");
payPalPayment.processPayment();

const cryptoPayment = new CryptoPayment(200, "2025-02-05", "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
cryptoPayment.processPayment();

export {};
