reposed

[![Circle CI](https://circleci.com/gh/jdelibas/reposed/tree/master.svg?style=shield)](https://circleci.com/gh/jdelibas/reposed/tree/master)

Get started

* npm install

Grunt should take care of the rest, dev mode only(server port 3001) automatically runs bower, build and serve.

Grunt commands

* grunt build
* grunt serve
* grunt test


The code style closely follows john papas style guide for angular.

`https://github.com/johnpapa/angular-styleguide`

The structure of the app is based on the module per feature pattern and is generated using grunt using a custom build method.


Notes

* had to hard reference fork for angular-typewrite in bower.json
  * https://github.com/antoniocapelo/angular-typewrite/pull/7

Whats missing?

* no production builder
* no protractor tests,
* no coverage reporting
* controlleras syntax not used
* could replace $scope with this in the controllers
* no less/sass building
* no minifcation/concatenation or require + DI
* no doc blocks
* git/ci/deployment stuff missing
* no examples of directives, filters, interceptors
* missing hover on cards
* no d3/threejs :( 
* no routing polish (err pages, trailing slash etc)
* data layer should accept sensible params ie consistent
* data layer should also group calls so the params make sense, follow gh api conventions