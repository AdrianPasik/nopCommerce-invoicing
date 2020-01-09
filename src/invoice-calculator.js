class InvoiceCalculator {
    static calculateNet(gross, vatRate) {
        return gross / (1 + (vatRate / 100));
    }
}

module.exports = InvoiceCalculator;