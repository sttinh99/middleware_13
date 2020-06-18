module.exports.postCreate = function(req,res,next){
    var errors = [];
    if(!req.body.name || req.body.name.length > 30){
      if(req.body.name.length>30){
        errors.push("The number of characters is less than 30");
      }
      else
      {
        errors.push("please iput name");
      }
    }
    if(!req.body.age){
      errors.push("please input age");
    }
    if(errors.length > 0){
      res.render("./users/createUser",{
        errors: errors,
        values: req.body
      });
      return;
    }
    next();
}