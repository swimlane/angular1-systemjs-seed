var assert = require('chai').assert;
var app = require('app/app');

describe('app', function() {
  it('passes a test', function() {
    assert(true == true);
  })

  it('fails a test', function() {
    assert(1 == 0, 'intentionally failing test');
  })
});
