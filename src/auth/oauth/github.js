'use strict';

const superagent = require('superagent');
const Users = require('../users-model.js');

const API = 'https://lab12-auth.herokuapp.com/';
const git = 'https://github.com/login/oauth/access_token';
const SERVICE = 'https://api.github.com/user';

/**
 * @param {object} request 
 * authorizes post from OAuth GitHub
 */
let authorize = (request) => {

  console.log('(1)', request.query.code);

  return superagent.post(git)
    .type('form')
    .send({
      code: request.query.code, //the code we get back
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.SECRET,
      redirect_uri: `${API}/oauth`,
      //grant_type: 'authorization_code', //standard auth code
    })
    .then( response => {
      let access_token = response.body.access_token;
      console.log('(2)', response.body, access_token); //TODO: REMOVE THIS CONSOLE.LOG IN FUTURE
      return access_token;
    })
    .then(token => {
      console.log(SERVICE, token);
      return superagent.get(SERVICE) //using token to communicate back with github 
        .set('Authorization', `token ${token}`)
        .then( response => {
          let user = response.body;
          console.log('(3)', user);
          return user;
        });
    })
    .then( oauthUser => {
      console.log('(4) Create Our Account', oauthUser.email);
      return Users.createFromOauth(oauthUser.email);
    })
    .then( actualUser => {
      return actualUser.generateToken();
    })
    .catch( error => error );
};


module.exports = authorize;
