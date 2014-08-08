define(function (require) {
    var $ = require('jquery'),
        Contacts = require('models/contact').collection,
        ContactsView = require('views/contacts');


    $(function () {
        // initialize contacts collection passing in user id from server
        var contacts = new Contacts([], {user_id: $('#user_id').val()});

        var contactsView = new ContactsView({
            el: $('.contacts'),
            collection: contacts
        });
    });
});