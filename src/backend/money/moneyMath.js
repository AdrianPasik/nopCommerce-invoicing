const currency = require('../external/currency.min.js')

class MoneyMath {
    static Add(first, second) {
        return currency(first).add(second).value;
    }

    static Substract(first, second) {
        return currency(first).subtract(second).value;
    }

    static Multiply(first, second) {
        return currency(first).multiply(second).value;
    }

    static Divide(first, second) {
        return currency(first).divide(second).value;
    }
}

module.exports = MoneyMath;
