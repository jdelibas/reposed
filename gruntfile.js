'use strict';

module.exports = function(grunt) {

    var deps = require('wiredep')();

    grunt.initConfig({

        karma : {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    singleRun: true,
                    browsers: ['PhantomJS'],
                    files: [
                        './bower_components/angular/angular.js',
                        './bower_components/angular-mocks/angular-mocks.js',
                        'src/app.js',
                        'src/routes.js',
                        'src/**/*.js'
                    ].concat(deps.js),
                    //plugins: ['karma-threshold-reporter'],
                    reporters: ['progress', 'coverage', 'threshold'],
                    preprocessors: {
                        // source files, that you wanna generate coverage for
                        // do not include tests or libraries
                        // (these files will be instrumented by Istanbul)
                        'src/**/*.js': ['coverage']
                    },
                    // optionally, configure the reporter
                    coverageReporter: {
                        dir : 'coverage/',
                        reporters: [
                          {
                              type: 'lcov',
                              subdir: 'report-lcov'
                          },
                          {
                              type: 'html',
                              subdir: 'report-html'
                          }
                        ]
                    },
                    // the configure thresholds
                    thresholdReporter: {
                        statements: 100,
                        branches: 100,
                        functions: 100,
                        lines: 100
                    }
                }
            }
        },

        watch: {
            scripts: {
                files: [
                    'src/**/*'
                ],
                //HEFTY!!!
                tasks: [
                    'clean',
                    'prepModules',
                    'concat',
                    'prepTemplates',
                    'ngtemplates',
                    'newer:copy',
                    'newer:includeSource',
                    'wiredep'
                ],
                options: {
                    spawn: true,
                    livereload: {
                        port: 35729
                    }
                },
            },
        },

        wiredep: {
            task: {
                src: [
                  'dev/index.html'
                ]
            }
        },

        includeSource: {
            options: {
                basePath: '',
                baseUrl: '',
            },
            dev: {
                files: {
                    'dev/index.html': 'dev/index.html'
                }
            },
            dist: {
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },

        copy: {
            modules: {
                files: [
                  {
                      expand: true,
                      cwd: 'src/',
                      src: ['*.js', '!*.test.js'],
                      dest: 'dev/',
                      filter: 'isFile'
                  }
                ],
            },
            assetsDev: {
                files: [
                  {
                      expand: true,
                      cwd: 'src/',
                      src: ['assets/*'],
                      dest: 'dev/',
                      filter: 'isFile'
                  }
                ],
            },
            assetsDist: {
                files: [
                  {
                      expand: true,
                      cwd: 'src/',
                      src: ['assets/*'],
                      dest: 'dist/',
                      filter: 'isFile'
                  }
                ],
            }
        },

        connect: {
            all: {
                options:{
                    port: 3001,
                    hostname: '0.0.0.0',
                    base: '.'
                }
            }
        },

        open: {
            all: {
                path: 'http://localhost:<%= connect.all.options.port%>/dev/index.html#/'
            }
        },

        clean : ['dev'],

        uglify: {
            options: {
                mangle: false
            },
            distApp: {
                src: ['dev/**/*.js', '!dev/**/*.tpl.js'],
                dest: 'dist/reposed-app.js'
            },
            distTpl: {
                src: ['dev/**/*.tpl.js'],
                dest: 'dist/reposed-templates.js'
            }
        },

        targethtml: {
            dist: {
                files: {
                    'dist/index.html': 'src/index.html'
                }
            },
            dev: {
                files: {
                    'dev/index.html': 'src/index.html'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-targethtml');

    grunt.registerTask('prepModules', 'module concat', function() {
        grunt.file.expand('src/module/*').forEach(function (dir) {
            var dirName = dir.substr(dir.lastIndexOf('/') + 1);
            var concat = grunt.config.get('concat') || {};
            concat[dirName] = {
                src: [dir + '/**/*.js', '!' + dir + '/**/*.test.js'],
                dest: 'dev/modules/' + dirName + '.js'
            };
            grunt.config.set('concat', concat);
        });
    });

    grunt.registerTask('prepTemplates', 'template concat', function() {
        grunt.file.expand('src/module/*').forEach(function (dir) {
            var dirName = dir.substr(dir.lastIndexOf('/') + 1);
            var ngtemplates = grunt.config.get('ngtemplates') || {};
            ngtemplates['rp.' + dirName] = {
                cwd : 'src/module/',
                src: [dirName + '/**/*.html'],
                dest: 'dev/modules/' + dirName + '.tpl.js'
            };
            grunt.config.set('ngtemplates', ngtemplates);
        });
    });

    grunt.registerTask('test', [
        'karma'
    ]);

    grunt.registerTask('serve', [
        'connect',
        'open',
        'watch'
    ]);

    grunt.registerTask('build-dev', [
        'clean',
        'targethtml:dev',
        'prepModules',
        'concat',
        'prepTemplates',
        'ngtemplates',
        'copy',
        'includeSource:dev',
        'wiredep'
    ]);

    grunt.registerTask('dev', function() {
        grunt.task.run(['build-dev', 'serve']);
    });

    grunt.registerTask('build', function() {
        var concat = grunt.config.get('concat') || {};
        concat['bower-js'] = {
            src: deps.js,
            dest: 'dist/reposed-3p-deps.js'
        };
        concat['bower-css'] = {
            src: deps.css,
            dest: 'dist/reposed-3p-deps.css'
        };
        grunt.config.set('concat', concat);
        grunt.task.run([
            'clean',
            'targethtml:dist',
            'prepModules',
            'concat',
            'prepTemplates',
            'ngtemplates',
            'copy',
            'uglify',
            'includeSource:dist'
        ]);
    });

};
