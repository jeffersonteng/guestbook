const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// Extract data from form element and adds them onto the body
// property of the request object. Note: This must be before CRUD handlers.
app.use(bodyParser.urlencoded({extended: true}));

// Start server on successful db connection
var url = 'mongodb://' + process.env.MLAB_DB_USER + ':' + process.env.MLAB_DB_PASS + '@ds023603.mlab.com:23603/jteng-todo-app';

var db;

MongoClient.connect(url, (err, database) => {
  if (err) {
    return console.log(err);
  }
  db = database;
  app.listen(3000, function() {
    console.log('Example app listening');
  });
});

// API Handlers

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/db', (req, res) => {
  console.log(process.env);
  res.send('Nice try buddy');
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('saved a quote to the database');
    res.redirect('/');
  });
  console.log(req.body);
});

