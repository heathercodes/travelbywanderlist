process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../index');

describe('routes : index', () => {

  describe('GET /', () => {
    it('should return Hello World', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.text.should.eql('Hello World')
        done();
      });
    });
  });

});