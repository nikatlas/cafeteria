module.exports = function(config){
  config.set({

    basePath : './',


      files : [
          'app/libs/MobileServices.Web-1.2.7.min.js',
          'app/bower_components/angular/angular.js',
          'app/bower_components/angular-route/angular-route.js',
          'app/bower_components/angular-mocks/angular-mocks.js',
          'app/app.js',
          'app/components/**/*.js',
          'app/views/**/*.js'
      ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
