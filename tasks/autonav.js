/*
 * grunt-autonav
 * https://github.com/vmasto/grunt-autonav
 *
 * Copyright (c) 2015 vmasto
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('autonav', 'Add active class to navigation items in static files', function() {
		var cheerio = require('cheerio');
		var path = require('path');

    var options = this.options({
			parent: '.navigation',
			childtype: 'li',
			activeclass: 'current',
			ancestorclass: 'current-ancenstor'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

			var src = f.src.filter(function(filepath) {
				if ( !grunt.file.exists(filepath) ) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			});

			var $ = cheerio.load(grunt.file.read(src));
			var filename = path.basename(src);
			var nav = $(options.parent);
			var navnodes = nav.find(options.childtype);
			var navlinks = navnodes.find('> a');

			if ( !nav.length ) {
				grunt.log.warn(f.dest + ': Parent selector ' + options.parent + ' not found. Skipping file.');
				return false;
			}

			if ( !navlinks.length ) {
				grunt.log.warn(f.dest + ': Could not find any links inside the specified elements. Skipping file.');
				return false;
			}

			navnodes.removeClass(options.activeclass, options.ancestorclass);
			navlinks.each(function() {
				var _that = $(this);
				if ( _that.attr('href') === filename ) {
					_that.parent().addClass(options.activeclass);
					_that.parentsUntil($(options.parent), options.childtype).not(_that.parent() ).addClass(options.ancestorclass);
				}
			});

			var content = $.html();

			grunt.file.write(f.dest, content);
			grunt.log.writeln('File "' + f.dest + '" done.');
    });
  });

};
