define(function (require) {
    var $ = require('jquery'),
        Backbone = require('backbone');

    var User = Backbone.Model.extend({
        idAttribute: '_id',
        url: '/addressbook/api/v0.1/user'
    });

    return User;
});