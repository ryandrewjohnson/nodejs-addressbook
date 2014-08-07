var express         = require('express'),
    api             = require('../api'),
    routeParams     = require('../middleware/routeParams'),
    apiRoutes;


apiRoutes = function (middleware) {
    var router = express.Router();

    // add this middleware check for params
    router.param('user_id', routeParams.user());
    router.param('contact_id', routeParams.contact());

    /**
     * User Routes
     * /POST    - create a new user
     * /GET     - retreive user
     * /PATCH   - update user
     * /DELETE  - delete user
     */
    router.post('/user', api.users.add);
    router.get('/user/:user_id', api.users.get);
    router.patch('/user/:user_id', api.users.update);
    router.delete('/user/:user_id', api.users.destroy);

    /**
     * User Contacts's Routes
     * /GET     - get all contacts associated with a user
     * /POST    - add a new contact to a user
     * /PATCH   - update a contact associated with user
     * /DELETE  - delete a contact associated with user
     */
    router.get('/user/:user_id/contacts', api.contacts.getAll);
    router.post('/user/:user_id/contacts', api.contacts.add);
    router.patch('/user/:user_id/contacts/:contact_id', api.contacts.update);
    router.delete('/user/:user_id/contacts/:contact_id', api.contacts.destroy);
   
    return router;
};


module.exports = apiRoutes;