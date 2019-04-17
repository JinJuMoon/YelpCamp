var express = require("express");
var router  = express.Router();
// var Campground = require("../models/campground");
// var Comment = require("../models/comment");

// comments create route
router.post("/campgrounds/:id/", function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
      res.redirect("/campground");
    } else{
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else {
          foundCampground.comments.push(comment);
          foundCampground.save();
          res.redirect("/campgrounds/" + foundCampground._id);
        };
    });
    }
  });
});


// comments new route
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: foundCampground});
    }
  });
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}


module.exports = router;
