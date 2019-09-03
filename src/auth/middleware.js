'use strict';

const User = require('./users-model.js');

module.exports = (req, res, next) => {

  try {

    let [authType, authString] = req.headers.authorization.split(/\s+/);
    //split headers based on empty space 

    // BASIC Auth  ... Authorization:Basic ZnJlZDpzYW1wbGU=

    //checking all lowercase to see if matches basic, return _authBasic(authString)
    switch(authType.toLowerCase()) {
      //makes authType, authString -- if basic: is User/Pass -- if token: token?  
      case 'basic':
        return _authBasic(authString); //
      default:
        return _authError(); //anything other than basic will hit this _authError
    }

  } catch(e) {
    return _authError();
  }

  function _authBasic(authString) {
    let base64Buffer = Buffer.from(authString,'base64'); // <Buffer 01 02...>
    let bufferString = base64Buffer.toString(); //encoded value to string (john:mysecret)
    let [username,password] = bufferString.split(':');  // variables username="john" and password="mysecret"
    let auth = {username,password};  // {username:"john", password:"mysecret"}
    //HERE is where that 'auth' middleware is generated ***

    //compared pass with hashed pass value from users-model.js and now is returning the authenticated user
    return User.authenticateBasic(auth)
    //users-model.js user.static.authenticateBasic
      .then( user => _authenticate(user) );
  }

  function _authenticate(user) {
    if ( user ) {
      req.user = user;
      req.token = user.generateToken(); //called in users-model.js users.methods.generateToken 
      next(); //this is what actually goes into our route (router.js)
    }
    else {
      _authError();
    }
  }

  function _authError() {
    next({status: 401, statusMessage: 'Unauthorized', message: 'Invalid User ID/Password'});
  }

};

