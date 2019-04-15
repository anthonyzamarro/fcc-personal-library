/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

// const expect = require('chai').expect;
const controller = require('../controller/handleRequests');
const express = require('express');
const router = express.Router();

// const MongoClient = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectId;
// const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});


// module.exports = function (app) {

//   app.route('/api/books')

//     .get(
//       // console.log('GET in api.js', app);
//       controller.getAllBooks
//       //response will be array of book objects
//       //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
//     )
    
//     .post(controller.addBook)
    
//     .delete(controller.deleteAllBooks);



//   app.route('/api/books/:id')
//     .get(function (req, res){
//       const bookid = req.params.id;

//       console.log('bookid', bookid)
//       //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
//     })
    
//     .post(function(req, res){
//       // const bookid = req.params.id;
//       // const comment = req.body.comment;
//       //json res format same as .get
//       controller.addComment(req, res);
//     })
    
//     .delete(function(req, res){
//       // console.log('deleteOneBook routes', req)
//       controller.deletOneBook(req, res)
//       //if successful response will be 'delete successful'
//     });
  
// };

 router.get('/', controller.getAllBooks)
 router.post('/', controller.addBook)
 router.delete('/', controller.deleteAllBooks)

 router.get('/:id', controller.getOneBook)
 router.post('/:id', (req, res) => controller.addComment(req, res))
 router.delete('/:id', (req, res) => controller.deletOneBook(req, res))

 module.exports = router;
