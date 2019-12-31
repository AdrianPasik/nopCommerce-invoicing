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
    "buyer-info-8": "8 line"

}

app.get('/faktura', (req, response) => {
    fs.readFile("templates/sales.html", function (err, data) {
        for(var prop in infoProperties) {
            if(infoProperties.hasOwnProperty(prop)) {
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

