# SystemJS Module Loader

Testing SystemJS & ES6 modules that lazy-load with AngularJS using 6to5.

![](http://media.giphy.com/media/EldfH1VJdbrwY/giphy.gif)


This project does:

- ES6 Syntax via 6to5 with source maps
- ES6 Modules via SystemJS
- Karma / Jasmine unit tests with coverage report
- Lazy-loading modules via routes with AngularJS
- Easy watch/lint/test/build setup via Gulp
- LESS CSS Support with source maps
- AngularJS Template Compilation
- AngularJS Annotatation

### Install & Run

1. `brew install node`
2. `npm install -g gulp`
3. `npm install -g jspm`
4. `npm install`
5. `bower install`
6. `jspm install`
7. `gulp watch serve`
8. Browse to `http://localhost:9000`

### Run Tests

1. `npm install -g karma-cli`
2. `npm install -g jspm`
3. `gulp test`

and `gulp lint` to lint it.

### IDE Tooling

- [EditorConfig](http://editorconfig.org/)
- [JSHint](http://jshint.com/install/)
- [VS Task Launcher](https://visualstudiogallery.msdn.microsoft.com/8e1b4368-4afb-467a-bc13-9650572db708)

### Best Practices

- https://github.com/johnpapa/angularjs-styleguide
- https://github.com/gocardless/angularjs-style-guide
- http://sett.ociweb.com/sett/settApr2014.html

### Research

- https://github.com/marcj/angular-es6-annotations

### Resources

- https://github.com/systemjs/systemjs
- https://github.com/gocardless/es6-angularjs
- http://glenmaddern.com/articles/javascript-in-2015
