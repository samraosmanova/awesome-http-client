import { expect } from 'chai';
import { exec } from 'child_process';

describe('HTTP Client Script', function () {
  it('should make a GET request without headers and body', function (done) {
    exec('node ./ GET https://lightfulweb.free.beeceptor.com/todos', (error, stdout, stderr) => {
      expect(error).to.be.null;
      expect(stderr).to.be.empty;
      expect(stdout).to.include('Status Code: 200');
      done();
    });
  });

  it('should make a POST request with headers and body', function (done) {
    exec('node ./ POST https://lightfulweb.free.beeceptor.com/todos -h "Content-Type: application/json" -b \'{"title": "Test Post", "body": "Test Body", "userId": 1}\'', (error, stdout, stderr) => {
      expect(error).to.be.null;
      expect(stderr).to.be.empty;
      expect(stdout).to.include('Status Code: 200');
      expect(stdout).to.include('id');
      done();
    });
  });
});
