// /jshint esversion:6
require('dotenv').config();
const md5 = require('md5');
const express=require("express");
const ejs=require("ejs");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/userDB',{useNewUrlParser:true});
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
const userSchema=new mongoose.Schema({
    email:String,
    password:String
});

const User=new mongoose.model('User',userSchema);


app.get("/",function(req,res){
    res.render("home")
});
app.get("/login",function(req,res){
    res.render("login")
});
app.get("/register",function(req,res){
    res.render("register")
});

app.get("/submit",function(req,res){
    res.render("submit");
})

app.post("/register",function(req,res){
    const newUser=new User({
        email:req.body.username,
        password:md5(req.body.password)
    })
    newUser.save(function(err){
        if(!err){
            res.render("secrets");
        }else{
            console.log(err);
        }
    });
});
app.post("/login",function(req,res){
    const userName=req.body.username;
    const password=md5(req.body.password);
    User.findOne({email:userName},function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser){
               if(foundUser.password===password){
                res.render("secrets");
               }else{
                res.send("Wrong Password Please try again");
               }
            }else{
                res.send("<h1>User not Found</h1>")
            }
        }
    })
       
    
})








app.listen(3000,function(){
    console.log("Server chali thai gayo");
}) 