define(function (require) {
    var $ = require('jquery'),
        Backbone = require('backbone');

    var RegisterView = Backbone.View.extend({
        el: '#register-user',
        events: {
            'submit form': 'onFormSubmit'
        },
        initialize: function (options) {
            this.listenTo(this.model, 'error', this.onError);

            this.$errorMsg = this.$('.register__error');
        },
        onFormSubmit: function (evt) {
            evt.preventDefault();

            this.model.save({
                username: this.$('input[name="username"]').val(),
                password: this.$('input[name="password"]').val()
            },
            {
                success: function (data) {
                    window.location = '/login?registered=1'
                }
            });
        },
        onError: function (e, response) {
            this.$errorMsg.text(response.responseJSON.error.message).show();
        }
    });

    return RegisterView;
});