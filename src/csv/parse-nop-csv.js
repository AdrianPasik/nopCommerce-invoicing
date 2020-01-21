const parse = require('csv-parse/lib/sync')
const fs = require('fs');

var contents = fs.readFileSync('C:\\praca\\orders.csv', 'utf8');


class ParseNopCsv {
	static getInvoicesSync(csvContent) {
		const records = parse(contents, {
			delimiter: ","
		  })

		if (records.lenght == 0 || records.lenght == 1) {
			return { };
		}


		return records;
	}
}

var records = ParseNopCsv.getInvoicesSync(contents);

module.exports = ParseNopCsv;

