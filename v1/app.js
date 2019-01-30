var express = require("express"),
    app     = express(),
    mongoose= require("mongoose"),
    Car    = require("./models/car"),
    bodyParser=require("body-parser");
mongoose.connect("mongodb://localhost:27017/Datasheet",{ useNewUrlParser: true });    
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));

//====================================================
//Routes
//====================================================
app.get("/",function(req,res){
        Car.find({},function(err,foundCar){
        if(err){
            console.log(err);
        }else{
            res.render("home",{cars:foundCar});
        }
    });
    
});
app.get("/getdata",function(req,res){
    var noMatch;
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');

        Car.find({$or:[{company:regex}, {carName:regex},{location:regex},{insurance:regex}]},function(err,foundCar){
        if(err){
            console.log(err);
        }else{
            
            if(foundCar.length<1){
                noMatch="No Search Result Found";
            }
            res.render("searchdata",{cars:foundCar,noMatch:noMatch});
        }
    });
});
// app.get("/admin",function(req,res){
//     res.render("new");
// });

app.get("/admin",function(req,res){
    Car.find({},function(err,foundCar){
        if(err){
            console.log(err);
        }else{
            res.render("new",{cars:foundCar});
        }
    });
});
app.post("/",function(req,res){
    //modify req.body.car
    
    
    Car.create(req.body.car,function(err,newCars){
        if(err){
            console.log(err);
        }else{
            
            res.redirect("/admin");
        }
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};



app.set('port', process.env.PORT || 3000)
app.listen(3000);
// app.listen(process.env.PORT,process.env.IP,function(){
//     console.log("server is on");
// });