define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');


    var ContactFormView = Backbone.View.extend({
        events: {
            'click .contact__submitBtn': 'onContactSubmit',
            'click .contact__cancelBtn': 'onCancel'
        },
        tagName: 'tr',

        initialize: function (options) {
            this.render();
        },
        render: function () {
            var html = _.template($('#contact-template').html(), {});
            this.$el.html(html);
                       
            return this;
        },
        onContactSubmit: function (evt) {
            evt.preventDefault();

            var self = this;
            this.collection.create({
                name: {
                    givenName: this.$('input[name="givenName"]').val(),
                    familyName: this.$('input[name="familyName"]').val(),
                },
                email: this.$('input[name="email"]').val(),
                address: {
                    city: this.$('input[name="city"]').val(),
                    street: this.$('input[name="street"]').val(),
                    region: this.$('input[name="region"]').val(),
                    postcode: this.$('input[name="postcode"]').val(),
                    country: this.$('input[name="country"]').val()
                }
            },
            {
                success: function () {
                    self.remove();
                },
                wait: true
            });
        },
        onCancel: function () {
            console.log('remove');
            this.remove();
        }
    });
    

    var ContactView = Backbone.View.extend({
        events: {
            'click .contact__deleteBtn': 'onDelete'
        },

        initialize: function (options) {
        },
        render: function () {                       
            return this;
        },
        onDelete: function () {
            this.model.destroy({wait: true});
            this.collection.remove(this.model);
        }
    });


    var ContactsView = Backbone.View.extend({
        events: {
            'click .contacts_addBtn': 'onAddContactClick'
        },

        initialize: function (options) {
            this.$contactContainer = this.$('.contacts__listing');
            this.$addContainer = this.$('.contacts__addContainer');

            this.listenToOnce(this.collection, 'sync', this.onInitialSync);
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'remove', this.render);
            this.listenTo(this.collection, 'error', this.onError);
            
            this.collection.fetch({reset: true});
        },
        render: function () {
            var html = _.template($('#contacts-template').html(), {contacts: this.collection.toJSON()});
            this.$contactContainer.html(html);

            $('.contacts__empty').toggle((this.collection.length <= 0));
                       
            return this;
        },
        addAll: function () {
            this.collection.each(this.addOne, this);
        },
        addOne: function (contact) {
            new ContactView({
                el: this.$contactContainer.find('[data-contactid="'+contact.id+'"]'),
                model: contact,
                collection: this.collection
            });
        },
        onAddContactClick: function () {
            var contactForm = new ContactFormView({
                model: false,
                collection: this.collection
            });
            this.$contactContainer.append(contactForm.$el);
        },
        onInitialSync: function (model, options) {
            this.render().addAll();
        },
        onError: function (e, response) {
            console.log('error', e, response);
        }
    });

    return ContactsView;
});