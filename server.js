const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// Extract data from form element and adds them onto the body
// property of the request object. Note: This must be before CRUD handlers.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.static('public'));

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
  db.collection('quotes').find().toArray( (err, result) => {
    console.log(result);
    res.render('index.ejs', {quotes: result});
  });
});

app.get('/db', (req, res) => {
  console.log(process.env);
  res.send('Nice try buddy');
});

app.put('/quotes', (req, res) => {
  console.log("id: " + req.body.id + " name: " + req.body.name + " quote: " + req.body.quote);
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

