const express = require('express')
const fs = require('fs')
const processing = require('./templates/sales-processing')
const proc = new processing();
const app = express()
const port = 3000

app.get('/faktura', (req, response) => {
    fs.readFile("templates/sales.html", function (err, data) {
        data = proc.addDates(data);

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
     });
    //res.sendFile('templates/sales/sales.html', { root: __dirname });
    //res.send('Hello World!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

