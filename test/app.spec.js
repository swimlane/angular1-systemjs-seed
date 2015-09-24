import app from "app/app";

describe('app', function() {
  it('passes a test', function() {
    expect(true).toBe(true);
  })

  it('fails a test', function() {
    expect(1).toBe(0, 'intentionally failing test');
  })
});
