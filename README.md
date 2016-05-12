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

Continous deployment enabled via CircleCI to Heroku. No staging environment setup though, so directly to master.

Tests run by karma and covered by istanbul. Builds fail unless 100% coverage (some ignores present...)

#### Build features

* html changes if dev or dist
* bower packages auto included
* modules folders get concat into a single file
* all views are saved to $templateCache(no http calls)
* dist minifys all angular code
* dist concats all bower deps into one
* testing generates coverage reports
* basic express server included for dist

#### Whats missing?

* no protractor tests
* controlleras syntax not used
* could replace $scope with this in the controllers
* no doc blocks
* 
