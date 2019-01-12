// var express = require("express");
var mongoose = require("mongoose");
var carSchema = new mongoose.Schema({
    regNo   :String,
    carName :String,
    comapany:String,
    cost    :Number,
    kms     :Number,
    location:String,
    insurance:String
});

module.exports=mongoose.model("Car",carSchema);