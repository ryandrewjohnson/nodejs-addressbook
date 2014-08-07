define(function (require) {
    var $ = require('jquery'),
        User = require('models/user'),
        RegisterView = require('views/register');

    var userModel = new User();

    $(function () {
        var registerView = new RegisterView({
            model: userModel
        });
    });
});