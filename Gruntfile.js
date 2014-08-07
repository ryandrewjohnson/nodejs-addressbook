'use strict';

module.exports = function (grunt) {

    function task (task) { return require('./grunt/' + task); }

    grunt.initConfig({
        
        pkg:        grunt.file.readJSON('package.json'),

        /**
        * $TASKS
        * If you add a new grunt task please follow this
        * format and create a seperate config file and
        * save it in the grunt folder.
        */
        copy:           task('grunt-contrib-copy'),

        mochaTest:      task('grunt-mocha-test')
        
        // requirejs:  task('grunt-contrib-requirejs'), 
        // uglify:     task('grunt-contrib-uglify'), 
        // modernizr:  task('grunt-modernizr'),
        // cssmin:     task('grunt-contrib-cssmin'),  
        // watch:      task('grunt-contrib-watch'),   
        // imagemin:   task('grunt-contrib-imagemin'),

    });

    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Register alias tasks
    grunt.registerTask('dev', 'Start a local development environment.', ['copy']);

    grunt.registerTask('test', 'Run Mocha tests.', ['mochaTest']);

    grunt.registerTask('default', ['dev']);

};

