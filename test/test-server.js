const chai = require('chai');
//const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

//chai.use(chaiHttp);

describe('Blog Post', function() {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it('should just chill for now', function() {
    expect(true).to.be.true;
  });

});
