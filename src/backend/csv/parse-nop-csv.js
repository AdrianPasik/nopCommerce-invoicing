const parse = require('csv-parse/lib/sync')
const invoiceCalculator = require('../money/invoice-calculator')
const fs = require('fs');
const moneyMath = require('../money/moneyMath');

class ParseNopCsv {
	static parseInvoices(orderCSV) {
		const orderRecords = this.parseCSV(orderCSV);

		if (orderRecords.lenght == 0 || orderRecords.lenght == 1) {
			return { };
		}

		return this.getEntities(orderRecords);
	}

	static parseCSV(rawCSV) {
		return parse(rawCSV, {
			delimiter: ","
		  });
	}

	static getEntities(orderRecordsArray) {
		// take order
		
		let entities = [];
		let titleRowFound = false;
		let rowsMoved = 1;
		for(var i = 1; i < orderRecordsArray.length; i+=rowsMoved) {
			if(orderRecordsArray[i][0] == "") {
				throw "Something went wrong with parsing logic"
			}

			let entity = {};
			// z is on 26th place in excel file
			entity["guid"] = orderRecordsArray[i][2];
			entity["sell-date"] = this.fromOADate(orderRecordsArray[i][29]);
			entity["place-of-issue"] = "";
			entity["issue-date"] = entity["sell-date"];
			entity["original-copy"] = "";
			entity["seller-info-1"] = " ";
			entity["seller-info-2"] = orderRecordsArray[i][33];
			entity["seller-info-3"] = orderRecordsArray[i][30] + " " + orderRecordsArray[i][31];

			let j = i + 1; // + 1 for order details column names which we need to skip
			while(j < orderRecordsArray.length) {
				if(orderRecordsArray[j][0] != "") {
					break;
				}
				entity["valuesAndTaxes"] = [];
				//let netPrice = invoiceCalculator.calculateNet(orderRecordsArray[j][5], configuration.vatRate);
				//let netValue = moneyMath.Multiply(netPrice, orderRecordsArray[j][6]);
				entity["valuesAndTaxes"].push({
					"id": 1,
					"name": orderRecordsArray[j][2],
					"quantity": orderRecordsArray[j][6],
					"unit-of-measure": "",
					"net-price": "",
					"net-value": "", //moneyMath.Multiply(netPrice, orderRecordsArray[j][6]),
					"vat-rate": "",
					"vat-amount": "",// invoiceCalculator.calculateVat(netValue, configuration.vatRate),
					"gross-amount": orderRecordsArray[j][5]
				});
				j++;
			}

			entities.push(entity);

			rowsMoved = j - i;
		}

		return entities;
		
	}

	static fromOADate(dateAsFloat) {
		var date = new Date(((dateAsFloat - 25569) * 86400000));
		var tz = date.getTimezoneOffset();
		return new Date(((dateAsFloat - 25569 + (tz / (60 * 24))) * 86400000));
	}
}


module.exports = ParseNopCsv;

