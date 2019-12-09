const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.get('/faktura', (req, response) => {
    fs.readFile("templates/sales/sales.html", function (err, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
     });
    //res.sendFile('templates/sales/sales.html', { root: __dirname });
    //res.send('Hello World!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))