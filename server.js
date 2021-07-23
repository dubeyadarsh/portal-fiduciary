const mongoose=require("mongoose");
const express=require("express");
require("dotenv").config();
const app=express();
const path=require("path");
const fileUpload=require('express-fileupload');
const port=process.env.PORT ||3001;
app.use(fileUpload());
const cors=require("cors");
const review=require("./modal/review");
mongoose.connect("mongodb+srv://adarsh:adarsh@cluster0.b6n08.mongodb.net/reviews?retryWrites=true&w=majority",{
useNewUrlParser:true
});
app.use(cors()); 
app.use(express.json());
app.use('/img',express.static('img'));
// Adding into database *****************
app.post("/create",async(req,res)=>{
console.log("u caled post method");
const dp=req.files.dp;
const username=req.body.uname;
const feedback =req.body.feedback; 
const rating =req.body.rating; 
console.log(username);
dp.mv('/img/'+dp.name);
const data=  new review({username:username,feedback:feedback, rating:rating, dp:dp.name});
console.log(data);
try{
await data.save();
res.send("inserted data");
}
catch(err){
console.log("Error related to Inserting data in database",err);
}
});

// ************ Fetching data from database &**********************//
app.get("/read",async(req,res)=>{
review.find({},(err,result)=>{
   if(err){
       console.log(err);
       return;
   } 
   res.send(result);
});
});
console.log(__dirname);
app.use(express.static(path.resolve(__dirname, "frontend", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build","index.html"));
});
app.listen(port,()=>{
console.log(`Server running at port ${port}`);
console.log(path.resolve(__dirname, "frontend", "build"));
});