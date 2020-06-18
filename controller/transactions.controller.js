const express = require("express");
var shortid = require("shortid");
var db = require('../db');
module.exports.index = function (req,res){
    
    var arrUser = [];
    var objTrans = {};
    var userTrans=db.get("trans").value();
    var takeUser = userTrans.map(function(item){
        return{
            user : db.get("users").find({id: item.idUser}).value().name,
            book : db.get("books").find({id: item.idBook}).value().title,
            id: item.id,
            status: item.isComplete
        }
    });
    res.render("./transactions/index", {
        trans:takeUser
    });
};
module.exports.getCreate = function (req,res) {
    var books = db.get("books").value();
    var users = db.get("users").value();
    res.render("./transactions/create",{books: books,users: users,isComplete: false});
};
module.exports.postCreate = function (req,res) {
    req.body.id = shortid.generate();
    req.body.isComplete = false;
    db.get("trans").push(req.body).write();
    res.redirect("/transactions");
};
module.exports.getComplete = function(req,res){
    var id = req.params.id;
    // var takeId = db.get("trans").value();
    // var checkId = takeId.find(function(item){
    //     return item.id === id?true:false;
    // })
    var errors = "Giao dịch không tồn tại";
    var checkId=db.get('trans').find({id:id}).value();
    if(checkId===undefined){
        res.render('./transactions/complete',{
            errors: errors
        })
        return;
    }
    db.get('trans').find({id:id})
    .assign({isComplete: true}).write();
    res.render('./transactions/complete');
}