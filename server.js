const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Extract data from form element and adds them onto the body
// property of the request object. Note: This must be before CRUD handlers.
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/quotes', (req, res) => {
  console.log(req.body);
});

app.listen(3000, function() {
  console.log('Example app listening');
});
