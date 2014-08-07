/**
 * grunt-contrib-copy
 *
 * [docs:]{@link https://github.com/gruntjs/grunt-contrib-copy)
 */

'use strict';

module.exports = {
    copy: {
        files: [
            // JS
            {expand: false, src: ['bower_components/backbone/backbone.js'], dest: 'public/js/vendor/backbone.js'},
            {expand: false, src: ['bower_components/underscore/underscore.js'], dest: 'public/js/vendor/underscore.js'},
            {expand: false, src: ['bower_components/jquery/dist/jquery.min.js'], dest: 'public/js/vendor/jquery.min.js'},
            {expand: false, src: ['bower_components/bootstrap/dist/js/bootstrap.min.js'], dest: 'public/js/vendor/bootstrap.min.js'},
            {expand: false, src: ['bower_components/requirejs/require.js'], dest: 'public/js/vendor/require.js'},

            // CSS
            {expand: false, src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'], dest: 'public/css/bootstrap.min.css'},            
            {expand: false, src: ['bower_components/bootstrap/dist/css/bootstrap-theme.min.css'], dest: 'public/css/bootstrap-theme.min.css'},
            {expand: true, src: ['bower_components/bootstrap/dist/fonts/*'], dest: 'public/fonts/', flatten: true, filter: 'isFile'},            
        ]
    }
};