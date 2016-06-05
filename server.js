const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/quotes', (req, res) => {
  console.log("Hits /quotes endpoint");
});

app.listen(3000, function() {
  console.log('Example app listening');
});
