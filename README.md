# lab12-auth-server

## Project Name
Auth-Server

### Author: Student/Group Name
Hanna Alemu
Lillian Gales
Eric Huang
Lyndsey Thomas 

### Mongo DB URL
mongodb://localhost:27017/

### Common npm Scripts
 "lint": "eslint \"**/*.js\"",  
   "start": "node index.js",  
   "test": "jest --verbose --coverage",  
   "test-watch": "jest --watchAll --verbose --coverage",  
   "jsdoc": "jsdoc -c ./docs/config/jsdoc.config.json",  
   "startDB": "mkdir -p ./.db && mongod --dbpath ./.db"

### For JS DOCS
[Leyla's Guide to JSDocs](https://docs.google.com/document/d/1ifvEDvWpdaCO3AtY6P2KBdDvHaG2GkWpfTFIHBx8BoE/edit?usp=sharing)
* for your server file: app.use('/docs', express.static('./docs'));

### Links and Resources
* [submission PR](https://github.com/lilliangales-401-advanced-javascript/lab12-auth-server/pull/5)
* [travis](n/a for this lab)
* [back-end](http://xyz.com) (when applicable)
* [front-end](http://xyz.com) (when applicable)

#### Documentation
* [api docs](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/) (API servers)
* [jsdoc](http://localhost:8080/docs) (Server assignments)
* [styleguide](n/a for this lab) (React assignments)

### Modules

#### `modulename.js`

##### Exported Values and Methods

###### `foo(thing) -> string`
Usage Notes or examples

###### `bar(array) -> array`
Usage Notes or examples

### Setup

#### `.env` requirements
* `PORT` - Port Number
* `MONGODB_URI` - URL to the running mongo instance/db

#### Running the app
* `npm start`
* Endpoint: 
  * Returns a JSON object with abc in it.
* Endpoint: 
  * Returns a JSON object with xyz in it.
  
#### Tests
* How do you run tests?
* What assertions were made?
* What assertions need to be / should be made?

#### UML
Link to an image of the UML for your application and response to events

jsdoc: http://localhost:8080/docs/