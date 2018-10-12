const webpack = require('webpack');

module.exports = function(config){
  config.set({
    // base path that will be used to resolve all patterns (files, exclude)
    basePath: '.',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [ 'jasmine', 'karma-typescript' ],

    // list of files / patterns to load in the browser
    files: [
      { pattern: 'spec/helpers/enzyme_setup.ts' },
      { pattern: 'src/**/*.+(ts|tsx)' },
      { pattern: 'spec/**/*.+(ts|tsx)' }
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocessors matching files before serving them to the browsers
    // available preprocessors:
    // https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec/helpers/enzyme_setup.ts': [ 'karma-typescript' ],
      '**/*.+(ts|tsx)': [ 'karma-typescript' ]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [ 'dots', 'karma-typescript', 'kjhtml'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR
    //  || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable/disable watching file and executing tests
    // whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers:
    //  https://npmjs.org/browse/keyword/karma-launcher
    browsers: [ 'ChromeHeadless' ],

    // Continuous integration module
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency logLevel
    // how many browsers should be started simultaneous
    concurrency: Infinity,

    // enabled plugins
    plugins: [
      require('karma-typescript'),
      require('karma-typescript-preprocessor'),
      require('karma-typescript-es6-transform'),
      require('karma-jasmine'),
      require('karma-jasmine-html-reporter'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
    ],
    // karma-typescript options
    karmaTypescriptConfig: {
      bundlerOptions: {
        entrypoints: /spec/,
        transforms: [require('karma-typescript-es6-transform')()],
        exclude: [
          '/node_modules/react/addons',
          '/node_modules/react/lib/ExecutionEnvironment',
          '/node_modules/react/lib/ReactContext',
          '/node_modules/react-addons-test-utils'
        ]
      },
      sourceMap: true
    },
    coverageReporter: {
      type: 'html',
      dir: './dist/coverage/'
    }

  });
};
