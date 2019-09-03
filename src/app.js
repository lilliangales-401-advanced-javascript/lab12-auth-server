'use strict';

// 3rd Party Resources
const express = require('express'); //gives r.body as a json object
const cors = require('cors');
const morgan = require('morgan');
//urlencoded 

// Esoteric Resources
const errorHandler = require( './middleware/error.js');
const notFound = require( './middleware/404.js' );
const authRouter = require( './auth/router.js' );

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use(authRouter);

app.use('/docs', express.static('./docs')); //jsdoc

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
