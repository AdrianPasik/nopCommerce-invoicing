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
        "net-value": "5,00",
        "vat-rate": "23",
        "vat-amount": "1,15",
        "gross-amount": "6,15"

    }   
    ];

const totalSum = [{
        "grand-total-caption": "RAZEM",
        "grand-total-net": "5,00",
        "grand-total-vat-rate": "X",
        "grand-total-vat": "1,15",
        "grand-total-gross": "6,15"
    },
    {
        "grand-total-caption": "W tym",
        "grand-total-net": "5,00",
        "grand-total-vat-rate": "23",
        "grand-total-vat": "1,15",
        "grand-total-gross": "6,15"
    }
];

function applyDataRows(rawHtml) {
    var html = "";
    for (var i = 0; i < valuesAndTaxes.length; i++) {
        var item = valuesAndTaxes[i];
        html += "<tr><td>" + item["lp"] + "</td><td style='width: 70mm;'>" + item["name"] + "</td><td>" + item["quantity"] + "</td><td>" + item["unit-of-measure"] +  "</td><td>" + item["net-price"] + "</td><td>" + item["net-value"] + "</td><td>" + item["vat-rate"] + "</td><td>" + item["vat-amount"] + "</td><td>" + item["gross-amount"] + "</td></tr>"
    }

    rawHtml = rawHtml.toString().replace("{{data-rows}}", html);
    return rawHtml;
}

function applyTotalRows(rawHtml) {
    var html = "";
    for (var i = 0; i < totalSum.length; i++) {
        var item = totalSum[i];
        html += "<tr><td class='no-border'></td><td class='no-border'></td><td class='no-border'></td><td class='no-border'></td><td>" + item["grand-total-caption"] + "</td><td>" + item["grand-total-net"] + "</td><td>" + item["grand-total-vat-rate"] + "</td><td>" + item["grand-total-vat"] + "</td><td>" + item["grand-total-gross"] + "</td></tr>"
    }

    rawHtml = rawHtml.toString().replace("{{total-rows}}", html);
    return rawHtml;
}

app.get('/faktura', (req, response) => {
    fs.readFile("templates/pl-sales-template.html", function (err, data) {
        for (var prop in infoProperties) {
            if (infoProperties.hasOwnProperty(prop)) {
                data = data.toString().replace("{{" + prop + "}}", infoProperties[prop]);
            }
        }
        data = applyDataRows(data);
        data = applyTotalRows(data);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
     });
});

app.post('/fileupload', (req, response) => {
    response.write('file uploaded');
    response.end();
});

app.get('/upload', (req, response) => {
    console.log('reached upload');
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    response.write('<input type="file" name="csvfile"><br>');
    response.write('<input type="submit">');
    response.write('</form>');
    response.end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

