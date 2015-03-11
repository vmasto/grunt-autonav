# grunt-autonav

> Add active classes to current navigation items in static files.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-autonav --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-autonav');
```

## The "autonav" task

### Overview
In your project's Gruntfile, add a section named `autonav` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  autonav: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.parent
Type: `String`
Default value: `'.navigation'`

The main navigation item wrapper expressed as a usual CSS selector.

#### options.childtype
Type: `String`
Default value: `'li'`

Elements wrapping the navigation links.

#### options.activeclass
Type: `String`
Default value: `'active'`

Class to be applied on the active link's parent/childtype.

#### options.parentclass
Type: `String`
Default value: `'active-parent'`

Class to be applied on the active link parent's immediate parent.

#### options.ancestorclass
Type: `String`
Default value: `'active-ancestor'`

Class to be applied on the all the active link's childtype ancestors.


### Usage Examples

#### Default Options
The following example constitutes of a basic navigational unordered list with the following markup structure:

```html
<ul class="navigation">
	<li><a href="index.html">Home</a></li>
	<li>
		<a href="page.html">Page</a>
		<ul>
			<li>
				<a href="second.html">Second</a>
				<ul>
					<li><a href="child.html">Child</a></li>
					<li><a href="sibling.html">Sibling</a></li>
				</ul>
			</li>
		</ul>
	</li>
	<li><a href="blog.html">Blog</a></li>
	<li><a href="contact.html">Contact</a></li>
</ul>
```

Creating the task: 

```js
grunt.initConfig({
  autonav: {
    options: {},
    files: {
      'dest/default_options/child.html': ['src/child.html'],
    },
  },
});
```
The `autonav` task iterates through all the links inside the `options.parent` element and cross references their `href` attributes with the filename of the running file. When it finds a match, it proceeds to add all active classes.

On the previous markup structure the output would be:

```html
<ul class="navigation">
	<li><a href="index.html">Home</a></li>
	<li class="active-ancestor">
		<a href="page.html">Page</a>
		<ul>
			<li class="active-parent active-ancestor">
				<a href="second.html">Second</a>
				<ul>
					<li class="active" ><a href="child.html">Child</a></li>
					<li><a href="sibling.html">Sibling</a></li>
				</ul>
			</li>
		</ul>
	</li>
	<li><a href="blog.html">Blog</a></li>
	<li><a href="contact.html">Contact</a></li>
</ul>
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
