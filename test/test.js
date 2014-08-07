var should      = require('should'),
    assert      = require('assert'),
    request     = require('supertest'),
    mongoose    = require('mongoose'),
    User        = require('../server/models').User,
    Contact     = require('../server/models').Contact,
    apiBaseUri  = require('../server/routes').apiBaseUri;

describe('Routing', function() {
    var url = 'http://localhost:3000' + apiBaseUri;
  
    // connect to DB and delete user that we create for test
    before(function(done) {
        mongoose.connect('mongodb://localhost/addressbook');

        User.remove({ 'username' : { $in: ['ryan@myemail.com','donatello@turtles.com'] } }, function (err, result) {
            if (err) { throw err; }

            done();
        });
    });

    describe('User', function() {
        it('should create new user with username and password', function(done) {
            var user = {
                username: 'ryan@myemail.com',
                password: 'password'
            };

            request(url)
            .post('user')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) { throw err; }
          
                res.body.should.have.property('_id');
                res.body.username.should.equal('ryan@myemail.com');
                res.body.password.should.equal('password');
                done();
            });
        });

        it('should return error invalid email', function(done) {
            var user = {
                username: 'myinvalidemail',
                password: 'password'
            };

            request(url)
            .post('user')
            .send(user)
            .expect('Content-Type', /json/)
            .expect(500, done);
        });

        it('should return error invalid user id', function(done) {
            request(url)
            .get('user/sdfsdfsdf')
            .expect('Content-Type', /json/)
            .expect(400, done);
        });

        it('should return error no users found', function(done) {
            request(url)
            .get('user/123456789012345678901234')
            .expect('Content-Type', /json/)
            .expect(404, done);
        });
    });
    

    describe('Contact', function() {
        // dummy contact info
        var contact_id,
            contact = {
            _user: null,
            name: {
                givenName: 'James',
                familyName: 'Bond'
            },
            email: 'james007@email.com',
            address: {
                street: '100 Myroad rd',
                city: 'Toronto',
                region: 'Ontario',
                postcode: 'M4L2L8',
                country: 'Canada',
            }
        };

        // A contact record must be associated with a user
        // this will create a user that can be used for contact routes
        // We also create a contact record to use for patch,delete contact
        before(function(done){
            var newUser = new User({
                username: 'donatello@turtles.com',
                password: 'password'
            });

            newUser.save(function (err, user) {
                if (err) { throw err; }

                contact._user = user._id;

                // This contact will be used for patch,delete contact
                var newContact = new Contact(contact);
                newContact.save(function (err, result) {
                    if (err) { throw err; }

                    contact_id = result._id;
                    done();
                });
            });
        });
        
        it('should create new contact associated with user', function(done) {
            request(url)
            .post('user/'+contact._user+'/contacts')
            .send(contact)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) { throw err; }
          
                res.body.should.have.property('_id');
                res.body.email.should.equal('james007@email.com');               
                done();
            });
        });

        it('should update existing contact', function(done) {
            request(url)
            .patch('user/'+contact._user+'/contacts/'+contact_id)
            .send({
                name: {
                    givenName: 'Mike',
                    familyName: 'Rogers'
                }
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) { throw err; }
          
                res.body.name.givenName.should.equal('Mike');               
                res.body.name.familyName.should.equal('Rogers');               
                done();
            });
        });

        it('should delete existing contact', function(done) {
            request(url)
            .del('user/'+contact._user+'/contacts/'+contact_id)
            .expect('Content-Type', /json/)
            .expect(200, done);
        });
    });

});