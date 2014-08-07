var api     = require('./api'),
    client  = require('./client');  

module.exports = {
    apiBaseUri: '/addressbook/api/v0.1/',
    api: api,
    client: client
};