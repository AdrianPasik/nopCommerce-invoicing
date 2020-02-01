const parse = require('csv-parse/lib/sync')
const invoiceCalculator = require('../money/invoice-calculator')
const fs = require('fs');
const moneyMath = require('../money/moneyMath');

class ParseNopCsv {
	static getInvoicesSync(orderCSV, configuration) {
		const orderRecords = this.parseCSV(orderCSV);

		if (orderRecords.lenght == 0 || orderRecords.lenght == 1) {
			return { };
		}
		let orderCollection = [];

		orderCollection.push(this.getEntities(orderRecords, configuration));

		return orderCollection;
	}

	static parseCSV(rawCSV) {
		return parse(rawCSV, {
			delimiter: ","
		  });
	}

	static getEntities(orderRecordsArray, configuration) {
		if(!configuration.vatRate) {
			configuration.vatRate = 23;
		}
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
			entity["sell-date"] = this.fromOADate(orderRecordsArray[i][29]);
			entity["place-of-issue"] = configuration.City;
			entity["issue-date"] = entity["sell-date"];
			entity["original-copy"] = configuration.OriginalOrCopy;
			entity["seller-info-1"] = " ";
			entity["seller-info-2"] = orderRecordsArray[i][33];
			entity["seller-info-3"] = orderRecordsArray[i][30] + " " + orderRecordsArray[i][31];

			let j = i + 1; // + 1 for order details column names which we need to skip
			while(j < orderRecordsArray.length) {
				if(orderRecordsArray[j][0] != "") {
					break;
				}
				entity["valuesAndTaxes"] = [];
				let netPrice = invoiceCalculator.calculateNet(orderRecordsArray[j][5], configuration.vatRate);
				let netValue = moneyMath.Multiply(netPrice, orderRecordsArray[j][6]);
				entity["valuesAndTaxes"].push({
					"id": 1,
					"name": orderRecordsArray[j][2],
					"quantity": orderRecordsArray[j][6],
					"unit-of-measure": configuration.pieces,
					"net-price": netPrice,
					"net-value": moneyMath.Multiply(netPrice, orderRecordsArray[j][6]),
					"vat-rate": configuration.vatRate,
					"vat-amount": invoiceCalculator.calculateVat(netValue, configuration.vatRate),
					"gross-amount": orderRecordsArray[j][5]
				});
				j++;
			}
			this.calculateTotals(entity)

			entities.push(entity);

			rowsMoved = j - i;
		}

		return entities;
		
	}

	static calculateTotals(entity, parsedRow) {

	}

	static fromOADate(dateAsFloat) {
		var date = new Date(((dateAsFloat - 25569) * 86400000));
		var tz = date.getTimezoneOffset();
		return new Date(((dateAsFloat - 25569 + (tz / (60 * 24))) * 86400000));
	}
}


module.exports = ParseNopCsv;

