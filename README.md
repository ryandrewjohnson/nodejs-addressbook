Node.js Address Book
==============

A simple address book demo built on Node.js and MongoDB.

Note: For the love of god don't use this in production!!

## Installing on localhost (Mac)

This assumes that you are working on a Mac.

### 1. Dependencies

You must have the below installed on your machine in order to run this applicaion. If you are missing any of the following please use the provided links to install.

* Install [Node.js with npm](http://nodejs.org/download/)
* Install [MongoDB](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)

To confirm you have successfully installed the above run the follwoing commands:

````
	// Note version numbers may differ
	$ node --version    // should print v0.10.13
	$ mongo --version   // should print MongoDB shell version: 2.6.3
````

### 2. Clone git repo

````
	$ cd {path to where you want project}
	$ git clone https://github.com/ryandrewjohnson/nodejs-addressbook.git
````

### 2. Install pacakages
Make sure you are in the root of the project directory that contains the `package.json` file before running below commands. This may take a while as there are quite a few packages, but once everything is done you should now see a `node_modules` and `bower_components` folder.

Note: This assumes that you don't have `bower` or `grunt` installed globally. If you do you can exclude the `node_modules/.bin/` path in the last two commands.

````
	$ cd nodejs-addressbook
	$ npm install
	$ node_modules/.bin/bower install
	$ node_modules/.bin/grunt
````

### 3. Start MongoDB
For this application I am using the mongoDB default address `mongodb://localhost/` and port `27017`. If for any reason you have changed your local mongo config you may have issues connecting to the DB.

````
	$ mongod
````
### 3. Start Application
````
	$ cd server/
	$ node index.js
````
Once this is complete you should be able to visit the application in your browser by visiting `http://localhost:3000`.

Note: Make sure you are not already running any other node apps on port 3000. Same goes if you are running apache or any other web server.

## Usage
The app was built on a RESTFUL API that the client side uses to interact with the backend. For the front end app do the following to get started:

### Frontend

* Visit `http://localhost:3000`
* You will land on the login page by default, but click Register as you will need to create a user first.
* Once you have registered you will then be shot back to login page. Note: No auto login after register is whack! But there are only so many hours in the day, and this is just a test :)
* If you don't want to register you can just Sign in with Google.
* Once you are signed in you will be brought to your empty contact list where you can start adding contacts.

** Notes **

* There is very minimal error handling on frontend, so best keep your console open to see what's going on.


### API
The API domain is located at `http://localhost:3000/addressbook/api/v0.1/`.

To test any *GET* requests you can just hit the endpoint in your browser. For *POST,PATCH,DELETE* calls you will need to use `curl` in the terminal.

#### users route
The below url's are relative to API domain, and `user_id` is a MongoDB `_id` for a  valid User Document. e.g. (53e3ed197f282b00005157cb)

````
	/POST 		/user				- add new user
	/GET		/user/:user_id 		- get existing user
	/PATCH		/user/:user_id		- update existing user
	/DELETE		/user/:user_id		- delete existing user	
````
For valid/required User fields please see `data/scehmas/user.js`. 

#### curl examples (Users):
````
	$ curl --request POST --data "username=email@email.com&password=password" http://localhost:3000/addressbook/api/v0.1/user/{user_id}
````
````
	$ curl --request PATCH --data "username=newemail@email.com" http://localhost:3000/addressbook/api/v0.1/user/{user_id}
````
````
	$ curl --request DELETE http://localhost:3000/addressbook/api/v0.1/user/{user_id}
````


#### user's contacts route
The `user_id` and `contact_id` are MongoDB `_id`'s for valid User and Contact Documents e.g. (53e3ed197f282b00005157cb). Note that the Contact used must be associated with the User.

````
	/POST 		'/user/:user_id/contacts		      - add new contact
	/GET		/user/:user_id/contacts 		      - get existing contact
	/PATCH		/user/:user_id/contacts/:contact_id  - update existing contact
	/DELETE		/user/:user_id/contacts/:contact_id  - delete existing contact	
````
For valid/required Contact fields please see `data/scehmas/contact.js`. 

#### curl examples (Contacts):
````
	$ curl --request POST --data "name.givenName=firstname&name.familyName=lastname&email=test3@gmail.com&address.city=Toronto&address.street=188 mystreet Ave&address.region=Ontario&address.postcode=M4Y2L8&address.country=Canada" http://localhost:3000/addressbook/api/v0.1/user/{user_id}/contacts
````
````
	$ curl --request PATCH --data "name.givenName=firstname" http://localhost:3000/addressbook/api/v0.1/user/{user_id}/contacts/{contact_id}
````
```
	$ curl --request DELETE http://localhost:3000/addressbook/api/v0.1/user/{user_id}/contacts/{contact_id}
```
### Run route tests
Ensure that the application is already running before running the test command.

````
	$ cd {project root}
	$ node_modules/.bin/grunt test
````

## Author

[Ryan Johnson](https://github.com/ryandrewjohnson)
