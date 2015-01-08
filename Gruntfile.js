module.exports = function(grunt) {

    //grunt.loadNpmTasks('grunt-html2js');
    //grunt.loadNpmTasks('grunt-contrib-less');
    //grunt.loadNpmTasks('grunt-karma');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-6to5');

    //var ngAnnotate = require("ng-annotate");

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
        '6to5': {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/app.js': 'src/app.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['6to5']);

}