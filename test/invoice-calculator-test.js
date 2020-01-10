const tap = require('tap')
const calculator = require('../src/invoice-calculator');
tap.equal(calculator.calculateNet(6.15, 23), 5);
tap.equal(calculator.calculateNet(8.61, 23), 7);
tap.equal(calculator.calculateNet(9.83, 23), 7.99);
tap.equal(calculator.calculateNet(6.15, 23), 5);
tap.equal(calculator.calculateNet(6.15, 23), 5);
tap.equal(calculator.calculateNet(6.15, 23), 5);
tap.equal(calculator.calculateNet(6.15, 23), 5);
tap.equal(calculator.calculateNet(6.15, 23), 5);