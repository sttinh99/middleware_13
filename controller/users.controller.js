const express = require("express");
var shortid = require("shortid");
var db = require('../db');
module.exports.index = function(req, res) {
    res.render("./users/indexUser", {
      users: db.get("users").value()
    });
}
module.exports.getCreate = function(req, res) {
    res.render("./users/createUser");
}
module.exports.postCreate = function(req, res) {
    req.body.id = shortid.generate();
    db.get("users")
      .push(req.body)
      .write();
    res.redirect("/users");
  }
module.exports.getUpdate = function(req,res){
    var id = req.params.id;
    var user = db.get("users").find({id: id}).value();
    res.render("./users/updateUser",{user: user});
    // router.post("/update",function(req,res){
    //   var x = req.body.title;
    //   book.title = x;
    //   db.get('users').write();
    //   res.redirect("");
    // });   
  }
module.exports.postUpdate = function(req,res){
    var id = req.body.id;
    db.get("users").find({id: id})
    .assign({ name: req.body.name})
    .write();
    res.redirect("/users");
  }
module.exports.delete = function(req,res){
    var id = req.params.id;
    console.log(id);
    var user = db.get('users')
    .find({ id: id })
    .value()
    var delUser = db.value().users.map(function(x,index){
        if(x===user){
            db.value().users.splice(index,1);
            db.get('users').write()
        }
    });
    res.redirect('/users');
  }