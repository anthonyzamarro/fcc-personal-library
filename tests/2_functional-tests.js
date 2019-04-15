/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        // if (err) console.log('example test err', err);
        assert.equal(res.status, 200);
        // assert.isArray(res.body, 'response should be an array');
        // assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        // assert.property(res.body[0], 'title', 'Books in array should contain title');
        // assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  const book = {
    title: "The Wind in the Willows",
    comments: []
  }

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({title: book.title})
        .end(function(err, res) {
          if (err) console.log('example test err', err);
          assert.equal(res.status, 200);
          assert.isObject(res.body._doc, 'an object is returned')
          assert.equal(res.body._doc.title, book.title)
          done();
        })
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
        .post('/api/books')
        .send()
        .end(function(err, res) {
          if (err) console.log('POST test err', err);
          assert.equal(res.status, 200);
          assert.notProperty(res.body._doc, 'title')
          book.id = res.body._doc._id
          done();
        })
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
        .get('/api/books')
        .end(function(err, res) {
          if (err) console.log('example test err', err);
          assert.equal(res.status, 200);
          assert.isArray(res.body, 'response is an array of book objects')
          done();
        })
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .get('/api/books/' + 555)
        .end(function(err, res) {
          if (err) console.log('example test err', err);
          assert.equal(res.status, 200);
          console.log('GET /api/books/[id]', res.body, book)
          done();
        })
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
        .get('/api/books/' + book.id)
        .end(function(err, res) {
          if (err) console.log('example test err', err);
          assert.equal(res.status, 200);
          console.log('GET /api/books/[id]', res.body, book)
          done();
        })
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        //done();
      });
      
    });

  });

});
