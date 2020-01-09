const tap = require('tap')
const calculator = require('../src/invoice-calculator');
tap.equal(calculator.calculateNet(6.15, 23), 5);