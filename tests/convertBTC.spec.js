const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai);

const convertBTC = require('../src/convertBTC.js');

describe('ConvertBTC', () => {
     
     let consoleStub;
     
     const responseMock = {
          "time": "2018-10-05 19:42:16",
          "price": 6575.31,
          "success": true
     }

     beforeEach(() => {
          consoleStub = sinon.stub(console,'log');
     })
     afterEach(() => {
          console.log.restore();
     })

     it('should return USD as currency and 10 as amount default', (done) => {
          // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
          nock('https://apiv2.bitcoinaverage.com')
               .get('/convert/global')
               .query({ from: 'BTC', to: 'USD', amount: 10 })
               .reply(200, responseMock);
          
          convertBTC('USD', 10);

          setTimeout(() => {
               expect(consoleStub).to.have.been.calledWith('10 BTC to USD = 6575.31');
               done();
          }, 300)
     });
});