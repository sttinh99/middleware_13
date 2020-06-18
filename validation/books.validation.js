module.exports.postCreate = function(req,res,next){
    var errors = [];
    if(!req.body.title){
      errors.push("please iput title");
    }
    if(!req.body.description){
      errors.push("please input description");
    }
    if(errors.length > 0){
      res.render("./books/create",{
        errors: errors,
        values: req.body
      });
      return;
    }
    next();
}