module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'src/<%= pkg.name %>-<%= pkg.version %>.min.js': 'src/<%= pkg.name %>.js'
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/<%= pkg.name %>.js', 'tests/**/*.js'],
      options: {
        'camelcase':  true,
        'expr': true,
        'eqeqeq': true,
        'latedef': true,
        'newcap': true,
        'noarg': true,
        'sub': true,
        'undef': true,
        'boss': true,
        'eqnull': true,
        'browser': true,
        'unused': true,
        'immed': true,
        'lastsemic': true,
        'node': true,
        'quotmark': 'single',
        'es3': true,
        'globals': {
          'define': true,
          'describe': true,
          'it': true,
          'require': true,
          'exports': true,
          'Backbone': true,
          '_': true,
          '$': true,
          'jQuery': true,
          'grunt': true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'uglify']);
};