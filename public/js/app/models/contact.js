define(function (require) {
    var $        = require('jquery'),
        Backbone = require('backbone');


    var Contact = Backbone.Model.extend({
        idAttribute: '_id'
    });


    var ContactCollection = Backbone.Collection.extend({
        model: Contact,
        url: '/addressbook/api/v0.1/user/:user_id/contacts',

        initialize: function(models, options) {
            this.url = this.url.replace(':user_id', options.user_id);
        }
    });


    return {
        collection: ContactCollection,
        model: Contact
    };
});