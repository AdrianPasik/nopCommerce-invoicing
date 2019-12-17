const express = require('express')
const fs = require('fs')
const processing = require('./templates/sales-processing')
const proc = new processing();
const app = express()
const port = 3000

let infoProperties = {
    "sell-date": "33/10/2019"
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

