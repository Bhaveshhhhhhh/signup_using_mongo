var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mydatabase');

var db = mongoose.connection;

db.on('error',()=>console.log("errror in connection"))
db.once('open',()=>console.log("connected to databse"))

app.post("/signup",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;

    var data = {
        "name": name,
        "email": email,
        "phone": phone,
        "password": password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("successfully inserted")
    })

    return res.redirect('signup_success.html')
})

app.get("/", function(req,res){
    res.set({
        "Allow-access-Allow-Origin": '+'
    })
    return res.redirect('index.html')
})

app.listen(3000,function(req,res){
    console.log("starts at port 3000")
})