'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const path        = require('path');
const helmet      = require('helmet');


const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; 

// app.use('/client/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //USED FOR FCC TESTING PURPOSES ONLY!

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.noCache());
app.use(helmet.hidePoweredBy({setTo: 'PHP 4.2.0'}));

//Index page (static HTML)
app.use(express.static("dist"));

app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/client/public/index.html');
  });

// https://coursework.vschool.io/deploying-mern-with-heroku/
// deploy to Heroku
// app.use(express.static(path.join(__dirname, "client", "build")))

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);
// app.use('/api/books', apiRoutes);
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

// https://coursework.vschool.io/deploying-mern-with-heroku/
// deploy to Heroku
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// })



//Start our server and tests!
app.listen(port, function () {
  console.log("Listening on port " + port);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        var error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 1500);
  }  else if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
  }
});

module.exports = app; //for unit/functional testing
