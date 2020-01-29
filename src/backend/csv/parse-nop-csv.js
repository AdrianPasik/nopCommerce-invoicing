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
			entity["place-of-issue"] = "Kielce";
			entity["issue-date"] = entity["sell-date"];
			entity["original-copy"] = "Oryginał";
			entity["seller-info-1"] = " ";
			entity["seller-info-2"] = orderRecordsArray[i][33];
			entity["seller-info-3"] = orderRecordsArray[i][30] + " " + orderRecordsArray[i][31];

			// take order details
		}
		
	}

	static fromOADate(dateAsFloat) {
		var date = new Date(((dateAsFloat - 25569) * 86400000));
		var tz = date.getTimezoneOffset();
		return new Date(((dateAsFloat - 25569 + (tz / (60 * 24))) * 86400000));
	}
}


module.exports = ParseNopCsv;

