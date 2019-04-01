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


var campgroundSchema = mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campgorund = mongoose.model("campground", campgroundSchema);

app.get("/", function(req,res){
  res.render("landing");
});

app.get("/campgrounds", function(req,res){
  res.render("index");
});

app.listen(4000, function(){
  console.log("The server is running!");
});
