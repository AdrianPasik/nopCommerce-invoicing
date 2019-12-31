const express = require('express')
const fs = require('fs')
const processing = require('./templates/sales-processing')
const proc = new processing();
const app = express()
const port = 3000

let infoProperties = {
    "sell-date": "33/10/2019",
    "place-of-issue": "Warszawa",
    "issue-date": "33/10/2019",
    "original-copy": "Oryginał",
    "seller-info-1": "1 line",
    "seller-info-2": "2 line",
    "seller-info-3": "3 line",
    "seller-info-4": "4 line",
    "seller-info-5": "5 line",
    "seller-info-6": "6 line",
    "seller-info-7": "7 line",
    "seller-info-8": "8 line",
    "buyer-info-1": "1 line",
    "buyer-info-2": "2 line",
    "buyer-info-3": "3 line",
    "buyer-info-4": "4 line",
    "buyer-info-5": "5 line",
    "buyer-info-6": "6 line",
    "buyer-info-7": "7 line",
    "buyer-info-8": "8 line",
    "payment-amount": "125 zł",
    "payment-amount-words": "sto dwadzieścia pięć",
    "payment-way": "Przelew",
    "payment-delay-period": "30 dni",
    "payment-bank-account": "54 5454545454",
    "payment-swift-code": "INGBPLPW",
    "name-surname-authorized-to-receive-invoice-line1": "Imię i nazwisko osoby uprawnionej",
    "name-surname-authorized-to-receive-invoice-line2": "do odbioru faktury VAT"
};

let valuesAndTaxes = 
    [{
        "lp": "1",
        "name": "name ",
        "quantity": "1",
        "unit-of-measure": "godz",
        "net-price": "5,00",
        "vat-rate": "23",
        "vat-amount": "1,15",
        "gross-amount": "6,15"

    }   
    ];

let totalSum = [{
        "grand-total-caption": "RAZEM",
        "grand-total-net": "5,00",
        "grand-total-vat": "1,15",
        "grand-total-gross": "6,15"
    },
    {
        "grand-total-caption": "W tym",
        "grand-total-net": "5,00",
        "grand-total-vat": "1,15",
        "grand-total-gross": "6,15"
    }
];



app.get('/faktura', (req, response) => {
    fs.readFile("templates/sales.html", function (err, data) {
        for (var prop in infoProperties) {
            if (infoProperties.hasOwnProperty(prop)) {
                data = data.toString().replace("{{" + prop + "}}", infoProperties[prop]);
            }
        }

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
     });
    //res.sendFile('templates/sales/sales.html', { root: __dirname });
    //res.send('Hello World!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

