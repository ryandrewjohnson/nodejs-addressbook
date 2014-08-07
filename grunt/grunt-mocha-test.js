/**
 * grunt-mocha-test
 *
 * [docs:]{@link https://www.npmjs.org/package/grunt-mocha-test)
 */

'use strict';

module.exports = {
    mochaTest: {
        options: {
            reporter: 'spec'
        },
        src: ['test/test.js']
    }
};