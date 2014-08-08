define(function (require) {
    var $ = require('jquery'),
        Backbone = require('backbone'),
        Contacts = require('models/contact').collection,
        Contact = require('models/contact').model;

    var ImportView = Backbone.View.extend({
        el: '#import-contacts',
        events: {
            'click .importBtn': 'onImport'
        },
        initialize: function (options) {
           
        },
        onImport: function () {
            var self = this;
            $('input:checked').each(function () {
                var $row = $(this).parents('tr');

                // only include contacts with at least fname,lname, and email
                if (!$row.find('td.fname').is(':empty') > 0 &&
                    !$row.find('td.lname').is(':empty') > 0 &&
                    !$row.find('td.email').is(':empty') > 0) 
                {
                    (function (row) {
                            self.collection.create({
                            name: {
                                givenName: $row.find('td.fname').text(),
                                familyName: $row.find('td.lname').text(),
                            },
                            email: $row.find('td.email').text(),
                            address: {
                                city: $row.find('td.city').text(),
                                street: $row.find('td.street').text(),
                                region: $row.find('td.region').text(),
                                postcode: $row.find('td.postcode').text(),
                                country: $row.find('td.country').text()
                            }
                        },
                        {
                            success: function (data) {
                                row.remove();
                            }
                        });
                    })($row);
                }
            });
        }
    });

    var contacts = new Contacts([], {user_id: $('#user_id').val()});

    var importView = new ImportView({
        collection: contacts
    });
});