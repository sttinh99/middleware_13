const express = require("express");
var shortid = require("shortid");
var db = require('../db');
const { value } = require("../db");

module.exports.index = function(req, res) {
    res.render("./books/index", {
      books: db.get("books").value()
    });
  };
module.exports.getCreate = function(req, res) {
    res.render("./books/create");
  };
module.exports.postCreate = function(req, res) {
    req.body.id = shortid.generate();
    db.get("books")
      .push(req.body)
      .write();
    res.redirect("/books");
  };
module.exports.getUpdate = function(req,res){
var id = req.params.id;
var book = db.get("books").find({id: id}).value();
res.render("./books/update",{book: book});
// router.post("/update",function(req,res){
//   var x = req.body.title;
//   book.title = x;
//   db.get('books').write();
//   res.redirect("");
// });   
};
module.exports.postUpdate = function(req,res){
    var id = req.body.id;
    db.get("books").find({id: id})
    .assign({ title: req.body.title})
    .write();
    res.redirect("/books");
  };
module.exports.delete = function(req,res){
    var id = req.params.id;
    console.log(id);
    var book = db.get('books')
    .find({ id: id })
    .value()
    var delBook = db.value().books.map(function(x,index){
        if(x===book){
            db.value().books.splice(index,1);
            db.get('books').write();
        }
    });
    res.redirect("/books");
  }
