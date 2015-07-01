'use strict';

describe('me module', function() {
  beforeEach(module('me'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
