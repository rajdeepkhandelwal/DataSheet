var app = require("express")(),
    mongoose= require("mongoose"),
    Car    = require("./models/car"),
    bodyParser=require("body-parser");
mongoose.connect("mongodb://localhost/datasheet",{ useNewUrlParser: true });    
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");

app.get("/",function(req,res){
    Car.find({},function(err,foundCar){
        if(err){
            console.log(err);
        }else{
            res.render("home",{cars:foundCar});
        }
    });
});

app.get("/admin",function(req,res){
    res.render("new");
});

app.post("/",function(req,res){
    Car.create(req.body.car,function(err,newCars){
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    });
});



app.listen(process.env.PORT,process.env.IP,function(){
    console.log("server is on");
});