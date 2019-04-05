var bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    express    = require("express"),
    app        = express();

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("db is connected!");
})


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// model campground
var campgroundSchema = mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("campground", campgroundSchema);

// Campground.create([
// {name: "a beautiful mountain", image: "https://www.nps.gov/maca/planyourvisit/images/MapleSpringsCampground-Campsite.jpg", description: "This is a really beautiful sites, wow!"},
// {name: "rocky mountain again", image: "https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg", description: "blah blaaljsdkjlskjflksjldkjlkjlfkjl"},
// {name: "campgorund sites list", image: "http://tipsinahmoundscampground.com/wp-content/uploads/2017/07/IMG_6559-copy.jpg", description: "How can we climb up this mountain? I wanna let you know."}
// ], function(err, campground){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Newly created: ");
//     console.log(campground);
//   }
// });



app.get("/", function(req,res){
  res.render("landing");
});

// INDEX PAGE
app.get("/campgrounds", function(req,res){
  Campground.find({}, function(err, campgrounds){
    if(err){
      console.log(err);
    } else{
      res.render("campgrounds/index", {campgrounds: campgrounds});
    }
  });
});

// CREATE PAGE
app.post("/campgrounds", function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {name: name, image: image, description: description};
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// NEW PAGE
app.get("/campgrounds/new", function(req,res){
  res.render("campgrounds/new");
})

// SHOW PAGE
app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
      console.log(foundCampground);
    } else {
      console.log(foundCampground);
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

app.listen(4000, function(){
  console.log("The server is running!");
});
