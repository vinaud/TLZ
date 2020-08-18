//var should = require("should");
//var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "https://localhost:3333";

describe("Test reports",function(){
    
    it("Should return the percentage of infected survivors",function(done){
      chai.request().get(
        {
          url : urlBase + "/reports/infected"
        },
        function(error, response, body){
          var _body = {};
          try{
            _body = JSON.parse(body);
          }
          catch(e){
            _body = {};
          }

          expect(response.statusCode).to.equal(200);
  
          if( _body.should.have.property('infected_percentage') ){
            expect(_body.infected_percentage).to.be.greaterThan(0);
          }
  
          done(); 
        }
      );
    });
  });