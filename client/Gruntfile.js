module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'public/bundle.js',
        dest: 'public/bundle.min.js'
      }
    },
    imageoptim: {
      
      options: {
        imageAlpha: true,
      },

      optimize: {
        src: ['assets'],

      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-imageoptim');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};