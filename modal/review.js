const mongoose=require("mongoose");
const reviewSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    feedback:{
     type:String,
     required:true 
    },
    rating:{
     type:Number,
     required:true 
    },
    dp:{
        data:Buffer,
        type:String,
        required:true,
    }
});
const review=mongoose.model("review",reviewSchema);
module.exports=review;