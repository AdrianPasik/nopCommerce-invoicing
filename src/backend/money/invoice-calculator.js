const money = require('./moneyMath')

class InvoiceCalculator {
    static calculateNet(gross, vatRate) {
        return money.Divide(gross, (money.Add(1, (money.Divide(vatRate,100)))));
    }

    static calculateVat(net, vatRate) {
        return money.Multiply(net, (money.Add(1, (money.Divide(vatRate,100)))));
    }

    static sumUpValues(invoiceValues) {
        let sum = {
            netSum: 0,
            vatSum: 0,
            grossSum: 0
        }

        if(invoiceValues.length >= 1) {
            sum.netSum = invoiceValues[0]["net-amount"];
            sum.vatSum = invoiceValues[0]["vat-amount"];
            sum.grossSum = invoiceValues[0]["gross-amount"];
        }

        for(var i = 1; i < invoiceValues.length; i++) {
            sum.netSum = money.Add(money.netSum, invoiceValues[i]["net-amount"]);
            sum.vatSum = money.Add(money.vatSum, invoiceValues[i]["vat-amount"]);
            sum.grossSum = money.Add(money.grossSum, invoiceValues[i]["gross-amount"]);
        }

        return sum;
    }

    static sumVatRates(vatRates) {
        
    }


}

module.exports = InvoiceCalculator;