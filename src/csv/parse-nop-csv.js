const parse = require('csv-parse/lib/sync')
const fs = require('fs');

class ParseNopCsv {
	static getInvoicesSync(orderCSV) {
		const orderRecords = this.parseCSV(orderCSV);

		if (orderRecords.lenght == 0 || orderRecords.lenght == 1) {
			return { };
		}



		let orderCollection = [];

		orderCollection.push(this.getOneEntity(orderRecords, 0));

		return orderRecords;
	}

	static parseCSV(rawCSV) {
		return parse(rawCSV, {
			delimiter: ","
		  });
	}

	static getOneEntity(orderRecordsArray, indexOfOrder) {
		// take order
		let entity = {};
		let titleRowFound = false;
		for(var i = indexOfOrder; i < orderRecordsArray.length - 1; i++) {
			if(orderRecordsArray[i][0] == "OrderId") {
				if(!titleRowFound) {
					titleRowFound = true;
					continue;
				} else {
					break;
				}
			}
			// z is on 26th place in excel file
			entity["sell-date"] = this.fromOADate(orderRecordsArray[i][29]);
			// take order details
		}
		
	}

	static fromOADate(dateAsFloat) {
		var date = new Date(((dateAsFloat - 25569) * 86400000));
		var tz = date.getTimezoneOffset();
		return new Date(((dateAsFloat - 25569 + (tz / (60 * 24))) * 86400000));
	}
}

var ordersCsv = fs.readFileSync('C:\\praca\\orders.csv', 'utf8');

var x = ParseNopCsv.fromOADate(Number("43797.5599752083"));

var records = ParseNopCsv.getInvoicesSync(ordersCsv);

module.exports = ParseNopCsv;

