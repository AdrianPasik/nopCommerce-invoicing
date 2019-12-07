const express = require('express')
const app = express()
const port = 3000

app.get('/faktura', (req, res) => {
    res.sendFile('templates/sales/sales.html', { root: __dirname });
    //res.send('Hello World!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))