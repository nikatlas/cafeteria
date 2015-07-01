'use strict';

describe('me module', function() {

  beforeEach(module('me'));

  describe('home controller', function(){

    it('should ....', inject(function($controller,$rootScope) {
      //spec body
      var homeCtrl = $controller('homeCtrl');
        expect(homeCtrl).toBeDefined();
    }));

  });
});