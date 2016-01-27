# reposed

[![Circle CI](https://circleci.com/gh/jdelibas/reposed/tree/master.svg?style=shield)](https://circleci.com/gh/jdelibas/reposed/tree/master)

### Get started

* [view deployed site](https://reposed.herokuapp.com/)
* [view coverage report](https://reposed.herokuapp.com/coverage)

#### Development

* npm install
* bower install
* grunt build-dev
* grunt serve

#### Production

* npm install
* bower install
* grunt build
* node server

#### Grunt commands

* grunt build
* grunt build-dev
* grunt serve
* grunt test

#### Notes

The code style closely follows john papas style guide for angular.

`https://github.com/johnpapa/angular-styleguide`

The structure of the app is based on the module per feature pattern and is generated using grunt using a custom build method.

* had to hard reference fork for angular-typewrite in bower.json
  * https://github.com/antoniocapelo/angular-typewrite/pull/7

#### Whats missing?

* no protractor tests
* controlleras syntax not used
* could replace $scope with this in the controllers
* no doc blocks