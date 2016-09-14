'use strict';

module.exports = grunt => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: "'use strict';\nmodule.exports.version = '<%= pkg.version %>';\n\n"
      },
      dist: {
        src: ['src/module.js', 'src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['concat']);
};
