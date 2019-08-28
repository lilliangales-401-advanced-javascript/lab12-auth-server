'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./users-model.js');
const auth = require('./middleware.js');
const oauth = require('./oauth/github.js'); //github

/**
 * This is a route to /signup books
 * @route POST /signup
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {object} 200 -  new User and generateToken()
 */
authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then( (user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    }).catch(next);
});

/**
 * This is a route to post to /signin for new user
 * @route POST /signin
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {object} 200 -  authentication and token check
 */
authRouter.post('/signin', auth, (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

/**
 * This is a route to get /OAuth 
 * @route GET /oauth
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {object} 200 -  sends request, responds token
 */
//router OAuth
authRouter.get('/oauth', (req,res,next) => {
  oauth(req)
    .then( token => {
      res.status(200).send(token);
    })
    .catch(next);
});

module.exports = authRouter;
