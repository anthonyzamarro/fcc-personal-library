/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const expect = require('chai').expect;
// const MongoClient = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectId;
// const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

const Model = require('../model/Book');

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      // console.log('GET in api.js', req.params);
      Model.getAllBooks(req.body, (dbRes, code) => {
        // console.log('handleIssues.js getProjects dbRes, code', dbRes, code)
        res.status(code).send(dbRes);
    })
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      // done();
    })
    
    .post(function (req, res){
      const title = req.body.title;
    
      Model.addBook(req.body, (dbRes, code) => {
        res.status(code).send(dbRes);
      });
      //response will contain new book object including atleast _id and title
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      const bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      const bookid = req.params.id;
      const comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      const bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
