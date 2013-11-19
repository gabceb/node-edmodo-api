module.exports = function(grunt) { 
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['gruntfile.js', 'index.js', 'test/**/*.js'],

			options: {
				globals: {
					console: true,
					module: true
				},
				es5: true 
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['jshint']);
};