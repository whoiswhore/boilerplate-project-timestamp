// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date', (req, res) => {
  const { date } = req.params;

  let inputDate;
  if (!isNaN(date)) {
    // If it's a number, assume it's a timestamp
    inputDate = new Date(parseInt(date));
  } else {
    // Otherwise, assume it's a date string
    inputDate = new Date(date);
  }

  if (isNaN(inputDate.getTime())) {
    // Invalid date
    return res.json({ error: 'Invalid date' });
  }

  const output = {
    unix: inputDate.getTime(),
    utc: inputDate.toUTCString(),
  };

  res.json(output);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
