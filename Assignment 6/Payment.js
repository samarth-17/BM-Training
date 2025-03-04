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
var Payment = /** @class */ (function () {
    function Payment(amount, date) {
        this.amount = amount;
        this.date = date;
    }
    Payment.prototype.processPayment = function () {
        throw new Error("processPayment method must be implemented in subclasses");
    };
    return Payment;
}());
var CreditCardPayment = /** @class */ (function (_super) {
    __extends(CreditCardPayment, _super);
    function CreditCardPayment(amount, date, cardNumber, cardHolderName) {
        var _this = _super.call(this, amount, date) || this;
        _this.cardNumber = cardNumber;
        _this.cardHolderName = cardHolderName;
        return _this;
    }
    CreditCardPayment.prototype.processPayment = function () {
        console.log("Processing credit card payment...");
    };
    return CreditCardPayment;
}(Payment));
var PayPalPayment = /** @class */ (function (_super) {
    __extends(PayPalPayment, _super);
    function PayPalPayment(amount, date, paypalEmail) {
        var _this = _super.call(this, amount, date) || this;
        _this.paypalEmail = paypalEmail;
        return _this;
    }
    PayPalPayment.prototype.processPayment = function () {
        console.log("Processing PayPal payment...");
    };
    return PayPalPayment;
}(Payment));
var CryptoPayment = /** @class */ (function (_super) {
    __extends(CryptoPayment, _super);
    function CryptoPayment(amount, date, cryptoAddress) {
        var _this = _super.call(this, amount, date) || this;
        _this.cryptoAddress = cryptoAddress;
        return _this;
    }
    CryptoPayment.prototype.processPayment = function () {
        console.log("Processing crypto payment...");
    };
    return CryptoPayment;
}(Payment));
var creditCardPayment = new CreditCardPayment(100, "2025-02-05", "1234-5678-9876", "John Doe");
creditCardPayment.processPayment();
var payPalPayment = new PayPalPayment(50, "2025-02-05", "john@example.com");
payPalPayment.processPayment();
var cryptoPayment = new CryptoPayment(200, "2025-02-05", "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
cryptoPayment.processPayment();
