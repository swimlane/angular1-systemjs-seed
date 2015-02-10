# SystemJS + AngularJS

Seed project for ES6 modules via SystemJS with ES6 syntax using 6to5 that lazy-load and bundle build with AngularJS.

![](http://media.giphy.com/media/EldfH1VJdbrwY/giphy.gif)


This project does:

- ES6 Syntax via 6to5 with source maps
- ES6 Modules via SystemJS
- Karma / Jasmine unit tests with coverage report
- Lazy-loading modules via routes with AngularJS
- Easy watch/lint/test/build setup via Gulp
- LESS CSS Support with source maps and minification
- AngularJS Template Compilation
- AngularJS Annotatation
- Bundle builds via SystemJS Builder
- Cache Busting with SystemJS
- Demonstrates on-demand theme loading

This seed project demonstrates the [systemjs-route-bundler](https://github.com/Swimlane/systemjs-route-bundler) build tool.

### Install & Run

1. `npm install -g gulp jspm bower`
2. `npm install`
3. `gulp watch serve`
4. Browse to `http://localhost:9000`

### Gulp Tasks

- `gulp test` to run karma tests
- `gulp lint` to run jshint
- `gulp release` to bundle, cache busting, and minify

### Tooling

- [EditorConfig](http://editorconfig.org/)
- [JSHint](http://jshint.com/install/)
- [VS Task Launcher](https://visualstudiogallery.msdn.microsoft.com/8e1b4368-4afb-467a-bc13-9650572db708)

### Best Practices

- https://github.com/johnpapa/angularjs-styleguide
- https://github.com/gocardless/angularjs-style-guide
- http://sett.ociweb.com/sett/settApr2014.html

### Research & Resources

- https://github.com/systemjs/systemjs
- https://github.com/gocardless/es6-angularjs
- http://glenmaddern.com/articles/javascript-in-2015
- https://github.com/marcj/angular-es6-annotations
- https://github.com/robianmcd/angular-next
- https://github.com/ng-next/ng-next-example
