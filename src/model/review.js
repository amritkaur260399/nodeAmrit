const mongoose=require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;
const reviewSchema= new mongoose.Schema(
    {
       bookId:{
        type:ObjectId,
        required:true,
        reference:"book"
       } ,
       rating:{
       type:Number,
       required:true,
       
       },
       reviewBy:{
      type:String,
      default:"Guest",
      trim:true,
      lowerCase:true,

       },
    },
    { timestamps: true }
);

module.exports=mongoose.model("review",reviewSchema)