const tap = require('tap');
const moneyHandler = require('../src/money/moneyHandler');

tap.equal(moneyHandler.Add(12, 12), 24);
tap.equal(moneyHandler.Substract(12, 12), 0);
tap.equal(moneyHandler.Multiply(2, 2), 4);
tap.equal(moneyHandler.Divide(4, 2), 2);

tap.equal(moneyHandler.Add(12.1, 12.12), 24.22);
tap.equal(moneyHandler.Substract(12.3, 12.1), 0.2);
tap.equal(moneyHandler.Multiply(2.2, 2.3), 5.06);
tap.equal(moneyHandler.Divide(5.06, 2.3), 2.2);

